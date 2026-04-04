export function activate(api) {
  api.styles.mount(`
    .statusBar {
      background: linear-gradient(180deg, rgba(22, 28, 58, 0.98), rgba(11, 15, 32, 0.98));
      border-top-color: rgba(93, 133, 255, 0.42);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .sidebar,
    .modalContainer {
      box-shadow: 0 0 0 1px rgba(93, 133, 255, 0.12);
    }

    .tabs {
      background: linear-gradient(180deg, rgba(22, 26, 46, 0.98), rgba(15, 18, 33, 0.98));
    }
  `);

  api.notifications.info('Night Signal Theme activated.');

  const disposeHello = api.commands.register('hello', () => {
    api.notifications.info('Hello from Night Signal Theme.');
  });

  return () => {
    disposeHello();
    api.styles.unmount();
  };
}
