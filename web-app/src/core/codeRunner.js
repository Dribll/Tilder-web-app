const LANGUAGE_NAME_HINTS = {
  c: ['C (GCC 9.2.0)', 'C (Clang 7.0.1)'],
  cpp: ['C++ (GCC 9.2.0)', 'C++ (Clang 7.0.1)'],
  csharp: ['C# (Mono 6.6.0.161)'],
  css: [],
  go: ['Go (1.13.5)'],
  html: [],
  java: ['Java (OpenJDK 13.0.1)'],
  javascript: ['JavaScript (Node.js 12.14.0)', 'JavaScript (Node.js 18.15.0)'],
  json: [],
  markdown: [],
  php: ['PHP (7.4.1)'],
  plaintext: [],
  python: ['Python (3.8.1)', 'Python (3.11.2)'],
  ruby: ['Ruby (2.7.0)'],
  rust: ['Rust (1.40.0)'],
  shell: ['Bash (5.0.0)'],
  sql: ['SQLite (3.27.2)'],
  typescript: ['TypeScript (3.7.4)', 'TypeScript (5.0.3)'],
  xml: [],
  yaml: [],
};

function normalizeName(value = '') {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

export async function fetchRunnerLanguages() {
  const response = await fetch('/api/runner/languages');
  if (!response.ok) {
    throw new Error('Unable to load runner languages.');
  }

  return response.json();
}

export function resolveRunnerLanguage(activeTab, languages) {
  if (!activeTab?.language) {
    return null;
  }

  const hints = LANGUAGE_NAME_HINTS[activeTab.language] || [];
  if (!hints.length) {
    return null;
  }

  const normalizedLanguages = languages.map((language) => ({
    ...language,
    normalizedName: normalizeName(language.name),
  }));

  for (const hint of hints) {
    const normalizedHint = normalizeName(hint);
    const match = normalizedLanguages.find((language) => language.normalizedName === normalizedHint);
    if (match) {
      return match;
    }
  }

  for (const hint of hints) {
    const normalizedHint = normalizeName(hint);
    const partialMatch = normalizedLanguages.find((language) => language.normalizedName.includes(normalizedHint.split('(')[0].trim()));
    if (partialMatch) {
      return partialMatch;
    }
  }

  return null;
}

export async function runCode({ source, languageId, stdin = '' }) {
  const response = await fetch('/api/runner/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source_code: source,
      language_id: languageId,
      stdin,
    }),
  });

  if (!response.ok) {
    throw new Error('Runner request failed.');
  }

  return response.json();
}

export async function runCodeLocally({ name, language, source }) {
  const response = await fetch('/api/terminal/run-file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      language,
      source,
    }),
  });

  if (!response.ok) {
    throw new Error('Local runner request failed.');
  }

  return response.json();
}

export async function syncTerminalWorkspaceRoot(snapshot) {
  const response = await fetch('/api/terminal/workspace-root', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(snapshot),
  });

  if (!response.ok) {
    throw new Error('Unable to sync terminal workspace.');
  }

  return response.json();
}

export function formatRunResult(result) {
  const lines = [];

  if (result.stdout) {
    lines.push('=== Output ===');
    lines.push(result.stdout);
  }

  if (result.stderr) {
    lines.push('=== Error ===');
    lines.push(result.stderr);
  }

  if (result.compile_output) {
    lines.push('=== Compile Output ===');
    lines.push(result.compile_output);
  }

  if (result.message) {
    lines.push('=== Message ===');
    lines.push(result.message);
  }

  lines.push(`Status: ${result.status?.description || 'Unknown'}`);
  return lines;
}

export function formatLocalRunResult(result) {
  const lines = [];

  if (result.commandLines?.length) {
    lines.push('=== Command ===');
    result.commandLines.forEach((command) => lines.push(command));
  }

  if (result.stdout) {
    lines.push('=== Output ===');
    lines.push(result.stdout);
  }

  if (result.stderr) {
    lines.push(result.ok ? '=== Notes ===' : '=== Error ===');
    lines.push(result.stderr);
  }

  if (result.exitCode !== undefined && result.exitCode !== null) {
    lines.push(`Exit Code: ${result.exitCode}`);
  }

  return lines.length ? lines : ['Process finished.'];
}
