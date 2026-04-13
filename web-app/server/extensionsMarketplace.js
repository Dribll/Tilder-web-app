import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  DEFAULT_EXTENSION_CATALOG,
  normalizeExtensionCatalogEntry,
  TILDER_EXTENSION_MANIFEST_VERSION,
} from '../src/core/extensionsCatalog.js';
import {
  normalizeExtensionPackagePayload,
  normalizePublisherSlug,
  sanitizeExtensionAssetPath,
  TILDER_EXTENSION_PACKAGE_VERSION,
} from '../shared/extensions/publishing.js';

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function marketplaceStorePath(dataDir) {
  return path.join(dataDir, 'extensions-marketplace.json');
}

function extensionsAssetRootPath(dataDir) {
  return path.join(dataDir, 'extensions-assets');
}

function hashToken(value) {
  return crypto.createHash('sha256').update(String(value || '')).digest('hex');
}

function createAccessTokenRecord(input = {}) {
  return {
    id: String(input.id || crypto.randomUUID()),
    label: String(input.label || 'Publishing token').trim(),
    prefix: String(input.prefix || '').trim(),
    tokenHash: String(input.tokenHash || '').trim(),
    createdAt: String(input.createdAt || new Date().toISOString()),
    lastUsedAt: String(input.lastUsedAt || ''),
    revokedAt: String(input.revokedAt || ''),
    createdBy: input.createdBy && typeof input.createdBy === 'object' ? input.createdBy : null,
  };
}

function createPublisherRecord(input, fallbackName = '') {
  const name = String(input?.name || fallbackName || 'Unknown Publisher').trim();
  const slug = normalizePublisherSlug(input?.slug || name || fallbackName || input?.id || '');
  const id = String(input?.id || slug || crypto.randomUUID()).trim();

  return {
    id,
    slug,
    name,
    bio: String(input?.bio || '').trim(),
    website: String(input?.website || '').trim(),
    repository: String(input?.repository || '').trim(),
    avatarUrl: String(input?.avatarUrl || '').trim(),
    email: String(input?.email || '').trim(),
    verified: input?.verified !== false,
    public: input?.public !== false,
    createdAt: String(input?.createdAt || new Date().toISOString()),
    updatedAt: String(input?.updatedAt || new Date().toISOString()),
    owners: Array.isArray(input?.owners)
      ? input.owners
          .filter((owner) => owner && typeof owner === 'object')
          .map((owner) => ({
            id: String(owner.id || '').trim(),
            username: String(owner.username || '').trim(),
            displayName: String(owner.displayName || '').trim(),
            email: String(owner.email || '').trim(),
            provider: String(owner.provider || '').trim(),
          }))
      : [],
    tokens: Array.isArray(input?.tokens) ? input.tokens.map((token) => createAccessTokenRecord(token)) : [],
  };
}

function seedPublishersFromCatalog(catalog) {
  const publishers = new Map();

  catalog.forEach((extension) => {
    const publisherId = extension.publisherId || slugify(extension.publisher);
    if (publishers.has(publisherId)) {
      return;
    }

    publishers.set(
      publisherId,
      createPublisherRecord(
        {
          id: publisherId,
          name: extension.publisher,
          verified: publisherId === 'dribll',
          website: extension.authorWebsite || extension.website || '',
          repository: extension.repository || '',
          bio:
            publisherId === 'dribll'
              ? 'Official Tilder marketplace publisher.'
              : 'Community publisher in the Tilder marketplace.',
        },
        extension.publisher
      )
    );
  });

  return [...publishers.values()];
}

function seedExtensionsFromCatalog(catalog) {
  return catalog.map((entry) =>
    normalizeExtensionCatalogEntry({
      ...entry,
      publisherId: entry.publisherId || slugify(entry.publisher),
      verification: entry.source === 'community' ? 'community' : 'verified',
      publisherVerified: entry.source === 'community' ? false : entry.publisherVerified !== false,
      reviewStatus: 'published',
      visibility: 'public',
      publishedAt: entry.publishedAt || new Date().toISOString(),
      source: entry.source || 'catalog',
    })
  );
}

function createDefaultMarketplaceStore() {
  const publishers = seedPublishersFromCatalog(DEFAULT_EXTENSION_CATALOG);
  const extensions = seedExtensionsFromCatalog(DEFAULT_EXTENSION_CATALOG);

  return {
    version: 1,
    manifestVersion: TILDER_EXTENSION_MANIFEST_VERSION,
    updatedAt: new Date().toISOString(),
    publishers,
    extensions,
    submissions: [],
  };
}

async function writeMarketplaceStore(dataDir, store) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(marketplaceStorePath(dataDir), JSON.stringify(store, null, 2), 'utf8');
}

export async function readMarketplaceStore(dataDir) {
  const storePath = marketplaceStorePath(dataDir);

  try {
    const raw = await fs.readFile(storePath, 'utf8');
    const parsed = JSON.parse(raw);

    return {
      version: Number(parsed?.version || 1),
      manifestVersion: Number(parsed?.manifestVersion || TILDER_EXTENSION_MANIFEST_VERSION),
      updatedAt: String(parsed?.updatedAt || new Date().toISOString()),
      publishers: Array.isArray(parsed?.publishers) ? parsed.publishers.map((publisher) => createPublisherRecord(publisher)) : [],
      extensions: Array.isArray(parsed?.extensions)
        ? parsed.extensions.map((extension) => normalizeExtensionCatalogEntry(extension))
        : [],
      submissions: Array.isArray(parsed?.submissions) ? parsed.submissions : [],
    };
  } catch {
    const seeded = createDefaultMarketplaceStore();
    await writeMarketplaceStore(dataDir, seeded);
    return seeded;
  }
}

async function ensureMarketplaceAssetRoot(dataDir) {
  const assetRoot = extensionsAssetRootPath(dataDir);
  await fs.mkdir(assetRoot, { recursive: true });
  return assetRoot;
}

function sanitizeActor(actor = {}) {
  return {
    id: String(actor.id || '').trim(),
    username: String(actor.username || '').trim(),
    displayName: String(actor.displayName || '').trim(),
    email: String(actor.email || '').trim(),
    provider: String(actor.provider || '').trim(),
  };
}

function actorMatchesPublisherOwner(actor = {}, publisher = {}) {
  const normalizedActor = sanitizeActor(actor);
  const actorCandidates = [normalizedActor.id, normalizedActor.username, normalizedActor.email]
    .filter(Boolean)
    .map((value) => String(value).trim().toLowerCase());

  if (!actorCandidates.length) {
    return false;
  }

  return (publisher.owners || []).some((owner) =>
    [owner.id, owner.username, owner.email]
      .filter(Boolean)
      .map((value) => String(value).trim().toLowerCase())
      .some((candidate) => actorCandidates.includes(candidate))
  );
}

function buildPublicPublisherPayload(publisher, extensions = []) {
  return {
    id: publisher.id,
    slug: publisher.slug,
    name: publisher.name,
    bio: publisher.bio,
    website: publisher.website,
    repository: publisher.repository,
    avatarUrl: publisher.avatarUrl,
    verified: publisher.verified !== false,
    public: publisher.public !== false,
    createdAt: publisher.createdAt,
    updatedAt: publisher.updatedAt,
    extensionCount: extensions.filter((extension) => extension.publisherId === publisher.id).length,
  };
}

function buildPublisherUsageIndex(extensions) {
  return extensions.reduce((bucket, extension) => {
    bucket[extension.publisherId] = (bucket[extension.publisherId] || 0) + 1;
    return bucket;
  }, {});
}

export async function listPublicMarketplace(dataDir) {
  const store = await readMarketplaceStore(dataDir);
  const publishedExtensions = store.extensions.filter(
    (extension) => extension.reviewStatus === 'published' && extension.visibility !== 'private'
  );
  const publisherCounts = buildPublisherUsageIndex(publishedExtensions);

  const publishers = Object.fromEntries(
    store.publishers
      .filter((publisher) => publisher.public !== false)
      .map((publisher) => [
        publisher.id,
        {
          ...publisher,
          extensionCount: publisherCounts[publisher.id] || 0,
        },
      ])
  );

  return {
    updatedAt: store.updatedAt,
    manifestVersion: store.manifestVersion,
    publishers,
    extensions: publishedExtensions,
    stats: {
      extensionCount: publishedExtensions.length,
      publisherCount: Object.keys(publishers).length,
      verifiedPublisherCount: Object.values(publishers).filter((publisher) => publisher.verified).length,
    },
  };
}

export async function listMarketplacePublishers(dataDir) {
  const store = await readMarketplaceStore(dataDir);
  const publishedExtensions = store.extensions.filter(
    (extension) => extension.reviewStatus === 'published' && extension.visibility !== 'private'
  );

  return {
    updatedAt: store.updatedAt,
    publishers: store.publishers
      .filter((publisher) => publisher.public !== false)
      .map((publisher) => buildPublicPublisherPayload(publisher, publishedExtensions)),
  };
}

export async function listMarketplaceOwnedPublishers(dataDir, actor = {}) {
  const store = await readMarketplaceStore(dataDir);
  const normalizedActor = sanitizeActor(actor);

  if (!normalizedActor.id && !normalizedActor.username && !normalizedActor.email) {
    return {
      updatedAt: store.updatedAt,
      publishers: [],
    };
  }

  const publishedExtensions = store.extensions.filter(
    (extension) => extension.reviewStatus === 'published' && extension.visibility !== 'private'
  );

  return {
    updatedAt: store.updatedAt,
    publishers: store.publishers
      .filter((publisher) => actorMatchesPublisherOwner(normalizedActor, publisher))
      .map((publisher) => ({
        ...buildPublicPublisherPayload(publisher, publishedExtensions),
        owners: publisher.owners || [],
        tokens: Array.isArray(publisher.tokens)
          ? publisher.tokens.map((token) => ({
              id: token.id,
              label: token.label,
              prefix: token.prefix,
              createdAt: token.createdAt,
              lastUsedAt: token.lastUsedAt || '',
              revokedAt: token.revokedAt || '',
            }))
          : [],
      })),
  };
}

export async function getMarketplacePublisher(dataDir, publisherId) {
  const store = await readMarketplaceStore(dataDir);
  const publisher = store.publishers.find((entry) => entry.id === publisherId || entry.slug === publisherId);
  if (!publisher || publisher.public === false) {
    throw new Error('Publisher not found.');
  }

  const publishedExtensions = store.extensions.filter(
    (extension) =>
      extension.publisherId === publisher.id && extension.reviewStatus === 'published' && extension.visibility !== 'private'
  );

  return {
    publisher: buildPublicPublisherPayload(publisher, publishedExtensions),
    extensions: publishedExtensions,
  };
}

export async function createMarketplacePublisher(dataDir, payload = {}, actor = {}) {
  const normalizedActor = sanitizeActor(actor);
  if (!normalizedActor.id && !normalizedActor.username && !normalizedActor.email) {
    throw new Error('Sign in first to create a publisher.');
  }

  const store = await readMarketplaceStore(dataDir);
  const now = new Date().toISOString();
  const publisher = createPublisherRecord(
    {
      id: String(payload.id || '').trim() || normalizePublisherSlug(payload.slug || payload.name || ''),
      slug: String(payload.slug || '').trim() || normalizePublisherSlug(payload.name || ''),
      name: String(payload.name || '').trim(),
      bio: payload.bio,
      website: payload.website,
      repository: payload.repository,
      avatarUrl: payload.avatarUrl,
      email: payload.email || normalizedActor.email,
      verified: Boolean(payload.verified),
      public: payload.public !== false,
      createdAt: now,
      updatedAt: now,
      owners: [normalizedActor],
      tokens: [],
    },
    payload.name
  );

  if (!publisher.name) {
    throw new Error('Publisher name is required.');
  }

  if (store.publishers.some((entry) => entry.id === publisher.id || entry.slug === publisher.slug)) {
    throw new Error('A publisher with that id or slug already exists.');
  }

  store.publishers.push(publisher);
  store.updatedAt = now;
  await writeMarketplaceStore(dataDir, store);

  return {
    publisher: buildPublicPublisherPayload(publisher),
  };
}

export async function createMarketplacePublisherToken(dataDir, publisherId, payload = {}, actor = {}, adminBypass = false) {
  const store = await readMarketplaceStore(dataDir);
  const publisher = store.publishers.find((entry) => entry.id === publisherId || entry.slug === publisherId);

  if (!publisher) {
    throw new Error('Publisher not found.');
  }

  if (!adminBypass && !actorMatchesPublisherOwner(actor, publisher)) {
    throw new Error('You do not have permission to create tokens for that publisher.');
  }

  const tokenPlaintext = `tilder_pat_${crypto.randomBytes(24).toString('hex')}`;
  const tokenRecord = createAccessTokenRecord({
    label: String(payload.label || 'Publishing token').trim() || 'Publishing token',
    prefix: tokenPlaintext.slice(0, 16),
    tokenHash: hashToken(tokenPlaintext),
    createdAt: new Date().toISOString(),
    createdBy: sanitizeActor(actor),
  });

  publisher.tokens.push(tokenRecord);
  publisher.updatedAt = new Date().toISOString();
  store.updatedAt = publisher.updatedAt;
  await writeMarketplaceStore(dataDir, store);

  return {
    publisher: buildPublicPublisherPayload(publisher),
    token: tokenPlaintext,
    tokenPreview: tokenRecord.prefix,
  };
}

export async function validateMarketplacePackage(_dataDir, payload = {}) {
  const normalized = normalizeExtensionPackagePayload(payload);

  return {
    ok: normalized.errors.length === 0,
    packageVersion: normalized.packageVersion,
    manifest: normalized.manifest,
    stats: normalized.stats,
    errors: normalized.errors,
    warnings: normalized.warnings,
  };
}

async function writeExtensionPackageFiles(dataDir, publisher, manifest, files) {
  const assetRoot = await ensureMarketplaceAssetRoot(dataDir);
  const extensionSlug = normalizePublisherSlug(manifest.id || manifest.name || 'extension');
  const targetRoot = path.join(assetRoot, publisher.slug, extensionSlug, manifest.version);
  await fs.rm(targetRoot, { recursive: true, force: true });
  await fs.mkdir(targetRoot, { recursive: true });

  for (const file of files) {
    const relativePath = sanitizeExtensionAssetPath(file.path);
    const targetPath = path.join(targetRoot, relativePath);
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, Buffer.from(file.content, 'base64'));
  }

  return {
    targetRoot,
    publicBasePath: `/extensions-assets/${publisher.slug}/${extensionSlug}/${manifest.version}`,
  };
}

export async function publishMarketplacePackage(dataDir, payload = {}, actor = {}, publishAuth = {}) {
  const store = await readMarketplaceStore(dataDir);
  const normalized = normalizeExtensionPackagePayload(payload);
  if (normalized.errors.length) {
    throw new Error(`Extension package validation failed: ${normalized.errors.join(' ')}`);
  }

  const publisher = store.publishers.find(
    (entry) => entry.id === normalized.publisherId || entry.slug === normalized.publisherId
  );
  if (!publisher) {
    throw new Error('Publisher not found.');
  }

  const normalizedActor = sanitizeActor(actor);
  const token = String(publishAuth.token || '').trim();
  const tokenHash = token ? hashToken(token) : '';
  const matchingToken = tokenHash
    ? (publisher.tokens || []).find((entry) => entry.tokenHash === tokenHash && !entry.revokedAt)
    : null;
  const canPublish =
    publishAuth.adminBypass === true || actorMatchesPublisherOwner(normalizedActor, publisher) || Boolean(matchingToken);

  if (!canPublish) {
    throw new Error('Publishing requires a valid publisher token or publisher owner access.');
  }

  if (matchingToken) {
    matchingToken.lastUsedAt = new Date().toISOString();
  }

  const now = new Date().toISOString();
  const { publicBasePath } = await writeExtensionPackageFiles(dataDir, publisher, normalized.manifest, normalized.files);
  const webEntrypointPath = sanitizeExtensionAssetPath(normalized.manifest.webEntrypoint);
  const iconPath = normalized.manifest.icon ? sanitizeExtensionAssetPath(normalized.manifest.icon) : '';

  const publishedExtension = normalizeExtensionCatalogEntry({
    id: normalized.manifest.id,
    name: normalized.manifest.name,
    detailTitle: normalized.manifest.name,
    publisher: publisher.name,
    publisherId: publisher.id,
    category: normalized.manifest.category,
    summary: normalized.manifest.summary,
    description: normalized.manifest.description,
    downloads: normalized.manifest.downloads || 'New',
    rating: normalized.manifest.rating || 0,
    tags: normalized.manifest.tags,
    permissions: normalized.manifest.permissions,
    version: normalized.manifest.version,
    iconClass: normalized.manifest.iconClass,
    accent: normalized.manifest.accent,
    website: normalized.manifest.website || publisher.website,
    repository: normalized.manifest.repository || publisher.repository,
    manifestVersion: normalized.manifest.manifestVersion,
    webEntrypoint: `${publicBasePath}/${webEntrypointPath}`,
    icon: iconPath ? `${publicBasePath}/${iconPath}` : '',
    source: publisher.verified !== false ? 'catalog' : 'community',
    publisherVerified: publisher.verified !== false,
    verification: publisher.verified !== false ? 'verified' : 'community',
    reviewStatus: 'published',
    visibility: 'public',
    publishedAt: now,
  });

  const extensionIndex = store.extensions.findIndex((entry) => entry.id === publishedExtension.id);
  if (extensionIndex >= 0) {
    store.extensions[extensionIndex] = publishedExtension;
  } else {
    store.extensions.unshift(publishedExtension);
  }

  publisher.updatedAt = now;
  store.updatedAt = now;
  await writeMarketplaceStore(dataDir, store);

  return {
    extension: publishedExtension,
    publisher: buildPublicPublisherPayload(publisher, store.extensions),
    stats: normalized.stats,
    warnings: normalized.warnings,
  };
}

function sanitizeSubmissionInput(payload = {}) {
  const publisher = createPublisherRecord(payload.publisher || {}, payload.publisher?.name || payload.extension?.publisher || '');
  const extension = normalizeExtensionCatalogEntry({
    ...(payload.extension || {}),
    publisher: payload.extension?.publisher || publisher.name,
    publisherId: payload.extension?.publisherId || publisher.id,
    publisherVerified: false,
    verification: 'pending',
    reviewStatus: 'pending',
    visibility: 'private',
    source: 'community',
    publishedAt: '',
  });

  if (!extension.name || !extension.publisher) {
    throw new Error('Extension submissions require both an extension name and a publisher.');
  }

  return {
    publisher,
    extension,
  };
}

export async function createMarketplaceSubmission(dataDir, payload, submitter = {}) {
  const store = await readMarketplaceStore(dataDir);
  const { publisher, extension } = sanitizeSubmissionInput(payload);
  const now = new Date().toISOString();
  const submission = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    status: 'pending',
    reviewNotes: '',
    submitter: {
      id: String(submitter.id || '').trim(),
      username: String(submitter.username || '').trim(),
      displayName: String(submitter.displayName || '').trim(),
      email: String(submitter.email || '').trim(),
      provider: String(submitter.provider || '').trim(),
    },
    publisher: {
      ...publisher,
      verified: false,
      public: true,
      createdAt: now,
      updatedAt: now,
    },
    extension: {
      ...extension,
      reviewStatus: 'pending',
      verification: 'pending',
      visibility: 'private',
      publishedAt: '',
    },
  };

  store.submissions.unshift(submission);
  store.updatedAt = now;
  await writeMarketplaceStore(dataDir, store);
  return submission;
}

export async function listMarketplaceSubmissions(dataDir) {
  const store = await readMarketplaceStore(dataDir);
  return store.submissions;
}

export async function reviewMarketplaceSubmission(dataDir, submissionId, payload = {}, reviewer = {}) {
  const store = await readMarketplaceStore(dataDir);
  const submission = store.submissions.find((entry) => entry.id === submissionId);

  if (!submission) {
    throw new Error('Submission not found.');
  }

  const action = String(payload.action || '').trim().toLowerCase();
  if (!['approve', 'reject', 'publish'].includes(action)) {
    throw new Error('Review action must be approve, reject, or publish.');
  }

  const now = new Date().toISOString();
  submission.updatedAt = now;
  submission.reviewNotes = String(payload.reviewNotes || '').trim();
  submission.reviewer = {
    id: String(reviewer.id || '').trim(),
    username: String(reviewer.username || '').trim(),
    displayName: String(reviewer.displayName || '').trim(),
    email: String(reviewer.email || '').trim(),
    provider: String(reviewer.provider || '').trim(),
  };

  if (action === 'reject') {
    submission.status = 'rejected';
    submission.extension.reviewStatus = 'rejected';
    submission.extension.verification = 'community';
    await writeMarketplaceStore(dataDir, store);
    return submission;
  }

  submission.status = action === 'publish' ? 'published' : 'approved';
  submission.publisher.verified = payload.publisherVerified !== false;
  submission.publisher.updatedAt = now;
  submission.extension.publisherVerified = submission.publisher.verified;
  submission.extension.reviewStatus = submission.status;
  submission.extension.verification = submission.publisher.verified ? 'verified' : 'community';

  if (action === 'publish') {
    submission.extension.visibility = 'public';
    submission.extension.publishedAt = now;

    const publisherIndex = store.publishers.findIndex((publisher) => publisher.id === submission.publisher.id);
    if (publisherIndex >= 0) {
      store.publishers[publisherIndex] = {
        ...store.publishers[publisherIndex],
        ...submission.publisher,
        updatedAt: now,
      };
    } else {
      store.publishers.push(submission.publisher);
    }

    const extensionIndex = store.extensions.findIndex((extension) => extension.id === submission.extension.id);
    if (extensionIndex >= 0) {
      store.extensions[extensionIndex] = normalizeExtensionCatalogEntry({
        ...store.extensions[extensionIndex],
        ...submission.extension,
        visibility: 'public',
        reviewStatus: 'published',
        publishedAt: now,
      });
    } else {
      store.extensions.unshift(
        normalizeExtensionCatalogEntry({
          ...submission.extension,
          visibility: 'public',
          reviewStatus: 'published',
          publishedAt: now,
        })
      );
    }
  }

  store.updatedAt = now;
  await writeMarketplaceStore(dataDir, store);
  return submission;
}
