# Tilder Extensions

Tilder extensions are real code-based packages. The public marketplace is intended for reviewed and verified extensions, not raw one-click manifest imports from the UI.

## Marketplace model

- public extensions are submitted for review
- verified extensions are added to the shared marketplace catalog
- every Tilder user can install verified public extensions from the Extensions modal
- built-in Tilder workbench features are not marketplace extensions

## Contributor flow

Contributors build a Tilder extension with:

- a manifest
- an optional browser module entrypoint via `webEntrypoint`

Then they submit the extension through the project review flow, such as a GitHub contribution or marketplace registry pull request. After verification, the extension can be published for everyone.

## Private and custom extensions

Private extensions are still possible, but they are not meant to be added through a simple marketplace button inside the app.

Typical private/custom flow:

- build the manifest and extension code
- place or register it through your trusted admin/developer workflow
- let Tilder load it from an approved location or catalog source

## Runtime model

Tilder extensions can be real browser-side extensions, not just metadata cards.

Supported runtime ideas:

- activate extensions in the browser with `activate(api)`
- inject styles
- show notifications
- register extension-scoped commands
- use extension-scoped storage

## Manifest shape

Example fields:

```json
{
  "id": "community.dribll.night-signal-theme",
  "name": "Night Signal Theme",
  "publisher": "Dribll Community",
  "category": "Styling",
  "summary": "A darker midnight-accent theme for Tilder.",
  "description": "Night Signal Theme changes parts of the Tilder chrome through a small browser extension module.",
  "tags": ["theme", "dark", "styling"],
  "version": "1.0.0",
  "rating": 4.9,
  "downloads": "Community",
  "iconClass": "fa-solid fa-moon",
  "accent": "#5d85ff",
  "permissions": ["styles", "notifications"],
  "webEntrypoint": "/extensions/night-signal/main.js",
  "website": "https://example.com/night-signal",
  "repository": "https://github.com/example/night-signal"
}
```

## Code entrypoint

The `webEntrypoint` module should export `activate(api)`.

```js
export function activate(api) {
  api.styles.mount(`
    .statusBar {
      box-shadow: inset 0 1px 0 rgba(93, 133, 255, 0.45);
    }
  `);

  api.notifications.info('Theme loaded.');

  const disposeCommand = api.commands.register('hello', () => {
    api.notifications.info('Hello from the extension runtime.');
  });

  return () => {
    disposeCommand();
  };
}
```

## API surface

- `api.manifest`
- `api.storage.get(key, fallback)`
- `api.storage.set(key, value)`
- `api.storage.remove(key)`
- `api.notifications.info(message)`
- `api.notifications.warning(message)`
- `api.notifications.error(message)`
- `api.styles.mount(cssText, key?)`
- `api.styles.unmount(key?)`
- `api.commands.register(commandId, handler)`
- `api.commands.execute(commandId, ...args)`
- `api.app.getWorkspaceSnapshot()`
- `api.app.getActiveTabSnapshot()`

## Notes

- verified public extensions belong in the marketplace
- private extensions belong in your trusted developer/admin flow
- Tilder currently runs web extensions in the browser, so extension authors should keep modules lightweight and front-end safe
