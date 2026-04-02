import { io } from 'socket.io-client';
import { getApiOrigin } from './apiBase.js';

function toFileUri(filePath) {
  const normalized = String(filePath || '').replace(/\\/g, '/');
  if (!normalized) {
    return '';
  }

  if (/^[A-Za-z]:/.test(normalized)) {
    return encodeURI(`file:///${normalized}`);
  }

  return encodeURI(normalized.startsWith('/') ? `file://${normalized}` : `file:///${normalized}`);
}

function buildDocumentUri(workspaceRoot, relativePath, fallbackName = 'untitled.txt') {
  const normalizedRoot = String(workspaceRoot || '').replace(/\\/g, '/').replace(/\/+$/, '');
  const normalizedRelativePath = String(relativePath || fallbackName)
    .replace(/^root\/?/, '')
    .replace(/^\/+/, '')
    .replace(/\\/g, '/');

  return toFileUri(normalizedRelativePath ? `${normalizedRoot}/${normalizedRelativePath}` : normalizedRoot);
}

function toLspPosition(position) {
  return {
    line: Math.max(0, Number(position?.lineNumber || 1) - 1),
    character: Math.max(0, Number(position?.column || 1) - 1),
  };
}

export function createLspBridge({
  languageId,
  sessionId,
  workspaceRoot,
  onStatus = () => {},
}) {
  const socket = io(`${getApiOrigin()}/lsp`, {
    withCredentials: true,
    transports: ['websocket'],
    query: {
      languageId,
      sessionId,
      workspaceRoot,
    },
  });

  let rpcId = 0;
  let initialized = false;
  let initializePromise = null;
  let activeDocument = null;
  const pendingRequests = new Map();
  const documentVersions = new Map();

  function rejectAllPending(error) {
    pendingRequests.forEach(({ reject }) => reject(error));
    pendingRequests.clear();
  }

  socket.on('connect_error', (error) => {
    onStatus({
      status: 'error',
      languageId,
      message: error instanceof Error ? error.message : 'Unable to connect to the LSP bridge.',
    });
    rejectAllPending(error instanceof Error ? error : new Error('Unable to connect to the LSP bridge.'));
  });

  socket.on('disconnect', () => {
    onStatus({
      status: 'disconnected',
      languageId,
      message: 'Disconnected from the language server bridge.',
    });
    rejectAllPending(new Error('Disconnected from the language server bridge.'));
  });

  socket.on('lsp:status', (payload) => {
    onStatus(payload || { status: 'unknown', languageId });
  });

  socket.on('lsp:message', (message) => {
    if (!message || typeof message !== 'object') {
      return;
    }

    if (Object.prototype.hasOwnProperty.call(message, 'id') && pendingRequests.has(message.id)) {
      const { resolve, reject } = pendingRequests.get(message.id);
      pendingRequests.delete(message.id);

      if (message.error) {
        reject(new Error(message.error.message || 'Language server request failed.'));
        return;
      }

      resolve(message.result);
    }
  });

  function sendNotification(method, params) {
    socket.emit('lsp:message', {
      jsonrpc: '2.0',
      method,
      params,
    });
  }

  function sendRequest(method, params) {
    const id = ++rpcId;
    socket.emit('lsp:message', {
      jsonrpc: '2.0',
      id,
      method,
      params,
    });

    return new Promise((resolve, reject) => {
      const timeoutId = window.setTimeout(() => {
        if (!pendingRequests.has(id)) {
          return;
        }

        pendingRequests.delete(id);
        reject(new Error(`${method} timed out.`));
      }, 10_000);

      pendingRequests.set(id, {
        resolve: (value) => {
          window.clearTimeout(timeoutId);
          resolve(value);
        },
        reject: (error) => {
          window.clearTimeout(timeoutId);
          reject(error);
        },
      });
    });
  }

  async function ensureInitialized() {
    if (initialized) {
      return;
    }

    if (initializePromise) {
      await initializePromise;
      return;
    }

    initializePromise = sendRequest('initialize', {
      processId: null,
      clientInfo: {
        name: 'Tilder',
        version: '0.1.0',
      },
      rootUri: toFileUri(workspaceRoot),
      capabilities: {
        textDocument: {
          completion: {
            completionItem: {
              snippetSupport: true,
              documentationFormat: ['markdown', 'plaintext'],
            },
          },
        },
      },
      workspaceFolders: [
        {
          uri: toFileUri(workspaceRoot),
          name: 'workspace',
        },
      ],
    })
      .then(() => {
        initialized = true;
        sendNotification('initialized', {});
      })
      .finally(() => {
        initializePromise = null;
      });

    await initializePromise;
  }

  async function syncDocument({ relativePath, fileName, text }) {
    await ensureInitialized();

    const uri = buildDocumentUri(workspaceRoot, relativePath, fileName);
    const version = (documentVersions.get(uri) || 0) + 1;
    documentVersions.set(uri, version);

    if (activeDocument?.uri !== uri) {
      if (activeDocument?.uri) {
        sendNotification('textDocument/didClose', {
          textDocument: { uri: activeDocument.uri },
        });
      }

      activeDocument = {
        uri,
        languageId,
      };

      sendNotification('textDocument/didOpen', {
        textDocument: {
          uri,
          languageId,
          version,
          text,
        },
      });
      return uri;
    }

    sendNotification('textDocument/didChange', {
      textDocument: {
        uri,
        version,
      },
      contentChanges: [{ text }],
    });
    return uri;
  }

  async function requestCompletion({ relativePath, fileName, text, position }) {
    const uri = await syncDocument({ relativePath, fileName, text });
    return sendRequest('textDocument/completion', {
      textDocument: { uri },
      position: toLspPosition(position),
      context: {
        triggerKind: 1,
      },
    });
  }

  function dispose() {
    if (activeDocument?.uri) {
      sendNotification('textDocument/didClose', {
        textDocument: { uri: activeDocument.uri },
      });
    }

    socket.disconnect();
    rejectAllPending(new Error('Language server bridge disposed.'));
  }

  return {
    ensureInitialized,
    syncDocument,
    requestCompletion,
    dispose,
  };
}
