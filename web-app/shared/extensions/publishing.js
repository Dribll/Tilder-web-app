import path from 'node:path';

export const TILDER_EXTENSION_PACKAGE_VERSION = 1;
export const MAX_EXTENSION_FILES = 200;
export const MAX_EXTENSION_FILE_SIZE = 1024 * 1024 * 2;
export const MAX_EXTENSION_ARCHIVE_SIZE = 1024 * 1024 * 8;

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizePublisherSlug(value, fallback = 'publisher') {
  return slugify(value) || slugify(fallback) || 'publisher';
}

export function sanitizeExtensionAssetPath(value) {
  const normalized = String(value || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .trim();

  if (!normalized) {
    throw new Error('Extension package files must include a relative path.');
  }

  if (normalized.includes('..') || path.posix.isAbsolute(normalized)) {
    throw new Error(`Invalid extension file path "${value}".`);
  }

  return normalized;
}

export function validateExtensionManifest(manifest = {}) {
  const errors = [];
  const warnings = [];
  const normalized = {
    id: String(manifest.id || '').trim(),
    name: String(manifest.name || '').trim(),
    publisher: String(manifest.publisher || '').trim(),
    publisherId: String(manifest.publisherId || '').trim(),
    version: String(manifest.version || '').trim(),
    category: String(manifest.category || 'Productivity').trim(),
    summary: String(manifest.summary || '').trim(),
    description: String(manifest.description || manifest.summary || '').trim(),
    tags: Array.isArray(manifest.tags) ? manifest.tags.map((tag) => String(tag).trim()).filter(Boolean) : [],
    permissions: Array.isArray(manifest.permissions)
      ? manifest.permissions.map((permission) => String(permission).trim()).filter(Boolean)
      : [],
    repository: String(manifest.repository || '').trim(),
    website: String(manifest.website || '').trim(),
    iconClass: String(manifest.iconClass || '').trim(),
    accent: String(manifest.accent || '').trim(),
    icon: String(manifest.icon || '').trim(),
    downloads: String(manifest.downloads || '').trim(),
    rating: Number(manifest.rating) || 0,
    webEntrypoint: String(manifest.webEntrypoint || manifest.main || '').trim(),
    manifestVersion: Number(manifest.manifestVersion) || 2,
  };

  if (!normalized.id) {
    errors.push('Manifest is missing "id".');
  }

  if (!normalized.name) {
    errors.push('Manifest is missing "name".');
  }

  if (!normalized.version) {
    errors.push('Manifest is missing "version".');
  } else if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z-.]+)?$/.test(normalized.version)) {
    warnings.push('Manifest version should follow semver like 1.0.0.');
  }

  if (!normalized.summary) {
    errors.push('Manifest is missing "summary".');
  }

  if (!normalized.description) {
    warnings.push('Manifest should include a longer "description".');
  }

  if (!normalized.webEntrypoint) {
    errors.push('Manifest is missing "webEntrypoint" (or "main").');
  }

  return {
    manifest: normalized,
    errors,
    warnings,
  };
}

export function normalizeExtensionPackagePayload(payload = {}) {
  const packageVersion = Number(payload.packageVersion || TILDER_EXTENSION_PACKAGE_VERSION);
  const publisherId = String(payload.publisherId || '').trim();
  const { manifest, errors, warnings } = validateExtensionManifest(payload.manifest || {});
  const rawFiles = Array.isArray(payload.files) ? payload.files : [];

  if (packageVersion !== TILDER_EXTENSION_PACKAGE_VERSION) {
    errors.push(`Package version ${packageVersion} is not supported.`);
  }

  if (!publisherId) {
    errors.push('Package is missing "publisherId".');
  }

  if (!rawFiles.length) {
    errors.push('Package must include at least one file.');
  }

  if (rawFiles.length > MAX_EXTENSION_FILES) {
    errors.push(`Package includes too many files (${rawFiles.length}).`);
  }

  const files = [];
  const seenPaths = new Set();
  let archiveSize = 0;

  rawFiles.forEach((file, index) => {
    const relativePath = sanitizeExtensionAssetPath(file?.path || '');
    if (seenPaths.has(relativePath)) {
      errors.push(`Duplicate file path "${relativePath}" in package.`);
      return;
    }

    seenPaths.add(relativePath);
    const encoding = String(file?.encoding || 'base64').trim().toLowerCase();
    if (encoding !== 'base64') {
      errors.push(`Unsupported encoding "${encoding}" for file "${relativePath}".`);
      return;
    }

    const content = String(file?.content || '');
    const sizeBytes = Buffer.byteLength(content, 'base64');
    archiveSize += sizeBytes;

    if (sizeBytes > MAX_EXTENSION_FILE_SIZE) {
      errors.push(`File "${relativePath}" exceeds the ${MAX_EXTENSION_FILE_SIZE} byte limit.`);
    }

    files.push({
      path: relativePath,
      content,
      encoding,
      sizeBytes,
      contentType: String(file?.contentType || '').trim(),
      index,
    });
  });

  if (archiveSize > MAX_EXTENSION_ARCHIVE_SIZE) {
    errors.push(`Package exceeds the ${MAX_EXTENSION_ARCHIVE_SIZE} byte archive limit.`);
  }

  const entryFile = manifest.webEntrypoint ? sanitizeExtensionAssetPath(manifest.webEntrypoint) : '';
  if (entryFile && !files.some((file) => file.path === entryFile)) {
    errors.push(`Entrypoint "${entryFile}" is missing from the package files.`);
  }

  const iconFile = manifest.icon ? sanitizeExtensionAssetPath(manifest.icon) : '';
  if (iconFile && !files.some((file) => file.path === iconFile)) {
    warnings.push(`Icon file "${iconFile}" was not found in the package files.`);
  }

  return {
    packageVersion,
    publisherId,
    manifest,
    files,
    errors,
    warnings,
    stats: {
      fileCount: files.length,
      archiveSize,
    },
  };
}
