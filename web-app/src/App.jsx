import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import MenuBar from './components/MenuBar/MenuBar.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
import ReviewBar from './components/ReviewBar/ReviewBar.jsx';
import StatusBar from './components/StatusBar/StatusBar.jsx';
import Tabs from './components/Tabs/Tabs.jsx';
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
import Settings from './components/Settings/Settings.jsx';
import Extensions from './components/Extensions/Extensions.jsx';
import MonacoEditor from './components/Editor/MonacoEditor.jsx';
import shortcutManager from './components/ShortcutManager.js';
import defaultSettings from './components/Settings/defaultSettings.js';
import workspace from './core/workspace.js';

function App() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('editorSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [activePanel, setActivePanel] = useState('filepioneer');
  const [infoDisplay, setInfoDisplay] = useState('none');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [welcomeTabOpen, setWelcomeTabOpen] = useState(true);
  const [createFolderRequestNonce, setCreateFolderRequestNonce] = useState(0);
  const [renameRequestNonce, setRenameRequestNonce] = useState(0);
  const [, setVersion] = useState(0);
  const saveTimersRef = useRef({});
  const editorRef = useRef(null);
  const modalOpenRef = useRef(modalOpen);
  const modalTypeRef = useRef(modalType);

  useEffect(() => {
    localStorage.setItem('editorSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    modalOpenRef.current = modalOpen;
    modalTypeRef.current = modalType;
  }, [modalOpen, modalType]);

  function refresh() {
    setVersion((current) => current + 1);
  }

  function closeCurrentModal() {
    setModalOpen(false);
    setModalType('');
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

  useEffect(() => {
    return () => {
      Object.values(saveTimersRef.current).forEach((timerId) => clearTimeout(timerId));
    };
  }, []);

  const tabs = workspace.tabs;
  const activeTab = workspace.getActiveTab();
  const welcomeTab = welcomeTabOpen ? [{ id: '__welcome__', name: 'Welcome', dirty: false }] : [];
  const visibleTabs = [...welcomeTab, ...tabs];
  const hasSidebar = activePanel !== null;
  const maincodeareaStyle = useMemo(
    () => ({ width: hasSidebar ? '72vw' : '92vw', height: '83.5vh' }),
    [hasSidebar]
  );
  const monacoEditorStyle = useMemo(
    () => ({ width: hasSidebar ? '72vw' : '92vw', height: '83.5vh', opacity: '1' }),
    [hasSidebar]
  );

  function onEditorMount(editor) {
    editorRef.current = editor;
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
    queueSave(activeTab.id);
  }

  async function handleOpenFolder() {
    try {
      await workspace.openFolderBrowser();
      setActivePanel('filepioneer');
      refresh();
    } catch {
      // User cancelled the folder picker.
    }
  }

  async function handleOpenFileDialog() {
    try {
      await workspace.openExternalFile();
      refresh();
    } catch {
      // User cancelled the file picker.
    }
  }

  async function handleOpenNode(node) {
    await workspace.openFile(node);
    refresh();
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

  async function handleSaveActiveFile() {
    if (!activeTab) {
      return;
    }

    try {
      const saved = await workspace.saveTab(activeTab.id);
      if (saved) {
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

  function handleCloseTab(id) {
    if (id === '__welcome__') {
      setWelcomeTabOpen(false);
      if (!workspace.getActiveTab()) {
        refresh();
      }
      return;
    }

    const tab = workspace.tabs.find((entry) => entry.id === id);
    if (tab?.dirty) {
      const confirmed = window.confirm(`Close ${tab.name} without saving the latest changes?`);
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
    shortcutManager.registerKeys([
      {
        key: 'ctrl+,',
        action: () => toggleSettingsFromState(),
      },
      {
        key: 'ctrl+b',
        action: () => setActivePanel((current) => (current ? null : 'filepioneer')),
      },
      {
        key: 'ctrl+n',
        action: () => handleCreateUntitledFile(),
      },
      {
        key: 'ctrl+shift+n',
        action: () => handleCreateFolder(),
      },
      {
        key: 'ctrl+s',
        action: () => handleSaveActiveFile(),
      },
      {
        key: 'ctrl+shift+s',
        action: () => handleSaveAsActiveFile(),
      },
      {
        key: 'ctrl+o',
        action: () => handleOpenFileDialog(),
      },
      {
        key: 'ctrl+shift+o',
        action: () => handleOpenFolder(),
      },
      {
        key: 'f2',
        action: () => handleRenameSelected(),
      },
      {
        key: 'ctrl+h',
        action: () => runEditorAction('editor.action.startFindReplaceAction'),
      },
      {
        key: 'ctrl+f',
        action: () => runEditorAction('actions.find'),
      },
    ]);
  }, [modalOpen, modalType, activePanel, activeTab?.id, workspace.selectedNodePath]);

  const panelDisplay = (panel) => (activePanel === panel ? 'flex' : 'none');
  const showWelcomePage = !activeTab && welcomeTabOpen;
  const showDefaultPage = !activeTab && !welcomeTabOpen;
  const tabActiveId = activeTab ? workspace.activeTabId : (welcomeTabOpen ? '__welcome__' : null);

  return (
    <>
      <Info triggerInfoClose={triggerInfoClose} InfoDisplay={infoDisplay} />
      <Modal isOpen={modalOpen} closeModal={closeCurrentModal} title={modalType}>
        <Settings modalType={modalType} settings={settings} setSettings={setSettings} />
        <Extensions modalType={modalType} />
      </Modal>
      <div id="mainProductivityArea">
        <MenuBar
          toggleInfoDisplay={toggleInfoDisplay}
          triggerNewFile={handleCreateUntitledFile}
          triggerNewFolder={handleCreateFolder}
          openSettings={toggleSettings}
          openExtensions={openExtensions}
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
        />
        <div className="mainsect">
          <div className="codewrpr">
            <ReviewBar />
            <div className="maincodearea" style={maincodeareaStyle}>
              <Tabs tabs={visibleTabs} activeTabId={tabActiveId} setActiveTab={handleTabClick} closeTab={handleCloseTab} />
              {activeTab ? (
                <MonacoEditor
                  key={activeTab.id}
                  tab={activeTab}
                  onChange={handleEditorChange}
                  onMount={onEditorMount}
                  settings={settings}
                  MonacoEditorDisplay="flex"
                  monacoEditorStyle={monacoEditorStyle}
                />
              ) : null}
              {showDefaultPage ? <DefaultPage DefaultPageDisplay="flex" dimensionsDefaultPage={maincodeareaStyle} /> : null}
              {showWelcomePage ? (
                <WelcomePage
                  DimensionsWelcomePage={maincodeareaStyle}
                  WelcomePageDisplay="flex"
                  triggerNewFile={handleCreateUntitledFile}
                  triggerOpenFolder={handleOpenFolder}
                  triggerOpenFile={handleOpenFileDialog}
                  triggerNewFolder={handleCreateFolder}
                />
              ) : null}
            </div>
          </div>
          <div className="SideBarmainwrper">
            <CodeBlocks ariaExpandedisplaycodeblocks={panelDisplay('codeblocks')} />
            <Terminal ariaExpandedisplayterminal={panelDisplay('terminal')} />
            <Git ariaExpandedisplaygit={panelDisplay('git')} />
            <Extensions ariaExpandedisplayextensions={panelDisplay('extensions')} />
            <GitHub ariaExpandedisplaygithub={panelDisplay('github')} />
            <Debug ariaExpandedisplaydebug={panelDisplay('debug')} />
            <Search ariaExpandedisplaysearch={panelDisplay('search')} />
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
            />
            <SideBar
              toggleAriaExpandedfilepioneer={() => toggleSidebarPanel('filepioneer')}
              toggleAriaExpandedsearch={() => toggleSidebarPanel('search')}
              toggleAriaExpandedextensions={openExtensions}
              toggleAriaExpandedterminal={() => toggleSidebarPanel('terminal')}
              toggleAriaExpandedebug={() => toggleSidebarPanel('debug')}
              toggleAriaExpandedgit={() => toggleSidebarPanel('git')}
              toggleAriaExpandedgithub={() => toggleSidebarPanel('github')}
              toggleAriaExpandedcodeblocks={() => toggleSidebarPanel('codeblocks')}
            />
          </div>
        </div>
        <StatusBar />
      </div>
    </>
  );
}

export default App;
