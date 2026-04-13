import React, { useEffect, useMemo, useState } from 'react';
import {
  buildExtensionCategories,
  EXTENSION_STATE_STORAGE_KEY,
  TILDER_EXTENSION_MANIFEST_VERSION,
} from '../../core/extensionsCatalog.js';
import { resolveExtensionIcon } from '../../core/iconTheme.js';
import {
  createExtensionPublisher,
  createExtensionPublisherToken,
  fetchMyExtensionPublishers,
  publishExtensionMarketplacePackage,
  validateExtensionMarketplacePackage,
} from '../../core/extensionsMarketplaceApi.js';

class ExtensionsErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Extensions modal crashed', error);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="extensions-detail-empty">
          <div className="extensions-detail-section">
            <div className="extensions-section-title">Extensions reset needed</div>
            <div className="extensions-pane-subtitle">The marketplace hit a temporary state error. Reset the view and try again.</div>
            <button type="button" className="extensions-primary-btn" onClick={this.handleReset}>
              Reset Extensions View
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function encodeUtf8Base64(value) {
  return btoa(unescape(encodeURIComponent(String(value || ''))));
}

function createInitialPublisherForm() {
  return {
    name: '',
    slug: '',
    bio: '',
    website: '',
    repository: '',
    email: '',
    avatarUrl: '',
  };
}

function createInitialPublishDraft() {
  return {
    publisherId: '',
    token: '',
    manifest: {
      id: '',
      name: '',
      version: '1.0.0',
      category: 'Productivity',
      summary: '',
      description: '',
      tags: '',
      permissions: '',
      repository: '',
      website: '',
      iconClass: 'fa-solid fa-puzzle-piece',
      accent: '#7f86ff',
      webEntrypoint: 'main.js',
    },
    code: `export async function activate(api) {\n  api.notifications.info('Hello from your Tilder extension.');\n\n  api.commands.register('hello', () => {\n    api.notifications.info('Command executed.');\n  });\n}\n`,
  };
}

function formatMeta(extension) {
  return [
    extension.downloads || 'New',
    typeof extension.rating === 'number' ? `${extension.rating.toFixed(1)} rating` : null,
    extension.category || null,
    extension.kind === 'code-extension' ? 'Code extension' : 'Feature pack',
  ].filter(Boolean);
}

function ExtensionLogo({ extension }) {
  const visual = resolveExtensionIcon(extension);
  return <visual.Icon className="extensions-icon-glyph" color={visual.color} aria-hidden="true" />;
}

function persistExtensionState(nextState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(EXTENSION_STATE_STORAGE_KEY, JSON.stringify(nextState));
  window.dispatchEvent(new Event('tilder:extensions-updated'));
}

function buildPackagePayload(publishDraft) {
  const tags = String(publishDraft.manifest.tags || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const permissions = String(publishDraft.manifest.permissions || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  return {
    packageVersion: 1,
    publisherId: publishDraft.publisherId.trim(),
    manifest: {
      manifestVersion: TILDER_EXTENSION_MANIFEST_VERSION,
      id: publishDraft.manifest.id.trim(),
      name: publishDraft.manifest.name.trim(),
      version: publishDraft.manifest.version.trim(),
      category: publishDraft.manifest.category.trim(),
      summary: publishDraft.manifest.summary.trim(),
      description: publishDraft.manifest.description.trim(),
      tags,
      permissions,
      repository: publishDraft.manifest.repository.trim(),
      website: publishDraft.manifest.website.trim(),
      iconClass: publishDraft.manifest.iconClass.trim(),
      accent: publishDraft.manifest.accent.trim(),
      webEntrypoint: publishDraft.manifest.webEntrypoint.trim(),
    },
    files: [
      {
        path: publishDraft.manifest.webEntrypoint.trim(),
        encoding: 'base64',
        content: encodeUtf8Base64(publishDraft.code),
      },
    ],
  };
}

export default function Extensions({
  modalType,
  pushNotification,
  extensionCatalog: externalCatalog = null,
  marketplacePublishers = {},
  authSession = null,
}) {
  const [surfaceMode, setSurfaceMode] = useState('marketplace');
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedExtensionId, setSelectedExtensionId] = useState('');
  const [extensionState, setExtensionState] = useState({});
  const [ownedPublishers, setOwnedPublishers] = useState([]);
  const [publishersLoading, setPublishersLoading] = useState(false);
  const [publishersError, setPublishersError] = useState('');
  const [publisherForm, setPublisherForm] = useState(createInitialPublisherForm());
  const [publisherFormBusy, setPublisherFormBusy] = useState(false);
  const [selectedPublisherId, setSelectedPublisherId] = useState('');
  const [tokenLabel, setTokenLabel] = useState('CLI token');
  const [generatedToken, setGeneratedToken] = useState('');
  const [publishDraft, setPublishDraft] = useState(createInitialPublishDraft());
  const [publishBusy, setPublishBusy] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const trimmedSearchValue = searchValue.trim();
  const isFiltering = trimmedSearchValue.length > 0 || category !== 'All';

  const catalog = useMemo(() => {
    const source = Array.isArray(externalCatalog) ? externalCatalog : [];
    const seenIds = new Set();
    return source.filter((entry) => {
      if (!entry || typeof entry !== 'object') return false;
      const id = String(entry.id || '').trim();
      if (!id || seenIds.has(id)) return false;
      seenIds.add(id);
      return true;
    });
  }, [externalCatalog]);
  const categories = useMemo(() => buildExtensionCategories(catalog), [catalog]);
  const installedIds = useMemo(
    () => Object.entries(extensionState).filter(([, state]) => state?.installed).map(([id]) => id),
    [extensionState]
  );
  const installedExtensions = useMemo(
    () => catalog.filter((extension) => installedIds.includes(extension.id)),
    [catalog, installedIds]
  );
  const recommendedExtensions = useMemo(
    () => catalog.filter((extension) => extension.featured).slice(0, 6),
    [catalog]
  );
  const filteredExtensions = useMemo(() => {
    const query = trimmedSearchValue.toLowerCase();
    return catalog.filter((extension) => {
      if (!extension || typeof extension !== 'object') return false;
      if (category !== 'All' && extension.category !== category) return false;
      if (!query) return true;
      return [
        extension.name,
        extension.publisher,
        extension.summary,
        extension.description,
        ...(Array.isArray(extension.tags) ? extension.tags : []),
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [catalog, category, trimmedSearchValue]);

  const selectedExtension = useMemo(() => {
    if (!selectedExtensionId) {
      return null;
    }

    return catalog.find((extension) => extension.id === selectedExtensionId) || null;
  }, [catalog, selectedExtensionId]);

  const currentAccount = useMemo(() => authSession?.accounts?.github || authSession?.accounts?.microsoft || null, [authSession]);

  useEffect(() => {
    if (modalType !== 'Extensions') return;
    try {
      const parsed = JSON.parse(window.localStorage.getItem(EXTENSION_STATE_STORAGE_KEY) || '{}');
      setExtensionState(parsed && typeof parsed === 'object' ? parsed : {});
    } catch {
      setExtensionState({});
    }
  }, [modalType]);

  useEffect(() => {
    if (surfaceMode !== 'publisher') return;
    let cancelled = false;
    setPublishersLoading(true);
    setPublishersError('');
    fetchMyExtensionPublishers()
      .then((payload) => {
        if (cancelled) return;
        const publishers = Array.isArray(payload.publishers) ? payload.publishers : [];
        setOwnedPublishers(publishers);
        if (!selectedPublisherId && publishers[0]) {
          setSelectedPublisherId(publishers[0].id);
          setPublishDraft((current) => ({ ...current, publisherId: publishers[0].id }));
        }
      })
      .catch((error) => {
        if (!cancelled) setPublishersError(error instanceof Error ? error.message : 'Unable to load your publishers.');
      })
      .finally(() => {
        if (!cancelled) setPublishersLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [surfaceMode, selectedPublisherId]);

  function setInstalledState(extensionId, nextPartialState) {
    setExtensionState((current) => {
      const nextState = {
        ...current,
        [extensionId]: {
          installed: current?.[extensionId]?.installed ?? false,
          enabled: current?.[extensionId]?.enabled ?? false,
          ...nextPartialState,
        },
      };
      persistExtensionState(nextState);
      return nextState;
    });
  }

  function handleInstall(extension) {
    setInstalledState(extension.id, { installed: true, enabled: true });
    pushNotification?.(`${extension.name} installed.`, 'info');
  }

  function handleUninstall(extension) {
    setInstalledState(extension.id, { installed: false, enabled: false });
    pushNotification?.(`${extension.name} uninstalled.`, 'info');
  }

  function handleToggleEnabled(extension) {
    const enabled = Boolean(extensionState?.[extension.id]?.enabled);
    setInstalledState(extension.id, { installed: true, enabled: !enabled });
    pushNotification?.(`${extension.name} ${enabled ? 'disabled' : 'enabled'}.`, 'info');
  }

  async function handleCreatePublisher(event) {
    event.preventDefault();
    setPublisherFormBusy(true);
    try {
      const result = await createExtensionPublisher(publisherForm);
      setGeneratedToken(result.token || '');
      setPublisherForm(createInitialPublisherForm());
      pushNotification?.('Publisher created.', 'info');
      const refreshed = await fetchMyExtensionPublishers();
      const publishers = Array.isArray(refreshed.publishers) ? refreshed.publishers : [];
      setOwnedPublishers(publishers);
      if (result.publisher?.id) {
        setSelectedPublisherId(result.publisher.id);
        setPublishDraft((current) => ({ ...current, publisherId: result.publisher.id }));
      }
    } catch (error) {
      pushNotification?.(error instanceof Error ? error.message : 'Unable to create publisher.', 'warning');
    } finally {
      setPublisherFormBusy(false);
    }
  }

  async function handleCreateToken() {
    if (!selectedPublisherId) {
      pushNotification?.('Choose a publisher first.', 'warning');
      return;
    }
    try {
      const result = await createExtensionPublisherToken(selectedPublisherId, { label: tokenLabel });
      setGeneratedToken(result.token || '');
      pushNotification?.('Publisher token created.', 'info');
    } catch (error) {
      pushNotification?.(error instanceof Error ? error.message : 'Unable to create token.', 'warning');
    }
  }

  async function handleValidatePackage() {
    try {
      const result = await validateExtensionMarketplacePackage(buildPackagePayload(publishDraft));
      setValidationResult(result);
      pushNotification?.(result.ok ? 'Extension package is valid.' : 'Validation found issues.', result.ok ? 'info' : 'warning');
    } catch (error) {
      pushNotification?.(error instanceof Error ? error.message : 'Unable to validate extension package.', 'warning');
    }
  }

  async function handlePublishPackage() {
    setPublishBusy(true);
    try {
      await publishExtensionMarketplacePackage(buildPackagePayload(publishDraft), publishDraft.token.trim());
      setValidationResult({ ok: true, message: 'Published successfully.' });
      pushNotification?.('Extension published to the Tilder marketplace.', 'info');
      setPublishDraft(createInitialPublishDraft());
    } catch (error) {
      pushNotification?.(error instanceof Error ? error.message : 'Unable to publish extension package.', 'warning');
    } finally {
      setPublishBusy(false);
    }
  }

  function resetMarketplaceView() {
    setSearchValue('');
    setCategory('All');
    setSelectedExtensionId('');
  }

  if (modalType !== 'Extensions') return null;

  const topFilteredExtension = filteredExtensions[0] || null;
  const selectedFilteredExtension =
    isFiltering && selectedExtension && filteredExtensions.some((extension) => extension.id === selectedExtension.id)
      ? selectedExtension
      : null;
  const activeSelectedExtension =
    surfaceMode !== 'marketplace'
      ? selectedExtension
      : isFiltering
        ? (selectedFilteredExtension || topFilteredExtension)
        : selectedExtension;
  const showRecommendations = surfaceMode === 'marketplace' && !activeSelectedExtension;
  const rightPaneExtensions = surfaceMode === 'marketplace'
    ? (isFiltering ? filteredExtensions : catalog)
    : installedExtensions;

  return (
    <div className="extensions-modal-content">
      <ExtensionsErrorBoundary resetKey={surfaceMode} onReset={resetMarketplaceView}>
        <div className="extensions-surface-switch">
          <button type="button" className={`extensions-surface-tab ${surfaceMode === 'marketplace' ? 'active' : ''}`} onClick={() => setSurfaceMode('marketplace')}>
            Marketplace
          </button>
          <button type="button" className={`extensions-surface-tab ${surfaceMode === 'publisher' ? 'active' : ''}`} onClick={() => setSurfaceMode('publisher')}>
            Publisher Dashboard
          </button>
        </div>

        {surfaceMode === 'marketplace' ? (
          <div className="extensions-layout extensions-layout-modal">
          <section
            className="extensions-detail"
            key={`marketplace-detail-${isFiltering ? 'filtering' : 'idle'}-${topFilteredExtension?.id || 'none'}-${activeSelectedExtension?.id || 'marketplace'}`}
          >
            <div className="extensions-detail-pane">
              {showRecommendations ? (
                <>
                  <div className="extensions-detail-section">
                    <div className="extensions-section-title">Recommended For You</div>
                    <div className="extensions-pane-subtitle">Pick an extension from the right, or browse featured picks below.</div>
                  </div>
                  <div className="extensions-recommendation-grid hero">
                    {recommendedExtensions.map((extension) => (
                    <button type="button" key={extension.id} className={`extensions-recommendation-card ${extension.featured ? 'featured' : ''}`} onClick={() => setSelectedExtensionId(extension.id)}>
                        <div className="extensions-recommendation-header">
                          <div className="extensions-icon-tile-large" style={{ '--extension-accent': extension.accent }}>
                            <ExtensionLogo extension={extension} size="large" />
                          </div>
                          <div className="extensions-recommendation-copy">
                            <div className="extensions-recommendation-title-row">
                              <div className="extensions-recommendation-title">{extension.name}</div>
                              {extension.featured ? <span className="extensions-badge">Featured</span> : null}
                            </div>
                            <div className="extensions-recommendation-publisher">{extension.publisher}</div>
                            <div className="extensions-recommendation-summary">{extension.summary}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : activeSelectedExtension ? (
                <>
                  <div className="extensions-detail-hero">
                    <div className="extensions-icon-tile-large" style={{ '--extension-accent': activeSelectedExtension.accent }}>
                      <ExtensionLogo extension={activeSelectedExtension} />
                    </div>
                    <div className="extensions-detail-copy">
                      <div className="extensions-detail-title-row">
                        <div className="extensions-detail-title">{activeSelectedExtension.detailTitle || activeSelectedExtension.name}</div>
                        {activeSelectedExtension.featured ? <span className="extensions-badge">Featured</span> : null}
                      </div>
                      <div className="extensions-detail-publisher">
                        {activeSelectedExtension.publisher}
                        {activeSelectedExtension.version ? ` | v${activeSelectedExtension.version}` : ''}
                      </div>
                      <div className="extensions-detail-meta">
                        {formatMeta(activeSelectedExtension).map((item, index) => (
                          <span key={`${activeSelectedExtension.id}-meta-${index}-${item}`} className="extensions-tag-pill">{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="extensions-detail-actions">
                    {extensionState?.[activeSelectedExtension.id]?.installed ? (
                      <>
                        <button type="button" className="extensions-primary-btn installed" onClick={() => handleUninstall(activeSelectedExtension)}>Uninstall</button>
                        <button type="button" className="extensions-secondary-btn" onClick={() => handleToggleEnabled(activeSelectedExtension)}>
                          {extensionState?.[activeSelectedExtension.id]?.enabled ? 'Disable' : 'Enable'}
                        </button>
                      </>
                    ) : (
                      <button type="button" className="extensions-primary-btn" onClick={() => handleInstall(activeSelectedExtension)}>Install</button>
                    )}
                  </div>
                  <div className="extensions-detail-description">{activeSelectedExtension.description || activeSelectedExtension.summary}</div>
                  <div className="extensions-detail-fields">
                    <div className="extensions-detail-field">
                      <div className="extensions-detail-label">Tags</div>
                      <div className="extensions-tag-row">
                        {(activeSelectedExtension.tags || []).slice(0, 6).map((tag, index) => (
                          <span key={`${activeSelectedExtension.id}-tag-${index}-${tag}`} className="extensions-tag-pill">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="extensions-detail-field">
                      <div className="extensions-detail-label">Publisher</div>
                      <div className="extensions-detail-value">{marketplacePublishers?.[activeSelectedExtension.publisherId]?.name || activeSelectedExtension.publisher}</div>
                    </div>
                    <div className="extensions-detail-field">
                      <div className="extensions-detail-label">Manifest</div>
                      <div className="extensions-detail-value">Tilder manifest v{activeSelectedExtension.manifestVersion || 2}</div>
                    </div>
                    <div className="extensions-detail-field">
                      <div className="extensions-detail-label">Developer model</div>
                      <div className="extensions-detail-value">Verified public marketplace extension.</div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </section>
          <aside className="extensions-list extensions-list-right">
            <div className="extensions-browser-pane">
              <div className="extensions-pane-heading">Marketplace</div>
              <div className="extensions-pane-subtitle">
                {isFiltering
                  ? `${filteredExtensions.length} ${filteredExtensions.length === 1 ? 'result' : 'results'}`
                  : `${catalog.length} available extensions`}
              </div>
              <div className="extensions-toolbar-inline">
                <input
                  type="text"
                  className="extensions-search-input"
                  placeholder="Search extensions"
                  value={searchValue}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    setSearchValue(nextValue);
                    if (!nextValue.trim() && category === 'All') {
                      setSelectedExtensionId('');
                    }
                  }}
                />
                <div className="extensions-filter-row">
                  <span className="extensions-filter-label">Category</span>
                  <select
                    className="extensions-category-select settingsInput"
                    value={category}
                    onChange={(event) => {
                      const nextCategory = event.target.value;
                      setCategory(nextCategory);
                      if (!trimmedSearchValue && nextCategory === 'All') {
                        setSelectedExtensionId('');
                      }
                    }}
                  >
                    {categories.map((entry, index) => <option key={`category-${index}-${entry}`} value={entry}>{entry}</option>)}
                  </select>
                  <button type="button" className="extensions-clear-filter" onClick={resetMarketplaceView}>Reset</button>
                </div>
              </div>
              <div className="extensions-list-copy">
                {rightPaneExtensions.map((extension) => (
                  <button type="button" key={extension.id} className={`extensions-list-item extensions-list-item-compact ${activeSelectedExtension?.id === extension.id ? 'active' : ''}`} onClick={() => setSelectedExtensionId(extension.id)}>
                    <div className="extensions-list-row">
                      <div className="extensions-icon-tile" style={{ '--extension-accent': extension.accent }}><ExtensionLogo extension={extension} /></div>
                      <div className="extensions-list-row-copy">
                        <div className="extensions-list-title-row">
                          <div className="extensions-list-title">{extension.name}</div>
                          {extension.featured ? <span className="extensions-badge subtle">Featured</span> : null}
                        </div>
                        <div className="extensions-list-publisher">{extension.publisher}</div>
                        <div className="extensions-list-summary">{extension.summary}</div>
                        <div className="extensions-list-card-footer">
                          <div className="extensions-list-stats">
                            <span>{extension.downloads || 'New'}</span>
                            <span>{typeof extension.rating === 'number' ? `${extension.rating.toFixed(1)} rating` : 'New'}</span>
                          </div>
                          <div className="extensions-list-inline-actions">
                            {extensionState?.[extension.id]?.installed ? (
                              <>
                                <button
                                  type="button"
                                  className="extensions-secondary-btn"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleToggleEnabled(extension);
                                  }}
                                >
                                  {extensionState?.[extension.id]?.enabled ? 'Disable' : 'Enable'}
                                </button>
                                <button
                                  type="button"
                                  className="extensions-secondary-btn"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleUninstall(extension);
                                  }}
                                >
                                  Uninstall
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                className="extensions-primary-btn"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleInstall(extension);
                                }}
                              >
                                Install
                              </button>
                            )}
                          </div>
                          <div className={`extensions-list-state ${extensionState?.[extension.id]?.enabled ? 'enabled' : extensionState?.[extension.id]?.installed ? 'installed' : 'available'}`}>
                            {extensionState?.[extension.id]?.enabled ? 'Enabled' : extensionState?.[extension.id]?.installed ? 'Installed' : 'Available'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
                {!rightPaneExtensions.length ? (
                  <div className="extensions-list-empty">
                    {isFiltering
                      ? 'No matches. Try a different search or clear the category filter.'
                      : 'No extensions are available right now.'}
                  </div>
                ) : null}
              </div>
            </div>
          </aside>
          </div>
        ) : (
          <div className="extensions-layout extensions-layout-modal">
          <section className="extensions-detail">
            <div className="extensions-detail-pane">
              <div className="extensions-detail-section">
                <div className="extensions-section-title">Publisher Dashboard</div>
                <div className="extensions-pane-subtitle">Create publishers, mint tokens, validate packages, and publish public Tilder extensions.</div>
              </div>
              <div className="extensions-status-panel">
                {currentAccount ? `Signed in as ${currentAccount.username || currentAccount.name || currentAccount.email || 'publisher'}.` : 'Sign in before publishing extensions.'}
              </div>
              <form className="extensions-form-grid" onSubmit={handleCreatePublisher}>
                <div className="extensions-form-field"><label className="extensions-form-label">Publisher name</label><input className="extensions-form-input" value={publisherForm.name} onChange={(e) => setPublisherForm((c) => ({ ...c, name: e.target.value }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Slug</label><input className="extensions-form-input" value={publisherForm.slug} onChange={(e) => setPublisherForm((c) => ({ ...c, slug: e.target.value }))} /></div>
                <div className="extensions-form-field extensions-form-field-full"><label className="extensions-form-label">Bio</label><textarea className="extensions-form-textarea" rows="3" value={publisherForm.bio} onChange={(e) => setPublisherForm((c) => ({ ...c, bio: e.target.value }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Website</label><input className="extensions-form-input" value={publisherForm.website} onChange={(e) => setPublisherForm((c) => ({ ...c, website: e.target.value }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Repository</label><input className="extensions-form-input" value={publisherForm.repository} onChange={(e) => setPublisherForm((c) => ({ ...c, repository: e.target.value }))} /></div>
                <div className="extensions-form-actions extensions-form-field-full"><button type="submit" className="extensions-primary-btn" disabled={publisherFormBusy}>{publisherFormBusy ? 'Creating...' : 'Create Publisher'}</button></div>
              </form>
              <div className="extensions-form-grid">
                <div className="extensions-form-field">
                  <label className="extensions-form-label">Publisher</label>
                  <select className="extensions-form-input" value={selectedPublisherId} onChange={(event) => { setSelectedPublisherId(event.target.value); setPublishDraft((current) => ({ ...current, publisherId: event.target.value })); }}>
                    <option value="">Select publisher</option>
                    {ownedPublishers.map((publisher) => <option key={publisher.id} value={publisher.id}>{publisher.name}</option>)}
                  </select>
                </div>
                <div className="extensions-form-field"><label className="extensions-form-label">Token label</label><input className="extensions-form-input" value={tokenLabel} onChange={(event) => setTokenLabel(event.target.value)} /></div>
                <div className="extensions-form-actions extensions-form-field-full"><button type="button" className="extensions-secondary-btn" onClick={handleCreateToken}>Create Token</button></div>
                {generatedToken ? <div className="extensions-token-preview extensions-form-field-full"><div className="extensions-form-label">New token</div><code>{generatedToken}</code></div> : null}
              </div>
              <div className="extensions-form-grid">
                <div className="extensions-form-field"><label className="extensions-form-label">Extension id</label><input className="extensions-form-input" value={publishDraft.manifest.id} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, id: e.target.value } }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Name</label><input className="extensions-form-input" value={publishDraft.manifest.name} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, name: e.target.value } }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Version</label><input className="extensions-form-input" value={publishDraft.manifest.version} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, version: e.target.value } }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Category</label><select className="extensions-form-input" value={publishDraft.manifest.category} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, category: e.target.value } }))}>{categories.filter((entry) => entry !== 'All').map((entry, index) => <option key={`publish-category-${index}-${entry}`} value={entry}>{entry}</option>)}</select></div>
                <div className="extensions-form-field extensions-form-field-full"><label className="extensions-form-label">Summary</label><input className="extensions-form-input" value={publishDraft.manifest.summary} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, summary: e.target.value } }))} /></div>
                <div className="extensions-form-field extensions-form-field-full"><label className="extensions-form-label">Description</label><textarea className="extensions-form-textarea" rows="4" value={publishDraft.manifest.description} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, description: e.target.value } }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Tags</label><input className="extensions-form-input" value={publishDraft.manifest.tags} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, tags: e.target.value } }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Permissions</label><input className="extensions-form-input" value={publishDraft.manifest.permissions} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, permissions: e.target.value } }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Repository</label><input className="extensions-form-input" value={publishDraft.manifest.repository} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, repository: e.target.value } }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Website</label><input className="extensions-form-input" value={publishDraft.manifest.website} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, website: e.target.value } }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Icon class</label><input className="extensions-form-input" value={publishDraft.manifest.iconClass} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, iconClass: e.target.value } }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Accent</label><input className="extensions-form-input" value={publishDraft.manifest.accent} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, accent: e.target.value } }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Entrypoint</label><input className="extensions-form-input" value={publishDraft.manifest.webEntrypoint} onChange={(e) => setPublishDraft((c) => ({ ...c, manifest: { ...c.manifest, webEntrypoint: e.target.value } }))} /></div>
                <div className="extensions-form-field"><label className="extensions-form-label">Publish token</label><input className="extensions-form-input" value={publishDraft.token} onChange={(e) => setPublishDraft((c) => ({ ...c, token: e.target.value }))} /></div>
                <div className="extensions-form-field extensions-form-field-full"><label className="extensions-form-label">Entrypoint code</label><textarea className="extensions-form-code" rows="10" value={publishDraft.code} onChange={(e) => setPublishDraft((c) => ({ ...c, code: e.target.value }))} /></div>
                <div className="extensions-form-actions extensions-form-field-full">
                  <button type="button" className="extensions-secondary-btn" onClick={handleValidatePackage}>Validate</button>
                  <button type="button" className="extensions-primary-btn" disabled={publishBusy} onClick={handlePublishPackage}>{publishBusy ? 'Publishing...' : 'Publish Extension'}</button>
                </div>
                {validationResult ? <div className={`extensions-status-panel ${validationResult.ok ? 'success' : 'warning'} extensions-form-field-full`}>{validationResult.message || (validationResult.ok ? 'Validation passed.' : 'Validation failed.')}</div> : null}
              </div>
            </div>
          </section>
          <aside className="extensions-list extensions-list-right">
            <div className="extensions-browser-pane">
              <div className="extensions-pane-heading">Your Publishers</div>
              <div className="extensions-pane-subtitle">Verified public authors and extension publishing control.</div>
              {publishersLoading ? <div className="extensions-list-empty">Loading publishers...</div> : null}
              {publishersError ? <div className="extensions-list-empty">{publishersError}</div> : null}
              {ownedPublishers.map((publisher) => (
                <button type="button" key={publisher.id} className={`extensions-list-item ${selectedPublisherId === publisher.id ? 'active' : ''}`} onClick={() => { setSelectedPublisherId(publisher.id); setPublishDraft((current) => ({ ...current, publisherId: publisher.id })); }}>
                  <div className="extensions-list-head">
                    <div className="extensions-icon-tile" style={{ '--extension-accent': '#4f61ff' }}>
                      <ExtensionLogo extension={{ name: publisher.name, category: 'Productivity', logoSrc: publisher.avatarUrl || '' }} />
                    </div>
                    <div className="extensions-list-head-copy">
                      <div className="extensions-list-title-row">
                        <div className="extensions-list-title">{publisher.name}</div>
                        {publisher.verified ? <span className="extensions-badge subtle">Verified</span> : null}
                      </div>
                      <div className="extensions-list-publisher">{publisher.slug}</div>
                    </div>
                  </div>
                  <div className="extensions-list-summary">{publisher.bio || 'No publisher bio yet.'}</div>
                  <div className="extensions-list-meta"><span>{publisher.extensionCount || 0} extensions</span><span>{publisher.verified ? 'Verified' : 'Publisher'}</span></div>
                </button>
              ))}
              {!publishersLoading && !ownedPublishers.length ? <div className="extensions-list-empty">Create your first publisher to start publishing extensions.</div> : null}
            </div>
          </aside>
          </div>
        )}
      </ExtensionsErrorBoundary>
    </div>
  );
}
