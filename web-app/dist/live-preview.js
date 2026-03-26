(function () {
  const PREVIEW_CHANNEL = 'tilder-live-preview';
  const PREVIEW_ID = 'primary';
  const STORAGE_KEY = `${PREVIEW_CHANNEL}:${PREVIEW_ID}`;
  const frame = document.getElementById('preview-frame');
  const emptyState = document.getElementById('preview-empty');
  const meta = document.getElementById('preview-meta');
  const reloadBtn = document.getElementById('reload-btn');

  function readPayload() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function render(payload) {
    if (!payload || !payload.document) {
      frame.removeAttribute('srcdoc');
      emptyState.style.display = 'grid';
      meta.textContent = 'Waiting for HTML from Tilder...';
      return;
    }

    frame.srcdoc = payload.document;
    emptyState.style.display = 'none';
    meta.textContent = `${payload.title || 'Untitled'}${payload.updatedAt ? ` • ${new Date(payload.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}`;
  }

  function sync() {
    render(readPayload());
  }

  reloadBtn.addEventListener('click', sync);

  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel(PREVIEW_CHANNEL);
    channel.onmessage = (event) => {
      const message = event.data;
      if (!message || message.previewId !== PREVIEW_ID) {
        return;
      }

      if (message.type === 'clear') {
        render(null);
        return;
      }

      if (message.type === 'render') {
        render(message.payload);
      }
    };

    window.addEventListener('beforeunload', () => {
      channel.close();
    });
  }

  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      sync();
    }
  });

  sync();
})();
