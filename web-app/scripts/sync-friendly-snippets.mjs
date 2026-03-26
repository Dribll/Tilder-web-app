import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAW_BASE_URL = 'https://raw.githubusercontent.com/rafamadriz/friendly-snippets/main/';
const PACKAGE_URL = `${RAW_BASE_URL}package.json`;

const LANGUAGE_ALIASES = {
  all: 'plaintext',
  astro: 'html',
  blade: 'html',
  cs: 'csharp',
  eelixir: 'elixir',
  eruby: 'html',
  global: 'plaintext',
  heex: 'html',
  htmldjango: 'html',
  jade: 'html',
  javascriptreact: 'javascript',
  less: 'css',
  mdx: 'markdown',
  plaintext: 'plaintext',
  plaintex: 'plaintext',
  ps1: 'powershell',
  pug: 'html',
  sass: 'scss',
  shellscript: 'shell',
  sh: 'shell',
  svelte: 'html',
  tex: 'plaintext',
  typescriptreact: 'typescript',
  vue: 'html',
  zsh: 'shell',
};

function normalizeLanguage(language) {
  return LANGUAGE_ALIASES[language] || language;
}

function normalizeText(value) {
  if (Array.isArray(value)) {
    return value.join('\n');
  }

  return typeof value === 'string' ? value : '';
}

function normalizeDescription(value) {
  if (Array.isArray(value)) {
    return value.join(' ');
  }

  return typeof value === 'string' ? value : '';
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Tilder-Codex',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json();
}

const packageJson = await fetchJson(PACKAGE_URL);
const bundle = {};
const dedupe = new Set();

for (const contribution of packageJson.contributes?.snippets || []) {
  const languages = Array.isArray(contribution.language) ? contribution.language : [contribution.language];
  const snippets = await fetchJson(`${RAW_BASE_URL}${contribution.path.replace(/^\.\//, '')}`);

  Object.entries(snippets).forEach(([name, snippet]) => {
    const prefixes = Array.isArray(snippet.prefix) ? snippet.prefix : [snippet.prefix || name];
    const insertText = normalizeText(snippet.body);
    const description = normalizeDescription(snippet.description);

    prefixes.forEach((prefix) => {
      if (!prefix || !insertText) {
        return;
      }

      languages.forEach((language) => {
        const normalizedLanguage = normalizeLanguage(String(language).toLowerCase());
        const key = `${normalizedLanguage}::${prefix}::${insertText}`;

        if (dedupe.has(key)) {
          return;
        }

        dedupe.add(key);
        bundle[normalizedLanguage] ||= [];
        bundle[normalizedLanguage].push({
          label: String(prefix),
          insertText,
          detail: name,
          documentation: description,
          sortText: 'ab',
        });
      });
    });
  });
}

Object.values(bundle).forEach((entries) => {
  entries.sort((left, right) => {
    if (left.label.length !== right.label.length) {
      return left.label.length - right.label.length;
    }

    return left.label.localeCompare(right.label);
  });
});

const output = {
  metadata: {
    source: 'rafamadriz/friendly-snippets',
    generatedAt: new Date().toISOString(),
    languageCount: Object.keys(bundle).length,
    snippetCount: Object.values(bundle).reduce((count, entries) => count + entries.length, 0),
  },
  snippets: bundle,
};

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(currentDirectory, '../src/components/Editor/friendlySnippets.generated.json');

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(output, null, 2));

console.log(`Generated ${output.metadata.snippetCount} snippets across ${output.metadata.languageCount} languages.`);
