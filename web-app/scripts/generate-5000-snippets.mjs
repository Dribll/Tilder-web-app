import fs from 'fs';
import path from 'path';

function buildMassiveSnippets() {
  const snippets = [];

  // Core React (Comprehensive List)
  const core = [
    // imports
    { label: "imr", insertText: "import React from 'react';", detail: "Import React" },
    { label: "imrd", insertText: "import ReactDOM from 'react-dom';", detail: "Import ReactDOM" },
    { label: "imrc", insertText: "import React, { Component } from 'react';", detail: "Import React and Component" },
    { label: "imrpc", insertText: "import React, { PureComponent } from 'react';", detail: "Import React and PureComponent" },
    { label: "imrm", insertText: "import React, { memo } from 'react';", detail: "Import React and memo" },
    { label: "impt", insertText: "import PropTypes from 'prop-types';", detail: "Import PropTypes" },
    { label: "imp", insertText: "import ${2:moduleName} from '${1:module}';", detail: "Import module" },
    { label: "imd", insertText: "import { $2 } from '$1';", detail: "Import destructured module" },
    
    // components
    { label: "rfc", insertText: "import React from 'react';\n\nexport default function ${1:FileName}() {\n  return (\n    <div>\n      $0\n    </div>\n  );\n}", detail: "React Functional Component" },
    { label: "rfce", insertText: "import React from 'react';\n\nfunction ${1:FileName}() {\n  return (\n    <div>\n      $0\n    </div>\n  );\n}\n\nexport default ${1:FileName};", detail: "React Functional Component Export" },
    { label: "rafc", insertText: "import React from 'react';\n\nexport const ${1:FileName} = () => {\n  return (\n    <div>\n      $0\n    </div>\n  );\n};", detail: "React Arrow Functional Component" },
    { label: "rafce", insertText: "import React from 'react';\n\nconst ${1:FileName} = () => {\n  return (\n    <div>\n      $0\n    </div>\n  );\n};\n\nexport default ${1:FileName};", detail: "React Arrow Functional Component Export" },
    { label: "rfic", insertText: "import React from 'react';\n\nexport default function Index() {\n  return (\n    <div>\n      $0\n    </div>\n  );\n}", detail: "React Functional Index Component" },
    { label: "rfice", insertText: "import React from 'react';\n\nfunction Index() {\n  return (\n    <div>\n      $0\n    </div>\n  );\n}\n\nexport default Index;", detail: "React Functional Index Component Export" },
    { label: "rcc", insertText: "import React, { Component } from 'react';\n\nexport default class ${1:FileName} extends Component {\n  render() {\n    return (\n      <div>\n        $0\n      </div>\n    );\n  }\n}", detail: "React Class Component" },
    { label: "rce", insertText: "import React, { Component } from 'react';\n\nclass ${1:FileName} extends Component {\n  render() {\n    return (\n      <div>\n        $0\n      </div>\n    );\n  }\n}\n\nexport default ${1:FileName};", detail: "React Class Component Export" },

    // hooks
    { label: "useState", insertText: "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState(${2:initialState});", detail: "useState Hook" },
    { label: "useEffect", insertText: "useEffect(() => {\n  $1\n\n  return () => {\n    $2\n  };\n}, [$3]);", detail: "useEffect Hook" },
    { label: "useContext", insertText: "const ${1:context} = useContext(${2:Context});", detail: "useContext Hook" },
    { label: "useReducer", insertText: "const [state, dispatch] = useReducer(${1:reducer}, ${2:initialState}, ${3:init});", detail: "useReducer Hook" },
    { label: "useCallback", insertText: "const ${1:memoizedCallback} = useCallback(\n  () => {\n    $2\n  },\n  [$3],\n);", detail: "useCallback Hook" },
    { label: "useMemo", insertText: "const ${1:memoizedValue} = useMemo(() => ${2:computeExpensiveValue}(${3:a}, ${4:b}), [$3, $4]);", detail: "useMemo Hook" },
    { label: "useRef", insertText: "const ${1:ref} = useRef(${2:initialValue});", detail: "useRef Hook" },
    
    // Context
    { label: "rcontext", insertText: "import React, { createContext } from 'react';\n\nexport const ${1:Context} = createContext();", detail: "React Context" },

    // Router
    { label: "rrr", insertText: "import { BrowserRouter as Router, Route, Link } from 'react-router-dom';", detail: "React Router basics" },

    // console
    { label: "clg", insertText: "console.log($1);", detail: "console.log" },
    { label: "cer", insertText: "console.error($1);", detail: "console.error" },
    { label: "cwa", insertText: "console.warn($1);", detail: "console.warn" },

    // redux
    { label: "rxaction", insertText: "export const ${1:actionName} = (payload) => ({\n  type: ${2:TYPE},\n  payload\n});", detail: "Redux Action" },
    { label: "rxreducer", insertText: "const initialState = {\n  \n};\n\nexport default (state = initialState, { type, payload }) => {\n  switch (type) {\n\n  case ${1:typeName}:\n    return { ...state, ...payload };\n\n  default:\n    return state;\n  }\n};", detail: "Redux Reducer" }
  ];
  
  const duplicatedCore = [];
  core.forEach(snip => {
    duplicatedCore.push(snip);
    if(snip.label.toLowerCase() !== snip.label) {
      duplicatedCore.push({ ...snip, label: snip.label.toLowerCase(), detail: snip.detail + " (lowercase)" });
    }
  });

  snippets.push(...duplicatedCore);

  // HTML JSX Elements (110+)
  const htmlTags = [
    'a','abbr','address','area','article','aside','audio','b','base','bdi','bdo','blockquote','body','br','button','canvas','caption','cite','code','col','colgroup','data','datalist','dd','del','details','dfn','dialog','div','dl','dt','em','embed','fieldset','figcaption','figure','footer','form','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','i','iframe','img','input','ins','kbd','label','legend','li','link','main','map','mark','meta','meter','nav','noscript','object','ol','optgroup','option','output','p','param','picture','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','small','source','span','strong','style','sub','summary','sup','svg','table','tbody','td','template','textarea','tfoot','th','thead','time','title','tr','track','u','ul','var','video','wbr'
  ];
  htmlTags.forEach(t => {
    snippets.push({ label: `<${t}>`, insertText: `<${t}>\\n\\t\${1}\\n</${t}>`, detail: `JSX <${t}>` });
    snippets.push({ label: `<${t} className>`, insertText: `<${t} className="\${1}">\\n\\t\${2}\\n</${t}>`, detail: `JSX <${t}> with string class` });
    snippets.push({ label: `<${t} clsx>`, insertText: `<${t} className={clsx(\${1})}>\\n\\t\${2}\\n</${t}>`, detail: `JSX <${t}> with clsx` });
  });

  // DOM Events (about 60)
  const events = [
    'onClick', 'onDoubleClick', 'onContextMenu', 'onKeyDown', 'onKeyUp', 'onKeyPress', 'onFocus', 'onBlur', 
    'onChange', 'onInput', 'onInvalid', 'onSubmit', 'onError', 'onLoad', 'onMouseEnter', 'onMouseLeave', 
    'onMouseOver', 'onMouseOut', 'onMouseMove', 'onMouseDown', 'onMouseUp', 'onScroll', 'onCopy', 'onCut', 
    'onPaste', 'onDrag', 'onDrop', 'onDragStart', 'onDragEnd', 'onDragEnter', 'onDragLeave', 'onDragOver', 
    'onSelect', 'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'onAnimationStart', 
    'onAnimationEnd', 'onAnimationIteration', 'onTransitionEnd', 'onCompositionStart', 'onCompositionUpdate', 
    'onCompositionEnd', 'onPointerDown', 'onPointerMove', 'onPointerUp', 'onPointerCancel', 'onGotPointerCapture', 
    'onLostPointerCapture', 'onPointerEnter', 'onPointerLeave', 'onPointerOver', 'onPointerOut'
  ];
  events.forEach(ev => {
    snippets.push({ label: ev, insertText: `${ev}={(e) => \${1}}`, detail: `React ${ev} handler` });
    snippets.push({ label: `${ev} inline`, insertText: `${ev}={(() => \${1})}`, detail: `React ${ev} inline fallback` });
  });

  // Tailwind Properties
  const colors = ['slate','gray','zinc','neutral','stone','red','orange','amber','yellow','lime','green','emerald','teal','cyan','sky','blue','indigo','violet','purple','fuchsia','pink','rose'];
  const shades = ['50','100','200','300','400','500','600','700','800','900','950'];
  const colProps = ['bg', 'text', 'border', 'outline', 'ring', 'fill', 'stroke', 'shadow', 'decoration', 'accent', 'caret'];
  
  colors.forEach(col => {
    shades.forEach(shade => {
      colProps.forEach(prop => {
        snippets.push({ label: `tw-${prop}-${col}-${shade}`, insertText: `${prop}-${col}-${shade}`, detail: `Tailwind ${prop}` });
      });
    }); 
  });

  const sizes = ['0','px','0.5','1','1.5','2','2.5','3','3.5','4','5','6','7','8','9','10','11','12','14','16','20','24','28','32','36','40','44','48','52','56','60','64','72','80','96','auto','1/2','1/3','2/3','1/4','2/4','3/4','1/5','full','screen','min','max','fit'];
  const spaceProps = ['p','px','py','pt','pb','pl','pr','m','mx','my','mt','mb','ml','mr','gap','gap-x','gap-y','space-x','space-y','inset','top','bottom','left','right','translate-x','translate-y'];
  
  spaceProps.forEach(prop => {
    sizes.forEach(size => {
      snippets.push({ label: `tw-${prop}-${size}`, insertText: `${prop}-${size}`, detail: `Tailwind ${prop}` });
    });
  }); 

  const sizingProps = ['w','h','min-w','min-h','max-w','max-h'];
  sizingProps.forEach(prop => {
    sizes.forEach(size => {
      snippets.push({ label: `tw-${prop}-${size}`, insertText: `${prop}-${size}`, detail: `Tailwind ${prop}` });
    });
  }); 

  const statics = ['flex', 'inline-flex', 'grid', 'hidden', 'block', 'inline-block', 'absolute', 'relative', 'fixed', 'sticky', 'static', 'italic', 'uppercase', 'lowercase', 'capitalize', 'normal-nums', 'truncate', 'sr-only', 'not-sr-only', 'antialiased', 'subpixel-antialiased', 'break-normal', 'break-words', 'break-all'];
  statics.forEach(s => {
    snippets.push({ label: `tw-${s}`, insertText: s, detail: `Tailwind ${s}` });
  }); 

  // Icon Imports (simulate around 200 common icon names from lucide/fa/etc)
  const iconSuffixes = ['Icon', 'Outline', 'Solid'];
  const baseIcons = ['Home', 'User', 'Settings', 'Menu', 'X', 'Check', 'Search', 'Bell', 'Mail', 'Heart', 'Star', 'Camera', 'Map', 'Calendar', 'Clock', 'Trash', 'Edit', 'Plus', 'Minus', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'ChevronDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Play', 'Pause', 'Stop', 'VolumeX', 'Volume2', 'Mic', 'MicOff', 'Video', 'VideoOff', 'Monitor', 'Smartphone', 'Tablet', 'Laptop', 'Watch', 'Headphones', 'Speaker', 'Wifi', 'Bluetooth', 'Battery', 'BatteryCharging', 'BatteryFull', 'BatteryLow'];
  
  baseIcons.forEach(icon => {
    iconSuffixes.forEach(suf => {
      const name = `${icon}${suf}`;
      snippets.push({ label: `Icon: ${name}`, insertText: `<${name} className="\${1:w-6 h-6}" />`, detail: `Icon Component ${name}` });
      snippets.push({ label: `import { ${name} }`, insertText: `import { ${name} } from 'lucide-react';`, detail: 'Icon Lucide Import' });
    });
  }); 

  // React Router
  const routerParts = ['Link', 'Route', 'Routes', 'BrowserRouer', 'Navigate', 'Outlet', 'useNavigate', 'useLocation', 'useParams', 'useSearchParams'];
  routerParts.forEach(rt => {
    snippets.push({ label: `react-router: ${rt}`, insertText: rt, detail: `React Router component ${rt}` });
  });

  // Convert all to kind=snippet
  const finalList = snippets.map(s => ({...s, kind: 'snippet'}));

  return finalList;
}

const allSnippets = buildMassiveSnippets();
console.log("Generated " + allSnippets.length + " snippets for react-craft");

const content = [
  "export async function activate(api) {",
  "  const snippets = " + JSON.stringify(allSnippets, null, 2) + ";",
  "  ",
  "  api.completions.register('javascript', snippets);",
  "  api.completions.register('javascriptreact', snippets);",
  "  api.completions.register('typescript', snippets);",
  "  api.completions.register('typescriptreact', snippets);",
  "  ",
  "  api.commands.register('run-tests', () => {",
  "    api.notifications.info('Started test runner for react-craft environment.');",
  "  });",
  "  ",
  "  api.notifications.info('React Craft activated! Loaded massive amount of snippets.');",
  "}",
  ""
].join("\\n");

const outPath = path.join(process.cwd(), 'public', 'extensions', 'react-craft', 'main.js');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, content);
console.log('Successfully wrote to public/extensions/react-craft/main.js');
