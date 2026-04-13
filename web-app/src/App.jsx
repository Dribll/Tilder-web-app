import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
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
import { getApiOrigin } from './core/apiBase.js';
import { beginOAuth, disconnectProvider, fetchAuthSession, openDesktopOAuthUrl, pollDesktopOAuth, pullSyncedState, pushSyncedState, updateSyncPreferences } from './core/accountApi.js';
import { describeLanguageIntelliSense, fetchEditorCapabilities } from './core/editorApi.js';
import { upsertEditorWorkspaceSession } from './core/editorSessionApi.js';
import { buildExtensionCatalog, EXTENSION_STATE_STORAGE_KEY, readStoredExtensionState } from './core/extensionsCatalog.js';
import { fetchExtensionMarketplace } from './core/extensionsMarketplaceApi.js';
import { getEffectiveBinding, KEYBINDING_COMMANDS } from './core/keybindings.js';
import { createLspBridge } from './core/lspBridge.js';
import { disposeExtensionsRuntime, syncExtensionsRuntime } from './core/extensionsRuntime.js';
import {
  buildMatcher,
  collectSymbols,
  getSearchPool,
  matchesPathFilters,
  readSearchContent,
} from './core/searchUtils.js';
import { fetchRunnerLanguages, formatLocalRunResult, formatRunResult, resolveRunnerLanguage, runCode, runCodeLocally } from './core/codeRunner.js';

const LIVE_PREVIEW_CHANNEL = 'tilder-live-preview';
const LIVE_PREVIEW_ID = 'primary';
const AUTO_SYNC_POLL_MS = 4000;
const AUTH_WAIT_NOTIFICATION_KEY = 'auth-waiting';
const AUTH_WAIT_NOTIFICATION_DELAY_MS = 1200;
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

const BUILT_IN_FEATURES = {
  explorer: true,
  search: true,
  commandCenter: true,
  quickNavigation: true,
  terminal: true,
  runDebug: true,
  livePreview: true,
  sourceControl: true,
  githubConnect: true,
  backendIntelliSense: true,
  notifications: true,
  accountHub: true,
};

const AVAILABLE_SIDEBAR_PANELS = ['filepioneer', 'search', 'git', 'github', 'debug'];

const DEFAULT_SIDEBAR_PANEL = 'filepioneer';

function getMonacoActionBindingLabel(editor, actionId) {
  try {
    return editor?._standaloneKeybindingService?.lookupKeybinding?.(actionId)?.getLabel?.() || '';
  } catch {
    return '';
  }
}

function collectMonacoCommandPaletteCommands(editor) {
  if (!editor?.getSupportedActions) {
    return [];
  }

  const actions = editor.getSupportedActions();
  if (!Array.isArray(actions)) {
    return [];
  }

  return actions
    .filter((action) => {
      const label = action?.label || action?.alias || '';
      return typeof action?.id === 'string' && label.trim();
    })
    .map((action) => ({
      id: action.id,
      label: action.label || action.alias,
      category: 'Editor',
      keywords: [action.alias, action.label, action.id].filter(Boolean),
      bindingLabel: getMonacoActionBindingLabel(editor, action.id),
      source: 'monaco',
    }));
}

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
  const [goOverlay, setGoOverlay] = useState({
    open: false,
    mode: 'line',
    value: '',
    results: [],
    loading: false,
    error: '',
  });
  const [confirmationRequest, setConfirmationRequest] = useState(null);
  const [welcomeTabOpen, setWelcomeTabOpen] = useState(true);
  const [createFolderRequestNonce, setCreateFolderRequestNonce] = useState(0);
  const [renameRequestNonce, setRenameRequestNonce] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(220);
  const [isResizingTerminal, setIsResizingTerminal] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(380);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
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
  const [extensionState, setExtensionState] = useState(() => readStoredExtensionState());
  const [searchFocusNonce, setSearchFocusNonce] = useState(0);
  const [searchRequest, setSearchRequest] = useState(null);
  const [marketplaceCatalog, setMarketplaceCatalog] = useState([]);
  const [marketplacePublishers, setMarketplacePublishers] = useState({});
  const [runnerLanguages, setRunnerLanguages] = useState([]);
  const [runnerLoading, setRunnerLoading] = useState(false);
  const [editorCapabilities, setEditorCapabilities] = useState({
    runtimeMode: 'unknown',
    lspBridge: {
      path: '/lsp',
      available: false,
      transport: 'socket.io',
    },
    languages: {},
  });
  const [editorCapabilitiesStatus, setEditorCapabilitiesStatus] = useState('loading');
  const [editorWorkspaceSession, setEditorWorkspaceSession] = useState(null);
  const [lspBridgeState, setLspBridgeState] = useState({
    status: 'idle',
    languageId: '',
    message: '',
  });
  const [livePreviewOpen, setLivePreviewOpen] = useState(false);
  const [livePreviewMode, setLivePreviewMode] = useState('split');
  const [livePreviewDocument, setLivePreviewDocument] = useState('');
  const [livePreviewNonce, setLivePreviewNonce] = useState(0);
  const [livePreviewWidth, setLivePreviewWidth] = useState(380);
  const [isResizingLivePreview, setIsResizingLivePreview] = useState(false);
  const [splitEditorOpen, setSplitEditorOpen] = useState(false);
  const [splitPaneGroups, setSplitPaneGroups] = useState([]);
  const [focusedSplitPaneIndex, setFocusedSplitPaneIndex] = useState(0);
  const [primaryGroupTabIds, setPrimaryGroupTabIds] = useState([]);
  const [primaryActiveTabId, setPrimaryActiveTabId] = useState(null);
  const [primaryPreviewTabId, setPrimaryPreviewTabId] = useState(null);
  const [splitPaneWeights, setSplitPaneWeights] = useState([1]);
  /** 'horizontal' = VS Code “split right” (side-by-side); 'vertical' = “split down” (stacked). */
  const [editorSplitDirection, setEditorSplitDirection] = useState('horizontal');
  const [isResizingEditorSplit, setIsResizingEditorSplit] = useState(false);
  const [activeEditorPane, setActiveEditorPane] = useState('primary');
  const [draggingTab, setDraggingTab] = useState(null);
  const [pinnedTabIds, setPinnedTabIds] = useState({});
  const closedEditorStackRef = useRef([]);
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
  const [commandPaletteEditorNonce, setCommandPaletteEditorNonce] = useState(0);
  const saveTimersRef = useRef({});
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const editorListenersCleanupRef = useRef(() => {});
  const splitEditorRefs = useRef(new Map());
  const splitMonacoRefs = useRef(new Map());
  const splitEditorListenersCleanupRef = useRef(new Map());
  const modalOpenRef = useRef(modalOpen);
  const modalTypeRef = useRef(modalType);
  const mainCodeAreaRef = useRef(null);
  const sideBarWrapperRef = useRef(null);
  const terminalApiRef = useRef(null);
  const confirmationResolverRef = useRef(null);
  const breakpointDecorationsRef = useRef([]);
  const splitBreakpointDecorationsRef = useRef(new Map());
  const livePreviewWindowRef = useRef(null);
  const livePreviewChannelRef = useRef(null);
  const syncPushTimerRef = useRef(null);
  const syncPollerRef = useRef(null);
  const applyingSyncStateRef = useRef(false);
  const authSessionReadyRef = useRef(false);
  const authPopupRef = useRef(null);
  const authPopupPollerRef = useRef(null);
  const authPopupHandledRef = useRef(false);
  const hydratedSyncUserKeyRef = useRef('');
  const lastSyncedPayloadHashRef = useRef('');
  const lastRemoteSyncUpdatedAtRef = useRef('');
  const editorCapabilityNoticeRef = useRef('');
  const editorWorkspaceSyncTimerRef = useRef(null);
  const lspBridgeRef = useRef(null);
  const [activeLspBridge, setActiveLspBridge] = useState(null);
  const goOverlayInputRef = useRef(null);
  const activeEditorPaneRef = useRef('primary');
  const editorSplitResizeRef = useRef({ index: 0, startX: 0, weights: [] });
  const groupMruRef = useRef({ primary: [], splits: {} });
  const extensionCatalog = useMemo(() => buildExtensionCatalog(marketplaceCatalog), [marketplaceCatalog]);
  const primaryActiveTabIdRef = useRef(primaryActiveTabId);
  const splitEditorOpenMountRef = useRef(splitEditorOpen);
  primaryActiveTabIdRef.current = primaryActiveTabId;
  splitEditorOpenMountRef.current = splitEditorOpen;

  useEffect(() => {
    localStorage.setItem('editorSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('tilderKeybindings', JSON.stringify(customKeybindings));
  }, [customKeybindings]);

  useEffect(() => {
    function syncExtensionState(event) {
      if (event?.type === 'storage' && event.key && event.key !== EXTENSION_STATE_STORAGE_KEY) {
        return;
      }
      setExtensionState(readStoredExtensionState());
    }

    window.addEventListener('storage', syncExtensionState);
    window.addEventListener('tilder:extensions-updated', syncExtensionState);
    return () => {
      window.removeEventListener('storage', syncExtensionState);
      window.removeEventListener('tilder:extensions-updated', syncExtensionState);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchExtensionMarketplace()
      .then((payload) => {
        if (cancelled) {
          return;
        }

        setMarketplaceCatalog(Array.isArray(payload.extensions) ? payload.extensions : []);
        setMarketplacePublishers(payload.publishers && typeof payload.publishers === 'object' ? payload.publishers : {});
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setMarketplaceCatalog([]);
        setMarketplacePublishers({});
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    syncExtensionsRuntime({
      catalog: extensionCatalog,
      extensionState,
      pushNotification,
      getWorkspaceSnapshot: () => ({
        rootName: workspace.rootName,
        activeTabId: workspace.activeTabId,
        tabs: workspace.tabs.map((tab) => ({ id: tab.id, name: tab.name, path: tab.path, language: tab.language })),
      }),
      getActiveTabSnapshot: () =>
        workspace.getActiveTab()
          ? {
              id: workspace.getActiveTab().id,
              name: workspace.getActiveTab().name,
              path: workspace.getActiveTab().path,
              language: workspace.getActiveTab().language,
            }
          : null,
    });
  }, [extensionCatalog, extensionState]);

  useEffect(() => () => disposeExtensionsRuntime(), []);

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
    activeEditorPaneRef.current = activeEditorPane;
  }, [activeEditorPane]);

  useEffect(() => {
    if (!goOverlay.open) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      goOverlayInputRef.current?.focus();
      goOverlayInputRef.current?.select?.();
    }, 0);

    function handleEscape(event) {
      if (event.key === 'Escape') {
        closeGoOverlay();
      }
    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [goOverlay.open]);

  useEffect(() => {
    if (!goOverlay.open || goOverlay.mode === 'line') {
      return undefined;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const query = String(goOverlay.value || '').trim();
      if (!query) {
        if (!cancelled) {
          setGoOverlay((current) => ({
            ...current,
            loading: false,
            error: '',
            results: [],
          }));
        }
        return;
      }

      setGoOverlay((current) => ({
        ...current,
        loading: true,
        error: '',
      }));

      try {
        const matcher = buildMatcher(query, {
          caseSensitive: false,
          wholeWord: false,
          useRegex: false,
        });

        if (!matcher) {
          if (!cancelled) {
            setGoOverlay((current) => ({
              ...current,
              loading: false,
              error: '',
              results: [],
            }));
          }
          return;
        }

        const sourceScope = goOverlay.mode === 'editor-symbol' ? 'open' : 'workspace';
        const pool = getSearchPool(workspace, sourceScope)
          .filter((entry) =>
            matchesPathFilters(entry.path, '', goOverlay.mode === 'editor-symbol' ? '' : 'node_modules, dist')
          )
          .filter((entry) =>
            goOverlay.mode === 'editor-symbol'
              ? activeTab
                ? entry.path === activeTab.path || entry.path === activeTab.id
                : false
              : true
          );

        if (goOverlay.mode === 'file') {
          const fileResults = pool
            .filter((entry) => {
              matcher.lastIndex = 0;
              return matcher.test(`${entry.name} ${entry.path}`);
            })
            .slice(0, 12)
            .map((entry) => ({
              kind: 'file',
              path: entry.path,
              name: entry.name,
              preview: entry.path,
            }));

          if (!cancelled) {
            setGoOverlay((current) => ({
              ...current,
              loading: false,
              error: '',
              results: fileResults,
            }));
          }
          return;
        }

        const symbolResults = [];

        for (const entry of pool) {
          const content = await readSearchContent(workspace, entry);
          if (!content) {
            continue;
          }

          const matches = collectSymbols(content)
            .filter((symbol) => {
              matcher.lastIndex = 0;
              return matcher.test(`${symbol.name} ${symbol.type}`);
            })
            .slice(0, 8)
            .map((symbol) => ({
              kind: 'symbol',
              path: entry.path,
              name: symbol.name,
              symbolType: symbol.type,
              line: symbol.line,
              column: symbol.column,
              preview: symbol.preview,
            }));

          symbolResults.push(...matches);
          if (symbolResults.length >= 20) {
            break;
          }
        }

        if (!cancelled) {
          setGoOverlay((current) => ({
            ...current,
            loading: false,
            error: '',
            results: symbolResults.slice(0, 20),
          }));
        }
      } catch (error) {
        if (!cancelled) {
          setGoOverlay((current) => ({
            ...current,
            loading: false,
            error: error instanceof Error ? error.message : 'Quick navigation failed.',
            results: [],
          }));
        }
      }
    }, 140);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [goOverlay.mode, goOverlay.open, goOverlay.value, version, workspace.activeTabId]);

  useEffect(() => {
    let active = true;
    const clearWakeNotification = armAuthWakeNotification();

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
        clearWakeNotification();
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setAuthServiceStatus('error');
        setAuthServiceMessage(error instanceof Error ? error.message : 'Could not reach the Tilder auth server.');
        authSessionReadyRef.current = true;
        clearWakeNotification();
      });

    return () => {
      active = false;
      clearWakeNotification();
    };
  }, []);

  useEffect(() => {
    let active = true;

    fetchEditorCapabilities()
      .then((capabilities) => {
        if (!active) {
          return;
        }

        setEditorCapabilities(capabilities);
        setEditorCapabilitiesStatus('ready');
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setEditorCapabilitiesStatus('error');
      });

    return () => {
      active = false;
    };
  }, [workspace.getActiveTab()?.language]);

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
      const apiOrigin = getApiOrigin();

      if (apiOrigin) {
        origins.add(apiOrigin);
      }

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
    if (!builtInFeatures.search) {
      notifyExtensionDisabled('Search Navigator');
      return;
    }
    setActivePanel('search');
    setSearchRequest(request ? { ...request, nonce: Date.now() } : null);
    setSearchFocusNonce((current) => current + 1);
  }

  function openCommandPalette() {
    if (!builtInFeatures.commandCenter) {
      notifyExtensionDisabled('Command Center');
      return;
    }
    setCommandPaletteOpen(true);
  }

  function closeCommandPalette() {
    setCommandPaletteOpen(false);
  }

  function openGoOverlay(mode = 'line', value = '') {
    setGoOverlay({
      open: true,
      mode,
      value,
      results: [],
      loading: false,
      error: '',
    });
  }

  function closeGoOverlay() {
    setGoOverlay({
      open: false,
      mode: 'line',
      value: '',
      results: [],
      loading: false,
      error: '',
    });
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

  function upsertNotification(key, message, tone = 'info') {
    setNotifications((current) => {
      const existing = current.find((entry) => entry.key === key);
      const nextEntry = {
        id: existing?.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        key,
        message,
        tone,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };

      if (!existing) {
        return [nextEntry, ...current].slice(0, 20);
      }

      return current.map((entry) => (entry.key === key ? nextEntry : entry));
    });
  }

  function removeNotificationByKey(key) {
    setNotifications((current) => current.filter((entry) => entry.key !== key));
  }

  const builtInFeatures = BUILT_IN_FEATURES;

  const availableSidebarPanels = AVAILABLE_SIDEBAR_PANELS;

  function firstAvailableSidebarPanel() {
    return availableSidebarPanels[0] || null;
  }

  function notifyExtensionDisabled(featureName) {
    pushNotification(`${featureName} is built into Tilder and always available.`, 'info');
  }

  function isPanelAvailable(panel) {
    return AVAILABLE_SIDEBAR_PANELS.includes(panel) || panel === 'codeblocks' || panel === 'extensions';
  }

  useEffect(() => {
    if (activePanel && !isPanelAvailable(activePanel)) {
      setActivePanel(firstAvailableSidebarPanel());
    }
  }, [activePanel]);

  function armAuthWakeNotification() {
    if (typeof window === 'undefined') {
      return () => {};
    }

    const apiOrigin = getApiOrigin();
    if (!apiOrigin || apiOrigin === window.location.origin) {
      return () => {};
    }

    const timer = window.setTimeout(() => {
      upsertNotification(
        AUTH_WAIT_NOTIFICATION_KEY,
        'Settings sync waiting for the account service to wake up...',
        'info'
      );
    }, AUTH_WAIT_NOTIFICATION_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      removeNotificationByKey(AUTH_WAIT_NOTIFICATION_KEY);
    };
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
        sidebarWidth,
        welcomeTabOpen,
      };
    }

    return nextState;
  }

  function serializeSyncState(state) {
    try {
      return JSON.stringify(state || {});
    } catch {
      return '';
    }
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
      setSidebarWidth(Math.min(620, Math.max(280, Number(nextState.layout.sidebarWidth) || 380)));
      setWelcomeTabOpen(nextState.layout.welcomeTabOpen !== false);
    }

    setTimeout(() => {
      applyingSyncStateRef.current = false;
    }, 0);
  }

  async function refreshAuthSession() {
    const clearWakeNotification = armAuthWakeNotification();

    try {
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
    } finally {
      clearWakeNotification();
    }
  }

  function getSyncUserKeyFromSession(session) {
    const provider = session?.syncProvider;
    const accountId = provider ? session?.accounts?.[provider]?.id : null;
    return provider && accountId ? `${provider}:${accountId}` : '';
  }

  async function hydrateSyncedState(session, options = {}) {
    const { silent = false, force = false, recheck = false, background = false } = options;
    const syncUserKey = getSyncUserKeyFromSession(session);

    if (!syncUserKey) {
      hydratedSyncUserKeyRef.current = '';
      lastSyncedPayloadHashRef.current = '';
      lastRemoteSyncUpdatedAtRef.current = '';
      return null;
    }

    if (!force && !recheck && hydratedSyncUserKeyRef.current === syncUserKey) {
      return null;
    }

    try {
      if (!background) {
        setSyncBusy(true);
      }
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

      const remoteUpdatedAt = typeof response?.updatedAt === 'string' ? response.updatedAt : '';
      const remotePayloadHash = response?.state ? serializeSyncState(response.state) : '';
      const shouldApplyState =
        Boolean(response?.state) &&
        (force || remoteUpdatedAt !== lastRemoteSyncUpdatedAtRef.current || remotePayloadHash !== lastSyncedPayloadHashRef.current);

      if (shouldApplyState) {
        applySyncedState(response.state);
      }

      hydratedSyncUserKeyRef.current = syncUserKey;
      lastRemoteSyncUpdatedAtRef.current = remoteUpdatedAt;
      if (remotePayloadHash) {
        lastSyncedPayloadHashRef.current = remotePayloadHash;
      }

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
      if (!background) {
        setSyncBusy(false);
      }
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

  async function handleStartOAuth(provider) {
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

    let oauthFlow = null;

    try {
      oauthFlow = await beginOAuth(provider);
    } catch (error) {
      pushNotification(error instanceof Error ? error.message : 'Could not start sign-in.', 'warning');
      return;
    }

    authPopupHandledRef.current = false;
    if (authPopupPollerRef.current) {
      window.clearInterval(authPopupPollerRef.current);
      authPopupPollerRef.current = null;
    }

    if (oauthFlow?.mode === 'desktop' && oauthFlow.desktopSessionId) {
      try {
        if (!oauthFlow.authorizeUrl) {
          throw new Error('Could not prepare the GitHub OAuth URL.');
        }

        await openDesktopOAuthUrl(oauthFlow.authorizeUrl);
      } catch (error) {
        pushNotification(error instanceof Error ? error.message : 'Could not open your browser for sign-in.', 'warning');
        return;
      }

      setAuthBusyProvider(provider);
      pushNotification(
        `Browser opened for ${provider === 'github' ? 'GitHub' : 'Microsoft'} sign-in. Finish the OAuth flow there, then return to Tilder.`,
        'info'
      );

      authPopupPollerRef.current = window.setInterval(async () => {
        try {
          const result = await pollDesktopOAuth(oauthFlow.desktopSessionId);

          if (result?.status === 'pending') {
            return;
          }

          window.clearInterval(authPopupPollerRef.current);
          authPopupPollerRef.current = null;
          authPopupHandledRef.current = true;

          if (result?.status === 'complete' && result.session) {
            const session = {
              ...DEFAULT_AUTH_SESSION,
              ...result.session,
              syncPreferences: {
                ...DEFAULT_AUTH_SESSION.syncPreferences,
                ...(result.session?.syncPreferences || {}),
              },
            };

            setAuthSession(session);
            await hydrateSyncedState(session, { silent: true, force: true }).catch(() => null);
            pushNotification(`${provider === 'github' ? 'GitHub' : 'Microsoft'} connected.`);
          } else if (result?.status === 'error') {
            pushNotification(result.message || 'Authentication failed.', 'warning');
          }
        } catch (error) {
          window.clearInterval(authPopupPollerRef.current);
          authPopupPollerRef.current = null;
          pushNotification(error instanceof Error ? error.message : 'Could not complete sign-in.', 'warning');
        } finally {
          setAuthBusyProvider(null);
        }
      }, 1200);

      return;
    }

    if (!oauthFlow?.window) {
      pushNotification(`Allow popups to connect ${provider === 'github' ? 'GitHub' : 'Microsoft'}.`, 'warning');
      return;
    }

    authPopupRef.current = oauthFlow.window;
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

    const { silent = false, background = false, force = false } = options;

    try {
      const payload = buildSyncState();
      const payloadHash = serializeSyncState(payload);

      if (!force && payloadHash && payloadHash === lastSyncedPayloadHashRef.current) {
        return;
      }

      if (!background) {
        setSyncBusy(true);
      }

      const response = await pushSyncedState({ state: payload });
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

      lastSyncedPayloadHashRef.current = payloadHash;
      if (typeof response?.updatedAt === 'string') {
        lastRemoteSyncUpdatedAtRef.current = response.updatedAt;
      }

      if (!silent) {
        pushNotification('Settings sync pushed to cloud.');
      }
    } catch (error) {
      if (!silent) {
        pushNotification(error instanceof Error ? error.message : 'Unable to push synced state.', 'warning');
      }
    } finally {
      if (!background) {
        setSyncBusy(false);
      }
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

  function updateDebugDiagnostics(editorInstance = getPreferredEditor(), monacoInstance = getPreferredMonaco()) {
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

  function refreshBreakpointDecorations(
    editorInstance = getPreferredEditor(),
    monacoInstance = getPreferredMonaco(),
    tabId = workspace.activeTabId,
    decorationsRef = breakpointDecorationsRef
  ) {
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
    decorationsRef.current = editor.deltaDecorations(
      decorationsRef.current,
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
    if (!builtInFeatures.accountHub) {
      notifyExtensionDisabled('Account Hub');
      return;
    }

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
    if (!builtInFeatures.terminal) {
      notifyExtensionDisabled('Terminal Deck');
      return;
    }
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
    const tab = getFocusedTab() || workspace.getActiveTab();
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
    if (!builtInFeatures.commandCenter) {
      notifyExtensionDisabled('Command Center');
      return;
    }

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

  function startSidebarResize() {
    if (!hasSidebar) {
      return;
    }

    setIsResizingSidebar(true);
  }

  useEffect(() => {
    return () => {
      Object.values(saveTimersRef.current).forEach((timerId) => clearTimeout(timerId));
      clearTimeout(syncPushTimerRef.current);
      clearTimeout(editorWorkspaceSyncTimerRef.current);
      editorListenersCleanupRef.current();
      splitEditorListenersCleanupRef.current.forEach((cleanup) => cleanup?.());
      confirmationResolverRef.current?.(false);
      clearLivePreview();
      setLivePreviewDocument('');
      livePreviewWindowRef.current?.close?.();
      livePreviewChannelRef.current?.close?.();
      lspBridgeRef.current?.dispose?.();
    };
  }, []);

  const tabs = workspace.tabs;
  const activeTab = workspace.getActiveTab();
  const welcomeTab = welcomeTabOpen ? [{ id: '__welcome__', name: 'Welcome', dirty: false }] : [];
  const visibleTabs = [...welcomeTab, ...tabs];
  const primaryGroupTabs = primaryGroupTabIds
    .map((id) => visibleTabs.find((tab) => tab.id === id))
    .filter(Boolean);
  function orderTabsForView(list = []) {
    const pinned = [];
    const regular = [];
    list.forEach((tab) => {
      if (pinnedTabIds[tab.id]) {
        pinned.push({ ...tab, pinned: true });
      } else {
        regular.push({ ...tab, pinned: false });
      }
    });
    return [...pinned, ...regular];
  }
  const primaryPaneEditorTab =
    splitEditorOpen && primaryActiveTabId && primaryActiveTabId !== '__welcome__'
      ? workspace.tabs.find((t) => t.id === primaryActiveTabId) || null
      : !splitEditorOpen
        ? activeTab
        : null;
  const splitPrimaryWelcomeOpen = splitEditorOpen && (primaryActiveTabId === '__welcome__' || (!primaryPaneEditorTab && welcomeTabOpen));
  const splitPrimaryDefaultOpen = splitEditorOpen && !primaryPaneEditorTab && !welcomeTabOpen;
  const tabActiveId = activeTab ? workspace.activeTabId : (welcomeTabOpen ? '__welcome__' : null);
  const focusedSplitGroup = splitPaneGroups[focusedSplitPaneIndex] || null;
  const focusedSplitTab =
    focusedSplitGroup?.activeTabId && focusedSplitGroup.activeTabId !== '__welcome__'
      ? workspace.tabs.find((tab) => tab.id === focusedSplitGroup.activeTabId) || null
      : null;
  const hasSidebar = Boolean(activePanel && isPanelAvailable(activePanel));
  const livePreviewContextTab =
    splitEditorOpen && activeEditorPane === 'primary'
      ? primaryPaneEditorTab
      : splitEditorOpen && activeEditorPane === 'secondary'
        ? focusedSplitTab
        : activeTab;
  const showLivePreviewAction = builtInFeatures.livePreview && livePreviewContextTab?.language === 'html';
  const previewColumnOpen = livePreviewOpen && livePreviewMode === 'split' && showLivePreviewAction;
  const editorSurfaceHeight = useMemo(() => {
    const terminalOffset = terminalOpen ? terminalHeight : 0;
    return `calc(88.5vh - 46px - ${terminalOffset}px)`;
  }, [terminalHeight, terminalOpen]);
  const sidebarPanelWidth = useMemo(() => (hasSidebar ? sidebarWidth : 0), [hasSidebar, sidebarWidth]);
  const editorContentWidth = useMemo(() => {
    const baseWidth = hasSidebar ? `calc(95vw - ${sidebarPanelWidth}px)` : '92vw';
    return previewColumnOpen ? `calc(${baseWidth} - ${livePreviewWidth + 10}px)` : baseWidth;
  }, [hasSidebar, livePreviewWidth, previewColumnOpen, sidebarPanelWidth]);
  const maincodeareaStyle = useMemo(
    () => ({ width: hasSidebar ? `calc(95vw - ${sidebarPanelWidth}px)` : '92vw', height: '88.5vh' }),
    [hasSidebar, sidebarPanelWidth]
  );
  const sideBarWrapperStyle = useMemo(
    () => (hasSidebar
      ? {
          width: `${sidebarPanelWidth}px`,
          '--sidebar-content-width': `${Math.max(240, sidebarPanelWidth - 58)}px`,
        }
      : {}),
    [hasSidebar, sidebarPanelWidth]
  );
  const monacoEditorStyle = useMemo(
    () => ({ width: editorContentWidth, height: editorSurfaceHeight, opacity: '1' }),
    [editorContentWidth, editorSurfaceHeight]
  );
  const splitMonacoEditorStyle = useMemo(
    () => ({ width: '100%', height: editorSurfaceHeight, opacity: '1' }),
    [editorSurfaceHeight]
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
    () => {
      const baseCommands = KEYBINDING_COMMANDS.map((command) => ({
        ...command,
        bindingLabel: formatBindingLabel(effectiveBindings[command.id]),
      }));
      const preferredEditor = getPreferredEditor();
      const monacoCommands = collectMonacoCommandPaletteCommands(preferredEditor);
      const merged = new Map();

      baseCommands.forEach((command) => {
        merged.set(command.id, command);
      });

      monacoCommands.forEach((command) => {
        const existing = merged.get(command.id);
        if (existing) {
          merged.set(command.id, {
            ...existing,
            label: command.label || existing.label,
            keywords: [...new Set([...(existing.keywords || []), ...(command.keywords || [])])],
            bindingLabel: existing.bindingLabel || command.bindingLabel || '',
          });
          return;
        }

        merged.set(command.id, command);
      });

      return [...merged.values()];
    },
    [activeEditorPane, activeTab?.id, commandPaletteEditorNonce, effectiveBindings, focusedSplitPaneIndex, focusedSplitTab?.id, primaryActiveTabId, splitEditorOpen, version]
  );

  function touchGroupMru(groupKey, tabId) {
    if (!tabId || tabId === '__welcome__') {
      return;
    }
    if (groupKey === 'primary') {
      const bucket = groupMruRef.current.primary.filter((id) => id !== tabId);
      bucket.unshift(tabId);
      groupMruRef.current.primary = bucket.slice(0, 48);
      return;
    }
    const prev = groupMruRef.current.splits[groupKey] || [];
    const bucket = prev.filter((id) => id !== tabId);
    bucket.unshift(tabId);
    groupMruRef.current.splits[groupKey] = bucket.slice(0, 48);
  }

  function removeTabFromAllMru(tabId) {
    groupMruRef.current.primary = groupMruRef.current.primary.filter((id) => id !== tabId);
    Object.keys(groupMruRef.current.splits).forEach((k) => {
      groupMruRef.current.splits[k] = (groupMruRef.current.splits[k] || []).filter((id) => id !== tabId);
    });
  }

  function removeTabFromGroupMru(groupKey, tabId) {
    if (groupKey === 'primary') {
      groupMruRef.current.primary = groupMruRef.current.primary.filter((id) => id !== tabId);
    } else if (groupMruRef.current.splits[groupKey]) {
      groupMruRef.current.splits[groupKey] = groupMruRef.current.splits[groupKey].filter((id) => id !== tabId);
    }
  }

  function isTabReferencedOutsideGroup(tabId, groupId) {
    if (!tabId) {
      return false;
    }
    if (groupId !== 'primary' && primaryGroupTabIds.includes(tabId)) {
      return true;
    }
    return splitPaneGroups.some((group) => group.id !== groupId && group.tabIds.includes(tabId));
  }

  async function closeWorkspaceTabEntry(tabId, tab, { discardUntitled = false } = {}) {
    if (discardUntitled && tab?.isUntitled) {
      const draftNode = tab.path ? workspace.findNode(tab.path) : null;
      if (draftNode?.isDraft) {
        await workspace.deleteNode(draftNode.path);
        return;
      }
    }

    workspace.closeTab(tabId);
  }

  function resolveFocusedGroupForClose() {
    if (!splitEditorOpen || activeEditorPane === 'primary') {
      return 'primary';
    }
    return splitPaneGroups[focusedSplitPaneIndex]?.id ?? 'primary';
  }

  function pickNextActiveFromMru(tabIds, removedId, groupKey) {
    const mru =
      groupKey === 'primary'
        ? groupMruRef.current.primary
        : groupMruRef.current.splits[groupKey] || [];
    for (const id of mru) {
      if (id !== removedId && tabIds.includes(id)) {
        return id;
      }
    }
    return tabIds.find((id) => id !== '__welcome__') || tabIds[0] || null;
  }

  function forceCloseTabSilently(tabId, { skipClosedStack = true } = {}) {
    if (!tabId || tabId === '__welcome__') {
      return;
    }
    delete saveTimersRef.current[tabId];
    const tab = workspace.tabs.find((entry) => entry.id === tabId);
    if (!skipClosedStack && tab) {
      closedEditorStackRef.current = [{ id: tab.id, path: tab.path, name: tab.name }, ...closedEditorStackRef.current].slice(0, 50);
    }
    setPinnedTabIds((current) => {
      if (!current[tabId]) {
        return current;
      }
      const next = { ...current };
      delete next[tabId];
      return next;
    });
    setPrimaryPreviewTabId((p) => (p === tabId ? null : p));
    setPrimaryGroupTabIds((current) => current.filter((id) => id !== tabId));
    setSplitPaneGroups((current) =>
      current
        .map((group) => {
          const nextTabIds = group.tabIds.filter((paneId) => paneId !== tabId);
          const nextPreview = group.previewTabId === tabId ? null : group.previewTabId;
          const nextActive =
            group.activeTabId === tabId
              ? pickNextActiveFromMru(nextTabIds, tabId, group.id) ||
                nextTabIds.find((paneId) => paneId !== '__welcome__') ||
                nextTabIds[0] ||
                null
              : group.activeTabId;
          if (!nextActive) {
            return null;
          }
          return { ...group, tabIds: nextTabIds, activeTabId: nextActive, previewTabId: nextPreview };
        })
        .filter(Boolean)
    );
    removeTabFromAllMru(tabId);
    workspace.closeTab(tabId);
  }

  function getDefaultSplitTabId() {
    if (workspace.activeTabId) {
      return workspace.activeTabId;
    }

    const firstTab = workspace.tabs[0];
    return firstTab?.id || (welcomeTabOpen ? '__welcome__' : null);
  }

  function getPreferredEditor() {
    if (activeEditorPaneRef.current === 'secondary') {
      return splitEditorRefs.current.get(focusedSplitPaneIndex) || null;
    }

    return editorRef.current;
  }

  function getPreferredMonaco() {
    if (activeEditorPaneRef.current === 'secondary') {
      return splitMonacoRefs.current.get(focusedSplitPaneIndex) || null;
    }

    return monacoRef.current;
  }

  function getFocusedTab() {
    if (splitEditorOpen && activeEditorPane === 'secondary' && focusedSplitTab) {
      return focusedSplitTab;
    }
    if (splitEditorOpen && activeEditorPane === 'primary') {
      if (primaryActiveTabId === '__welcome__') {
        return null;
      }
      if (primaryActiveTabId) {
        return workspace.tabs.find((t) => t.id === primaryActiveTabId) || workspace.getActiveTab();
      }
    }
    return workspace.getActiveTab();
  }

  function openSplitEditorRight(tabId = null) {
    const lastGroup = splitPaneGroups[splitPaneGroups.length - 1];
    const nextTabId = tabId || lastGroup?.activeTabId || getDefaultSplitTabId();
    if (!nextTabId) {
      return;
    }

    setSplitEditorOpen(true);
    setEditorSplitDirection('horizontal');
    const newGroupId = `group-${Date.now()}-${splitPaneGroups.length}`;
    const newGroup = {
      id: newGroupId,
      activeTabId: nextTabId,
      tabIds: [nextTabId],
      previewTabId: null,
    };
    setSplitPaneGroups((current) => {
      const merged = [...current, newGroup];
      setFocusedSplitPaneIndex(merged.length - 1);
      return merged;
    });
    setActiveEditorPane('secondary');
    if (nextTabId !== '__welcome__') {
      workspace.setActiveTab(nextTabId);
    } else {
      workspace.activeTabId = null;
    }
    touchGroupMru(newGroupId, nextTabId);
  }

  /** VS Code workbench.action.splitEditorDown — new group below (column layout). */
  function openSplitEditorDown(tabId = null) {
    const lastGroup = splitPaneGroups[splitPaneGroups.length - 1];
    const nextTabId = tabId || lastGroup?.activeTabId || getDefaultSplitTabId();
    if (!nextTabId) {
      return;
    }

    setSplitEditorOpen(true);
    setEditorSplitDirection('vertical');
    const newGroupId = `group-${Date.now()}-${splitPaneGroups.length}`;
    const newGroup = {
      id: newGroupId,
      activeTabId: nextTabId,
      tabIds: [nextTabId],
      previewTabId: null,
    };
    setSplitPaneGroups((current) => {
      const merged = [...current, newGroup];
      setFocusedSplitPaneIndex(merged.length - 1);
      return merged;
    });
    setActiveEditorPane('secondary');
    if (nextTabId !== '__welcome__') {
      workspace.setActiveTab(nextTabId);
    } else {
      workspace.activeTabId = null;
    }
    touchGroupMru(newGroupId, nextTabId);
  }

  function closeSplitEditor() {
    setSplitEditorOpen(false);
    setSplitPaneGroups([]);
    setFocusedSplitPaneIndex(0);
    setEditorSplitDirection('horizontal');
    setActiveEditorPane('primary');
  }

  function assignTabToFocusedGroup(tabId, { preview = false } = {}) {
    if (!tabId) {
      return;
    }

    const focusedSecondary = splitEditorOpen && activeEditorPane === 'secondary';

    // Preview only controls which tab shows the italic "preview" styling — do not close the
    // previous preview in the workspace. Otherwise each new file from the explorer replaces the
    // last tab and you never get multiple files stacked in a split (or primary) group.

    if (focusedSecondary) {
      const focusedGroupId = splitPaneGroups[focusedSplitPaneIndex]?.id;
      setSplitPaneGroups((current) =>
        current.map((group, index) => {
          if (index !== focusedSplitPaneIndex) {
            return group;
          }
          const nextIds = group.tabIds.includes(tabId) ? group.tabIds : [...group.tabIds, tabId];
          const nextPreview = preview ? tabId : group.previewTabId === tabId ? null : group.previewTabId;
          return { ...group, tabIds: nextIds, activeTabId: tabId, previewTabId: nextPreview };
        })
      );
      if (tabId !== '__welcome__') {
        workspace.setActiveTab(tabId);
      } else {
        workspace.activeTabId = null;
      }
      if (focusedGroupId) {
        touchGroupMru(focusedGroupId, tabId);
      }
      return;
    }

    setPrimaryPreviewTabId((p) => {
      if (preview) {
        return tabId;
      }
      if (p === tabId) {
        return null;
      }
      return p;
    });
    setPrimaryGroupTabIds((cur) => (cur.includes(tabId) ? cur : [...cur, tabId]));
    setPrimaryActiveTabId(tabId);
    if (tabId !== '__welcome__') {
      workspace.setActiveTab(tabId);
    } else {
      workspace.activeTabId = null;
    }
    touchGroupMru('primary', tabId);
  }

  function assignTabToPrimaryGroup(tabId) {
    if (!tabId) {
      return;
    }
    setPrimaryGroupTabIds((current) => (current.includes(tabId) ? current : [...current, tabId]));
  }

  function focusNextSplitGroup() {
    if (!splitPaneGroups.length) return;
    const nextIndex = (focusedSplitPaneIndex + 1) % splitPaneGroups.length;
    setFocusedSplitPaneIndex(nextIndex);
    setActiveEditorPane('secondary');
  }

  function focusPreviousSplitGroup() {
    if (!splitPaneGroups.length) return;
    const nextIndex = (focusedSplitPaneIndex - 1 + splitPaneGroups.length) % splitPaneGroups.length;
    setFocusedSplitPaneIndex(nextIndex);
    setActiveEditorPane('secondary');
  }

  function closeFocusedSplitGroup() {
    if (!splitPaneGroups.length) {
      closeSplitEditor();
      return;
    }
    setSplitPaneGroups((current) => {
      const next = current.filter((_, index) => index !== focusedSplitPaneIndex);
      if (!next.length) {
        setSplitEditorOpen(false);
        setFocusedSplitPaneIndex(0);
        setActiveEditorPane('primary');
        return [];
      }
      const nextIndex = Math.min(focusedSplitPaneIndex, next.length - 1);
      setFocusedSplitPaneIndex(nextIndex);
      return next;
    });
  }

  function moveActiveEditorToAdjacentGroup(direction = 'next') {
    if (!splitPaneGroups.length) return;
    const source = splitPaneGroups[focusedSplitPaneIndex];
    const tabId = source?.activeTabId;
    if (!tabId || tabId === '__welcome__') return;
    const targetIndex =
      direction === 'previous'
        ? (focusedSplitPaneIndex - 1 + splitPaneGroups.length) % splitPaneGroups.length
        : (focusedSplitPaneIndex + 1) % splitPaneGroups.length;
    setSplitPaneGroups((current) =>
      current
        .map((group, index) => {
          if (index === focusedSplitPaneIndex) {
            const nextTabIds = group.tabIds.filter((id) => id !== tabId);
            const nextActive =
              group.activeTabId === tabId
                ? pickNextActiveFromMru(nextTabIds, tabId, group.id) || nextTabIds[0] || null
                : group.activeTabId;
            const nextPv = group.previewTabId === tabId ? null : group.previewTabId;
            if (!nextActive) return null;
            return { ...group, tabIds: nextTabIds, activeTabId: nextActive, previewTabId: nextPv };
          }
          if (index === targetIndex) {
            const nextTabIds = group.tabIds.includes(tabId) ? group.tabIds : [...group.tabIds, tabId];
            return {
              ...group,
              tabIds: nextTabIds,
              activeTabId: tabId,
              previewTabId: group.previewTabId === tabId ? group.previewTabId : null,
            };
          }
          return group;
        })
        .filter((group) => group.activeTabId)
    );
    setFocusedSplitPaneIndex(targetIndex);
    setActiveEditorPane('secondary');
  }

  function togglePinTab(tabId) {
    if (!tabId) return;
    setPinnedTabIds((current) => ({ ...current, [tabId]: !current[tabId] }));
    setPrimaryPreviewTabId((p) => (p === tabId ? null : p));
    setSplitPaneGroups((current) =>
      current.map((group) => (group.previewTabId === tabId ? { ...group, previewTabId: null } : group))
    );
  }

  function togglePinFocusedTab() {
    const focused = getFocusedTab();
    if (focused?.id) {
      togglePinTab(focused.id);
    }
  }

  function handleTabDragStart(tabId, sourceGroupId, sourceIndex = null) {
    setDraggingTab({ tabId, sourceGroupId, sourceIndex });
  }

  function handleGroupTabDrop(targetGroupId, insertBeforeIndex = null) {
    if (!draggingTab?.tabId || !targetGroupId) {
      setDraggingTab(null);
      return;
    }
    const { tabId, sourceGroupId, sourceIndex } = draggingTab;

    if (sourceGroupId === targetGroupId && insertBeforeIndex != null && sourceIndex != null) {
      if (targetGroupId === 'primary') {
        setPrimaryGroupTabIds((cur) => {
          const next = [...cur];
          const [item] = next.splice(sourceIndex, 1);
          let dest = insertBeforeIndex;
          if (sourceIndex < insertBeforeIndex) {
            dest -= 1;
          }
          next.splice(dest, 0, item);
          return next;
        });
      } else {
        setSplitPaneGroups((cur) =>
          cur.map((group) => {
            if (group.id !== targetGroupId) {
              return group;
            }
            const next = [...group.tabIds];
            const [item] = next.splice(sourceIndex, 1);
            let dest = insertBeforeIndex;
            if (sourceIndex < insertBeforeIndex) {
              dest -= 1;
            }
            next.splice(dest, 0, item);
            return { ...group, tabIds: next };
          })
        );
      }
      setDraggingTab(null);
      return;
    }

    if (sourceGroupId === targetGroupId) {
      setDraggingTab(null);
      return;
    }

    setPrimaryPreviewTabId((p) => (p === tabId ? null : p));

    if (targetGroupId === 'primary') {
      setSplitPaneGroups((current) =>
        current
          .map((group) => {
            const nextIds = group.tabIds.filter((id) => id !== tabId);
            let nextActive = group.activeTabId;
            if (group.activeTabId === tabId) {
              nextActive =
                pickNextActiveFromMru(nextIds, tabId, group.id) ||
                nextIds.find((x) => x !== '__welcome__') ||
                nextIds[0] ||
                null;
            }
            const nextPv = group.previewTabId === tabId ? null : group.previewTabId;
            if (!nextActive) {
              return null;
            }
            return { ...group, tabIds: nextIds, activeTabId: nextActive, previewTabId: nextPv };
          })
          .filter(Boolean)
      );
      setPrimaryGroupTabIds((cur) => {
        const base = cur.filter((id) => id !== tabId);
        let next;
        if (insertBeforeIndex == null || insertBeforeIndex >= base.length) {
          next = [...base, tabId];
        } else {
          next = [...base];
          next.splice(insertBeforeIndex, 0, tabId);
        }
        return next;
      });
      setPrimaryActiveTabId(tabId);
      workspace.setActiveTab(tabId);
      setActiveEditorPane('primary');
      touchGroupMru('primary', tabId);
      setDraggingTab(null);
      return;
    }

    setPrimaryGroupTabIds((cur) => cur.filter((id) => id !== tabId));
    let focusedIdx = focusedSplitPaneIndex;
    setSplitPaneGroups((cur) => {
      const mapped = cur
        .map((group) => {
          if (group.id === targetGroupId) {
            const filtered = group.tabIds.filter((id) => id !== tabId);
            let nextIds;
            if (insertBeforeIndex == null || insertBeforeIndex >= filtered.length) {
              nextIds = [...filtered, tabId];
            } else {
              nextIds = [...filtered];
              nextIds.splice(insertBeforeIndex, 0, tabId);
            }
            return { ...group, tabIds: nextIds, activeTabId: tabId, previewTabId: group.previewTabId === tabId ? group.previewTabId : null };
          }
          const nextIds = group.tabIds.filter((id) => id !== tabId);
          let nextActive = group.activeTabId;
          if (group.activeTabId === tabId) {
            nextActive =
              pickNextActiveFromMru(nextIds, tabId, group.id) ||
              nextIds.find((x) => x !== '__welcome__') ||
              nextIds[0] ||
              null;
          }
          const nextPv = group.previewTabId === tabId ? null : group.previewTabId;
          if (!nextActive) {
            return null;
          }
          return { ...group, tabIds: nextIds, activeTabId: nextActive, previewTabId: nextPv };
        })
        .filter(Boolean);
      const ti = mapped.findIndex((g) => g.id === targetGroupId);
      if (ti >= 0) {
        focusedIdx = ti;
      }
      return mapped;
    });
    setFocusedSplitPaneIndex(focusedIdx);
    workspace.setActiveTab(tabId);
    setActiveEditorPane('secondary');
    touchGroupMru(targetGroupId, tabId);
    setDraggingTab(null);
  }

  function startEditorSplitResize(resizerIndex) {
    return (event) => {
      event.preventDefault();
      editorSplitResizeRef.current = {
        index: resizerIndex,
        startX: event.clientX,
        startY: event.clientY,
        weights: [...splitPaneWeights],
        axis: editorSplitDirection === 'vertical' ? 'y' : 'x',
      };
      setIsResizingEditorSplit(true);
    };
  }

  const intelliSenseTargetTab =
    splitEditorOpen && activeEditorPane === 'primary'
      ? primaryPaneEditorTab
      : splitEditorOpen && activeEditorPane === 'secondary'
        ? focusedSplitTab
        : activeTab;

  const activeIntelliSense = useMemo(() => {
    if (!intelliSenseTargetTab?.language) {
      return null;
    }

    if (!builtInFeatures.backendIntelliSense) {
      return {
        languageId: intelliSenseTargetTab.language,
        providerType: 'extension-disabled',
        available: false,
        statusLabel: 'IntelliSense: disabled',
        detail: 'Remote IntelliSense Bridge is disabled in Extensions.',
      };
    }

    const description = describeLanguageIntelliSense(editorCapabilities, intelliSenseTargetTab.language);
    if (!description) {
      return null;
    }

    if (editorCapabilitiesStatus !== 'ready' && description.providerType !== 'native') {
      return {
        ...description,
        statusLabel: 'IntelliSense: checking...',
        detail: 'Checking local IntelliSense providers...',
      };
    }

    if (
      description.providerType === 'lsp' &&
      description.available &&
      lspBridgeState.languageId === intelliSenseTargetTab.language
    ) {
      if (lspBridgeState.status === 'connected') {
        return {
          ...description,
          statusLabel:
            editorCapabilities.runtimeMode === 'desktop-local'
              ? `IntelliSense: ${description.serverLabel || 'LSP ready'}`
              : 'IntelliSense: backend connected',
          detail: lspBridgeState.message || description.detail,
        };
      }

      if (lspBridgeState.status === 'connecting' || lspBridgeState.status === 'restarting') {
        return {
          ...description,
          statusLabel: 'IntelliSense: connecting...',
          detail: lspBridgeState.message || 'Connecting to the language server...',
        };
      }

      if (lspBridgeState.status === 'error' || lspBridgeState.status === 'disconnected') {
        return {
          ...description,
          available: false,
          statusLabel: 'IntelliSense: bridge error',
          detail: lspBridgeState.message || 'The language server bridge is not connected.',
        };
      }
    }

    return description;
  }, [
    intelliSenseTargetTab?.language,
    builtInFeatures.backendIntelliSense,
    editorCapabilities,
    editorCapabilitiesStatus,
    lspBridgeState,
  ]);
  const activeIntelliSenseProviderType = activeIntelliSense?.providerType || '';
  const activeIntelliSenseAvailable = Boolean(activeIntelliSense?.available);

  useEffect(() => {
    const noticeKey = `${activeTab?.language || ''}:${activeIntelliSense?.statusLabel || ''}:${activeIntelliSense?.detail || ''}`;
    if (
      !activeTab?.language ||
      !activeIntelliSense ||
      activeIntelliSense.available ||
      activeIntelliSense.providerType !== 'lsp' ||
      editorCapabilityNoticeRef.current === noticeKey
    ) {
      return;
    }

    editorCapabilityNoticeRef.current = noticeKey;
    pushNotification(activeIntelliSense.detail, 'info');
  }, [activeIntelliSense, activeTab?.language]);

  useEffect(() => {
    clearTimeout(editorWorkspaceSyncTimerRef.current);

    if (
      !activeTab?.language ||
      activeIntelliSenseProviderType !== 'lsp' ||
      !activeIntelliSenseAvailable ||
      editorCapabilitiesStatus !== 'ready'
    ) {
      return undefined;
    }

    let cancelled = false;
    editorWorkspaceSyncTimerRef.current = setTimeout(() => {
      workspace
        .getSyncPayload()
        .then((payload) => {
          if (cancelled || !payload) {
            return null;
          }

          return upsertEditorWorkspaceSession(payload, editorWorkspaceSession?.sessionId || '');
        })
        .then((session) => {
          if (!session || cancelled) {
            return;
          }

          setEditorWorkspaceSession(session);
        })
        .catch((error) => {
          if (cancelled) {
            return;
          }

          setLspBridgeState({
            status: 'error',
            languageId: activeTab.language,
            message: error instanceof Error ? error.message : 'Unable to sync the editor workspace mirror.',
          });
        });
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(editorWorkspaceSyncTimerRef.current);
    };
    }, [
      activeIntelliSenseAvailable,
      activeIntelliSenseProviderType,
      activeTab?.content,
      activeTab?.id,
      activeTab?.language,
      editorCapabilitiesStatus,
      editorWorkspaceSession?.sessionId,
    version,
  ]);

  useEffect(() => {
    const shouldUseLspBridge =
      activeTab?.language &&
      activeIntelliSenseProviderType === 'lsp' &&
      activeIntelliSenseAvailable &&
      editorWorkspaceSession?.sessionId &&
      editorWorkspaceSession?.workspaceRoot;

    if (!shouldUseLspBridge) {
      lspBridgeRef.current?.dispose?.();
      lspBridgeRef.current = null;
      setActiveLspBridge(null);
      setLspBridgeState((current) =>
        current.status === 'idle' && !current.languageId
          ? current
          : { status: 'idle', languageId: '', message: '' }
      );
      return undefined;
    }

    setLspBridgeState({
      status: 'connecting',
      languageId: activeTab.language,
      message: 'Connecting to the language server...',
    });

    const bridge = createLspBridge({
      languageId: activeTab.language,
      sessionId: editorWorkspaceSession.sessionId,
      workspaceRoot: editorWorkspaceSession.workspaceRoot,
      onStatus: (payload) => {
        setLspBridgeState({
          status: payload?.status || 'unknown',
          languageId: payload?.languageId || activeTab.language,
          message: payload?.message || payload?.serverLabel || '',
        });
      },
    });

    lspBridgeRef.current?.dispose?.();
    lspBridgeRef.current = bridge;
    setActiveLspBridge(bridge);

    return () => {
      bridge.dispose();
      if (lspBridgeRef.current === bridge) {
        lspBridgeRef.current = null;
      }
      setActiveLspBridge((current) => (current === bridge ? null : current));
    };
    }, [
      activeIntelliSenseAvailable,
      activeIntelliSenseProviderType,
      activeTab?.language,
      editorWorkspaceSession?.sessionId,
      editorWorkspaceSession?.workspaceRoot,
    ]);

  useEffect(() => {
    if (
      !activeLspBridge ||
      !activeTab?.language ||
      activeIntelliSenseProviderType !== 'lsp' ||
      !activeIntelliSenseAvailable
    ) {
      return undefined;
    }

    const relativePath = activeTab.path === 'root' ? activeTab.name : activeTab.path;
    const timer = window.setTimeout(() => {
      activeLspBridge
        .syncDocument({
          relativePath,
          fileName: activeTab.name,
          text: activeTab.content ?? '',
        })
        .catch(() => null);
    }, 60);

    return () => window.clearTimeout(timer);
    }, [
      activeIntelliSenseAvailable,
      activeIntelliSenseProviderType,
      activeLspBridge,
      activeTab?.content,
      activeTab?.language,
      activeTab?.name,
    activeTab?.path,
  ]);

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
    if (splitEditorOpen) {
      return undefined;
    }

    splitEditorListenersCleanupRef.current.forEach((cleanup) => cleanup?.());
    splitEditorListenersCleanupRef.current.clear();
    splitEditorRefs.current.clear();
    splitMonacoRefs.current.clear();
    splitBreakpointDecorationsRef.current.clear();

    if (activeEditorPaneRef.current === 'secondary') {
      setActiveEditorPane('primary');
    }

    return undefined;
  }, [splitEditorOpen]);

  useEffect(() => {
    if (!splitPaneGroups.length) {
      if (splitEditorOpen) {
        setSplitEditorOpen(false);
      }
      return;
    }

    if (!splitEditorOpen) {
      setSplitEditorOpen(true);
    }
  }, [splitPaneGroups, splitEditorOpen]);

  useEffect(() => {
    setPrimaryGroupTabIds((current) => {
      const next = current.filter((tabId) => {
        if (tabId === '__welcome__') return welcomeTabOpen;
        return workspace.tabs.some((tab) => tab.id === tabId);
      });
      if (activeEditorPane === 'primary') {
        if (workspace.activeTabId && !next.includes(workspace.activeTabId)) {
          next.push(workspace.activeTabId);
        } else if (!workspace.activeTabId && welcomeTabOpen && !next.includes('__welcome__')) {
          next.push('__welcome__');
        }
      }
      return next;
    });
  }, [welcomeTabOpen, workspace.activeTabId, version, activeEditorPane]);

  useEffect(() => {
    if (!splitEditorOpen) {
      setSplitPaneWeights([1]);
      return;
    }
    const n = 1 + splitPaneGroups.length;
    setSplitPaneWeights((weights) => (weights.length === n ? weights : Array(n).fill(1)));
  }, [splitEditorOpen, splitPaneGroups.length]);

  useEffect(() => {
    if (!splitEditorOpen) {
      setPrimaryActiveTabId(null);
      return;
    }
    setPrimaryActiveTabId((prev) => {
      if (prev && primaryGroupTabIds.includes(prev)) {
        return prev;
      }
      const fallback =
        primaryGroupTabIds.find((id) => id !== '__welcome__') || primaryGroupTabIds[0] || (welcomeTabOpen ? '__welcome__' : null);
      return fallback;
    });
  }, [splitEditorOpen, primaryGroupTabIds, welcomeTabOpen]);

  useEffect(() => {
    if (!isResizingEditorSplit) {
      return undefined;
    }

    function handlePointerMove(event) {
      const { index, startX, startY, weights, axis } = editorSplitResizeRef.current;
      const delta = axis === 'y' ? event.clientY - startY : event.clientX - startX;
      editorSplitResizeRef.current.startX = event.clientX;
      editorSplitResizeRef.current.startY = event.clientY;
      setSplitPaneWeights((current) => {
        const base = current.length ? current : weights;
        if (!base.length || index < 0 || index >= base.length - 1) {
          return base;
        }
        const next = [...base];
        const adjust = delta * 0.004;
        const left = Math.max(0.25, next[index] + adjust);
        const right = Math.max(0.25, next[index + 1] - adjust);
        next[index] = left;
        next[index + 1] = right;
        editorSplitResizeRef.current.weights = next;
        return next;
      });
    }

    function stopResizing() {
      setIsResizingEditorSplit(false);
    }

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizingEditorSplit]);

  useEffect(() => {
    if (!isResizingSidebar) {
      return undefined;
    }

    function handlePointerMove(event) {
      const bounds = sideBarWrapperRef.current?.getBoundingClientRect();
      if (!bounds) {
        return;
      }

      const nextWidth = Math.min(620, Math.max(280, bounds.right - event.clientX));
      setSidebarWidth(nextWidth);
    }

    function stopResizing() {
      setIsResizingSidebar(false);
    }

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizingSidebar]);

  useEffect(() => {
    if (!splitEditorOpen) {
      return;
    }
    setSplitPaneGroups((current) => {
      const valid = current
        .map((group) => {
          const normalizedTabIds = (group.tabIds || []).filter((paneId) => {
            if (paneId === '__welcome__') {
              return welcomeTabOpen;
            }
            return workspace.tabs.some((tab) => tab.id === paneId);
          });
          const nextActive =
            normalizedTabIds.includes(group.activeTabId)
              ? group.activeTabId
              : normalizedTabIds.find((paneId) => paneId !== '__welcome__') || normalizedTabIds[0] || null;
          return nextActive
            ? {
                ...group,
                tabIds: normalizedTabIds,
                activeTabId: nextActive,
                previewTabId: normalizedTabIds.includes(group.previewTabId) ? group.previewTabId : null,
              }
            : null;
        })
        .filter(Boolean);

      if (valid.length) {
        return valid;
      }

      // VS Code: closing the last tab in the last secondary group removes that group and exits
      // split layout — do not inject a fallback group (that was reopening an empty side pane).
      return [];
    });
  }, [splitEditorOpen, welcomeTabOpen, workspace.activeTabId, version]);

  useEffect(() => {
    if (!splitPaneGroups.length) {
      return;
    }
    setFocusedSplitPaneIndex((i) => Math.min(i, Math.max(0, splitPaneGroups.length - 1)));
  }, [splitPaneGroups.length]);

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
      handlePushSync({ silent: true, background: true });
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
    sidebarWidth,
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

  useEffect(() => {
    clearInterval(syncPollerRef.current);

    if (!authSessionReadyRef.current || !authSession.syncProvider || applyingSyncStateRef.current) {
      return undefined;
    }

    const syncUserKey = getSyncUserKeyFromSession(authSession);
    if (!syncUserKey) {
      return undefined;
    }

    if (!authSession.syncPreferences?.syncSettings && !authSession.syncPreferences?.syncLayout && !authSession.syncPreferences?.syncShortcuts) {
      return undefined;
    }

    syncPollerRef.current = window.setInterval(() => {
      hydrateSyncedState(authSession, { silent: true, recheck: true, background: true }).catch(() => null);
    }, AUTO_SYNC_POLL_MS);

    return () => clearInterval(syncPollerRef.current);
  }, [
    authSession,
    authSession.syncPreferences?.syncLayout,
    authSession.syncPreferences?.syncSettings,
    authSession.syncPreferences?.syncShortcuts,
    authSession.syncProvider,
  ]);

  function syncEditorStatus(editorInstance = getPreferredEditor()) {
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
    setCommandPaletteEditorNonce((current) => current + 1);

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
      editor.onDidFocusEditorText(() => {
        setActiveEditorPane('primary');
        setCommandPaletteEditorNonce((current) => current + 1);
        if (splitEditorOpenMountRef.current && primaryActiveTabIdRef.current && primaryActiveTabIdRef.current !== '__welcome__') {
          workspace.setActiveTab(primaryActiveTabIdRef.current);
        }
        syncEditorStatus(editor);
        updateDebugDiagnostics(editor, monaco);
      }),
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
    refreshBreakpointDecorations(editor, monaco, workspace.activeTabId, breakpointDecorationsRef);
  }

  function onSplitEditorMount(editor, monaco, paneIndex, paneTab) {
    splitEditorListenersCleanupRef.current.get(paneIndex)?.();
    splitEditorRefs.current.set(paneIndex, editor);
    splitMonacoRefs.current.set(paneIndex, monaco);
    setCommandPaletteEditorNonce((current) => current + 1);

    const update = () => {
      if (activeEditorPaneRef.current !== 'secondary' || focusedSplitPaneIndex !== paneIndex) {
        return;
      }

      syncEditorStatus(editor);
      updateDebugDiagnostics(editor, monaco);
    };
    const model = editor.getModel?.();
    const listeners = [
      editor.onDidChangeCursorPosition(update),
      editor.onDidChangeCursorSelection(update),
      model?.onDidChangeContent(update),
      model?.onDidChangeOptions(update),
      editor.onDidFocusEditorText(() => {
        setFocusedSplitPaneIndex(paneIndex);
        setActiveEditorPane('secondary');
        setCommandPaletteEditorNonce((current) => current + 1);
        syncEditorStatus(editor);
        updateDebugDiagnostics(editor, monaco);
      }),
      editor.onMouseDown((event) => {
        if (event.target.type !== monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
          return;
        }

        if (!paneTab?.path) {
          return;
        }

        toggleBreakpoint(paneTab.path, event.target.position?.lineNumber);
      }),
    ].filter(Boolean);

    splitEditorListenersCleanupRef.current.set(paneIndex, () => {
      listeners.forEach((listener) => listener.dispose());
    });

    if (activeEditorPaneRef.current === 'secondary' && focusedSplitPaneIndex === paneIndex) {
      update();
    }
    if (!splitBreakpointDecorationsRef.current.has(paneIndex)) {
      splitBreakpointDecorationsRef.current.set(paneIndex, { current: [] });
    }
    refreshBreakpointDecorations(
      editor,
      monaco,
      paneTab?.id,
      splitBreakpointDecorationsRef.current.get(paneIndex)
    );
  }

  function runEditorAction(actionId, fallback) {
    const editor = getPreferredEditor();
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

  async function runMonacoPaletteAction(actionId) {
    const editor = getPreferredEditor();
    if (!editor?.getAction) {
      return false;
    }

    const action = editor.getAction(actionId);
    if (!action) {
      return false;
    }

    editor.focus();
    try {
      await action.run();
      return true;
    } catch {
      return false;
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
    if (!builtInFeatures.quickNavigation) {
      notifyExtensionDisabled('Quick Navigation');
      return;
    }
    const currentLine = editorStatus.line || 1;
    const currentColumn = editorStatus.column || 1;
    openGoOverlay('line', `${currentLine}:${currentColumn}`);
  }

  function handleGoToFile() {
    if (!builtInFeatures.quickNavigation) {
      notifyExtensionDisabled('Quick Navigation');
      return;
    }
    if (activePanel === 'search') {
      closeGoOverlay();
      openSearchPanel({ mode: 'files', query: '', scope: 'workspace' });
      return;
    }

    openGoOverlay('file', '');
  }

  function handleGoToSymbolInWorkspace() {
    if (!builtInFeatures.quickNavigation) {
      notifyExtensionDisabled('Quick Navigation');
      return;
    }
    if (activePanel === 'search') {
      closeGoOverlay();
      openSearchPanel({ mode: 'symbols', query: '', scope: 'workspace' });
      return;
    }

    openGoOverlay('workspace-symbol', '');
  }

  function handleGoToSymbolInEditor() {
    if (!builtInFeatures.quickNavigation) {
      notifyExtensionDisabled('Quick Navigation');
      return;
    }
    if (activePanel === 'search') {
      closeGoOverlay();
      openSearchPanel({ mode: 'symbols', query: '', scope: 'open' });
      return;
    }

    openGoOverlay('editor-symbol', '');
  }

  function handleGoToDefinition() {
    if (!builtInFeatures.quickNavigation) {
      notifyExtensionDisabled('Quick Navigation');
      return;
    }
    closeGoOverlay();
    runEditorAction('editor.action.revealDefinition');
  }

  function handleGoToReferences() {
    if (!builtInFeatures.quickNavigation) {
      notifyExtensionDisabled('Quick Navigation');
      return;
    }
    closeGoOverlay();
    runEditorAction('editor.action.goToReferences');
  }

  function submitGoToLine() {
    const editor = getPreferredEditor();
    const model = editor?.getModel?.();

    if (!editor || !model) {
      closeGoOverlay();
      return;
    }

    const raw = String(goOverlay.value || '').trim();
    if (!raw) {
      closeGoOverlay();
      return;
    }

    const [rawLine = '', rawColumn = ''] = raw.split(':');
    const lineNumber = Math.min(Math.max(1, Number.parseInt(rawLine, 10) || 1), model.getLineCount());
    const column = Math.min(
      Math.max(1, Number.parseInt(rawColumn, 10) || 1),
      model.getLineMaxColumn(lineNumber)
    );

    editor.setPosition({ lineNumber, column });
    editor.revealPositionInCenter({ lineNumber, column });
    editor.focus();
    closeGoOverlay();
  }

  function handleGoOverlayResultSelect(result) {
    handleOpenSearchResult(result);
    closeGoOverlay();
  }

  function submitGoOverlayAction() {
    if (goOverlay.mode === 'line') {
      submitGoToLine();
      return;
    }

    if (goOverlay.results.length) {
      handleGoOverlayResultSelect(goOverlay.results[0]);
    }
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
    if (!builtInFeatures.livePreview) {
      notifyExtensionDisabled('Live Preview Canvas');
      return;
    }
    if (livePreviewContextTab?.language !== 'html') {
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
    if (!builtInFeatures.livePreview) {
      notifyExtensionDisabled('Live Preview Canvas');
      return false;
    }
    if (livePreviewContextTab?.language !== 'html') {
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
    const tab = getFocusedTab();
    const editor = getPreferredEditor();
    const monaco = getPreferredMonaco();
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
      const content = openedTab?.content ?? (node.isDraft ? node.content || '' : (await workspace.readFile(node)).content);
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
    if (livePreviewContextTab?.language !== 'html') {
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
    const tab = getFocusedTab();
    const editor = getPreferredEditor();
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
    const tab = getFocusedTab();
    const editor = getPreferredEditor();
    const monaco = getPreferredMonaco();
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
      if (builtInFeatures.explorer) {
        setActivePanel('filepioneer');
      }
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
      if (openedTab?.id) {
        assignTabToFocusedGroup(openedTab.id, { preview: true });
      }
      pushNotification(`Opened file ${openedTab?.name || 'file'}.`);
      refresh();
    } catch {
      // User cancelled the file picker.
    }
  }

  async function handleOpenNode(node, openOptions = {}) {
    const preview = openOptions.preview !== false;
    await workspace.openFile(node);
    const openedTab = workspace.getActiveTab();
    if (openedTab?.id) {
      assignTabToFocusedGroup(openedTab.id, { preview });
    }
    refresh();
  }

  async function handleOpenSearchResult(result) {
    const existingTab = workspace.tabs.find((tab) => tab.path === result.path || tab.id === result.path);

    if (existingTab) {
      workspace.setActiveTab(existingTab.id);
      assignTabToFocusedGroup(existingTab.id, { preview: true });
    } else {
      await workspace.openFile(result.path);
      const openedTab = workspace.getActiveTab();
      if (openedTab?.id) {
        assignTabToFocusedGroup(openedTab.id, { preview: true });
      }
    }

    refresh();

    if (!result.line) {
      return;
    }

    setTimeout(() => {
      requestAnimationFrame(() => {
        const editor = getPreferredEditor();
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
    if (!builtInFeatures.explorer) {
      notifyExtensionDisabled('Workspace Explorer');
      return;
    }
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
    const tab = getFocusedTab();
    if (!tab) {
      return;
    }

    try {
      const saved = await workspace.saveTab(tab.id);
      if (saved) {
        pushNotification(`Saved ${workspace.getActiveTab()?.name || tab.name}.`);
        refresh();
      }
    } catch {
      // User cancelled the save picker.
    }
  }

  async function handleSaveAsActiveFile() {
    const tab = getFocusedTab();
    if (!tab) {
      return;
    }

    try {
      const saved = await workspace.saveTab(tab.id, { saveAs: true });
      if (saved) {
        pushNotification(`Saved As ${workspace.getActiveTab()?.name || tab.name}.`);
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
      setActiveEditorPane('primary');
      assignTabToPrimaryGroup('__welcome__');
      setPrimaryActiveTabId('__welcome__');
      refresh();
      return;
    }

    workspace.setActiveTab(id);
    setActiveEditorPane('primary');
    assignTabToPrimaryGroup(id);
    setPrimaryActiveTabId(id);
    touchGroupMru('primary', id);
    refresh();
  }

  function handleSecondaryTabClick(id) {
    handleSplitPaneTabClick(0, id);
  }

  function handleSplitPaneTabClick(index, id) {
    setFocusedSplitPaneIndex(index);
    const groupId = splitPaneGroups[index]?.id;
    if (id === '__welcome__') {
      setSplitPaneGroups((current) =>
        current.map((entry, entryIndex) =>
          entryIndex === index
            ? { ...entry, activeTabId: '__welcome__', tabIds: entry.tabIds.includes('__welcome__') ? entry.tabIds : ['__welcome__', ...entry.tabIds] }
            : entry
        )
      );
      setActiveEditorPane('secondary');
      workspace.activeTabId = null;
      refresh();
      return;
    }

    setSplitPaneGroups((current) =>
      current.map((entry, entryIndex) => {
        if (entryIndex !== index) {
          return entry;
        }
        const nextIds = entry.tabIds.includes(id) ? entry.tabIds : [...entry.tabIds, id];
        return { ...entry, activeTabId: id, tabIds: nextIds };
      })
    );
    setActiveEditorPane('secondary');
    workspace.setActiveTab(id);
    if (groupId) {
      touchGroupMru(groupId, id);
    }
    refresh();
  }

  async function handleCloseTab(id, fromGroupId) {
    const globalClose = fromGroupId === undefined;

    if (id === '__welcome__') {
      if (globalClose) {
        setWelcomeTabOpen(false);
        const nextPrimary = primaryGroupTabIds.filter((t) => t !== '__welcome__');
        const nextSplits = splitPaneGroups
          .map((group) => {
            const nextTabIds = group.tabIds.filter((paneId) => paneId !== '__welcome__');
            let nextActive = group.activeTabId;
            if (group.activeTabId === '__welcome__') {
              nextActive =
                pickNextActiveFromMru(nextTabIds, '__welcome__', group.id) ||
                nextTabIds.find((paneId) => paneId !== '__welcome__') ||
                nextTabIds[0] ||
                null;
            }
            if (!nextActive) {
              return null;
            }
            return { ...group, tabIds: nextTabIds, activeTabId: nextActive };
          })
          .filter(Boolean);
        setPrimaryGroupTabIds(nextPrimary);
        setPrimaryActiveTabId((prev) => {
          if (prev !== '__welcome__') {
            return prev;
          }
          return (
            pickNextActiveFromMru(nextPrimary, '__welcome__', 'primary') ||
            nextPrimary.find((t) => t !== '__welcome__') ||
            nextPrimary[0] ||
            null
          );
        });
        setSplitPaneGroups(nextSplits);
        if (!workspace.getActiveTab()) {
          refresh();
        }
        return;
      }

      const resolved = fromGroupId ?? resolveFocusedGroupForClose();
      let nextPrimary = primaryGroupTabIds;
      let nextSplits = splitPaneGroups;
      if (resolved === 'primary') {
        nextPrimary = primaryGroupTabIds.filter((t) => t !== '__welcome__');
      } else {
        nextSplits = splitPaneGroups
          .map((group) => {
            if (group.id !== resolved) {
              return group;
            }
            const nextTabIds = group.tabIds.filter((t) => t !== '__welcome__');
            let nextActive = group.activeTabId;
            if (group.activeTabId === '__welcome__') {
              nextActive =
                pickNextActiveFromMru(nextTabIds, '__welcome__', group.id) ||
                nextTabIds.find((t) => t !== '__welcome__') ||
                nextTabIds[0] ||
                null;
            }
            if (!nextActive) {
              return null;
            }
            return { ...group, tabIds: nextTabIds, activeTabId: nextActive };
          })
          .filter(Boolean);
      }
      const stillHasWelcome =
        nextPrimary.includes('__welcome__') || nextSplits.some((g) => g.tabIds.includes('__welcome__'));
      if (!stillHasWelcome) {
        setWelcomeTabOpen(false);
      }
      setPrimaryGroupTabIds(nextPrimary);
      if (resolved === 'primary') {
        setPrimaryActiveTabId((prev) => {
          if (prev !== '__welcome__') {
            return prev;
          }
          return (
            pickNextActiveFromMru(nextPrimary, '__welcome__', 'primary') ||
            nextPrimary.find((t) => t !== '__welcome__') ||
            nextPrimary[0] ||
            null
          );
        });
      }
      setSplitPaneGroups(nextSplits);
      refresh();
      return;
    }

    const tab = workspace.tabs.find((entry) => entry.id === id);
    const resolvedGroupId = globalClose ? null : fromGroupId ?? resolveFocusedGroupForClose();
    const lastReferenceAfterClose = globalClose || !isTabReferencedOutsideGroup(id, resolvedGroupId);
    const shouldDiscardUntitled = Boolean(tab?.isUntitled && lastReferenceAfterClose);
    if (shouldDiscardUntitled) {
      const confirmed = await requestConfirmation({
        title: 'Delete Unsaved File',
        message: `Delete ${tab.name}? It has not been saved yet.`,
        confirmLabel: 'Delete',
        cancelLabel: 'Keep',
        danger: true,
      });
      if (!confirmed) {
        return;
      }
    } else if (tab?.dirty && lastReferenceAfterClose) {
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

    if (globalClose) {
      delete saveTimersRef.current[id];
      if (tab && !shouldDiscardUntitled) {
        closedEditorStackRef.current = [{ id: tab.id, path: tab.path, name: tab.name }, ...closedEditorStackRef.current].slice(0, 50);
      }
      setPinnedTabIds((current) => {
        if (!current[id]) return current;
        const next = { ...current };
        delete next[id];
        return next;
      });
      setPrimaryPreviewTabId((p) => (p === id ? null : p));
      removeTabFromAllMru(id);
      setPrimaryGroupTabIds((current) => current.filter((tabId) => tabId !== id));
      setPrimaryActiveTabId((prev) => (prev === id ? null : prev));
      setSplitPaneGroups((current) =>
        current
          .map((group) => {
            const nextTabIds = group.tabIds.filter((paneId) => paneId !== id);
            let nextActive = group.activeTabId;
            if (group.activeTabId === id) {
              nextActive =
                pickNextActiveFromMru(nextTabIds, id, group.id) ||
                nextTabIds.find((paneId) => paneId !== '__welcome__') ||
                nextTabIds[0] ||
                null;
            }
            const nextPv = group.previewTabId === id ? null : group.previewTabId;
            return nextActive ? { ...group, tabIds: nextTabIds, activeTabId: nextActive, previewTabId: nextPv } : null;
          })
          .filter(Boolean)
      );
      await closeWorkspaceTabEntry(id, tab, { discardUntitled: shouldDiscardUntitled });
      refresh();
      return;
    }

    const resolved = resolvedGroupId ?? 'primary';
    let nextPrimary = primaryGroupTabIds;
    let nextPrimaryActive = primaryActiveTabId;
    let nextSplits = splitPaneGroups;

    if (resolved === 'primary') {
      nextPrimary = primaryGroupTabIds.filter((t) => t !== id);
      if (primaryPreviewTabId === id) {
        setPrimaryPreviewTabId(null);
      }
      if (primaryActiveTabId === id) {
        nextPrimaryActive =
          pickNextActiveFromMru(nextPrimary, id, 'primary') ||
          nextPrimary.find((t) => t !== '__welcome__') ||
          nextPrimary[0] ||
          null;
      }
    } else {
      nextSplits = splitPaneGroups
        .map((group) => {
          if (group.id !== resolved) {
            return group;
          }
          const nextTabIds = group.tabIds.filter((t) => t !== id);
          let nextActive = group.activeTabId;
          if (group.activeTabId === id) {
            nextActive =
              pickNextActiveFromMru(nextTabIds, id, group.id) ||
              nextTabIds.find((t) => t !== '__welcome__') ||
              nextTabIds[0] ||
              null;
          }
          const nextPv = group.previewTabId === id ? null : group.previewTabId;
          if (!nextActive) {
            return null;
          }
          return { ...group, tabIds: nextTabIds, activeTabId: nextActive, previewTabId: nextPv };
        })
        .filter(Boolean);
    }

    const stillReferenced = nextPrimary.includes(id) || nextSplits.some((g) => g.tabIds.includes(id));

    if (!stillReferenced) {
      delete saveTimersRef.current[id];
      if (tab && !shouldDiscardUntitled) {
        closedEditorStackRef.current = [{ id: tab.id, path: tab.path, name: tab.name }, ...closedEditorStackRef.current].slice(0, 50);
      }
      setPinnedTabIds((current) => {
        if (!current[id]) return current;
        const next = { ...current };
        delete next[id];
        return next;
      });
      removeTabFromAllMru(id);
      await closeWorkspaceTabEntry(id, tab, { discardUntitled: shouldDiscardUntitled });
    } else {
      removeTabFromGroupMru(resolved === 'primary' ? 'primary' : resolved, id);
    }

    setPrimaryGroupTabIds(nextPrimary);
    setPrimaryActiveTabId(nextPrimaryActive);
    setSplitPaneGroups(nextSplits);
    refresh();
  }

  async function handleReopenClosedEditor() {
    const last = closedEditorStackRef.current.shift();
    if (!last) {
      return;
    }
    const existing = workspace.tabs.find((tab) => tab.id === last.id || tab.path === last.path);
    if (existing) {
      workspace.setActiveTab(existing.id);
      assignTabToFocusedGroup(existing.id, { preview: false });
      refresh();
      return;
    }
    if (last.path && last.path !== 'root') {
      await workspace.openFile(last.path);
      const opened = workspace.getActiveTab();
      if (opened?.id) {
        assignTabToFocusedGroup(opened.id, { preview: false });
      }
      refresh();
    }
  }

  function toggleInfoDisplay() {
    setInfoDisplay('flex');
  }

  function triggerInfoClose() {
    setInfoDisplay('none');
  }

  function toggleSidebarPanel(panel) {
    if (!isPanelAvailable(panel)) {
      const featureName =
        panel === 'filepioneer'
          ? 'Workspace Explorer'
          : panel === 'search'
            ? 'Search Navigator'
            : panel === 'git'
              ? 'Source Control Deck'
              : panel === 'github'
                ? 'GitHub Workspace Link'
                : panel === 'debug'
                  ? 'Run & Debug Studio'
                  : 'This panel';
      notifyExtensionDisabled(featureName);
      return;
    }
    setActivePanel((current) => (current === panel ? null : panel));
  }

  function toggleSidebar() {
    setActivePanel((current) => (current ? null : firstAvailableSidebarPanel() || DEFAULT_SIDEBAR_PANEL));
  }

  function handleRenameSelected() {
    if (!builtInFeatures.explorer) {
      notifyExtensionDisabled('Workspace Explorer');
      return;
    }
    const selectedPath = workspace.selectedNodePath;
    if (!selectedPath || selectedPath === 'root') {
      return;
    }
    setActivePanel('filepioneer');
    setRenameRequestNonce((current) => current + 1);
  }

  function handleStartDebugging() {
    if (!builtInFeatures.runDebug) {
      notifyExtensionDisabled('Run & Debug Studio');
      return;
    }
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
    if (!builtInFeatures.runDebug) {
      notifyExtensionDisabled('Run & Debug Studio');
      return;
    }
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
    const activeEditor = getPreferredEditor();
    const activeTabSnapshot = getFocusedTab();
    const selection = activeEditor?.getModel?.() && activeEditor?.getSelection?.()
      ? activeEditor.getModel().getValueInRange(activeEditor.getSelection())
      : '';
    const context = {
      line: editorStatus.line,
      column: editorStatus.column,
      lines: editorStatus.lines,
      fileName: activeTabSnapshot?.name || '',
      filePath: activeTabSnapshot?.path || '',
      language: activeTabSnapshot?.language || 'plaintext',
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
    if (!livePreviewOpen || livePreviewContextTab?.language !== 'html') {
      if (livePreviewContextTab?.language !== 'html') {
        setLivePreviewDocument('');
        clearLivePreview();
      }
      return;
    }

    let cancelled = false;

    buildLivePreviewDocument(livePreviewContextTab)
      .then(({ document, url }) => {
        if (!cancelled) {
          setLivePreviewDocument(document);
          if (livePreviewMode === 'tab') {
            publishLivePreview({
              previewId: LIVE_PREVIEW_ID,
              document,
              url,
              title: livePreviewContextTab.name,
              path: livePreviewContextTab.path,
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
  }, [livePreviewContextTab?.content, livePreviewContextTab?.id, livePreviewMode, livePreviewNonce, livePreviewOpen, version]);

  useEffect(() => {
    refreshBreakpointDecorations();
  }, [debugBreakpoints, workspace.activeTabId]);

  useEffect(() => {
    if (!splitEditorOpen) {
      return;
    }
    splitPaneGroups.forEach((group, paneIndex) => {
      const paneTabId = group.activeTabId;
      const paneTab = paneTabId && paneTabId !== '__welcome__' ? workspace.tabs.find((tab) => tab.id === paneTabId) : null;
      const editor = splitEditorRefs.current.get(paneIndex);
      const monaco = splitMonacoRefs.current.get(paneIndex);
      if (!paneTab?.id || !editor || !monaco) {
        return;
      }
      if (!splitBreakpointDecorationsRef.current.has(paneIndex)) {
        splitBreakpointDecorationsRef.current.set(paneIndex, { current: [] });
      }
      refreshBreakpointDecorations(
        editor,
        monaco,
        paneTab.id,
        splitBreakpointDecorationsRef.current.get(paneIndex)
      );
    });
  }, [debugBreakpoints, splitEditorOpen, splitPaneGroups, version]);

  const commandActions = {
    'workbench.action.showCommands': () => openCommandPalette(),
    'workbench.action.openSettings': () => toggleSettingsFromState(),
    'workbench.action.openKeyboardShortcuts': () => openKeyboardShortcuts(),
    'workbench.action.toggleKeyboardShortcuts': () => openKeyboardShortcuts(),
    'workbench.action.showExtensions': () => openExtensions(),
    'workbench.action.openAccount': () => openAccount(),
    'workbench.action.toggleSidebarVisibility': () => toggleSidebar(),
    'workbench.view.explorer': () => toggleSidebarPanel('filepioneer'),
    'workbench.view.search': () => openSearchPanel(),
    'workbench.view.scm': () => toggleSidebarPanel('git'),
    'workbench.view.debug': () => toggleSidebarPanel('debug'),
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
    'workbench.action.splitEditorRight': () => openSplitEditorRight(),
    'workbench.action.splitEditorDown': () => openSplitEditorDown(),
    'workbench.action.focusNextGroup': () => focusNextSplitGroup(),
    'workbench.action.focusPreviousGroup': () => focusPreviousSplitGroup(),
    'workbench.action.closeActiveEditorGroup': () => closeFocusedSplitGroup(),
    'workbench.action.moveEditorToNextGroup': () => moveActiveEditorToAdjacentGroup('next'),
    'workbench.action.moveEditorToPreviousGroup': () => moveActiveEditorToAdjacentGroup('previous'),
    'workbench.action.closeSplitEditor': () => closeSplitEditor(),
    'workbench.action.reopenClosedEditor': () => handleReopenClosedEditor(),
    'workbench.action.pinEditor': () => togglePinFocusedTab(),
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
        handleCloseTab(tabActiveId, resolveFocusedGroupForClose());
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

  const panelDisplay = (panel) => (activePanel === panel && isPanelAvailable(panel) ? 'flex' : 'none');
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
          const action = commandActions[command.id];
          if (action) {
            action();
            return;
          }

          runMonacoPaletteAction(command.id);
        }}
      />
      <Info triggerInfoClose={triggerInfoClose} InfoDisplay={infoDisplay} />
      <Modal isOpen={modalOpen} closeModal={closeCurrentModal} title={modalType}>
        <Settings modalType={modalType} settings={settings} setSettings={setSettings} />
         <Extensions
          modalType={modalType}
          pushNotification={pushNotification}
          extensionCatalog={extensionCatalog}
          marketplacePublishers={marketplacePublishers}
          authSession={authSession}
         />
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
          openExplorer={() => toggleSidebarPanel('filepioneer')}
          openSearch={openSearchPanel}
          openSourceControl={() => toggleSidebarPanel('git')}
          openDebug={() => toggleSidebarPanel('debug')}
          splitEditorRight={() => openSplitEditorRight()}
          closeSplitEditor={closeSplitEditor}
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
              {!splitEditorOpen ? (
                <>
                  <Tabs
                    tabs={orderTabsForView(
                      primaryGroupTabs.map((t) => ({ ...t, isPreview: primaryPreviewTabId === t.id }))
                    )}
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
                    showSplitEditorAction={!!activeTab}
                    splitEditorOpen={splitEditorOpen}
                    onSplitEditor={() => openSplitEditorRight(workspace.activeTabId || null)}
                    groupId="primary"
                    onTabDragStart={handleTabDragStart}
                    onTabDrop={handleGroupTabDrop}
                    onTogglePin={togglePinTab}
                    onOpenLivePreviewTab={() => {
                      if (openTabLivePreview()) {
                        pushNotification(`Live preview opened in a new tab for ${activeTab?.name || 'HTML file'}.`);
                      }
                    }}
                  />
                  {activeTab ? (
                    <BreadcrumbsBar activeTab={activeTab} rootName={workspace.rootName || workspace.getRootNode()?.name || ''} />
                  ) : null}
                </>
              ) : null}
              <div className={`editor-preview-row ${livePreviewOpen && showLivePreviewAction ? 'preview-open' : ''}`}>
                <div className={`editor-preview-main ${splitEditorOpen ? 'split-open' : ''}`}>
                  <div
                    className={`editor-split-layout ${splitEditorOpen && editorSplitDirection === 'vertical' ? 'editor-split-layout-vertical' : ''}`}
                  >
                    <div
                      className="editor-pane editor-pane-primary"
                      style={splitEditorOpen ? { flex: `${splitPaneWeights[0] || 1} 1 0%` } : undefined}
                    >
                      {splitEditorOpen ? (
                        <Tabs
                          tabs={orderTabsForView(
                            primaryGroupTabs.map((t) => ({ ...t, isPreview: primaryPreviewTabId === t.id }))
                          )}
                          activeTabId={primaryActiveTabId}
                          setActiveTab={handleTabClick}
                          closeTab={handleCloseTab}
                          onRunCurrentFile={handleRunCurrentFile}
                          onOpenCommandPalette={openCommandPalette}
                          showRunAction={!!primaryPaneEditorTab || splitPrimaryWelcomeOpen}
                          showLivePreviewAction={false}
                          livePreviewOpen={false}
                          livePreviewMode={livePreviewMode}
                          onToggleLivePreview={handleToggleLivePreview}
                          showSplitEditorAction={!!primaryPaneEditorTab || splitPrimaryWelcomeOpen}
                          splitEditorOpen={splitEditorOpen}
                          onSplitEditor={() => openSplitEditorRight(primaryPaneEditorTab?.id || null)}
                          groupId="primary"
                          onTabDragStart={handleTabDragStart}
                          onTabDrop={handleGroupTabDrop}
                          onTogglePin={togglePinTab}
                          onOpenLivePreviewTab={() => {}}
                        />
                      ) : null}
                      {splitEditorOpen && primaryPaneEditorTab ? (
                        <BreadcrumbsBar
                          activeTab={primaryPaneEditorTab}
                          rootName={workspace.rootName || workspace.getRootNode()?.name || ''}
                        />
                      ) : null}
                      {!splitEditorOpen && activeTab ? (
                        <MonacoEditor
                          key={activeTab.id}
                          tab={activeTab}
                          onChange={handleEditorChange}
                          onMount={onEditorMount}
                          onFocusEditor={() => setActiveEditorPane('primary')}
                          onOpenCommandPalette={openCommandPalette}
                          onGoToLine={handleGoToLine}
                          intelliSense={activeIntelliSense}
                          lspBridge={activeLspBridge}
                          settings={settings}
                          MonacoEditorDisplay="flex"
                          monacoEditorStyle={monacoEditorStyle}
                        />
                      ) : null}
                      {splitEditorOpen && primaryPaneEditorTab ? (
                        <MonacoEditor
                          key={primaryPaneEditorTab.id}
                          tab={primaryPaneEditorTab}
                          onChange={handleEditorChange}
                          onMount={onEditorMount}
                          onFocusEditor={() => setActiveEditorPane('primary')}
                          onOpenCommandPalette={openCommandPalette}
                          onGoToLine={handleGoToLine}
                          intelliSense={activeIntelliSense}
                          lspBridge={activeLspBridge}
                          settings={settings}
                          MonacoEditorDisplay="flex"
                          monacoEditorStyle={splitMonacoEditorStyle}
                        />
                      ) : null}
                      {!splitEditorOpen && showDefaultPage ? (
                        <DefaultPage DefaultPageDisplay="flex" dimensionsDefaultPage={contentSurfaceStyle} />
                      ) : null}
                      {splitEditorOpen && splitPrimaryDefaultOpen ? (
                        <DefaultPage DefaultPageDisplay="flex" dimensionsDefaultPage={contentSurfaceStyle} />
                      ) : null}
                      {!splitEditorOpen && showWelcomePage ? (
                        <WelcomePage
                          DimensionsWelcomePage={contentSurfaceStyle}
                          WelcomePageDisplay="flex"
                          triggerNewFile={handleCreateUntitledFile}
                          triggerOpenFolder={handleOpenFolder}
                          triggerOpenFile={handleOpenFileDialog}
                          triggerNewFolder={handleCreateFolder}
                        />
                      ) : null}
                      {splitEditorOpen && splitPrimaryWelcomeOpen ? (
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
                    {splitEditorOpen
                      ? splitPaneGroups.map((group, paneIndex) => {
                          const paneTabId = group.activeTabId;
                          const paneTab = paneTabId && paneTabId !== '__welcome__'
                            ? workspace.tabs.find((tab) => tab.id === paneTabId) || null
                            : null;
                          const paneWelcomeOpen = paneTabId === '__welcome__';
                          const groupTabModels = (group.tabIds || [])
                            .map((id) => visibleTabs.find((tab) => tab.id === id))
                            .filter(Boolean)
                            .map((t) => ({ ...t, isPreview: group.previewTabId === t.id }));

                          return (
                            <Fragment key={`split-pane-${group.id}-${paneTabId || 'empty'}`}>
                              <div
                                className={`editor-split-resizer ${isResizingEditorSplit ? 'is-active' : ''}`}
                                onMouseDown={startEditorSplitResize(paneIndex)}
                                title="Resize editor group"
                                role="separator"
                                aria-orientation="vertical"
                              />
                              <div
                                className="editor-pane editor-pane-secondary"
                                style={{ flex: `${splitPaneWeights[paneIndex + 1] || 1} 1 0%` }}
                              >
                              <Tabs
                                tabs={orderTabsForView(groupTabModels)}
                                activeTabId={paneWelcomeOpen ? '__welcome__' : paneTab?.id || null}
                                setActiveTab={(id) => handleSplitPaneTabClick(paneIndex, id)}
                                closeTab={handleCloseTab}
                                onRunCurrentFile={handleRunCurrentFile}
                                onOpenCommandPalette={openCommandPalette}
                                showRunAction={!!paneTab || paneWelcomeOpen}
                                showLivePreviewAction={false}
                                livePreviewOpen={false}
                                livePreviewMode={livePreviewMode}
                                onToggleLivePreview={handleToggleLivePreview}
                                showSplitEditorAction={!!paneTab || paneWelcomeOpen}
                                splitEditorOpen={splitEditorOpen}
                                onSplitEditor={() => openSplitEditorRight(paneTab?.id || null)}
                                groupId={group.id}
                                onTabDragStart={handleTabDragStart}
                                onTabDrop={handleGroupTabDrop}
                                onTogglePin={togglePinTab}
                                onOpenLivePreviewTab={() => {}}
                              />
                              {paneTab ? (
                                <MonacoEditor
                                  key={`secondary-${paneIndex}-${paneTab.id}`}
                                  tab={paneTab}
                                  onChange={(value) => {
                                    workspace.updateTabContent(paneTab.id, value ?? '');
                                    refresh();
                                    queueSave(paneTab.id);
                                  }}
                                  onMount={(editor, monaco) => onSplitEditorMount(editor, monaco, paneIndex, paneTab)}
                                  onFocusEditor={() => {
                                    setFocusedSplitPaneIndex(paneIndex);
                                    setActiveEditorPane('secondary');
                                    if (paneTab?.id) {
                                      workspace.setActiveTab(paneTab.id);
                                    }
                                  }}
                                  onOpenCommandPalette={openCommandPalette}
                                  onGoToLine={handleGoToLine}
                                  intelliSense={activeIntelliSense}
                                  lspBridge={activeLspBridge}
                                  settings={settings}
                                  MonacoEditorDisplay="flex"
                                  monacoEditorStyle={splitMonacoEditorStyle}
                                />
                              ) : paneWelcomeOpen ? (
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
                            </Fragment>
                          );
                        })
                      : null}
                  </div>
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
          <div className="SideBarmainwrper" style={sideBarWrapperStyle} ref={sideBarWrapperRef}>
            {hasSidebar ? (
              <div
                className={`sidebar-resizer ${isResizingSidebar ? 'is-active' : ''}`}
                onMouseDown={startSidebarResize}
                title="Resize Sidebar"
              />
            ) : null}
            <CodeBlocks ariaExpandedisplaycodeblocks={panelDisplay('codeblocks')} />
            <Git
              ariaExpandedisplaygit={panelDisplay('git')}
              workspace={workspace}
              workspaceVersion={version}
              authSession={authSession}
              pushNotification={pushNotification}
            />
            <GitHub
              ariaExpandedisplaygithub={panelDisplay('github')}
              authSession={authSession}
              openAccount={openAccount}
              workspace={workspace}
              pushNotification={pushNotification}
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
              onGoToLine={handleGoToLine}
              onGoToFile={handleGoToFile}
              onGoToSymbolInWorkspace={handleGoToSymbolInWorkspace}
              onGoToSymbolInEditor={handleGoToSymbolInEditor}
              onGoToDefinition={handleGoToDefinition}
              onGoToReferences={handleGoToReferences}
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
              showExplorer={builtInFeatures.explorer}
              showSearch={builtInFeatures.search}
              showExtensions={true}
              showDebug={builtInFeatures.runDebug}
              showGit={builtInFeatures.sourceControl}
              showGitHub={builtInFeatures.githubConnect}
              toggleAriaExpandedfilepioneer={() => toggleSidebarPanel('filepioneer')}
              toggleAriaExpandedsearch={() => {
                if (!builtInFeatures.search) {
                  notifyExtensionDisabled('Search Navigator');
                  return;
                }
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
        {goOverlay.open ? (
          <div
            className="go-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeGoOverlay();
              }
            }}
          >
            <div className="go-popup" onMouseDown={(event) => event.stopPropagation()}>
              <div className="go-popup-header">
                <div>
                  <div className="go-popup-eyebrow">Go</div>
                  <div className="go-popup-title">Quick Navigation</div>
                </div>
                <button type="button" className="go-popup-close" onClick={closeGoOverlay}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="go-popup-actions">
                <button
                  type="button"
                  className={`go-popup-chip ${goOverlay.mode === 'line' ? 'active' : ''}`}
                  onClick={() => openGoOverlay('line', goOverlay.value || `${editorStatus.line || 1}:${editorStatus.column || 1}`)}
                >
                  Line
                </button>
                <button
                  type="button"
                  className={`go-popup-chip ${goOverlay.mode === 'file' ? 'active' : ''}`}
                  onClick={() => openGoOverlay('file', goOverlay.mode === 'file' ? goOverlay.value : '')}
                >
                  File
                </button>
                <button
                  type="button"
                  className={`go-popup-chip ${goOverlay.mode === 'workspace-symbol' ? 'active' : ''}`}
                  onClick={() =>
                    openGoOverlay('workspace-symbol', goOverlay.mode === 'workspace-symbol' ? goOverlay.value : '')
                  }
                >
                  Workspace Symbol
                </button>
                <button
                  type="button"
                  className={`go-popup-chip ${goOverlay.mode === 'editor-symbol' ? 'active' : ''}`}
                  onClick={() =>
                    openGoOverlay('editor-symbol', goOverlay.mode === 'editor-symbol' ? goOverlay.value : '')
                  }
                >
                  Editor Symbol
                </button>
                <button type="button" className="go-popup-chip" onClick={handleGoToDefinition}>
                  Definition
                </button>
                <button type="button" className="go-popup-chip" onClick={handleGoToReferences}>
                  References
                </button>
              </div>
              <div className="go-popup-body">
                <div className="go-popup-copy">
                  {goOverlay.mode === 'line'
                    ? 'Jump to a specific line and optional column using `line` or `line:column`.'
                    : goOverlay.mode === 'file'
                      ? 'Start typing a file name or path to jump straight to it without opening Search.'
                      : goOverlay.mode === 'workspace-symbol'
                        ? 'Search symbols across the workspace and jump straight to the match.'
                        : 'Search symbols inside the current editor and jump straight to the match.'}
                </div>
                <div className="go-popup-input-row">
                  <input
                    ref={goOverlayInputRef}
                    type="text"
                    className="go-popup-input"
                    value={goOverlay.value}
                    onChange={(event) => setGoOverlay((current) => ({ ...current, value: event.target.value }))}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        submitGoOverlayAction();
                      }
                    }}
                    placeholder={
                      goOverlay.mode === 'line'
                        ? '12 or 12:4'
                        : goOverlay.mode === 'file'
                          ? 'App.jsx or src/App.jsx'
                          : goOverlay.mode === 'workspace-symbol'
                            ? 'Search workspace symbols'
                            : 'Search symbols in current file'
                    }
                    spellCheck={false}
                  />
                  <button type="button" className="go-popup-submit" onClick={submitGoOverlayAction}>
                    Go
                  </button>
                </div>
                {goOverlay.mode === 'line' ? (
                  <div className="go-popup-hint">
                    Current position: line {editorStatus.line || 1}, column {editorStatus.column || 1}
                  </div>
                ) : (
                  <>
                    <div className="go-popup-hint">
                      {goOverlay.loading
                        ? 'Searching...'
                        : goOverlay.error
                          ? goOverlay.error
                          : goOverlay.value.trim()
                            ? `${goOverlay.results.length} quick match${goOverlay.results.length === 1 ? '' : 'es'}`
                            : 'Type to start searching.'}
                    </div>
                    <div className="go-popup-results">
                      {goOverlay.results.length ? (
                        goOverlay.results.map((result) => (
                          <button
                            key={`${result.path}-${result.line || 0}-${result.column || 0}-${result.name}`}
                            type="button"
                            className="go-popup-result"
                            onClick={() => handleGoOverlayResultSelect(result)}
                          >
                            <div className="go-popup-result-title">
                              <span>{result.name}</span>
                              {result.kind === 'symbol' ? (
                                <span className="go-popup-result-badge">{result.symbolType}</span>
                              ) : null}
                            </div>
                            <div className="go-popup-result-path">{result.path}</div>
                            {result.preview ? <div className="go-popup-result-preview">{result.preview}</div> : null}
                          </button>
                        ))
                      ) : (
                        <div className="go-popup-empty">
                          {goOverlay.value.trim()
                            ? 'No quick matches yet. Try a different file name or symbol.'
                            : 'Use the buttons above, then type here to navigate without leaving the popup.'}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
        <StatusBar
          activeTab={activeTab}
          intelliSense={activeIntelliSense}
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
