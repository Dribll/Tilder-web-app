import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const INCLUDED_KEYS = {
  keywords: 'Keyword',
  typeKeywords: 'Class',
  builtinFunctions: 'Function',
  supportFunctions: 'Function',
  builtinMethods: 'Method',
  supportMacros: 'Function',
  builtinVariables: 'Variable',
  pseudoVariables: 'Variable',
  builtinLiterals: 'Value',
  constants: 'Constant',
  supportConstants: 'Constant',
  builtinTypes: 'Class',
  nameBuiltin: 'Variable',
  declarationKeywords: 'Keyword',
  namespaceKeywords: 'Keyword',
  otherKeywords: 'Keyword',
  operatorKeywords: 'Keyword',
};

function normalizeValue(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry).trim()).filter(Boolean);
  }

  if (value instanceof RegExp) {
    return value.source
      .split('|')
      .map((entry) => entry.replace(/^\(\?:/, '').replace(/\)$/, '').trim())
      .filter((entry) => entry && !entry.includes('\\') && !entry.includes('['));
  }

  return [];
}

function createEntry(label, detail, kind) {
  return {
    label,
    detail,
    documentation: `${detail} suggestion from Monaco language data.`,
    kind,
    sortText: kind === 'Keyword' ? 'ba' : 'bb',
  };
}

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const languagesDirectory = path.resolve(currentDirectory, '../node_modules/monaco-editor/esm/vs/basic-languages');
const directoryNames = await readdir(languagesDirectory, { withFileTypes: true });
const completions = {};

for (const directory of directoryNames) {
  if (!directory.isDirectory()) {
    continue;
  }

  const languageId = directory.name;
  const modulePath = path.resolve(languagesDirectory, languageId, `${languageId}.js`);

  try {
    const module = await import(pathToFileURL(modulePath).href);
    const language = module.language || {};
    const languageEntries = [];
    const seen = new Set();

    Object.entries(INCLUDED_KEYS).forEach(([key, kind]) => {
      normalizeValue(language[key]).forEach((label) => {
        const normalizedLabel = String(label).trim();
        if (!normalizedLabel || seen.has(normalizedLabel)) {
          return;
        }

        seen.add(normalizedLabel);
        languageEntries.push(createEntry(normalizedLabel, `${key} (${languageId})`, kind));
      });
    });

    if (languageEntries.length) {
      completions[languageId] = languageEntries.sort((left, right) => left.label.localeCompare(right.label));
    }
  } catch {
    // Skip languages that cannot be imported cleanly.
  }
}

const output = {
  metadata: {
    source: 'monaco-editor basic-languages',
    generatedAt: new Date().toISOString(),
    languageCount: Object.keys(completions).length,
    completionCount: Object.values(completions).reduce((count, entries) => count + entries.length, 0),
  },
  completions,
};

const outputPath = path.resolve(currentDirectory, '../src/components/Editor/languageCompletions.generated.json');
await writeFile(outputPath, JSON.stringify(output, null, 2));
console.log(`Generated ${output.metadata.completionCount} completions across ${output.metadata.languageCount} languages.`);
