use std::{
  error::Error,
  net::{SocketAddr, TcpListener, TcpStream},
  path::PathBuf,
  process::{Child, Command, Stdio},
  sync::Mutex,
  thread,
  time::{Duration, Instant},
};

use tauri::{AppHandle, Manager, RunEvent, WebviewUrl, WebviewWindowBuilder};

#[derive(Default)]
struct BackendState {
  child: Mutex<Option<Child>>,
}

const DEFAULT_BACKEND_PORT: u16 = 3210;

pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![open_external_url])
    .manage(BackendState::default())
    .setup(|app| {
      if cfg!(debug_assertions) {
        create_main_window(app.handle(), "http://localhost:5173")?;
      } else {
        let port = find_available_port(DEFAULT_BACKEND_PORT, 24)?;
        let child = spawn_backend(app.handle(), port)?;

        {
          let state = app.state::<BackendState>();
          let mut guard = state.child.lock().expect("backend state lock poisoned");
          *guard = Some(child);
        }

        wait_for_backend(port, Duration::from_secs(20))?;
        create_main_window(app.handle(), &format!("http://localhost:{port}"))?;
      }

      Ok(())
    })
    .build(tauri::generate_context!())
    .expect("error while building the Tauri application")
    .run(|app_handle, event| {
      if matches!(event, RunEvent::Exit | RunEvent::ExitRequested { .. }) {
        stop_backend(&app_handle);
      }
    });
}

#[tauri::command]
fn open_external_url(_app: AppHandle, url: String) -> Result<(), String> {
  let target = url.trim();
  if target.is_empty() {
    return Err("Missing OAuth URL.".into());
  }

  tauri_plugin_opener::open_url(target, None::<String>).map_err(|error| error.to_string())
}

fn create_main_window(app: &AppHandle, url: &str) -> Result<(), Box<dyn Error>> {
  WebviewWindowBuilder::new(app, "main", WebviewUrl::External(url.parse()?))
    .title("Tilder")
    .inner_size(1440.0, 920.0)
    .min_inner_size(1024.0, 720.0)
    .resizable(true)
    .build()?;

  Ok(())
}

fn find_available_port(start: u16, attempts: u16) -> Result<u16, Box<dyn Error>> {
  for offset in 0..attempts {
    let port = start.saturating_add(offset);
    if TcpListener::bind(("127.0.0.1", port)).is_ok() {
      return Ok(port);
    }
  }

  Err("Unable to find an open port for the bundled Tilder backend.".into())
}

fn spawn_backend(app: &AppHandle, port: u16) -> Result<Child, Box<dyn Error>> {
  let resource_dir = normalize_for_child_process(app.path().resource_dir()?);
  let app_root = normalize_for_child_process(resource_dir.join("app"));
  let data_dir = normalize_for_child_process(app.path().app_local_data_dir()?);
  std::fs::create_dir_all(&data_dir)?;

  let server_entry = normalize_for_child_process(app_root.join("server.js"));
  let node_binary = normalize_for_child_process(bundled_node_path(&resource_dir)?);

  let mut command = Command::new(node_binary);
  command
    .arg(server_entry)
    .current_dir(&app_root)
    .env("NODE_ENV", "production")
    .env("PORT", port.to_string())
    .env("TILDER_APP_ROOT", &app_root)
    .env("TILDER_DIST_DIR", app_root.join("dist"))
    .env("TILDER_DATA_DIR", data_dir)
    .stdin(Stdio::null())
    .stdout(Stdio::null())
    .stderr(Stdio::null());

  #[cfg(target_os = "windows")]
  {
    use std::os::windows::process::CommandExt;

    const CREATE_NO_WINDOW: u32 = 0x08000000;
    command.creation_flags(CREATE_NO_WINDOW);
  }

  Ok(command.spawn()?)
}

fn bundled_node_path(resource_dir: &PathBuf) -> Result<PathBuf, Box<dyn Error>> {
  let extension = if cfg!(target_os = "windows") { ".exe" } else { "" };
  let file_name = format!("tilder-node{extension}");
  let current_exe_dir = std::env::current_exe()?
    .parent()
    .map(PathBuf::from)
    .ok_or("Unable to determine the Tilder executable directory.")?;
  let candidates = [
    current_exe_dir.join("binaries").join(&file_name),
    current_exe_dir.join(&file_name),
    resource_dir.join("binaries").join(&file_name),
    resource_dir.join(&file_name),
  ];

  for candidate in candidates {
    if candidate.exists() {
      return Ok(candidate);
    }
  }

  Err("Bundled Node runtime was not found. Run `npm run build:desktop` before packaging.".into())
}

fn wait_for_backend(port: u16, timeout: Duration) -> Result<(), Box<dyn Error>> {
  let address: SocketAddr = format!("127.0.0.1:{port}").parse()?;
  let deadline = Instant::now() + timeout;

  while Instant::now() < deadline {
    if TcpStream::connect_timeout(&address, Duration::from_millis(300)).is_ok() {
      return Ok(());
    }

    thread::sleep(Duration::from_millis(200));
  }

  Err("The bundled Tilder backend did not start in time.".into())
}

fn stop_backend(app: &AppHandle) {
  let state = app.state::<BackendState>();
  let mut guard = state.child.lock().expect("backend state lock poisoned");

  if let Some(mut child) = guard.take() {
    let _ = child.kill();
    let _ = child.wait();
  }
}

#[cfg(target_os = "windows")]
fn normalize_for_child_process(path: PathBuf) -> PathBuf {
  let raw = path.to_string_lossy();

  if let Some(stripped) = raw.strip_prefix(r"\\?\UNC\") {
    return PathBuf::from(format!(r"\\{stripped}"));
  }

  if let Some(stripped) = raw.strip_prefix(r"\\?\") {
    return PathBuf::from(stripped);
  }

  path
}

#[cfg(not(target_os = "windows"))]
fn normalize_for_child_process(path: PathBuf) -> PathBuf {
  path
}
