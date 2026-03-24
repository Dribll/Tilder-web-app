import React, { useEffect, useMemo, useRef, useState } from 'react';

const LANGUAGE_OPTIONS = [
  { id: 'plaintext', label: 'Plain Text' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'json', label: 'JSON' },
  { id: 'markdown', label: 'Markdown' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'php', label: 'PHP' },
  { id: 'ruby', label: 'Ruby' },
  { id: 'rust', label: 'Rust' },
  { id: 'sql', label: 'SQL' },
  { id: 'shell', label: 'Shell Script' },
  { id: 'xml', label: 'XML' },
  { id: 'yaml', label: 'YAML' },
  { id: 'go', label: 'Go' },
  { id: 'cpp', label: 'C/C++' },
  { id: 'csharp', label: 'C#' },
];

const INDENT_OPTIONS = [
  { id: 'spaces-2', label: 'Spaces: 2', insertSpaces: true, tabSize: 2 },
  { id: 'spaces-4', label: 'Spaces: 4', insertSpaces: true, tabSize: 4 },
  { id: 'spaces-8', label: 'Spaces: 8', insertSpaces: true, tabSize: 8 },
  { id: 'tabs-2', label: 'Tab Size: 2', insertSpaces: false, tabSize: 2 },
  { id: 'tabs-4', label: 'Tab Size: 4', insertSpaces: false, tabSize: 4 },
  { id: 'tabs-8', label: 'Tab Size: 8', insertSpaces: false, tabSize: 8 },
];

const EOL_OPTIONS = [
  { id: 'LF', label: 'LF' },
  { id: 'CRLF', label: 'CRLF' },
];

function Menu({ title, children, anchorRef, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutside(event) {
      if (anchorRef.current?.contains(event.target) || menuRef.current?.contains(event.target)) {
        return;
      }
      onClose();
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [anchorRef, onClose]);

  return (
    <div className="statusbar-menu" ref={menuRef}>
      <div className="statusbar-menu-title">{title}</div>
      <div className="statusbar-menu-items">{children}</div>
    </div>
  );
}

export default function StatusBar({
  activeTab,
  rootName,
  status,
  notifications,
  onGoToLine,
  onSetLanguage,
  onSetIndentation,
  onSetEol,
  onMarkNotificationsRead,
  onClearNotifications,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const notificationButtonRef = useRef(null);
  const lineButtonRef = useRef(null);
  const indentButtonRef = useRef(null);
  const eolButtonRef = useRef(null);
  const languageButtonRef = useRef(null);

  const languageLabel = useMemo(() => {
    return LANGUAGE_OPTIONS.find((option) => option.id === (activeTab?.language || 'plaintext'))?.label || 'Plain Text';
  }, [activeTab?.language]);

  const indentLabel = status.insertSpaces ? `Spaces: ${status.tabSize}` : `Tab Size: ${status.tabSize}`;
  const selectionLabel = status.selectionLength
    ? `${status.selectionLength} selected${status.selectedLines > 1 ? `, ${status.selectedLines} lines` : ''}`
    : null;
  const rootLabel = rootName || 'No Folder';
  const unreadCount = notifications.filter((entry) => !entry.read).length;

  function renderMenu() {
    if (openMenu === 'notifications') {
      return (
        <Menu title="Notifications" anchorRef={notificationButtonRef} onClose={() => setOpenMenu(null)}>
          <div className="statusbar-menu-actions">
            <button type="button" className="statusbar-menu-action" onClick={onClearNotifications}>
              Clear All
            </button>
          </div>
          {notifications.length ? (
            notifications.map((entry) => (
              <div key={entry.id} className={`statusbar-notification-item ${entry.read ? '' : 'unread'}`}>
                <div className="statusbar-notification-text">{entry.message}</div>
                <div className="statusbar-notification-time">{entry.time}</div>
              </div>
            ))
          ) : (
            <div className="statusbar-notification-empty">No notifications</div>
          )}
        </Menu>
      );
    }

    if (openMenu === 'indent') {
      return (
        <Menu title="Indentation" anchorRef={indentButtonRef} onClose={() => setOpenMenu(null)}>
          {INDENT_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`statusbar-menu-item ${option.insertSpaces === status.insertSpaces && option.tabSize === status.tabSize ? 'active' : ''}`}
              onClick={() => {
                onSetIndentation(option);
                setOpenMenu(null);
              }}
            >
              {option.label}
            </button>
          ))}
        </Menu>
      );
    }

    if (openMenu === 'eol') {
      return (
        <Menu title="End Of Line" anchorRef={eolButtonRef} onClose={() => setOpenMenu(null)}>
          {EOL_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`statusbar-menu-item ${option.id === status.eol ? 'active' : ''}`}
              onClick={() => {
                onSetEol(option.id);
                setOpenMenu(null);
              }}
            >
              {option.label}
            </button>
          ))}
        </Menu>
      );
    }

    if (openMenu === 'language') {
      return (
        <Menu title="Language Mode" anchorRef={languageButtonRef} onClose={() => setOpenMenu(null)}>
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`statusbar-menu-item ${option.id === (activeTab?.language || 'plaintext') ? 'active' : ''}`}
              onClick={() => {
                onSetLanguage(option.id);
                setOpenMenu(null);
              }}
            >
              {option.label}
            </button>
          ))}
        </Menu>
      );
    }

    return null;
  }

  return (
    <div className="areastatusBarWrapper">
      <div className="statusBarWrapper">
        <div className="statusbar-main">
          <div className="statusbar-left">
            <span className="statusbar-badge">Web</span>
            <span className="statusbar-item subtle">{rootLabel}</span>
            {activeTab ? <span className="statusbar-item subtle">{activeTab.dirty ? 'Unsaved Changes' : 'Ready'}</span> : null}
            <button
              type="button"
              className="statusbar-item statusbar-notification-button"
              ref={notificationButtonRef}
              onClick={() =>
                setOpenMenu((current) => {
                  const next = current === 'notifications' ? null : 'notifications';
                  if (next === 'notifications') {
                    onMarkNotificationsRead();
                  }
                  return next;
                })
              }
            >
              Notifications {unreadCount ? `(${unreadCount})` : ''}
            </button>
          </div>
          <div className="statusbar-right">
            {selectionLabel ? <span className="statusbar-item subtle">{selectionLabel}</span> : null}
            {activeTab ? (
              <>
                <span className="statusbar-item">Lines: {status.lines}</span>
                <button type="button" className="statusbar-item" ref={lineButtonRef} onClick={onGoToLine}>
                  Ln {status.line}, Col {status.column}
                </button>
                <button
                  type="button"
                  className="statusbar-item"
                  ref={indentButtonRef}
                  onClick={() => setOpenMenu((current) => (current === 'indent' ? null : 'indent'))}
                >
                  {indentLabel}
                </button>
                <span className="statusbar-item">UTF-8</span>
                <button
                  type="button"
                  className="statusbar-item"
                  ref={eolButtonRef}
                  onClick={() => setOpenMenu((current) => (current === 'eol' ? null : 'eol'))}
                >
                  {status.eol}
                </button>
                <button
                  type="button"
                  className="statusbar-item"
                  ref={languageButtonRef}
                  onClick={() => setOpenMenu((current) => (current === 'language' ? null : 'language'))}
                >
                  {languageLabel}
                </button>
              </>
            ) : (
              <span className="statusbar-item subtle">No Active Editor</span>
            )}
          </div>
        </div>
        {renderMenu()}
      </div>
    </div>
  );
}
