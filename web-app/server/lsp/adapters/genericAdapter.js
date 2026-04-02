export function createGenericLspAdapter(language) {
  return {
    id: language.id,
    languageId: language.id,
    family: language.family || language.id,
    supportLevel: language.supportLevel,
    serverLabel: language.serverLabel || '',
    commands: language.serverCommands || [],
    launchArgs: language.serverArgs || [],
    rootPatterns: language.rootPatterns || ['.git'],
    detail: language.detail || '',
  };
}
