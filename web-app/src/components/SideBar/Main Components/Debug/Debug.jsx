import React, { useMemo, useState } from 'react';

function Section({ title, children, actions = null }) {
  return (
    <section className="debug-section">
      <div className="debug-section-header">
        <div className="debug-section-title">{title}</div>
        {actions}
      </div>
      <div className="debug-section-body">{children}</div>
    </section>
  );
}

export default function Debug({
  ariaExpandedisplaydebug,
  activeTab,
  debugSession,
  breakpoints,
  watchValues,
  diagnostics,
  onStartDebugging,
  onRunWithoutDebugging,
  onPauseDebugging,
  onContinueDebugging,
  onStopDebugging,
  onRestartDebugging,
  onRunCurrentFile,
  onAddBreakpointAtCursor,
  onClearBreakpoints,
  onRemoveBreakpoint,
  onAddWatch,
  onRemoveWatch,
}) {
  const [watchInput, setWatchInput] = useState('');

  const statusTone = useMemo(() => {
    if (debugSession.status === 'running') return 'running';
    if (debugSession.status === 'paused') return 'paused';
    return 'idle';
  }, [debugSession.status]);

  return (
    <div id="debugarea" className={`sidebarscontent d-${ariaExpandedisplaydebug}`}>
      <div className="debug-shell">
        <div className="debug-header">
          <p className="explorer-eyebrow">Run &amp; Debug</p>
          <h6 className="explorer-title">Debug Center</h6>
        </div>

        <Section
          title="Session"
          actions={<span className={`debug-status-badge ${statusTone}`}>{debugSession.status}</span>}
        >
          <div className="debug-session-card">
            <div className="debug-session-name">{activeTab?.name || 'No active file'}</div>
            <div className="debug-session-meta">
              {activeTab ? `${activeTab.language || 'plaintext'} • ${debugSession.mode}` : 'Open a file to run or debug'}
            </div>
            <div className="debug-session-note">{debugSession.message || 'Ready'}</div>
          </div>
          <div className="debug-toolbar-grid">
            <button type="button" className="debug-action-btn primary" onClick={onStartDebugging} disabled={!activeTab}>
              Start Debugging
            </button>
            <button type="button" className="debug-action-btn" onClick={onRunWithoutDebugging} disabled={!activeTab}>
              Run Without Debugging
            </button>
            <button type="button" className="debug-action-btn" onClick={onPauseDebugging} disabled={debugSession.status !== 'running'}>
              Pause
            </button>
            <button type="button" className="debug-action-btn" onClick={onContinueDebugging} disabled={debugSession.status !== 'paused'}>
              Continue
            </button>
            <button type="button" className="debug-action-btn" onClick={onRestartDebugging} disabled={!activeTab}>
              Restart
            </button>
            <button type="button" className="debug-action-btn danger" onClick={onStopDebugging} disabled={debugSession.status === 'idle'}>
              Stop
            </button>
          </div>
          <div className="debug-toolbar-grid compact">
            <button type="button" className="debug-action-btn" onClick={onRunCurrentFile} disabled={!activeTab}>
              Run Current File
            </button>
            <button type="button" className="debug-action-btn" onClick={onAddBreakpointAtCursor} disabled={!activeTab}>
              Add Breakpoint At Cursor
            </button>
          </div>
        </Section>

        <Section
          title="Breakpoints"
          actions={
            <button type="button" className="debug-link-btn" onClick={onClearBreakpoints} disabled={!breakpoints.length}>
              Clear All
            </button>
          }
        >
          {breakpoints.length ? (
            <div className="debug-list">
              {breakpoints.map((breakpoint) => (
                <div key={`${breakpoint.path}-${breakpoint.line}`} className="debug-list-item">
                  <div className="debug-list-main">
                    <div className="debug-list-title">{breakpoint.name}</div>
                    <div className="debug-list-meta">
                      {breakpoint.path} : line {breakpoint.line}
                    </div>
                  </div>
                  <button type="button" className="debug-icon-btn" onClick={() => onRemoveBreakpoint(breakpoint)}>
                    x
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="debug-empty-state">Click the gutter or use “Add Breakpoint At Cursor” to start tracking lines.</div>
          )}
        </Section>

        <Section title="Watch">
          <div className="debug-watch-row">
            <input
              type="text"
              className="debug-watch-input"
              value={watchInput}
              onChange={(event) => setWatchInput(event.target.value)}
              placeholder="Add watch expression, for example line or fileName"
              spellCheck={false}
            />
            <button
              type="button"
              className="debug-action-btn"
              onClick={() => {
                const value = watchInput.trim();
                if (!value) {
                  return;
                }
                onAddWatch(value);
                setWatchInput('');
              }}
            >
              Add
            </button>
          </div>
          {watchValues.length ? (
            <div className="debug-list">
              {watchValues.map((watch) => (
                <div key={watch.expression} className="debug-list-item">
                  <div className="debug-list-main">
                    <div className="debug-list-title">{watch.expression}</div>
                    <div className="debug-list-meta">{watch.value}</div>
                  </div>
                  <button type="button" className="debug-icon-btn" onClick={() => onRemoveWatch(watch.expression)}>
                    x
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="debug-empty-state">Watch values update against the current editor context.</div>
          )}
        </Section>

        <Section title="Diagnostics">
          {diagnostics.length ? (
            <div className="debug-list">
              {diagnostics.map((diagnostic, index) => (
                <div key={`${diagnostic.message}-${index}`} className={`debug-list-item ${diagnostic.severity}`}>
                  <div className="debug-list-main">
                    <div className="debug-list-title">{diagnostic.message}</div>
                    <div className="debug-list-meta">
                      line {diagnostic.startLineNumber}, col {diagnostic.startColumn} • {diagnostic.owner || 'editor'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="debug-empty-state">No editor diagnostics in the active model.</div>
          )}
        </Section>
      </div>
    </div>
  );
}
