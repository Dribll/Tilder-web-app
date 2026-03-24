const MODIFIER_ORDER = ['ctrl', 'shift', 'alt', 'meta'];
const MODIFIER_KEYS = new Set(['ctrl', 'control', 'shift', 'alt', 'meta']);
const KEY_ALIASES = {
  ' ': 'space',
  arrowdown: 'down',
  arrowleft: 'left',
  arrowright: 'right',
  arrowup: 'up',
  esc: 'escape',
};
const CODE_ALIASES = {
  Backquote: '`',
  Backslash: '\\',
  BracketLeft: '[',
  BracketRight: ']',
  Comma: ',',
  Equal: '=',
  Minus: '-',
  Period: '.',
  Quote: "'",
  Semicolon: ';',
  Slash: '/',
  Space: 'space',
  Tab: 'tab',
  Enter: 'enter',
};

function normalizePrimaryKey(key = '', code = '') {
  if (CODE_ALIASES[code]) {
    return CODE_ALIASES[code];
  }

  const lowered = key.toLowerCase();
  return KEY_ALIASES[lowered] || lowered;
}

function normalizeChordTokens(tokens) {
  const normalized = tokens.map((token) => normalizePrimaryKey(token.trim())).filter(Boolean);
  const modifiers = MODIFIER_ORDER.filter((modifier) => normalized.includes(modifier));
  const primary = normalized.find((token) => !MODIFIER_KEYS.has(token));

  if (!primary) {
    return '';
  }

  return [...modifiers, primary].join('+');
}

export function normalizeBindingString(binding = '') {
  return binding
    .trim()
    .split(/\s+/)
    .map((chord) => normalizeChordTokens(chord.split('+')))
    .filter(Boolean)
    .join(' ');
}

export function eventToChord(event) {
  const primary = normalizePrimaryKey(event.key, event.code);
  if (!primary || MODIFIER_KEYS.has(primary)) {
    return '';
  }

  const tokens = [
    event.ctrlKey ? 'ctrl' : '',
    event.shiftKey ? 'shift' : '',
    event.altKey ? 'alt' : '',
    event.metaKey ? 'meta' : '',
    primary,
  ].filter(Boolean);

  return normalizeChordTokens(tokens);
}

export function formatBindingLabel(binding = '') {
  if (!binding) {
    return 'Unassigned';
  }

  return binding
    .split(' ')
    .map((chord) =>
      chord
        .split('+')
        .map((part) => {
          if (part === 'ctrl') return 'Ctrl';
          if (part === 'shift') return 'Shift';
          if (part === 'alt') return 'Alt';
          if (part === 'meta') return 'Meta';
          if (part === 'space') return 'Space';
          if (part === 'enter') return 'Enter';
          if (part === 'tab') return 'Tab';
          if (part === 'escape') return 'Esc';
          if (part.length === 1) return part.toUpperCase();
          return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join(' + ')
    )
    .join('  ');
}

class ShortcutManager {
  constructor() {
    this.shortcuts = new Map();
    this.pendingChord = '';
    this.pendingTimer = null;
    this.isSuspended = false;

    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  setBindings(shortcuts) {
    this.shortcuts.clear();

    shortcuts.forEach((shortcut) => {
      const binding = normalizeBindingString(shortcut.binding);
      if (!binding || typeof shortcut.action !== 'function') {
        return;
      }

      this.shortcuts.set(binding, shortcut);
    });

    this.clearPendingChord();
  }

  suspend() {
    this.isSuspended = true;
  }

  resume() {
    this.isSuspended = false;
    this.clearPendingChord();
  }

  clearPendingChord() {
    this.pendingChord = '';
    clearTimeout(this.pendingTimer);
    this.pendingTimer = null;
  }

  hasChordPrefix(prefix) {
    for (const binding of this.shortcuts.keys()) {
      if (binding.startsWith(`${prefix} `)) {
        return true;
      }
    }

    return false;
  }

  executeBinding(binding, event) {
    const shortcut = this.shortcuts.get(binding);
    if (!shortcut) {
      return false;
    }

    event.preventDefault();
    this.clearPendingChord();
    shortcut.action();
    return true;
  }

  handleKeyDown(event) {
    if (this.isSuspended) {
      return;
    }

    const chord = eventToChord(event);
    if (!chord) {
      return;
    }

    if (this.pendingChord) {
      const pendingSequence = `${this.pendingChord} ${chord}`;
      if (this.executeBinding(pendingSequence, event)) {
        return;
      }

      if (this.hasChordPrefix(pendingSequence)) {
        event.preventDefault();
        this.pendingChord = pendingSequence;
        return;
      }

      this.clearPendingChord();
    }

    if (this.hasChordPrefix(chord)) {
      event.preventDefault();
      this.pendingChord = chord;
      this.pendingTimer = setTimeout(() => {
        this.clearPendingChord();
      }, 1200);
      return;
    }

    this.executeBinding(chord, event);
  }
}

const shortcutManager = new ShortcutManager();

export default shortcutManager;
