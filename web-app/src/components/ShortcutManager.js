class ShortcutManager {
  constructor() {
    this.shortcuts = new Map();
    this.states = new Map();

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  normalizeKey(e) {
    let keys = [];

    if (e.ctrlKey) keys.push("ctrl");
    if (e.shiftKey) keys.push("shift");
    if (e.altKey) keys.push("alt");
    if (e.metaKey) keys.push("meta");

    keys.push(e.key.toLowerCase());

    return keys.join("+");
  }

  registerKeys(shortcuts) {
    shortcuts.forEach((shortcut) => {
      this.shortcuts.set(shortcut.key, shortcut);

      if (shortcut.toggle) {
        this.states.set(shortcut.key, false);
      }
    });
  }

  handleKeyDown(e) {
    const key = this.normalizeKey(e);

    const shortcut = this.shortcuts.get(key);

    if (!shortcut) return;

    e.preventDefault();

    // ✅ TOGGLE FIX HERE
    if (shortcut.toggle) {
      const currentState = this.states.get(key) || false;

      const newState = !currentState;

      this.states.set(key, newState);

      shortcut.action(newState);
    } else {
      shortcut.action();
    }
  }
}

const shortcutManager = new ShortcutManager();

export default shortcutManager;
