import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import MenuBar from './components/MenuBar/MenuBar.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
import ReviewBar from './components/ReviewBar/ReviewBar.jsx';
import StatusBar from './components/StatusBar/StatusBar.jsx';
import Tabs from './components/Tabs/Tabs.jsx';
import BreadcrumbsBar from './components/BreadcrumbsBar/BreadcrumbsBar.jsx';
import Search from './components/SideBar/Main Components/Search/Search.jsx';
import FilePioneer from './components/SideBar/Main Components/filePioneer/filePioneer.jsx';
import GitHub from './components/SideBar/Main Components/GItHub/GitHub.jsx';
import Terminal from './components/SideBar/Main Components/Terminal/Terminal.jsx';
import Debug from './components/SideBar/Main Components/Debug/Debug.jsx';
import CodeBlocks from './components/SideBar/Main Components/Code Blocks/CodeBlocks.jsx';
import Git from './components/SideBar/Main Components/Git/Git.jsx';
import DefaultPage from './components/DefaultPage/DefaultPage.jsx';
import WelcomePage from './components/WelcomePage/WelcomePage.jsx';
import Info from './components/Info/Info.jsx';
import Modal from './components/Modal/Modal.jsx';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog.jsx';
import CommandPalette from './components/CommandPalette/CommandPalette.jsx';
import Settings from './components/Settings/Settings.jsx';
import Extensions from './components/Extensions/Extensions.jsx';
import Account from './components/Account/Account.jsx';
import KeyboardShortcuts from './components/KeyboardShortcuts/KeyboardShortcuts.jsx';
import MonacoEditor from './components/Editor/MonacoEditor.jsx';
import shortcutManager, { formatBindingLabel, normalizeBindingString } from './components/ShortcutManager.js';
import defaultSettings from './components/Settings/defaultSettings.js';
import workspace from './core/workspace.js';
import { getEffectiveBinding, KEYBINDING_COMMANDS } from './core/keybindings.js';
import { fetchRunnerLanguages, formatLocalRunResult, formatRunResult, resolveRunnerLanguage, runCode, runCodeLocally } from './core/codeRunner.js';

function App() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('editorSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [customKeybindings, setCustomKeybindings] = useState(() => {
    const saved = localStorage.getItem('tilderKeybindings');
    if (!saved) {
      return {};
    }

    try {
      const parsed = JSON.parse(saved);
      return Object.entries(parsed).reduce((bucket, [commandId, binding]) => {
        if (typeof binding !== 'string') {
          return bucket;
        }

        const normalized = normalizeBindingString(binding);
        if (normalized) {
          bucket[commandId] = normalized;
        }

        return bucket;
      }, {});
    } catch {
      return {};
    }
  });
  const [activePanel, setActivePanel] = useState('filepioneer');
  const [infoDisplay, setInfoDisplay] = useState('none');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [confirmationRequest, setConfirmationRequest] = useState(null);
  const [welcomeTabOpen, setWelcomeTabOpen] = useState(true);
  const [createFolderRequestNonce, setCreateFolderRequestNonce] = useState(0);
  const [renameRequestNonce, setRenameRequestNonce] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(220);
  const [isResizingTerminal, setIsResizingTerminal] = useState(false);
  const [editorStatus, setEditorStatus] = useState({
    lines: 1,
    line: 1,
    column: 1,
    selectionLength: 0,
    selectedLines: 0,
    eol: 'LF',
    tabSize: defaultSettings.tabSize,
    insertSpaces: defaultSettings.insertSpaces,
  });
  const [notifications, setNotifications] = useState([]);
  const [version, setVersion] = useState(0);
  const [searchFocusNonce, setSearchFocusNonce] = useState(0);
  const [runnerLanguages, setRunnerLanguages] = useState([]);
  const [runnerLoading, setRunnerLoading] = useState(false);
  const saveTimersRef = useRef({});
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const editorListenersCleanupRef = useRef(() => {});
  const modalOpenRef = useRef(modalOpen);
  const modalTypeRef = useRef(modalType);
  const mainCodeAreaRef = useRef(null);
  const terminalApiRef = useRef(null);
  const confirmationResolverRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('editorSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('tilderKeybindings', JSON.stringify(customKeybindings));
  }, [customKeybindings]);

  useEffect(() => {
    modalOpenRef.current = modalOpen;
    modalTypeRef.current = modalType;
    if (modalOpen) {
      setCommandPaletteOpen(false);
    }
  }, [modalOpen, modalType]);

  function refresh() {
    setVersion((current) => current + 1);
  }

  function openSearchPanel() {
    setActivePanel('search');
    setSearchFocusNonce((current) => current + 1);
  }

  function openCommandPalette() {
    setCommandPaletteOpen(true);
  }

  function closeCommandPalette() {
    setCommandPaletteOpen(false);
  }

  function pushNotification(message, tone = 'info') {
    setNotifications((current) => [
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        message,
        tone,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      },
      ...current,
    ].slice(0, 20));
  }

  function markNotificationsRead() {
    setNotifications((current) => current.map((entry) => ({ ...entry, read: true })));
  }

  function clearNotifications() {
    setNotifications([]);
  }

  function closeCurrentModal() {
    setModalOpen(false);
    setModalType('');
  }

  function requestConfirmation(options) {
    setConfirmationRequest(options);
    return new Promise((resolve) => {
      confirmationResolverRef.current = resolve;
    });
  }

  function resolveConfirmation(result) {
    confirmationResolverRef.current?.(result);
    confirmationResolverRef.current = null;
    setConfirmationRequest(null);
  }

  function toggleSettings(nextState) {
    if (typeof nextState === 'boolean') {
      if (nextState) {
        setModalType('Settings');
        setModalOpen(true);
      } else if (modalType === 'Settings') {
        closeCurrentModal();
      }
      return;
    }

    if (modalOpen && modalType === 'Settings') {
      closeCurrentModal();
      return;
    }

    setModalType('Settings');
    setModalOpen(true);
  }

  function toggleSettingsFromState() {
    if (modalOpenRef.current && modalTypeRef.current === 'Settings') {
      closeCurrentModal();
      return;
    }

    setModalType('Settings');
    setModalOpen(true);
  }

  function openExtensions() {
    if (modalOpen && modalType === 'Extensions') {
      closeCurrentModal();
      return;
    }

    setModalType('Extensions');
    setModalOpen(true);
  }

  function openAccount() {
    if (modalOpen && modalType === 'Account') {
      closeCurrentModal();
      return;
    }

    setModalType('Account');
    setModalOpen(true);
  }

  function toggleTerminalPanel(nextState) {
    setTerminalOpen((current) => (typeof nextState === 'boolean' ? nextState : !current));
  }

  async function ensureRunnerCatalog() {
    if (runnerLanguages.length) {
      return runnerLanguages;
    }

    setRunnerLoading(true);
    try {
      const languages = await fetchRunnerLanguages();
      setRunnerLanguages(languages);
      return languages;
    } finally {
      setRunnerLoading(false);
    }
  }

  async function handleRunCurrentFile() {
    const tab = workspace.getActiveTab();
    if (!tab) {
      return;
    }

    try {
      setTerminalOpen(true);
      setTimeout(() => {
        terminalApiRef.current?.clear?.();
        terminalApiRef.current?.writeLines?.([`Running ${tab.name}...`]);
      }, 0);

      const localResult = await runCodeLocally({
        name: tab.name,
        language: tab.language,
        source: tab.content ?? '',
        rootName: workspace.rootName || workspace.getRootNode()?.name || 'workspace',
        entries: workspace.getStructureSnapshot()?.entries || [],
        relativePath: tab.external ? '' : tab.path === 'root' ? tab.name : tab.path,
      });

      if (localResult.supported) {
        setTimeout(() => {
          terminalApiRef.current?.writeLines?.(formatLocalRunResult(localResult));
          terminalApiRef.current?.focus?.();
        }, 0);
        pushNotification(`${localResult.ok ? 'Run finished' : 'Run failed'} for ${tab.name}.`, localResult.ok ? 'info' : 'warning');
        return;
      }

      const languages = await ensureRunnerCatalog();
      const language = resolveRunnerLanguage(tab, languages);
      if (!language) {
        pushNotification(`No runner configured for ${tab.language || 'this file type'}.`, 'warning');
        setTimeout(() => {
          terminalApiRef.current?.writeLines?.([`No runner is configured for ${tab.language || 'this file type'}.`]);
        }, 0);
        return;
      }

      setTimeout(() => {
        terminalApiRef.current?.writeLines?.([`Falling back to remote runner: ${language.name}`]);
      }, 0);

      const result = await runCode({
        source: tab.content ?? '',
        languageId: language.id,
      });

      setTimeout(() => {
        terminalApiRef.current?.writeLines?.(formatRunResult(result));
        terminalApiRef.current?.focus?.();
      }, 0);
      pushNotification(`Run finished for ${tab.name}.`);
    } catch (error) {
      setTerminalOpen(true);
      setTimeout(() => {
        terminalApiRef.current?.writeLines?.([
          `Runner error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ]);
      }, 0);
      pushNotification('Code runner failed.', 'error');
    }
  }

  function openKeyboardShortcuts() {
    if (modalOpen && modalType === 'Keyboard Shortcuts') {
      closeCurrentModal();
      return;
    }

    setModalType('Keyboard Shortcuts');
    setModalOpen(true);
  }

  function startTerminalResize() {
    setTerminalOpen(true);
    setIsResizingTerminal(true);
  }

  useEffect(() => {
    return () => {
      Object.values(saveTimersRef.current).forEach((timerId) => clearTimeout(timerId));
      editorListenersCleanupRef.current();
      confirmationResolverRef.current?.(false);
    };
  }, []);

  const tabs = workspace.tabs;
  const activeTab = workspace.getActiveTab();
  const welcomeTab = welcomeTabOpen ? [{ id: '__welcome__', name: 'Welcome', dirty: false }] : [];
  const visibleTabs = [...welcomeTab, ...tabs];
  const tabActiveId = activeTab ? workspace.activeTabId : (welcomeTabOpen ? '__welcome__' : null);
  const hasSidebar = activePanel !== null;
  const editorSurfaceHeight = useMemo(() => {
    const terminalOffset = terminalOpen ? terminalHeight : 0;
    return `calc(88.5vh - 46px - ${terminalOffset}px)`;
  }, [terminalHeight, terminalOpen]);
  const maincodeareaStyle = useMemo(
    () => ({ width: hasSidebar ? '72vw' : '92vw', height: '88.5vh' }),
    [hasSidebar]
  );
  const monacoEditorStyle = useMemo(
    () => ({ width: hasSidebar ? '72vw' : '92vw', height: editorSurfaceHeight, opacity: '1' }),
    [editorSurfaceHeight, hasSidebar]
  );
  const contentSurfaceStyle = useMemo(
    () => ({ width: hasSidebar ? '72vw' : '92vw', height: editorSurfaceHeight }),
    [editorSurfaceHeight, hasSidebar]
  );
  const effectiveBindings = useMemo(
    () =>
      KEYBINDING_COMMANDS.reduce((bucket, command) => {
        bucket[command.id] = getEffectiveBinding(command, customKeybindings);
        return bucket;
      }, {}),
    [customKeybindings]
  );
  const commandPaletteCommands = useMemo(
    () =>
      KEYBINDING_COMMANDS.map((command) => ({
        ...command,
        bindingLabel: formatBindingLabel(effectiveBindings[command.id]),
      })),
    [effectiveBindings]
  );

  useEffect(() => {
    if (!isResizingTerminal) {
      return undefined;
    }

    function handlePointerMove(event) {
      const bounds = mainCodeAreaRef.current?.getBoundingClientRect();
      if (!bounds) {
        return;
      }

      const nextHeight = Math.min(460, Math.max(160, bounds.bottom - event.clientY));
      setTerminalHeight(nextHeight);
    }

    function stopResizing() {
      setIsResizingTerminal(false);
    }

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizingTerminal]);

  function syncEditorStatus(editorInstance = editorRef.current) {
    const editor = editorInstance;
    const model = editor?.getModel?.();

    if (!editor || !model) {
      setEditorStatus({
        lines: 1,
        line: 1,
        column: 1,
        selectionLength: 0,
        selectedLines: 0,
        eol: 'LF',
        tabSize: defaultSettings.tabSize,
        insertSpaces: defaultSettings.insertSpaces,
      });
      return;
    }

    const position = editor.getPosition?.() || { lineNumber: 1, column: 1 };
    const selection = editor.getSelection?.();
    const selectionText = selection ? model.getValueInRange(selection) : '';
    const modelOptions = model.getOptions?.() || {};

    setEditorStatus({
      lines: model.getLineCount(),
      line: position.lineNumber,
      column: position.column,
      selectionLength: selectionText.length,
      selectedLines: selection && !selection.isEmpty() ? selection.endLineNumber - selection.startLineNumber + 1 : 0,
      eol: model.getEOL() === '\r\n' ? 'CRLF' : 'LF',
      tabSize: modelOptions.tabSize ?? defaultSettings.tabSize,
      insertSpaces: modelOptions.insertSpaces ?? defaultSettings.insertSpaces,
    });
  }

  function onEditorMount(editor, monaco) {
    editorListenersCleanupRef.current();
    editorRef.current = editor;
    monacoRef.current = monaco;

    const update = () => syncEditorStatus(editor);
    const model = editor.getModel?.();
    const listeners = [
      editor.onDidChangeCursorPosition(update),
      editor.onDidChangeCursorSelection(update),
      model?.onDidChangeContent(update),
      model?.onDidChangeOptions(update),
    ].filter(Boolean);

    editorListenersCleanupRef.current = () => {
      listeners.forEach((listener) => listener.dispose());
    };

    update();
  }

  function runEditorAction(actionId, fallback) {
    const editor = editorRef.current;
    if (!editor) {
      fallback?.();
      return;
    }

    editor.focus();

    try {
      editor.trigger('menu', actionId, null);
    } catch {
      fallback?.();
    }
  }

  function getCreateParentPath() {
    const root = workspace.getRootNode();
    if (!root) {
      return 'root';
    }

    const selectedNode = workspace.selectedNodePath ? workspace.findNode(workspace.selectedNodePath) : null;
    if (selectedNode?.type === 'folder') {
      return selectedNode.path;
    }

    if (selectedNode?.type === 'file') {
      return workspace.findParentPath(selectedNode.path);
    }

    return root.path;
  }

  function queueSave(tabId) {
    const tab = workspace.tabs.find((entry) => entry.id === tabId);
    if (!tabId || !tab?.handle || tab.isUntitled) {
      return;
    }

    clearTimeout(saveTimersRef.current[tabId]);
    saveTimersRef.current[tabId] = setTimeout(async () => {
      await workspace.saveTab(tabId);
      refresh();
    }, 350);
  }

  async function handleEditorChange(value) {
    if (!activeTab) {
      return;
    }

    workspace.updateTabContent(activeTab.id, value ?? '');
    refresh();
    syncEditorStatus();
    queueSave(activeTab.id);
  }

  function handleGoToLine() {
    runEditorAction('editor.action.gotoLine');
  }

  function handleSetLanguage(language) {
    const tab = workspace.getActiveTab();
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!tab || !editor || !monaco) {
      return;
    }

    tab.language = language;
    const model = editor.getModel?.();
    if (model) {
      monaco.editor.setModelLanguage(model, language);
    }
    pushNotification(`Language mode set to ${language}.`);
    refresh();
  }

  function handleSetIndentation({ insertSpaces, tabSize }) {
    const tab = workspace.getActiveTab();
    const editor = editorRef.current;
    const model = editor?.getModel?.();
    if (!tab || !editor || !model) {
      return;
    }

    tab.insertSpaces = insertSpaces;
    tab.tabSize = tabSize;
    model.updateOptions({ insertSpaces, tabSize, indentSize: tabSize });
    editor.updateOptions({ insertSpaces, tabSize });
    syncEditorStatus(editor);
    pushNotification(`${insertSpaces ? 'Spaces' : 'Tabs'} set to ${tabSize}.`);
    refresh();
  }

  function handleSetEol(eol) {
    const tab = workspace.getActiveTab();
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    const model = editor?.getModel?.();
    if (!tab || !editor || !model || !monaco) {
      return;
    }

    tab.eol = eol;
    model.setEOL(eol === 'CRLF' ? monaco.editor.EndOfLineSequence.CRLF : monaco.editor.EndOfLineSequence.LF);
    workspace.updateTabContent(tab.id, editor.getValue());
    syncEditorStatus(editor);
    pushNotification(`Line endings changed to ${eol}.`);
    refresh();
    queueSave(tab.id);
  }

  async function handleOpenFolder() {
    try {
      await workspace.openFolderBrowser();
      setActivePanel('filepioneer');
      pushNotification(`Opened folder ${workspace.rootName || 'workspace'}.`);
      refresh();
    } catch {
      // User cancelled the folder picker.
    }
  }

  async function handleOpenFileDialog() {
    try {
      await workspace.openExternalFile();
      const openedTab = workspace.getActiveTab();
      pushNotification(`Opened file ${openedTab?.name || 'file'}.`);
      refresh();
    } catch {
      // User cancelled the file picker.
    }
  }

  async function handleOpenNode(node) {
    await workspace.openFile(node);
    refresh();
  }

  async function handleOpenSearchResult(result) {
    const existingTab = workspace.tabs.find((tab) => tab.path === result.path || tab.id === result.path);

    if (existingTab) {
      workspace.setActiveTab(existingTab.id);
    } else {
      await workspace.openFile(result.path);
    }

    refresh();

    if (!result.line) {
      return;
    }

    setTimeout(() => {
      requestAnimationFrame(() => {
        const editor = editorRef.current;
        if (!editor) {
          return;
        }

        const startColumn = result.column || 1;
        const endColumn = startColumn + Math.max(result.matchLength || 1, 1);
        editor.focus();
        editor.setPosition({ lineNumber: result.line, column: startColumn });
        editor.revealLineInCenter(result.line);
        editor.setSelection({
          startLineNumber: result.line,
          startColumn,
          endLineNumber: result.line,
          endColumn,
        });
      });
    }, 0);
  }

  function handleCreateUntitledFile() {
    workspace.createUntitledFile(getCreateParentPath());
    refresh();
  }

  async function handleCreateFolder() {
    setActivePanel('filepioneer');
    workspace.setSelectedNode(getCreateParentPath());
    setCreateFolderRequestNonce((current) => current + 1);
    refresh();
  }

  function handleDeleteRequest(node) {
    return requestConfirmation({
      title: node.type === 'folder' ? 'Delete Folder' : 'Delete File',
      message: `Delete ${node.name}? This action cannot be undone inside Tilder.`,
      confirmLabel: 'Delete',
      cancelLabel: 'Keep',
      danger: true,
    });
  }

  async function handleSaveActiveFile() {
    if (!activeTab) {
      return;
    }

    try {
      const saved = await workspace.saveTab(activeTab.id);
      if (saved) {
        pushNotification(`Saved ${workspace.getActiveTab()?.name || activeTab.name}.`);
        refresh();
      }
    } catch {
      // User cancelled the save picker.
    }
  }

  async function handleSaveAsActiveFile() {
    if (!activeTab) {
      return;
    }

    try {
      const saved = await workspace.saveTab(activeTab.id, { saveAs: true });
      if (saved) {
        pushNotification(`Saved As ${workspace.getActiveTab()?.name || activeTab.name}.`);
        refresh();
      }
    } catch {
      // User cancelled the save picker.
    }
  }

  async function handleSaveWorkspaceAs() {
    try {
      const saved = await workspace.saveWorkspaceAs();
      if (saved) {
        pushNotification(`Workspace saved to ${workspace.rootName || 'folder'}.`);
        refresh();
      }
    } catch {
      // User cancelled the directory picker.
    }
  }

  function handleTabClick(id) {
    if (id === '__welcome__') {
      workspace.activeTabId = null;
      refresh();
      return;
    }

    workspace.setActiveTab(id);
    refresh();
  }

  async function handleCloseTab(id) {
    if (id === '__welcome__') {
      setWelcomeTabOpen(false);
      if (!workspace.getActiveTab()) {
        refresh();
      }
      return;
    }

    const tab = workspace.tabs.find((entry) => entry.id === id);
    if (tab?.dirty) {
      const confirmed = await requestConfirmation({
        title: 'Close Unsaved Tab',
        message: `Close ${tab.name} without saving the latest changes?`,
        confirmLabel: 'Close Tab',
        cancelLabel: 'Keep Editing',
      });
      if (!confirmed) {
        return;
      }
    }

    delete saveTimersRef.current[id];
    workspace.closeTab(id);
    refresh();
  }

  function toggleInfoDisplay() {
    setInfoDisplay('flex');
  }

  function triggerInfoClose() {
    setInfoDisplay('none');
  }

  function toggleSidebarPanel(panel) {
    setActivePanel((current) => (current === panel ? null : panel));
  }

  function toggleSidebar() {
    setActivePanel((current) => (current ? null : 'filepioneer'));
  }

  function handleRenameSelected() {
    const selectedPath = workspace.selectedNodePath;
    if (!selectedPath || selectedPath === 'root') {
      return;
    }
    setActivePanel('filepioneer');
    setRenameRequestNonce((current) => current + 1);
  }

  useEffect(() => {
    if (!activeTab) {
      editorListenersCleanupRef.current();
      setEditorStatus({
        lines: 1,
        line: 1,
        column: 1,
        selectionLength: 0,
        selectedLines: 0,
        eol: 'LF',
        tabSize: defaultSettings.tabSize,
        insertSpaces: defaultSettings.insertSpaces,
      });
    }
  }, [activeTab?.id]);

  const commandActions = {
    'workbench.action.showCommands': () => openCommandPalette(),
    'workbench.action.openSettings': () => toggleSettingsFromState(),
    'workbench.action.openKeyboardShortcuts': () => openKeyboardShortcuts(),
    'workbench.action.toggleKeyboardShortcuts': () => openKeyboardShortcuts(),
    'workbench.action.showExtensions': () => openExtensions(),
    'workbench.action.openAccount': () => openAccount(),
    'workbench.action.toggleSidebarVisibility': () => toggleSidebar(),
    'workbench.view.explorer': () => setActivePanel('filepioneer'),
    'workbench.view.search': () => openSearchPanel(),
    'workbench.view.scm': () => setActivePanel('git'),
    'workbench.view.debug': () => setActivePanel('debug'),
    'workbench.action.togglePanel': () => toggleTerminalPanel(),
    'workbench.action.terminal.toggleTerminal': () => toggleTerminalPanel(),
    'codeRunner.runFile': () => handleRunCurrentFile(),
    'workbench.action.files.newUntitledFile': () => handleCreateUntitledFile(),
    'workbench.action.files.newFolder': () => handleCreateFolder(),
    'workbench.action.files.openFile': () => handleOpenFileDialog(),
    'workbench.action.files.openFolder': () => handleOpenFolder(),
    'workbench.action.quickOpen': () => handleOpenFileDialog(),
    'workbench.action.gotoLine': () => handleGoToLine(),
    'workbench.action.files.save': () => handleSaveActiveFile(),
    'workbench.action.files.saveAs': () => handleSaveAsActiveFile(),
    'workbench.action.files.saveWorkspaceAs': () => handleSaveWorkspaceAs(),
    'workbench.action.closeActiveEditor': () => {
      if (tabActiveId) {
        handleCloseTab(tabActiveId);
      }
    },
    'workbench.action.closeOtherEditors': () => {
      if (!workspace.activeTabId) {
        return;
      }
      workspace.closeOtherTabs(workspace.activeTabId);
      refresh();
    },
    'workbench.action.closeAllEditors': () => {
      workspace.closeAllTabs();
      refresh();
    },
    'explorer.rename': () => handleRenameSelected(),
    'edit.undo': () => runEditorAction('undo'),
    'edit.redo': () => runEditorAction('redo'),
    'edit.cut': () => runEditorAction('editor.action.clipboardCutAction', () => document.execCommand('cut')),
    'edit.copy': () => runEditorAction('editor.action.clipboardCopyAction', () => document.execCommand('copy')),
    'edit.paste': () => runEditorAction('editor.action.clipboardPasteAction', () => document.execCommand('paste')),
    'edit.selectAll': () => runEditorAction('editor.action.selectAll', () => document.execCommand('selectAll')),
    'edit.find': () => runEditorAction('actions.find'),
    'edit.replace': () => runEditorAction('editor.action.startFindReplaceAction'),
    'editor.action.formatDocument': () => runEditorAction('editor.action.formatDocument'),
    'editor.action.commentLine': () => runEditorAction('editor.action.commentLine'),
    'editor.action.toggleWordWrap': () => {
      setSettings((current) => ({
        ...current,
        wordWrap: current.wordWrap === 'off' ? 'on' : 'off',
      }));
    },
  };

  useEffect(() => {
    shortcutManager.setBindings(
      KEYBINDING_COMMANDS.map((command) => ({
        id: command.id,
        binding: effectiveBindings[command.id],
        action: commandActions[command.id],
      }))
    );
  }, [activeTab?.id, effectiveBindings, modalOpen, modalType, tabActiveId, workspace.activeTabId, workspace.selectedNodePath]);

  function updateKeybinding(commandId, binding) {
    setCustomKeybindings((current) => {
      const next = { ...current };
      if (binding) {
        KEYBINDING_COMMANDS.forEach((command) => {
          if (command.id === commandId) {
            return;
          }

          const effective = getEffectiveBinding(command, current);
          if (effective === binding) {
            next[command.id] = '';
          }
        });
      }

      const command = KEYBINDING_COMMANDS.find((entry) => entry.id === commandId);
      if (!binding) {
        next[commandId] = '';
      } else if (command && binding === command.defaultBinding) {
        delete next[commandId];
      } else {
        next[commandId] = binding;
      }
      return next;
    });
  }

  function resetKeybinding(commandId) {
    setCustomKeybindings((current) => {
      const next = { ...current };
      delete next[commandId];
      return next;
    });
  }

  function resetAllKeybindings() {
    setCustomKeybindings({});
  }

  const panelDisplay = (panel) => (activePanel === panel ? 'flex' : 'none');
  const showWelcomePage = !activeTab && welcomeTabOpen;
  const showDefaultPage = !activeTab && !welcomeTabOpen;

  return (
    <>
      <ConfirmDialog
        request={confirmationRequest}
        onCancel={() => resolveConfirmation(false)}
        onConfirm={() => resolveConfirmation(true)}
      />
      <CommandPalette
        isOpen={commandPaletteOpen}
        commands={commandPaletteCommands}
        onClose={closeCommandPalette}
        onRunCommand={(command) => {
          closeCommandPalette();
          commandActions[command.id]?.();
        }}
      />
      <Info triggerInfoClose={triggerInfoClose} InfoDisplay={infoDisplay} />
      <Modal isOpen={modalOpen} closeModal={closeCurrentModal} title={modalType}>
        <Settings modalType={modalType} settings={settings} setSettings={setSettings} />
        <Extensions modalType={modalType} />
        <Account modalType={modalType} />
        <KeyboardShortcuts
          modalType={modalType}
          commands={KEYBINDING_COMMANDS}
          bindings={effectiveBindings}
          onOpenSettings={() => toggleSettings(true)}
          onUpdateBinding={updateKeybinding}
          onResetBinding={resetKeybinding}
          onResetAll={resetAllKeybindings}
        />
      </Modal>
      <div id="mainProductivityArea">
        <MenuBar
          toggleInfoDisplay={toggleInfoDisplay}
          triggerNewFile={handleCreateUntitledFile}
          triggerNewFolder={handleCreateFolder}
          openSettings={toggleSettings}
          openAccount={openAccount}
          openExtensions={openExtensions}
          openKeyboardShortcuts={openKeyboardShortcuts}
          toggleTerminalPanel={toggleTerminalPanel}
          triggerOpenFile={handleOpenFileDialog}
          triggerOpenFolder={handleOpenFolder}
          saveActiveFile={handleSaveActiveFile}
          saveAsActiveFile={handleSaveAsActiveFile}
          saveWorkspaceAs={handleSaveWorkspaceAs}
          undo={() => runEditorAction('undo')}
          redo={() => runEditorAction('redo')}
          cut={() => runEditorAction('editor.action.clipboardCutAction', () => document.execCommand('cut'))}
          copy={() => runEditorAction('editor.action.clipboardCopyAction', () => document.execCommand('copy'))}
          paste={() => runEditorAction('editor.action.clipboardPasteAction', () => document.execCommand('paste'))}
          selectAll={() => runEditorAction('editor.action.selectAll', () => document.execCommand('selectAll'))}
          find={() => runEditorAction('actions.find')}
          replace={() => runEditorAction('editor.action.startFindReplaceAction')}
          openExplorer={() => setActivePanel('filepioneer')}
          openSearch={openSearchPanel}
          toggleTerminal={() => toggleTerminalPanel()}
        />
        <div className="mainsect">
          <div className="codewrpr">
            <ReviewBar />
            <div className={`maincodearea ${terminalOpen ? 'terminal-open' : ''}`} style={maincodeareaStyle} ref={mainCodeAreaRef}>
              <Tabs
                tabs={visibleTabs}
                activeTabId={tabActiveId}
                setActiveTab={handleTabClick}
                closeTab={handleCloseTab}
                onRunCurrentFile={handleRunCurrentFile}
                onOpenCommandPalette={openCommandPalette}
                showRunAction={!!activeTab}
              />
              {activeTab ? (
                <BreadcrumbsBar activeTab={activeTab} rootName={workspace.rootName || workspace.getRootNode()?.name || ''} />
              ) : null}
              {activeTab ? (
                <MonacoEditor
                  key={activeTab.id}
                  tab={activeTab}
                  onChange={handleEditorChange}
                  onMount={onEditorMount}
                  onOpenCommandPalette={openCommandPalette}
                  settings={settings}
                  MonacoEditorDisplay="flex"
                  monacoEditorStyle={monacoEditorStyle}
                />
              ) : null}
              {showDefaultPage ? <DefaultPage DefaultPageDisplay="flex" dimensionsDefaultPage={contentSurfaceStyle} /> : null}
              {showWelcomePage ? (
                <WelcomePage
                  DimensionsWelcomePage={contentSurfaceStyle}
                  WelcomePageDisplay="flex"
                  triggerNewFile={handleCreateUntitledFile}
                  triggerOpenFolder={handleOpenFolder}
                  triggerOpenFile={handleOpenFileDialog}
                  triggerNewFolder={handleCreateFolder}
                />
              ) : null}
              <Terminal
                isOpen={terminalOpen}
                height={terminalHeight}
                onResizeStart={startTerminalResize}
                onClose={() => setTerminalOpen(false)}
                workspace={workspace}
                openFile={handleOpenNode}
                terminalApiRef={terminalApiRef}
              />
            </div>
          </div>
          <div className="SideBarmainwrper">
            <CodeBlocks ariaExpandedisplaycodeblocks={panelDisplay('codeblocks')} />
            <Git ariaExpandedisplaygit={panelDisplay('git')} />
            <Extensions ariaExpandedisplayextensions={panelDisplay('extensions')} />
            <GitHub ariaExpandedisplaygithub={panelDisplay('github')} />
            <Debug ariaExpandedisplaydebug={panelDisplay('debug')} />
            <Search
              ariaExpandedisplaysearch={panelDisplay('search')}
              workspace={workspace}
              workspaceVersion={version}
              searchFocusNonce={searchFocusNonce}
              openSearchResult={handleOpenSearchResult}
            />
            <FilePioneer
              ariaExpandedisplayfilepioneer={panelDisplay('filepioneer')}
              workspace={workspace}
              openFile={handleOpenNode}
              createUntitledFile={handleCreateUntitledFile}
              closeTab={handleCloseTab}
              refresh={refresh}
              activeTabId={workspace.activeTabId}
              triggerOpenFolder={handleOpenFolder}
              createFolderRequestNonce={createFolderRequestNonce}
              renameRequestNonce={renameRequestNonce}
              confirmDelete={handleDeleteRequest}
            />
            <SideBar
              toggleAriaExpandedfilepioneer={() => toggleSidebarPanel('filepioneer')}
              toggleAriaExpandedsearch={() => {
                setActivePanel((current) => (current === 'search' ? null : 'search'));
                setSearchFocusNonce((current) => current + 1);
              }}
              toggleAriaExpandedextensions={openExtensions}
              toggleAriaExpandedebug={() => toggleSidebarPanel('debug')}
              toggleAriaExpandedgit={() => toggleSidebarPanel('git')}
              toggleAriaExpandedgithub={() => toggleSidebarPanel('github')}
              toggleAriaExpandedcodeblocks={() => toggleSidebarPanel('codeblocks')}
            />
          </div>
        </div>
        <StatusBar
          activeTab={activeTab}
          rootName={workspace.rootName || workspace.getRootNode()?.name || ''}
          status={editorStatus}
          notifications={notifications}
          onGoToLine={handleGoToLine}
          onSetLanguage={handleSetLanguage}
          onSetIndentation={handleSetIndentation}
          onSetEol={handleSetEol}
          onMarkNotificationsRead={markNotificationsRead}
          onClearNotifications={clearNotifications}
        />
      </div>
    </>
  );
}

export default App;
