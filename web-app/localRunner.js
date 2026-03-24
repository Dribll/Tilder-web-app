import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

function sanitizeFileName(name = 'snippet.txt') {
  return name.replace(/[<>:"/\\|?*\u0000-\u001F]/g, '_') || 'snippet.txt';
}

function sanitizeFolderName(name = 'workspace') {
  return sanitizeFileName(name).replace(/\.+$/, '') || 'workspace';
}

function resolveLocalRunner(name = '', language = '') {
  const normalizedLanguage = String(language || '').toLowerCase();
  const extension = name.includes('.') ? name.split('.').pop().toLowerCase() : '';
  const baseName = name.replace(/\.[^.]+$/, '') || 'snippet';

  const key = normalizedLanguage || extension;

  const definitions = {
    c: {
      type: 'compiled',
      fileName: sanitizeFileName(name || 'main.c'),
      compile: [['gcc', ['__FILE__', '-o', '__BIN__']], ['clang', ['__FILE__', '-o', '__BIN__']]],
    },
    cpp: {
      type: 'compiled',
      fileName: sanitizeFileName(name || 'main.cpp'),
      compile: [['g++', ['__FILE__', '-o', '__BIN__']], ['clang++', ['__FILE__', '-o', '__BIN__']]],
    },
    go: {
      type: 'interpreted',
      fileName: sanitizeFileName(name || 'main.go'),
      run: [['go', ['run', '__FILE__']]],
    },
    java: {
      type: 'java',
      fileName: `${sanitizeFileName(baseName)}.java`,
      compile: [['javac', ['__FILE__']]],
      run: [['java', ['__CLASS__']]],
      className: sanitizeFileName(baseName),
    },
    javascript: {
      type: 'interpreted',
      fileName: sanitizeFileName(name || 'main.js'),
      run: [['node', ['__FILE__']]],
    },
    php: {
      type: 'interpreted',
      fileName: sanitizeFileName(name || 'main.php'),
      run: [['php', ['__FILE__']]],
    },
    python: {
      type: 'interpreted',
      fileName: sanitizeFileName(name || 'main.py'),
      run: [['python', ['__FILE__']], ['python3', ['__FILE__']]],
    },
    ruby: {
      type: 'interpreted',
      fileName: sanitizeFileName(name || 'main.rb'),
      run: [['ruby', ['__FILE__']]],
    },
    rust: {
      type: 'compiled',
      fileName: sanitizeFileName(name || 'main.rs'),
      compile: [['rustc', ['__FILE__', '-o', '__BIN__']]],
    },
    shell: {
      type: 'interpreted',
      fileName: sanitizeFileName(name || 'main.sh'),
      run: [['bash', ['__FILE__']]],
    },
    typescript: {
      type: 'interpreted',
      fileName: sanitizeFileName(name || 'main.ts'),
      run: [['npx', ['tsx', '__FILE__']], ['npx', ['ts-node', '__FILE__']]],
    },
  };

  return definitions[key] || null;
}

function renderArgs(args, replacements) {
  return args.map((value) => replacements[value] ?? value);
}

function formatCommand(command, args) {
  return [command, ...args]
    .map((segment) => (/\s/.test(segment) ? `"${segment}"` : segment))
    .join(' ');
}

function runProcess(command, args, cwd) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      env: process.env,
      shell: false,
      windowsHide: true,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      resolve({
        ok: false,
        code: null,
        stdout,
        stderr: stderr || error.message,
        missingCommand: true,
      });
    });

    child.on('close', (code) => {
      resolve({
        ok: code === 0,
        code,
        stdout,
        stderr,
        missingCommand: false,
      });
    });
  });
}

async function runCandidate(candidates, replacements, cwd) {
  let lastResult = null;

  for (const [command, rawArgs] of candidates) {
    const args = renderArgs(rawArgs, replacements);
    const result = await runProcess(command, args, cwd);
    const displayCommand = formatCommand(command, args);

    if (result.missingCommand) {
      lastResult = { ...result, displayCommand };
      continue;
    }

    return { ...result, displayCommand };
  }

  return lastResult || {
    ok: false,
    code: null,
    stdout: '',
    stderr: 'No compatible runtime was found on the server.',
    displayCommand: '',
  };
}

export async function runLocalFile({ name, language, source }) {
  const runner = resolveLocalRunner(name, language);
  if (!runner) {
    return { supported: false };
  }

  const usingWorkspaceMirror = false;
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'tilder-run-'));
  const fileName = runner.fileName;
  const filePath = path.join(tempDir, fileName);
  const binaryPath = path.join(tempDir, process.platform === 'win32' ? 'tilder-runner.exe' : 'tilder-runner');
  const replacements = {
    __FILE__: fileName,
    __BIN__: binaryPath,
    __CLASS__: runner.className || path.parse(fileName).name,
  };

  try {
    await fs.writeFile(filePath, source ?? '', 'utf8');

    const commandLines = [];
    let compileOutput = null;

    if (runner.compile) {
      compileOutput = await runCandidate(runner.compile, replacements, tempDir);
      commandLines.push(compileOutput.displayCommand);

      if (!compileOutput.ok) {
        return {
          supported: true,
          ok: false,
          commandLines,
          stdout: compileOutput.stdout,
          stderr: compileOutput.stderr,
          exitCode: compileOutput.code,
        };
      }
    }

    let execution = null;
    if (runner.type === 'compiled') {
      execution = await runProcess(binaryPath, [], tempDir);
      execution.displayCommand = process.platform === 'win32' ? path.basename(binaryPath) : `./${path.basename(binaryPath)}`;
    } else if (runner.run) {
      execution = await runCandidate(runner.run, replacements, tempDir);
    }

    if (!execution) {
      return {
        supported: true,
        ok: false,
        commandLines,
        stdout: '',
        stderr: 'Runner configuration is incomplete.',
        exitCode: null,
      };
    }

    commandLines.push(execution.displayCommand);

    return {
      supported: true,
      ok: execution.ok,
      commandLines,
      stdout: execution.stdout,
      stderr: execution.stderr,
      exitCode: execution.code,
    };
  } finally {
    if (!usingWorkspaceMirror) {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  }
}

export async function syncWorkspaceMirror({ rootName, entries = [] }) {
  const baseDir = path.join(os.tmpdir(), 'tilder-workspaces', sanitizeFolderName(rootName || 'workspace'));
  await fs.rm(baseDir, { recursive: true, force: true });
  await fs.mkdir(baseDir, { recursive: true });

  for (const entry of entries) {
    const normalizedPath = String(entry.path || '')
      .replace(/^root\/?/, '')
      .replace(/^\/+/, '');

    if (!normalizedPath) {
      continue;
    }

    const targetPath = path.join(baseDir, normalizedPath);
    if (entry.type === 'folder') {
      await fs.mkdir(targetPath, { recursive: true });
      continue;
    }

    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, '', 'utf8');
  }

  return { cwd: baseDir };
}

export async function runWorkspaceFile({ name, language, source, rootName, entries = [], relativePath }) {
  const runner = resolveLocalRunner(name, language);
  if (!runner) {
    return { supported: false };
  }

  const { cwd } = await syncWorkspaceMirror({ rootName, entries });
  const fallbackRelative = sanitizeFileName(name || runner.fileName);
  const relativeFilePath = String(relativePath || fallbackRelative).replace(/^root\/?/, '').replace(/^\/+/, '');
  const targetFilePath = path.join(cwd, relativeFilePath);
  const binaryPath = path.join(cwd, process.platform === 'win32' ? 'tilder-runner.exe' : 'tilder-runner');
  const javaClass = relativeFilePath.replace(/\.[^.]+$/, '').split(/[\\/]/).join('.');
  const replacements = {
    __FILE__: relativeFilePath,
    __BIN__: binaryPath,
    __CLASS__: javaClass || runner.className || path.parse(relativeFilePath).name,
  };

  await fs.mkdir(path.dirname(targetFilePath), { recursive: true });
  await fs.writeFile(targetFilePath, source ?? '', 'utf8');

  const commandLines = [];
  let compileOutput = null;

  if (runner.compile) {
    compileOutput = await runCandidate(runner.compile, replacements, cwd);
    commandLines.push(compileOutput.displayCommand);

    if (!compileOutput.ok) {
      return {
        supported: true,
        ok: false,
        commandLines,
        stdout: compileOutput.stdout,
        stderr: compileOutput.stderr,
        exitCode: compileOutput.code,
        cwd,
      };
    }
  }

  let execution = null;
  if (runner.type === 'compiled') {
    execution = await runProcess(binaryPath, [], cwd);
    execution.displayCommand = process.platform === 'win32' ? path.basename(binaryPath) : `./${path.basename(binaryPath)}`;
  } else if (runner.run) {
    execution = await runCandidate(runner.run, replacements, cwd);
  }

  if (!execution) {
    return {
      supported: true,
      ok: false,
      commandLines,
      stdout: '',
      stderr: 'Runner configuration is incomplete.',
      exitCode: null,
      cwd,
    };
  }

  commandLines.push(execution.displayCommand);

  return {
    supported: true,
    ok: execution.ok,
    commandLines,
    stdout: execution.stdout,
    stderr: execution.stderr,
    exitCode: execution.code,
    cwd,
  };
}
