import React, { useEffect } from 'react';

export default function ConfirmDialog({ request, onCancel, onConfirm }) {
  useEffect(() => {
    if (!request) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        onConfirm();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel, onConfirm, request]);

  if (!request) {
    return null;
  }

  return (
    <div className="confirm-dialog-overlay" onMouseDown={onCancel}>
      <div className="confirm-dialog" onMouseDown={(event) => event.stopPropagation()}>
        <div className="confirm-dialog-title">{request.title || 'Confirm Action'}</div>
        <div className="confirm-dialog-message">{request.message}</div>
        <div className="confirm-dialog-actions">
          <button type="button" className="keyboard-shortcuts-btn subtle" onClick={onCancel}>
            {request.cancelLabel || 'Cancel'}
          </button>
          <button
            type="button"
            className={`keyboard-shortcuts-btn ${request.danger ? 'danger' : ''}`}
            onClick={onConfirm}
          >
            {request.confirmLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
