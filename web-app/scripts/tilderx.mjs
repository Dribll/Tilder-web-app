import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { normalizeExtensionPackagePayload } from '../shared/extensions/publishing.js';

function parseArgs(argv) {
  const [command = 'help', ...rest] = argv;
  const positionals = [];
  const flags = {};

  for (let index = 0; index < rest.length; index += 1) {
    const value = rest[index];
    if (!value.startsWith('--')) {
      positionals.push(value);
      continue;
    }

    const key = value.slice(2);
    const next = rest[index + 1];
    if (!next || next.startsWith('--')) {
      flags[key] = true;
      continue;
    }

    flags[key] = next;
    index += 1;
  }

  return { command, positionals, flags };
}

function printUsage() {
  console.log(`tilderx

Usage:
  node scripts/tilderx.mjs init [directory]
  node scripts/tilderx.mjs validate [directory-or-package]
  node scripts/tilderx.mjs package [directory] --publisher <publisherId> [--out ./dist/extension.tilder.json]
  node scripts/tilderx.mjs publish [directory-or-package] --registry <url> --publisher <publisherId> --token <token>
`);
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDirectory(targetPath) {
  await fs.mkdir(targetPath, { recursive: true });
}

async function writeFileIfMissing(targetPath, content) {
  if (await fileExists(targetPath)) {
    return false;
  }

  await ensureDirectory(path.dirname(targetPath));
  await fs.writeFile(targetPath, content, 'utf8');
  return true;
}

async function initExtension(directory) {
  const targetDir = path.resolve(directory || process.cwd());
  const packageDirName = path.basename(targetDir);
  const manifestPath = path.join(targetDir, 'manifest.json');
  const entryPath = path.join(targetDir, 'dist', 'main.js');
  const readmePath = path.join(targetDir, 'README.md');

  await ensureDirectory(targetDir);

  const manifest = {
    manifestVersion: 2,
    id: `sample.${packageDirName}`,
    name: 'Sample Tilder Extension',
    publisher: 'Sample Publisher',
    version: '1.0.0',
    category: 'Productivity',
    summary: 'Describe what this extension adds to Tilder.',
    description: 'A sample Tilder extension package. Update this manifest before publishing.',
    tags: ['sample'],
    permissions: ['notifications'],
    iconClass: 'fa-solid fa-bolt',
    accent: '#7f86ff',
    webEntrypoint: 'dist/main.js',
  };

  const entrySource = `export function activate(api) {
  api.notifications.info('Sample Tilder extension activated.');

  const dispose = api.commands.register('hello', () => {
    api.notifications.info('Hello from your Tilder extension.');
  });

  return () => {
    dispose();
  };
}
`;

  const readmeSource = `# Sample Tilder Extension

This folder was scaffolded by \`tilderx init\`.

## Files

- \`manifest.json\` contains the package metadata
- \`dist/main.js\` is the browser entrypoint loaded by Tilder

## Next steps

1. Update the publisher/name/version in \`manifest.json\`
2. Replace the sample code in \`dist/main.js\`
3. Run \`node scripts/tilderx.mjs validate <folder>\`
4. Run \`node scripts/tilderx.mjs package <folder> --publisher <publisherId>\`
5. Publish with \`node scripts/tilderx.mjs publish ...\`
`;

  const created = [];
  if (await writeFileIfMissing(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)) {
    created.push(manifestPath);
  }
  if (await writeFileIfMissing(entryPath, entrySource)) {
    created.push(entryPath);
  }
  if (await writeFileIfMissing(readmePath, readmeSource)) {
    created.push(readmePath);
  }

  console.log(`Initialized Tilder extension at ${targetDir}`);
  created.forEach((entry) => console.log(`created ${entry}`));
}

async function collectFiles(rootDir, currentDir = rootDir, bucket = []) {
  const entries = await fs.readdir(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === '.DS_Store') {
      continue;
    }

    const absolutePath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      await collectFiles(rootDir, absolutePath, bucket);
      continue;
    }

    if (path.basename(absolutePath) === 'manifest.json') {
      continue;
    }

    const relativePath = path.relative(rootDir, absolutePath).replace(/\\/g, '/');
    const content = await fs.readFile(absolutePath);
    bucket.push({
      path: relativePath,
      encoding: 'base64',
      content: content.toString('base64'),
    });
  }

  return bucket;
}

async function buildPackagePayload(inputPath, publisherIdOverride = '') {
  const resolvedPath = path.resolve(inputPath || process.cwd());
  const stats = await fs.stat(resolvedPath);

  if (stats.isFile()) {
    const payload = JSON.parse(await fs.readFile(resolvedPath, 'utf8'));
    return payload;
  }

  const manifestPath = path.join(resolvedPath, 'manifest.json');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  const files = await collectFiles(resolvedPath);

  return {
    packageVersion: 1,
    publisherId: publisherIdOverride || manifest.publisherId || '',
    manifest,
    files,
  };
}

async function validatePackage(inputPath, publisherIdOverride = '') {
  const payload = await buildPackagePayload(inputPath, publisherIdOverride);
  const normalized = normalizeExtensionPackagePayload(payload);

  const report = {
    ok: normalized.errors.length === 0,
    packageVersion: normalized.packageVersion,
    publisherId: normalized.publisherId,
    manifest: normalized.manifest,
    stats: normalized.stats,
    warnings: normalized.warnings,
    errors: normalized.errors,
  };

  console.log(JSON.stringify(report, null, 2));
  if (!report.ok) {
    process.exitCode = 1;
  }

  return { payload, report };
}

async function writePackageFile(inputPath, outFile, publisherIdOverride = '') {
  const payload = await buildPackagePayload(inputPath, publisherIdOverride);
  const normalized = normalizeExtensionPackagePayload(payload);

  if (normalized.errors.length) {
    console.error(normalized.errors.join('\n'));
    process.exit(1);
  }

  const outputPath = path.resolve(outFile || path.join(inputPath, 'dist', `${normalized.manifest.id}.tilder.json`));
  await ensureDirectory(path.dirname(outputPath));
  await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${outputPath}`);
}

async function publishPackage(inputPath, options) {
  const registry = String(options.registry || '').trim().replace(/\/$/, '');
  const publisherId = String(options.publisher || '').trim();
  const token = String(options.token || '').trim();

  if (!registry) {
    throw new Error('Publish requires --registry <url>.');
  }

  if (!publisherId) {
    throw new Error('Publish requires --publisher <publisherId>.');
  }

  if (!token) {
    throw new Error('Publish requires --token <publisher token>.');
  }

  const payload = await buildPackagePayload(inputPath, publisherId);
  const validation = normalizeExtensionPackagePayload(payload);
  if (validation.errors.length) {
    throw new Error(`Package validation failed:\n${validation.errors.join('\n')}`);
  }

  const response = await fetch(`${registry}/api/extensions/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || 'Publish failed.');
  }

  console.log(JSON.stringify(result, null, 2));
}

const { command, positionals, flags } = parseArgs(process.argv.slice(2));

try {
  switch (command) {
    case 'init':
      await initExtension(positionals[0]);
      break;
    case 'validate':
      await validatePackage(positionals[0], flags.publisher || '');
      break;
    case 'package':
      await writePackageFile(positionals[0] || process.cwd(), flags.out || '', flags.publisher || '');
      break;
    case 'publish':
      await publishPackage(positionals[0] || process.cwd(), flags);
      break;
    default:
      printUsage();
      break;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : 'tilderx failed.');
  process.exit(1);
}
