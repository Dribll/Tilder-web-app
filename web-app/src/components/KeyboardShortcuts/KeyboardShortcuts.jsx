import React, { useEffect, useMemo, useRef, useState } from 'react';
import shortcutManager, { eventToChord, formatBindingLabel } from '../ShortcutManager.js';

export default function KeyboardShortcuts({
  modalType,
  commands,
  bindings,
  onOpenSettings,
  onResetBinding,
  onResetAll,
  onUpdateBinding,
}) {
  const [query, setQuery] = useState('');
  const [recordingCommandId, setRecordingCommandId] = useState(null);
  const [recordingPreview, setRecordingPreview] = useState('');
  const recordingTimerRef = useRef(null);
  const recordingBufferRef = useRef('');

  function stopRecording() {
    clearTimeout(recordingTimerRef.current);
    recordingTimerRef.current = null;
    recordingBufferRef.current = '';
    setRecordingCommandId(null);
    setRecordingPreview('');
    shortcutManager.resume();
  }

  function beginRecording(commandId) {
    clearTimeout(recordingTimerRef.current);
    recordingTimerRef.current = null;
    recordingBufferRef.current = '';
    setRecordingCommandId(commandId);
    setRecordingPreview('');
  }

  const bindingOwners = useMemo(() => {
    const owners = new Map();

    commands.forEach((command) => {
      const binding = bindings[command.id];
      if (!binding) {
        return;
      }

      if (!owners.has(binding)) {
        owners.set(binding, []);
      }

      owners.get(binding).push(command.id);
    });

    return owners;
  }, [bindings, commands]);

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return commands;
    }

    return commands.filter((command) => {
      const haystack = [
        command.label,
        command.category,
        command.id,
        command.keywords || '',
        bindings[command.id],
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [bindings, commands, query]);

  useEffect(() => {
    if (modalType !== 'Keyboard Shortcuts' || !recordingCommandId) {
      if (recordingCommandId) {
        stopRecording();
      }
      return undefined;
    }

    shortcutManager.suspend();

    function commitBinding(nextBinding) {
      onUpdateBinding(recordingCommandId, nextBinding);
      stopRecording();
    }

    function handleCapture(event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();

      if (event.key === 'Escape') {
        stopRecording();
        return;
      }

      if (
        event.key === 'Backspace' &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !event.metaKey
      ) {
        commitBinding('');
        return;
      }

      const chord = eventToChord(event);
      if (!chord) {
        return;
      }

      if (!recordingBufferRef.current) {
        recordingBufferRef.current = chord;
        setRecordingPreview(`${formatBindingLabel(chord)} ...`);
        recordingTimerRef.current = setTimeout(() => {
          commitBinding(recordingBufferRef.current);
        }, 900);
        return;
      }

      const nextBinding = `${recordingBufferRef.current} ${chord}`;
      commitBinding(nextBinding);
    }

    window.addEventListener('keydown', handleCapture, true);

    return () => {
      window.removeEventListener('keydown', handleCapture, true);
      shortcutManager.resume();
    };
  }, [modalType, onUpdateBinding, recordingCommandId]);

  if (modalType !== 'Keyboard Shortcuts') {
    return null;
  }

  return (
    <div className="keyboard-shortcuts-panel">
      <div className="keyboard-shortcuts-header">
        <div>
          <div className="keyboard-shortcuts-title">Keyboard Shortcuts</div>
          <div className="keyboard-shortcuts-subtitle">
            VS Code style command bindings with search, reset, and custom recording.
          </div>
        </div>
        <div className="keyboard-shortcuts-toolbar">
          <button
            type="button"
            className="keyboard-shortcuts-btn"
            onClick={() => {
              stopRecording();
              onOpenSettings();
            }}
          >
            Open Settings
          </button>
          <button
            type="button"
            className="keyboard-shortcuts-btn subtle"
            onClick={() => {
              stopRecording();
              onResetAll();
            }}
          >
            Reset All
          </button>
        </div>
      </div>

      <div className="keyboard-shortcuts-search-row">
        <input
          type="text"
          className="keyboard-shortcuts-search"
          value={query}
          spellCheck={false}
          placeholder="Search commands or keybindings"
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="keyboard-shortcuts-stats">
          {filteredCommands.length} / {commands.length} commands
        </div>
      </div>

      {recordingCommandId ? (
        <div className="keyboard-shortcuts-recording">
          Recording shortcut. Press one key combo or a two-step chord. Press `Backspace` to clear or `Esc` to cancel.
          {recordingPreview ? <span className="keyboard-shortcuts-recording-preview">{recordingPreview}</span> : null}
        </div>
      ) : null}

      <div className="keyboard-shortcuts-list">
        {filteredCommands.map((command) => {
          const binding = bindings[command.id];
          const isCustom = binding !== command.defaultBinding;
          const conflict = binding && bindingOwners.get(binding)?.length > 1;

          return (
            <div key={command.id} className={`keyboard-shortcut-row ${conflict ? 'conflict' : ''}`}>
              <div className="keyboard-shortcut-main">
                <div className="keyboard-shortcut-category">{command.category}</div>
                <div className="keyboard-shortcut-label">{command.label}</div>
                <div className="keyboard-shortcut-id">{command.id}</div>
              </div>

              <div className="keyboard-shortcut-binding-group">
                <button
                  type="button"
                  className={`keyboard-shortcut-binding ${recordingCommandId === command.id ? 'recording' : ''}`}
                  onClick={() => beginRecording(command.id)}
                >
                  {recordingCommandId === command.id ? recordingPreview || 'Press shortcut' : formatBindingLabel(binding)}
                </button>
                <div className="keyboard-shortcut-meta">
                  <span className={`keyboard-shortcut-badge ${isCustom ? 'custom' : ''}`}>{isCustom ? 'Custom' : 'Default'}</span>
                  {conflict ? <span className="keyboard-shortcut-badge conflict">Conflict</span> : null}
                  <span className="keyboard-shortcut-default">Default: {formatBindingLabel(command.defaultBinding)}</span>
                </div>
              </div>

              <div className="keyboard-shortcut-actions">
                <button
                  type="button"
                  className="keyboard-shortcuts-btn subtle"
                  onClick={() => beginRecording(command.id)}
                >
                  Change
                </button>
                <button
                  type="button"
                  className="keyboard-shortcuts-btn subtle"
                  onClick={() => {
                    stopRecording();
                    onResetBinding(command.id);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
