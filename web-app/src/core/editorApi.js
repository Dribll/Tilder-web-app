import { apiFetch } from './apiBase.js';

export const MONACO_NATIVE_LANGUAGE_IDS = new Set([
  'css',
  'html',
  'javascript',
  'json',
  'markdown',
  'scss',
  'typescript',
]);

export async function fetchEditorCapabilities() {
  const response = await apiFetch('/api/editor/capabilities');
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.message || 'Unable to load editor capabilities.');
  }

  return payload;
}

export function getLanguageCapability(capabilities, languageId) {
  if (!languageId) {
    return null;
  }

  return capabilities?.languages?.[languageId] || null;
}

export function describeLanguageIntelliSense(capabilities, languageId) {
  if (!languageId) {
    return null;
  }

  const capability = getLanguageCapability(capabilities, languageId);

  if (capability?.providerType === 'native') {
    return {
      available: true,
      providerType: 'native',
      statusLabel: 'IntelliSense: Monaco',
      detail: capability.detail || 'Native Monaco language service',
    };
  }

  if (capability?.providerType === 'lsp') {
    if (capability.available) {
      return {
        available: true,
        providerType: 'lsp',
        serverLabel: capability.serverLabel || '',
        statusLabel:
          capability.runtimeMode === 'desktop-local'
            ? `IntelliSense: ${capability.serverLabel || 'LSP ready'}`
            : 'IntelliSense: backend LSP',
        detail:
          capability.detail ||
          (capability.runtimeMode === 'desktop-local'
            ? 'A local language server is available.'
            : 'A backend language server is available.'),
      };
    }

    return {
      available: false,
      providerType: 'lsp',
      serverLabel: capability.serverLabel || '',
      statusLabel:
        capability.runtimeMode === 'desktop-local'
          ? 'IntelliSense: install server'
          : 'IntelliSense: syntax + backend',
      detail:
        capability.detail ||
        (capability.runtimeMode === 'desktop-local'
          ? `Syntax support is active. Install ${capability.serverLabel || capability.command || 'the language server'} for full IntelliSense.`
          : `Syntax support is active on the web. Install ${capability.serverLabel || capability.command || 'the language server'} on the Tilder backend for full hosted IntelliSense.`),
    };
  }

  if (capability?.providerType === 'basic') {
    return {
      available: true,
      providerType: 'basic',
      statusLabel: 'IntelliSense: syntax support',
      detail: capability.detail || 'Syntax highlighting, language mode detection, brackets, and basic editor behaviors are available for this language.',
    };
  }

  if (MONACO_NATIVE_LANGUAGE_IDS.has(languageId)) {
    return {
      available: true,
      providerType: 'native',
      statusLabel: 'IntelliSense: Monaco',
      detail: 'Native Monaco language service',
    };
  }

  return {
    available: false,
    providerType: 'none',
    statusLabel: 'IntelliSense: text mode',
    detail: 'This file is open in plain text mode. Choose a language mode to enable syntax support.',
  };
}
