export const CODE_EXTENSIONS = new Set([
  'c',
  'cpp',
  'cs',
  'css',
  'go',
  'h',
  'html',
  'java',
  'js',
  'json',
  'jsx',
  'md',
  'php',
  'py',
  'rb',
  'rs',
  'sh',
  'sql',
  'ts',
  'tsx',
  'txt',
  'xml',
  'yml',
  'yaml',
]);

export const ASSET_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico']);

export function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getExtension(name = '') {
  return name.includes('.') ? name.split('.').pop().toLowerCase() : '';
}

function collectFileNodes(nodes, bucket = []) {
  nodes.forEach((node) => {
    if (node.type === 'file') {
      bucket.push(node);
      return;
    }

    if (node.children?.length) {
      collectFileNodes(node.children, bucket);
    }
  });

  return bucket;
}

export function matchesPathFilters(path, includeFilter = '', excludeFilter = '') {
  const normalizedPath = path.toLowerCase();
  const includeTerms = includeFilter
    .split(',')
    .map((term) => term.trim().toLowerCase())
    .filter(Boolean);
  const excludeTerms = excludeFilter
    .split(',')
    .map((term) => term.trim().toLowerCase())
    .filter(Boolean);

  if (includeTerms.length && !includeTerms.some((term) => normalizedPath.includes(term))) {
    return false;
  }

  if (excludeTerms.some((term) => normalizedPath.includes(term))) {
    return false;
  }

  return true;
}

export function getSearchPool(workspace, scope = 'workspace') {
  if (scope === 'open') {
    return workspace.tabs.map((tab) => ({
      path: tab.path,
      name: tab.name,
      source: 'tab',
      tab,
      node: workspace.findNode(tab.path),
    }));
  }

  const root = workspace.getRootNode();
  if (!root) {
    return [];
  }

  return collectFileNodes(root.children || []).map((node) => ({
    path: node.path,
    name: node.name,
    source: 'tree',
    node,
    tab: workspace.tabs.find((tab) => tab.path === node.path) || null,
  }));
}

export function buildMatcher(query, { caseSensitive, wholeWord, useRegex }) {
  if (!query.trim()) {
    return null;
  }

  if (useRegex) {
    const flags = caseSensitive ? 'g' : 'gi';
    return new RegExp(query, flags);
  }

  const escaped = escapeRegex(query.trim());
  const source = wholeWord ? `\\b${escaped}\\b` : escaped;
  const flags = caseSensitive ? 'g' : 'gi';
  return new RegExp(source, flags);
}

export function getLinePreview(content, index) {
  const lineStart = content.lastIndexOf('\n', index - 1) + 1;
  const nextBreak = content.indexOf('\n', index);
  const lineEnd = nextBreak === -1 ? content.length : nextBreak;
  const lineText = content.slice(lineStart, lineEnd);
  const before = content.slice(0, index);
  const line = before.split('\n').length;
  const column = index - lineStart + 1;

  return {
    line,
    column,
    preview: lineText.trim() || '(empty line)',
  };
}

export function collectSymbols(content = '') {
  const patterns = [
    { type: 'function', regex: /(?:export\s+)?function\s+([A-Za-z0-9_]+)\s*\(/g },
    { type: 'class', regex: /(?:export\s+)?class\s+([A-Za-z0-9_]+)/g },
    { type: 'const', regex: /(?:export\s+)?const\s+([A-Za-z0-9_]+)\s*=/g },
    { type: 'let', regex: /(?:export\s+)?let\s+([A-Za-z0-9_]+)\s*=/g },
    { type: 'var', regex: /(?:export\s+)?var\s+([A-Za-z0-9_]+)\s*=/g },
    { type: 'interface', regex: /(?:export\s+)?interface\s+([A-Za-z0-9_]+)/g },
    { type: 'type', regex: /(?:export\s+)?type\s+([A-Za-z0-9_]+)/g },
  ];

  const symbols = [];

  patterns.forEach(({ type, regex }) => {
    let match = regex.exec(content);
    while (match) {
      const preview = getLinePreview(content, match.index);
      symbols.push({
        name: match[1],
        type,
        line: preview.line,
        column: preview.column,
        preview: preview.preview,
      });
      match = regex.exec(content);
    }
  });

  return symbols;
}

export async function readSearchContent(workspace, entry) {
  if (entry.tab?.content != null) {
    return entry.tab.content;
  }

  if (entry.node?.isDraft) {
    return entry.node.content || '';
  }

  if (entry.node) {
    return workspace.readFile(entry.node);
  }

  return '';
}
