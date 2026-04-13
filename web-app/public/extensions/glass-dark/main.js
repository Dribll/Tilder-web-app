export async function activate(api) {
  api.styles.mount(`
    body {
      --bg-color-base: rgba(14, 16, 21, 0.75) !important;
      --sidebar-bg: rgba(22, 25, 33, 0.6) !important;
      --nav-bg: rgba(22, 25, 33, 0.4) !important;
      --accent-color: #0A84FF !important;
      --text-color: #E0E0E0 !important;
      --text-muted: #A0A0A5 !important;
      --border-color: rgba(255, 255, 255, 0.08) !important;
      --hover-bg: rgba(255, 255, 255, 0.1) !important;
      backdrop-filter: blur(24px) saturate(160%) !important;
      -webkit-backdrop-filter: blur(24px) saturate(160%) !important;
      background-image: linear-gradient(135deg, rgba(30,35,45,0.4) 0%, rgba(10,15,25,0.8) 100%) !important;
      color: var(--text-color) !important;
    }
    
    .monaco-editor, .monaco-editor-background, .monaco-editor .margin {
      background: transparent !important;
      --vscode-editor-background: transparent !important;
    }

    /* MacOS rounded corners style */
    .app-root {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .sidebar {
      border-right: 1px solid var(--border-color) !important;
      background: var(--sidebar-bg) !important;
      backdrop-filter: blur(20px) !important;
    }

    /* Scrollbars minimalist */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.2);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.3);
    }
  `, 'theme');
  api.notifications.info('Glass Dark (macOS Tahoe) Theme loaded successfully! Welcome to the glassy experience.');
}