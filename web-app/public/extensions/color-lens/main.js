export async function activate(api) {
  // Initialize theme styles
  api.styles.mount(`
      .color-preview-box { border-radius: 4px; border: 1px solid rgba(255,255,255,0.2); width: 12px; height: 12px; display: inline-block; vertical-align: middle; margin-right: 4px; box-shadow: 0 0 4px rgba(0,0,0,0.5); }
    `, 'theme');
  api.notifications.info('color lens loaded successfully.');
}