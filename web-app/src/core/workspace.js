function sortNodes(nodes) {
  return [...nodes].sort((left, right) => {
    if (left.type !== right.type) {
      return left.type === 'folder' ? -1 : 1;
    }

    return left.name.localeCompare(right.name);
  });
}

function joinPath(parentPath, name) {
  if (!parentPath || parentPath === 'root') {
    return name;
  }

  return `${parentPath}/${name}`;
}

function cloneNode(node) {
  return {
    ...node,
    children: node.children ? node.children.map(cloneNode) : undefined,
  };
}

const workspace = {
  adapter: typeof window !== 'undefined' && window.__TAURI__ ? 'tauri' : 'browser',
  rootHandle: null,
  rootName: '',
  tree: [],
  tabs: [],
  activeTabId: null,
  selectedNodePath: null,
  expandedPaths: new Set(['root']),
  untitledCounter: 1,

  getLanguage(name = '') {
    const ext = name.includes('.') ? name.split('.').pop().toLowerCase() : '';
    const map = {
      c: 'c',
      cpp: 'cpp',
      cs: 'csharp',
      css: 'css',
      go: 'go',
      h: 'cpp',
      html: 'html',
      java: 'java',
      js: 'javascript',
      json: 'json',
      jsx: 'javascript',
      md: 'markdown',
      php: 'php',
      py: 'python',
      rb: 'ruby',
      rs: 'rust',
      sh: 'shell',
      sql: 'sql',
      ts: 'typescript',
      tsx: 'typescript',
      txt: 'plaintext',
      vue: 'html',
      xml: 'xml',
      yml: 'yaml',
      yaml: 'yaml',
    };

    return map[ext] || 'plaintext';
  },

  hasRealWorkspace() {
    return !!this.rootHandle;
  },

  getRootNode() {
    return this.tree[0] || null;
  },

  ensureDraftRoot() {
    if (this.rootHandle) {
      return this.getRootNode();
    }

    let root = this.getRootNode();
    if (!root) {
      root = {
        id: 'root',
        path: 'root',
        name: 'Untitled Workspace',
        type: 'folder',
        open: true,
        isDraft: true,
        children: [],
      };
      this.tree = [root];
    }

    this.expandedPaths.add('root');
    return root;
  },

  normalizeTabs() {
    const availablePaths = new Set();

    const collectPaths = (nodes) => {
      nodes.forEach((node) => {
        availablePaths.add(node.path);
        if (node.children?.length) {
          collectPaths(node.children);
        }
      });
    };

    collectPaths(this.tree);

    this.tabs = this.tabs.filter((tab) => {
      return tab.external || tab.isUntitled || tab.isDraft || availablePaths.has(tab.path);
    });

    if (!this.tabs.length) {
      this.activeTabId = null;
      return;
    }

    if (!this.tabs.some((tab) => tab.id === this.activeTabId)) {
      this.activeTabId = this.tabs[this.tabs.length - 1].id;
    }
  },

  async openFolderBrowser() {
    const dirHandle = await window.showDirectoryPicker();
    this.rootHandle = dirHandle;
    this.rootName = dirHandle.name;
    this.expandedPaths = new Set(['root']);
    await this.reloadTree();
  },

  async reloadTree() {
    if (!this.rootHandle) {
      const root = this.getRootNode();
      this.tree = root ? [cloneNode(root)] : [];
      this.normalizeTabs();
      return;
    }

    const root = await this.readDirectory(this.rootHandle, '', 'root');
    root.name = this.rootName || root.name;
    root.open = true;
    this.tree = [root];
    this.reconcileTabsWithTree();
    this.normalizeTabs();
  },

  async readDirectory(handle, relativePath = '', idPath = relativePath || 'root') {
    const children = [];

    for await (const entry of handle.values()) {
      const entryPath = joinPath(relativePath, entry.name);

      if (entry.kind === 'directory') {
        const node = await this.readDirectory(entry, entryPath, entryPath);
        node.name = entry.name;
        node.path = entryPath;
        node.id = entryPath;
        node.handle = entry;
        node.type = 'folder';
        node.open = this.expandedPaths.has(entryPath);
        children.push(node);
      } else {
        children.push({
          id: entryPath,
          path: entryPath,
          name: entry.name,
          type: 'file',
          handle: entry,
          parentPath: relativePath || 'root',
          isDraft: false,
        });
      }
    }

    return {
      id: idPath,
      path: relativePath || 'root',
      name: handle.name,
      type: 'folder',
      handle,
      open: this.expandedPaths.has(idPath) || idPath === 'root',
      parentPath: relativePath ? relativePath.split('/').slice(0, -1).join('/') || 'root' : null,
      children: sortNodes(children),
      isDraft: false,
    };
  },

  reconcileTabsWithTree() {
    this.tabs = this.tabs.map((tab) => {
      if (tab.external || (!this.rootHandle && tab.isDraft)) {
        return tab;
      }

      const node = this.findNode(tab.path);
      if (!node) {
        return tab;
      }

      return {
        ...tab,
        id: node.path,
        path: node.path,
        name: node.name,
        handle: node.handle || null,
        language: this.getLanguage(node.name),
        isDraft: !!node.isDraft,
      };
    });
  },

  findNode(path, nodes = this.tree) {
    for (const node of nodes) {
      if (node.path === path || node.id === path) {
        return node;
      }

      if (node.children?.length) {
        const nested = this.findNode(path, node.children);
        if (nested) {
          return nested;
        }
      }
    }

    return null;
  },

  async findNodeByHandle(handle, nodes = this.tree) {
    for (const node of nodes) {
      if (node.handle?.isSameEntry && (await node.handle.isSameEntry(handle))) {
        return node;
      }

      if (node.children?.length) {
        const nested = await this.findNodeByHandle(handle, node.children);
        if (nested) {
          return nested;
        }
      }
    }

    return null;
  },

  findParentPath(path) {
    if (!path || path === 'root') {
      return 'root';
    }

    const parts = path.split('/');
    parts.pop();
    return parts.length ? parts.join('/') : 'root';
  },

  setSelectedNode(path) {
    this.selectedNodePath = path;
  },

  setActiveTab(id) {
    const tab = this.tabs.find((entry) => entry.id === id);
    if (!tab) {
      return;
    }

    this.activeTabId = tab.id;
    this.selectedNodePath = tab.external ? null : tab.path;
  },

  getActiveTab() {
    return this.tabs.find((tab) => tab.id === this.activeTabId) || null;
  },

  getUniqueChildName(parent, desiredName) {
    const existing = new Set((parent.children || []).map((child) => child.name));
    if (!existing.has(desiredName)) {
      return desiredName;
    }

    const parts = desiredName.split('.');
    const extension = parts.length > 1 ? `.${parts.pop()}` : '';
    const base = parts.join('.') || desiredName;
    let index = 1;
    let nextName = `${base}-${index}${extension}`;

    while (existing.has(nextName)) {
      index += 1;
      nextName = `${base}-${index}${extension}`;
    }

    return nextName;
  },

  sortNodeChildren(parent) {
    if (parent?.children) {
      parent.children = sortNodes(parent.children);
    }
  },

  createDraftNode(parentPath, name, type) {
    const root = this.ensureDraftRoot();
    const parent = parentPath === 'root' ? root : this.findNode(parentPath);
    if (!parent || parent.type !== 'folder') {
      return null;
    }

    const finalName = this.getUniqueChildName(parent, name.trim());
    const path = joinPath(parent.path, finalName);
    const node = {
      id: path,
      path,
      name: finalName,
      type,
      open: type === 'folder' ? true : undefined,
      parentPath: parent.path,
      isDraft: true,
      content: type === 'file' ? '' : undefined,
      children: type === 'folder' ? [] : undefined,
    };

    parent.children.push(node);
    parent.open = true;
    this.expandedPaths.add(parent.path);
    this.expandedPaths.add(path);
    this.sortNodeChildren(parent);
    return node;
  },

  createUntitledFile(parentPath = 'root') {
    if (!this.rootHandle) {
      const node = this.createDraftNode(parentPath, `untitled-${this.untitledCounter}.txt`, 'file');
      this.untitledCounter += 1;
      if (!node) {
        return null;
      }

      const tab = {
        id: node.path,
        path: node.path,
        name: node.name,
        handle: null,
        content: '',
        savedContent: '',
        language: this.getLanguage(node.name),
        dirty: false,
        external: false,
        isUntitled: true,
        isDraft: true,
      };

      this.tabs.push(tab);
      this.activeTabId = tab.id;
      this.selectedNodePath = node.path;
      return tab;
    }

    const id = `untitled:${Date.now()}:${this.untitledCounter}`;
    const name = `untitled-${this.untitledCounter}.txt`;
    this.untitledCounter += 1;

    const tab = {
      id,
      path: id,
      name,
      handle: null,
      content: '',
      savedContent: '',
      language: this.getLanguage(name),
      dirty: false,
      external: false,
      isUntitled: true,
      isDraft: true,
    };

    this.tabs.push(tab);
    this.activeTabId = tab.id;
    this.selectedNodePath = null;
    return tab;
  },

  async readFile(node) {
    const file = await node.handle.getFile();
    return file.text();
  },

  async openExternalFile() {
    const [handle] = await window.showOpenFilePicker();
    const file = await handle.getFile();
    const content = await file.text();
    const id = `external:${handle.name}`;
    const existing = this.tabs.find((tab) => tab.id === id);

    if (existing) {
      existing.content = content;
      existing.savedContent = content;
      existing.handle = handle;
      existing.isUntitled = false;
      existing.isDraft = false;
      this.activeTabId = existing.id;
      return existing;
    }

    const tab = {
      id,
      path: id,
      external: true,
      isUntitled: false,
      isDraft: false,
      name: handle.name,
      handle,
      content,
      savedContent: content,
      language: this.getLanguage(handle.name),
      dirty: false,
    };

    this.tabs.push(tab);
    this.activeTabId = tab.id;
    this.selectedNodePath = null;
    return tab;
  },

  async openFile(nodeOrPath) {
    const node = typeof nodeOrPath === 'string' ? this.findNode(nodeOrPath) : nodeOrPath;

    if (!node || node.type !== 'file') {
      return null;
    }

    const existing = this.tabs.find((tab) => tab.path === node.path);
    if (existing) {
      this.activeTabId = existing.id;
      this.selectedNodePath = node.path;
      return existing;
    }

    const content = node.isDraft ? node.content || '' : await this.readFile(node);
    const tab = {
      id: node.path,
      path: node.path,
      name: node.name,
      handle: node.handle || null,
      content,
      savedContent: content,
      language: this.getLanguage(node.name),
      dirty: false,
      external: false,
      isUntitled: !!node.isDraft,
      isDraft: !!node.isDraft,
    };

    this.tabs.push(tab);
    this.activeTabId = tab.id;
    this.selectedNodePath = node.path;
    return tab;
  },

  closeTab(id) {
    const currentIndex = this.tabs.findIndex((tab) => tab.id === id);
    if (currentIndex === -1) {
      return;
    }

    this.tabs.splice(currentIndex, 1);

    if (!this.tabs.length) {
      this.activeTabId = null;
      return;
    }

    if (this.activeTabId === id) {
      const nextIndex = Math.max(0, currentIndex - 1);
      this.activeTabId = this.tabs[nextIndex].id;
      this.selectedNodePath = this.tabs[nextIndex].external ? null : this.tabs[nextIndex].path;
    }
  },

  closeOtherTabs(id) {
    this.tabs = this.tabs.filter((tab) => tab.id === id);
    this.activeTabId = this.tabs[0]?.id || null;
    this.selectedNodePath = this.tabs[0]?.external ? null : this.tabs[0]?.path || null;
  },

  closeAllTabs() {
    this.tabs = [];
    this.activeTabId = null;
    this.selectedNodePath = null;
  },

  updateTabContent(id, content) {
    const tab = this.tabs.find((entry) => entry.id === id);
    if (!tab) {
      return;
    }

    tab.content = content ?? '';
    tab.dirty = tab.content !== tab.savedContent;

    if (tab.isDraft) {
      const node = this.findNode(tab.path);
      if (node) {
        node.content = tab.content;
      }
    }
  },

  removeNodeFromTree(path, nodes = this.tree) {
    for (let index = 0; index < nodes.length; index += 1) {
      const node = nodes[index];
      if (node.path === path) {
        nodes.splice(index, 1);
        return node;
      }

      if (node.children?.length) {
        const removed = this.removeNodeFromTree(path, node.children);
        if (removed) {
          return removed;
        }
      }
    }

    return null;
  },

  updateNodePaths(node, parentPath) {
    node.parentPath = parentPath;
    node.path = joinPath(parentPath, node.name);
    node.id = node.path;

    if (node.children?.length) {
      node.children.forEach((child) => this.updateNodePaths(child, node.path));
    }
  },

  remapTabsForPath(oldPath, nextPath, updates = {}) {
    this.tabs = this.tabs.map((tab) => {
      if (!tab.path.startsWith(oldPath)) {
        return tab;
      }

      const updatedPath = tab.path.replace(oldPath, nextPath);
      const updatedName = updatedPath.split('/').pop();

      return {
        ...tab,
        id: updatedPath,
        path: updatedPath,
        name: updatedName,
        language: this.getLanguage(updatedName),
        ...updates,
      };
    });

    if (this.activeTabId?.startsWith(oldPath)) {
      this.activeTabId = this.activeTabId.replace(oldPath, nextPath);
    }

    if (this.selectedNodePath?.startsWith(oldPath)) {
      this.selectedNodePath = this.selectedNodePath.replace(oldPath, nextPath);
    }
  },

  async saveTab(id, options = {}) {
    const tab = this.tabs.find((entry) => entry.id === id);
    if (!tab) {
      return false;
    }

    const shouldPromptForLocation = options.saveAs || !tab.handle;
    if (shouldPromptForLocation) {
      const handle = await window.showSaveFilePicker({ suggestedName: tab.name });
      tab.handle = handle;
      tab.name = handle.name;
      tab.language = this.getLanguage(handle.name);
    }

    const writable = await tab.handle.createWritable();
    await writable.write(tab.content ?? '');
    await writable.close();

    tab.savedContent = tab.content ?? '';
    tab.dirty = false;
    tab.isUntitled = false;

    if (this.rootHandle) {
      await this.reloadTree();
      const matchingNode = await this.findNodeByHandle(tab.handle);

      if (matchingNode) {
        tab.id = matchingNode.path;
        tab.path = matchingNode.path;
        tab.name = matchingNode.name;
        tab.handle = matchingNode.handle;
        tab.external = false;
        tab.isDraft = false;
        this.selectedNodePath = matchingNode.path;
      } else {
        tab.id = `external:${tab.name}`;
        tab.path = tab.id;
        tab.external = true;
        tab.isDraft = false;
        this.selectedNodePath = null;
      }
    } else if (tab.isDraft) {
      const previousPath = tab.path;
      const node = this.findNode(previousPath);

      if (node) {
        node.name = tab.name;
        node.handle = tab.handle;
        node.content = tab.content ?? '';
        node.isDraft = true;
        this.updateNodePaths(node, this.findParentPath(previousPath));

        this.tabs = this.tabs.map((entry) => {
          if (!entry.path.startsWith(previousPath)) {
            return entry;
          }

          const updatedPath = entry.path.replace(previousPath, node.path);
          return {
            ...entry,
            id: updatedPath,
            path: updatedPath,
            name: updatedPath.split('/').pop(),
            handle: entry.id === id ? tab.handle : entry.handle,
            language: this.getLanguage(updatedPath.split('/').pop()),
          };
        });

        tab.id = node.path;
        tab.path = node.path;
        tab.external = false;
        tab.isDraft = true;
        this.selectedNodePath = node.path;
        this.activeTabId = node.path;
      } else {
        tab.id = `external:${tab.name}`;
        tab.path = tab.id;
        tab.external = true;
        tab.isDraft = false;
        this.selectedNodePath = null;
        this.activeTabId = tab.id;
      }

      this.normalizeTabs();
    } else {
      tab.id = `external:${tab.name}`;
      tab.path = tab.id;
      tab.external = true;
      tab.isDraft = false;
      this.selectedNodePath = null;
      this.activeTabId = tab.id;
    }

    this.activeTabId = tab.id;
    return true;
  },

  async saveWorkspaceAs() {
    const root = this.getRootNode();
    if (this.rootHandle || !root) {
      return false;
    }

    const dirHandle = await window.showDirectoryPicker();
    await this.writeDraftTree(dirHandle, root);

    this.rootHandle = dirHandle;
    this.rootName = dirHandle.name;
    await this.reloadTree();

    this.tabs = this.tabs.map((tab) => {
      if (!tab.isDraft) {
        return tab;
      }

      const node = this.findNode(tab.path);
      if (!node) {
        return {
          ...tab,
          id: `external:${tab.name}`,
          path: `external:${tab.name}`,
          external: true,
          isDraft: false,
          isUntitled: false,
        };
      }

      return {
        ...tab,
        id: node.path,
        path: node.path,
        name: node.name,
        handle: node.handle,
        external: false,
        isDraft: false,
        isUntitled: false,
      };
    });

    this.normalizeTabs();
    this.activeTabId = this.getActiveTab()?.id || this.tabs[0]?.id || null;
    return true;
  },

  async writeDraftTree(directoryHandle, node) {
    for (const child of node.children || []) {
      if (child.type === 'folder') {
        const nextDir = await directoryHandle.getDirectoryHandle(child.name, { create: true });
        await this.writeDraftTree(nextDir, child);
      } else {
        const fileHandle = await directoryHandle.getFileHandle(child.name, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(child.content || '');
        await writable.close();
      }
    }
  },

  async createFile(parentPath, name) {
    const trimmedName = name?.trim();
    if (!trimmedName) {
      return null;
    }

    if (!this.rootHandle) {
      const node = this.createDraftNode(parentPath, trimmedName, 'file');
      if (node) {
        await this.openFile(node);
      }
      return node;
    }

    const parent = parentPath === 'root' ? this.getRootNode() : this.findNode(parentPath);
    if (!parent || parent.type !== 'folder') {
      return null;
    }

    const handle = await parent.handle.getFileHandle(trimmedName, { create: true });
    const path = joinPath(parent.path, trimmedName);
    this.expandedPaths.add(parent.path);
    await this.reloadTree();
    const node = this.findNode(path);
    if (node) {
      node.handle = handle;
      await this.openFile(node);
    }
    return node;
  },

  async createFolder(parentPath, name) {
    const trimmedName = name?.trim();
    if (!trimmedName) {
      return null;
    }

    if (!this.rootHandle) {
      return this.createDraftNode(parentPath, trimmedName, 'folder');
    }

    const parent = parentPath === 'root' ? this.getRootNode() : this.findNode(parentPath);
    if (!parent || parent.type !== 'folder') {
      return null;
    }

    await parent.handle.getDirectoryHandle(trimmedName, { create: true });
    const path = joinPath(parent.path, trimmedName);
    this.expandedPaths.add(parent.path);
    this.expandedPaths.add(path);
    await this.reloadTree();
    return this.findNode(path);
  },

  async deleteNode(path) {
    const node = this.findNode(path);
    if (!node || node.path === 'root') {
      return;
    }

    if (!this.rootHandle || node.isDraft) {
      this.removeNodeFromTree(node.path);
      this.tabs = this.tabs.filter((tab) => tab.external || !tab.path.startsWith(node.path));
      if (this.selectedNodePath?.startsWith(node.path)) {
        this.selectedNodePath = this.findParentPath(node.path);
      }
      if (this.activeTabId && !this.tabs.some((tab) => tab.id === this.activeTabId)) {
        this.activeTabId = this.tabs[this.tabs.length - 1]?.id || null;
      }
      this.normalizeTabs();
      return;
    }

    const parentPath = this.findParentPath(node.path);
    const parent = parentPath === 'root' ? this.getRootNode() : this.findNode(parentPath);
    if (!parent) {
      return;
    }

    await parent.handle.removeEntry(node.name, { recursive: node.type === 'folder' });

    this.tabs = this.tabs.filter((tab) => tab.external || !tab.path.startsWith(node.path));
    if (this.selectedNodePath?.startsWith(node.path)) {
      this.selectedNodePath = parent.path;
    }
    if (this.activeTabId && !this.tabs.some((tab) => tab.id === this.activeTabId)) {
      this.activeTabId = this.tabs[this.tabs.length - 1]?.id || null;
    }
    this.expandedPaths.delete(node.path);
    await this.reloadTree();
  },

  async renameNode(path, newName) {
    const trimmedName = newName?.trim();
    const node = this.findNode(path);
    if (!node || node.path === 'root' || !trimmedName || trimmedName === node.name) {
      return node;
    }

    if (!this.rootHandle && node.type === 'file' && node.handle) {
      const oldPath = node.path;
      const linkedTab = this.tabs.find((tab) => tab.path === oldPath);
      const nextHandle = await window.showSaveFilePicker({ suggestedName: trimmedName });
      const writable = await nextHandle.createWritable();
      await writable.write(linkedTab?.content ?? node.content ?? '');
      await writable.close();

      node.name = nextHandle.name;
      node.handle = nextHandle;
      node.content = linkedTab?.content ?? node.content ?? '';
      this.updateNodePaths(node, this.findParentPath(oldPath));
      this.sortNodeChildren(this.findNode(this.findParentPath(node.path)));
      this.remapTabsForPath(oldPath, node.path, {
        handle: nextHandle,
        savedContent: linkedTab?.content ?? node.content ?? '',
      });
      return node;
    }

    if (!this.rootHandle || node.isDraft) {
      const oldPath = node.path;
      node.name = trimmedName;
      this.updateNodePaths(node, this.findParentPath(oldPath));
      this.sortNodeChildren(this.findNode(this.findParentPath(node.path)));
      this.remapTabsForPath(oldPath, node.path);
      return node;
    }

    const parentPath = this.findParentPath(node.path);
    const parent = parentPath === 'root' ? this.getRootNode() : this.findNode(parentPath);
    if (!parent) {
      return node;
    }

    let renamedHandle = null;
    if (node.type === 'file') {
      const file = await node.handle.getFile();
      const content = await file.text();
      renamedHandle = await parent.handle.getFileHandle(trimmedName, { create: true });
      const writable = await renamedHandle.createWritable();
      await writable.write(content);
      await writable.close();
    } else {
      const newDirHandle = await parent.handle.getDirectoryHandle(trimmedName, { create: true });
      await this.copyDirectory(node.handle, newDirHandle);
    }

    await parent.handle.removeEntry(node.name, { recursive: node.type === 'folder' });

    const nextPath = joinPath(parent.path, trimmedName);
    const affectedExpanded = [...this.expandedPaths].filter((entry) => entry === node.path || entry.startsWith(`${node.path}/`));
    affectedExpanded.forEach((entry) => {
      this.expandedPaths.delete(entry);
      this.expandedPaths.add(entry.replace(node.path, nextPath));
    });

    this.tabs = this.tabs.map((tab) => {
      if (tab.external || tab.isDraft || !tab.path.startsWith(node.path)) {
        return tab;
      }

      const updatedPath = tab.path.replace(node.path, nextPath);
      return {
        ...tab,
        id: updatedPath,
        path: updatedPath,
        name: updatedPath.split('/').pop(),
        handle: tab.path === node.path ? renamedHandle : tab.handle,
        language: this.getLanguage(updatedPath.split('/').pop()),
      };
    });

    if (this.activeTabId?.startsWith(node.path)) {
      this.activeTabId = this.activeTabId.replace(node.path, nextPath);
    }

    if (this.selectedNodePath?.startsWith(node.path)) {
      this.selectedNodePath = this.selectedNodePath.replace(node.path, nextPath);
    }

    await this.reloadTree();
    return this.findNode(nextPath);
  },

  async copyDirectory(sourceHandle, destinationHandle) {
    for await (const entry of sourceHandle.values()) {
      if (entry.kind === 'file') {
        const file = await entry.getFile();
        const targetFile = await destinationHandle.getFileHandle(entry.name, { create: true });
        const writable = await targetFile.createWritable();
        await writable.write(await file.text());
        await writable.close();
      } else {
        const targetDir = await destinationHandle.getDirectoryHandle(entry.name, { create: true });
        await this.copyDirectory(entry, targetDir);
      }
    }
  },

  toggleFolder(path) {
    if (this.expandedPaths.has(path)) {
      this.expandedPaths.delete(path);
    } else {
      this.expandedPaths.add(path);
    }

    const node = this.findNode(path);
    if (node?.type === 'folder') {
      node.open = this.expandedPaths.has(path);
    }
  },

  collapseAll() {
    this.expandedPaths = new Set(['root']);
    const root = this.getRootNode();
    if (root) {
      root.open = true;
      root.children?.forEach((child) => {
        if (child.type === 'folder') {
          child.open = false;
        }
      });
    }
  },
};

export default workspace;
