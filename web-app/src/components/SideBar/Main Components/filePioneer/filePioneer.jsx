import React, { useEffect, useMemo, useState } from 'react';
import {
  HiDocumentText,
  HiFolder,
  HiOutlineBeaker,
  HiOutlineCog6Tooth,
  HiOutlineCube,
  HiOutlineDocument,
  HiOutlineFolder,
  HiOutlineGlobeAlt,
  HiOutlinePhoto,
  HiOutlineServerStack,
  HiOutlineSwatch,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2';
import { FaJava } from 'react-icons/fa6';
import {
  SiCss,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMarkdown,
  SiNpm,
  SiPhp,
  SiPython,
  SiReact,
  SiRuby,
  SiRust,
  SiSass,
  SiTypescript,
  SiVite,
} from 'react-icons/si';
import { TbBinaryTree2, TbLayoutNavbar, TbLayoutSidebarRight } from 'react-icons/tb';
import { PiBracketsCurlyBold } from 'react-icons/pi';

function getFolderVisual(name = '') {
  const normalized = name.toLowerCase();

  const map = {
    src: { Icon: TbBinaryTree2, color: '#4fc3f7' },
    core: { Icon: PiBracketsCurlyBold, color: '#7aa2ff' },
    components: { Icon: HiOutlineCube, color: '#4dd0c8' },
    settings: { Icon: HiOutlineCog6Tooth, color: '#c792ea' },
    sidebar: { Icon: TbLayoutSidebarRight, color: '#8ab4ff' },
    statusbar: { Icon: TbLayoutNavbar, color: '#8ab4ff' },
    tabs: { Icon: HiOutlineFolder, color: '#8ab4ff' },
    welcomepage: { Icon: HiOutlineFolder, color: '#7de4ff' },
    pages: { Icon: HiOutlineFolder, color: '#7de4ff' },
    public: { Icon: HiOutlineGlobeAlt, color: '#58d7c7' },
    assets: { Icon: HiOutlinePhoto, color: '#58d7c7' },
    images: { Icon: HiOutlinePhoto, color: '#58d7c7' },
    icons: { Icon: HiOutlinePhoto, color: '#58d7c7' },
    styles: { Icon: HiOutlineSwatch, color: '#ff88d4' },
    css: { Icon: HiOutlineSwatch, color: '#ff88d4' },
    hooks: { Icon: HiOutlineWrenchScrewdriver, color: '#ffc56d' },
    utils: { Icon: HiOutlineWrenchScrewdriver, color: '#ffc56d' },
    lib: { Icon: HiOutlineWrenchScrewdriver, color: '#ffc56d' },
    services: { Icon: HiOutlineServerStack, color: '#6eb7ff' },
    service: { Icon: HiOutlineServerStack, color: '#6eb7ff' },
    api: { Icon: HiOutlineServerStack, color: '#6eb7ff' },
    filesystem: { Icon: HiOutlineFolder, color: '#c7d0e4' },
    config: { Icon: HiOutlineCog6Tooth, color: '#c792ea' },
    test: { Icon: HiOutlineBeaker, color: '#ff9d73' },
    tests: { Icon: HiOutlineBeaker, color: '#ff9d73' },
    node_modules: { Icon: HiOutlineCube, color: '#7fd36d' },
  };

  return map[normalized] || { Icon: HiFolder, color: '#f0c65e' };
}

function getFileVisual(name = '') {
  const normalized = name.toLowerCase();
  const extension = normalized.includes('.') ? normalized.split('.').pop() : '';

  const exactMap = {
    'package.json': { Icon: SiNpm, color: '#7fd36d' },
    'package-lock.json': { Icon: SiNpm, color: '#7fd36d' },
    'vite.config.js': { Icon: SiVite, color: '#c056ff' },
    'vite.config.ts': { Icon: SiVite, color: '#c056ff' },
    '.gitignore': { Icon: SiGit, color: '#f1502f' },
    'readme.md': { Icon: SiMarkdown, color: '#cfd6ea' },
    'app.jsx': { Icon: SiReact, color: '#61dafb' },
    'main.jsx': { Icon: SiReact, color: '#61dafb' },
    'index.css': { Icon: SiCss, color: '#42a5f5' },
    'workspace.js': { Icon: SiJavascript, color: '#f7df1e' },
  };

  if (exactMap[normalized]) {
    return exactMap[normalized];
  }

  const typeMap = {
    js: { Icon: SiJavascript, color: '#f7df1e' },
    jsx: { Icon: SiReact, color: '#61dafb' },
    ts: { Icon: SiTypescript, color: '#4ea1ff' },
    tsx: { Icon: SiReact, color: '#61dafb' },
    html: { Icon: SiHtml5, color: '#ff8a5b' },
    css: { Icon: SiCss, color: '#42a5f5' },
    scss: { Icon: SiSass, color: '#ff88d4' },
    json: { Icon: SiJsonwebtokens, color: '#c792ea' },
    md: { Icon: SiMarkdown, color: '#cfd6ea' },
    py: { Icon: SiPython, color: '#ffd43b' },
    java: { Icon: FaJava, color: '#ff9b6b' },
    php: { Icon: SiPhp, color: '#8892bf' },
    rb: { Icon: SiRuby, color: '#ff6b6b' },
    rs: { Icon: SiRust, color: '#dea584' },
    sql: { Icon: HiOutlineServerStack, color: '#5eead4' },
    sh: { Icon: HiDocumentText, color: '#94a3ff' },
    png: { Icon: HiOutlinePhoto, color: '#4dd0c8' },
    jpg: { Icon: HiOutlinePhoto, color: '#4dd0c8' },
    jpeg: { Icon: HiOutlinePhoto, color: '#4dd0c8' },
    gif: { Icon: HiOutlinePhoto, color: '#4dd0c8' },
    svg: { Icon: HiOutlinePhoto, color: '#4dd0c8' },
    webp: { Icon: HiOutlinePhoto, color: '#4dd0c8' },
    lock: { Icon: HiOutlineDocument, color: '#c792ea' },
    env: { Icon: HiOutlineDocument, color: '#c792ea' },
    txt: { Icon: HiDocumentText, color: '#cfd6ea' },
  };

  return typeMap[extension] || { Icon: HiOutlineDocument, color: '#cfd6ea' };
}

function InlineCreateRow({ pendingAction, draftName, setDraftName, submitCreate, cancelCreate, depth = 0 }) {
  return (
    <div
      className="explorer-inline-create"
      style={{ marginLeft: `${depth * 14 + 10}px` }}
      onClick={(event) => event.stopPropagation()}
    >
      <span className="explorer-create-label">{pendingAction.type === 'file' ? 'New File' : 'New Folder'}</span>
      <input
        className="explorer-inline-input"
        value={draftName}
        autoFocus
        onChange={(event) => setDraftName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            submitCreate();
          }
          if (event.key === 'Escape') {
            cancelCreate();
          }
        }}
      />
      <div className="explorer-inline-actions">
        <button type="button" className="explorer-toolbar-btn" onClick={submitCreate}>
          Create
        </button>
        <button type="button" className="explorer-toolbar-btn subtle" onClick={cancelCreate}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function TreeNode({
  node,
  depth,
  workspace,
  refresh,
  openFile,
  selectedPath,
  activeTabId,
  startCreate,
  startRename,
  pendingAction,
  draftName,
  setDraftName,
  setPendingAction,
  submitCreate,
  cancelCreate,
  confirmDelete,
}) {
  const [renameValue, setRenameValue] = useState(node.name);
  const isFolder = node.type === 'folder';
  const isSelected = selectedPath === node.path;
  const isActive = activeTabId === node.path;
  const isRenaming = pendingAction?.mode === 'rename' && pendingAction.path === node.path;
  const showsInlineCreate = pendingAction?.mode === 'create' && pendingAction.parentPath === node.path;
  const folderVisual = isFolder ? getFolderVisual(node.name) : null;
  const fileVisual = !isFolder ? getFileVisual(node.name) : null;

  async function submitRename() {
    if (!renameValue.trim()) {
      setRenameValue(node.name);
      setPendingAction(null);
      return;
    }

    await workspace.renameNode(node.path, renameValue);
    setPendingAction(null);
    refresh();
  }

  async function handleDelete() {
    const confirmed = await confirmDelete(node);
    if (!confirmed) {
      return;
    }

    await workspace.deleteNode(node.path);
    refresh();
  }

  async function handleActivate(event) {
    event.stopPropagation();
    workspace.setSelectedNode(node.path);

    if (isFolder) {
      workspace.toggleFolder(node.path);
      refresh();
      return;
    }

    await openFile(node);
  }

  return (
    <div>
      <div
        className={`explorer-node ${isSelected ? 'selected' : ''} ${isActive ? 'active' : ''}`}
        style={{ paddingLeft: `${depth * 6}px` }}
        onClick={handleActivate}
      >
        <div className="explorer-node-main">
          <span className="explorer-node-icon" aria-hidden="true">
            {isFolder ? (node.open ? '\u25BE' : '\u25B8') : ''}
          </span>
          <span className={`explorer-node-type ${isFolder ? 'explorer-folder-type' : 'explorer-file-type'}`} aria-hidden="true">
            {isFolder ? (
              <folderVisual.Icon className="explorer-folder-icon" color={folderVisual.color} />
            ) : (
              <fileVisual.Icon className="explorer-file-icon" color={fileVisual.color} />
            )}
          </span>
          {isRenaming ? (
            <input
              className="explorer-inline-input"
              value={renameValue}
              autoFocus
              onChange={(event) => setRenameValue(event.target.value)}
              onClick={(event) => event.stopPropagation()}
              onBlur={submitRename}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  submitRename();
                }
                if (event.key === 'Escape') {
                  setRenameValue(node.name);
                  setPendingAction(null);
                }
              }}
            />
          ) : (
            <span className="explorer-node-name">{node.name}</span>
          )}
        </div>
        <div className="explorer-node-actions" onClick={(event) => event.stopPropagation()}>
          {isFolder ? (
            <>
              <button
                type="button"
                className="explorer-action-btn"
                title="New File"
                aria-label={`Create file in ${node.name}`}
                onClick={() => startCreate(node.path, 'file')}
              >
                <i className="fa-regular fa-file"></i>
              </button>
              <button
                type="button"
                className="explorer-action-btn"
                title="New Folder"
                aria-label={`Create folder in ${node.name}`}
                onClick={() => startCreate(node.path, 'folder')}
              >
                <i className="fa-solid fa-folder-plus"></i>
              </button>
            </>
          ) : null}
          <button
            type="button"
            className="explorer-action-btn"
            title="Rename"
            aria-label={`Rename ${node.name}`}
            onClick={() => startRename(node)}
          >
            <i className="fa-solid fa-pen"></i>
          </button>
          <button
            type="button"
            className="explorer-action-btn danger"
            title="Delete"
            aria-label={`Delete ${node.name}`}
            onClick={handleDelete}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      {isFolder && node.open ? (
        <>
          {showsInlineCreate ? (
            <InlineCreateRow
              pendingAction={pendingAction}
              draftName={draftName}
              setDraftName={setDraftName}
              submitCreate={submitCreate}
              cancelCreate={cancelCreate}
              depth={depth + 1}
            />
          ) : null}
          {node.children?.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              workspace={workspace}
              refresh={refresh}
              openFile={openFile}
              selectedPath={selectedPath}
              activeTabId={activeTabId}
              startCreate={startCreate}
              startRename={startRename}
              pendingAction={pendingAction}
              draftName={draftName}
              setDraftName={setDraftName}
              setPendingAction={setPendingAction}
              submitCreate={submitCreate}
              cancelCreate={cancelCreate}
              confirmDelete={confirmDelete}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}

function OpenEditorItem({ tab, activeTabId, setActiveTab, closeTab }) {
  return (
    <div className={`explorer-open-editor ${tab.id === activeTabId ? 'active' : ''}`}>
      <button type="button" className="explorer-open-editor-main" onClick={() => setActiveTab(tab.id)}>
        <span className="explorer-open-editor-name">{tab.name}</span>
        <span className="explorer-open-editor-badge">{tab.isUntitled || tab.isDraft ? 'new' : tab.dirty ? '*' : ''}</span>
      </button>
      <button
        type="button"
        className="explorer-open-editor-close"
        aria-label={`Close ${tab.name}`}
        onClick={() => closeTab(tab.id)}
      >
        x
      </button>
    </div>
  );
}

export default function FilePioneer({
  workspace,
  refresh,
  openFile,
  createUntitledFile,
  closeTab,
  activeTabId,
  ariaExpandedisplayfilepioneer,
  triggerOpenFolder,
  createFolderRequestNonce,
  renameRequestNonce,
  confirmDelete,
}) {
  const [pendingAction, setPendingAction] = useState(null);
  const [draftName, setDraftName] = useState('');
  const root = workspace.getRootNode();
  const selectedPath = workspace.selectedNodePath;
  const explorerTabs = workspace.tabs.filter((tab) => !tab.external || tab.isUntitled);

  const title = useMemo(() => (root ? workspace.rootName || root.name : 'No folder opened'), [root, workspace.rootName]);

  function expandPath(path) {
    if (!path) {
      return;
    }

    const segments = path === 'root' ? ['root'] : ['root', ...path.split('/').map((_, index, parts) => parts.slice(0, index + 1).join('/'))];

    segments.forEach((segment) => {
      workspace.expandedPaths.add(segment);
      const node = workspace.findNode(segment);
      if (node?.type === 'folder') {
        node.open = true;
      }
    });
  }

  function startCreate(parentPath, type) {
    if (!workspace.getRootNode()) {
      workspace.ensureDraftRoot();
    }

    workspace.setSelectedNode(parentPath);
    expandPath(parentPath);
    setPendingAction({ mode: 'create', parentPath, type });
    setDraftName(type === 'file' ? 'new-file.txt' : 'new-folder');
  }

  function resolveCreateParentPath() {
    const liveRoot = workspace.getRootNode();
    const liveSelectedPath = workspace.selectedNodePath;

    if (!liveRoot) {
      return null;
    }

    if (!liveSelectedPath || liveSelectedPath === 'root') {
      return liveRoot.path;
    }

    const selectedNode = workspace.findNode(liveSelectedPath);
    if (selectedNode?.type === 'folder') {
      return selectedNode.path;
    }

    if (selectedNode?.type === 'file') {
      return workspace.findParentPath(selectedNode.path);
    }

    return liveRoot.path;
  }

  function startRename(node) {
    workspace.setSelectedNode(node.path);
    setPendingAction({ mode: 'rename', path: node.path });
    setDraftName(node.name);
  }

  function cancelCreate() {
    setPendingAction(null);
    setDraftName('');
  }

  async function submitCreate() {
    if (!pendingAction || pendingAction.mode !== 'create') {
      return;
    }

    if (pendingAction.type === 'file') {
      await workspace.createFile(pendingAction.parentPath, draftName);
    } else {
      await workspace.createFolder(pendingAction.parentPath, draftName);
    }

    cancelCreate();
    refresh();
  }

  useEffect(() => {
    if (!createFolderRequestNonce) {
      return;
    }

    const parentPath = resolveCreateParentPath() || 'root';
    startCreate(parentPath, 'folder');
  }, [createFolderRequestNonce]);

  useEffect(() => {
    if (!renameRequestNonce) {
      return;
    }

    const path = workspace.selectedNodePath;
    if (!path || path === 'root') {
      return;
    }

    const node = workspace.findNode(path);
    if (node) {
      startRename(node);
    }
  }, [renameRequestNonce]);

  async function handleRefresh() {
    await workspace.reloadTree();
    refresh();
  }

  function handleCollapseAll() {
    workspace.collapseAll();
    refresh();
  }

  function handleExplorerNewFile() {
    const parentPath = resolveCreateParentPath();
    if (parentPath) {
      startCreate(parentPath, 'file');
      return;
    }

    createUntitledFile();
  }

  function handleExplorerNewFolder() {
    const parentPath = resolveCreateParentPath();
    if (!parentPath) {
      startCreate('root', 'folder');
      return;
    }

    startCreate(parentPath, 'folder');
  }

  return (
    <div id="filepioneerarea" className={`sidebarscontent d-${ariaExpandedisplayfilepioneer}`}>
      <div className="explorer-shell">
        <div className="explorer-header">
          <div>
            <p className="explorer-eyebrow">Explorer</p>
            <h6 className="explorer-title">{title}</h6>
          </div>
          <div className="explorer-toolbar">
            <button
              type="button"
              className="explorer-toolbar-btn"
              title="New File"
              aria-label="New File"
              onClick={handleExplorerNewFile}
            >
              <i className="fa-regular fa-file"></i>
            </button>
            <button
              type="button"
              className="explorer-toolbar-btn"
              title="New Folder"
              aria-label="New Folder"
              onClick={handleExplorerNewFolder}
            >
              <i className="fa-solid fa-folder-plus"></i>
            </button>
            <button
              type="button"
              className="explorer-toolbar-btn"
              title="Open Folder"
              aria-label="Open Folder"
              onClick={triggerOpenFolder}
            >
              <i className="fa-regular fa-folder-open"></i>
            </button>
            {root ? (
              <>
                <button
                  type="button"
                  className="explorer-toolbar-btn"
                  title="Refresh Explorer"
                  aria-label="Refresh Explorer"
                  onClick={handleRefresh}
                >
                  <i className="fa-solid fa-rotate-right"></i>
                </button>
                <button
                  type="button"
                  className="explorer-toolbar-btn"
                  title="Collapse Folders"
                  aria-label="Collapse Folders"
                  onClick={handleCollapseAll}
                >
                  <i className="fa-solid fa-angles-up"></i>
                </button>
              </>
            ) : null}
          </div>
        </div>

        {explorerTabs.length ? (
          <div className="explorer-section">
            <div className="explorer-section-title">OPEN EDITORS</div>
            <div className="explorer-open-editors">
              {explorerTabs.map((tab) => (
                <OpenEditorItem
                  key={tab.id}
                  tab={tab}
                  activeTabId={activeTabId}
                  setActiveTab={(id) => {
                    workspace.setActiveTab(id);
                    refresh();
                  }}
                  closeTab={closeTab}
                />
              ))}
            </div>
          </div>
        ) : null}

        {!root ? (
          <div className="explorer-empty-state">
            <p>Create files and folders in a draft workspace here, or open an existing folder. Save individual files or use Save Workspace As later.</p>
          </div>
        ) : (
          <div
            className="explorer-section explorer-tree-section"
            onClick={(event) => {
              if (event.target.closest('.explorer-node, .explorer-inline-create')) {
                return;
              }

              workspace.setSelectedNode('root');
              refresh();
            }}
          >
            <div className="explorer-section-title">FILES</div>
            <div className="explorer-tree">
              {pendingAction?.mode === 'create' && pendingAction.parentPath === 'root' ? (
                <InlineCreateRow
                  pendingAction={pendingAction}
                  draftName={draftName}
                  setDraftName={setDraftName}
                  submitCreate={submitCreate}
                  cancelCreate={cancelCreate}
                />
              ) : null}
              {root.children.map((node) => (
                <TreeNode
                  key={node.path}
                  node={node}
                  depth={0}
                  workspace={workspace}
                  refresh={refresh}
                  openFile={openFile}
                  selectedPath={selectedPath}
                  activeTabId={activeTabId}
                  startCreate={startCreate}
                  startRename={startRename}
                  pendingAction={pendingAction}
                  draftName={draftName}
                  setDraftName={setDraftName}
                  setPendingAction={setPendingAction}
                  submitCreate={submitCreate}
                  cancelCreate={cancelCreate}
                  confirmDelete={confirmDelete}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
