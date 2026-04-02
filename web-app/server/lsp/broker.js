export function createLspBroker({
  normalizeWorkspaceRoot,
  resolveInstalledCommand,
  emitStatus,
  namespace,
  maxRestartAttempts = 3,
  idleShutdownMs = 60_000,
  spawnProcess,
  parseMessages,
  encodeMessage,
}) {
  const sessions = new Map();

  function getSessionKey(languageId, workspaceRoot) {
    return `${languageId}::${workspaceRoot}`;
  }

  function scheduleShutdown(session) {
    clearTimeout(session.idleTimer);

    if (session.clients.size) {
      return;
    }

    session.idleTimer = setTimeout(() => {
      session.closing = true;
      session.process?.kill();
      sessions.delete(session.key);
    }, idleShutdownMs);
  }

  function startSessionProcess(session) {
    if (!session.command) {
      throw new Error(`${session.adapter.serverLabel} is not installed.`);
    }

    clearTimeout(session.restartTimer);
    session.closing = false;
    session.stdoutBuffer = Buffer.alloc(0);
    session.process = spawnProcess(session.command, session.adapter.launchArgs || [], session.workspaceRoot);

    session.process.stdout.on('data', (chunk) => {
      session.stdoutBuffer = parseMessages(
        Buffer.concat([session.stdoutBuffer, chunk]),
        (message) => namespace.to(session.room).emit('lsp:message', message)
      );
    });

    session.process.stderr.on('data', (chunk) => {
      namespace.to(session.room).emit('lsp:stderr', chunk.toString());
    });

    session.process.on('error', (error) => {
      emitStatus(session, {
        status: 'error',
        languageId: session.languageId,
        message: error instanceof Error ? error.message : 'Failed to start language server.',
      });
    });

    session.process.on('close', () => {
      session.process = null;

      if (session.closing || !session.clients.size) {
        sessions.delete(session.key);
        return;
      }

      if (session.restartCount >= maxRestartAttempts) {
        emitStatus(session, {
          status: 'error',
          languageId: session.languageId,
          message: `${session.adapter.serverLabel} stopped too many times.`,
        });
        return;
      }

      const delayMs = Math.min(5000, 750 * 2 ** session.restartCount);
      session.restartCount += 1;
      emitStatus(session, {
        status: 'restarting',
        languageId: session.languageId,
        delayMs,
        message: `${session.adapter.serverLabel} is restarting...`,
      });
      session.restartTimer = setTimeout(() => {
        startSessionProcess(session);
      }, delayMs);
    });

    emitStatus(session, {
      status: 'connected',
      languageId: session.languageId,
      command: session.command,
      serverLabel: session.adapter.serverLabel,
      workspaceRoot: session.workspaceRoot,
    });
  }

  async function ensureSession(languageId, workspaceRoot, adapter) {
    const normalizedWorkspaceRoot = normalizeWorkspaceRoot(workspaceRoot);
    const key = getSessionKey(languageId, normalizedWorkspaceRoot);
    const existing = sessions.get(key);
    if (existing) {
      return existing;
    }

    const command = await resolveInstalledCommand(adapter.commands || []);
    if (!command) {
      throw new Error(`${adapter.serverLabel} is not installed on this machine.`);
    }

    const session = {
      key,
      room: key,
      languageId,
      workspaceRoot: normalizedWorkspaceRoot,
      adapter,
      command,
      process: null,
      clients: new Set(),
      stdoutBuffer: Buffer.alloc(0),
      restartCount: 0,
      restartTimer: null,
      idleTimer: null,
      closing: false,
    };

    sessions.set(key, session);
    startSessionProcess(session);
    return session;
  }

  function attachSocket(socket, session) {
    clearTimeout(session.idleTimer);
    session.clients.add(socket.id);
    socket.join(session.room);
    socket.emit('lsp:status', {
      status: 'connected',
      languageId: session.languageId,
      serverLabel: session.adapter.serverLabel,
      command: session.command,
      workspaceRoot: session.workspaceRoot,
    });

    socket.on('lsp:message', (message) => {
      if (!session.process?.stdin?.writable) {
        return;
      }

      session.process.stdin.write(encodeMessage(message));
    });

    socket.on('disconnect', () => {
      session.clients.delete(socket.id);
      scheduleShutdown(session);
    });
  }

  return {
    sessions,
    ensureSession,
    attachSocket,
  };
}
