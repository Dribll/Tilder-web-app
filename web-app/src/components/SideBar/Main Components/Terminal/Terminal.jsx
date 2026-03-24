import React, { useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { executeTerminalCommand, getDisplayPath } from '../../../../core/terminalBridge.js';
import { syncTerminalWorkspaceRoot } from '../../../../core/codeRunner.js';

function isPrintableInput(data) {
  return data >= ' ' && data !== '\u007f';
}

function getBridgeConnectionConfig() {
  const hostname = window.location.hostname;
  const port = window.location.port;
  const isLocalDevHost =
    (hostname === 'localhost' || hostname === '127.0.0.1') &&
    (port === '5173' || port === '4173');

  if (isLocalDevHost) {
    return {
      url: `${window.location.protocol}//${hostname}:3210`,
      mode: 'local-shell',
      banner: 'Connecting to local terminal bridge on port 3210...',
    };
  }

  return {
    url: undefined,
    mode: 'hosted-shell',
    banner: 'Connecting to hosted terminal service...',
  };
}

export default function Terminal({ isOpen, height, onResizeStart, onClose, workspace, openFile, terminalApiRef }) {
  const [modeLabel, setModeLabel] = useState('connecting');
  const [bannerMessage, setBannerMessage] = useState('Connecting to local terminal bridge...');
  const hostRef = useRef(null);
  const terminalRef = useRef(null);
  const fitAddonRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const socketRef = useRef(null);
  const cwdPathRef = useRef('root');
  const lineRef = useRef('');
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);
  const promptRef = useRef('workspace $ ');
  const busyRef = useRef(false);
  const bridgeReadyRef = useRef(false);
  const localFallbackReadyRef = useRef(false);
  const workspaceRef = useRef(workspace);
  const openFileRef = useRef(openFile);
  const root = workspace.getRootNode();
  const workspaceSnapshot = workspace.getStructureSnapshot?.() || null;
  const workspaceSnapshotKey = JSON.stringify(workspaceSnapshot);
  const workspaceSnapshotRef = useRef(workspaceSnapshot);
  const bridgeConfig = useMemo(() => getBridgeConnectionConfig(), []);

  const promptLabel = useMemo(() => `${getDisplayPath(workspace, cwdPathRef.current)} $ `, [root, workspace.rootName, isOpen]);

  useEffect(() => {
    promptRef.current = promptLabel;
  }, [promptLabel]);

  useEffect(() => {
    workspaceRef.current = workspace;
  }, [workspace]);

  useEffect(() => {
    openFileRef.current = openFile;
  }, [openFile]);

  useEffect(() => {
    workspaceSnapshotRef.current = workspaceSnapshot;
  }, [workspaceSnapshotKey]);

  useEffect(() => {
    if (!terminalApiRef) {
      return;
    }

    terminalApiRef.current = {
      focus: () => terminalRef.current?.focus(),
      clear: () => terminalRef.current?.clear(),
      writeLines: (lines = []) => {
        if (!terminalRef.current) {
          return;
        }

        lines.forEach((line) => {
          String(line)
            .split(/\r?\n/)
            .forEach((segment) => terminalRef.current.writeln(segment));
        });
      },
    };

    return () => {
      terminalApiRef.current = null;
    };
  }, [terminalApiRef]);

  useEffect(() => {
    if (!root) {
      cwdPathRef.current = 'root';
      promptRef.current = `${getDisplayPath(workspace, 'root')} $ `;
      return;
    }

    if (cwdPathRef.current !== 'root' && !workspace.findNode(cwdPathRef.current)) {
      cwdPathRef.current = 'root';
      promptRef.current = `${getDisplayPath(workspace, 'root')} $ `;
    }
  }, [root, workspace, workspace.rootName]);

  useEffect(() => {
    if (!isOpen || !hostRef.current || terminalRef.current) {
      return undefined;
    }

    const terminal = new XTerm({
      convertEol: true,
      cursorBlink: true,
      fontFamily: 'Ubuntu Mono, Consolas, monospace',
      fontSize: 13,
      lineHeight: 1.35,
      theme: {
        background: '#0b0e16',
        foreground: '#ecf1ff',
        cursor: '#a89eff',
        selectionBackground: 'rgba(138, 132, 224, 0.28)',
        black: '#0b0e16',
        blue: '#7aa2ff',
        brightBlack: '#55627b',
        brightBlue: '#9ec1ff',
        brightCyan: '#7de4ff',
        brightGreen: '#9ef0a8',
        brightMagenta: '#c7a3ff',
        brightRed: '#ffb4b4',
        brightWhite: '#ffffff',
        brightYellow: '#ffe08a',
        cyan: '#58d7c7',
        green: '#7fd36d',
        magenta: '#b48cff',
        red: '#ff8f8f',
        white: '#dfe7ff',
        yellow: '#ffd86b',
      },
    });
    const fitAddon = new FitAddon();

    terminal.loadAddon(fitAddon);
    terminal.open(hostRef.current);
    terminalRef.current = terminal;
    fitAddonRef.current = fitAddon;
    fitAddon.fit();

    function writePrompt() {
      terminal.write(promptRef.current);
    }

    function replaceCurrentLine(nextValue) {
      lineRef.current = nextValue;
      terminal.write('\x1b[2K\r');
      writePrompt();
      terminal.write(nextValue);
    }

    function writeLines(lines = []) {
      lines.forEach((line) => {
        String(line)
          .split(/\r?\n/)
          .forEach((segment) => terminal.writeln(segment));
      });
    }

    function activateLocalFallback(message) {
      if (localFallbackReadyRef.current) {
        return;
      }

      bridgeReadyRef.current = false;
      localFallbackReadyRef.current = true;
      setModeLabel('browser-workspace');
      setBannerMessage('Local bridge unavailable. Using workspace-safe terminal commands.');
      terminal.writeln(message);
      if (bridgeConfig.url) {
        terminal.writeln('Run "npm run terminal-bridge" in the project root to attach your local PowerShell/Bash session.');
      } else {
        terminal.writeln('Hosted shell bridge was unavailable, so the terminal fell back to workspace-safe mode.');
      }
      writePrompt();
    }

    async function runFallbackCommand() {
      const command = lineRef.current.trim();
      terminal.writeln('');

      if (!command) {
        lineRef.current = '';
        historyIndexRef.current = -1;
        writePrompt();
        return;
      }

      busyRef.current = true;
      historyRef.current = [command, ...historyRef.current.filter((entry) => entry !== command)].slice(0, 50);
      historyIndexRef.current = -1;
      lineRef.current = '';

      try {
        const result = await executeTerminalCommand(command, {
          workspace: workspaceRef.current,
          cwdPath: cwdPathRef.current,
        });

        if (result.clear) {
          terminal.clear();
        } else if (result.error) {
          terminal.writeln(`Error: ${result.error}`);
        } else {
          writeLines(result.lines);
        }

        if (result.cwdPath) {
          cwdPathRef.current = result.cwdPath;
          promptRef.current = `${getDisplayPath(workspaceRef.current, cwdPathRef.current)} $ `;
        }

        if (result.openPath) {
          const node = workspaceRef.current.findNode(result.openPath);
          if (node) {
            await openFileRef.current(node);
          }
        }
      } finally {
        busyRef.current = false;
        writePrompt();
      }
    }

    function connectLocalBridge() {
      const socket = io(bridgeConfig.url, {
        transports: ['websocket'],
        timeout: 1500,
        reconnection: false,
        query: {
          cols: String(terminal.cols || 120),
          rows: String(terminal.rows || 30),
        },
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        bridgeReadyRef.current = true;
        localFallbackReadyRef.current = false;
        setModeLabel('local-shell');
        setBannerMessage('Connected to your local terminal bridge. Commands run in your private PowerShell/Bash session.');
        terminal.clear();
        socket.emit('terminal:resize', {
          cols: terminal.cols,
          rows: terminal.rows,
        });

        const snapshot = workspaceSnapshotRef.current;
        if (snapshot) {
          syncTerminalWorkspaceRoot(snapshot)
            .then((result) => {
              if (result?.cwd) {
                socket.emit('terminal:set-cwd', result.cwd);
              }
            })
            .catch(() => {
              // Keep the default shell cwd if mirroring fails.
            });
        }
      });

      socket.on('terminal:output', (data) => {
        terminal.write(data);
      });

      socket.on('connect_error', () => {
        activateLocalFallback('Local terminal bridge was not reachable.');
      });

      socket.on('disconnect', () => {
        if (!terminalRef.current) {
          return;
        }

        activateLocalFallback('Local terminal bridge disconnected.');
      });
    }

    terminal.writeln('Starting Tilder terminal...');
    setModeLabel('connecting');
    setBannerMessage(bridgeConfig.banner);
    connectLocalBridge();

    const dataDisposable = terminal.onData(async (data) => {
      if (bridgeReadyRef.current) {
        socketRef.current?.emit('terminal:input', data);
        return;
      }

      if (!localFallbackReadyRef.current || busyRef.current) {
        return;
      }

      if (data === '\r') {
        await runFallbackCommand();
        return;
      }

      if (data === '\u0003') {
        terminal.writeln('^C');
        lineRef.current = '';
        historyIndexRef.current = -1;
        writePrompt();
        return;
      }

      if (data === '\u000c') {
        terminal.clear();
        lineRef.current = '';
        historyIndexRef.current = -1;
        writePrompt();
        return;
      }

      if (data === '\u007f') {
        if (!lineRef.current.length) {
          return;
        }

        lineRef.current = lineRef.current.slice(0, -1);
        terminal.write('\b \b');
        return;
      }

      if (data === '\x1b[A') {
        if (!historyRef.current.length) {
          return;
        }

        const nextIndex = Math.min(historyRef.current.length - 1, historyIndexRef.current + 1);
        historyIndexRef.current = nextIndex;
        replaceCurrentLine(historyRef.current[nextIndex]);
        return;
      }

      if (data === '\x1b[B') {
        if (!historyRef.current.length) {
          return;
        }

        const nextIndex = Math.max(-1, historyIndexRef.current - 1);
        historyIndexRef.current = nextIndex;
        replaceCurrentLine(nextIndex === -1 ? '' : historyRef.current[nextIndex]);
        return;
      }

      if (isPrintableInput(data)) {
        lineRef.current += data;
        terminal.write(data);
      }
    });

    resizeObserverRef.current = new ResizeObserver(() => {
      fitAddon.fit();
      if (bridgeReadyRef.current) {
        socketRef.current?.emit('terminal:resize', {
          cols: terminal.cols,
          rows: terminal.rows,
        });
      }
    });
    resizeObserverRef.current.observe(hostRef.current);

    setTimeout(() => {
      fitAddon.fit();
      terminal.focus();
    }, 0);

    return () => {
      dataDisposable.dispose();
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      socketRef.current?.disconnect();
      socketRef.current = null;
      fitAddonRef.current = null;
      terminalRef.current = null;
      bridgeReadyRef.current = false;
      localFallbackReadyRef.current = false;
      terminal.dispose();
    };
  }, [bridgeConfig.banner, bridgeConfig.url, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = setTimeout(() => {
      fitAddonRef.current?.fit();
      if (bridgeReadyRef.current) {
        socketRef.current?.emit('terminal:resize', {
          cols: terminalRef.current?.cols,
          rows: terminalRef.current?.rows,
        });
      }
      terminalRef.current?.focus();
    }, 0);

    return () => clearTimeout(timer);
  }, [height, isOpen]);

  useEffect(() => {
    if (!isOpen || !bridgeReadyRef.current || !workspaceSnapshot) {
      return;
    }

    let cancelled = false;

    syncTerminalWorkspaceRoot(workspaceSnapshot)
      .then((result) => {
        if (cancelled || !result?.cwd) {
          return;
        }

        socketRef.current?.emit('terminal:set-cwd', result.cwd);
      })
      .catch(() => {
        // Ignore sync failures and keep the current shell cwd.
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, workspaceSnapshotKey]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="terminal-drawer" style={{ height: `${height}px` }}>
      <div className="terminal-resizer" onMouseDown={onResizeStart} />
      <div className="terminal-shell">
        <div className="terminal-header">
          <div className="terminal-tab">
            <span className="terminal-tab-label">TERMINAL</span>
            <span className="terminal-tab-badge">{modeLabel}</span>
          </div>
          <div className="terminal-toolbar">
            <button
              type="button"
              className="terminal-toolbar-btn"
              onClick={() => {
                if (bridgeReadyRef.current) {
                  terminalRef.current?.clear();
                  socketRef.current?.emit('terminal:input', 'clear\r');
                  return;
                }

                terminalRef.current?.clear();
                lineRef.current = '';
                historyIndexRef.current = -1;
                terminalRef.current?.write(promptRef.current);
              }}
              title="Clear Terminal"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
            <button type="button" className="terminal-toolbar-btn" onClick={onClose} title="Hide Terminal">
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        </div>

        <div className="terminal-banner">{bannerMessage}</div>

        <div className="terminal-body" onClick={() => terminalRef.current?.focus()}>
          <div className="terminal-xterm" ref={hostRef} />
        </div>
      </div>
    </div>
  );
}
