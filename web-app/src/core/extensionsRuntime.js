const runtimeState = {
  loaded: new Map(),
  styleNodes: new Map(),
  commandHandlers: new Map(),
  completionItems: new Map(),
};

function extensionStorageKey(extensionId, key) {
  return `tilder-extension:${extensionId}:${key}`;
}

function createApi(extension, options) {
  const styleKeys = new Set();
  const commandIds = new Set();
  const completionKeys = new Set();

  const api = {
    manifest: extension,
    storage: {
      get(key, fallbackValue = null) {
        try {
          const raw = window.localStorage.getItem(extensionStorageKey(extension.id, key));
          return raw == null ? fallbackValue : JSON.parse(raw);
        } catch {
          return fallbackValue;
        }
      },
      set(key, value) {
        window.localStorage.setItem(extensionStorageKey(extension.id, key), JSON.stringify(value));
      },
      remove(key) {
        window.localStorage.removeItem(extensionStorageKey(extension.id, key));
      },
    },
    notifications: {
      info(message) {
        options.pushNotification?.(`[${extension.name}] ${message}`, 'info');
      },
      warning(message) {
        options.pushNotification?.(`[${extension.name}] ${message}`, 'warning');
      },
      error(message) {
        options.pushNotification?.(`[${extension.name}] ${message}`, 'error');
      },
    },
    styles: {
      mount(cssText, key = 'default') {
        const styleId = `${extension.id}:${key}`;
        let node = runtimeState.styleNodes.get(styleId);
        if (!node) {
          node = document.createElement('style');
          node.dataset.tilderExtension = extension.id;
          node.dataset.tilderExtensionStyle = key;
          document.head.appendChild(node);
          runtimeState.styleNodes.set(styleId, node);
        }
        node.textContent = String(cssText || '');
        styleKeys.add(styleId);
      },
      unmount(key = 'default') {
        const styleId = `${extension.id}:${key}`;
        const node = runtimeState.styleNodes.get(styleId);
        if (node) {
          node.remove();
          runtimeState.styleNodes.delete(styleId);
          styleKeys.delete(styleId);
        }
      },
    },
    commands: {
      register(commandId, handler) {
        const fullyQualifiedId = `${extension.id}:${commandId}`;
        runtimeState.commandHandlers.set(fullyQualifiedId, handler);
        commandIds.add(fullyQualifiedId);
        return () => {
          runtimeState.commandHandlers.delete(fullyQualifiedId);
          commandIds.delete(fullyQualifiedId);
        };
      },
      async execute(commandId, ...args) {
        const fullyQualifiedId = commandId.includes(':') ? commandId : `${extension.id}:${commandId}`;
        const handler = runtimeState.commandHandlers.get(fullyQualifiedId);
        if (!handler) {
          throw new Error(`Command "${fullyQualifiedId}" is not registered.`);
        }
        return handler(...args);
      },
    },
    completions: {
      register(languageId, items = []) {
        const normalizedLanguageId = String(languageId || '').trim().toLowerCase();
        if (!normalizedLanguageId) {
          throw new Error('A language id is required to register extension completions.');
        }

        const normalizedItems = Array.isArray(items)
          ? items
              .filter((entry) => entry && typeof entry === 'object' && String(entry.label || '').trim())
              .map((entry, index) => ({
                label: String(entry.label || '').trim(),
                insertText: String(entry.insertText || entry.label || '').trim() || String(entry.label || '').trim(),
                detail: String(entry.detail || '').trim(),
                documentation: String(entry.documentation || '').trim(),
                kind: String(entry.kind || 'snippet').trim().toLowerCase(),
                sortText: String(entry.sortText || `ext-${extension.id}-${String(index).padStart(4, '0')}`),
                filterText: String(entry.filterText || entry.label || '').trim(),
              }))
          : [];

        if (!runtimeState.completionItems.has(normalizedLanguageId)) {
          runtimeState.completionItems.set(normalizedLanguageId, new Map());
        }

        runtimeState.completionItems.get(normalizedLanguageId).set(extension.id, normalizedItems);
        completionKeys.add(normalizedLanguageId);

        return () => {
          const bucket = runtimeState.completionItems.get(normalizedLanguageId);
          if (!bucket) {
            return;
          }

          bucket.delete(extension.id);
          if (!bucket.size) {
            runtimeState.completionItems.delete(normalizedLanguageId);
          }
          completionKeys.delete(normalizedLanguageId);
        };
      },
    },
    app: {
      getWorkspaceSnapshot: options.getWorkspaceSnapshot,
      getActiveTabSnapshot: options.getActiveTabSnapshot,
    },
  };

  return {
    api,
    cleanup() {
      styleKeys.forEach((styleId) => {
        const node = runtimeState.styleNodes.get(styleId);
        if (node) {
          node.remove();
          runtimeState.styleNodes.delete(styleId);
        }
      });
      commandIds.forEach((commandId) => runtimeState.commandHandlers.delete(commandId));
      completionKeys.forEach((languageId) => {
        const bucket = runtimeState.completionItems.get(languageId);
        if (!bucket) {
          return;
        }

        bucket.delete(extension.id);
        if (!bucket.size) {
          runtimeState.completionItems.delete(languageId);
        }
      });
    },
  };
}

async function loadModuleFromUrl(entryUrl) {
  const resolvedUrl = new URL(entryUrl, window.location.origin).toString();
  const response = await fetch(resolvedUrl, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Could not load extension entrypoint: ${resolvedUrl}`);
  }

  const source = await response.text();
  const blobUrl = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
  try {
    return await import(/* @vite-ignore */ blobUrl);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

async function activateExtension(extension, options) {
  const runtime = createApi(extension, options);
  const module = await loadModuleFromUrl(extension.webEntrypoint);
  const activationResult = typeof module.activate === 'function' ? await module.activate(runtime.api) : null;

  runtimeState.loaded.set(extension.id, {
    extension,
    deactivate:
      typeof activationResult === 'function'
        ? activationResult
        : typeof module.deactivate === 'function'
          ? module.deactivate
          : null,
    cleanup: runtime.cleanup,
  });
}

function deactivateExtension(extensionId) {
  const entry = runtimeState.loaded.get(extensionId);
  if (!entry) {
    return;
  }

  try {
    entry.deactivate?.();
  } catch {
    // Best-effort cleanup.
  }

  entry.cleanup?.();
  runtimeState.loaded.delete(extensionId);
}

export async function syncExtensionsRuntime({ catalog, extensionState, pushNotification, getWorkspaceSnapshot, getActiveTabSnapshot }) {
  if (typeof window === 'undefined' || !Array.isArray(catalog)) {
    return;
  }

  const enabledIds = new Set(
    catalog
      .filter((extension) => extension.webEntrypoint && extensionState?.[extension.id]?.installed && extensionState?.[extension.id]?.enabled)
      .map((extension) => extension.id)
  );

  [...runtimeState.loaded.keys()].forEach((extensionId) => {
    if (!enabledIds.has(extensionId)) {
      deactivateExtension(extensionId);
    }
  });

  for (const extension of catalog) {
    if (!extension.webEntrypoint || !enabledIds.has(extension.id) || runtimeState.loaded.has(extension.id)) {
      continue;
    }

    try {
      await activateExtension(extension, {
        pushNotification,
        getWorkspaceSnapshot,
        getActiveTabSnapshot,
      });
      pushNotification?.(`${extension.name} activated.`, 'info');
    } catch (error) {
      pushNotification?.(
        error instanceof Error ? `${extension.name} failed to activate: ${error.message}` : `${extension.name} failed to activate.`,
        'warning'
      );
    }
  }
}

export function disposeExtensionsRuntime() {
  [...runtimeState.loaded.keys()].forEach((extensionId) => deactivateExtension(extensionId));
}

export function getExtensionCompletions(languageId) {
  const normalizedLanguageId = String(languageId || '').trim().toLowerCase();
  if (!normalizedLanguageId) {
    return [];
  }

  const direct = runtimeState.completionItems.get(normalizedLanguageId);
  if (!direct?.size) {
    return [];
  }

  return [...direct.values()].flat();
}
