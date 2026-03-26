# Tilder OAuth Registration Values

This file gives the exact values to use when registering Tilder for GitHub and Microsoft sign-in.

## Important boundary

Tilder can give end users a one-click official browser sign-in flow.

But the server owner must still register Tilder as an OAuth application with GitHub and Microsoft first.

That owner-side registration cannot be skipped or auto-created from a normal web app.

Also, Tilder cannot legally or technically impersonate the existing **Visual Studio Code** OAuth app. After setup, users will see prompts for **Tilder**, not **VS Code**.

## Current local architecture

- Frontend UI: `http://localhost:5173`
- Node auth/backend server: `http://localhost:3210`
- GitHub and Microsoft callbacks are handled by the backend server, not Vite

## GitHub OAuth App

GitHub OAuth apps support a single callback URL, so use:
- one app for local development
- one app for production

### GitHub local app

- Application name: `Tilder Local`
- Homepage URL: `http://localhost:5173`
- Application description: `Tilder local development sign-in`
- Authorization callback URL: `http://localhost:3210/api/auth/github/callback`

### GitHub production app

- Application name: `Tilder`
- Homepage URL: `https://tildercode.onrender.com`
- Application description: `Tilder web sign-in`
- Authorization callback URL: `https://tildercode.onrender.com/api/auth/github/callback`

### GitHub scopes used by Tilder

Current server requests:
- `read:user`
- `user:email`
- `repo`

### GitHub env mapping

Local:

```env
GITHUB_CLIENT_ID=<local github client id>
GITHUB_CLIENT_SECRET=<local github client secret>
```

Production:

```env
GITHUB_CLIENT_ID=<production github client id>
GITHUB_CLIENT_SECRET=<production github client secret>
```

## Microsoft App Registration

Microsoft can hold multiple redirect URIs in one app registration, so local and production can usually share one app.

### Microsoft app fields

- Name: `Tilder`
- Supported account types:
  `Accounts in any organizational directory and personal Microsoft accounts`
- Platform: `Web`

### Redirect URIs

- `http://localhost:3210/api/auth/microsoft/callback`
- `https://tildercode.onrender.com/api/auth/microsoft/callback`

### API permissions

Add:
- `Microsoft Graph`
- Delegated permission: `User.Read`

### Microsoft env mapping

```env
MICROSOFT_CLIENT_ID=<application client id>
MICROSOFT_CLIENT_SECRET=<client secret value>
MICROSOFT_TENANT_ID=common
```

## Render production values

Set these in Render:

```env
PUBLIC_BASE_URL=https://tildercode.onrender.com
```

And the matching provider client ids/secrets above.

## Tauri later

For Tauri later, do not reuse the browser callback values blindly.

Recommended:
- keep the web registration for the browser app
- create desktop-specific redirect handling later
- likely use either:
  - loopback callback on localhost
  - or a desktop custom URI scheme such as `tilder://auth/callback`

That desktop phase should get its own auth pass, but the current web flow will stay valid for:
- local browser dev
- `tildercode.onrender.com`
