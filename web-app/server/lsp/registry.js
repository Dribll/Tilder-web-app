import {
  EDITOR_LANGUAGE_REGISTRY,
  getEditorLanguagesBySupportLevel,
} from '../../shared/editor/languageRegistry.js';
import { createGenericLspAdapter } from './adapters/genericAdapter.js';

export const NATIVE_EDITOR_LANGUAGES = getEditorLanguagesBySupportLevel('native');
export const LSP_EDITOR_LANGUAGES = getEditorLanguagesBySupportLevel('lsp');
export const BASIC_EDITOR_LANGUAGES = getEditorLanguagesBySupportLevel('basic');

export const LSP_LANGUAGE_ADAPTERS = Object.fromEntries(
  LSP_EDITOR_LANGUAGES.map((language) => [language.id, createGenericLspAdapter(language)])
);

export function getLspAdapter(languageId) {
  return LSP_LANGUAGE_ADAPTERS[languageId] || null;
}

export function getAllEditorLanguages() {
  return EDITOR_LANGUAGE_REGISTRY;
}
