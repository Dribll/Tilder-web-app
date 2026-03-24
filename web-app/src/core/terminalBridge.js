export function getDisplayPath(workspace, path) {
  const root = workspace.getRootNode();
  if (!root) {
    return 'workspace';
  }

  if (!path || path === 'root') {
    return `/${workspace.rootName || root.name || 'workspace'}`;
  }

  return `/${workspace.rootName || root.name || 'workspace'}/${path}`;
}

function normalizeRelativePath(inputPath = '', cwdPath = 'root') {
  const trimmed = inputPath.trim().replace(/\\/g, '/');
  if (!trimmed || trimmed === '.') {
    return cwdPath;
  }

  const rawSegments = trimmed
    .replace(/^\/+/, '')
    .split('/')
    .filter(Boolean);

  const seed = cwdPath && cwdPath !== 'root' && !trimmed.startsWith('/') ? cwdPath.split('/') : [];
  const nextSegments = [...seed];

  rawSegments.forEach((segment) => {
    if (segment === '.') {
      return;
    }

    if (segment === '..') {
      nextSegments.pop();
      return;
    }

    nextSegments.push(segment);
  });

  return nextSegments.length ? nextSegments.join('/') : 'root';
}

function resolveNode(workspace, targetPath, cwdPath) {
  const root = workspace.getRootNode();
  if (!root) {
    return root;
  }

  if (!targetPath || targetPath === '.' || targetPath === '/') {
    return cwdPath === 'root' ? root : workspace.findNode(cwdPath);
  }

  const normalized = normalizeRelativePath(targetPath, cwdPath);
  return normalized === 'root' ? root : workspace.findNode(normalized);
}

function renderTree(node, depth = 0, lines = []) {
  const prefix = depth ? `${'  '.repeat(depth - 1)}- ` : '';
  const suffix = node.type === 'folder' ? '/' : '';
  lines.push(`${prefix}${node.name || 'root'}${suffix}`);

  if (node.children?.length) {
    node.children.forEach((child) => renderTree(child, depth + 1, lines));
  }

  return lines;
}

async function readNodeContent(workspace, node) {
  if (!node || node.type !== 'file') {
    return '';
  }

  if (node.isDraft) {
    return node.content || '';
  }

  return workspace.readFile(node);
}

export function getTerminalMode() {
  return window.__TAURI__ ? 'tauri-ready' : 'browser-workspace';
}

export async function executeTerminalCommand(command, { workspace, cwdPath }) {
  const raw = command.trim();
  if (!raw) {
    return { lines: [], cwdPath };
  }

  const [cmd, ...args] = raw.split(/\s+/);
  const joinedArgs = args.join(' ');
  const root = workspace.getRootNode();

  if (cmd === 'clear') {
    return { clear: true, cwdPath };
  }

  if (cmd === 'help') {
    return {
      cwdPath,
      lines: [
        'Browser terminal commands:',
        'help, clear, pwd, ls [path], cd <folder>, tree [path], cat <file>, open <file>, mode',
        'This web build can browse the current workspace safely.',
      ],
    };
  }

  if (cmd === 'mode') {
    return {
      cwdPath,
      lines: [getTerminalMode() === 'tauri-ready' ? 'Native bridge detected.' : 'Browser workspace mode: safe workspace commands only.'],
    };
  }

  if (cmd === 'pwd') {
    return {
      cwdPath,
      lines: [getDisplayPath(workspace, cwdPath)],
    };
  }

  if (!root) {
    return {
      cwdPath,
      error: 'Open or create a workspace first to use terminal workspace commands.',
    };
  }

  if (cmd === 'ls') {
    const node = resolveNode(workspace, joinedArgs || '.', cwdPath);
    if (!node) {
      return { cwdPath, error: `Path not found: ${joinedArgs}` };
    }

    if (node.type === 'file') {
      return { cwdPath, lines: [node.name] };
    }

    const lines = (node.children || []).map((child) => `${child.type === 'folder' ? 'dir ' : 'file'} ${child.name}`);
    return {
      cwdPath,
      lines: lines.length ? lines : ['(empty folder)'],
    };
  }

  if (cmd === 'tree') {
    const node = resolveNode(workspace, joinedArgs || '.', cwdPath);
    if (!node) {
      return { cwdPath, error: `Path not found: ${joinedArgs}` };
    }

    return {
      cwdPath,
      lines: renderTree(node),
    };
  }

  if (cmd === 'cd') {
    const node = resolveNode(workspace, joinedArgs || 'root', cwdPath);
    if (!node || node.type !== 'folder') {
      return { cwdPath, error: `Folder not found: ${joinedArgs || 'root'}` };
    }

    return {
      cwdPath: node.path,
      lines: [`cwd -> ${getDisplayPath(workspace, node.path)}`],
    };
  }

  if (cmd === 'cat') {
    const node = resolveNode(workspace, joinedArgs, cwdPath);
    if (!node || node.type !== 'file') {
      return { cwdPath, error: `File not found: ${joinedArgs}` };
    }

    const content = await readNodeContent(workspace, node);
    return {
      cwdPath,
      lines: [content || '(empty file)'],
    };
  }

  if (cmd === 'open') {
    const normalizedPath = normalizeRelativePath(joinedArgs, cwdPath);
    const node = normalizedPath === 'root' ? root : workspace.findNode(normalizedPath);
    if (!node || node.type !== 'file') {
      return { cwdPath, error: `File not found: ${joinedArgs}` };
    }

    return {
      cwdPath,
      openPath: node.path,
      lines: [`Opened ${node.name}`],
    };
  }

  return {
    cwdPath,
    error: `Unknown command: ${cmd}. Run "help" to see supported commands.`,
  };
}
