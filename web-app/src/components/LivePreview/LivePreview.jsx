import React from 'react';

export default function LivePreview({ isOpen, htmlDocument, width, onRefresh, onOpenExternal, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <aside className="live-preview-panel" style={{ width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px` }}>
      <div className="live-preview-header">
        <div className="live-preview-title-group">
          <span className="live-preview-title">Live Preview</span>
          <span className="live-preview-subtitle">HTML preview updates from the active tab.</span>
        </div>
        <div className="live-preview-actions">
          <button type="button" className="live-preview-btn" onClick={onRefresh} title="Refresh Preview">
            <i className="fa-solid fa-rotate-right"></i>
          </button>
          <button type="button" className="live-preview-btn" onClick={onOpenExternal} title="Open In New Tab">
            <i className="fa-solid fa-up-right-from-square"></i>
          </button>
          <button type="button" className="live-preview-btn" onClick={onClose} title="Close Preview">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div className="live-preview-body">
        {htmlDocument ? (
          <iframe
            className="live-preview-frame"
            title="Tilder Live Preview"
            srcDoc={htmlDocument}
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="live-preview-empty">Preview is preparing...</div>
        )}
      </div>
    </aside>
  );
}
