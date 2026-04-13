import fs from 'fs';
import path from 'path';

// Generate Massive React Craft Snippets
function generateReactCraftSnippets() {
  const snippets = [];
  
  // 1. Core React Hooks & Helpers
  const hooks = [
    { label: 'useState', insertText: 'const [${1:state}, set${2:State}] = useState(${3:initialState});', detail: 'useState hook' },
    { label: 'useEffect', insertText: 'useEffect(() => {\n\t${1}\n\treturn () => {\n\t\t${2}\n\t};\n}, [${3}]);', detail: 'useEffect hook' },
    { label: 'useContext', insertText: 'const ${1:value} = useContext(${2:MyContext});', detail: 'useContext hook' },
    { label: 'useReducer', insertText: 'const [state, dispatch] = useReducer(${1:reducer}, ${2:initialState});', detail: 'useReducer hook' },
    { label: 'useCallback', insertText: 'const ${1:memoizedCallback} = useCallback(\n\t() => {\n\t\t${2}\n\t},\n\t[${3}],\n);', detail: 'useCallback hook' },
    { label: 'useMemo', insertText: 'const ${1:memoizedValue} = useMemo(() => ${2:computeExpensiveValue}(${3:a}, ${4:b}), [${5:a}, ${6:b}]);', detail: 'useMemo hook' },
    { label: 'useRef', insertText: 'const ${1:refContainer} = useRef(${2:initialValue});', detail: 'useRef hook' },
    { label: 'useImperativeHandle', insertText: 'useImperativeHandle(${1:ref}, () => ({\n\t${2}\n}));', detail: 'useImperativeHandle hook' },
    { label: 'useLayoutEffect', insertText: 'useLayoutEffect(() => {\n\t${1}\n\treturn () => {\n\t\t${2}\n\t};\n}, [${3}]);', detail: 'useLayoutEffect hook' },
    { label: 'useDebugValue', insertText: 'useDebugValue(${1:value});', detail: 'useDebugValue hook' },
    { label: 'rfc', insertText: 'export default function ${1:ComponentName}({ ${2:props} }) {\n\treturn (\n\t\t<div>\n\t\t\t${3}\n\t\t</div>\n\t);\n}', detail: 'React Functional Component' },
    { label: 'rfce', insertText: 'import React from \'react\';\n\nfunction ${1:ComponentName}() {\n\treturn (\n\t\t<div>\n\t\t\t${2}\n\t\t</div>\n\t);\n}\n\nexport default ${1:ComponentName};', detail: 'React Functional Component with Export' },
    { label: 'imr', insertText: 'import React from \'react\';', detail: 'Import React' },
    { label: 'imrc', insertText: 'import React, { Component } from \'react\';', detail: 'Import React Component' },
    { label: 'imrs', insertText: 'import React, { useState } from \'react\';', detail: 'Import React and useState hook' },
    { label: 'imrse', insertText: 'import React, { useState, useEffect } from \'react\';', detail: 'Import React, useState and useEffect hooks' }
  ];
  snippets.push(...hooks);

  // 2. HTML Elements (as JSX)
  const htmlTags = [
    'div', 'span', 'p', 'a', 'button', 'img', 'ul', 'li', 'ol', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot',
    'form', 'input', 'textarea', 'select', 'option', 'label', 'iframe', 'header', 'footer', 'nav', 'main', 'section',
    'article', 'aside', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'hr', 'strong', 'em', 'b', 'i', 'u', 's', 'pre', 'code'
  ];
  htmlTags.forEach(tag => {
    snippets.push({
      label: `<${tag}>`,
      insertText: `<${tag}>\n\t\${1}\n</${tag}>`,
      detail: `JSX Element <${tag}>`
    });
    snippets.push({
      label: `<${tag} className>`,
      insertText: `<${tag} className="\${1}">\n\t\${2}\n</${tag}>`,
      detail: `JSX Element <${tag}> with className`
    });
    if (['img', 'input', 'br', 'hr'].includes(tag)) {
        snippets.push({
            label: `<${tag} />`,
            insertText: `<${tag} \${1} />`,
            detail: `Self-closing <${tag}>`
        });
    }
  });

  // 3. React Events
  const events = [
    'onClick', 'onChange', 'onSubmit', 'onKeyDown', 'onKeyUp', 'onKeyPress', 'onFocus', 'onBlur', 
    'onMouseEnter', 'onMouseLeave', 'onMouseOver', 'onMouseOut', 'onMouseMove', 'onMouseDown', 'onMouseUp',
    'onScroll', 'onCopy', 'onCut', 'onPaste', 'onDrag', 'onDrop', 'onDragStart', 'onDragEnd'
  ];
  events.forEach(ev => {
    snippets.push({
      label: ev,
      insertText: `${ev}={(e) => \${1}}`,
      detail: `React ${ev} handler`
    });
  });

  // 4. Tailwind Generators
  const colors = ['slate','zinc','neutral','stone','red','orange','amber','yellow','lime','green','emerald','teal','cyan','sky','blue','indigo','violet','purple','fuchsia','pink','rose'];
  const shades = ['50','100','200','300','400','500','600','700','800','900','950'];
  
  colors.forEach(col => {
    shades.forEach(shade => {
      snippets.push({ label: `tw-bg-${col}-${shade}`, insertText: `bg-${col}-${shade}`, detail: `Tailwind Background Color` });
      snippets.push({ label: `tw-text-${col}-${shade}`, insertText: `text-${col}-${shade}`, detail: `Tailwind Text Color` });
      snippets.push({ label: `tw-border-${col}-${shade}`, insertText: `border-${col}-${shade}`, detail: `Tailwind Border Color` });
    });
  });

  // Numbers for spacing/sizing
  const sizes = ['0','0.5','1','1.5','2','2.5','3','3.5','4','5','6','7','8','9','10','11','12','14','16','20','24','28','32','36','40','44','48','52','56','60','64','72','80','96'];
  const props = ['p','px','py','pt','pb','pl','pr','m','mx','my','mt','mb','ml','mr','gap','gap-x','gap-y','w','h'];
  
  props.forEach(prop => {
    sizes.forEach(size => {
      snippets.push({ label: `tw-${prop}-${size}`, insertText: `${prop}-${size}`, detail: `Tailwind spacing/sizing` });
    });
  });

  // Remove duplicates and fix format
  const uniqueMap = new Map();
  snippets.forEach(s => uniqueMap.set(s.label, Object.assign({}, s, { kind: 'snippet' })));

  return Array.from(uniqueMap.values());
}

// Write the macOS Tahoe Glass Theme
function generateGlassDarkTheme() {
  const css = `
    body {
      --bg-color-base: rgba(14, 16, 21, 0.75) !important;
      --sidebar-bg: rgba(22, 25, 33, 0.6) !important;
      --nav-bg: rgba(22, 25, 33, 0.4) !important;
      --accent-color: #0A84FF !important;
      --text-color: #E0E0E0 !important;
      --text-muted: #A0A0A5 !important;
      --border-color: rgba(255, 255, 255, 0.08) !important;
      --hover-bg: rgba(255, 255, 255, 0.1) !important;
      backdrop-filter: blur(24px) saturate(160%) !important;
      -webkit-backdrop-filter: blur(24px) saturate(160%) !important;
      background-image: linear-gradient(135deg, rgba(30,35,45,0.4) 0%, rgba(10,15,25,0.8) 100%) !important;
      color: var(--text-color) !important;
    }
    
    .monaco-editor, .monaco-editor-background, .monaco-editor .margin {
      background: transparent !important;
      --vscode-editor-background: transparent !important;
    }

    /* MacOS rounded corners style */
    .app-root {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .sidebar {
      border-right: 1px solid var(--border-color) !important;
      background: var(--sidebar-bg) !important;
      backdrop-filter: blur(20px) !important;
    }

    /* Scrollbars minimalist */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.2);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.3);
    }
  `;

  return `export async function activate(api) {
  api.styles.mount(\`${css}\`, 'theme');
  api.notifications.info('Glass Dark (macOS Tahoe) Theme loaded successfully! Welcome to the glassy experience.');
}`;
}

const basePath = path.join(process.cwd(), 'public', 'extensions');

function createExtension(id, content) {
  const dirPath = path.join(basePath, id);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'main.js'), content);
  console.log(`[Ext Builder] Generated ${id}`);
}

// 1. Generate React Craft
const reactCraftSnippets = generateReactCraftSnippets();
const reactCraftContent = `export async function activate(api) {
  console.log('React Craft Ultra loaded ${reactCraftSnippets.length} snippets');
  api.completions.register('javascript', ${JSON.stringify(reactCraftSnippets, null, 2)});
  api.completions.register('javascriptreact', ${JSON.stringify(reactCraftSnippets, null, 2)});
  api.completions.register('typescript', ${JSON.stringify(reactCraftSnippets, null, 2)});
  api.completions.register('typescriptreact', ${JSON.stringify(reactCraftSnippets, null, 2)});
  api.notifications.info('React Craft Ultra activated with ${reactCraftSnippets.length} massive snippets!');
}`;

createExtension('react-craft', reactCraftContent);

// 2. Generate Glass Dark Theme
createExtension('glass-dark', generateGlassDarkTheme());

// 3. Generate Console Ninja
const consoleNinjaSnippets = [
  { label: 'clg', insertText: 'console.log(${1});', detail: 'console.log' },
  { label: 'cco', insertText: 'console.count(\'${1}\');', detail: 'console.count' },
  { label: 'cerr', insertText: 'console.error(${1});', detail: 'console.error' },
  { label: 'cwarn', insertText: 'console.warn(${1});', detail: 'console.warn' },
  { label: 'ctable', insertText: 'console.table(${1});', detail: 'console.table' },
  { label: 'ctime', insertText: 'console.time(\'${1}\');\n${2}\nconsole.timeEnd(\'${1}\');', detail: 'console.time/timeEnd block' },
  { label: 'cgroup', insertText: 'console.group(\'${1}\');\n${2}\nconsole.groupEnd();', detail: 'console.group block' },
].map(s => ({...s, kind: 'snippet'}));

const consoleNinjaContent = `export async function activate(api) {
  api.completions.register('javascript', ${JSON.stringify(consoleNinjaSnippets, null, 2)});
  api.completions.register('typescript', ${JSON.stringify(consoleNinjaSnippets, null, 2)});
  
  api.commands.register('clean-logs', async () => {
    api.notifications.info('Console Ninja: All logs cleaned (Simulated).');
  });
  api.notifications.info('Console Ninja activated. Drop those logs!');
}`;
createExtension('console-ninja', consoleNinjaContent);

// 4. Generate Mock Data Gen
const mockDataSnippets = [
  { 
    label: 'mock-users', 
    insertText: '[\n  { id: 1, name: "Alice", email: "alice@example.com" },\n  { id: 2, name: "Bob", email: "bob@example.com" },\n  { id: 3, name: "Charlie", email: "charlie@example.com" }\n]',
    detail: 'Array of 3 mock users'
  },
  { 
    label: 'mock-products', 
    insertText: '[\n  { id: 101, title: "Laptop XYZ", price: 999.99, stock: 15 },\n  { id: 102, title: "Wireless Mouse", price: 25.50, stock: 120 }\n]',
    detail: 'Array of mock products'
  },
  { 
    label: 'mock-uuid', 
    insertText: '"${1:123e4567-e89b-12d3-a456-426614174000}"',
    detail: 'Mock UUID v4 string'
  }
].map(s => ({...s, kind: 'snippet'}));

const mockDataContent = `export async function activate(api) {
  api.completions.register('javascript', ${JSON.stringify(mockDataSnippets, null, 2)});
  api.completions.register('typescript', ${JSON.stringify(mockDataSnippets, null, 2)});
  api.completions.register('json', ${JSON.stringify(mockDataSnippets, null, 2)});
  api.notifications.info('Mock Data Gen is ready.');
}`;
createExtension('mock-data-gen', mockDataContent);

// 5. Generate Lorem Gen
const loremSnippets = [
  { label: 'lorem-short', insertText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', detail: 'Short Lorem' },
  { label: 'lorem-medium', insertText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.', detail: 'Medium Lorem' },
  { label: 'lorem-long', insertText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.', detail: 'Long Lorem' },
].map(s => ({...s, kind: 'snippet'}));

const loremContent = `export async function activate(api) {
  api.completions.register('plaintext', ${JSON.stringify(loremSnippets, null, 2)});
  api.completions.register('markdown', ${JSON.stringify(loremSnippets, null, 2)});
  api.completions.register('html', ${JSON.stringify(loremSnippets, null, 2)});
  api.notifications.info('Lorem Gen snippets injected.');
}`;
createExtension('lorem-gen', loremContent);

console.log('All extensions built successfully!');
