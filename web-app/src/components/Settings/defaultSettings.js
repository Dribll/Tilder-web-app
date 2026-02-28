const defaultSettings = {

  // =========================
  // FONT
  // =========================

  fontSize: 14,
  fontFamily: "Consolas, monospace",
  fontWeight: "normal",
  lineHeight: 0,
  letterSpacing: 1.9,
  fontLigatures: false,


  // =========================
  // LINE NUMBERS
  // =========================

  lineNumbers: "on",
  lineNumbersMinChars: 5,


  // =========================
  // CURSOR
  // =========================

  cursorStyle: "line",
  cursorWidth: 2,
  cursorBlinking: "blink",
  cursorSmoothCaretAnimation: true,
  cursorSurroundingLines: 0,
  cursorSurroundingLinesStyle: "default",


  // =========================
  // WORD WRAP
  // =========================

  wordWrap: "off",
  wordWrapColumn: 80,
  wordWrapOverride1: "inherit",
  wordWrapOverride2: "inherit",


  // =========================
  // MINIMAP
  // =========================

  minimap: {

    enabled: true,

    side: "right",

    size: "proportional",

    showSlider: "mouseover",

    renderCharacters: true,

    maxColumn: 120

  },


  // =========================
  // SCROLL
  // =========================

  scrollBeyondLastLine: true,

  scrollBeyondLastColumn: 5,

  smoothScrolling: true,

  mouseWheelScrollSensitivity: 1,

  fastScrollSensitivity: 5,


  // =========================
  // SELECTION
  // =========================

  selectOnLineNumbers: true,

  roundedSelection: true,


  // =========================
  // INDENT
  // =========================

  tabSize: 4,

  insertSpaces: true,

  detectIndentation: true,

  trimAutoWhitespace: true,


  // =========================
  // RENDERING
  // =========================

  renderWhitespace: "none",

  renderControlCharacters: false,

  renderLineHighlight: "all",

  renderIndentGuides: true,

  renderFinalNewline: true,


  // =========================
  // MATCHING
  // =========================

  matchBrackets: "always",

  bracketPairColorization: {

    enabled: true

  },


  // =========================
  // AUTO CLOSE
  // =========================

  autoClosingBrackets: "always",

  autoClosingQuotes: "always",

  autoClosingDelete: "auto",

  autoClosingOvertype: "auto",


  // =========================
  // AUTO INDENT
  // =========================

  autoIndent: "advanced",


  // =========================
  // SUGGESTIONS
  // =========================

  quickSuggestions: true,

  quickSuggestionsDelay: 10,

  suggestOnTriggerCharacters: true,

  acceptSuggestionOnEnter: "on",

  suggestSelection: "recentlyUsed",


  // =========================
  // HOVER
  // =========================

  hover: {

    enabled: true,

    delay: 300

  },


  // =========================
  // LINKS
  // =========================

  links: true,


  // =========================
  // FIND
  // =========================

  find: {

    cursorMoveOnType: true,

    autoFindInSelection: "never",

    seedSearchStringFromSelection: true

  },


  // =========================
  // FOLDING
  // =========================

  folding: true,

  foldingStrategy: "auto",

  foldingHighlight: true,


  // =========================
  // DRAG AND DROP
  // =========================

  dragAndDrop: true,


  // =========================
  // COPY PASTE
  // =========================

  copyWithSyntaxHighlighting: true,


  // =========================
  // CONTEXT MENU
  // =========================

  contextmenu: true,


  // =========================
  // READ ONLY
  // =========================

  readOnly: false,


  // =========================
  // LAYOUT
  // =========================

  automaticLayout: true,


  // =========================
  // MOUSE
  // =========================

  mouseWheelZoom: false,


  // =========================
  // CURSOR MULTI
  // =========================

  multiCursorModifier: "alt",

  multiCursorMergeOverlapping: true,


  // =========================
  // ACCESSIBILITY
  // =========================

  accessibilitySupport: "auto",


  // =========================
  // CODE LENS
  // =========================

  codeLens: true,


  // =========================
  // COLOR DECORATOR
  // =========================

  colorDecorators: true,


  // =========================
  // LIGHTBULB
  // =========================

  lightbulb: {

    enabled: true

  },


  // =========================
  // PARAMETER HINTS
  // =========================

  parameterHints: {

    enabled: true

  },


  // =========================
  // FORMAT ON TYPE
  // =========================

  formatOnType: false,


  // =========================
  // FORMAT ON PASTE
  // =========================

  formatOnPaste: false,


  // =========================
  // CODE ACTIONS
  // =========================

  codeActionsOnSave: {},


  // =========================
  // RULERS
  // =========================

  rulers: [],


  // =========================
  // GUIDES
  // =========================

  guides: {

    indentation: true,

    bracketPairs: true

  }

};

export default defaultSettings;