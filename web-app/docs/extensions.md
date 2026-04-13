# Tilder Extensions

Tilder now has a real publisher + package + publish flow inspired by the VS Code extension workflow. The goal is:

- developers build extensions as code
- publishers own extension identities
- publishing uses tokens
- public extensions go into the shared marketplace

This is intentionally similar in spirit to the VS Code publishing flow documented here:
[VS Code: Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## Core model

Tilder has three parts:

1. A publisher
2. An extension package
3. A marketplace publish step

Public extensions are served from the Tilder backend after publishing. Built-in Tilder workbench features are not marketplace extensions.

## Publisher flow

Create a publisher first:

- `POST /api/extensions/publishers`

Then create a publisher token:

- `POST /api/extensions/publishers/:publisherId/tokens`

Publisher tokens are used by the CLI when publishing, similar to how VS Code uses publisher access tokens.

## Extension project structure

Typical extension folder:

```text
my-extension/
  manifest.json
  dist/
    main.js
  README.md
```

The browser entrypoint lives in `webEntrypoint` inside `manifest.json`.

## Example manifest

```json
{
  "manifestVersion": 2,
  "id": "sample.weather-tools",
  "name": "Weather Tools",
  "publisher": "Sample Publisher",
  "version": "1.0.0",
  "category": "Productivity",
  "summary": "Weather-aware utilities for Tilder.",
  "description": "Adds a few weather-focused helpers and notifications.",
  "tags": ["weather", "productivity"],
  "permissions": ["notifications"],
  "iconClass": "fa-solid fa-cloud-sun",
  "accent": "#7f86ff",
  "webEntrypoint": "dist/main.js"
}
```

## Example code entrypoint

```js
export function activate(api) {
  api.notifications.info('Weather Tools activated.');

  const dispose = api.commands.register('hello', () => {
    api.notifications.info('Hello from Weather Tools.');
  });

  return () => {
    dispose();
  };
}
```

## Tilder CLI

Tilder ships a lightweight author CLI:

```bash
npm run tilderx -- init ./my-extension
npm run tilderx -- validate ./my-extension
npm run tilderx -- package ./my-extension --publisher sample-publisher
npm run tilderx -- publish ./my-extension --registry https://tilder-services.onrender.com --publisher sample-publisher --token TILDER_PAT
```

### Commands

- `init`
  - scaffolds a manifest, README, and browser entrypoint
- `validate`
  - checks the manifest and packaged files
- `package`
  - writes a `.tilder.json` package file
- `publish`
  - uploads the package to the Tilder marketplace backend

## Marketplace API

Public read routes:

- `GET /api/extensions/marketplace`
- `GET /api/extensions/publishers`
- `GET /api/extensions/publishers/:publisherId`

Author/publisher routes:

- `POST /api/extensions/publishers`
- `POST /api/extensions/publishers/:publisherId/tokens`
- `POST /api/extensions/packages/validate`
- `POST /api/extensions/publish`

Review routes:

- `POST /api/extensions/submissions`
- `GET /api/extensions/submissions`
- `POST /api/extensions/submissions/:submissionId/review`

## Package format

The CLI publishes a JSON package with:

```json
{
  "packageVersion": 1,
  "publisherId": "sample-publisher",
  "manifest": {
    "id": "sample.weather-tools",
    "name": "Weather Tools",
    "version": "1.0.0",
    "webEntrypoint": "dist/main.js"
  },
  "files": [
    {
      "path": "dist/main.js",
      "encoding": "base64",
      "content": "ZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlKCkgey4uLn0="
    }
  ]
}
```

When published:

- the backend stores the files under `data/extensions-assets/...`
- marketplace entries point to the hosted asset URLs
- every Tilder user can install the public package

## Runtime surface

Extensions currently run in the browser runtime and can use:

- `api.manifest`
- `api.storage.get/set/remove`
- `api.notifications.info/warning/error`
- `api.styles.mount/unmount`
- `api.commands.register/execute`
- `api.app.getWorkspaceSnapshot()`
- `api.app.getActiveTabSnapshot()`

## Recommended publishing workflow

1. Create a publisher
2. Generate a publisher token
3. Build your extension locally
4. Validate it with `tilderx`
5. Publish it with the token
6. Optionally submit it for marketplace review if you want curated/verified placement

## Notes

- Publishers can own multiple extensions
- Tokens should be treated like secrets
- Public marketplace publishing is code-based, not a simple manifest upload button
- Verified / curated marketplace review can still happen on top of the raw publish flow
