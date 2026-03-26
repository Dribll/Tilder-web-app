# Tilder OAuth Setup

This file is for the Tilder server owner. End users should only see `Connect GitHub` or `Connect Microsoft`.

## 1. Local Development

1. Copy `.env.example` to `.env`.
2. Keep:

```env
PORT=3210
PUBLIC_BASE_URL=http://localhost:3210
```

3. Start the backend server:

```bash
npm start
```

4. Start the Vite frontend:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`, but OAuth callback handling is done by the Node server on `http://localhost:3210`.

## 2. Render Production

Use these environment values in Render:

```env
PORT=10000
PUBLIC_BASE_URL=https://tilder-web-app.onrender.com
```

Add the provider credentials in Render environment variables too.

## 3. GitHub OAuth App

Recommended:
- one GitHub OAuth app for local development
- one GitHub OAuth app for production

Suggested callback URLs:

- Local dev: `http://localhost:3210/api/auth/github/callback`
- Render: `https://tilder-web-app.onrender.com/api/auth/github/callback`

Because GitHub OAuth apps allow a single callback URL, using separate apps keeps local and production clean.

## 4. Microsoft App Registration

Suggested redirect URIs:

- `http://localhost:3210/api/auth/microsoft/callback`
- `https://tilder-web-app.onrender.com/api/auth/microsoft/callback`

Microsoft supports multiple redirect URIs in the same app registration, so local and production can usually share one app.

## 5. Tauri Later

For the future desktop version, do not reuse the browser callback assumptions blindly.

Recommended direction:
- keep a dedicated desktop auth flow
- prefer a loopback callback or a desktop-specific redirect
- likely keep separate desktop OAuth app settings, especially for GitHub

Current web setup is correct for:
- localhost dev
- hosted Render deployment

Desktop should be treated as a separate auth target when we reach the Tauri phase.
