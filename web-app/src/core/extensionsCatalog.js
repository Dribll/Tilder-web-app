export const EXTENSION_STATE_STORAGE_KEY = 'tilder-extension-state';
export const CUSTOM_EXTENSION_STORAGE_KEY = 'tilder-custom-extensions';
export const TILDER_EXTENSION_MANIFEST_VERSION = 2;

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CATEGORY_META = {
  Featured: { iconClass: 'fa-solid fa-star', accent: '#7f86ff' },
  'Language Pack': { iconClass: 'fa-solid fa-code', accent: '#59d084' },
  Formatting: { iconClass: 'fa-solid fa-wand-magic-sparkles', accent: '#ffbf5a' },
  Linting: { iconClass: 'fa-solid fa-shield-halved', accent: '#ff7b7b' },
  Frontend: { iconClass: 'fa-solid fa-window-maximize', accent: '#8b7dff' },
  Backend: { iconClass: 'fa-solid fa-server', accent: '#5fb3ff' },
  DevOps: { iconClass: 'fa-solid fa-gears', accent: '#61d7b4' },
  'Source Control': { iconClass: 'fa-solid fa-code-branch', accent: '#f48a57' },
  Productivity: { iconClass: 'fa-solid fa-bolt', accent: '#f6d05b' },
  API: { iconClass: 'fa-solid fa-plug', accent: '#6fd4ff' },
  Styling: { iconClass: 'fa-solid fa-palette', accent: '#ff8de6' },
  Data: { iconClass: 'fa-solid fa-brackets-curly', accent: '#7ae3d2' },
  Database: { iconClass: 'fa-solid fa-database', accent: '#8fbdff' },
  Preview: { iconClass: 'fa-solid fa-eye', accent: '#b48fff' },
  Tooling: { iconClass: 'fa-solid fa-screwdriver-wrench', accent: '#d3a0ff' },
};

const BASE_EXTENSION_CATEGORIES = [
  'All',
  'Featured',
  'Language Pack',
  'Formatting',
  'Linting',
  'Frontend',
  'Backend',
  'DevOps',
  'Source Control',
  'Productivity',
  'API',
  'Styling',
  'Data',
  'Database',
  'Preview',
  'Tooling',
];

export function normalizeExtensionCatalogEntry(entry) {
  const categoryMeta = CATEGORY_META[entry.category] || CATEGORY_META.Productivity;
  const kind = entry.webEntrypoint ? 'code-extension' : 'feature-pack';
  const publisherId = entry.publisherId || slugify(entry.publisher || 'unknown-publisher');
  const reviewStatus = entry.reviewStatus || 'published';
  const verification =
    entry.verification || (entry.source === 'community' ? 'community' : entry.publisherVerified === false ? 'community' : 'verified');

  return {
    iconClass: entry.iconClass || categoryMeta.iconClass,
    accent: entry.accent || categoryMeta.accent,
    detailTitle: entry.detailTitle || entry.name,
    description:
      entry.description ||
      `${entry.summary} ${kind === 'code-extension' ? 'This extension includes executable web code for Tilder.' : 'This extension ships as a feature pack for Tilder.'}`,
    website: entry.website || '',
    repository: entry.repository || '',
    authorWebsite: entry.authorWebsite || '',
    source: entry.source || 'catalog',
    publisherId,
    publisherVerified: entry.publisherVerified !== false,
    verification,
    reviewStatus,
    visibility: entry.visibility || 'public',
    publishedAt: entry.publishedAt || '',
    manifestVersion: entry.manifestVersion || TILDER_EXTENSION_MANIFEST_VERSION,
    webEntrypoint: entry.webEntrypoint || '',
    permissions: Array.isArray(entry.permissions) ? entry.permissions : [],
    kind,
    ...entry,
  };
}

const catalogEntries = [
  ['tilder.web-format-kit', 'Web Format Kit', 'Formatting', 'Fast formatting defaults for web and config files.', '2.8M', 4.8, ['formatting', 'web']],
  ['tilder.code-guard', 'Code Guard', 'Linting', 'Inline lint surfaces and quality hints for active files.', '2.2M', 4.7, ['linting', 'quality']],
  ['tilder.python-flow', 'Python Flow', 'Language Pack', 'Python starter snippets, workflow templates, and backend assist.', '1.9M', 4.7, ['python', 'snippets']],
  ['tilder.clang-flow', 'Clang Flow', 'Language Pack', 'C and C++ starter snippets and clangd-friendly project helpers.', '2.1M', 4.7, ['c', 'cpp', 'clangd']],
  ['tilder.go-flow', 'Go Flow', 'Language Pack', 'Go snippets, package helpers, and gopls-friendly workflow defaults.', '1.4M', 4.6, ['go', 'gopls']],
  ['tilder.rust-flow', 'Rust Flow', 'Language Pack', 'Rust snippets, Cargo-oriented helpers, and analyzer-friendly scaffolds.', '1.6M', 4.7, ['rust', 'cargo']],
  ['tilder.java-flow', 'Java Flow', 'Language Pack', 'Java starter snippets, app structure templates, and project helpers.', '1.8M', 4.6, ['java', 'jdtls']],
  ['tilder.dotnet-flow', '.NET Flow', 'Language Pack', 'C#-oriented snippets and project templates for .NET work.', '1.5M', 4.5, ['csharp', 'dotnet']],
  ['tilder.php-flow', 'PHP Flow', 'Language Pack', 'PHP project scaffolds, starter snippets, and backend helpers.', '1.2M', 4.4, ['php', 'backend']],
  ['tilder.shell-flow', 'Shell Flow', 'Language Pack', 'Shell script snippets, command guards, and bash helpers.', '980K', 4.4, ['shell', 'bash']],
  ['tilder.yaml-flow', 'YAML Flow', 'Language Pack', 'YAML snippets, config blocks, and infrastructure-friendly helpers.', '1.1M', 4.5, ['yaml', 'config']],
  ['tilder.container-flow', 'Container Flow', 'DevOps', 'Dockerfile and container workflow helpers for backend projects.', '1.0M', 4.5, ['docker', 'containers']],
  ['tilder.markup-preview', 'Markup Preview', 'Preview', 'Better previews and helpers for Markdown and simple docs.', '1.1M', 4.5, ['markdown', 'preview']],
  ['tilder.json-lab', 'JSON Lab', 'Data', 'Quick JSON formatting, inspection, and editing helpers.', '1.3M', 4.5, ['json', 'data']],
  ['tilder.path-smart', 'Path Smart', 'Productivity', 'Relative path suggestions and asset path helpers.', '2.4M', 4.7, ['paths', 'imports']],
  ['tilder.todo-scout', 'Todo Scout', 'Productivity', 'Workspace-wide TODO, FIXME, and NOTE tracking.', '1.6M', 4.6, ['todo', 'notes']],
  ['tilder.indent-glow', 'Indent Glow', 'Productivity', 'Makes deep indentation easier to scan in long files.', '1.2M', 4.4, ['indentation', 'visual']],
  ['tilder.word-shield', 'Word Shield', 'Productivity', 'Checks spelling inside docs, comments, and string literals.', '1.4M', 4.5, ['spelling', 'docs']],
  ['tilder.request-lab', 'Request Lab', 'API', 'Lightweight request testing from inside the editor workspace.', '1.1M', 4.4, ['api', 'http']],
  ['tilder.graph-flow', 'Graph Flow', 'API', 'Graph query formatting and schema-friendly authoring helpers.', '860K', 4.3, ['graphql', 'api']],
  ['tilder.sql-flow', 'SQL Flow', 'Database', 'SQL starter snippets and query-editing quality of life tools.', '990K', 4.4, ['sql', 'database']],
  ['tilder.orm-flow', 'ORM Flow', 'Database', 'Schema and migration helpers for modern app stacks.', '820K', 4.4, ['orm', 'schema']],
  ['tilder.tailwind-garden', 'Tailwind Garden', 'Styling', 'Tailwind-friendly utility helpers and class workflow tweaks.', '2.2M', 4.8, ['tailwind', 'css']],
  ['tilder.sass-room', 'Sass Room', 'Styling', 'SCSS helpers, mixin snippets, and nested stylesheet workflow boosts.', '760K', 4.3, ['scss', 'sass']],
  ['tilder.color-lens', 'Color Lens', 'Styling', 'Inline color previews and palette-aware authoring cues.', '1.5M', 4.5, ['color', 'design']],
  ['tilder.react-craft', 'React Craft', 'Frontend', 'React-oriented snippets, component starters, and hook helpers.', '2.6M', 4.7, ['react', 'frontend']],
  ['tilder.next-craft', 'Next Craft', 'Frontend', 'Next-style route and page helpers for React app workflows.', '1.7M', 4.5, ['next', 'frontend']],
  ['tilder.vue-craft', 'Vue Craft', 'Frontend', 'Vue single-file component and composable starter helpers.', '1.4M', 4.5, ['vue', 'frontend']],
  ['tilder.svelte-craft', 'Svelte Craft', 'Frontend', 'Svelte starter snippets and motion-friendly workflow tools.', '1.0M', 4.4, ['svelte', 'frontend']],
  ['tilder.astro-craft', 'Astro Craft', 'Frontend', 'Astro component templates and content collection helpers.', '780K', 4.4, ['astro', 'frontend']],
  ['tilder.angular-craft', 'Angular Craft', 'Frontend', 'Angular component, service, and routing starter helpers.', '1.1M', 4.4, ['angular', 'frontend']],
  ['tilder.solid-craft', 'Solid Craft', 'Frontend', 'SolidJS starters and signal-oriented authoring helpers.', '630K', 4.3, ['solid', 'frontend']],
  ['tilder.qwik-craft', 'Qwik Craft', 'Frontend', 'Qwik component starters and resumability-friendly templates.', '410K', 4.2, ['qwik', 'frontend']],
  ['tilder.lit-craft', 'Lit Craft', 'Frontend', 'Lit element helpers and web-component productivity tweaks.', '520K', 4.2, ['lit', 'web-components']],
  ['tilder.alpine-craft', 'Alpine Craft', 'Frontend', 'Small Alpine.js helpers for attribute-driven interfaces.', '360K', 4.1, ['alpine', 'frontend']],
  ['tilder.node-ops', 'Node Ops', 'Backend', 'Node server helpers, scripts, and backend workflow shortcuts.', '1.5M', 4.6, ['node', 'backend']],
  ['tilder.express-ops', 'Express Ops', 'Backend', 'Express route snippets and middleware-oriented helpers.', '1.1M', 4.4, ['express', 'backend']],
  ['tilder.fastapi-ops', 'FastAPI Ops', 'Backend', 'FastAPI endpoint and project starter helpers.', '1.2M', 4.6, ['fastapi', 'backend']],
  ['tilder.spring-ops', 'Spring Ops', 'Backend', 'Spring-style service and controller templates.', '1.3M', 4.6, ['spring', 'java']],
  ['tilder.nest-ops', 'Nest Ops', 'Backend', 'NestJS module and provider generators for service-heavy apps.', '770K', 4.4, ['nest', 'backend']],
  ['tilder.laravel-ops', 'Laravel Ops', 'Backend', 'Laravel routes, controllers, and artisan-friendly helpers.', '930K', 4.4, ['laravel', 'php']],
  ['tilder.deno-ops', 'Deno Ops', 'Backend', 'Deno-first scripts and service helpers.', '490K', 4.2, ['deno', 'backend']],
  ['tilder.cloud-helm', 'Cloud Helm', 'DevOps', 'Kubernetes and deployment-friendly YAML helpers.', '980K', 4.5, ['kubernetes', 'devops']],
  ['tilder.terraform-field', 'Terraform Field', 'DevOps', 'Terraform block starters and module workflow helpers.', '910K', 4.5, ['terraform', 'infra']],
  ['tilder.pipeline-flow', 'Pipeline Flow', 'DevOps', 'CI and deployment pipeline authoring helpers.', '730K', 4.3, ['ci', 'pipelines']],
  ['tilder.ansible-kit', 'Ansible Kit', 'DevOps', 'Playbook tasks, roles, and inventory helpers for automation.', '420K', 4.2, ['ansible', 'automation']],
  ['tilder.nginx-room', 'Nginx Room', 'DevOps', 'Server block helpers and reverse-proxy snippets.', '390K', 4.1, ['nginx', 'devops']],
  ['tilder.markdown-guard', 'Markdown Guard', 'Linting', 'Doc structure checks and markdown quality nudges.', '880K', 4.4, ['markdown', 'linting']],
  ['tilder.regex-lab', 'Regex Lab', 'Tooling', 'Pattern-writing helpers and regex productivity utilities.', '620K', 4.3, ['regex', 'tooling']],
  ['tilder.snippet-vault', 'Snippet Vault', 'Productivity', 'Personal snippet bundles and reusable starter templates.', '840K', 4.4, ['snippets', 'templates']],
  ['tilder.bookmark-grid', 'Bookmark Grid', 'Productivity', 'Line markers and quick-return points inside large files.', '1.0M', 4.5, ['bookmarks', 'navigation']],
  ['tilder.xml-toolkit', 'XML Toolkit', 'Data', 'XML structure helpers and tidy formatting shortcuts.', '680K', 4.2, ['xml', 'data']],
  ['tilder.csv-lab', 'CSV Lab', 'Data', 'CSV row and delimiter helpers for quick data cleanup.', '540K', 4.1, ['csv', 'data']],
  ['tilder.toml-lab', 'TOML Lab', 'Data', 'TOML authoring helpers for config-heavy projects.', '450K', 4.2, ['toml', 'config']],
  ['tilder.ini-companion', 'INI Companion', 'Data', 'Simple INI editing and parsing helpers.', '280K', 4.0, ['ini', 'config']],
  ['tilder.mongo-view', 'Mongo View', 'Database', 'Mongo query helpers and collection authoring shortcuts.', '510K', 4.2, ['mongo', 'database']],
  ['tilder.redis-view', 'Redis View', 'Database', 'Redis command templates and cache-friendly notes.', '330K', 4.0, ['redis', 'database']],
  ['tilder.openapi-lens', 'OpenAPI Lens', 'API', 'OpenAPI and schema helpers for HTTP API projects.', '610K', 4.3, ['openapi', 'api']],
  ['tilder.swagger-preview', 'Swagger Preview', 'Preview', 'Preview-friendly helpers for generated API docs.', '350K', 4.1, ['swagger', 'preview']],
].map(([id, name, category, summary, downloads, rating, tags]) =>
  normalizeExtensionCatalogEntry({
    id,
    name,
    publisher: 'Dribll',
    category,
    summary,
    downloads,
    rating,
    tags,
    version: '1.0.0',
    defaultInstalled: tags.includes('react') || tags.includes('python') || tags.includes('c') || tags.includes('go') || tags.includes('rust') || tags.includes('json'),
    defaultEnabled: tags.includes('react') || tags.includes('python') || tags.includes('c') || tags.includes('go') || tags.includes('rust') || tags.includes('json'),
    featured: ['tilder.web-format-kit', 'tilder.code-guard', 'tilder.react-craft', 'tilder.python-flow', 'tilder.clang-flow'].includes(id),
  })
);

export const DEFAULT_EXTENSION_CATALOG = [
  ...catalogEntries,
  normalizeExtensionCatalogEntry({
    id: 'community.dribll.night-signal-theme',
    name: 'Night Signal Theme',
    detailTitle: 'Night Signal Theme',
    publisher: 'Dribll Community',
    category: 'Styling',
    summary: 'A real code-based theme sample for Tilder community extensions.',
    description:
      'Night Signal Theme is a sample community extension that loads executable web code and injects a darker midnight-accent palette into Tilder when enabled.',
    downloads: 'Sample',
    rating: 4.9,
    tags: ['theme', 'community', 'sample'],
    version: '1.0.0',
    website: '/tilder-extension-sample.json',
    repository: '/tilder-extension-sample.json',
    webEntrypoint: '/extensions/night-signal/main.js',
    permissions: ['styles', 'notifications'],
    source: 'catalog',
    defaultInstalled: false,
    defaultEnabled: false,
    featured: true,
    iconClass: 'fa-solid fa-moon',
    accent: '#5d85ff',
  }),
];

export const EXTENSION_CATEGORIES = BASE_EXTENSION_CATEGORIES;

export function getDefaultExtensionState() {
  return DEFAULT_EXTENSION_CATALOG.reduce((bucket, extension) => {
    bucket[extension.id] = {
      installed: extension.defaultInstalled !== false,
      enabled: extension.defaultEnabled !== false,
    };
    return bucket;
  }, {});
}

export function readStoredExtensionState() {
  if (typeof window === 'undefined') {
    return getDefaultExtensionState();
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(EXTENSION_STATE_STORAGE_KEY) || '{}');
    const defaults = getDefaultExtensionState();
    return Object.fromEntries(
      Object.entries(defaults).map(([id, defaultState]) => [
        id,
        {
          installed: parsed?.[id]?.installed ?? defaultState.installed,
          enabled: parsed?.[id]?.enabled ?? defaultState.enabled,
        },
      ])
    );
  } catch {
    return getDefaultExtensionState();
  }
}

function normalizeImportedExtension(entry, index = 0) {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Each extension manifest entry must be an object.');
  }

  const name = String(entry.name || '').trim();
  const publisher = String(entry.publisher || '').trim();
  if (!name || !publisher) {
    throw new Error('Extension manifest entries must include both a name and a publisher.');
  }

  const category = BASE_EXTENSION_CATEGORIES.includes(String(entry.category || '').trim())
    ? String(entry.category).trim()
    : 'Productivity';

  const id =
    String(entry.id || '')
      .trim()
      .toLowerCase() ||
    `community.${publisher.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${index}`;

  return normalizeExtensionCatalogEntry({
    id,
    name,
    publisher,
    category,
    summary: String(entry.summary || entry.description || `${name} extension for Tilder.`).trim(),
    description: String(entry.description || entry.summary || `${name} extension for Tilder.`).trim(),
    downloads: String(entry.downloads || 'Community'),
    rating: Number(entry.rating) || 4.5,
    tags: Array.isArray(entry.tags) ? entry.tags.map((tag) => String(tag).trim()).filter(Boolean) : [],
    version: String(entry.version || '1.0.0').trim(),
    featured: false,
    defaultInstalled: entry.defaultInstalled !== false,
    defaultEnabled: entry.defaultEnabled !== false,
    source: 'community',
    iconClass: entry.iconClass,
    accent: entry.accent,
    website: String(entry.website || '').trim(),
    repository: String(entry.repository || '').trim(),
    authorWebsite: String(entry.authorWebsite || '').trim(),
    manifestVersion: Number(entry.manifestVersion) || TILDER_EXTENSION_MANIFEST_VERSION,
    webEntrypoint: String(entry.webEntrypoint || entry.entry || '').trim(),
    permissions: Array.isArray(entry.permissions) ? entry.permissions.map((value) => String(value).trim()).filter(Boolean) : [],
  });
}

export function parseExtensionManifest(rawPayload) {
  let payload = rawPayload;

  if (typeof rawPayload === 'string') {
    try {
      payload = JSON.parse(rawPayload);
    } catch {
      throw new Error('Extension manifest is not valid JSON.');
    }
  }

  const entries = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.extensions)
      ? payload.extensions
      : payload
        ? [payload]
        : [];

  if (!entries.length) {
    throw new Error('No extensions were found in this manifest.');
  }

  return entries.map((entry, index) => normalizeImportedExtension(entry, index));
}

export function readCustomExtensions() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(CUSTOM_EXTENSION_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.map((entry, index) => normalizeImportedExtension(entry, index)) : [];
  } catch {
    return [];
  }
}

export function writeCustomExtensions(extensions) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CUSTOM_EXTENSION_STORAGE_KEY, JSON.stringify(extensions));
}

export function buildExtensionCatalog(baseCatalog = null) {
  const normalizedBaseCatalog = Array.isArray(baseCatalog) && baseCatalog.length
    ? baseCatalog.map((entry) => normalizeExtensionCatalogEntry(entry))
    : DEFAULT_EXTENSION_CATALOG;
  const custom = readCustomExtensions();
  const ids = new Set(normalizedBaseCatalog.map((entry) => entry.id));
  const uniqueCustom = custom.filter((entry) => {
    if (ids.has(entry.id)) {
      return false;
    }
    ids.add(entry.id);
    return true;
  });
  return [...normalizedBaseCatalog, ...uniqueCustom];
}

export function buildExtensionCategories(catalog = buildExtensionCatalog()) {
  const dynamicCategories = [...new Set(catalog.map((entry) => entry.category))].filter(
    (category) => !BASE_EXTENSION_CATEGORIES.includes(category)
  );
  return [...BASE_EXTENSION_CATEGORIES, ...dynamicCategories];
}

export function isExtensionEnabled(extensionState, id) {
  return Boolean(extensionState?.[id]?.installed && extensionState?.[id]?.enabled);
}
