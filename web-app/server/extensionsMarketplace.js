import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  DEFAULT_EXTENSION_CATALOG,
  normalizeExtensionCatalogEntry,
  TILDER_EXTENSION_MANIFEST_VERSION,
} from '../src/core/extensionsCatalog.js';

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

function createPublisherRecord(input, fallbackName = '') {
  const name = String(input?.name || fallbackName || 'Unknown Publisher').trim();
  const id = String(input?.id || slugify(name) || crypto.randomUUID()).trim();

  return {
    id,
    slug: String(input?.slug || slugify(name) || id).trim(),
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
