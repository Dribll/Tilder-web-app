export async function activate(api) {
  // Initialize theme styles
  api.styles.mount(`
      body { --bg-color-base: #0f111a !important; --sidebar-bg: #141724 !important; }
      .monaco-editor { --vscode-editor-background: #0f111a !important; }
      nav { background-color: #0b0c13 !important; }
    `, 'theme');
  api.notifications.info('night signal theme loaded successfully.');
}