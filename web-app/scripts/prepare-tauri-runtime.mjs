import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const srcTauriDir = path.join(projectRoot, 'src-tauri');
const binariesDir = path.join(srcTauriDir, 'binaries');
const stagedAppDir = path.join(srcTauriDir, 'resources', 'app');
const distDir = path.join(projectRoot, 'dist');
const nodeModulesDir = path.join(projectRoot, 'node_modules');

function resolveTargetTriple() {
  try {
    const triple = execFileSync('rustc', ['--print', 'host-tuple'], {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    if (triple) {
      return triple;
    }
  } catch {
    // Fall back to `rustc -vV` for older toolchains.
  }

  const rustInfo = execFileSync('rustc', ['-vV'], {
    cwd: projectRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
  const match = rustInfo.match(/^host:\s+(.+)$/m);

  if (!match) {
    throw new Error('Unable to determine the Rust target triple for the Tauri sidecar.');
  }

  return match[1].trim();
}

async function copyIntoStage(sourceRelativePath) {
  const sourcePath = path.join(projectRoot, sourceRelativePath);
  const targetPath = path.join(stagedAppDir, sourceRelativePath);
  const stats = await fs.stat(sourcePath).catch(() => null);

  if (!stats) {
    throw new Error(`Required runtime asset is missing: ${sourceRelativePath}`);
  }

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.cp(sourcePath, targetPath, { recursive: true, force: true });
}

async function main() {
  const targetTriple = resolveTargetTriple();
  const nodeBinaryPath = process.execPath;
  const extension = process.platform === 'win32' ? '.exe' : '';
  const bundledBinaryPath = path.join(binariesDir, `tilder-node-${targetTriple}${extension}`);

  await fs.access(distDir);
  await fs.access(nodeModulesDir);

  await fs.mkdir(binariesDir, { recursive: true });
  await fs.copyFile(nodeBinaryPath, bundledBinaryPath);

  await fs.mkdir(stagedAppDir, { recursive: true });

  await copyIntoStage('server.js');
  await copyIntoStage('localRunner.js');
  await copyIntoStage('package.json');
  await copyIntoStage('package-lock.json');
  await copyIntoStage('dist');
  await copyIntoStage('node_modules');

  const envPath = path.join(projectRoot, '.env');
  const hasEnvFile = await fs.stat(envPath).then(() => true).catch(() => false);
  if (hasEnvFile) {
    await copyIntoStage('.env');
  }

  console.log(`Prepared Tauri runtime assets in ${stagedAppDir}`);
  console.log(`Copied Node runtime to ${bundledBinaryPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
