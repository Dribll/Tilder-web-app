export async function activate(api) {
  // Initialize theme styles
  api.styles.mount(`
      .monaco-editor .lines-content .cigr { box-shadow: inset 1px 0 0 0 rgba(100, 150, 255, 0.3) !important; }
      .monaco-editor .lines-content .cigra { box-shadow: inset 1px 0 0 0 rgba(100, 200, 255, 0.8) !important; }
    `, 'theme');
  api.notifications.info('indent glow loaded successfully.');
}