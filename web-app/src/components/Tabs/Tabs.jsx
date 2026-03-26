export default function Tabs({
  tabs,
  activeTabId,
  setActiveTab,
  closeTab,
  onRunCurrentFile,
  onOpenCommandPalette,
  showRunAction,
  showLivePreviewAction,
  livePreviewOpen,
  livePreviewMode,
  onToggleLivePreview,
  onOpenLivePreviewTab,
}) {
  if (!tabs.length) {
    return (
      <div className="tabs empty">
      <div className="tabs-actions">
        <button type="button" className="tabs-action-btn" onClick={onOpenCommandPalette} title="Command Palette">
          <i className="fa-solid fa-bars-staggered"></i>
        </button>
      </div>
      </div>
    );
  }

  return (
    <div className="tabs">
      <div className="tabs-list">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${tab.id === activeTabId ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            title={tab.name}
          >
            <span className="tab-name">{tab.name}</span>
            <span className={`tab-dirty ${tab.dirty ? 'visible' : ''}`}>{tab.dirty ? '*' : ''}</span>
            <button
              className="tabClose"
              type="button"
              aria-label={`Close ${tab.name}`}
              onClick={(event) => {
                event.stopPropagation();
                closeTab(tab.id);
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="tabs-actions">
        <button type="button" className="tabs-action-btn" onClick={onOpenCommandPalette} title="Command Palette">
          <i className="fa-solid fa-bars-staggered"></i>
        </button>
        {showLivePreviewAction ? (
          <>
            <button
              type="button"
              className={`tabs-action-btn ${livePreviewOpen && livePreviewMode === 'split' ? 'active' : ''}`}
              onClick={onToggleLivePreview}
              title={livePreviewOpen && livePreviewMode === 'split' ? 'Hide Live Preview Beside Editor' : 'Open Live Preview Beside Editor'}
            >
              <i className="fa-regular fa-rectangle-list"></i>
            </button>
            <button
              type="button"
              className={`tabs-action-btn ${livePreviewOpen && livePreviewMode === 'tab' ? 'active' : ''}`}
              onClick={onOpenLivePreviewTab}
              title="Open Live Preview In New Tab"
            >
              <i className="fa-solid fa-up-right-from-square"></i>
            </button>
          </>
        ) : null}
        {showRunAction ? (
          <button type="button" className="tabs-action-btn primary" onClick={onRunCurrentFile} title="Run Current File">
            <i className="fa-solid fa-play"></i>
          </button>
        ) : null}
      </div>
    </div>
  );
}
