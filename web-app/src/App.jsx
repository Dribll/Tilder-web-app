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
import LivePreview from './components/LivePreview/LivePreview.jsx';
import shortcutManager, { formatBindingLabel, normalizeBindingString } from './components/ShortcutManager.js';
import defaultSettings from './components/Settings/defaultSettings.js';
import workspace from './core/workspace.js';
import { beginOAuth, disconnectProvider, fetchAuthSession, pullSyncedState, pushSyncedState, updateSyncPreferences } from './core/accountApi.js';
import { getEffectiveBinding, KEYBINDING_COMMANDS } from './core/keybindings.js';
import { fetchRunnerLanguages, formatLocalRunResult, formatRunResult, resolveRunnerLanguage, runCode, runCodeLocally } from './core/codeRunner.js';

const LIVE_PREVIEW_CHANNEL = 'tilder-live-preview';
const LIVE_PREVIEW_ID = 'primary';
const DEFAULT_AUTH_SESSION = {
  providers: {
    github: false,
    microsoft: false,
  },
  accounts: {},
  syncProvider: null,
  syncPreferences: {
    syncSettings: true,
    syncLayout: true,
    syncShortcuts: true,
  },
};

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
  const [searchRequest, setSearchRequest] = useState(null);
  const [runnerLanguages, setRunnerLanguages] = useState([]);
  const [runnerLoading, setRunnerLoading] = useState(false);
  const [livePreviewOpen, setLivePreviewOpen] = useState(false);
  const [livePreviewMode, setLivePreviewMode] = useState('split');
  const [livePreviewDocument, setLivePreviewDocument] = useState('');
  const [livePreviewNonce, setLivePreviewNonce] = useState(0);
  const [livePreviewWidth, setLivePreviewWidth] = useState(380);
  const [isResizingLivePreview, setIsResizingLivePreview] = useState(false);
  const [authSession, setAuthSession] = useState(DEFAULT_AUTH_SESSION);
  const [authServiceStatus, setAuthServiceStatus] = useState('loading');
  const [authServiceMessage, setAuthServiceMessage] = useState('');
  const [authBusyProvider, setAuthBusyProvider] = useState(null);
  const [syncBusy, setSyncBusy] = useState(false);
  const [debugSession, setDebugSession] = useState({
    status: 'idle',
    mode: 'Ready',
    message: 'Open a file to run or debug.',
  });
  const [debugBreakpoints, setDebugBreakpoints] = useState({});
  const [watchExpressions, setWatchExpressions] = useState([]);
  const [debugDiagnostics, setDebugDiagnostics] = useState([]);
  const saveTimersRef = useRef({});
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const editorListenersCleanupRef = useRef(() => {});
  const modalOpenRef = useRef(modalOpen);
  const modalTypeRef = useRef(modalType);
  const mainCodeAreaRef = useRef(null);
  const terminalApiRef = useRef(null);
  const confirmationResolverRef = useRef(null);
  const breakpointDecorationsRef = useRef([]);
  const livePreviewWindowRef = useRef(null);
  const livePreviewChannelRef = useRef(null);
  const syncPushTimerRef = useRef(null);
  const applyingSyncStateRef = useRef(false);
  const authSessionReadyRef = useRef(false);
  const authPopupRef = useRef(null);
  const authPopupPollerRef = useRef(null);
  const authPopupHandledRef = useRef(false);
  const hydratedSyncUserKeyRef = useRef('');

  useEffect(() => {
    localStorage.setItem('editorSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('tilderKeybindings', JSON.stringify(customKeybindings));
  }, [customKeybindings]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.BroadcastChannel === 'undefined') {
      return undefined;
    }

    const channel = new window.BroadcastChannel(LIVE_PREVIEW_CHANNEL);
    livePreviewChannelRef.current = channel;

    return () => {
      channel.close();
      livePreviewChannelRef.current = null;
    };
  }, []);

  useEffect(() => {
    modalOpenRef.current = modalOpen;
    modalTypeRef.current = modalType;
    if (modalOpen) {
      setCommandPaletteOpen(false);
    }
  }, [modalOpen, modalType]);

  useEffect(() => {
    let active = true;

    fetchAuthSession()
      .then((session) => {
        if (!active) {
          return;
        }

        setAuthSession({
          ...DEFAULT_AUTH_SESSION,
          ...session,
          syncPreferences: {
            ...DEFAULT_AUTH_SESSION.syncPreferences,
            ...(session?.syncPreferences || {}),
          },
        });
        setAuthServiceStatus('ready');
        setAuthServiceMessage('');
        authSessionReadyRef.current = true;
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setAuthServiceStatus('error');
        setAuthServiceMessage(error instanceof Error ? error.message : 'Could not reach the Tilder auth server.');
        authSessionReadyRef.current = true;
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    function clearOAuthPopupMonitor() {
      if (authPopupPollerRef.current) {
        window.clearInterval(authPopupPollerRef.current);
        authPopupPollerRef.current = null;
      }
      authPopupRef.current = null;
    }

    function getAllowedOAuthOrigins() {
      const origins = new Set([window.location.origin]);

      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        origins.add(`${window.location.protocol}//${window.location.hostname}:3210`);
      }

      return origins;
    }

    function handleOAuthMessage(event) {
      if (!getAllowedOAuthOrigins().has(event.origin)) {
        return;
      }

      const payload = event.data;
      if (!payload || payload.type !== 'tilder:oauth-complete') {
        return;
      }

      authPopupHandledRef.current = true;
      clearOAuthPopupMonitor();
      setAuthBusyProvider(null);
      refreshAuthSession()
        .then(async (session) => {
          if (payload.success) {
            await hydrateSyncedState(session, { silent: true, force: true }).catch(() => null);
          }
          pushNotification(
            payload.success
              ? `${payload.provider === 'github' ? 'GitHub' : 'Microsoft'} connected.`
              : payload.message || 'Authentication failed.',
            payload.success ? 'info' : 'warning'
          );
        })
        .catch(() => {
          pushNotification('Could not refresh account session.', 'warning');
        });
    }

    window.addEventListener('message', handleOAuthMessage);
    return () => {
      window.removeEventListener('message', handleOAuthMessage);
      clearOAuthPopupMonitor();
    };
  }, []);

  function refresh() {
    setVersion((current) => current + 1);
  }

  function openSearchPanel(request = null) {
    setActivePanel('search');
    setSearchRequest(request ? { ...request, nonce: Date.now() } : null);
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

  function buildSyncState() {
    const nextState = {};

    if (authSession.syncPreferences?.syncSettings) {
      nextState.settings = settings;
    }

    if (authSession.syncPreferences?.syncShortcuts) {
      nextState.shortcuts = customKeybindings;
    }

    if (authSession.syncPreferences?.syncLayout) {
      nextState.layout = {
        activePanel,
        terminalOpen,
        terminalHeight,
        livePreviewMode,
        livePreviewWidth,
        welcomeTabOpen,
      };
    }

    return nextState;
  }

  function applySyncedState(nextState) {
    if (!nextState || typeof nextState !== 'object') {
      return;
    }

    applyingSyncStateRef.current = true;

    if (nextState.settings && typeof nextState.settings === 'object') {
      setSettings((current) => ({
        ...current,
        ...nextState.settings,
      }));
    }

    if (nextState.shortcuts && typeof nextState.shortcuts === 'object') {
      setCustomKeybindings(nextState.shortcuts);
    }

    if (nextState.layout && typeof nextState.layout === 'object') {
      setActivePanel(nextState.layout.activePanel ?? 'filepioneer');
      setTerminalOpen(Boolean(nextState.layout.terminalOpen));
      setTerminalHeight(Number(nextState.layout.terminalHeight) || 220);
      setLivePreviewMode(nextState.layout.livePreviewMode === 'tab' ? 'tab' : 'split');
      setLivePreviewWidth(Math.min(780, Math.max(280, Number(nextState.layout.livePreviewWidth) || 380)));
      setWelcomeTabOpen(nextState.layout.welcomeTabOpen !== false);
    }

    setTimeout(() => {
      applyingSyncStateRef.current = false;
    }, 0);
  }

  async function refreshAuthSession() {
    const session = await fetchAuthSession();
    setAuthSession({
      ...DEFAULT_AUTH_SESSION,
      ...session,
      syncPreferences: {
        ...DEFAULT_AUTH_SESSION.syncPreferences,
        ...(session?.syncPreferences || {}),
      },
    });
    setAuthServiceStatus('ready');
    setAuthServiceMessage('');
    return session;
  }

  function getSyncUserKeyFromSession(session) {
    const provider = session?.syncProvider;
    const accountId = provider ? session?.accounts?.[provider]?.id : null;
    return provider && accountId ? `${provider}:${accountId}` : '';
  }

  async function hydrateSyncedState(session, options = {}) {
    const { silent = false, force = false } = options;
    const syncUserKey = getSyncUserKeyFromSession(session);

    if (!syncUserKey) {
      hydratedSyncUserKeyRef.current = '';
      return null;
    }

    if (!force && hydratedSyncUserKeyRef.current === syncUserKey) {
      return null;
    }

    try {
      setSyncBusy(true);
      const response = await pullSyncedState();
      if (response?.session) {
        setAuthSession({
          ...DEFAULT_AUTH_SESSION,
          ...response.session,
          syncPreferences: {
            ...DEFAULT_AUTH_SESSION.syncPreferences,
            ...(response.session?.syncPreferences || {}),
          },
        });
      }

      if (response?.state) {
        applySyncedState(response.state);
      }

      hydratedSyncUserKeyRef.current = syncUserKey;

      if (!silent) {
        pushNotification(response?.state ? 'Settings sync pulled from cloud.' : 'No synced settings found yet.');
      }

      return response;
    } catch (error) {
      if (!silent) {
        pushNotification(error instanceof Error ? error.message : 'Unable to pull synced state.', 'warning');
      }
      throw error;
    } finally {
      setSyncBusy(false);
    }
  }

  const activeAccountProvider = useMemo(() => {
    if (authSession?.syncProvider && authSession.accounts?.[authSession.syncProvider]) {
      return authSession.syncProvider;
    }

    if (authSession?.accounts?.github) {
      return 'github';
    }

    if (authSession?.accounts?.microsoft) {
      return 'microsoft';
    }

    return '';
  }, [authSession]);

  const activeAccount = useMemo(() => {
    return activeAccountProvider ? authSession?.accounts?.[activeAccountProvider] || null : null;
  }, [activeAccountProvider, authSession]);

  function handleStartOAuth(provider) {
    if (authServiceStatus === 'error') {
      pushNotification(
        authServiceMessage || 'The Tilder auth server is not reachable. Start the backend server on port 3210.',
        'warning'
      );
      return;
    }

    if (!authSession?.providers?.[provider]) {
      pushNotification(
        `${provider === 'github' ? 'GitHub' : 'Microsoft'} sign-in is not enabled on this Tilder server yet. Once the server owner configures the provider, this button will open the real OAuth prompt.`,
        'warning'
      );
      return;
    }

    const popup = beginOAuth(provider);
    if (!popup) {
      pushNotification(`Allow popups to connect ${provider === 'github' ? 'GitHub' : 'Microsoft'}.`, 'warning');
      return;
    }

    authPopupHandledRef.current = false;
    if (authPopupPollerRef.current) {
      window.clearInterval(authPopupPollerRef.current);
    }

    authPopupRef.current = popup;
    setAuthBusyProvider(provider);

    authPopupPollerRef.current = window.setInterval(async () => {
      if (!authPopupRef.current || !authPopupRef.current.closed) {
        return;
      }

      window.clearInterval(authPopupPollerRef.current);
      authPopupPollerRef.current = null;
      authPopupRef.current = null;

      if (authPopupHandledRef.current) {
        return;
      }

      authPopupHandledRef.current = true;

      try {
        const session = await refreshAuthSession();
        if (session?.accounts?.[provider]) {
          await hydrateSyncedState(session, { silent: true, force: true }).catch(() => null);
          pushNotification(`${provider === 'github' ? 'GitHub' : 'Microsoft'} connected.`);
        }
      } catch {
        pushNotification('Could not refresh account session after sign-in.', 'warning');
      } finally {
        setAuthBusyProvider(null);
      }
    }, 350);
  }

  async function handleDisconnectProvider(provider) {
    try {
      setAuthBusyProvider(provider);
      const session = await disconnectProvider(provider);
      hydratedSyncUserKeyRef.current = '';
      setAuthSession({
        ...DEFAULT_AUTH_SESSION,
        ...session,
        syncPreferences: {
          ...DEFAULT_AUTH_SESSION.syncPreferences,
          ...(session?.syncPreferences || {}),
        },
      });
      pushNotification(`${provider === 'github' ? 'GitHub' : 'Microsoft'} disconnected.`);
    } catch (error) {
      pushNotification(error instanceof Error ? error.message : 'Unable to disconnect account.', 'warning');
    } finally {
      setAuthBusyProvider(null);
    }
  }

  async function handleSetSyncProvider(provider) {
    try {
      const session = await updateSyncPreferences({ syncProvider: provider });
      setAuthSession({
        ...DEFAULT_AUTH_SESSION,
        ...session,
        syncPreferences: {
          ...DEFAULT_AUTH_SESSION.syncPreferences,
          ...(session?.syncPreferences || {}),
        },
      });
      await hydrateSyncedState(session, { silent: true, force: true }).catch(() => null);
      pushNotification(`Settings sync will use ${provider === 'github' ? 'GitHub' : 'Microsoft'}.`);
    } catch (error) {
      pushNotification(error instanceof Error ? error.message : 'Unable to update sync provider.', 'warning');
    }
  }

  async function handleToggleSyncPreference(key) {
    try {
      const nextPreferences = {
        ...authSession.syncPreferences,
        [key]: !authSession.syncPreferences?.[key],
      };
      const session = await updateSyncPreferences({ syncPreferences: nextPreferences });
      setAuthSession({
        ...DEFAULT_AUTH_SESSION,
        ...session,
        syncPreferences: {
          ...DEFAULT_AUTH_SESSION.syncPreferences,
          ...(session?.syncPreferences || {}),
        },
      });
    } catch (error) {
      pushNotification(error instanceof Error ? error.message : 'Unable to update sync preferences.', 'warning');
    }
  }

  async function handlePushSync(options = {}) {
    if (!authSession.syncProvider) {
      return;
    }

    try {
      setSyncBusy(true);
      const payload = buildSyncState();
      await pushSyncedState({ state: payload });
      await refreshAuthSession();
      if (!options.silent) {
        pushNotification('Settings sync pushed to cloud.');
      }
    } catch (error) {
      if (!options.silent) {
        pushNotification(error instanceof Error ? error.message : 'Unable to push synced state.', 'warning');
      }
    } finally {
      setSyncBusy(false);
    }
  }

  async function handlePullSync() {
    if (!authSession.syncProvider) {
      return;
    }

    await hydrateSyncedState(authSession, { force: true });
  }

  function closeCurrentModal() {
    setModalOpen(false);
    setModalType('');
  }

  function getActiveBreakpoints() {
    return Object.entries(debugBreakpoints).flatMap(([path, lines]) => {
      const node = workspace.findNode(path);
      const tab = workspace.tabs.find((entry) => entry.path === path);
      return [...lines]
        .sort((left, right) => left - right)
        .map((line) => ({
          path,
          line,
          name: node?.name || tab?.name || path.split('/').pop() || path,
        }));
    });
  }

  function updateDebugDiagnostics(editorInstance = editorRef.current, monacoInstance = monacoRef.current) {
    const model = editorInstance?.getModel?.();
    if (!model || !monacoInstance) {
      setDebugDiagnostics([]);
      return;
    }

    const markers = monacoInstance.editor.getModelMarkers({ resource: model.uri }).map((marker) => ({
      ...marker,
      severity:
        marker.severity === monacoInstance.MarkerSeverity.Error
          ? 'error'
          : marker.severity === monacoInstance.MarkerSeverity.Warning
            ? 'warning'
            : 'info',
    }));

    setDebugDiagnostics(markers);
  }

  function refreshBreakpointDecorations(editorInstance = editorRef.current, monacoInstance = monacoRef.current, tabId = workspace.activeTabId) {
    const editor = editorInstance;
    const monaco = monacoInstance;
    const activeId = tabId;

    if (!editor || !monaco || !activeId) {
      return;
    }

    const tab = workspace.tabs.find((entry) => entry.id === activeId);
    if (!tab) {
      return;
    }

    const lines = [...(debugBreakpoints[tab.path] || [])].sort((left, right) => left - right);
    breakpointDecorationsRef.current = editor.deltaDecorations(
      breakpointDecorationsRef.current,
      lines.map((line) => ({
        range: new monaco.Range(line, 1, line, 1),
        options: {
          isWholeLine: true,
          glyphMarginClassName: 'tilder-breakpoint-glyph',
          linesDecorationsClassName: 'tilder-breakpoint-line',
        },
      }))
    );
  }

  function toggleBreakpoint(path, line) {
    if (!path || !line) {
      return;
    }

    setDebugBreakpoints((current) => {
      const existing = new Set(current[path] || []);
      if (existing.has(line)) {
        existing.delete(line);
      } else {
        existing.add(line);
      }

      const next = { ...current };
      if (existing.size) {
        next[path] = [...existing].sort((left, right) => left - right);
      } else {
        delete next[path];
      }

      return next;
    });
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
    refreshAuthSession().catch((error) => {
      setAuthServiceStatus('error');
      setAuthServiceMessage(error instanceof Error ? error.message : 'Could not reach the Tilder auth server.');
    });
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

    if (tab.language === 'html') {
      if (livePreviewMode === 'tab') {
        if (openTabLivePreview()) {
          pushNotification(`Live preview opened in a new tab for ${tab.name}.`);
        }
      } else {
        openSplitLivePreview();
        pushNotification(`Live preview opened beside the editor for ${tab.name}.`);
      }
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

  function startLivePreviewResize() {
    if (!previewColumnOpen) {
      return;
    }

    setIsResizingLivePreview(true);
  }

  useEffect(() => {
    return () => {
      Object.values(saveTimersRef.current).forEach((timerId) => clearTimeout(timerId));
      clearTimeout(syncPushTimerRef.current);
      editorListenersCleanupRef.current();
      confirmationResolverRef.current?.(false);
      clearLivePreview();
      setLivePreviewDocument('');
      livePreviewWindowRef.current?.close?.();
      livePreviewChannelRef.current?.close?.();
    };
  }, []);

  const tabs = workspace.tabs;
  const activeTab = workspace.getActiveTab();
  const welcomeTab = welcomeTabOpen ? [{ id: '__welcome__', name: 'Welcome', dirty: false }] : [];
  const visibleTabs = [...welcomeTab, ...tabs];
  const tabActiveId = activeTab ? workspace.activeTabId : (welcomeTabOpen ? '__welcome__' : null);
  const hasSidebar = activePanel !== null;
  const showLivePreviewAction = activeTab?.language === 'html';
  const previewColumnOpen = livePreviewOpen && livePreviewMode === 'split' && showLivePreviewAction;
  const editorSurfaceHeight = useMemo(() => {
    const terminalOffset = terminalOpen ? terminalHeight : 0;
    return `calc(88.5vh - 46px - ${terminalOffset}px)`;
  }, [terminalHeight, terminalOpen]);
  const editorContentWidth = useMemo(() => {
    const baseWidth = hasSidebar ? '72vw' : '92vw';
    return previewColumnOpen ? `calc(${baseWidth} - ${livePreviewWidth + 10}px)` : baseWidth;
  }, [hasSidebar, livePreviewWidth, previewColumnOpen]);
  const maincodeareaStyle = useMemo(
    () => ({ width: hasSidebar ? '72vw' : '92vw', height: '88.5vh' }),
    [hasSidebar]
  );
  const monacoEditorStyle = useMemo(
    () => ({ width: editorContentWidth, height: editorSurfaceHeight, opacity: '1' }),
    [editorContentWidth, editorSurfaceHeight]
  );
  const contentSurfaceStyle = useMemo(
    () => ({ width: editorContentWidth, height: editorSurfaceHeight }),
    [editorContentWidth, editorSurfaceHeight]
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

  useEffect(() => {
    if (!isResizingLivePreview) {
      return undefined;
    }

    function handlePointerMove(event) {
      const bounds = mainCodeAreaRef.current?.getBoundingClientRect();
      if (!bounds) {
        return;
      }

      const nextWidth = Math.min(780, Math.max(280, bounds.right - event.clientX));
      setLivePreviewWidth(nextWidth);
    }

    function stopResizing() {
      setIsResizingLivePreview(false);
    }

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizingLivePreview]);

  useEffect(() => {
    if (!authSessionReadyRef.current || !authSession.syncProvider || applyingSyncStateRef.current) {
      return undefined;
    }

    const syncUserKey = getSyncUserKeyFromSession(authSession);
    if (!syncUserKey || hydratedSyncUserKeyRef.current !== syncUserKey) {
      return undefined;
    }

    if (!authSession.syncPreferences?.syncSettings && !authSession.syncPreferences?.syncLayout && !authSession.syncPreferences?.syncShortcuts) {
      return undefined;
    }

    clearTimeout(syncPushTimerRef.current);
    syncPushTimerRef.current = setTimeout(() => {
      handlePushSync({ silent: true });
    }, 1400);

    return () => clearTimeout(syncPushTimerRef.current);
  }, [
    activePanel,
    authSession.syncPreferences?.syncLayout,
    authSession.syncPreferences?.syncSettings,
    authSession.syncPreferences?.syncShortcuts,
    authSession.syncProvider,
    customKeybindings,
    livePreviewMode,
    livePreviewWidth,
    settings,
    terminalHeight,
    terminalOpen,
    welcomeTabOpen,
  ]);

  useEffect(() => {
    if (!authSessionReadyRef.current || applyingSyncStateRef.current) {
      return;
    }

    const syncUserKey = getSyncUserKeyFromSession(authSession);
    if (!syncUserKey || hydratedSyncUserKeyRef.current === syncUserKey) {
      return;
    }

    hydrateSyncedState(authSession, { silent: true, force: true }).catch(() => null);
  }, [authSession]);

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

    const update = () => {
      syncEditorStatus(editor);
      updateDebugDiagnostics(editor, monaco);
    };
    const model = editor.getModel?.();
    const listeners = [
      editor.onDidChangeCursorPosition(update),
      editor.onDidChangeCursorSelection(update),
      model?.onDidChangeContent(update),
      model?.onDidChangeOptions(update),
      editor.onMouseDown((event) => {
        if (event.target.type !== monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
          return;
        }

        const tab = workspace.getActiveTab();
        if (!tab) {
          return;
        }

        toggleBreakpoint(tab.path, event.target.position?.lineNumber);
      }),
    ].filter(Boolean);

    editorListenersCleanupRef.current = () => {
      listeners.forEach((listener) => listener.dispose());
    };

    update();
    refreshBreakpointDecorations(editor, monaco, workspace.activeTabId);
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

  function handleGoToFile() {
    openSearchPanel({ mode: 'files', query: '', scope: 'workspace' });
  }

  function handleGoToSymbolInWorkspace() {
    openSearchPanel({ mode: 'symbols', query: '', scope: 'workspace' });
  }

  function handleGoToSymbolInEditor() {
    runEditorAction('editor.action.quickOutline');
  }

  function handleGoToDefinition() {
    runEditorAction('editor.action.revealDefinition');
  }

  function handleGoToReferences() {
    runEditorAction('editor.action.goToReferences');
  }

  function getLivePreviewStorageKey() {
    return `${LIVE_PREVIEW_CHANNEL}:${LIVE_PREVIEW_ID}`;
  }

  function openLivePreviewWindow() {
    const previewUrl = `${window.location.origin}/live-preview.html?previewId=${encodeURIComponent(LIVE_PREVIEW_ID)}`;
    let previewWindow = livePreviewWindowRef.current;

    if (!previewWindow || previewWindow.closed) {
      previewWindow = window.open(previewUrl, 'tilder-live-preview');
      livePreviewWindowRef.current = previewWindow || null;
    } else {
      previewWindow.focus();
    }

    return previewWindow;
  }

  function publishLivePreview(payload) {
    try {
      localStorage.setItem(getLivePreviewStorageKey(), JSON.stringify(payload));
    } catch {
      // Ignore storage errors.
    }

    livePreviewChannelRef.current?.postMessage({
      type: 'render',
      previewId: LIVE_PREVIEW_ID,
      payload,
    });
  }

  function clearLivePreview() {
    try {
      localStorage.removeItem(getLivePreviewStorageKey());
    } catch {
      // Ignore storage errors.
    }

    livePreviewChannelRef.current?.postMessage({
      type: 'clear',
      previewId: LIVE_PREVIEW_ID,
    });
  }

  function openSplitLivePreview() {
    if (activeTab?.language !== 'html') {
      return;
    }

    clearLivePreview();
    livePreviewWindowRef.current?.close?.();
    livePreviewWindowRef.current = null;
    setLivePreviewMode('split');
    setLivePreviewOpen(true);
    setLivePreviewNonce((current) => current + 1);
  }

  function openTabLivePreview() {
    if (activeTab?.language !== 'html') {
      return false;
    }

    const previewWindow = openLivePreviewWindow();
    if (!previewWindow) {
      pushNotification('Allow popups to open the live preview tab.', 'warning');
      return false;
    }

    setLivePreviewMode('tab');
    setLivePreviewOpen(true);
    setLivePreviewNonce((current) => current + 1);
    return true;
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
    if (language !== 'html') {
      setLivePreviewOpen(false);
      setLivePreviewDocument('');
      clearLivePreview();
    }
    refresh();
  }

  function resolveRelativeWorkspacePath(fromPath, targetPath) {
    const trimmed = targetPath.trim();
    if (
      !trimmed ||
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('//') ||
      trimmed.startsWith('data:') ||
      trimmed.startsWith('#')
    ) {
      return null;
    }

    const sanitized = trimmed.split('?')[0].split('#')[0];
    const baseParts = fromPath.split('/').slice(0, -1);

    sanitized.split('/').forEach((segment) => {
      if (!segment || segment === '.') {
        return;
      }

      if (segment === '..') {
        baseParts.pop();
        return;
      }

      baseParts.push(segment);
    });

    return baseParts.join('/');
  }

  async function buildLivePreviewDocument(tab) {
    if (!tab || tab.language !== 'html') {
      return { document: '', url: '' };
    }

    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(tab.content ?? '', 'text/html');
    const attributeElements = parsedDocument.querySelectorAll('[src], link[href]');
    const tempUrls = [];

    for (const element of attributeElements) {
      const attribute = element.hasAttribute('src') ? 'src' : 'href';
      const originalValue = element.getAttribute(attribute) || '';
      const workspacePath = resolveRelativeWorkspacePath(tab.path || tab.name, originalValue);
      if (!workspacePath) {
        continue;
      }

      const node = workspace.findNode(workspacePath);
      if (!node || node.type !== 'file') {
        continue;
      }

      const openedTab = workspace.tabs.find((entry) => entry.path === workspacePath);
      const content = openedTab?.content ?? (node.isDraft ? node.content || '' : await workspace.readFile(node));
      const extension = node.name.includes('.') ? node.name.split('.').pop().toLowerCase() : '';
      const mimeTypes = {
        css: 'text/css',
        gif: 'image/gif',
        html: 'text/html',
        ico: 'image/x-icon',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        js: 'text/javascript',
        json: 'application/json',
        png: 'image/png',
        svg: 'image/svg+xml',
        webp: 'image/webp',
      };

      const objectUrl = URL.createObjectURL(new Blob([content], { type: mimeTypes[extension] || 'text/plain' }));
      tempUrls.push(objectUrl);
      element.setAttribute(attribute, objectUrl);
    }

    const finalDocument = `<!DOCTYPE html>\n${parsedDocument.documentElement.outerHTML}`;
    const finalUrl = URL.createObjectURL(new Blob([finalDocument], { type: 'text/html' }));
    tempUrls.forEach((url) => {
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    });

    return {
      document: finalDocument,
      url: finalUrl,
    };
  }

  function handleToggleLivePreview() {
    if (activeTab?.language !== 'html') {
      return;
    }

    setLivePreviewOpen((current) => {
      const next = !current;
      if (next) {
        setLivePreviewMode('split');
        setLivePreviewNonce((value) => value + 1);
      } else {
        clearLivePreview();
        setLivePreviewDocument('');
        livePreviewWindowRef.current?.close?.();
        livePreviewWindowRef.current = null;
      }
      return next;
    });
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

  function handleStartDebugging() {
    setActivePanel('debug');
    setDebugSession({
      status: 'running',
      mode: 'Debug',
      message: activeTab ? `Debugging ${activeTab.name}` : 'Open a file to debug.',
    });
    if (activeTab) {
      handleRunCurrentFile();
    }
  }

  function handleRunWithoutDebugging() {
    setActivePanel('debug');
    setDebugSession({
      status: 'running',
      mode: 'Run',
      message: activeTab ? `Running ${activeTab.name} without debugger` : 'Open a file to run.',
    });
    if (activeTab) {
      handleRunCurrentFile();
    }
  }

  function handlePauseDebugging() {
    setDebugSession((current) => ({
      ...current,
      status: 'paused',
      message: activeTab ? `Paused at line ${editorStatus.line} in ${activeTab.name}` : 'Paused.',
    }));
  }

  function handleContinueDebugging() {
    setDebugSession((current) => ({
      ...current,
      status: 'running',
      message: activeTab ? `Continuing ${activeTab.name}` : 'Continuing.',
    }));
  }

  function handleStopDebugging() {
    setDebugSession({
      status: 'idle',
      mode: 'Ready',
      message: 'Debug session stopped.',
    });
  }

  function handleRestartDebugging() {
    setDebugSession({
      status: 'running',
      mode: debugSession.mode === 'Ready' ? 'Debug' : debugSession.mode,
      message: activeTab ? `Restarted ${activeTab.name}` : 'Restarted.',
    });
    if (activeTab) {
      handleRunCurrentFile();
    }
  }

  function handleAddBreakpointAtCursor() {
    const tab = workspace.getActiveTab();
    if (!tab) {
      return;
    }
    toggleBreakpoint(tab.path, editorStatus.line || 1);
  }

  function handleClearBreakpoints() {
    setDebugBreakpoints({});
  }

  function handleRemoveBreakpoint(breakpoint) {
    toggleBreakpoint(breakpoint.path, breakpoint.line);
  }

  function handleAddWatch(expression) {
    setWatchExpressions((current) => (current.includes(expression) ? current : [...current, expression]));
  }

  function handleRemoveWatch(expression) {
    setWatchExpressions((current) => current.filter((entry) => entry !== expression));
  }

  const watchValues = useMemo(() => {
    const selection = editorRef.current?.getModel?.() && editorRef.current?.getSelection?.()
      ? editorRef.current.getModel().getValueInRange(editorRef.current.getSelection())
      : '';
    const context = {
      line: editorStatus.line,
      column: editorStatus.column,
      lines: editorStatus.lines,
      fileName: activeTab?.name || '',
      filePath: activeTab?.path || '',
      language: activeTab?.language || 'plaintext',
      selection,
      breakpoints: getActiveBreakpoints().length,
    };

    return watchExpressions.map((expression) => {
      try {
        const evaluator = new Function('context', `with (context) { return (${expression}); }`);
        const value = evaluator(context);
        return {
          expression,
          value: String(value),
        };
      } catch {
        return {
          expression,
          value: 'Unavailable',
        };
      }
    });
  }, [activeTab?.language, activeTab?.name, activeTab?.path, debugBreakpoints, editorStatus.column, editorStatus.line, editorStatus.lines, watchExpressions]);

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
      setDebugDiagnostics([]);
    }
  }, [activeTab?.id]);

  useEffect(() => {
    if (!livePreviewOpen || activeTab?.language !== 'html') {
      if (activeTab?.language !== 'html') {
        setLivePreviewDocument('');
        clearLivePreview();
      }
      return;
    }

    let cancelled = false;

    buildLivePreviewDocument(activeTab)
      .then(({ document, url }) => {
        if (!cancelled) {
          setLivePreviewDocument(document);
          if (livePreviewMode === 'tab') {
            publishLivePreview({
              previewId: LIVE_PREVIEW_ID,
              document,
              url,
              title: activeTab.name,
              path: activeTab.path,
              updatedAt: Date.now(),
            });
          }
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLivePreviewDocument('');
          clearLivePreview();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeTab?.content, activeTab?.id, livePreviewMode, livePreviewNonce, livePreviewOpen, version]);

  useEffect(() => {
    refreshBreakpointDecorations();
  }, [debugBreakpoints, workspace.activeTabId]);

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
    'workbench.action.quickOpen': () => handleGoToFile(),
    'workbench.action.gotoLine': () => handleGoToLine(),
    'workbench.action.gotoFile': () => handleGoToFile(),
    'workbench.action.gotoSymbolWorkspace': () => handleGoToSymbolInWorkspace(),
    'workbench.action.gotoSymbolEditor': () => handleGoToSymbolInEditor(),
    'editor.action.revealDefinition': () => handleGoToDefinition(),
    'editor.action.goToReferences': () => handleGoToReferences(),
    'workbench.action.debug.start': () => handleStartDebugging(),
    'workbench.action.debug.runWithoutDebugging': () => handleRunWithoutDebugging(),
    'workbench.action.debug.stop': () => handleStopDebugging(),
    'workbench.action.debug.restart': () => handleRestartDebugging(),
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
        <Account
          modalType={modalType}
          authSession={authSession}
          authServiceStatus={authServiceStatus}
          authServiceMessage={authServiceMessage}
          authBusyProvider={authBusyProvider}
          syncBusy={syncBusy}
          onStartOAuth={handleStartOAuth}
          onDisconnectProvider={handleDisconnectProvider}
          onSetSyncProvider={handleSetSyncProvider}
          onToggleSyncPreference={handleToggleSyncPreference}
          onPushSync={() => handlePushSync()}
          onPullSync={handlePullSync}
        />
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
          openSourceControl={() => setActivePanel('git')}
          openDebug={() => setActivePanel('debug')}
          goToFile={handleGoToFile}
          goToLine={handleGoToLine}
          goToSymbolInWorkspace={handleGoToSymbolInWorkspace}
          goToSymbolInEditor={handleGoToSymbolInEditor}
          goToDefinition={handleGoToDefinition}
          goToReferences={handleGoToReferences}
          openSplitLivePreview={() => {
            openSplitLivePreview();
            pushNotification(`Live preview opened beside the editor for ${activeTab?.name || 'HTML file'}.`);
          }}
          openTabLivePreview={() => {
            if (openTabLivePreview()) {
              pushNotification(`Live preview opened in a new tab for ${activeTab?.name || 'HTML file'}.`);
            }
          }}
          startDebugging={handleStartDebugging}
          runWithoutDebugging={handleRunWithoutDebugging}
          stopDebugging={handleStopDebugging}
          restartDebugging={handleRestartDebugging}
          toggleTerminal={() => toggleTerminalPanel()}
          accountAvatarUrl={activeAccount?.avatarUrl || ''}
          accountDisplayName={activeAccount?.displayName || activeAccount?.username || activeAccount?.email || ''}
          accountProvider={activeAccountProvider}
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
                showLivePreviewAction={showLivePreviewAction}
                livePreviewOpen={livePreviewOpen}
                livePreviewMode={livePreviewMode}
                onToggleLivePreview={handleToggleLivePreview}
                onOpenLivePreviewTab={() => {
                  if (openTabLivePreview()) {
                    pushNotification(`Live preview opened in a new tab for ${activeTab?.name || 'HTML file'}.`);
                  }
                }}
              />
              {activeTab ? (
                <BreadcrumbsBar activeTab={activeTab} rootName={workspace.rootName || workspace.getRootNode()?.name || ''} />
              ) : null}
              <div className={`editor-preview-row ${livePreviewOpen && showLivePreviewAction ? 'preview-open' : ''}`}>
                <div className="editor-preview-main">
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
                </div>
                {previewColumnOpen ? (
                  <div
                    className={`live-preview-resizer ${isResizingLivePreview ? 'is-active' : ''}`}
                    onMouseDown={startLivePreviewResize}
                    title="Resize Live Preview"
                  />
                ) : null}
                <LivePreview
                  isOpen={previewColumnOpen}
                  htmlDocument={livePreviewDocument}
                  width={livePreviewWidth}
                  onRefresh={() => setLivePreviewNonce((current) => current + 1)}
                  onOpenExternal={() => {
                    if (openTabLivePreview()) {
                      pushNotification(`Live preview opened in a new tab for ${activeTab?.name || 'HTML file'}.`);
                    }
                  }}
                  onClose={() => {
                    setLivePreviewOpen(false);
                    setLivePreviewDocument('');
                  }}
                />
              </div>
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
            <Git
              ariaExpandedisplaygit={panelDisplay('git')}
              workspace={workspace}
              workspaceVersion={version}
              authSession={authSession}
              pushNotification={pushNotification}
            />
            <Extensions ariaExpandedisplayextensions={panelDisplay('extensions')} />
            <GitHub
              ariaExpandedisplaygithub={panelDisplay('github')}
              authSession={authSession}
              openAccount={openAccount}
            />
            <Debug
              ariaExpandedisplaydebug={panelDisplay('debug')}
              activeTab={activeTab}
              debugSession={debugSession}
              breakpoints={getActiveBreakpoints()}
              watchValues={watchValues}
              diagnostics={debugDiagnostics}
              onStartDebugging={handleStartDebugging}
              onRunWithoutDebugging={handleRunWithoutDebugging}
              onPauseDebugging={handlePauseDebugging}
              onContinueDebugging={handleContinueDebugging}
              onStopDebugging={handleStopDebugging}
              onRestartDebugging={handleRestartDebugging}
              onRunCurrentFile={handleRunCurrentFile}
              onAddBreakpointAtCursor={handleAddBreakpointAtCursor}
              onClearBreakpoints={handleClearBreakpoints}
              onRemoveBreakpoint={handleRemoveBreakpoint}
              onAddWatch={handleAddWatch}
              onRemoveWatch={handleRemoveWatch}
            />
            <Search
              ariaExpandedisplaysearch={panelDisplay('search')}
              workspace={workspace}
              workspaceVersion={version}
              searchFocusNonce={searchFocusNonce}
              openSearchResult={handleOpenSearchResult}
              searchRequest={searchRequest}
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
