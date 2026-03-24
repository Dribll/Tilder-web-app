import express from 'express';
import http from 'node:http';
import os from 'node:os';
import { Server } from 'socket.io';
import * as pty from 'node-pty';
import { runLocalFile, runWorkspaceFile, syncWorkspaceMirror } from './localRunner.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.TILDER_TERMINAL_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
});

const port = Number(process.env.TILDER_TERMINAL_PORT || 3210);
const shell = os.platform() === 'win32' ? 'powershell.exe' : process.env.SHELL || 'bash';
const shellArgs = os.platform() === 'win32' ? ['-NoLogo'] : [];
const shellCwd = process.env.TILDER_TERMINAL_CWD || process.cwd();
const runnerBaseUrl = process.env.TILDER_RUNNER_URL || 'https://ce.judge0.com';

app.use(express.json({ limit: '1mb' }));

app.get('/health', (_request, response) => {
  response.json({
    ok: true,
    shell,
    cwd: shellCwd,
  });
});

app.get('/api/runner/languages', async (_request, response) => {
  try {
    const upstream = await fetch(`${runnerBaseUrl}/languages`);
    const data = await upstream.json();
    response.status(upstream.status).json(data);
  } catch {
    response.status(500).json({ message: 'Failed to load runner languages.' });
  }
});

app.post('/api/runner/run', async (request, response) => {
  try {
    const upstream = await fetch(`${runnerBaseUrl}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body),
    });
    const data = await upstream.json();
    response.status(upstream.status).json(data);
  } catch {
    response.status(500).json({ message: 'Failed to run code.' });
  }
});

app.post('/api/terminal/run-file', async (request, response) => {
  try {
    const payload = request.body || {};
    const result = payload.relativePath
      ? await runWorkspaceFile(payload)
      : await runLocalFile(payload);
    response.json(result);
  } catch (error) {
    response.status(500).json({
      supported: true,
      ok: false,
      stderr: error instanceof Error ? error.message : 'Failed to execute local runner.',
    });
  }
});

app.post('/api/terminal/workspace-root', async (request, response) => {
  try {
    const result = await syncWorkspaceMirror(request.body || {});
    response.json(result);
  } catch (error) {
    response.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to sync workspace root.',
    });
  }
});

io.on('connection', (socket) => {
  const cols = Number(socket.handshake.query.cols || 120);
  const rows = Number(socket.handshake.query.rows || 30);

  const ptyProcess = pty.spawn(shell, shellArgs, {
    name: 'xterm-256color',
    cols,
    rows,
    cwd: shellCwd,
    env: process.env,
  });

  ptyProcess.onData((data) => {
    socket.emit('terminal:output', data);
  });

  socket.on('terminal:input', (data) => {
    ptyProcess.write(data);
  });

  socket.on('terminal:resize', ({ cols: nextCols, rows: nextRows }) => {
    if (!nextCols || !nextRows) {
      return;
    }

    ptyProcess.resize(Number(nextCols), Number(nextRows));
  });

  socket.on('terminal:set-cwd', (nextPath) => {
    if (!nextPath) {
      return;
    }

    if (shell.toLowerCase().includes('powershell')) {
      const escapedPath = String(nextPath).replace(/'/g, "''");
      ptyProcess.write(`Set-Location -LiteralPath '${escapedPath}'\r`);
      return;
    }

    const escapedPath = String(nextPath).replace(/"/g, '\\"');
    ptyProcess.write(`cd "${escapedPath}"\r`);
  });

  socket.on('disconnect', () => {
    ptyProcess.kill();
  });
});

server.listen(port, () => {
  console.log(`Tilder terminal bridge running on http://localhost:${port}`);
});
