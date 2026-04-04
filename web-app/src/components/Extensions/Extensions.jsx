import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  buildExtensionCatalog,
  buildExtensionCategories,
  EXTENSION_STATE_STORAGE_KEY,
  readStoredExtensionState,
} from '../../core/extensionsCatalog.js';

function summarizeCount(label, count) {
  return `${count} ${label}${count === 1 ? '' : 's'}`;
}

function formatMeta(extension, state) {
  return [
    extension.downloads,
    `${extension.rating.toFixed(1)}★`,
    state.enabled ? 'Enabled' : state.installed ? 'Installed' : 'Available',
  ];
}

export default function Extensions({ modalType, pushNotification, extensionCatalog: externalCatalog = null, marketplacePublishers = {} }) {
  const isVisible = modalType === 'Extensions';
  const detailRef = useRef(null);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [extensionState, setExtensionState] = useState(() => readStoredExtensionState());
  const [catalogVersion, setCatalogVersion] = useState(0);
  const [selectedExtensionId, setSelectedExtensionId] = useState('');

  const extensionCatalog = useMemo(
    () => (Array.isArray(externalCatalog) && externalCatalog.length ? externalCatalog : buildExtensionCatalog()),
    [catalogVersion, externalCatalog]
  );
  const extensionCategories = useMemo(() => buildExtensionCategories(extensionCatalog), [extensionCatalog]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(EXTENSION_STATE_STORAGE_KEY, JSON.stringify(extensionState));
    window.dispatchEvent(new window.CustomEvent('tilder:extensions-updated', { detail: extensionState }));
  }, [extensionState]);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const handleStorage = () => {
      setExtensionState(readStoredExtensionState());
      setCatalogVersion((current) => current + 1);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('tilder:extensions-updated', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('tilder:extensions-updated', handleStorage);
    };
  }, [isVisible]);

  const installedExtensions = useMemo(
    () => extensionCatalog.filter((extension) => extensionState[extension.id]?.installed),
    [extensionCatalog, extensionState]
  );

  const filteredExtensions = useMemo(() => {
    const matcher = query.trim().toLowerCase();

    return extensionCatalog.filter((extension) => {
      const matchesCategory =
        category === 'All'
          ? true
          : category === 'Featured'
            ? extension.featured
            : extension.category === category;

      if (!matchesCategory) {
        return false;
      }

      if (!matcher) {
        return true;
      }

      return [
        extension.name,
        extension.publisher,
        extension.summary,
        extension.description,
        extension.category,
        extension.source,
        extension.kind,
        extension.repository,
        extension.website,
        ...(extension.tags || []),
        ...(extension.permissions || []),
      ]
        .join(' ')
        .toLowerCase()
        .includes(matcher);
    });
  }, [category, extensionCatalog, query]);

  const isDiscoverMode = query.trim().length > 0 || category !== 'All';
  const rightPaneExtensions = isDiscoverMode ? filteredExtensions : installedExtensions;
  const selectedExtension = useMemo(
    () => extensionCatalog.find((entry) => entry.id === selectedExtensionId) || null,
    [extensionCatalog, selectedExtensionId]
  );
  const selectedPublisher = useMemo(
    () => (selectedExtension?.publisherId ? marketplacePublishers[selectedExtension.publisherId] || null : null),
    [marketplacePublishers, selectedExtension]
  );

  useEffect(() => {
    if (!selectedExtensionId) {
      return;
    }

    if (!extensionCatalog.some((extension) => extension.id === selectedExtensionId)) {
      setSelectedExtensionId('');
    }
  }, [extensionCatalog, selectedExtensionId]);

  useEffect(() => {
    detailRef.current?.scrollTo?.({ top: 0, behavior: 'auto' });
  }, [selectedExtension?.id, isVisible]);

  const featuredExtensions = useMemo(
    () => extensionCatalog.filter((extension) => extension.featured).slice(0, 4),
    [extensionCatalog]
  );

  const recommendedExtensions = useMemo(
    () => extensionCatalog.filter((extension) => !extensionState[extension.id]?.installed).slice(0, 6),
    [extensionCatalog, extensionState]
  );

  const installedCount = installedExtensions.length;
  const enabledCount = useMemo(
    () => extensionCatalog.filter((extension) => extensionState[extension.id]?.enabled).length,
    [extensionCatalog, extensionState]
  );

  function handleInstallToggle(extension) {
    setExtensionState((current) => {
      const installed = !current[extension.id]?.installed;
      const next = {
        ...current,
        [extension.id]: {
          installed,
          enabled: installed,
        },
      };

      pushNotification?.(
        installed ? `${extension.name} installed in Tilder.` : `${extension.name} removed from Tilder.`,
        'info'
      );

      if (!installed && selectedExtensionId === extension.id) {
        setSelectedExtensionId('');
      }

      return next;
    });
  }

  function handleEnableToggle(extension) {
    setExtensionState((current) => {
      if (!current[extension.id]?.installed) {
        return current;
      }

      const enabled = !current[extension.id]?.enabled;
      const next = {
        ...current,
        [extension.id]: {
          installed: true,
          enabled,
        },
      };

      pushNotification?.(enabled ? `${extension.name} enabled.` : `${extension.name} disabled.`, 'info');
      return next;
    });
  }

  function renderRecommendationCard(extension, tone = '') {
    const state = extensionState[extension.id] || { installed: false, enabled: false };

    return (
      <button
        key={extension.id}
        type="button"
        className={`extensions-recommendation-card ${tone}`.trim()}
        onClick={() => setSelectedExtensionId(extension.id)}
      >
        <div className="extensions-recommendation-header">
          <div className="extensions-icon-tile" style={{ '--extension-accent': extension.accent }}>
            <i className={extension.iconClass}></i>
          </div>
          <div className="extensions-recommendation-copy">
            <div className="extensions-recommendation-title-row">
              <div className="extensions-recommendation-title">{extension.name}</div>
              {extension.featured ? <span className="extensions-badge">Featured</span> : null}
            </div>
            <div className="extensions-recommendation-publisher">{extension.publisher}</div>
          </div>
        </div>
        <div className="extensions-recommendation-summary">{extension.summary}</div>
        <div className="extensions-list-meta">
          {formatMeta(extension, state).map((entry) => (
            <span key={`${extension.id}-${entry}`}>{entry}</span>
          ))}
        </div>
      </button>
    );
  }

  function renderDetails() {
    if (!selectedExtension) {
      return (
        <>
          <div className="extensions-pane-heading">Recommended For You</div>
          <div className="extensions-pane-subtitle">
            Start with a curated set of extensions for Tilder. Pick one on the right or search to inspect full details.
          </div>

          <div className="extensions-recommendation-grid hero">
            {featuredExtensions.map((extension) => renderRecommendationCard(extension, 'featured'))}
          </div>

          <div className="extensions-detail-section">
            <div className="extensions-section-title">Quick Start</div>
            <div className="extensions-detail-fields">
              <div className="extensions-detail-field">
                <div className="extensions-detail-label">Installed</div>
                <div className="extensions-detail-value">
                  {installedCount ? `${installedCount} extension${installedCount === 1 ? '' : 's'} already installed.` : 'No extensions installed yet.'}
                </div>
              </div>
              <div className="extensions-detail-field">
                <div className="extensions-detail-label">Enabled</div>
                <div className="extensions-detail-value">
                  {enabledCount} extension{enabledCount === 1 ? '' : 's'} enabled right now.
                </div>
              </div>
              <div className="extensions-detail-field">
                <div className="extensions-detail-label">Developer Model</div>
                <div className="extensions-detail-value">
                  Contributors build Tilder extensions in code, submit them for review, and publish them after verification.
                </div>
              </div>
              <div className="extensions-detail-field">
                <div className="extensions-detail-label">Publishing Flow</div>
                <div className="extensions-detail-value">
                  Public extensions are verified before entering the marketplace. Private extensions can still be installed outside this UI by trusted contributors.
                </div>
              </div>
            </div>
          </div>

          <div className="extensions-detail-section">
            <div className="extensions-section-title">Try These Next</div>
            <div className="extensions-recommendation-grid compact">
              {recommendedExtensions.length ? (
                recommendedExtensions.map((extension) => renderRecommendationCard(extension))
              ) : (
                <div className="extensions-detail-empty">
                  You already have the current starter catalog installed.
                </div>
              )}
            </div>
          </div>
        </>
      );
    }

    const selectedState = extensionState[selectedExtension.id] || { installed: false, enabled: false };

    return (
      <>
        <div className="extensions-pane-heading">Extension Details</div>
        <div className="extensions-pane-subtitle">
          Verified marketplace extensions only. Built-in Tilder workbench features are not listed here.
        </div>

        <div className="extensions-detail-hero">
          <div
            className="extensions-icon-tile extensions-icon-tile-large"
            style={{ '--extension-accent': selectedExtension.accent }}
          >
            <i className={selectedExtension.iconClass}></i>
          </div>
          <div className="extensions-detail-copy">
            <div className="extensions-detail-title-row">
              <div className="extensions-detail-title">{selectedExtension.detailTitle}</div>
              {selectedExtension.featured ? <span className="extensions-badge">Featured</span> : null}
              {selectedExtension.source === 'catalog' ? <span className="extensions-badge">Verified</span> : null}
              {selectedExtension.source === 'community' ? <span className="extensions-badge">Private</span> : null}
              {selectedExtension.webEntrypoint ? <span className="extensions-badge">Code</span> : null}
            </div>
            <div className="extensions-detail-publisher">
              {selectedExtension.publisher} · v{selectedExtension.version}
            </div>
            <div className="extensions-detail-meta">
              <span>{selectedExtension.downloads}</span>
              <span>{selectedExtension.rating.toFixed(1)}★</span>
              <span>{selectedExtension.category}</span>
              <span>{selectedExtension.kind === 'code-extension' ? 'Code Extension' : 'Feature Pack'}</span>
            </div>
          </div>
        </div>

        <div className="extensions-detail-actions">
          <button
            type="button"
            className={`extensions-primary-btn ${selectedState.installed ? 'installed' : ''}`}
            onClick={() => handleInstallToggle(selectedExtension)}
          >
            {selectedState.installed ? 'Uninstall' : 'Install'}
          </button>
          <button
            type="button"
            className="extensions-secondary-btn"
            disabled={!selectedState.installed}
            onClick={() => handleEnableToggle(selectedExtension)}
          >
            {selectedState.enabled ? 'Disable' : 'Enable'}
          </button>
          <button
            type="button"
            className="extensions-secondary-btn"
            onClick={() => setSelectedExtensionId('')}
          >
            Back
          </button>
          {selectedExtension.website ? (
            <button
              type="button"
              className="extensions-secondary-btn"
              onClick={() => window.open(selectedExtension.website, '_blank', 'noopener,noreferrer')}
            >
              Open
            </button>
          ) : null}
        </div>

        <div className="extensions-detail-description">{selectedExtension.description}</div>

        <div className="extensions-detail-fields">
          <div className="extensions-detail-field">
            <div className="extensions-detail-label">Tags</div>
            <div className="extensions-tag-row">
              {(selectedExtension.tags || []).length ? (
                selectedExtension.tags.map((tag) => (
                  <span key={tag} className="extensions-tag-pill">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="extensions-detail-value">No tags</span>
              )}
            </div>
          </div>
          <div className="extensions-detail-field">
            <div className="extensions-detail-label">Code entrypoint</div>
            <div className="extensions-detail-value">
              {selectedExtension.webEntrypoint || 'Metadata-only feature pack'}
            </div>
          </div>
          <div className="extensions-detail-field">
            <div className="extensions-detail-label">Permissions</div>
            <div className="extensions-detail-value">
              {(selectedExtension.permissions || []).length
                ? selectedExtension.permissions.join(', ')
                : 'No special permissions declared'}
            </div>
          </div>
          <div className="extensions-detail-field">
            <div className="extensions-detail-label">Manifest</div>
            <div className="extensions-detail-value">
              {selectedExtension.source === 'community'
                ? `Private extension package v${selectedExtension.manifestVersion}`
                : `Verified marketplace package v${selectedExtension.manifestVersion}`}
            </div>
          </div>
          <div className="extensions-detail-field">
            <div className="extensions-detail-label">Publisher</div>
            <div className="extensions-detail-value">
              {selectedExtension.publisher}
              {selectedPublisher?.verified ? ' (Verified)' : selectedExtension.publisherVerified ? ' (Verified)' : ' (Community)'}
            </div>
          </div>
          <div className="extensions-detail-field">
            <div className="extensions-detail-label">Website</div>
            <div className="extensions-detail-value">
              {selectedPublisher?.website || selectedExtension.website || selectedExtension.repository || 'No external link provided'}
            </div>
          </div>
          <div className="extensions-detail-field">
            <div className="extensions-detail-label">Developer model</div>
            <div className="extensions-detail-value">
              Build the extension in code, submit it through the review flow, and publish it publicly after verification.
            </div>
          </div>
          <div className="extensions-detail-field">
            <div className="extensions-detail-label">Author system</div>
            <div className="extensions-detail-value">
              {selectedPublisher?.bio || 'Public publishers can own multiple extensions, keep a profile, and release verified updates through the Tilder marketplace review flow.'}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div id="extensionsarea" className="extensions-panel extensions-panel-modal">
      <div className="extensions-modal-frame">
      <div className="extensions-shell extensions-shell-main-modal">
        <div className="extensions-layout extensions-layout-modal">
          <div className="extensions-detail extensions-detail-pane" ref={detailRef}>
            {renderDetails()}
          </div>

          <div className="extensions-browser-pane">
            <div className="extensions-pane-heading">
              {isDiscoverMode ? 'Discover Extensions' : 'Installed Extensions'}
            </div>
            <div className="extensions-pane-subtitle">
              {isDiscoverMode
                ? `${summarizeCount('result', filteredExtensions.length)} shown across the catalog`
                : `${summarizeCount('extension', installedCount)} installed · ${summarizeCount('extension', enabledCount)} enabled`}
            </div>

            <div className="extensions-toolbar extensions-toolbar-inline">
              <div className="extensions-toolbar-top">
                <input
                  type="text"
                  className="extensions-search-input"
                  placeholder="Search extensions, tags, publishers, permissions..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>

              <div className="extensions-filter-row">
                <label htmlFor="extensions-category-select" className="extensions-filter-label">
                  Category
                </label>
                <select
                  id="extensions-category-select"
                  className="extensions-category-select"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {extensionCategories.map((entry) => (
                    <option key={entry} value={entry}>
                      {entry}
                    </option>
                  ))}
                </select>
                {(query || category !== 'All') ? (
                  <button
                    type="button"
                    className="extensions-clear-filter"
                    onClick={() => {
                      setQuery('');
                      setCategory('All');
                    }}
                  >
                    Reset
                  </button>
                ) : null}
              </div>
            </div>

            <div className="extensions-list extensions-list-right">
              {rightPaneExtensions.length ? (
                rightPaneExtensions.map((extension) => {
                  const state = extensionState[extension.id] || { installed: false, enabled: false };

                  return (
                    <button
                      key={extension.id}
                      type="button"
                      className={`extensions-list-item ${selectedExtension?.id === extension.id ? 'active' : ''}`}
                      onClick={() => setSelectedExtensionId(extension.id)}
                    >
                      <div className="extensions-icon-tile" style={{ '--extension-accent': extension.accent }}>
                        <i className={extension.iconClass}></i>
                      </div>
                      <div className="extensions-list-copy">
                        <div className="extensions-list-title-row">
                          <div className="extensions-list-title">{extension.name}</div>
                          {extension.featured ? <span className="extensions-badge">Featured</span> : null}
                          {extension.webEntrypoint ? <span className="extensions-badge">Code</span> : null}
                        </div>
                        <div className="extensions-list-publisher">{extension.publisher}</div>
                        <div className="extensions-list-summary">{extension.summary}</div>
                        <div className="extensions-list-meta">
                          {formatMeta(extension, state).map((entry) => (
                            <span key={`${extension.id}-${entry}`}>{entry}</span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="extensions-list-empty">
                  {isDiscoverMode
                    ? 'No extensions matched your search. Try another keyword or reset the category filter.'
                    : 'No extensions installed yet. Search the marketplace to get started.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
