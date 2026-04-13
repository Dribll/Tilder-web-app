import React, { useState } from 'react';

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
  showSplitEditorAction,
  splitEditorOpen,
  onSplitEditor,
  groupId = '',
  onTabDragStart,
  onTabDrop,
  onTogglePin,
}) {
  const [dropInsertBefore, setDropInsertBefore] = useState(null);

  function clearDrop() {
    setDropInsertBefore(null);
  }

  if (!tabs.length) {
    return (
      <div className="tabs empty">
        <div className="tabs-actions">
          <button type="button" className="tabs-action-btn" onClick={onOpenCommandPalette} title="Command Palette">
            <i className="fa-solid fa-bars-staggered"></i>
          </button>
          {showSplitEditorAction ? (
            <button type="button" className="tabs-action-btn" onClick={onSplitEditor} title="Split Editor Right">
              <i className="fa-solid fa-columns"></i>
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="tabs" onDragEnd={clearDrop}>
      <div
        className="tabs-list"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const insert = dropInsertBefore != null ? dropInsertBefore : tabs.length;
          onTabDrop?.(groupId, insert);
          clearDrop();
        }}
      >
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            {dropInsertBefore === index ? <div className="tab-drop-indicator" aria-hidden="true" /> : null}
            <div
              className={`tab ${tab.id === activeTabId ? 'active' : ''} ${tab.isPreview ? 'tab-preview' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              title={tab.name}
              draggable
              onDragStart={() => {
                onTabDragStart?.(tab.id, groupId, index);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();
                const rect = event.currentTarget.getBoundingClientRect();
                const before = event.clientX < rect.left + rect.width / 2;
                setDropInsertBefore(before ? index : index + 1);
              }}
              onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();
                const insert = dropInsertBefore != null ? dropInsertBefore : index + 1;
                onTabDrop?.(groupId, insert);
                clearDrop();
              }}
            >
              <span className="tab-name">{tab.name}</span>
              {tab.pinned ? (
                <span className="tab-pin" title="Pinned tab">
                  {'\uD83D\uDCCC'}
                </span>
              ) : null}
              <span className={`tab-dirty ${tab.dirty ? 'visible' : ''}`}>{tab.dirty ? '*' : ''}</span>
              <button
                className="tabPin"
                type="button"
                aria-label={`${tab.pinned ? 'Unpin' : 'Pin'} ${tab.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onTogglePin?.(tab.id);
                }}
              >
                {tab.pinned ? '•' : '○'}
              </button>
              <button
                className="tabClose"
                type="button"
                aria-label={`Close ${tab.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  closeTab(tab.id, groupId || 'primary');
                }}
              >
                x
              </button>
            </div>
          </React.Fragment>
        ))}
        {dropInsertBefore === tabs.length ? <div className="tab-drop-indicator" aria-hidden="true" /> : null}
        <div
          className="tabs-list-end-catch"
          onDragOver={(event) => {
            event.preventDefault();
            setDropInsertBefore(tabs.length);
          }}
          aria-hidden="true"
        />
      </div>
      <div className="tabs-actions">
        <button type="button" className="tabs-action-btn" onClick={onOpenCommandPalette} title="Command Palette">
          <i className="fa-solid fa-bars-staggered"></i>
        </button>
        {showSplitEditorAction ? (
          <button type="button" className="tabs-action-btn" onClick={onSplitEditor} title="Split Editor Right">
            <i className="fa-solid fa-columns"></i>
          </button>
        ) : null}
        {showLivePreviewAction ? (
          <>
            <button
              type="button"
              className={`tabs-action-btn ${livePreviewOpen && livePreviewMode === 'split' ? 'active' : ''}`}
              onClick={onToggleLivePreview}
              title={
                livePreviewOpen && livePreviewMode === 'split'
                  ? 'Hide Live Preview Beside Editor'
                  : 'Open Live Preview Beside Editor'
              }
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
