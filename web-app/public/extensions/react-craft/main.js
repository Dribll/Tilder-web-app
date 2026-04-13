export async function activate(api) {\n  const snippets = [
  {
    "label": "imr",
    "insertText": "import React from 'react';",
    "detail": "Import React",
    "kind": "snippet"
  },
  {
    "label": "imrd",
    "insertText": "import ReactDOM from 'react-dom';",
    "detail": "Import ReactDOM",
    "kind": "snippet"
  },
  {
    "label": "imrc",
    "insertText": "import React, { Component } from 'react';",
    "detail": "Import React and Component",
    "kind": "snippet"
  },
  {
    "label": "imrpc",
    "insertText": "import React, { PureComponent } from 'react';",
    "detail": "Import React and PureComponent",
    "kind": "snippet"
  },
  {
    "label": "imrm",
    "insertText": "import React, { memo } from 'react';",
    "detail": "Import React and memo",
    "kind": "snippet"
  },
  {
    "label": "impt",
    "insertText": "import PropTypes from 'prop-types';",
    "detail": "Import PropTypes",
    "kind": "snippet"
  },
  {
    "label": "imp",
    "insertText": "import ${2:moduleName} from '${1:module}';",
    "detail": "Import module",
    "kind": "snippet"
  },
  {
    "label": "imd",
    "insertText": "import { $2 } from '$1';",
    "detail": "Import destructured module",
    "kind": "snippet"
  },
  {
    "label": "rfc",
    "insertText": "import React from 'react';\n\nexport default function ${1:FileName}() {\n  return (\n    <div>\n      $0\n    </div>\n  );\n}",
    "detail": "React Functional Component",
    "kind": "snippet"
  },
  {
    "label": "rfce",
    "insertText": "import React from 'react';\n\nfunction ${1:FileName}() {\n  return (\n    <div>\n      $0\n    </div>\n  );\n}\n\nexport default ${1:FileName};",
    "detail": "React Functional Component Export",
    "kind": "snippet"
  },
  {
    "label": "rafc",
    "insertText": "import React from 'react';\n\nexport const ${1:FileName} = () => {\n  return (\n    <div>\n      $0\n    </div>\n  );\n};",
    "detail": "React Arrow Functional Component",
    "kind": "snippet"
  },
  {
    "label": "rafce",
    "insertText": "import React from 'react';\n\nconst ${1:FileName} = () => {\n  return (\n    <div>\n      $0\n    </div>\n  );\n};\n\nexport default ${1:FileName};",
    "detail": "React Arrow Functional Component Export",
    "kind": "snippet"
  },
  {
    "label": "rfic",
    "insertText": "import React from 'react';\n\nexport default function Index() {\n  return (\n    <div>\n      $0\n    </div>\n  );\n}",
    "detail": "React Functional Index Component",
    "kind": "snippet"
  },
  {
    "label": "rfice",
    "insertText": "import React from 'react';\n\nfunction Index() {\n  return (\n    <div>\n      $0\n    </div>\n  );\n}\n\nexport default Index;",
    "detail": "React Functional Index Component Export",
    "kind": "snippet"
  },
  {
    "label": "rcc",
    "insertText": "import React, { Component } from 'react';\n\nexport default class ${1:FileName} extends Component {\n  render() {\n    return (\n      <div>\n        $0\n      </div>\n    );\n  }\n}",
    "detail": "React Class Component",
    "kind": "snippet"
  },
  {
    "label": "rce",
    "insertText": "import React, { Component } from 'react';\n\nclass ${1:FileName} extends Component {\n  render() {\n    return (\n      <div>\n        $0\n      </div>\n    );\n  }\n}\n\nexport default ${1:FileName};",
    "detail": "React Class Component Export",
    "kind": "snippet"
  },
  {
    "label": "useState",
    "insertText": "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState(${2:initialState});",
    "detail": "useState Hook",
    "kind": "snippet"
  },
  {
    "label": "usestate",
    "insertText": "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState(${2:initialState});",
    "detail": "useState Hook (lowercase)",
    "kind": "snippet"
  },
  {
    "label": "useEffect",
    "insertText": "useEffect(() => {\n  $1\n\n  return () => {\n    $2\n  };\n}, [$3]);",
    "detail": "useEffect Hook",
    "kind": "snippet"
  },
  {
    "label": "useeffect",
    "insertText": "useEffect(() => {\n  $1\n\n  return () => {\n    $2\n  };\n}, [$3]);",
    "detail": "useEffect Hook (lowercase)",
    "kind": "snippet"
  },
  {
    "label": "useContext",
    "insertText": "const ${1:context} = useContext(${2:Context});",
    "detail": "useContext Hook",
    "kind": "snippet"
  },
  {
    "label": "usecontext",
    "insertText": "const ${1:context} = useContext(${2:Context});",
    "detail": "useContext Hook (lowercase)",
    "kind": "snippet"
  },
  {
    "label": "useReducer",
    "insertText": "const [state, dispatch] = useReducer(${1:reducer}, ${2:initialState}, ${3:init});",
    "detail": "useReducer Hook",
    "kind": "snippet"
  },
  {
    "label": "usereducer",
    "insertText": "const [state, dispatch] = useReducer(${1:reducer}, ${2:initialState}, ${3:init});",
    "detail": "useReducer Hook (lowercase)",
    "kind": "snippet"
  },
  {
    "label": "useCallback",
    "insertText": "const ${1:memoizedCallback} = useCallback(\n  () => {\n    $2\n  },\n  [$3],\n);",
    "detail": "useCallback Hook",
    "kind": "snippet"
  },
  {
    "label": "usecallback",
    "insertText": "const ${1:memoizedCallback} = useCallback(\n  () => {\n    $2\n  },\n  [$3],\n);",
    "detail": "useCallback Hook (lowercase)",
    "kind": "snippet"
  },
  {
    "label": "useMemo",
    "insertText": "const ${1:memoizedValue} = useMemo(() => ${2:computeExpensiveValue}(${3:a}, ${4:b}), [$3, $4]);",
    "detail": "useMemo Hook",
    "kind": "snippet"
  },
  {
    "label": "usememo",
    "insertText": "const ${1:memoizedValue} = useMemo(() => ${2:computeExpensiveValue}(${3:a}, ${4:b}), [$3, $4]);",
    "detail": "useMemo Hook (lowercase)",
    "kind": "snippet"
  },
  {
    "label": "useRef",
    "insertText": "const ${1:ref} = useRef(${2:initialValue});",
    "detail": "useRef Hook",
    "kind": "snippet"
  },
  {
    "label": "useref",
    "insertText": "const ${1:ref} = useRef(${2:initialValue});",
    "detail": "useRef Hook (lowercase)",
    "kind": "snippet"
  },
  {
    "label": "rcontext",
    "insertText": "import React, { createContext } from 'react';\n\nexport const ${1:Context} = createContext();",
    "detail": "React Context",
    "kind": "snippet"
  },
  {
    "label": "rrr",
    "insertText": "import { BrowserRouter as Router, Route, Link } from 'react-router-dom';",
    "detail": "React Router basics",
    "kind": "snippet"
  },
  {
    "label": "clg",
    "insertText": "console.log($1);",
    "detail": "console.log",
    "kind": "snippet"
  },
  {
    "label": "cer",
    "insertText": "console.error($1);",
    "detail": "console.error",
    "kind": "snippet"
  },
  {
    "label": "cwa",
    "insertText": "console.warn($1);",
    "detail": "console.warn",
    "kind": "snippet"
  },
  {
    "label": "rxaction",
    "insertText": "export const ${1:actionName} = (payload) => ({\n  type: ${2:TYPE},\n  payload\n});",
    "detail": "Redux Action",
    "kind": "snippet"
  },
  {
    "label": "rxreducer",
    "insertText": "const initialState = {\n  \n};\n\nexport default (state = initialState, { type, payload }) => {\n  switch (type) {\n\n  case ${1:typeName}:\n    return { ...state, ...payload };\n\n  default:\n    return state;\n  }\n};",
    "detail": "Redux Reducer",
    "kind": "snippet"
  },
  {
    "label": "<a>",
    "insertText": "<a>\\n\\t${1}\\n</a>",
    "detail": "JSX <a>",
    "kind": "snippet"
  },
  {
    "label": "<a className>",
    "insertText": "<a className=\"${1}\">\\n\\t${2}\\n</a>",
    "detail": "JSX <a> with string class",
    "kind": "snippet"
  },
  {
    "label": "<a clsx>",
    "insertText": "<a className={clsx(${1})}>\\n\\t${2}\\n</a>",
    "detail": "JSX <a> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<abbr>",
    "insertText": "<abbr>\\n\\t${1}\\n</abbr>",
    "detail": "JSX <abbr>",
    "kind": "snippet"
  },
  {
    "label": "<abbr className>",
    "insertText": "<abbr className=\"${1}\">\\n\\t${2}\\n</abbr>",
    "detail": "JSX <abbr> with string class",
    "kind": "snippet"
  },
  {
    "label": "<abbr clsx>",
    "insertText": "<abbr className={clsx(${1})}>\\n\\t${2}\\n</abbr>",
    "detail": "JSX <abbr> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<address>",
    "insertText": "<address>\\n\\t${1}\\n</address>",
    "detail": "JSX <address>",
    "kind": "snippet"
  },
  {
    "label": "<address className>",
    "insertText": "<address className=\"${1}\">\\n\\t${2}\\n</address>",
    "detail": "JSX <address> with string class",
    "kind": "snippet"
  },
  {
    "label": "<address clsx>",
    "insertText": "<address className={clsx(${1})}>\\n\\t${2}\\n</address>",
    "detail": "JSX <address> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<area>",
    "insertText": "<area>\\n\\t${1}\\n</area>",
    "detail": "JSX <area>",
    "kind": "snippet"
  },
  {
    "label": "<area className>",
    "insertText": "<area className=\"${1}\">\\n\\t${2}\\n</area>",
    "detail": "JSX <area> with string class",
    "kind": "snippet"
  },
  {
    "label": "<area clsx>",
    "insertText": "<area className={clsx(${1})}>\\n\\t${2}\\n</area>",
    "detail": "JSX <area> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<article>",
    "insertText": "<article>\\n\\t${1}\\n</article>",
    "detail": "JSX <article>",
    "kind": "snippet"
  },
  {
    "label": "<article className>",
    "insertText": "<article className=\"${1}\">\\n\\t${2}\\n</article>",
    "detail": "JSX <article> with string class",
    "kind": "snippet"
  },
  {
    "label": "<article clsx>",
    "insertText": "<article className={clsx(${1})}>\\n\\t${2}\\n</article>",
    "detail": "JSX <article> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<aside>",
    "insertText": "<aside>\\n\\t${1}\\n</aside>",
    "detail": "JSX <aside>",
    "kind": "snippet"
  },
  {
    "label": "<aside className>",
    "insertText": "<aside className=\"${1}\">\\n\\t${2}\\n</aside>",
    "detail": "JSX <aside> with string class",
    "kind": "snippet"
  },
  {
    "label": "<aside clsx>",
    "insertText": "<aside className={clsx(${1})}>\\n\\t${2}\\n</aside>",
    "detail": "JSX <aside> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<audio>",
    "insertText": "<audio>\\n\\t${1}\\n</audio>",
    "detail": "JSX <audio>",
    "kind": "snippet"
  },
  {
    "label": "<audio className>",
    "insertText": "<audio className=\"${1}\">\\n\\t${2}\\n</audio>",
    "detail": "JSX <audio> with string class",
    "kind": "snippet"
  },
  {
    "label": "<audio clsx>",
    "insertText": "<audio className={clsx(${1})}>\\n\\t${2}\\n</audio>",
    "detail": "JSX <audio> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<b>",
    "insertText": "<b>\\n\\t${1}\\n</b>",
    "detail": "JSX <b>",
    "kind": "snippet"
  },
  {
    "label": "<b className>",
    "insertText": "<b className=\"${1}\">\\n\\t${2}\\n</b>",
    "detail": "JSX <b> with string class",
    "kind": "snippet"
  },
  {
    "label": "<b clsx>",
    "insertText": "<b className={clsx(${1})}>\\n\\t${2}\\n</b>",
    "detail": "JSX <b> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<base>",
    "insertText": "<base>\\n\\t${1}\\n</base>",
    "detail": "JSX <base>",
    "kind": "snippet"
  },
  {
    "label": "<base className>",
    "insertText": "<base className=\"${1}\">\\n\\t${2}\\n</base>",
    "detail": "JSX <base> with string class",
    "kind": "snippet"
  },
  {
    "label": "<base clsx>",
    "insertText": "<base className={clsx(${1})}>\\n\\t${2}\\n</base>",
    "detail": "JSX <base> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<bdi>",
    "insertText": "<bdi>\\n\\t${1}\\n</bdi>",
    "detail": "JSX <bdi>",
    "kind": "snippet"
  },
  {
    "label": "<bdi className>",
    "insertText": "<bdi className=\"${1}\">\\n\\t${2}\\n</bdi>",
    "detail": "JSX <bdi> with string class",
    "kind": "snippet"
  },
  {
    "label": "<bdi clsx>",
    "insertText": "<bdi className={clsx(${1})}>\\n\\t${2}\\n</bdi>",
    "detail": "JSX <bdi> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<bdo>",
    "insertText": "<bdo>\\n\\t${1}\\n</bdo>",
    "detail": "JSX <bdo>",
    "kind": "snippet"
  },
  {
    "label": "<bdo className>",
    "insertText": "<bdo className=\"${1}\">\\n\\t${2}\\n</bdo>",
    "detail": "JSX <bdo> with string class",
    "kind": "snippet"
  },
  {
    "label": "<bdo clsx>",
    "insertText": "<bdo className={clsx(${1})}>\\n\\t${2}\\n</bdo>",
    "detail": "JSX <bdo> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<blockquote>",
    "insertText": "<blockquote>\\n\\t${1}\\n</blockquote>",
    "detail": "JSX <blockquote>",
    "kind": "snippet"
  },
  {
    "label": "<blockquote className>",
    "insertText": "<blockquote className=\"${1}\">\\n\\t${2}\\n</blockquote>",
    "detail": "JSX <blockquote> with string class",
    "kind": "snippet"
  },
  {
    "label": "<blockquote clsx>",
    "insertText": "<blockquote className={clsx(${1})}>\\n\\t${2}\\n</blockquote>",
    "detail": "JSX <blockquote> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<body>",
    "insertText": "<body>\\n\\t${1}\\n</body>",
    "detail": "JSX <body>",
    "kind": "snippet"
  },
  {
    "label": "<body className>",
    "insertText": "<body className=\"${1}\">\\n\\t${2}\\n</body>",
    "detail": "JSX <body> with string class",
    "kind": "snippet"
  },
  {
    "label": "<body clsx>",
    "insertText": "<body className={clsx(${1})}>\\n\\t${2}\\n</body>",
    "detail": "JSX <body> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<br>",
    "insertText": "<br>\\n\\t${1}\\n</br>",
    "detail": "JSX <br>",
    "kind": "snippet"
  },
  {
    "label": "<br className>",
    "insertText": "<br className=\"${1}\">\\n\\t${2}\\n</br>",
    "detail": "JSX <br> with string class",
    "kind": "snippet"
  },
  {
    "label": "<br clsx>",
    "insertText": "<br className={clsx(${1})}>\\n\\t${2}\\n</br>",
    "detail": "JSX <br> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<button>",
    "insertText": "<button>\\n\\t${1}\\n</button>",
    "detail": "JSX <button>",
    "kind": "snippet"
  },
  {
    "label": "<button className>",
    "insertText": "<button className=\"${1}\">\\n\\t${2}\\n</button>",
    "detail": "JSX <button> with string class",
    "kind": "snippet"
  },
  {
    "label": "<button clsx>",
    "insertText": "<button className={clsx(${1})}>\\n\\t${2}\\n</button>",
    "detail": "JSX <button> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<canvas>",
    "insertText": "<canvas>\\n\\t${1}\\n</canvas>",
    "detail": "JSX <canvas>",
    "kind": "snippet"
  },
  {
    "label": "<canvas className>",
    "insertText": "<canvas className=\"${1}\">\\n\\t${2}\\n</canvas>",
    "detail": "JSX <canvas> with string class",
    "kind": "snippet"
  },
  {
    "label": "<canvas clsx>",
    "insertText": "<canvas className={clsx(${1})}>\\n\\t${2}\\n</canvas>",
    "detail": "JSX <canvas> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<caption>",
    "insertText": "<caption>\\n\\t${1}\\n</caption>",
    "detail": "JSX <caption>",
    "kind": "snippet"
  },
  {
    "label": "<caption className>",
    "insertText": "<caption className=\"${1}\">\\n\\t${2}\\n</caption>",
    "detail": "JSX <caption> with string class",
    "kind": "snippet"
  },
  {
    "label": "<caption clsx>",
    "insertText": "<caption className={clsx(${1})}>\\n\\t${2}\\n</caption>",
    "detail": "JSX <caption> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<cite>",
    "insertText": "<cite>\\n\\t${1}\\n</cite>",
    "detail": "JSX <cite>",
    "kind": "snippet"
  },
  {
    "label": "<cite className>",
    "insertText": "<cite className=\"${1}\">\\n\\t${2}\\n</cite>",
    "detail": "JSX <cite> with string class",
    "kind": "snippet"
  },
  {
    "label": "<cite clsx>",
    "insertText": "<cite className={clsx(${1})}>\\n\\t${2}\\n</cite>",
    "detail": "JSX <cite> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<code>",
    "insertText": "<code>\\n\\t${1}\\n</code>",
    "detail": "JSX <code>",
    "kind": "snippet"
  },
  {
    "label": "<code className>",
    "insertText": "<code className=\"${1}\">\\n\\t${2}\\n</code>",
    "detail": "JSX <code> with string class",
    "kind": "snippet"
  },
  {
    "label": "<code clsx>",
    "insertText": "<code className={clsx(${1})}>\\n\\t${2}\\n</code>",
    "detail": "JSX <code> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<col>",
    "insertText": "<col>\\n\\t${1}\\n</col>",
    "detail": "JSX <col>",
    "kind": "snippet"
  },
  {
    "label": "<col className>",
    "insertText": "<col className=\"${1}\">\\n\\t${2}\\n</col>",
    "detail": "JSX <col> with string class",
    "kind": "snippet"
  },
  {
    "label": "<col clsx>",
    "insertText": "<col className={clsx(${1})}>\\n\\t${2}\\n</col>",
    "detail": "JSX <col> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<colgroup>",
    "insertText": "<colgroup>\\n\\t${1}\\n</colgroup>",
    "detail": "JSX <colgroup>",
    "kind": "snippet"
  },
  {
    "label": "<colgroup className>",
    "insertText": "<colgroup className=\"${1}\">\\n\\t${2}\\n</colgroup>",
    "detail": "JSX <colgroup> with string class",
    "kind": "snippet"
  },
  {
    "label": "<colgroup clsx>",
    "insertText": "<colgroup className={clsx(${1})}>\\n\\t${2}\\n</colgroup>",
    "detail": "JSX <colgroup> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<data>",
    "insertText": "<data>\\n\\t${1}\\n</data>",
    "detail": "JSX <data>",
    "kind": "snippet"
  },
  {
    "label": "<data className>",
    "insertText": "<data className=\"${1}\">\\n\\t${2}\\n</data>",
    "detail": "JSX <data> with string class",
    "kind": "snippet"
  },
  {
    "label": "<data clsx>",
    "insertText": "<data className={clsx(${1})}>\\n\\t${2}\\n</data>",
    "detail": "JSX <data> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<datalist>",
    "insertText": "<datalist>\\n\\t${1}\\n</datalist>",
    "detail": "JSX <datalist>",
    "kind": "snippet"
  },
  {
    "label": "<datalist className>",
    "insertText": "<datalist className=\"${1}\">\\n\\t${2}\\n</datalist>",
    "detail": "JSX <datalist> with string class",
    "kind": "snippet"
  },
  {
    "label": "<datalist clsx>",
    "insertText": "<datalist className={clsx(${1})}>\\n\\t${2}\\n</datalist>",
    "detail": "JSX <datalist> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<dd>",
    "insertText": "<dd>\\n\\t${1}\\n</dd>",
    "detail": "JSX <dd>",
    "kind": "snippet"
  },
  {
    "label": "<dd className>",
    "insertText": "<dd className=\"${1}\">\\n\\t${2}\\n</dd>",
    "detail": "JSX <dd> with string class",
    "kind": "snippet"
  },
  {
    "label": "<dd clsx>",
    "insertText": "<dd className={clsx(${1})}>\\n\\t${2}\\n</dd>",
    "detail": "JSX <dd> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<del>",
    "insertText": "<del>\\n\\t${1}\\n</del>",
    "detail": "JSX <del>",
    "kind": "snippet"
  },
  {
    "label": "<del className>",
    "insertText": "<del className=\"${1}\">\\n\\t${2}\\n</del>",
    "detail": "JSX <del> with string class",
    "kind": "snippet"
  },
  {
    "label": "<del clsx>",
    "insertText": "<del className={clsx(${1})}>\\n\\t${2}\\n</del>",
    "detail": "JSX <del> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<details>",
    "insertText": "<details>\\n\\t${1}\\n</details>",
    "detail": "JSX <details>",
    "kind": "snippet"
  },
  {
    "label": "<details className>",
    "insertText": "<details className=\"${1}\">\\n\\t${2}\\n</details>",
    "detail": "JSX <details> with string class",
    "kind": "snippet"
  },
  {
    "label": "<details clsx>",
    "insertText": "<details className={clsx(${1})}>\\n\\t${2}\\n</details>",
    "detail": "JSX <details> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<dfn>",
    "insertText": "<dfn>\\n\\t${1}\\n</dfn>",
    "detail": "JSX <dfn>",
    "kind": "snippet"
  },
  {
    "label": "<dfn className>",
    "insertText": "<dfn className=\"${1}\">\\n\\t${2}\\n</dfn>",
    "detail": "JSX <dfn> with string class",
    "kind": "snippet"
  },
  {
    "label": "<dfn clsx>",
    "insertText": "<dfn className={clsx(${1})}>\\n\\t${2}\\n</dfn>",
    "detail": "JSX <dfn> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<dialog>",
    "insertText": "<dialog>\\n\\t${1}\\n</dialog>",
    "detail": "JSX <dialog>",
    "kind": "snippet"
  },
  {
    "label": "<dialog className>",
    "insertText": "<dialog className=\"${1}\">\\n\\t${2}\\n</dialog>",
    "detail": "JSX <dialog> with string class",
    "kind": "snippet"
  },
  {
    "label": "<dialog clsx>",
    "insertText": "<dialog className={clsx(${1})}>\\n\\t${2}\\n</dialog>",
    "detail": "JSX <dialog> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<div>",
    "insertText": "<div>\\n\\t${1}\\n</div>",
    "detail": "JSX <div>",
    "kind": "snippet"
  },
  {
    "label": "<div className>",
    "insertText": "<div className=\"${1}\">\\n\\t${2}\\n</div>",
    "detail": "JSX <div> with string class",
    "kind": "snippet"
  },
  {
    "label": "<div clsx>",
    "insertText": "<div className={clsx(${1})}>\\n\\t${2}\\n</div>",
    "detail": "JSX <div> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<dl>",
    "insertText": "<dl>\\n\\t${1}\\n</dl>",
    "detail": "JSX <dl>",
    "kind": "snippet"
  },
  {
    "label": "<dl className>",
    "insertText": "<dl className=\"${1}\">\\n\\t${2}\\n</dl>",
    "detail": "JSX <dl> with string class",
    "kind": "snippet"
  },
  {
    "label": "<dl clsx>",
    "insertText": "<dl className={clsx(${1})}>\\n\\t${2}\\n</dl>",
    "detail": "JSX <dl> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<dt>",
    "insertText": "<dt>\\n\\t${1}\\n</dt>",
    "detail": "JSX <dt>",
    "kind": "snippet"
  },
  {
    "label": "<dt className>",
    "insertText": "<dt className=\"${1}\">\\n\\t${2}\\n</dt>",
    "detail": "JSX <dt> with string class",
    "kind": "snippet"
  },
  {
    "label": "<dt clsx>",
    "insertText": "<dt className={clsx(${1})}>\\n\\t${2}\\n</dt>",
    "detail": "JSX <dt> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<em>",
    "insertText": "<em>\\n\\t${1}\\n</em>",
    "detail": "JSX <em>",
    "kind": "snippet"
  },
  {
    "label": "<em className>",
    "insertText": "<em className=\"${1}\">\\n\\t${2}\\n</em>",
    "detail": "JSX <em> with string class",
    "kind": "snippet"
  },
  {
    "label": "<em clsx>",
    "insertText": "<em className={clsx(${1})}>\\n\\t${2}\\n</em>",
    "detail": "JSX <em> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<embed>",
    "insertText": "<embed>\\n\\t${1}\\n</embed>",
    "detail": "JSX <embed>",
    "kind": "snippet"
  },
  {
    "label": "<embed className>",
    "insertText": "<embed className=\"${1}\">\\n\\t${2}\\n</embed>",
    "detail": "JSX <embed> with string class",
    "kind": "snippet"
  },
  {
    "label": "<embed clsx>",
    "insertText": "<embed className={clsx(${1})}>\\n\\t${2}\\n</embed>",
    "detail": "JSX <embed> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<fieldset>",
    "insertText": "<fieldset>\\n\\t${1}\\n</fieldset>",
    "detail": "JSX <fieldset>",
    "kind": "snippet"
  },
  {
    "label": "<fieldset className>",
    "insertText": "<fieldset className=\"${1}\">\\n\\t${2}\\n</fieldset>",
    "detail": "JSX <fieldset> with string class",
    "kind": "snippet"
  },
  {
    "label": "<fieldset clsx>",
    "insertText": "<fieldset className={clsx(${1})}>\\n\\t${2}\\n</fieldset>",
    "detail": "JSX <fieldset> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<figcaption>",
    "insertText": "<figcaption>\\n\\t${1}\\n</figcaption>",
    "detail": "JSX <figcaption>",
    "kind": "snippet"
  },
  {
    "label": "<figcaption className>",
    "insertText": "<figcaption className=\"${1}\">\\n\\t${2}\\n</figcaption>",
    "detail": "JSX <figcaption> with string class",
    "kind": "snippet"
  },
  {
    "label": "<figcaption clsx>",
    "insertText": "<figcaption className={clsx(${1})}>\\n\\t${2}\\n</figcaption>",
    "detail": "JSX <figcaption> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<figure>",
    "insertText": "<figure>\\n\\t${1}\\n</figure>",
    "detail": "JSX <figure>",
    "kind": "snippet"
  },
  {
    "label": "<figure className>",
    "insertText": "<figure className=\"${1}\">\\n\\t${2}\\n</figure>",
    "detail": "JSX <figure> with string class",
    "kind": "snippet"
  },
  {
    "label": "<figure clsx>",
    "insertText": "<figure className={clsx(${1})}>\\n\\t${2}\\n</figure>",
    "detail": "JSX <figure> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<footer>",
    "insertText": "<footer>\\n\\t${1}\\n</footer>",
    "detail": "JSX <footer>",
    "kind": "snippet"
  },
  {
    "label": "<footer className>",
    "insertText": "<footer className=\"${1}\">\\n\\t${2}\\n</footer>",
    "detail": "JSX <footer> with string class",
    "kind": "snippet"
  },
  {
    "label": "<footer clsx>",
    "insertText": "<footer className={clsx(${1})}>\\n\\t${2}\\n</footer>",
    "detail": "JSX <footer> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<form>",
    "insertText": "<form>\\n\\t${1}\\n</form>",
    "detail": "JSX <form>",
    "kind": "snippet"
  },
  {
    "label": "<form className>",
    "insertText": "<form className=\"${1}\">\\n\\t${2}\\n</form>",
    "detail": "JSX <form> with string class",
    "kind": "snippet"
  },
  {
    "label": "<form clsx>",
    "insertText": "<form className={clsx(${1})}>\\n\\t${2}\\n</form>",
    "detail": "JSX <form> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<h1>",
    "insertText": "<h1>\\n\\t${1}\\n</h1>",
    "detail": "JSX <h1>",
    "kind": "snippet"
  },
  {
    "label": "<h1 className>",
    "insertText": "<h1 className=\"${1}\">\\n\\t${2}\\n</h1>",
    "detail": "JSX <h1> with string class",
    "kind": "snippet"
  },
  {
    "label": "<h1 clsx>",
    "insertText": "<h1 className={clsx(${1})}>\\n\\t${2}\\n</h1>",
    "detail": "JSX <h1> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<h2>",
    "insertText": "<h2>\\n\\t${1}\\n</h2>",
    "detail": "JSX <h2>",
    "kind": "snippet"
  },
  {
    "label": "<h2 className>",
    "insertText": "<h2 className=\"${1}\">\\n\\t${2}\\n</h2>",
    "detail": "JSX <h2> with string class",
    "kind": "snippet"
  },
  {
    "label": "<h2 clsx>",
    "insertText": "<h2 className={clsx(${1})}>\\n\\t${2}\\n</h2>",
    "detail": "JSX <h2> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<h3>",
    "insertText": "<h3>\\n\\t${1}\\n</h3>",
    "detail": "JSX <h3>",
    "kind": "snippet"
  },
  {
    "label": "<h3 className>",
    "insertText": "<h3 className=\"${1}\">\\n\\t${2}\\n</h3>",
    "detail": "JSX <h3> with string class",
    "kind": "snippet"
  },
  {
    "label": "<h3 clsx>",
    "insertText": "<h3 className={clsx(${1})}>\\n\\t${2}\\n</h3>",
    "detail": "JSX <h3> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<h4>",
    "insertText": "<h4>\\n\\t${1}\\n</h4>",
    "detail": "JSX <h4>",
    "kind": "snippet"
  },
  {
    "label": "<h4 className>",
    "insertText": "<h4 className=\"${1}\">\\n\\t${2}\\n</h4>",
    "detail": "JSX <h4> with string class",
    "kind": "snippet"
  },
  {
    "label": "<h4 clsx>",
    "insertText": "<h4 className={clsx(${1})}>\\n\\t${2}\\n</h4>",
    "detail": "JSX <h4> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<h5>",
    "insertText": "<h5>\\n\\t${1}\\n</h5>",
    "detail": "JSX <h5>",
    "kind": "snippet"
  },
  {
    "label": "<h5 className>",
    "insertText": "<h5 className=\"${1}\">\\n\\t${2}\\n</h5>",
    "detail": "JSX <h5> with string class",
    "kind": "snippet"
  },
  {
    "label": "<h5 clsx>",
    "insertText": "<h5 className={clsx(${1})}>\\n\\t${2}\\n</h5>",
    "detail": "JSX <h5> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<h6>",
    "insertText": "<h6>\\n\\t${1}\\n</h6>",
    "detail": "JSX <h6>",
    "kind": "snippet"
  },
  {
    "label": "<h6 className>",
    "insertText": "<h6 className=\"${1}\">\\n\\t${2}\\n</h6>",
    "detail": "JSX <h6> with string class",
    "kind": "snippet"
  },
  {
    "label": "<h6 clsx>",
    "insertText": "<h6 className={clsx(${1})}>\\n\\t${2}\\n</h6>",
    "detail": "JSX <h6> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<head>",
    "insertText": "<head>\\n\\t${1}\\n</head>",
    "detail": "JSX <head>",
    "kind": "snippet"
  },
  {
    "label": "<head className>",
    "insertText": "<head className=\"${1}\">\\n\\t${2}\\n</head>",
    "detail": "JSX <head> with string class",
    "kind": "snippet"
  },
  {
    "label": "<head clsx>",
    "insertText": "<head className={clsx(${1})}>\\n\\t${2}\\n</head>",
    "detail": "JSX <head> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<header>",
    "insertText": "<header>\\n\\t${1}\\n</header>",
    "detail": "JSX <header>",
    "kind": "snippet"
  },
  {
    "label": "<header className>",
    "insertText": "<header className=\"${1}\">\\n\\t${2}\\n</header>",
    "detail": "JSX <header> with string class",
    "kind": "snippet"
  },
  {
    "label": "<header clsx>",
    "insertText": "<header className={clsx(${1})}>\\n\\t${2}\\n</header>",
    "detail": "JSX <header> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<hgroup>",
    "insertText": "<hgroup>\\n\\t${1}\\n</hgroup>",
    "detail": "JSX <hgroup>",
    "kind": "snippet"
  },
  {
    "label": "<hgroup className>",
    "insertText": "<hgroup className=\"${1}\">\\n\\t${2}\\n</hgroup>",
    "detail": "JSX <hgroup> with string class",
    "kind": "snippet"
  },
  {
    "label": "<hgroup clsx>",
    "insertText": "<hgroup className={clsx(${1})}>\\n\\t${2}\\n</hgroup>",
    "detail": "JSX <hgroup> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<hr>",
    "insertText": "<hr>\\n\\t${1}\\n</hr>",
    "detail": "JSX <hr>",
    "kind": "snippet"
  },
  {
    "label": "<hr className>",
    "insertText": "<hr className=\"${1}\">\\n\\t${2}\\n</hr>",
    "detail": "JSX <hr> with string class",
    "kind": "snippet"
  },
  {
    "label": "<hr clsx>",
    "insertText": "<hr className={clsx(${1})}>\\n\\t${2}\\n</hr>",
    "detail": "JSX <hr> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<html>",
    "insertText": "<html>\\n\\t${1}\\n</html>",
    "detail": "JSX <html>",
    "kind": "snippet"
  },
  {
    "label": "<html className>",
    "insertText": "<html className=\"${1}\">\\n\\t${2}\\n</html>",
    "detail": "JSX <html> with string class",
    "kind": "snippet"
  },
  {
    "label": "<html clsx>",
    "insertText": "<html className={clsx(${1})}>\\n\\t${2}\\n</html>",
    "detail": "JSX <html> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<i>",
    "insertText": "<i>\\n\\t${1}\\n</i>",
    "detail": "JSX <i>",
    "kind": "snippet"
  },
  {
    "label": "<i className>",
    "insertText": "<i className=\"${1}\">\\n\\t${2}\\n</i>",
    "detail": "JSX <i> with string class",
    "kind": "snippet"
  },
  {
    "label": "<i clsx>",
    "insertText": "<i className={clsx(${1})}>\\n\\t${2}\\n</i>",
    "detail": "JSX <i> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<iframe>",
    "insertText": "<iframe>\\n\\t${1}\\n</iframe>",
    "detail": "JSX <iframe>",
    "kind": "snippet"
  },
  {
    "label": "<iframe className>",
    "insertText": "<iframe className=\"${1}\">\\n\\t${2}\\n</iframe>",
    "detail": "JSX <iframe> with string class",
    "kind": "snippet"
  },
  {
    "label": "<iframe clsx>",
    "insertText": "<iframe className={clsx(${1})}>\\n\\t${2}\\n</iframe>",
    "detail": "JSX <iframe> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<img>",
    "insertText": "<img>\\n\\t${1}\\n</img>",
    "detail": "JSX <img>",
    "kind": "snippet"
  },
  {
    "label": "<img className>",
    "insertText": "<img className=\"${1}\">\\n\\t${2}\\n</img>",
    "detail": "JSX <img> with string class",
    "kind": "snippet"
  },
  {
    "label": "<img clsx>",
    "insertText": "<img className={clsx(${1})}>\\n\\t${2}\\n</img>",
    "detail": "JSX <img> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<input>",
    "insertText": "<input>\\n\\t${1}\\n</input>",
    "detail": "JSX <input>",
    "kind": "snippet"
  },
  {
    "label": "<input className>",
    "insertText": "<input className=\"${1}\">\\n\\t${2}\\n</input>",
    "detail": "JSX <input> with string class",
    "kind": "snippet"
  },
  {
    "label": "<input clsx>",
    "insertText": "<input className={clsx(${1})}>\\n\\t${2}\\n</input>",
    "detail": "JSX <input> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<ins>",
    "insertText": "<ins>\\n\\t${1}\\n</ins>",
    "detail": "JSX <ins>",
    "kind": "snippet"
  },
  {
    "label": "<ins className>",
    "insertText": "<ins className=\"${1}\">\\n\\t${2}\\n</ins>",
    "detail": "JSX <ins> with string class",
    "kind": "snippet"
  },
  {
    "label": "<ins clsx>",
    "insertText": "<ins className={clsx(${1})}>\\n\\t${2}\\n</ins>",
    "detail": "JSX <ins> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<kbd>",
    "insertText": "<kbd>\\n\\t${1}\\n</kbd>",
    "detail": "JSX <kbd>",
    "kind": "snippet"
  },
  {
    "label": "<kbd className>",
    "insertText": "<kbd className=\"${1}\">\\n\\t${2}\\n</kbd>",
    "detail": "JSX <kbd> with string class",
    "kind": "snippet"
  },
  {
    "label": "<kbd clsx>",
    "insertText": "<kbd className={clsx(${1})}>\\n\\t${2}\\n</kbd>",
    "detail": "JSX <kbd> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<label>",
    "insertText": "<label>\\n\\t${1}\\n</label>",
    "detail": "JSX <label>",
    "kind": "snippet"
  },
  {
    "label": "<label className>",
    "insertText": "<label className=\"${1}\">\\n\\t${2}\\n</label>",
    "detail": "JSX <label> with string class",
    "kind": "snippet"
  },
  {
    "label": "<label clsx>",
    "insertText": "<label className={clsx(${1})}>\\n\\t${2}\\n</label>",
    "detail": "JSX <label> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<legend>",
    "insertText": "<legend>\\n\\t${1}\\n</legend>",
    "detail": "JSX <legend>",
    "kind": "snippet"
  },
  {
    "label": "<legend className>",
    "insertText": "<legend className=\"${1}\">\\n\\t${2}\\n</legend>",
    "detail": "JSX <legend> with string class",
    "kind": "snippet"
  },
  {
    "label": "<legend clsx>",
    "insertText": "<legend className={clsx(${1})}>\\n\\t${2}\\n</legend>",
    "detail": "JSX <legend> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<li>",
    "insertText": "<li>\\n\\t${1}\\n</li>",
    "detail": "JSX <li>",
    "kind": "snippet"
  },
  {
    "label": "<li className>",
    "insertText": "<li className=\"${1}\">\\n\\t${2}\\n</li>",
    "detail": "JSX <li> with string class",
    "kind": "snippet"
  },
  {
    "label": "<li clsx>",
    "insertText": "<li className={clsx(${1})}>\\n\\t${2}\\n</li>",
    "detail": "JSX <li> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<link>",
    "insertText": "<link>\\n\\t${1}\\n</link>",
    "detail": "JSX <link>",
    "kind": "snippet"
  },
  {
    "label": "<link className>",
    "insertText": "<link className=\"${1}\">\\n\\t${2}\\n</link>",
    "detail": "JSX <link> with string class",
    "kind": "snippet"
  },
  {
    "label": "<link clsx>",
    "insertText": "<link className={clsx(${1})}>\\n\\t${2}\\n</link>",
    "detail": "JSX <link> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<main>",
    "insertText": "<main>\\n\\t${1}\\n</main>",
    "detail": "JSX <main>",
    "kind": "snippet"
  },
  {
    "label": "<main className>",
    "insertText": "<main className=\"${1}\">\\n\\t${2}\\n</main>",
    "detail": "JSX <main> with string class",
    "kind": "snippet"
  },
  {
    "label": "<main clsx>",
    "insertText": "<main className={clsx(${1})}>\\n\\t${2}\\n</main>",
    "detail": "JSX <main> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<map>",
    "insertText": "<map>\\n\\t${1}\\n</map>",
    "detail": "JSX <map>",
    "kind": "snippet"
  },
  {
    "label": "<map className>",
    "insertText": "<map className=\"${1}\">\\n\\t${2}\\n</map>",
    "detail": "JSX <map> with string class",
    "kind": "snippet"
  },
  {
    "label": "<map clsx>",
    "insertText": "<map className={clsx(${1})}>\\n\\t${2}\\n</map>",
    "detail": "JSX <map> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<mark>",
    "insertText": "<mark>\\n\\t${1}\\n</mark>",
    "detail": "JSX <mark>",
    "kind": "snippet"
  },
  {
    "label": "<mark className>",
    "insertText": "<mark className=\"${1}\">\\n\\t${2}\\n</mark>",
    "detail": "JSX <mark> with string class",
    "kind": "snippet"
  },
  {
    "label": "<mark clsx>",
    "insertText": "<mark className={clsx(${1})}>\\n\\t${2}\\n</mark>",
    "detail": "JSX <mark> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<meta>",
    "insertText": "<meta>\\n\\t${1}\\n</meta>",
    "detail": "JSX <meta>",
    "kind": "snippet"
  },
  {
    "label": "<meta className>",
    "insertText": "<meta className=\"${1}\">\\n\\t${2}\\n</meta>",
    "detail": "JSX <meta> with string class",
    "kind": "snippet"
  },
  {
    "label": "<meta clsx>",
    "insertText": "<meta className={clsx(${1})}>\\n\\t${2}\\n</meta>",
    "detail": "JSX <meta> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<meter>",
    "insertText": "<meter>\\n\\t${1}\\n</meter>",
    "detail": "JSX <meter>",
    "kind": "snippet"
  },
  {
    "label": "<meter className>",
    "insertText": "<meter className=\"${1}\">\\n\\t${2}\\n</meter>",
    "detail": "JSX <meter> with string class",
    "kind": "snippet"
  },
  {
    "label": "<meter clsx>",
    "insertText": "<meter className={clsx(${1})}>\\n\\t${2}\\n</meter>",
    "detail": "JSX <meter> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<nav>",
    "insertText": "<nav>\\n\\t${1}\\n</nav>",
    "detail": "JSX <nav>",
    "kind": "snippet"
  },
  {
    "label": "<nav className>",
    "insertText": "<nav className=\"${1}\">\\n\\t${2}\\n</nav>",
    "detail": "JSX <nav> with string class",
    "kind": "snippet"
  },
  {
    "label": "<nav clsx>",
    "insertText": "<nav className={clsx(${1})}>\\n\\t${2}\\n</nav>",
    "detail": "JSX <nav> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<noscript>",
    "insertText": "<noscript>\\n\\t${1}\\n</noscript>",
    "detail": "JSX <noscript>",
    "kind": "snippet"
  },
  {
    "label": "<noscript className>",
    "insertText": "<noscript className=\"${1}\">\\n\\t${2}\\n</noscript>",
    "detail": "JSX <noscript> with string class",
    "kind": "snippet"
  },
  {
    "label": "<noscript clsx>",
    "insertText": "<noscript className={clsx(${1})}>\\n\\t${2}\\n</noscript>",
    "detail": "JSX <noscript> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<object>",
    "insertText": "<object>\\n\\t${1}\\n</object>",
    "detail": "JSX <object>",
    "kind": "snippet"
  },
  {
    "label": "<object className>",
    "insertText": "<object className=\"${1}\">\\n\\t${2}\\n</object>",
    "detail": "JSX <object> with string class",
    "kind": "snippet"
  },
  {
    "label": "<object clsx>",
    "insertText": "<object className={clsx(${1})}>\\n\\t${2}\\n</object>",
    "detail": "JSX <object> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<ol>",
    "insertText": "<ol>\\n\\t${1}\\n</ol>",
    "detail": "JSX <ol>",
    "kind": "snippet"
  },
  {
    "label": "<ol className>",
    "insertText": "<ol className=\"${1}\">\\n\\t${2}\\n</ol>",
    "detail": "JSX <ol> with string class",
    "kind": "snippet"
  },
  {
    "label": "<ol clsx>",
    "insertText": "<ol className={clsx(${1})}>\\n\\t${2}\\n</ol>",
    "detail": "JSX <ol> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<optgroup>",
    "insertText": "<optgroup>\\n\\t${1}\\n</optgroup>",
    "detail": "JSX <optgroup>",
    "kind": "snippet"
  },
  {
    "label": "<optgroup className>",
    "insertText": "<optgroup className=\"${1}\">\\n\\t${2}\\n</optgroup>",
    "detail": "JSX <optgroup> with string class",
    "kind": "snippet"
  },
  {
    "label": "<optgroup clsx>",
    "insertText": "<optgroup className={clsx(${1})}>\\n\\t${2}\\n</optgroup>",
    "detail": "JSX <optgroup> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<option>",
    "insertText": "<option>\\n\\t${1}\\n</option>",
    "detail": "JSX <option>",
    "kind": "snippet"
  },
  {
    "label": "<option className>",
    "insertText": "<option className=\"${1}\">\\n\\t${2}\\n</option>",
    "detail": "JSX <option> with string class",
    "kind": "snippet"
  },
  {
    "label": "<option clsx>",
    "insertText": "<option className={clsx(${1})}>\\n\\t${2}\\n</option>",
    "detail": "JSX <option> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<output>",
    "insertText": "<output>\\n\\t${1}\\n</output>",
    "detail": "JSX <output>",
    "kind": "snippet"
  },
  {
    "label": "<output className>",
    "insertText": "<output className=\"${1}\">\\n\\t${2}\\n</output>",
    "detail": "JSX <output> with string class",
    "kind": "snippet"
  },
  {
    "label": "<output clsx>",
    "insertText": "<output className={clsx(${1})}>\\n\\t${2}\\n</output>",
    "detail": "JSX <output> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<p>",
    "insertText": "<p>\\n\\t${1}\\n</p>",
    "detail": "JSX <p>",
    "kind": "snippet"
  },
  {
    "label": "<p className>",
    "insertText": "<p className=\"${1}\">\\n\\t${2}\\n</p>",
    "detail": "JSX <p> with string class",
    "kind": "snippet"
  },
  {
    "label": "<p clsx>",
    "insertText": "<p className={clsx(${1})}>\\n\\t${2}\\n</p>",
    "detail": "JSX <p> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<param>",
    "insertText": "<param>\\n\\t${1}\\n</param>",
    "detail": "JSX <param>",
    "kind": "snippet"
  },
  {
    "label": "<param className>",
    "insertText": "<param className=\"${1}\">\\n\\t${2}\\n</param>",
    "detail": "JSX <param> with string class",
    "kind": "snippet"
  },
  {
    "label": "<param clsx>",
    "insertText": "<param className={clsx(${1})}>\\n\\t${2}\\n</param>",
    "detail": "JSX <param> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<picture>",
    "insertText": "<picture>\\n\\t${1}\\n</picture>",
    "detail": "JSX <picture>",
    "kind": "snippet"
  },
  {
    "label": "<picture className>",
    "insertText": "<picture className=\"${1}\">\\n\\t${2}\\n</picture>",
    "detail": "JSX <picture> with string class",
    "kind": "snippet"
  },
  {
    "label": "<picture clsx>",
    "insertText": "<picture className={clsx(${1})}>\\n\\t${2}\\n</picture>",
    "detail": "JSX <picture> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<pre>",
    "insertText": "<pre>\\n\\t${1}\\n</pre>",
    "detail": "JSX <pre>",
    "kind": "snippet"
  },
  {
    "label": "<pre className>",
    "insertText": "<pre className=\"${1}\">\\n\\t${2}\\n</pre>",
    "detail": "JSX <pre> with string class",
    "kind": "snippet"
  },
  {
    "label": "<pre clsx>",
    "insertText": "<pre className={clsx(${1})}>\\n\\t${2}\\n</pre>",
    "detail": "JSX <pre> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<progress>",
    "insertText": "<progress>\\n\\t${1}\\n</progress>",
    "detail": "JSX <progress>",
    "kind": "snippet"
  },
  {
    "label": "<progress className>",
    "insertText": "<progress className=\"${1}\">\\n\\t${2}\\n</progress>",
    "detail": "JSX <progress> with string class",
    "kind": "snippet"
  },
  {
    "label": "<progress clsx>",
    "insertText": "<progress className={clsx(${1})}>\\n\\t${2}\\n</progress>",
    "detail": "JSX <progress> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<q>",
    "insertText": "<q>\\n\\t${1}\\n</q>",
    "detail": "JSX <q>",
    "kind": "snippet"
  },
  {
    "label": "<q className>",
    "insertText": "<q className=\"${1}\">\\n\\t${2}\\n</q>",
    "detail": "JSX <q> with string class",
    "kind": "snippet"
  },
  {
    "label": "<q clsx>",
    "insertText": "<q className={clsx(${1})}>\\n\\t${2}\\n</q>",
    "detail": "JSX <q> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<rp>",
    "insertText": "<rp>\\n\\t${1}\\n</rp>",
    "detail": "JSX <rp>",
    "kind": "snippet"
  },
  {
    "label": "<rp className>",
    "insertText": "<rp className=\"${1}\">\\n\\t${2}\\n</rp>",
    "detail": "JSX <rp> with string class",
    "kind": "snippet"
  },
  {
    "label": "<rp clsx>",
    "insertText": "<rp className={clsx(${1})}>\\n\\t${2}\\n</rp>",
    "detail": "JSX <rp> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<rt>",
    "insertText": "<rt>\\n\\t${1}\\n</rt>",
    "detail": "JSX <rt>",
    "kind": "snippet"
  },
  {
    "label": "<rt className>",
    "insertText": "<rt className=\"${1}\">\\n\\t${2}\\n</rt>",
    "detail": "JSX <rt> with string class",
    "kind": "snippet"
  },
  {
    "label": "<rt clsx>",
    "insertText": "<rt className={clsx(${1})}>\\n\\t${2}\\n</rt>",
    "detail": "JSX <rt> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<ruby>",
    "insertText": "<ruby>\\n\\t${1}\\n</ruby>",
    "detail": "JSX <ruby>",
    "kind": "snippet"
  },
  {
    "label": "<ruby className>",
    "insertText": "<ruby className=\"${1}\">\\n\\t${2}\\n</ruby>",
    "detail": "JSX <ruby> with string class",
    "kind": "snippet"
  },
  {
    "label": "<ruby clsx>",
    "insertText": "<ruby className={clsx(${1})}>\\n\\t${2}\\n</ruby>",
    "detail": "JSX <ruby> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<s>",
    "insertText": "<s>\\n\\t${1}\\n</s>",
    "detail": "JSX <s>",
    "kind": "snippet"
  },
  {
    "label": "<s className>",
    "insertText": "<s className=\"${1}\">\\n\\t${2}\\n</s>",
    "detail": "JSX <s> with string class",
    "kind": "snippet"
  },
  {
    "label": "<s clsx>",
    "insertText": "<s className={clsx(${1})}>\\n\\t${2}\\n</s>",
    "detail": "JSX <s> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<samp>",
    "insertText": "<samp>\\n\\t${1}\\n</samp>",
    "detail": "JSX <samp>",
    "kind": "snippet"
  },
  {
    "label": "<samp className>",
    "insertText": "<samp className=\"${1}\">\\n\\t${2}\\n</samp>",
    "detail": "JSX <samp> with string class",
    "kind": "snippet"
  },
  {
    "label": "<samp clsx>",
    "insertText": "<samp className={clsx(${1})}>\\n\\t${2}\\n</samp>",
    "detail": "JSX <samp> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<script>",
    "insertText": "<script>\\n\\t${1}\\n</script>",
    "detail": "JSX <script>",
    "kind": "snippet"
  },
  {
    "label": "<script className>",
    "insertText": "<script className=\"${1}\">\\n\\t${2}\\n</script>",
    "detail": "JSX <script> with string class",
    "kind": "snippet"
  },
  {
    "label": "<script clsx>",
    "insertText": "<script className={clsx(${1})}>\\n\\t${2}\\n</script>",
    "detail": "JSX <script> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<section>",
    "insertText": "<section>\\n\\t${1}\\n</section>",
    "detail": "JSX <section>",
    "kind": "snippet"
  },
  {
    "label": "<section className>",
    "insertText": "<section className=\"${1}\">\\n\\t${2}\\n</section>",
    "detail": "JSX <section> with string class",
    "kind": "snippet"
  },
  {
    "label": "<section clsx>",
    "insertText": "<section className={clsx(${1})}>\\n\\t${2}\\n</section>",
    "detail": "JSX <section> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<select>",
    "insertText": "<select>\\n\\t${1}\\n</select>",
    "detail": "JSX <select>",
    "kind": "snippet"
  },
  {
    "label": "<select className>",
    "insertText": "<select className=\"${1}\">\\n\\t${2}\\n</select>",
    "detail": "JSX <select> with string class",
    "kind": "snippet"
  },
  {
    "label": "<select clsx>",
    "insertText": "<select className={clsx(${1})}>\\n\\t${2}\\n</select>",
    "detail": "JSX <select> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<small>",
    "insertText": "<small>\\n\\t${1}\\n</small>",
    "detail": "JSX <small>",
    "kind": "snippet"
  },
  {
    "label": "<small className>",
    "insertText": "<small className=\"${1}\">\\n\\t${2}\\n</small>",
    "detail": "JSX <small> with string class",
    "kind": "snippet"
  },
  {
    "label": "<small clsx>",
    "insertText": "<small className={clsx(${1})}>\\n\\t${2}\\n</small>",
    "detail": "JSX <small> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<source>",
    "insertText": "<source>\\n\\t${1}\\n</source>",
    "detail": "JSX <source>",
    "kind": "snippet"
  },
  {
    "label": "<source className>",
    "insertText": "<source className=\"${1}\">\\n\\t${2}\\n</source>",
    "detail": "JSX <source> with string class",
    "kind": "snippet"
  },
  {
    "label": "<source clsx>",
    "insertText": "<source className={clsx(${1})}>\\n\\t${2}\\n</source>",
    "detail": "JSX <source> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<span>",
    "insertText": "<span>\\n\\t${1}\\n</span>",
    "detail": "JSX <span>",
    "kind": "snippet"
  },
  {
    "label": "<span className>",
    "insertText": "<span className=\"${1}\">\\n\\t${2}\\n</span>",
    "detail": "JSX <span> with string class",
    "kind": "snippet"
  },
  {
    "label": "<span clsx>",
    "insertText": "<span className={clsx(${1})}>\\n\\t${2}\\n</span>",
    "detail": "JSX <span> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<strong>",
    "insertText": "<strong>\\n\\t${1}\\n</strong>",
    "detail": "JSX <strong>",
    "kind": "snippet"
  },
  {
    "label": "<strong className>",
    "insertText": "<strong className=\"${1}\">\\n\\t${2}\\n</strong>",
    "detail": "JSX <strong> with string class",
    "kind": "snippet"
  },
  {
    "label": "<strong clsx>",
    "insertText": "<strong className={clsx(${1})}>\\n\\t${2}\\n</strong>",
    "detail": "JSX <strong> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<style>",
    "insertText": "<style>\\n\\t${1}\\n</style>",
    "detail": "JSX <style>",
    "kind": "snippet"
  },
  {
    "label": "<style className>",
    "insertText": "<style className=\"${1}\">\\n\\t${2}\\n</style>",
    "detail": "JSX <style> with string class",
    "kind": "snippet"
  },
  {
    "label": "<style clsx>",
    "insertText": "<style className={clsx(${1})}>\\n\\t${2}\\n</style>",
    "detail": "JSX <style> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<sub>",
    "insertText": "<sub>\\n\\t${1}\\n</sub>",
    "detail": "JSX <sub>",
    "kind": "snippet"
  },
  {
    "label": "<sub className>",
    "insertText": "<sub className=\"${1}\">\\n\\t${2}\\n</sub>",
    "detail": "JSX <sub> with string class",
    "kind": "snippet"
  },
  {
    "label": "<sub clsx>",
    "insertText": "<sub className={clsx(${1})}>\\n\\t${2}\\n</sub>",
    "detail": "JSX <sub> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<summary>",
    "insertText": "<summary>\\n\\t${1}\\n</summary>",
    "detail": "JSX <summary>",
    "kind": "snippet"
  },
  {
    "label": "<summary className>",
    "insertText": "<summary className=\"${1}\">\\n\\t${2}\\n</summary>",
    "detail": "JSX <summary> with string class",
    "kind": "snippet"
  },
  {
    "label": "<summary clsx>",
    "insertText": "<summary className={clsx(${1})}>\\n\\t${2}\\n</summary>",
    "detail": "JSX <summary> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<sup>",
    "insertText": "<sup>\\n\\t${1}\\n</sup>",
    "detail": "JSX <sup>",
    "kind": "snippet"
  },
  {
    "label": "<sup className>",
    "insertText": "<sup className=\"${1}\">\\n\\t${2}\\n</sup>",
    "detail": "JSX <sup> with string class",
    "kind": "snippet"
  },
  {
    "label": "<sup clsx>",
    "insertText": "<sup className={clsx(${1})}>\\n\\t${2}\\n</sup>",
    "detail": "JSX <sup> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<svg>",
    "insertText": "<svg>\\n\\t${1}\\n</svg>",
    "detail": "JSX <svg>",
    "kind": "snippet"
  },
  {
    "label": "<svg className>",
    "insertText": "<svg className=\"${1}\">\\n\\t${2}\\n</svg>",
    "detail": "JSX <svg> with string class",
    "kind": "snippet"
  },
  {
    "label": "<svg clsx>",
    "insertText": "<svg className={clsx(${1})}>\\n\\t${2}\\n</svg>",
    "detail": "JSX <svg> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<table>",
    "insertText": "<table>\\n\\t${1}\\n</table>",
    "detail": "JSX <table>",
    "kind": "snippet"
  },
  {
    "label": "<table className>",
    "insertText": "<table className=\"${1}\">\\n\\t${2}\\n</table>",
    "detail": "JSX <table> with string class",
    "kind": "snippet"
  },
  {
    "label": "<table clsx>",
    "insertText": "<table className={clsx(${1})}>\\n\\t${2}\\n</table>",
    "detail": "JSX <table> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<tbody>",
    "insertText": "<tbody>\\n\\t${1}\\n</tbody>",
    "detail": "JSX <tbody>",
    "kind": "snippet"
  },
  {
    "label": "<tbody className>",
    "insertText": "<tbody className=\"${1}\">\\n\\t${2}\\n</tbody>",
    "detail": "JSX <tbody> with string class",
    "kind": "snippet"
  },
  {
    "label": "<tbody clsx>",
    "insertText": "<tbody className={clsx(${1})}>\\n\\t${2}\\n</tbody>",
    "detail": "JSX <tbody> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<td>",
    "insertText": "<td>\\n\\t${1}\\n</td>",
    "detail": "JSX <td>",
    "kind": "snippet"
  },
  {
    "label": "<td className>",
    "insertText": "<td className=\"${1}\">\\n\\t${2}\\n</td>",
    "detail": "JSX <td> with string class",
    "kind": "snippet"
  },
  {
    "label": "<td clsx>",
    "insertText": "<td className={clsx(${1})}>\\n\\t${2}\\n</td>",
    "detail": "JSX <td> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<template>",
    "insertText": "<template>\\n\\t${1}\\n</template>",
    "detail": "JSX <template>",
    "kind": "snippet"
  },
  {
    "label": "<template className>",
    "insertText": "<template className=\"${1}\">\\n\\t${2}\\n</template>",
    "detail": "JSX <template> with string class",
    "kind": "snippet"
  },
  {
    "label": "<template clsx>",
    "insertText": "<template className={clsx(${1})}>\\n\\t${2}\\n</template>",
    "detail": "JSX <template> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<textarea>",
    "insertText": "<textarea>\\n\\t${1}\\n</textarea>",
    "detail": "JSX <textarea>",
    "kind": "snippet"
  },
  {
    "label": "<textarea className>",
    "insertText": "<textarea className=\"${1}\">\\n\\t${2}\\n</textarea>",
    "detail": "JSX <textarea> with string class",
    "kind": "snippet"
  },
  {
    "label": "<textarea clsx>",
    "insertText": "<textarea className={clsx(${1})}>\\n\\t${2}\\n</textarea>",
    "detail": "JSX <textarea> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<tfoot>",
    "insertText": "<tfoot>\\n\\t${1}\\n</tfoot>",
    "detail": "JSX <tfoot>",
    "kind": "snippet"
  },
  {
    "label": "<tfoot className>",
    "insertText": "<tfoot className=\"${1}\">\\n\\t${2}\\n</tfoot>",
    "detail": "JSX <tfoot> with string class",
    "kind": "snippet"
  },
  {
    "label": "<tfoot clsx>",
    "insertText": "<tfoot className={clsx(${1})}>\\n\\t${2}\\n</tfoot>",
    "detail": "JSX <tfoot> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<th>",
    "insertText": "<th>\\n\\t${1}\\n</th>",
    "detail": "JSX <th>",
    "kind": "snippet"
  },
  {
    "label": "<th className>",
    "insertText": "<th className=\"${1}\">\\n\\t${2}\\n</th>",
    "detail": "JSX <th> with string class",
    "kind": "snippet"
  },
  {
    "label": "<th clsx>",
    "insertText": "<th className={clsx(${1})}>\\n\\t${2}\\n</th>",
    "detail": "JSX <th> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<thead>",
    "insertText": "<thead>\\n\\t${1}\\n</thead>",
    "detail": "JSX <thead>",
    "kind": "snippet"
  },
  {
    "label": "<thead className>",
    "insertText": "<thead className=\"${1}\">\\n\\t${2}\\n</thead>",
    "detail": "JSX <thead> with string class",
    "kind": "snippet"
  },
  {
    "label": "<thead clsx>",
    "insertText": "<thead className={clsx(${1})}>\\n\\t${2}\\n</thead>",
    "detail": "JSX <thead> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<time>",
    "insertText": "<time>\\n\\t${1}\\n</time>",
    "detail": "JSX <time>",
    "kind": "snippet"
  },
  {
    "label": "<time className>",
    "insertText": "<time className=\"${1}\">\\n\\t${2}\\n</time>",
    "detail": "JSX <time> with string class",
    "kind": "snippet"
  },
  {
    "label": "<time clsx>",
    "insertText": "<time className={clsx(${1})}>\\n\\t${2}\\n</time>",
    "detail": "JSX <time> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<title>",
    "insertText": "<title>\\n\\t${1}\\n</title>",
    "detail": "JSX <title>",
    "kind": "snippet"
  },
  {
    "label": "<title className>",
    "insertText": "<title className=\"${1}\">\\n\\t${2}\\n</title>",
    "detail": "JSX <title> with string class",
    "kind": "snippet"
  },
  {
    "label": "<title clsx>",
    "insertText": "<title className={clsx(${1})}>\\n\\t${2}\\n</title>",
    "detail": "JSX <title> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<tr>",
    "insertText": "<tr>\\n\\t${1}\\n</tr>",
    "detail": "JSX <tr>",
    "kind": "snippet"
  },
  {
    "label": "<tr className>",
    "insertText": "<tr className=\"${1}\">\\n\\t${2}\\n</tr>",
    "detail": "JSX <tr> with string class",
    "kind": "snippet"
  },
  {
    "label": "<tr clsx>",
    "insertText": "<tr className={clsx(${1})}>\\n\\t${2}\\n</tr>",
    "detail": "JSX <tr> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<track>",
    "insertText": "<track>\\n\\t${1}\\n</track>",
    "detail": "JSX <track>",
    "kind": "snippet"
  },
  {
    "label": "<track className>",
    "insertText": "<track className=\"${1}\">\\n\\t${2}\\n</track>",
    "detail": "JSX <track> with string class",
    "kind": "snippet"
  },
  {
    "label": "<track clsx>",
    "insertText": "<track className={clsx(${1})}>\\n\\t${2}\\n</track>",
    "detail": "JSX <track> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<u>",
    "insertText": "<u>\\n\\t${1}\\n</u>",
    "detail": "JSX <u>",
    "kind": "snippet"
  },
  {
    "label": "<u className>",
    "insertText": "<u className=\"${1}\">\\n\\t${2}\\n</u>",
    "detail": "JSX <u> with string class",
    "kind": "snippet"
  },
  {
    "label": "<u clsx>",
    "insertText": "<u className={clsx(${1})}>\\n\\t${2}\\n</u>",
    "detail": "JSX <u> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<ul>",
    "insertText": "<ul>\\n\\t${1}\\n</ul>",
    "detail": "JSX <ul>",
    "kind": "snippet"
  },
  {
    "label": "<ul className>",
    "insertText": "<ul className=\"${1}\">\\n\\t${2}\\n</ul>",
    "detail": "JSX <ul> with string class",
    "kind": "snippet"
  },
  {
    "label": "<ul clsx>",
    "insertText": "<ul className={clsx(${1})}>\\n\\t${2}\\n</ul>",
    "detail": "JSX <ul> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<var>",
    "insertText": "<var>\\n\\t${1}\\n</var>",
    "detail": "JSX <var>",
    "kind": "snippet"
  },
  {
    "label": "<var className>",
    "insertText": "<var className=\"${1}\">\\n\\t${2}\\n</var>",
    "detail": "JSX <var> with string class",
    "kind": "snippet"
  },
  {
    "label": "<var clsx>",
    "insertText": "<var className={clsx(${1})}>\\n\\t${2}\\n</var>",
    "detail": "JSX <var> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<video>",
    "insertText": "<video>\\n\\t${1}\\n</video>",
    "detail": "JSX <video>",
    "kind": "snippet"
  },
  {
    "label": "<video className>",
    "insertText": "<video className=\"${1}\">\\n\\t${2}\\n</video>",
    "detail": "JSX <video> with string class",
    "kind": "snippet"
  },
  {
    "label": "<video clsx>",
    "insertText": "<video className={clsx(${1})}>\\n\\t${2}\\n</video>",
    "detail": "JSX <video> with clsx",
    "kind": "snippet"
  },
  {
    "label": "<wbr>",
    "insertText": "<wbr>\\n\\t${1}\\n</wbr>",
    "detail": "JSX <wbr>",
    "kind": "snippet"
  },
  {
    "label": "<wbr className>",
    "insertText": "<wbr className=\"${1}\">\\n\\t${2}\\n</wbr>",
    "detail": "JSX <wbr> with string class",
    "kind": "snippet"
  },
  {
    "label": "<wbr clsx>",
    "insertText": "<wbr className={clsx(${1})}>\\n\\t${2}\\n</wbr>",
    "detail": "JSX <wbr> with clsx",
    "kind": "snippet"
  },
  {
    "label": "onClick",
    "insertText": "onClick={(e) => ${1}}",
    "detail": "React onClick handler",
    "kind": "snippet"
  },
  {
    "label": "onClick inline",
    "insertText": "onClick={(() => ${1})}",
    "detail": "React onClick inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onDoubleClick",
    "insertText": "onDoubleClick={(e) => ${1}}",
    "detail": "React onDoubleClick handler",
    "kind": "snippet"
  },
  {
    "label": "onDoubleClick inline",
    "insertText": "onDoubleClick={(() => ${1})}",
    "detail": "React onDoubleClick inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onContextMenu",
    "insertText": "onContextMenu={(e) => ${1}}",
    "detail": "React onContextMenu handler",
    "kind": "snippet"
  },
  {
    "label": "onContextMenu inline",
    "insertText": "onContextMenu={(() => ${1})}",
    "detail": "React onContextMenu inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onKeyDown",
    "insertText": "onKeyDown={(e) => ${1}}",
    "detail": "React onKeyDown handler",
    "kind": "snippet"
  },
  {
    "label": "onKeyDown inline",
    "insertText": "onKeyDown={(() => ${1})}",
    "detail": "React onKeyDown inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onKeyUp",
    "insertText": "onKeyUp={(e) => ${1}}",
    "detail": "React onKeyUp handler",
    "kind": "snippet"
  },
  {
    "label": "onKeyUp inline",
    "insertText": "onKeyUp={(() => ${1})}",
    "detail": "React onKeyUp inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onKeyPress",
    "insertText": "onKeyPress={(e) => ${1}}",
    "detail": "React onKeyPress handler",
    "kind": "snippet"
  },
  {
    "label": "onKeyPress inline",
    "insertText": "onKeyPress={(() => ${1})}",
    "detail": "React onKeyPress inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onFocus",
    "insertText": "onFocus={(e) => ${1}}",
    "detail": "React onFocus handler",
    "kind": "snippet"
  },
  {
    "label": "onFocus inline",
    "insertText": "onFocus={(() => ${1})}",
    "detail": "React onFocus inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onBlur",
    "insertText": "onBlur={(e) => ${1}}",
    "detail": "React onBlur handler",
    "kind": "snippet"
  },
  {
    "label": "onBlur inline",
    "insertText": "onBlur={(() => ${1})}",
    "detail": "React onBlur inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onChange",
    "insertText": "onChange={(e) => ${1}}",
    "detail": "React onChange handler",
    "kind": "snippet"
  },
  {
    "label": "onChange inline",
    "insertText": "onChange={(() => ${1})}",
    "detail": "React onChange inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onInput",
    "insertText": "onInput={(e) => ${1}}",
    "detail": "React onInput handler",
    "kind": "snippet"
  },
  {
    "label": "onInput inline",
    "insertText": "onInput={(() => ${1})}",
    "detail": "React onInput inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onInvalid",
    "insertText": "onInvalid={(e) => ${1}}",
    "detail": "React onInvalid handler",
    "kind": "snippet"
  },
  {
    "label": "onInvalid inline",
    "insertText": "onInvalid={(() => ${1})}",
    "detail": "React onInvalid inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onSubmit",
    "insertText": "onSubmit={(e) => ${1}}",
    "detail": "React onSubmit handler",
    "kind": "snippet"
  },
  {
    "label": "onSubmit inline",
    "insertText": "onSubmit={(() => ${1})}",
    "detail": "React onSubmit inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onError",
    "insertText": "onError={(e) => ${1}}",
    "detail": "React onError handler",
    "kind": "snippet"
  },
  {
    "label": "onError inline",
    "insertText": "onError={(() => ${1})}",
    "detail": "React onError inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onLoad",
    "insertText": "onLoad={(e) => ${1}}",
    "detail": "React onLoad handler",
    "kind": "snippet"
  },
  {
    "label": "onLoad inline",
    "insertText": "onLoad={(() => ${1})}",
    "detail": "React onLoad inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onMouseEnter",
    "insertText": "onMouseEnter={(e) => ${1}}",
    "detail": "React onMouseEnter handler",
    "kind": "snippet"
  },
  {
    "label": "onMouseEnter inline",
    "insertText": "onMouseEnter={(() => ${1})}",
    "detail": "React onMouseEnter inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onMouseLeave",
    "insertText": "onMouseLeave={(e) => ${1}}",
    "detail": "React onMouseLeave handler",
    "kind": "snippet"
  },
  {
    "label": "onMouseLeave inline",
    "insertText": "onMouseLeave={(() => ${1})}",
    "detail": "React onMouseLeave inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onMouseOver",
    "insertText": "onMouseOver={(e) => ${1}}",
    "detail": "React onMouseOver handler",
    "kind": "snippet"
  },
  {
    "label": "onMouseOver inline",
    "insertText": "onMouseOver={(() => ${1})}",
    "detail": "React onMouseOver inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onMouseOut",
    "insertText": "onMouseOut={(e) => ${1}}",
    "detail": "React onMouseOut handler",
    "kind": "snippet"
  },
  {
    "label": "onMouseOut inline",
    "insertText": "onMouseOut={(() => ${1})}",
    "detail": "React onMouseOut inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onMouseMove",
    "insertText": "onMouseMove={(e) => ${1}}",
    "detail": "React onMouseMove handler",
    "kind": "snippet"
  },
  {
    "label": "onMouseMove inline",
    "insertText": "onMouseMove={(() => ${1})}",
    "detail": "React onMouseMove inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onMouseDown",
    "insertText": "onMouseDown={(e) => ${1}}",
    "detail": "React onMouseDown handler",
    "kind": "snippet"
  },
  {
    "label": "onMouseDown inline",
    "insertText": "onMouseDown={(() => ${1})}",
    "detail": "React onMouseDown inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onMouseUp",
    "insertText": "onMouseUp={(e) => ${1}}",
    "detail": "React onMouseUp handler",
    "kind": "snippet"
  },
  {
    "label": "onMouseUp inline",
    "insertText": "onMouseUp={(() => ${1})}",
    "detail": "React onMouseUp inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onScroll",
    "insertText": "onScroll={(e) => ${1}}",
    "detail": "React onScroll handler",
    "kind": "snippet"
  },
  {
    "label": "onScroll inline",
    "insertText": "onScroll={(() => ${1})}",
    "detail": "React onScroll inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onCopy",
    "insertText": "onCopy={(e) => ${1}}",
    "detail": "React onCopy handler",
    "kind": "snippet"
  },
  {
    "label": "onCopy inline",
    "insertText": "onCopy={(() => ${1})}",
    "detail": "React onCopy inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onCut",
    "insertText": "onCut={(e) => ${1}}",
    "detail": "React onCut handler",
    "kind": "snippet"
  },
  {
    "label": "onCut inline",
    "insertText": "onCut={(() => ${1})}",
    "detail": "React onCut inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onPaste",
    "insertText": "onPaste={(e) => ${1}}",
    "detail": "React onPaste handler",
    "kind": "snippet"
  },
  {
    "label": "onPaste inline",
    "insertText": "onPaste={(() => ${1})}",
    "detail": "React onPaste inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onDrag",
    "insertText": "onDrag={(e) => ${1}}",
    "detail": "React onDrag handler",
    "kind": "snippet"
  },
  {
    "label": "onDrag inline",
    "insertText": "onDrag={(() => ${1})}",
    "detail": "React onDrag inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onDrop",
    "insertText": "onDrop={(e) => ${1}}",
    "detail": "React onDrop handler",
    "kind": "snippet"
  },
  {
    "label": "onDrop inline",
    "insertText": "onDrop={(() => ${1})}",
    "detail": "React onDrop inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onDragStart",
    "insertText": "onDragStart={(e) => ${1}}",
    "detail": "React onDragStart handler",
    "kind": "snippet"
  },
  {
    "label": "onDragStart inline",
    "insertText": "onDragStart={(() => ${1})}",
    "detail": "React onDragStart inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onDragEnd",
    "insertText": "onDragEnd={(e) => ${1}}",
    "detail": "React onDragEnd handler",
    "kind": "snippet"
  },
  {
    "label": "onDragEnd inline",
    "insertText": "onDragEnd={(() => ${1})}",
    "detail": "React onDragEnd inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onDragEnter",
    "insertText": "onDragEnter={(e) => ${1}}",
    "detail": "React onDragEnter handler",
    "kind": "snippet"
  },
  {
    "label": "onDragEnter inline",
    "insertText": "onDragEnter={(() => ${1})}",
    "detail": "React onDragEnter inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onDragLeave",
    "insertText": "onDragLeave={(e) => ${1}}",
    "detail": "React onDragLeave handler",
    "kind": "snippet"
  },
  {
    "label": "onDragLeave inline",
    "insertText": "onDragLeave={(() => ${1})}",
    "detail": "React onDragLeave inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onDragOver",
    "insertText": "onDragOver={(e) => ${1}}",
    "detail": "React onDragOver handler",
    "kind": "snippet"
  },
  {
    "label": "onDragOver inline",
    "insertText": "onDragOver={(() => ${1})}",
    "detail": "React onDragOver inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onSelect",
    "insertText": "onSelect={(e) => ${1}}",
    "detail": "React onSelect handler",
    "kind": "snippet"
  },
  {
    "label": "onSelect inline",
    "insertText": "onSelect={(() => ${1})}",
    "detail": "React onSelect inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onTouchCancel",
    "insertText": "onTouchCancel={(e) => ${1}}",
    "detail": "React onTouchCancel handler",
    "kind": "snippet"
  },
  {
    "label": "onTouchCancel inline",
    "insertText": "onTouchCancel={(() => ${1})}",
    "detail": "React onTouchCancel inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onTouchEnd",
    "insertText": "onTouchEnd={(e) => ${1}}",
    "detail": "React onTouchEnd handler",
    "kind": "snippet"
  },
  {
    "label": "onTouchEnd inline",
    "insertText": "onTouchEnd={(() => ${1})}",
    "detail": "React onTouchEnd inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onTouchMove",
    "insertText": "onTouchMove={(e) => ${1}}",
    "detail": "React onTouchMove handler",
    "kind": "snippet"
  },
  {
    "label": "onTouchMove inline",
    "insertText": "onTouchMove={(() => ${1})}",
    "detail": "React onTouchMove inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onTouchStart",
    "insertText": "onTouchStart={(e) => ${1}}",
    "detail": "React onTouchStart handler",
    "kind": "snippet"
  },
  {
    "label": "onTouchStart inline",
    "insertText": "onTouchStart={(() => ${1})}",
    "detail": "React onTouchStart inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onAnimationStart",
    "insertText": "onAnimationStart={(e) => ${1}}",
    "detail": "React onAnimationStart handler",
    "kind": "snippet"
  },
  {
    "label": "onAnimationStart inline",
    "insertText": "onAnimationStart={(() => ${1})}",
    "detail": "React onAnimationStart inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onAnimationEnd",
    "insertText": "onAnimationEnd={(e) => ${1}}",
    "detail": "React onAnimationEnd handler",
    "kind": "snippet"
  },
  {
    "label": "onAnimationEnd inline",
    "insertText": "onAnimationEnd={(() => ${1})}",
    "detail": "React onAnimationEnd inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onAnimationIteration",
    "insertText": "onAnimationIteration={(e) => ${1}}",
    "detail": "React onAnimationIteration handler",
    "kind": "snippet"
  },
  {
    "label": "onAnimationIteration inline",
    "insertText": "onAnimationIteration={(() => ${1})}",
    "detail": "React onAnimationIteration inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onTransitionEnd",
    "insertText": "onTransitionEnd={(e) => ${1}}",
    "detail": "React onTransitionEnd handler",
    "kind": "snippet"
  },
  {
    "label": "onTransitionEnd inline",
    "insertText": "onTransitionEnd={(() => ${1})}",
    "detail": "React onTransitionEnd inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onCompositionStart",
    "insertText": "onCompositionStart={(e) => ${1}}",
    "detail": "React onCompositionStart handler",
    "kind": "snippet"
  },
  {
    "label": "onCompositionStart inline",
    "insertText": "onCompositionStart={(() => ${1})}",
    "detail": "React onCompositionStart inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onCompositionUpdate",
    "insertText": "onCompositionUpdate={(e) => ${1}}",
    "detail": "React onCompositionUpdate handler",
    "kind": "snippet"
  },
  {
    "label": "onCompositionUpdate inline",
    "insertText": "onCompositionUpdate={(() => ${1})}",
    "detail": "React onCompositionUpdate inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onCompositionEnd",
    "insertText": "onCompositionEnd={(e) => ${1}}",
    "detail": "React onCompositionEnd handler",
    "kind": "snippet"
  },
  {
    "label": "onCompositionEnd inline",
    "insertText": "onCompositionEnd={(() => ${1})}",
    "detail": "React onCompositionEnd inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onPointerDown",
    "insertText": "onPointerDown={(e) => ${1}}",
    "detail": "React onPointerDown handler",
    "kind": "snippet"
  },
  {
    "label": "onPointerDown inline",
    "insertText": "onPointerDown={(() => ${1})}",
    "detail": "React onPointerDown inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onPointerMove",
    "insertText": "onPointerMove={(e) => ${1}}",
    "detail": "React onPointerMove handler",
    "kind": "snippet"
  },
  {
    "label": "onPointerMove inline",
    "insertText": "onPointerMove={(() => ${1})}",
    "detail": "React onPointerMove inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onPointerUp",
    "insertText": "onPointerUp={(e) => ${1}}",
    "detail": "React onPointerUp handler",
    "kind": "snippet"
  },
  {
    "label": "onPointerUp inline",
    "insertText": "onPointerUp={(() => ${1})}",
    "detail": "React onPointerUp inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onPointerCancel",
    "insertText": "onPointerCancel={(e) => ${1}}",
    "detail": "React onPointerCancel handler",
    "kind": "snippet"
  },
  {
    "label": "onPointerCancel inline",
    "insertText": "onPointerCancel={(() => ${1})}",
    "detail": "React onPointerCancel inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onGotPointerCapture",
    "insertText": "onGotPointerCapture={(e) => ${1}}",
    "detail": "React onGotPointerCapture handler",
    "kind": "snippet"
  },
  {
    "label": "onGotPointerCapture inline",
    "insertText": "onGotPointerCapture={(() => ${1})}",
    "detail": "React onGotPointerCapture inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onLostPointerCapture",
    "insertText": "onLostPointerCapture={(e) => ${1}}",
    "detail": "React onLostPointerCapture handler",
    "kind": "snippet"
  },
  {
    "label": "onLostPointerCapture inline",
    "insertText": "onLostPointerCapture={(() => ${1})}",
    "detail": "React onLostPointerCapture inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onPointerEnter",
    "insertText": "onPointerEnter={(e) => ${1}}",
    "detail": "React onPointerEnter handler",
    "kind": "snippet"
  },
  {
    "label": "onPointerEnter inline",
    "insertText": "onPointerEnter={(() => ${1})}",
    "detail": "React onPointerEnter inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onPointerLeave",
    "insertText": "onPointerLeave={(e) => ${1}}",
    "detail": "React onPointerLeave handler",
    "kind": "snippet"
  },
  {
    "label": "onPointerLeave inline",
    "insertText": "onPointerLeave={(() => ${1})}",
    "detail": "React onPointerLeave inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onPointerOver",
    "insertText": "onPointerOver={(e) => ${1}}",
    "detail": "React onPointerOver handler",
    "kind": "snippet"
  },
  {
    "label": "onPointerOver inline",
    "insertText": "onPointerOver={(() => ${1})}",
    "detail": "React onPointerOver inline fallback",
    "kind": "snippet"
  },
  {
    "label": "onPointerOut",
    "insertText": "onPointerOut={(e) => ${1}}",
    "detail": "React onPointerOut handler",
    "kind": "snippet"
  },
  {
    "label": "onPointerOut inline",
    "insertText": "onPointerOut={(() => ${1})}",
    "detail": "React onPointerOut inline fallback",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-slate-50",
    "insertText": "bg-slate-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-slate-50",
    "insertText": "text-slate-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-slate-50",
    "insertText": "border-slate-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-slate-50",
    "insertText": "outline-slate-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-slate-50",
    "insertText": "ring-slate-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-slate-50",
    "insertText": "fill-slate-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-slate-50",
    "insertText": "stroke-slate-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-slate-50",
    "insertText": "shadow-slate-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-slate-50",
    "insertText": "decoration-slate-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-slate-50",
    "insertText": "accent-slate-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-slate-50",
    "insertText": "caret-slate-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-slate-100",
    "insertText": "bg-slate-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-slate-100",
    "insertText": "text-slate-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-slate-100",
    "insertText": "border-slate-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-slate-100",
    "insertText": "outline-slate-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-slate-100",
    "insertText": "ring-slate-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-slate-100",
    "insertText": "fill-slate-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-slate-100",
    "insertText": "stroke-slate-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-slate-100",
    "insertText": "shadow-slate-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-slate-100",
    "insertText": "decoration-slate-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-slate-100",
    "insertText": "accent-slate-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-slate-100",
    "insertText": "caret-slate-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-slate-200",
    "insertText": "bg-slate-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-slate-200",
    "insertText": "text-slate-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-slate-200",
    "insertText": "border-slate-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-slate-200",
    "insertText": "outline-slate-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-slate-200",
    "insertText": "ring-slate-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-slate-200",
    "insertText": "fill-slate-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-slate-200",
    "insertText": "stroke-slate-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-slate-200",
    "insertText": "shadow-slate-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-slate-200",
    "insertText": "decoration-slate-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-slate-200",
    "insertText": "accent-slate-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-slate-200",
    "insertText": "caret-slate-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-slate-300",
    "insertText": "bg-slate-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-slate-300",
    "insertText": "text-slate-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-slate-300",
    "insertText": "border-slate-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-slate-300",
    "insertText": "outline-slate-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-slate-300",
    "insertText": "ring-slate-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-slate-300",
    "insertText": "fill-slate-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-slate-300",
    "insertText": "stroke-slate-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-slate-300",
    "insertText": "shadow-slate-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-slate-300",
    "insertText": "decoration-slate-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-slate-300",
    "insertText": "accent-slate-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-slate-300",
    "insertText": "caret-slate-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-slate-400",
    "insertText": "bg-slate-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-slate-400",
    "insertText": "text-slate-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-slate-400",
    "insertText": "border-slate-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-slate-400",
    "insertText": "outline-slate-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-slate-400",
    "insertText": "ring-slate-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-slate-400",
    "insertText": "fill-slate-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-slate-400",
    "insertText": "stroke-slate-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-slate-400",
    "insertText": "shadow-slate-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-slate-400",
    "insertText": "decoration-slate-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-slate-400",
    "insertText": "accent-slate-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-slate-400",
    "insertText": "caret-slate-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-slate-500",
    "insertText": "bg-slate-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-slate-500",
    "insertText": "text-slate-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-slate-500",
    "insertText": "border-slate-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-slate-500",
    "insertText": "outline-slate-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-slate-500",
    "insertText": "ring-slate-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-slate-500",
    "insertText": "fill-slate-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-slate-500",
    "insertText": "stroke-slate-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-slate-500",
    "insertText": "shadow-slate-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-slate-500",
    "insertText": "decoration-slate-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-slate-500",
    "insertText": "accent-slate-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-slate-500",
    "insertText": "caret-slate-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-slate-600",
    "insertText": "bg-slate-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-slate-600",
    "insertText": "text-slate-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-slate-600",
    "insertText": "border-slate-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-slate-600",
    "insertText": "outline-slate-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-slate-600",
    "insertText": "ring-slate-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-slate-600",
    "insertText": "fill-slate-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-slate-600",
    "insertText": "stroke-slate-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-slate-600",
    "insertText": "shadow-slate-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-slate-600",
    "insertText": "decoration-slate-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-slate-600",
    "insertText": "accent-slate-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-slate-600",
    "insertText": "caret-slate-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-slate-700",
    "insertText": "bg-slate-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-slate-700",
    "insertText": "text-slate-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-slate-700",
    "insertText": "border-slate-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-slate-700",
    "insertText": "outline-slate-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-slate-700",
    "insertText": "ring-slate-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-slate-700",
    "insertText": "fill-slate-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-slate-700",
    "insertText": "stroke-slate-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-slate-700",
    "insertText": "shadow-slate-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-slate-700",
    "insertText": "decoration-slate-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-slate-700",
    "insertText": "accent-slate-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-slate-700",
    "insertText": "caret-slate-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-slate-800",
    "insertText": "bg-slate-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-slate-800",
    "insertText": "text-slate-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-slate-800",
    "insertText": "border-slate-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-slate-800",
    "insertText": "outline-slate-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-slate-800",
    "insertText": "ring-slate-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-slate-800",
    "insertText": "fill-slate-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-slate-800",
    "insertText": "stroke-slate-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-slate-800",
    "insertText": "shadow-slate-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-slate-800",
    "insertText": "decoration-slate-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-slate-800",
    "insertText": "accent-slate-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-slate-800",
    "insertText": "caret-slate-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-slate-900",
    "insertText": "bg-slate-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-slate-900",
    "insertText": "text-slate-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-slate-900",
    "insertText": "border-slate-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-slate-900",
    "insertText": "outline-slate-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-slate-900",
    "insertText": "ring-slate-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-slate-900",
    "insertText": "fill-slate-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-slate-900",
    "insertText": "stroke-slate-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-slate-900",
    "insertText": "shadow-slate-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-slate-900",
    "insertText": "decoration-slate-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-slate-900",
    "insertText": "accent-slate-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-slate-900",
    "insertText": "caret-slate-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-slate-950",
    "insertText": "bg-slate-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-slate-950",
    "insertText": "text-slate-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-slate-950",
    "insertText": "border-slate-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-slate-950",
    "insertText": "outline-slate-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-slate-950",
    "insertText": "ring-slate-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-slate-950",
    "insertText": "fill-slate-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-slate-950",
    "insertText": "stroke-slate-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-slate-950",
    "insertText": "shadow-slate-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-slate-950",
    "insertText": "decoration-slate-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-slate-950",
    "insertText": "accent-slate-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-slate-950",
    "insertText": "caret-slate-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-gray-50",
    "insertText": "bg-gray-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-gray-50",
    "insertText": "text-gray-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-gray-50",
    "insertText": "border-gray-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-gray-50",
    "insertText": "outline-gray-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-gray-50",
    "insertText": "ring-gray-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-gray-50",
    "insertText": "fill-gray-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-gray-50",
    "insertText": "stroke-gray-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-gray-50",
    "insertText": "shadow-gray-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-gray-50",
    "insertText": "decoration-gray-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-gray-50",
    "insertText": "accent-gray-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-gray-50",
    "insertText": "caret-gray-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-gray-100",
    "insertText": "bg-gray-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-gray-100",
    "insertText": "text-gray-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-gray-100",
    "insertText": "border-gray-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-gray-100",
    "insertText": "outline-gray-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-gray-100",
    "insertText": "ring-gray-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-gray-100",
    "insertText": "fill-gray-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-gray-100",
    "insertText": "stroke-gray-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-gray-100",
    "insertText": "shadow-gray-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-gray-100",
    "insertText": "decoration-gray-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-gray-100",
    "insertText": "accent-gray-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-gray-100",
    "insertText": "caret-gray-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-gray-200",
    "insertText": "bg-gray-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-gray-200",
    "insertText": "text-gray-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-gray-200",
    "insertText": "border-gray-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-gray-200",
    "insertText": "outline-gray-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-gray-200",
    "insertText": "ring-gray-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-gray-200",
    "insertText": "fill-gray-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-gray-200",
    "insertText": "stroke-gray-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-gray-200",
    "insertText": "shadow-gray-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-gray-200",
    "insertText": "decoration-gray-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-gray-200",
    "insertText": "accent-gray-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-gray-200",
    "insertText": "caret-gray-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-gray-300",
    "insertText": "bg-gray-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-gray-300",
    "insertText": "text-gray-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-gray-300",
    "insertText": "border-gray-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-gray-300",
    "insertText": "outline-gray-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-gray-300",
    "insertText": "ring-gray-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-gray-300",
    "insertText": "fill-gray-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-gray-300",
    "insertText": "stroke-gray-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-gray-300",
    "insertText": "shadow-gray-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-gray-300",
    "insertText": "decoration-gray-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-gray-300",
    "insertText": "accent-gray-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-gray-300",
    "insertText": "caret-gray-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-gray-400",
    "insertText": "bg-gray-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-gray-400",
    "insertText": "text-gray-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-gray-400",
    "insertText": "border-gray-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-gray-400",
    "insertText": "outline-gray-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-gray-400",
    "insertText": "ring-gray-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-gray-400",
    "insertText": "fill-gray-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-gray-400",
    "insertText": "stroke-gray-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-gray-400",
    "insertText": "shadow-gray-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-gray-400",
    "insertText": "decoration-gray-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-gray-400",
    "insertText": "accent-gray-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-gray-400",
    "insertText": "caret-gray-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-gray-500",
    "insertText": "bg-gray-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-gray-500",
    "insertText": "text-gray-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-gray-500",
    "insertText": "border-gray-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-gray-500",
    "insertText": "outline-gray-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-gray-500",
    "insertText": "ring-gray-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-gray-500",
    "insertText": "fill-gray-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-gray-500",
    "insertText": "stroke-gray-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-gray-500",
    "insertText": "shadow-gray-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-gray-500",
    "insertText": "decoration-gray-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-gray-500",
    "insertText": "accent-gray-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-gray-500",
    "insertText": "caret-gray-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-gray-600",
    "insertText": "bg-gray-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-gray-600",
    "insertText": "text-gray-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-gray-600",
    "insertText": "border-gray-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-gray-600",
    "insertText": "outline-gray-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-gray-600",
    "insertText": "ring-gray-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-gray-600",
    "insertText": "fill-gray-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-gray-600",
    "insertText": "stroke-gray-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-gray-600",
    "insertText": "shadow-gray-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-gray-600",
    "insertText": "decoration-gray-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-gray-600",
    "insertText": "accent-gray-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-gray-600",
    "insertText": "caret-gray-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-gray-700",
    "insertText": "bg-gray-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-gray-700",
    "insertText": "text-gray-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-gray-700",
    "insertText": "border-gray-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-gray-700",
    "insertText": "outline-gray-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-gray-700",
    "insertText": "ring-gray-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-gray-700",
    "insertText": "fill-gray-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-gray-700",
    "insertText": "stroke-gray-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-gray-700",
    "insertText": "shadow-gray-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-gray-700",
    "insertText": "decoration-gray-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-gray-700",
    "insertText": "accent-gray-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-gray-700",
    "insertText": "caret-gray-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-gray-800",
    "insertText": "bg-gray-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-gray-800",
    "insertText": "text-gray-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-gray-800",
    "insertText": "border-gray-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-gray-800",
    "insertText": "outline-gray-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-gray-800",
    "insertText": "ring-gray-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-gray-800",
    "insertText": "fill-gray-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-gray-800",
    "insertText": "stroke-gray-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-gray-800",
    "insertText": "shadow-gray-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-gray-800",
    "insertText": "decoration-gray-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-gray-800",
    "insertText": "accent-gray-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-gray-800",
    "insertText": "caret-gray-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-gray-900",
    "insertText": "bg-gray-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-gray-900",
    "insertText": "text-gray-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-gray-900",
    "insertText": "border-gray-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-gray-900",
    "insertText": "outline-gray-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-gray-900",
    "insertText": "ring-gray-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-gray-900",
    "insertText": "fill-gray-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-gray-900",
    "insertText": "stroke-gray-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-gray-900",
    "insertText": "shadow-gray-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-gray-900",
    "insertText": "decoration-gray-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-gray-900",
    "insertText": "accent-gray-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-gray-900",
    "insertText": "caret-gray-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-gray-950",
    "insertText": "bg-gray-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-gray-950",
    "insertText": "text-gray-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-gray-950",
    "insertText": "border-gray-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-gray-950",
    "insertText": "outline-gray-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-gray-950",
    "insertText": "ring-gray-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-gray-950",
    "insertText": "fill-gray-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-gray-950",
    "insertText": "stroke-gray-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-gray-950",
    "insertText": "shadow-gray-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-gray-950",
    "insertText": "decoration-gray-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-gray-950",
    "insertText": "accent-gray-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-gray-950",
    "insertText": "caret-gray-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-zinc-50",
    "insertText": "bg-zinc-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-zinc-50",
    "insertText": "text-zinc-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-zinc-50",
    "insertText": "border-zinc-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-zinc-50",
    "insertText": "outline-zinc-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-zinc-50",
    "insertText": "ring-zinc-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-zinc-50",
    "insertText": "fill-zinc-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-zinc-50",
    "insertText": "stroke-zinc-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-zinc-50",
    "insertText": "shadow-zinc-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-zinc-50",
    "insertText": "decoration-zinc-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-zinc-50",
    "insertText": "accent-zinc-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-zinc-50",
    "insertText": "caret-zinc-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-zinc-100",
    "insertText": "bg-zinc-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-zinc-100",
    "insertText": "text-zinc-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-zinc-100",
    "insertText": "border-zinc-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-zinc-100",
    "insertText": "outline-zinc-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-zinc-100",
    "insertText": "ring-zinc-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-zinc-100",
    "insertText": "fill-zinc-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-zinc-100",
    "insertText": "stroke-zinc-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-zinc-100",
    "insertText": "shadow-zinc-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-zinc-100",
    "insertText": "decoration-zinc-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-zinc-100",
    "insertText": "accent-zinc-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-zinc-100",
    "insertText": "caret-zinc-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-zinc-200",
    "insertText": "bg-zinc-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-zinc-200",
    "insertText": "text-zinc-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-zinc-200",
    "insertText": "border-zinc-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-zinc-200",
    "insertText": "outline-zinc-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-zinc-200",
    "insertText": "ring-zinc-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-zinc-200",
    "insertText": "fill-zinc-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-zinc-200",
    "insertText": "stroke-zinc-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-zinc-200",
    "insertText": "shadow-zinc-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-zinc-200",
    "insertText": "decoration-zinc-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-zinc-200",
    "insertText": "accent-zinc-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-zinc-200",
    "insertText": "caret-zinc-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-zinc-300",
    "insertText": "bg-zinc-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-zinc-300",
    "insertText": "text-zinc-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-zinc-300",
    "insertText": "border-zinc-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-zinc-300",
    "insertText": "outline-zinc-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-zinc-300",
    "insertText": "ring-zinc-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-zinc-300",
    "insertText": "fill-zinc-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-zinc-300",
    "insertText": "stroke-zinc-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-zinc-300",
    "insertText": "shadow-zinc-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-zinc-300",
    "insertText": "decoration-zinc-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-zinc-300",
    "insertText": "accent-zinc-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-zinc-300",
    "insertText": "caret-zinc-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-zinc-400",
    "insertText": "bg-zinc-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-zinc-400",
    "insertText": "text-zinc-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-zinc-400",
    "insertText": "border-zinc-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-zinc-400",
    "insertText": "outline-zinc-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-zinc-400",
    "insertText": "ring-zinc-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-zinc-400",
    "insertText": "fill-zinc-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-zinc-400",
    "insertText": "stroke-zinc-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-zinc-400",
    "insertText": "shadow-zinc-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-zinc-400",
    "insertText": "decoration-zinc-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-zinc-400",
    "insertText": "accent-zinc-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-zinc-400",
    "insertText": "caret-zinc-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-zinc-500",
    "insertText": "bg-zinc-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-zinc-500",
    "insertText": "text-zinc-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-zinc-500",
    "insertText": "border-zinc-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-zinc-500",
    "insertText": "outline-zinc-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-zinc-500",
    "insertText": "ring-zinc-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-zinc-500",
    "insertText": "fill-zinc-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-zinc-500",
    "insertText": "stroke-zinc-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-zinc-500",
    "insertText": "shadow-zinc-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-zinc-500",
    "insertText": "decoration-zinc-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-zinc-500",
    "insertText": "accent-zinc-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-zinc-500",
    "insertText": "caret-zinc-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-zinc-600",
    "insertText": "bg-zinc-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-zinc-600",
    "insertText": "text-zinc-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-zinc-600",
    "insertText": "border-zinc-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-zinc-600",
    "insertText": "outline-zinc-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-zinc-600",
    "insertText": "ring-zinc-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-zinc-600",
    "insertText": "fill-zinc-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-zinc-600",
    "insertText": "stroke-zinc-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-zinc-600",
    "insertText": "shadow-zinc-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-zinc-600",
    "insertText": "decoration-zinc-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-zinc-600",
    "insertText": "accent-zinc-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-zinc-600",
    "insertText": "caret-zinc-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-zinc-700",
    "insertText": "bg-zinc-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-zinc-700",
    "insertText": "text-zinc-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-zinc-700",
    "insertText": "border-zinc-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-zinc-700",
    "insertText": "outline-zinc-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-zinc-700",
    "insertText": "ring-zinc-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-zinc-700",
    "insertText": "fill-zinc-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-zinc-700",
    "insertText": "stroke-zinc-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-zinc-700",
    "insertText": "shadow-zinc-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-zinc-700",
    "insertText": "decoration-zinc-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-zinc-700",
    "insertText": "accent-zinc-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-zinc-700",
    "insertText": "caret-zinc-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-zinc-800",
    "insertText": "bg-zinc-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-zinc-800",
    "insertText": "text-zinc-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-zinc-800",
    "insertText": "border-zinc-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-zinc-800",
    "insertText": "outline-zinc-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-zinc-800",
    "insertText": "ring-zinc-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-zinc-800",
    "insertText": "fill-zinc-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-zinc-800",
    "insertText": "stroke-zinc-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-zinc-800",
    "insertText": "shadow-zinc-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-zinc-800",
    "insertText": "decoration-zinc-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-zinc-800",
    "insertText": "accent-zinc-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-zinc-800",
    "insertText": "caret-zinc-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-zinc-900",
    "insertText": "bg-zinc-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-zinc-900",
    "insertText": "text-zinc-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-zinc-900",
    "insertText": "border-zinc-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-zinc-900",
    "insertText": "outline-zinc-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-zinc-900",
    "insertText": "ring-zinc-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-zinc-900",
    "insertText": "fill-zinc-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-zinc-900",
    "insertText": "stroke-zinc-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-zinc-900",
    "insertText": "shadow-zinc-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-zinc-900",
    "insertText": "decoration-zinc-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-zinc-900",
    "insertText": "accent-zinc-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-zinc-900",
    "insertText": "caret-zinc-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-zinc-950",
    "insertText": "bg-zinc-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-zinc-950",
    "insertText": "text-zinc-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-zinc-950",
    "insertText": "border-zinc-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-zinc-950",
    "insertText": "outline-zinc-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-zinc-950",
    "insertText": "ring-zinc-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-zinc-950",
    "insertText": "fill-zinc-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-zinc-950",
    "insertText": "stroke-zinc-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-zinc-950",
    "insertText": "shadow-zinc-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-zinc-950",
    "insertText": "decoration-zinc-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-zinc-950",
    "insertText": "accent-zinc-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-zinc-950",
    "insertText": "caret-zinc-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-neutral-50",
    "insertText": "bg-neutral-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-neutral-50",
    "insertText": "text-neutral-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-neutral-50",
    "insertText": "border-neutral-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-neutral-50",
    "insertText": "outline-neutral-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-neutral-50",
    "insertText": "ring-neutral-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-neutral-50",
    "insertText": "fill-neutral-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-neutral-50",
    "insertText": "stroke-neutral-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-neutral-50",
    "insertText": "shadow-neutral-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-neutral-50",
    "insertText": "decoration-neutral-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-neutral-50",
    "insertText": "accent-neutral-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-neutral-50",
    "insertText": "caret-neutral-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-neutral-100",
    "insertText": "bg-neutral-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-neutral-100",
    "insertText": "text-neutral-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-neutral-100",
    "insertText": "border-neutral-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-neutral-100",
    "insertText": "outline-neutral-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-neutral-100",
    "insertText": "ring-neutral-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-neutral-100",
    "insertText": "fill-neutral-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-neutral-100",
    "insertText": "stroke-neutral-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-neutral-100",
    "insertText": "shadow-neutral-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-neutral-100",
    "insertText": "decoration-neutral-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-neutral-100",
    "insertText": "accent-neutral-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-neutral-100",
    "insertText": "caret-neutral-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-neutral-200",
    "insertText": "bg-neutral-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-neutral-200",
    "insertText": "text-neutral-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-neutral-200",
    "insertText": "border-neutral-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-neutral-200",
    "insertText": "outline-neutral-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-neutral-200",
    "insertText": "ring-neutral-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-neutral-200",
    "insertText": "fill-neutral-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-neutral-200",
    "insertText": "stroke-neutral-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-neutral-200",
    "insertText": "shadow-neutral-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-neutral-200",
    "insertText": "decoration-neutral-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-neutral-200",
    "insertText": "accent-neutral-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-neutral-200",
    "insertText": "caret-neutral-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-neutral-300",
    "insertText": "bg-neutral-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-neutral-300",
    "insertText": "text-neutral-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-neutral-300",
    "insertText": "border-neutral-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-neutral-300",
    "insertText": "outline-neutral-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-neutral-300",
    "insertText": "ring-neutral-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-neutral-300",
    "insertText": "fill-neutral-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-neutral-300",
    "insertText": "stroke-neutral-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-neutral-300",
    "insertText": "shadow-neutral-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-neutral-300",
    "insertText": "decoration-neutral-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-neutral-300",
    "insertText": "accent-neutral-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-neutral-300",
    "insertText": "caret-neutral-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-neutral-400",
    "insertText": "bg-neutral-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-neutral-400",
    "insertText": "text-neutral-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-neutral-400",
    "insertText": "border-neutral-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-neutral-400",
    "insertText": "outline-neutral-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-neutral-400",
    "insertText": "ring-neutral-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-neutral-400",
    "insertText": "fill-neutral-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-neutral-400",
    "insertText": "stroke-neutral-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-neutral-400",
    "insertText": "shadow-neutral-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-neutral-400",
    "insertText": "decoration-neutral-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-neutral-400",
    "insertText": "accent-neutral-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-neutral-400",
    "insertText": "caret-neutral-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-neutral-500",
    "insertText": "bg-neutral-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-neutral-500",
    "insertText": "text-neutral-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-neutral-500",
    "insertText": "border-neutral-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-neutral-500",
    "insertText": "outline-neutral-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-neutral-500",
    "insertText": "ring-neutral-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-neutral-500",
    "insertText": "fill-neutral-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-neutral-500",
    "insertText": "stroke-neutral-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-neutral-500",
    "insertText": "shadow-neutral-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-neutral-500",
    "insertText": "decoration-neutral-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-neutral-500",
    "insertText": "accent-neutral-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-neutral-500",
    "insertText": "caret-neutral-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-neutral-600",
    "insertText": "bg-neutral-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-neutral-600",
    "insertText": "text-neutral-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-neutral-600",
    "insertText": "border-neutral-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-neutral-600",
    "insertText": "outline-neutral-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-neutral-600",
    "insertText": "ring-neutral-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-neutral-600",
    "insertText": "fill-neutral-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-neutral-600",
    "insertText": "stroke-neutral-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-neutral-600",
    "insertText": "shadow-neutral-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-neutral-600",
    "insertText": "decoration-neutral-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-neutral-600",
    "insertText": "accent-neutral-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-neutral-600",
    "insertText": "caret-neutral-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-neutral-700",
    "insertText": "bg-neutral-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-neutral-700",
    "insertText": "text-neutral-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-neutral-700",
    "insertText": "border-neutral-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-neutral-700",
    "insertText": "outline-neutral-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-neutral-700",
    "insertText": "ring-neutral-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-neutral-700",
    "insertText": "fill-neutral-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-neutral-700",
    "insertText": "stroke-neutral-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-neutral-700",
    "insertText": "shadow-neutral-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-neutral-700",
    "insertText": "decoration-neutral-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-neutral-700",
    "insertText": "accent-neutral-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-neutral-700",
    "insertText": "caret-neutral-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-neutral-800",
    "insertText": "bg-neutral-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-neutral-800",
    "insertText": "text-neutral-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-neutral-800",
    "insertText": "border-neutral-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-neutral-800",
    "insertText": "outline-neutral-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-neutral-800",
    "insertText": "ring-neutral-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-neutral-800",
    "insertText": "fill-neutral-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-neutral-800",
    "insertText": "stroke-neutral-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-neutral-800",
    "insertText": "shadow-neutral-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-neutral-800",
    "insertText": "decoration-neutral-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-neutral-800",
    "insertText": "accent-neutral-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-neutral-800",
    "insertText": "caret-neutral-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-neutral-900",
    "insertText": "bg-neutral-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-neutral-900",
    "insertText": "text-neutral-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-neutral-900",
    "insertText": "border-neutral-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-neutral-900",
    "insertText": "outline-neutral-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-neutral-900",
    "insertText": "ring-neutral-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-neutral-900",
    "insertText": "fill-neutral-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-neutral-900",
    "insertText": "stroke-neutral-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-neutral-900",
    "insertText": "shadow-neutral-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-neutral-900",
    "insertText": "decoration-neutral-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-neutral-900",
    "insertText": "accent-neutral-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-neutral-900",
    "insertText": "caret-neutral-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-neutral-950",
    "insertText": "bg-neutral-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-neutral-950",
    "insertText": "text-neutral-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-neutral-950",
    "insertText": "border-neutral-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-neutral-950",
    "insertText": "outline-neutral-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-neutral-950",
    "insertText": "ring-neutral-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-neutral-950",
    "insertText": "fill-neutral-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-neutral-950",
    "insertText": "stroke-neutral-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-neutral-950",
    "insertText": "shadow-neutral-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-neutral-950",
    "insertText": "decoration-neutral-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-neutral-950",
    "insertText": "accent-neutral-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-neutral-950",
    "insertText": "caret-neutral-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-stone-50",
    "insertText": "bg-stone-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-stone-50",
    "insertText": "text-stone-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-stone-50",
    "insertText": "border-stone-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-stone-50",
    "insertText": "outline-stone-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-stone-50",
    "insertText": "ring-stone-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-stone-50",
    "insertText": "fill-stone-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-stone-50",
    "insertText": "stroke-stone-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-stone-50",
    "insertText": "shadow-stone-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-stone-50",
    "insertText": "decoration-stone-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-stone-50",
    "insertText": "accent-stone-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-stone-50",
    "insertText": "caret-stone-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-stone-100",
    "insertText": "bg-stone-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-stone-100",
    "insertText": "text-stone-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-stone-100",
    "insertText": "border-stone-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-stone-100",
    "insertText": "outline-stone-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-stone-100",
    "insertText": "ring-stone-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-stone-100",
    "insertText": "fill-stone-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-stone-100",
    "insertText": "stroke-stone-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-stone-100",
    "insertText": "shadow-stone-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-stone-100",
    "insertText": "decoration-stone-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-stone-100",
    "insertText": "accent-stone-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-stone-100",
    "insertText": "caret-stone-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-stone-200",
    "insertText": "bg-stone-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-stone-200",
    "insertText": "text-stone-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-stone-200",
    "insertText": "border-stone-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-stone-200",
    "insertText": "outline-stone-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-stone-200",
    "insertText": "ring-stone-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-stone-200",
    "insertText": "fill-stone-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-stone-200",
    "insertText": "stroke-stone-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-stone-200",
    "insertText": "shadow-stone-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-stone-200",
    "insertText": "decoration-stone-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-stone-200",
    "insertText": "accent-stone-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-stone-200",
    "insertText": "caret-stone-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-stone-300",
    "insertText": "bg-stone-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-stone-300",
    "insertText": "text-stone-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-stone-300",
    "insertText": "border-stone-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-stone-300",
    "insertText": "outline-stone-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-stone-300",
    "insertText": "ring-stone-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-stone-300",
    "insertText": "fill-stone-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-stone-300",
    "insertText": "stroke-stone-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-stone-300",
    "insertText": "shadow-stone-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-stone-300",
    "insertText": "decoration-stone-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-stone-300",
    "insertText": "accent-stone-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-stone-300",
    "insertText": "caret-stone-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-stone-400",
    "insertText": "bg-stone-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-stone-400",
    "insertText": "text-stone-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-stone-400",
    "insertText": "border-stone-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-stone-400",
    "insertText": "outline-stone-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-stone-400",
    "insertText": "ring-stone-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-stone-400",
    "insertText": "fill-stone-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-stone-400",
    "insertText": "stroke-stone-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-stone-400",
    "insertText": "shadow-stone-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-stone-400",
    "insertText": "decoration-stone-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-stone-400",
    "insertText": "accent-stone-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-stone-400",
    "insertText": "caret-stone-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-stone-500",
    "insertText": "bg-stone-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-stone-500",
    "insertText": "text-stone-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-stone-500",
    "insertText": "border-stone-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-stone-500",
    "insertText": "outline-stone-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-stone-500",
    "insertText": "ring-stone-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-stone-500",
    "insertText": "fill-stone-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-stone-500",
    "insertText": "stroke-stone-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-stone-500",
    "insertText": "shadow-stone-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-stone-500",
    "insertText": "decoration-stone-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-stone-500",
    "insertText": "accent-stone-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-stone-500",
    "insertText": "caret-stone-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-stone-600",
    "insertText": "bg-stone-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-stone-600",
    "insertText": "text-stone-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-stone-600",
    "insertText": "border-stone-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-stone-600",
    "insertText": "outline-stone-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-stone-600",
    "insertText": "ring-stone-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-stone-600",
    "insertText": "fill-stone-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-stone-600",
    "insertText": "stroke-stone-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-stone-600",
    "insertText": "shadow-stone-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-stone-600",
    "insertText": "decoration-stone-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-stone-600",
    "insertText": "accent-stone-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-stone-600",
    "insertText": "caret-stone-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-stone-700",
    "insertText": "bg-stone-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-stone-700",
    "insertText": "text-stone-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-stone-700",
    "insertText": "border-stone-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-stone-700",
    "insertText": "outline-stone-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-stone-700",
    "insertText": "ring-stone-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-stone-700",
    "insertText": "fill-stone-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-stone-700",
    "insertText": "stroke-stone-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-stone-700",
    "insertText": "shadow-stone-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-stone-700",
    "insertText": "decoration-stone-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-stone-700",
    "insertText": "accent-stone-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-stone-700",
    "insertText": "caret-stone-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-stone-800",
    "insertText": "bg-stone-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-stone-800",
    "insertText": "text-stone-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-stone-800",
    "insertText": "border-stone-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-stone-800",
    "insertText": "outline-stone-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-stone-800",
    "insertText": "ring-stone-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-stone-800",
    "insertText": "fill-stone-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-stone-800",
    "insertText": "stroke-stone-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-stone-800",
    "insertText": "shadow-stone-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-stone-800",
    "insertText": "decoration-stone-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-stone-800",
    "insertText": "accent-stone-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-stone-800",
    "insertText": "caret-stone-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-stone-900",
    "insertText": "bg-stone-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-stone-900",
    "insertText": "text-stone-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-stone-900",
    "insertText": "border-stone-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-stone-900",
    "insertText": "outline-stone-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-stone-900",
    "insertText": "ring-stone-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-stone-900",
    "insertText": "fill-stone-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-stone-900",
    "insertText": "stroke-stone-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-stone-900",
    "insertText": "shadow-stone-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-stone-900",
    "insertText": "decoration-stone-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-stone-900",
    "insertText": "accent-stone-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-stone-900",
    "insertText": "caret-stone-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-stone-950",
    "insertText": "bg-stone-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-stone-950",
    "insertText": "text-stone-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-stone-950",
    "insertText": "border-stone-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-stone-950",
    "insertText": "outline-stone-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-stone-950",
    "insertText": "ring-stone-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-stone-950",
    "insertText": "fill-stone-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-stone-950",
    "insertText": "stroke-stone-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-stone-950",
    "insertText": "shadow-stone-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-stone-950",
    "insertText": "decoration-stone-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-stone-950",
    "insertText": "accent-stone-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-stone-950",
    "insertText": "caret-stone-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-red-50",
    "insertText": "bg-red-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-red-50",
    "insertText": "text-red-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-red-50",
    "insertText": "border-red-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-red-50",
    "insertText": "outline-red-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-red-50",
    "insertText": "ring-red-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-red-50",
    "insertText": "fill-red-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-red-50",
    "insertText": "stroke-red-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-red-50",
    "insertText": "shadow-red-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-red-50",
    "insertText": "decoration-red-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-red-50",
    "insertText": "accent-red-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-red-50",
    "insertText": "caret-red-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-red-100",
    "insertText": "bg-red-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-red-100",
    "insertText": "text-red-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-red-100",
    "insertText": "border-red-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-red-100",
    "insertText": "outline-red-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-red-100",
    "insertText": "ring-red-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-red-100",
    "insertText": "fill-red-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-red-100",
    "insertText": "stroke-red-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-red-100",
    "insertText": "shadow-red-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-red-100",
    "insertText": "decoration-red-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-red-100",
    "insertText": "accent-red-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-red-100",
    "insertText": "caret-red-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-red-200",
    "insertText": "bg-red-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-red-200",
    "insertText": "text-red-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-red-200",
    "insertText": "border-red-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-red-200",
    "insertText": "outline-red-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-red-200",
    "insertText": "ring-red-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-red-200",
    "insertText": "fill-red-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-red-200",
    "insertText": "stroke-red-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-red-200",
    "insertText": "shadow-red-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-red-200",
    "insertText": "decoration-red-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-red-200",
    "insertText": "accent-red-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-red-200",
    "insertText": "caret-red-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-red-300",
    "insertText": "bg-red-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-red-300",
    "insertText": "text-red-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-red-300",
    "insertText": "border-red-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-red-300",
    "insertText": "outline-red-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-red-300",
    "insertText": "ring-red-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-red-300",
    "insertText": "fill-red-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-red-300",
    "insertText": "stroke-red-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-red-300",
    "insertText": "shadow-red-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-red-300",
    "insertText": "decoration-red-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-red-300",
    "insertText": "accent-red-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-red-300",
    "insertText": "caret-red-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-red-400",
    "insertText": "bg-red-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-red-400",
    "insertText": "text-red-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-red-400",
    "insertText": "border-red-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-red-400",
    "insertText": "outline-red-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-red-400",
    "insertText": "ring-red-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-red-400",
    "insertText": "fill-red-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-red-400",
    "insertText": "stroke-red-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-red-400",
    "insertText": "shadow-red-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-red-400",
    "insertText": "decoration-red-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-red-400",
    "insertText": "accent-red-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-red-400",
    "insertText": "caret-red-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-red-500",
    "insertText": "bg-red-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-red-500",
    "insertText": "text-red-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-red-500",
    "insertText": "border-red-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-red-500",
    "insertText": "outline-red-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-red-500",
    "insertText": "ring-red-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-red-500",
    "insertText": "fill-red-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-red-500",
    "insertText": "stroke-red-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-red-500",
    "insertText": "shadow-red-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-red-500",
    "insertText": "decoration-red-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-red-500",
    "insertText": "accent-red-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-red-500",
    "insertText": "caret-red-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-red-600",
    "insertText": "bg-red-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-red-600",
    "insertText": "text-red-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-red-600",
    "insertText": "border-red-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-red-600",
    "insertText": "outline-red-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-red-600",
    "insertText": "ring-red-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-red-600",
    "insertText": "fill-red-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-red-600",
    "insertText": "stroke-red-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-red-600",
    "insertText": "shadow-red-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-red-600",
    "insertText": "decoration-red-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-red-600",
    "insertText": "accent-red-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-red-600",
    "insertText": "caret-red-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-red-700",
    "insertText": "bg-red-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-red-700",
    "insertText": "text-red-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-red-700",
    "insertText": "border-red-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-red-700",
    "insertText": "outline-red-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-red-700",
    "insertText": "ring-red-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-red-700",
    "insertText": "fill-red-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-red-700",
    "insertText": "stroke-red-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-red-700",
    "insertText": "shadow-red-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-red-700",
    "insertText": "decoration-red-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-red-700",
    "insertText": "accent-red-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-red-700",
    "insertText": "caret-red-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-red-800",
    "insertText": "bg-red-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-red-800",
    "insertText": "text-red-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-red-800",
    "insertText": "border-red-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-red-800",
    "insertText": "outline-red-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-red-800",
    "insertText": "ring-red-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-red-800",
    "insertText": "fill-red-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-red-800",
    "insertText": "stroke-red-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-red-800",
    "insertText": "shadow-red-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-red-800",
    "insertText": "decoration-red-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-red-800",
    "insertText": "accent-red-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-red-800",
    "insertText": "caret-red-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-red-900",
    "insertText": "bg-red-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-red-900",
    "insertText": "text-red-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-red-900",
    "insertText": "border-red-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-red-900",
    "insertText": "outline-red-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-red-900",
    "insertText": "ring-red-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-red-900",
    "insertText": "fill-red-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-red-900",
    "insertText": "stroke-red-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-red-900",
    "insertText": "shadow-red-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-red-900",
    "insertText": "decoration-red-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-red-900",
    "insertText": "accent-red-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-red-900",
    "insertText": "caret-red-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-red-950",
    "insertText": "bg-red-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-red-950",
    "insertText": "text-red-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-red-950",
    "insertText": "border-red-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-red-950",
    "insertText": "outline-red-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-red-950",
    "insertText": "ring-red-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-red-950",
    "insertText": "fill-red-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-red-950",
    "insertText": "stroke-red-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-red-950",
    "insertText": "shadow-red-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-red-950",
    "insertText": "decoration-red-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-red-950",
    "insertText": "accent-red-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-red-950",
    "insertText": "caret-red-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-orange-50",
    "insertText": "bg-orange-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-orange-50",
    "insertText": "text-orange-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-orange-50",
    "insertText": "border-orange-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-orange-50",
    "insertText": "outline-orange-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-orange-50",
    "insertText": "ring-orange-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-orange-50",
    "insertText": "fill-orange-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-orange-50",
    "insertText": "stroke-orange-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-orange-50",
    "insertText": "shadow-orange-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-orange-50",
    "insertText": "decoration-orange-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-orange-50",
    "insertText": "accent-orange-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-orange-50",
    "insertText": "caret-orange-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-orange-100",
    "insertText": "bg-orange-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-orange-100",
    "insertText": "text-orange-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-orange-100",
    "insertText": "border-orange-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-orange-100",
    "insertText": "outline-orange-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-orange-100",
    "insertText": "ring-orange-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-orange-100",
    "insertText": "fill-orange-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-orange-100",
    "insertText": "stroke-orange-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-orange-100",
    "insertText": "shadow-orange-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-orange-100",
    "insertText": "decoration-orange-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-orange-100",
    "insertText": "accent-orange-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-orange-100",
    "insertText": "caret-orange-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-orange-200",
    "insertText": "bg-orange-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-orange-200",
    "insertText": "text-orange-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-orange-200",
    "insertText": "border-orange-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-orange-200",
    "insertText": "outline-orange-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-orange-200",
    "insertText": "ring-orange-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-orange-200",
    "insertText": "fill-orange-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-orange-200",
    "insertText": "stroke-orange-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-orange-200",
    "insertText": "shadow-orange-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-orange-200",
    "insertText": "decoration-orange-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-orange-200",
    "insertText": "accent-orange-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-orange-200",
    "insertText": "caret-orange-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-orange-300",
    "insertText": "bg-orange-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-orange-300",
    "insertText": "text-orange-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-orange-300",
    "insertText": "border-orange-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-orange-300",
    "insertText": "outline-orange-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-orange-300",
    "insertText": "ring-orange-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-orange-300",
    "insertText": "fill-orange-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-orange-300",
    "insertText": "stroke-orange-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-orange-300",
    "insertText": "shadow-orange-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-orange-300",
    "insertText": "decoration-orange-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-orange-300",
    "insertText": "accent-orange-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-orange-300",
    "insertText": "caret-orange-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-orange-400",
    "insertText": "bg-orange-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-orange-400",
    "insertText": "text-orange-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-orange-400",
    "insertText": "border-orange-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-orange-400",
    "insertText": "outline-orange-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-orange-400",
    "insertText": "ring-orange-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-orange-400",
    "insertText": "fill-orange-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-orange-400",
    "insertText": "stroke-orange-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-orange-400",
    "insertText": "shadow-orange-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-orange-400",
    "insertText": "decoration-orange-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-orange-400",
    "insertText": "accent-orange-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-orange-400",
    "insertText": "caret-orange-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-orange-500",
    "insertText": "bg-orange-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-orange-500",
    "insertText": "text-orange-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-orange-500",
    "insertText": "border-orange-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-orange-500",
    "insertText": "outline-orange-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-orange-500",
    "insertText": "ring-orange-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-orange-500",
    "insertText": "fill-orange-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-orange-500",
    "insertText": "stroke-orange-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-orange-500",
    "insertText": "shadow-orange-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-orange-500",
    "insertText": "decoration-orange-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-orange-500",
    "insertText": "accent-orange-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-orange-500",
    "insertText": "caret-orange-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-orange-600",
    "insertText": "bg-orange-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-orange-600",
    "insertText": "text-orange-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-orange-600",
    "insertText": "border-orange-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-orange-600",
    "insertText": "outline-orange-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-orange-600",
    "insertText": "ring-orange-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-orange-600",
    "insertText": "fill-orange-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-orange-600",
    "insertText": "stroke-orange-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-orange-600",
    "insertText": "shadow-orange-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-orange-600",
    "insertText": "decoration-orange-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-orange-600",
    "insertText": "accent-orange-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-orange-600",
    "insertText": "caret-orange-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-orange-700",
    "insertText": "bg-orange-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-orange-700",
    "insertText": "text-orange-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-orange-700",
    "insertText": "border-orange-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-orange-700",
    "insertText": "outline-orange-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-orange-700",
    "insertText": "ring-orange-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-orange-700",
    "insertText": "fill-orange-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-orange-700",
    "insertText": "stroke-orange-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-orange-700",
    "insertText": "shadow-orange-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-orange-700",
    "insertText": "decoration-orange-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-orange-700",
    "insertText": "accent-orange-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-orange-700",
    "insertText": "caret-orange-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-orange-800",
    "insertText": "bg-orange-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-orange-800",
    "insertText": "text-orange-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-orange-800",
    "insertText": "border-orange-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-orange-800",
    "insertText": "outline-orange-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-orange-800",
    "insertText": "ring-orange-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-orange-800",
    "insertText": "fill-orange-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-orange-800",
    "insertText": "stroke-orange-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-orange-800",
    "insertText": "shadow-orange-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-orange-800",
    "insertText": "decoration-orange-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-orange-800",
    "insertText": "accent-orange-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-orange-800",
    "insertText": "caret-orange-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-orange-900",
    "insertText": "bg-orange-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-orange-900",
    "insertText": "text-orange-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-orange-900",
    "insertText": "border-orange-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-orange-900",
    "insertText": "outline-orange-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-orange-900",
    "insertText": "ring-orange-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-orange-900",
    "insertText": "fill-orange-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-orange-900",
    "insertText": "stroke-orange-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-orange-900",
    "insertText": "shadow-orange-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-orange-900",
    "insertText": "decoration-orange-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-orange-900",
    "insertText": "accent-orange-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-orange-900",
    "insertText": "caret-orange-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-orange-950",
    "insertText": "bg-orange-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-orange-950",
    "insertText": "text-orange-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-orange-950",
    "insertText": "border-orange-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-orange-950",
    "insertText": "outline-orange-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-orange-950",
    "insertText": "ring-orange-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-orange-950",
    "insertText": "fill-orange-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-orange-950",
    "insertText": "stroke-orange-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-orange-950",
    "insertText": "shadow-orange-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-orange-950",
    "insertText": "decoration-orange-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-orange-950",
    "insertText": "accent-orange-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-orange-950",
    "insertText": "caret-orange-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-amber-50",
    "insertText": "bg-amber-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-amber-50",
    "insertText": "text-amber-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-amber-50",
    "insertText": "border-amber-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-amber-50",
    "insertText": "outline-amber-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-amber-50",
    "insertText": "ring-amber-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-amber-50",
    "insertText": "fill-amber-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-amber-50",
    "insertText": "stroke-amber-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-amber-50",
    "insertText": "shadow-amber-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-amber-50",
    "insertText": "decoration-amber-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-amber-50",
    "insertText": "accent-amber-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-amber-50",
    "insertText": "caret-amber-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-amber-100",
    "insertText": "bg-amber-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-amber-100",
    "insertText": "text-amber-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-amber-100",
    "insertText": "border-amber-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-amber-100",
    "insertText": "outline-amber-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-amber-100",
    "insertText": "ring-amber-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-amber-100",
    "insertText": "fill-amber-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-amber-100",
    "insertText": "stroke-amber-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-amber-100",
    "insertText": "shadow-amber-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-amber-100",
    "insertText": "decoration-amber-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-amber-100",
    "insertText": "accent-amber-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-amber-100",
    "insertText": "caret-amber-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-amber-200",
    "insertText": "bg-amber-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-amber-200",
    "insertText": "text-amber-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-amber-200",
    "insertText": "border-amber-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-amber-200",
    "insertText": "outline-amber-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-amber-200",
    "insertText": "ring-amber-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-amber-200",
    "insertText": "fill-amber-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-amber-200",
    "insertText": "stroke-amber-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-amber-200",
    "insertText": "shadow-amber-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-amber-200",
    "insertText": "decoration-amber-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-amber-200",
    "insertText": "accent-amber-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-amber-200",
    "insertText": "caret-amber-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-amber-300",
    "insertText": "bg-amber-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-amber-300",
    "insertText": "text-amber-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-amber-300",
    "insertText": "border-amber-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-amber-300",
    "insertText": "outline-amber-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-amber-300",
    "insertText": "ring-amber-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-amber-300",
    "insertText": "fill-amber-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-amber-300",
    "insertText": "stroke-amber-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-amber-300",
    "insertText": "shadow-amber-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-amber-300",
    "insertText": "decoration-amber-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-amber-300",
    "insertText": "accent-amber-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-amber-300",
    "insertText": "caret-amber-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-amber-400",
    "insertText": "bg-amber-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-amber-400",
    "insertText": "text-amber-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-amber-400",
    "insertText": "border-amber-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-amber-400",
    "insertText": "outline-amber-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-amber-400",
    "insertText": "ring-amber-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-amber-400",
    "insertText": "fill-amber-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-amber-400",
    "insertText": "stroke-amber-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-amber-400",
    "insertText": "shadow-amber-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-amber-400",
    "insertText": "decoration-amber-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-amber-400",
    "insertText": "accent-amber-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-amber-400",
    "insertText": "caret-amber-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-amber-500",
    "insertText": "bg-amber-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-amber-500",
    "insertText": "text-amber-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-amber-500",
    "insertText": "border-amber-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-amber-500",
    "insertText": "outline-amber-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-amber-500",
    "insertText": "ring-amber-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-amber-500",
    "insertText": "fill-amber-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-amber-500",
    "insertText": "stroke-amber-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-amber-500",
    "insertText": "shadow-amber-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-amber-500",
    "insertText": "decoration-amber-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-amber-500",
    "insertText": "accent-amber-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-amber-500",
    "insertText": "caret-amber-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-amber-600",
    "insertText": "bg-amber-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-amber-600",
    "insertText": "text-amber-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-amber-600",
    "insertText": "border-amber-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-amber-600",
    "insertText": "outline-amber-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-amber-600",
    "insertText": "ring-amber-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-amber-600",
    "insertText": "fill-amber-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-amber-600",
    "insertText": "stroke-amber-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-amber-600",
    "insertText": "shadow-amber-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-amber-600",
    "insertText": "decoration-amber-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-amber-600",
    "insertText": "accent-amber-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-amber-600",
    "insertText": "caret-amber-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-amber-700",
    "insertText": "bg-amber-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-amber-700",
    "insertText": "text-amber-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-amber-700",
    "insertText": "border-amber-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-amber-700",
    "insertText": "outline-amber-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-amber-700",
    "insertText": "ring-amber-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-amber-700",
    "insertText": "fill-amber-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-amber-700",
    "insertText": "stroke-amber-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-amber-700",
    "insertText": "shadow-amber-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-amber-700",
    "insertText": "decoration-amber-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-amber-700",
    "insertText": "accent-amber-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-amber-700",
    "insertText": "caret-amber-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-amber-800",
    "insertText": "bg-amber-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-amber-800",
    "insertText": "text-amber-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-amber-800",
    "insertText": "border-amber-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-amber-800",
    "insertText": "outline-amber-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-amber-800",
    "insertText": "ring-amber-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-amber-800",
    "insertText": "fill-amber-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-amber-800",
    "insertText": "stroke-amber-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-amber-800",
    "insertText": "shadow-amber-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-amber-800",
    "insertText": "decoration-amber-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-amber-800",
    "insertText": "accent-amber-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-amber-800",
    "insertText": "caret-amber-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-amber-900",
    "insertText": "bg-amber-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-amber-900",
    "insertText": "text-amber-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-amber-900",
    "insertText": "border-amber-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-amber-900",
    "insertText": "outline-amber-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-amber-900",
    "insertText": "ring-amber-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-amber-900",
    "insertText": "fill-amber-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-amber-900",
    "insertText": "stroke-amber-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-amber-900",
    "insertText": "shadow-amber-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-amber-900",
    "insertText": "decoration-amber-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-amber-900",
    "insertText": "accent-amber-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-amber-900",
    "insertText": "caret-amber-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-amber-950",
    "insertText": "bg-amber-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-amber-950",
    "insertText": "text-amber-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-amber-950",
    "insertText": "border-amber-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-amber-950",
    "insertText": "outline-amber-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-amber-950",
    "insertText": "ring-amber-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-amber-950",
    "insertText": "fill-amber-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-amber-950",
    "insertText": "stroke-amber-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-amber-950",
    "insertText": "shadow-amber-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-amber-950",
    "insertText": "decoration-amber-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-amber-950",
    "insertText": "accent-amber-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-amber-950",
    "insertText": "caret-amber-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-yellow-50",
    "insertText": "bg-yellow-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-yellow-50",
    "insertText": "text-yellow-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-yellow-50",
    "insertText": "border-yellow-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-yellow-50",
    "insertText": "outline-yellow-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-yellow-50",
    "insertText": "ring-yellow-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-yellow-50",
    "insertText": "fill-yellow-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-yellow-50",
    "insertText": "stroke-yellow-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-yellow-50",
    "insertText": "shadow-yellow-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-yellow-50",
    "insertText": "decoration-yellow-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-yellow-50",
    "insertText": "accent-yellow-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-yellow-50",
    "insertText": "caret-yellow-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-yellow-100",
    "insertText": "bg-yellow-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-yellow-100",
    "insertText": "text-yellow-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-yellow-100",
    "insertText": "border-yellow-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-yellow-100",
    "insertText": "outline-yellow-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-yellow-100",
    "insertText": "ring-yellow-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-yellow-100",
    "insertText": "fill-yellow-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-yellow-100",
    "insertText": "stroke-yellow-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-yellow-100",
    "insertText": "shadow-yellow-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-yellow-100",
    "insertText": "decoration-yellow-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-yellow-100",
    "insertText": "accent-yellow-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-yellow-100",
    "insertText": "caret-yellow-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-yellow-200",
    "insertText": "bg-yellow-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-yellow-200",
    "insertText": "text-yellow-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-yellow-200",
    "insertText": "border-yellow-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-yellow-200",
    "insertText": "outline-yellow-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-yellow-200",
    "insertText": "ring-yellow-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-yellow-200",
    "insertText": "fill-yellow-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-yellow-200",
    "insertText": "stroke-yellow-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-yellow-200",
    "insertText": "shadow-yellow-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-yellow-200",
    "insertText": "decoration-yellow-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-yellow-200",
    "insertText": "accent-yellow-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-yellow-200",
    "insertText": "caret-yellow-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-yellow-300",
    "insertText": "bg-yellow-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-yellow-300",
    "insertText": "text-yellow-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-yellow-300",
    "insertText": "border-yellow-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-yellow-300",
    "insertText": "outline-yellow-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-yellow-300",
    "insertText": "ring-yellow-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-yellow-300",
    "insertText": "fill-yellow-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-yellow-300",
    "insertText": "stroke-yellow-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-yellow-300",
    "insertText": "shadow-yellow-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-yellow-300",
    "insertText": "decoration-yellow-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-yellow-300",
    "insertText": "accent-yellow-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-yellow-300",
    "insertText": "caret-yellow-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-yellow-400",
    "insertText": "bg-yellow-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-yellow-400",
    "insertText": "text-yellow-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-yellow-400",
    "insertText": "border-yellow-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-yellow-400",
    "insertText": "outline-yellow-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-yellow-400",
    "insertText": "ring-yellow-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-yellow-400",
    "insertText": "fill-yellow-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-yellow-400",
    "insertText": "stroke-yellow-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-yellow-400",
    "insertText": "shadow-yellow-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-yellow-400",
    "insertText": "decoration-yellow-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-yellow-400",
    "insertText": "accent-yellow-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-yellow-400",
    "insertText": "caret-yellow-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-yellow-500",
    "insertText": "bg-yellow-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-yellow-500",
    "insertText": "text-yellow-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-yellow-500",
    "insertText": "border-yellow-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-yellow-500",
    "insertText": "outline-yellow-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-yellow-500",
    "insertText": "ring-yellow-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-yellow-500",
    "insertText": "fill-yellow-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-yellow-500",
    "insertText": "stroke-yellow-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-yellow-500",
    "insertText": "shadow-yellow-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-yellow-500",
    "insertText": "decoration-yellow-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-yellow-500",
    "insertText": "accent-yellow-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-yellow-500",
    "insertText": "caret-yellow-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-yellow-600",
    "insertText": "bg-yellow-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-yellow-600",
    "insertText": "text-yellow-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-yellow-600",
    "insertText": "border-yellow-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-yellow-600",
    "insertText": "outline-yellow-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-yellow-600",
    "insertText": "ring-yellow-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-yellow-600",
    "insertText": "fill-yellow-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-yellow-600",
    "insertText": "stroke-yellow-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-yellow-600",
    "insertText": "shadow-yellow-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-yellow-600",
    "insertText": "decoration-yellow-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-yellow-600",
    "insertText": "accent-yellow-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-yellow-600",
    "insertText": "caret-yellow-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-yellow-700",
    "insertText": "bg-yellow-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-yellow-700",
    "insertText": "text-yellow-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-yellow-700",
    "insertText": "border-yellow-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-yellow-700",
    "insertText": "outline-yellow-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-yellow-700",
    "insertText": "ring-yellow-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-yellow-700",
    "insertText": "fill-yellow-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-yellow-700",
    "insertText": "stroke-yellow-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-yellow-700",
    "insertText": "shadow-yellow-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-yellow-700",
    "insertText": "decoration-yellow-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-yellow-700",
    "insertText": "accent-yellow-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-yellow-700",
    "insertText": "caret-yellow-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-yellow-800",
    "insertText": "bg-yellow-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-yellow-800",
    "insertText": "text-yellow-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-yellow-800",
    "insertText": "border-yellow-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-yellow-800",
    "insertText": "outline-yellow-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-yellow-800",
    "insertText": "ring-yellow-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-yellow-800",
    "insertText": "fill-yellow-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-yellow-800",
    "insertText": "stroke-yellow-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-yellow-800",
    "insertText": "shadow-yellow-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-yellow-800",
    "insertText": "decoration-yellow-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-yellow-800",
    "insertText": "accent-yellow-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-yellow-800",
    "insertText": "caret-yellow-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-yellow-900",
    "insertText": "bg-yellow-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-yellow-900",
    "insertText": "text-yellow-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-yellow-900",
    "insertText": "border-yellow-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-yellow-900",
    "insertText": "outline-yellow-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-yellow-900",
    "insertText": "ring-yellow-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-yellow-900",
    "insertText": "fill-yellow-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-yellow-900",
    "insertText": "stroke-yellow-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-yellow-900",
    "insertText": "shadow-yellow-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-yellow-900",
    "insertText": "decoration-yellow-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-yellow-900",
    "insertText": "accent-yellow-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-yellow-900",
    "insertText": "caret-yellow-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-yellow-950",
    "insertText": "bg-yellow-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-yellow-950",
    "insertText": "text-yellow-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-yellow-950",
    "insertText": "border-yellow-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-yellow-950",
    "insertText": "outline-yellow-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-yellow-950",
    "insertText": "ring-yellow-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-yellow-950",
    "insertText": "fill-yellow-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-yellow-950",
    "insertText": "stroke-yellow-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-yellow-950",
    "insertText": "shadow-yellow-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-yellow-950",
    "insertText": "decoration-yellow-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-yellow-950",
    "insertText": "accent-yellow-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-yellow-950",
    "insertText": "caret-yellow-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-lime-50",
    "insertText": "bg-lime-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-lime-50",
    "insertText": "text-lime-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-lime-50",
    "insertText": "border-lime-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-lime-50",
    "insertText": "outline-lime-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-lime-50",
    "insertText": "ring-lime-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-lime-50",
    "insertText": "fill-lime-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-lime-50",
    "insertText": "stroke-lime-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-lime-50",
    "insertText": "shadow-lime-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-lime-50",
    "insertText": "decoration-lime-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-lime-50",
    "insertText": "accent-lime-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-lime-50",
    "insertText": "caret-lime-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-lime-100",
    "insertText": "bg-lime-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-lime-100",
    "insertText": "text-lime-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-lime-100",
    "insertText": "border-lime-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-lime-100",
    "insertText": "outline-lime-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-lime-100",
    "insertText": "ring-lime-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-lime-100",
    "insertText": "fill-lime-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-lime-100",
    "insertText": "stroke-lime-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-lime-100",
    "insertText": "shadow-lime-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-lime-100",
    "insertText": "decoration-lime-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-lime-100",
    "insertText": "accent-lime-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-lime-100",
    "insertText": "caret-lime-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-lime-200",
    "insertText": "bg-lime-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-lime-200",
    "insertText": "text-lime-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-lime-200",
    "insertText": "border-lime-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-lime-200",
    "insertText": "outline-lime-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-lime-200",
    "insertText": "ring-lime-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-lime-200",
    "insertText": "fill-lime-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-lime-200",
    "insertText": "stroke-lime-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-lime-200",
    "insertText": "shadow-lime-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-lime-200",
    "insertText": "decoration-lime-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-lime-200",
    "insertText": "accent-lime-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-lime-200",
    "insertText": "caret-lime-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-lime-300",
    "insertText": "bg-lime-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-lime-300",
    "insertText": "text-lime-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-lime-300",
    "insertText": "border-lime-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-lime-300",
    "insertText": "outline-lime-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-lime-300",
    "insertText": "ring-lime-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-lime-300",
    "insertText": "fill-lime-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-lime-300",
    "insertText": "stroke-lime-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-lime-300",
    "insertText": "shadow-lime-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-lime-300",
    "insertText": "decoration-lime-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-lime-300",
    "insertText": "accent-lime-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-lime-300",
    "insertText": "caret-lime-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-lime-400",
    "insertText": "bg-lime-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-lime-400",
    "insertText": "text-lime-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-lime-400",
    "insertText": "border-lime-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-lime-400",
    "insertText": "outline-lime-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-lime-400",
    "insertText": "ring-lime-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-lime-400",
    "insertText": "fill-lime-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-lime-400",
    "insertText": "stroke-lime-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-lime-400",
    "insertText": "shadow-lime-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-lime-400",
    "insertText": "decoration-lime-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-lime-400",
    "insertText": "accent-lime-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-lime-400",
    "insertText": "caret-lime-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-lime-500",
    "insertText": "bg-lime-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-lime-500",
    "insertText": "text-lime-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-lime-500",
    "insertText": "border-lime-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-lime-500",
    "insertText": "outline-lime-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-lime-500",
    "insertText": "ring-lime-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-lime-500",
    "insertText": "fill-lime-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-lime-500",
    "insertText": "stroke-lime-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-lime-500",
    "insertText": "shadow-lime-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-lime-500",
    "insertText": "decoration-lime-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-lime-500",
    "insertText": "accent-lime-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-lime-500",
    "insertText": "caret-lime-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-lime-600",
    "insertText": "bg-lime-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-lime-600",
    "insertText": "text-lime-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-lime-600",
    "insertText": "border-lime-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-lime-600",
    "insertText": "outline-lime-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-lime-600",
    "insertText": "ring-lime-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-lime-600",
    "insertText": "fill-lime-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-lime-600",
    "insertText": "stroke-lime-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-lime-600",
    "insertText": "shadow-lime-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-lime-600",
    "insertText": "decoration-lime-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-lime-600",
    "insertText": "accent-lime-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-lime-600",
    "insertText": "caret-lime-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-lime-700",
    "insertText": "bg-lime-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-lime-700",
    "insertText": "text-lime-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-lime-700",
    "insertText": "border-lime-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-lime-700",
    "insertText": "outline-lime-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-lime-700",
    "insertText": "ring-lime-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-lime-700",
    "insertText": "fill-lime-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-lime-700",
    "insertText": "stroke-lime-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-lime-700",
    "insertText": "shadow-lime-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-lime-700",
    "insertText": "decoration-lime-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-lime-700",
    "insertText": "accent-lime-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-lime-700",
    "insertText": "caret-lime-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-lime-800",
    "insertText": "bg-lime-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-lime-800",
    "insertText": "text-lime-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-lime-800",
    "insertText": "border-lime-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-lime-800",
    "insertText": "outline-lime-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-lime-800",
    "insertText": "ring-lime-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-lime-800",
    "insertText": "fill-lime-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-lime-800",
    "insertText": "stroke-lime-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-lime-800",
    "insertText": "shadow-lime-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-lime-800",
    "insertText": "decoration-lime-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-lime-800",
    "insertText": "accent-lime-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-lime-800",
    "insertText": "caret-lime-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-lime-900",
    "insertText": "bg-lime-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-lime-900",
    "insertText": "text-lime-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-lime-900",
    "insertText": "border-lime-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-lime-900",
    "insertText": "outline-lime-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-lime-900",
    "insertText": "ring-lime-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-lime-900",
    "insertText": "fill-lime-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-lime-900",
    "insertText": "stroke-lime-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-lime-900",
    "insertText": "shadow-lime-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-lime-900",
    "insertText": "decoration-lime-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-lime-900",
    "insertText": "accent-lime-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-lime-900",
    "insertText": "caret-lime-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-lime-950",
    "insertText": "bg-lime-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-lime-950",
    "insertText": "text-lime-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-lime-950",
    "insertText": "border-lime-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-lime-950",
    "insertText": "outline-lime-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-lime-950",
    "insertText": "ring-lime-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-lime-950",
    "insertText": "fill-lime-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-lime-950",
    "insertText": "stroke-lime-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-lime-950",
    "insertText": "shadow-lime-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-lime-950",
    "insertText": "decoration-lime-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-lime-950",
    "insertText": "accent-lime-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-lime-950",
    "insertText": "caret-lime-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-green-50",
    "insertText": "bg-green-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-green-50",
    "insertText": "text-green-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-green-50",
    "insertText": "border-green-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-green-50",
    "insertText": "outline-green-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-green-50",
    "insertText": "ring-green-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-green-50",
    "insertText": "fill-green-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-green-50",
    "insertText": "stroke-green-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-green-50",
    "insertText": "shadow-green-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-green-50",
    "insertText": "decoration-green-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-green-50",
    "insertText": "accent-green-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-green-50",
    "insertText": "caret-green-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-green-100",
    "insertText": "bg-green-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-green-100",
    "insertText": "text-green-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-green-100",
    "insertText": "border-green-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-green-100",
    "insertText": "outline-green-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-green-100",
    "insertText": "ring-green-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-green-100",
    "insertText": "fill-green-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-green-100",
    "insertText": "stroke-green-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-green-100",
    "insertText": "shadow-green-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-green-100",
    "insertText": "decoration-green-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-green-100",
    "insertText": "accent-green-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-green-100",
    "insertText": "caret-green-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-green-200",
    "insertText": "bg-green-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-green-200",
    "insertText": "text-green-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-green-200",
    "insertText": "border-green-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-green-200",
    "insertText": "outline-green-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-green-200",
    "insertText": "ring-green-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-green-200",
    "insertText": "fill-green-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-green-200",
    "insertText": "stroke-green-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-green-200",
    "insertText": "shadow-green-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-green-200",
    "insertText": "decoration-green-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-green-200",
    "insertText": "accent-green-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-green-200",
    "insertText": "caret-green-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-green-300",
    "insertText": "bg-green-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-green-300",
    "insertText": "text-green-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-green-300",
    "insertText": "border-green-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-green-300",
    "insertText": "outline-green-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-green-300",
    "insertText": "ring-green-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-green-300",
    "insertText": "fill-green-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-green-300",
    "insertText": "stroke-green-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-green-300",
    "insertText": "shadow-green-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-green-300",
    "insertText": "decoration-green-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-green-300",
    "insertText": "accent-green-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-green-300",
    "insertText": "caret-green-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-green-400",
    "insertText": "bg-green-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-green-400",
    "insertText": "text-green-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-green-400",
    "insertText": "border-green-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-green-400",
    "insertText": "outline-green-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-green-400",
    "insertText": "ring-green-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-green-400",
    "insertText": "fill-green-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-green-400",
    "insertText": "stroke-green-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-green-400",
    "insertText": "shadow-green-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-green-400",
    "insertText": "decoration-green-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-green-400",
    "insertText": "accent-green-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-green-400",
    "insertText": "caret-green-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-green-500",
    "insertText": "bg-green-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-green-500",
    "insertText": "text-green-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-green-500",
    "insertText": "border-green-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-green-500",
    "insertText": "outline-green-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-green-500",
    "insertText": "ring-green-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-green-500",
    "insertText": "fill-green-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-green-500",
    "insertText": "stroke-green-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-green-500",
    "insertText": "shadow-green-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-green-500",
    "insertText": "decoration-green-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-green-500",
    "insertText": "accent-green-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-green-500",
    "insertText": "caret-green-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-green-600",
    "insertText": "bg-green-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-green-600",
    "insertText": "text-green-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-green-600",
    "insertText": "border-green-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-green-600",
    "insertText": "outline-green-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-green-600",
    "insertText": "ring-green-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-green-600",
    "insertText": "fill-green-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-green-600",
    "insertText": "stroke-green-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-green-600",
    "insertText": "shadow-green-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-green-600",
    "insertText": "decoration-green-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-green-600",
    "insertText": "accent-green-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-green-600",
    "insertText": "caret-green-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-green-700",
    "insertText": "bg-green-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-green-700",
    "insertText": "text-green-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-green-700",
    "insertText": "border-green-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-green-700",
    "insertText": "outline-green-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-green-700",
    "insertText": "ring-green-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-green-700",
    "insertText": "fill-green-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-green-700",
    "insertText": "stroke-green-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-green-700",
    "insertText": "shadow-green-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-green-700",
    "insertText": "decoration-green-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-green-700",
    "insertText": "accent-green-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-green-700",
    "insertText": "caret-green-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-green-800",
    "insertText": "bg-green-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-green-800",
    "insertText": "text-green-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-green-800",
    "insertText": "border-green-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-green-800",
    "insertText": "outline-green-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-green-800",
    "insertText": "ring-green-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-green-800",
    "insertText": "fill-green-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-green-800",
    "insertText": "stroke-green-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-green-800",
    "insertText": "shadow-green-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-green-800",
    "insertText": "decoration-green-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-green-800",
    "insertText": "accent-green-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-green-800",
    "insertText": "caret-green-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-green-900",
    "insertText": "bg-green-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-green-900",
    "insertText": "text-green-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-green-900",
    "insertText": "border-green-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-green-900",
    "insertText": "outline-green-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-green-900",
    "insertText": "ring-green-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-green-900",
    "insertText": "fill-green-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-green-900",
    "insertText": "stroke-green-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-green-900",
    "insertText": "shadow-green-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-green-900",
    "insertText": "decoration-green-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-green-900",
    "insertText": "accent-green-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-green-900",
    "insertText": "caret-green-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-green-950",
    "insertText": "bg-green-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-green-950",
    "insertText": "text-green-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-green-950",
    "insertText": "border-green-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-green-950",
    "insertText": "outline-green-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-green-950",
    "insertText": "ring-green-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-green-950",
    "insertText": "fill-green-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-green-950",
    "insertText": "stroke-green-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-green-950",
    "insertText": "shadow-green-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-green-950",
    "insertText": "decoration-green-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-green-950",
    "insertText": "accent-green-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-green-950",
    "insertText": "caret-green-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-emerald-50",
    "insertText": "bg-emerald-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-emerald-50",
    "insertText": "text-emerald-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-emerald-50",
    "insertText": "border-emerald-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-emerald-50",
    "insertText": "outline-emerald-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-emerald-50",
    "insertText": "ring-emerald-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-emerald-50",
    "insertText": "fill-emerald-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-emerald-50",
    "insertText": "stroke-emerald-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-emerald-50",
    "insertText": "shadow-emerald-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-emerald-50",
    "insertText": "decoration-emerald-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-emerald-50",
    "insertText": "accent-emerald-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-emerald-50",
    "insertText": "caret-emerald-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-emerald-100",
    "insertText": "bg-emerald-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-emerald-100",
    "insertText": "text-emerald-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-emerald-100",
    "insertText": "border-emerald-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-emerald-100",
    "insertText": "outline-emerald-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-emerald-100",
    "insertText": "ring-emerald-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-emerald-100",
    "insertText": "fill-emerald-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-emerald-100",
    "insertText": "stroke-emerald-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-emerald-100",
    "insertText": "shadow-emerald-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-emerald-100",
    "insertText": "decoration-emerald-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-emerald-100",
    "insertText": "accent-emerald-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-emerald-100",
    "insertText": "caret-emerald-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-emerald-200",
    "insertText": "bg-emerald-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-emerald-200",
    "insertText": "text-emerald-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-emerald-200",
    "insertText": "border-emerald-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-emerald-200",
    "insertText": "outline-emerald-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-emerald-200",
    "insertText": "ring-emerald-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-emerald-200",
    "insertText": "fill-emerald-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-emerald-200",
    "insertText": "stroke-emerald-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-emerald-200",
    "insertText": "shadow-emerald-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-emerald-200",
    "insertText": "decoration-emerald-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-emerald-200",
    "insertText": "accent-emerald-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-emerald-200",
    "insertText": "caret-emerald-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-emerald-300",
    "insertText": "bg-emerald-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-emerald-300",
    "insertText": "text-emerald-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-emerald-300",
    "insertText": "border-emerald-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-emerald-300",
    "insertText": "outline-emerald-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-emerald-300",
    "insertText": "ring-emerald-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-emerald-300",
    "insertText": "fill-emerald-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-emerald-300",
    "insertText": "stroke-emerald-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-emerald-300",
    "insertText": "shadow-emerald-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-emerald-300",
    "insertText": "decoration-emerald-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-emerald-300",
    "insertText": "accent-emerald-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-emerald-300",
    "insertText": "caret-emerald-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-emerald-400",
    "insertText": "bg-emerald-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-emerald-400",
    "insertText": "text-emerald-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-emerald-400",
    "insertText": "border-emerald-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-emerald-400",
    "insertText": "outline-emerald-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-emerald-400",
    "insertText": "ring-emerald-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-emerald-400",
    "insertText": "fill-emerald-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-emerald-400",
    "insertText": "stroke-emerald-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-emerald-400",
    "insertText": "shadow-emerald-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-emerald-400",
    "insertText": "decoration-emerald-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-emerald-400",
    "insertText": "accent-emerald-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-emerald-400",
    "insertText": "caret-emerald-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-emerald-500",
    "insertText": "bg-emerald-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-emerald-500",
    "insertText": "text-emerald-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-emerald-500",
    "insertText": "border-emerald-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-emerald-500",
    "insertText": "outline-emerald-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-emerald-500",
    "insertText": "ring-emerald-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-emerald-500",
    "insertText": "fill-emerald-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-emerald-500",
    "insertText": "stroke-emerald-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-emerald-500",
    "insertText": "shadow-emerald-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-emerald-500",
    "insertText": "decoration-emerald-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-emerald-500",
    "insertText": "accent-emerald-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-emerald-500",
    "insertText": "caret-emerald-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-emerald-600",
    "insertText": "bg-emerald-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-emerald-600",
    "insertText": "text-emerald-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-emerald-600",
    "insertText": "border-emerald-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-emerald-600",
    "insertText": "outline-emerald-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-emerald-600",
    "insertText": "ring-emerald-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-emerald-600",
    "insertText": "fill-emerald-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-emerald-600",
    "insertText": "stroke-emerald-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-emerald-600",
    "insertText": "shadow-emerald-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-emerald-600",
    "insertText": "decoration-emerald-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-emerald-600",
    "insertText": "accent-emerald-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-emerald-600",
    "insertText": "caret-emerald-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-emerald-700",
    "insertText": "bg-emerald-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-emerald-700",
    "insertText": "text-emerald-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-emerald-700",
    "insertText": "border-emerald-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-emerald-700",
    "insertText": "outline-emerald-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-emerald-700",
    "insertText": "ring-emerald-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-emerald-700",
    "insertText": "fill-emerald-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-emerald-700",
    "insertText": "stroke-emerald-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-emerald-700",
    "insertText": "shadow-emerald-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-emerald-700",
    "insertText": "decoration-emerald-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-emerald-700",
    "insertText": "accent-emerald-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-emerald-700",
    "insertText": "caret-emerald-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-emerald-800",
    "insertText": "bg-emerald-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-emerald-800",
    "insertText": "text-emerald-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-emerald-800",
    "insertText": "border-emerald-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-emerald-800",
    "insertText": "outline-emerald-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-emerald-800",
    "insertText": "ring-emerald-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-emerald-800",
    "insertText": "fill-emerald-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-emerald-800",
    "insertText": "stroke-emerald-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-emerald-800",
    "insertText": "shadow-emerald-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-emerald-800",
    "insertText": "decoration-emerald-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-emerald-800",
    "insertText": "accent-emerald-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-emerald-800",
    "insertText": "caret-emerald-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-emerald-900",
    "insertText": "bg-emerald-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-emerald-900",
    "insertText": "text-emerald-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-emerald-900",
    "insertText": "border-emerald-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-emerald-900",
    "insertText": "outline-emerald-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-emerald-900",
    "insertText": "ring-emerald-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-emerald-900",
    "insertText": "fill-emerald-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-emerald-900",
    "insertText": "stroke-emerald-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-emerald-900",
    "insertText": "shadow-emerald-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-emerald-900",
    "insertText": "decoration-emerald-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-emerald-900",
    "insertText": "accent-emerald-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-emerald-900",
    "insertText": "caret-emerald-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-emerald-950",
    "insertText": "bg-emerald-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-emerald-950",
    "insertText": "text-emerald-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-emerald-950",
    "insertText": "border-emerald-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-emerald-950",
    "insertText": "outline-emerald-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-emerald-950",
    "insertText": "ring-emerald-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-emerald-950",
    "insertText": "fill-emerald-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-emerald-950",
    "insertText": "stroke-emerald-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-emerald-950",
    "insertText": "shadow-emerald-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-emerald-950",
    "insertText": "decoration-emerald-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-emerald-950",
    "insertText": "accent-emerald-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-emerald-950",
    "insertText": "caret-emerald-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-teal-50",
    "insertText": "bg-teal-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-teal-50",
    "insertText": "text-teal-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-teal-50",
    "insertText": "border-teal-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-teal-50",
    "insertText": "outline-teal-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-teal-50",
    "insertText": "ring-teal-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-teal-50",
    "insertText": "fill-teal-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-teal-50",
    "insertText": "stroke-teal-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-teal-50",
    "insertText": "shadow-teal-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-teal-50",
    "insertText": "decoration-teal-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-teal-50",
    "insertText": "accent-teal-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-teal-50",
    "insertText": "caret-teal-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-teal-100",
    "insertText": "bg-teal-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-teal-100",
    "insertText": "text-teal-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-teal-100",
    "insertText": "border-teal-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-teal-100",
    "insertText": "outline-teal-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-teal-100",
    "insertText": "ring-teal-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-teal-100",
    "insertText": "fill-teal-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-teal-100",
    "insertText": "stroke-teal-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-teal-100",
    "insertText": "shadow-teal-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-teal-100",
    "insertText": "decoration-teal-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-teal-100",
    "insertText": "accent-teal-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-teal-100",
    "insertText": "caret-teal-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-teal-200",
    "insertText": "bg-teal-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-teal-200",
    "insertText": "text-teal-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-teal-200",
    "insertText": "border-teal-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-teal-200",
    "insertText": "outline-teal-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-teal-200",
    "insertText": "ring-teal-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-teal-200",
    "insertText": "fill-teal-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-teal-200",
    "insertText": "stroke-teal-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-teal-200",
    "insertText": "shadow-teal-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-teal-200",
    "insertText": "decoration-teal-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-teal-200",
    "insertText": "accent-teal-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-teal-200",
    "insertText": "caret-teal-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-teal-300",
    "insertText": "bg-teal-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-teal-300",
    "insertText": "text-teal-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-teal-300",
    "insertText": "border-teal-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-teal-300",
    "insertText": "outline-teal-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-teal-300",
    "insertText": "ring-teal-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-teal-300",
    "insertText": "fill-teal-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-teal-300",
    "insertText": "stroke-teal-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-teal-300",
    "insertText": "shadow-teal-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-teal-300",
    "insertText": "decoration-teal-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-teal-300",
    "insertText": "accent-teal-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-teal-300",
    "insertText": "caret-teal-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-teal-400",
    "insertText": "bg-teal-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-teal-400",
    "insertText": "text-teal-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-teal-400",
    "insertText": "border-teal-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-teal-400",
    "insertText": "outline-teal-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-teal-400",
    "insertText": "ring-teal-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-teal-400",
    "insertText": "fill-teal-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-teal-400",
    "insertText": "stroke-teal-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-teal-400",
    "insertText": "shadow-teal-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-teal-400",
    "insertText": "decoration-teal-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-teal-400",
    "insertText": "accent-teal-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-teal-400",
    "insertText": "caret-teal-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-teal-500",
    "insertText": "bg-teal-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-teal-500",
    "insertText": "text-teal-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-teal-500",
    "insertText": "border-teal-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-teal-500",
    "insertText": "outline-teal-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-teal-500",
    "insertText": "ring-teal-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-teal-500",
    "insertText": "fill-teal-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-teal-500",
    "insertText": "stroke-teal-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-teal-500",
    "insertText": "shadow-teal-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-teal-500",
    "insertText": "decoration-teal-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-teal-500",
    "insertText": "accent-teal-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-teal-500",
    "insertText": "caret-teal-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-teal-600",
    "insertText": "bg-teal-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-teal-600",
    "insertText": "text-teal-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-teal-600",
    "insertText": "border-teal-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-teal-600",
    "insertText": "outline-teal-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-teal-600",
    "insertText": "ring-teal-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-teal-600",
    "insertText": "fill-teal-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-teal-600",
    "insertText": "stroke-teal-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-teal-600",
    "insertText": "shadow-teal-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-teal-600",
    "insertText": "decoration-teal-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-teal-600",
    "insertText": "accent-teal-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-teal-600",
    "insertText": "caret-teal-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-teal-700",
    "insertText": "bg-teal-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-teal-700",
    "insertText": "text-teal-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-teal-700",
    "insertText": "border-teal-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-teal-700",
    "insertText": "outline-teal-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-teal-700",
    "insertText": "ring-teal-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-teal-700",
    "insertText": "fill-teal-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-teal-700",
    "insertText": "stroke-teal-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-teal-700",
    "insertText": "shadow-teal-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-teal-700",
    "insertText": "decoration-teal-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-teal-700",
    "insertText": "accent-teal-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-teal-700",
    "insertText": "caret-teal-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-teal-800",
    "insertText": "bg-teal-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-teal-800",
    "insertText": "text-teal-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-teal-800",
    "insertText": "border-teal-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-teal-800",
    "insertText": "outline-teal-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-teal-800",
    "insertText": "ring-teal-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-teal-800",
    "insertText": "fill-teal-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-teal-800",
    "insertText": "stroke-teal-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-teal-800",
    "insertText": "shadow-teal-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-teal-800",
    "insertText": "decoration-teal-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-teal-800",
    "insertText": "accent-teal-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-teal-800",
    "insertText": "caret-teal-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-teal-900",
    "insertText": "bg-teal-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-teal-900",
    "insertText": "text-teal-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-teal-900",
    "insertText": "border-teal-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-teal-900",
    "insertText": "outline-teal-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-teal-900",
    "insertText": "ring-teal-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-teal-900",
    "insertText": "fill-teal-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-teal-900",
    "insertText": "stroke-teal-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-teal-900",
    "insertText": "shadow-teal-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-teal-900",
    "insertText": "decoration-teal-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-teal-900",
    "insertText": "accent-teal-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-teal-900",
    "insertText": "caret-teal-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-teal-950",
    "insertText": "bg-teal-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-teal-950",
    "insertText": "text-teal-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-teal-950",
    "insertText": "border-teal-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-teal-950",
    "insertText": "outline-teal-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-teal-950",
    "insertText": "ring-teal-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-teal-950",
    "insertText": "fill-teal-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-teal-950",
    "insertText": "stroke-teal-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-teal-950",
    "insertText": "shadow-teal-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-teal-950",
    "insertText": "decoration-teal-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-teal-950",
    "insertText": "accent-teal-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-teal-950",
    "insertText": "caret-teal-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-cyan-50",
    "insertText": "bg-cyan-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-cyan-50",
    "insertText": "text-cyan-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-cyan-50",
    "insertText": "border-cyan-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-cyan-50",
    "insertText": "outline-cyan-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-cyan-50",
    "insertText": "ring-cyan-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-cyan-50",
    "insertText": "fill-cyan-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-cyan-50",
    "insertText": "stroke-cyan-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-cyan-50",
    "insertText": "shadow-cyan-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-cyan-50",
    "insertText": "decoration-cyan-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-cyan-50",
    "insertText": "accent-cyan-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-cyan-50",
    "insertText": "caret-cyan-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-cyan-100",
    "insertText": "bg-cyan-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-cyan-100",
    "insertText": "text-cyan-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-cyan-100",
    "insertText": "border-cyan-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-cyan-100",
    "insertText": "outline-cyan-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-cyan-100",
    "insertText": "ring-cyan-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-cyan-100",
    "insertText": "fill-cyan-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-cyan-100",
    "insertText": "stroke-cyan-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-cyan-100",
    "insertText": "shadow-cyan-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-cyan-100",
    "insertText": "decoration-cyan-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-cyan-100",
    "insertText": "accent-cyan-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-cyan-100",
    "insertText": "caret-cyan-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-cyan-200",
    "insertText": "bg-cyan-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-cyan-200",
    "insertText": "text-cyan-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-cyan-200",
    "insertText": "border-cyan-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-cyan-200",
    "insertText": "outline-cyan-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-cyan-200",
    "insertText": "ring-cyan-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-cyan-200",
    "insertText": "fill-cyan-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-cyan-200",
    "insertText": "stroke-cyan-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-cyan-200",
    "insertText": "shadow-cyan-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-cyan-200",
    "insertText": "decoration-cyan-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-cyan-200",
    "insertText": "accent-cyan-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-cyan-200",
    "insertText": "caret-cyan-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-cyan-300",
    "insertText": "bg-cyan-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-cyan-300",
    "insertText": "text-cyan-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-cyan-300",
    "insertText": "border-cyan-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-cyan-300",
    "insertText": "outline-cyan-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-cyan-300",
    "insertText": "ring-cyan-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-cyan-300",
    "insertText": "fill-cyan-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-cyan-300",
    "insertText": "stroke-cyan-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-cyan-300",
    "insertText": "shadow-cyan-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-cyan-300",
    "insertText": "decoration-cyan-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-cyan-300",
    "insertText": "accent-cyan-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-cyan-300",
    "insertText": "caret-cyan-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-cyan-400",
    "insertText": "bg-cyan-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-cyan-400",
    "insertText": "text-cyan-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-cyan-400",
    "insertText": "border-cyan-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-cyan-400",
    "insertText": "outline-cyan-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-cyan-400",
    "insertText": "ring-cyan-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-cyan-400",
    "insertText": "fill-cyan-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-cyan-400",
    "insertText": "stroke-cyan-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-cyan-400",
    "insertText": "shadow-cyan-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-cyan-400",
    "insertText": "decoration-cyan-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-cyan-400",
    "insertText": "accent-cyan-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-cyan-400",
    "insertText": "caret-cyan-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-cyan-500",
    "insertText": "bg-cyan-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-cyan-500",
    "insertText": "text-cyan-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-cyan-500",
    "insertText": "border-cyan-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-cyan-500",
    "insertText": "outline-cyan-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-cyan-500",
    "insertText": "ring-cyan-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-cyan-500",
    "insertText": "fill-cyan-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-cyan-500",
    "insertText": "stroke-cyan-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-cyan-500",
    "insertText": "shadow-cyan-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-cyan-500",
    "insertText": "decoration-cyan-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-cyan-500",
    "insertText": "accent-cyan-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-cyan-500",
    "insertText": "caret-cyan-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-cyan-600",
    "insertText": "bg-cyan-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-cyan-600",
    "insertText": "text-cyan-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-cyan-600",
    "insertText": "border-cyan-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-cyan-600",
    "insertText": "outline-cyan-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-cyan-600",
    "insertText": "ring-cyan-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-cyan-600",
    "insertText": "fill-cyan-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-cyan-600",
    "insertText": "stroke-cyan-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-cyan-600",
    "insertText": "shadow-cyan-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-cyan-600",
    "insertText": "decoration-cyan-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-cyan-600",
    "insertText": "accent-cyan-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-cyan-600",
    "insertText": "caret-cyan-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-cyan-700",
    "insertText": "bg-cyan-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-cyan-700",
    "insertText": "text-cyan-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-cyan-700",
    "insertText": "border-cyan-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-cyan-700",
    "insertText": "outline-cyan-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-cyan-700",
    "insertText": "ring-cyan-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-cyan-700",
    "insertText": "fill-cyan-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-cyan-700",
    "insertText": "stroke-cyan-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-cyan-700",
    "insertText": "shadow-cyan-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-cyan-700",
    "insertText": "decoration-cyan-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-cyan-700",
    "insertText": "accent-cyan-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-cyan-700",
    "insertText": "caret-cyan-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-cyan-800",
    "insertText": "bg-cyan-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-cyan-800",
    "insertText": "text-cyan-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-cyan-800",
    "insertText": "border-cyan-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-cyan-800",
    "insertText": "outline-cyan-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-cyan-800",
    "insertText": "ring-cyan-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-cyan-800",
    "insertText": "fill-cyan-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-cyan-800",
    "insertText": "stroke-cyan-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-cyan-800",
    "insertText": "shadow-cyan-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-cyan-800",
    "insertText": "decoration-cyan-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-cyan-800",
    "insertText": "accent-cyan-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-cyan-800",
    "insertText": "caret-cyan-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-cyan-900",
    "insertText": "bg-cyan-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-cyan-900",
    "insertText": "text-cyan-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-cyan-900",
    "insertText": "border-cyan-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-cyan-900",
    "insertText": "outline-cyan-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-cyan-900",
    "insertText": "ring-cyan-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-cyan-900",
    "insertText": "fill-cyan-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-cyan-900",
    "insertText": "stroke-cyan-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-cyan-900",
    "insertText": "shadow-cyan-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-cyan-900",
    "insertText": "decoration-cyan-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-cyan-900",
    "insertText": "accent-cyan-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-cyan-900",
    "insertText": "caret-cyan-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-cyan-950",
    "insertText": "bg-cyan-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-cyan-950",
    "insertText": "text-cyan-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-cyan-950",
    "insertText": "border-cyan-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-cyan-950",
    "insertText": "outline-cyan-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-cyan-950",
    "insertText": "ring-cyan-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-cyan-950",
    "insertText": "fill-cyan-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-cyan-950",
    "insertText": "stroke-cyan-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-cyan-950",
    "insertText": "shadow-cyan-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-cyan-950",
    "insertText": "decoration-cyan-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-cyan-950",
    "insertText": "accent-cyan-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-cyan-950",
    "insertText": "caret-cyan-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-sky-50",
    "insertText": "bg-sky-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-sky-50",
    "insertText": "text-sky-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-sky-50",
    "insertText": "border-sky-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-sky-50",
    "insertText": "outline-sky-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-sky-50",
    "insertText": "ring-sky-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-sky-50",
    "insertText": "fill-sky-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-sky-50",
    "insertText": "stroke-sky-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-sky-50",
    "insertText": "shadow-sky-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-sky-50",
    "insertText": "decoration-sky-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-sky-50",
    "insertText": "accent-sky-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-sky-50",
    "insertText": "caret-sky-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-sky-100",
    "insertText": "bg-sky-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-sky-100",
    "insertText": "text-sky-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-sky-100",
    "insertText": "border-sky-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-sky-100",
    "insertText": "outline-sky-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-sky-100",
    "insertText": "ring-sky-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-sky-100",
    "insertText": "fill-sky-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-sky-100",
    "insertText": "stroke-sky-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-sky-100",
    "insertText": "shadow-sky-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-sky-100",
    "insertText": "decoration-sky-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-sky-100",
    "insertText": "accent-sky-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-sky-100",
    "insertText": "caret-sky-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-sky-200",
    "insertText": "bg-sky-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-sky-200",
    "insertText": "text-sky-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-sky-200",
    "insertText": "border-sky-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-sky-200",
    "insertText": "outline-sky-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-sky-200",
    "insertText": "ring-sky-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-sky-200",
    "insertText": "fill-sky-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-sky-200",
    "insertText": "stroke-sky-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-sky-200",
    "insertText": "shadow-sky-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-sky-200",
    "insertText": "decoration-sky-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-sky-200",
    "insertText": "accent-sky-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-sky-200",
    "insertText": "caret-sky-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-sky-300",
    "insertText": "bg-sky-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-sky-300",
    "insertText": "text-sky-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-sky-300",
    "insertText": "border-sky-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-sky-300",
    "insertText": "outline-sky-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-sky-300",
    "insertText": "ring-sky-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-sky-300",
    "insertText": "fill-sky-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-sky-300",
    "insertText": "stroke-sky-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-sky-300",
    "insertText": "shadow-sky-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-sky-300",
    "insertText": "decoration-sky-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-sky-300",
    "insertText": "accent-sky-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-sky-300",
    "insertText": "caret-sky-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-sky-400",
    "insertText": "bg-sky-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-sky-400",
    "insertText": "text-sky-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-sky-400",
    "insertText": "border-sky-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-sky-400",
    "insertText": "outline-sky-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-sky-400",
    "insertText": "ring-sky-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-sky-400",
    "insertText": "fill-sky-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-sky-400",
    "insertText": "stroke-sky-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-sky-400",
    "insertText": "shadow-sky-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-sky-400",
    "insertText": "decoration-sky-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-sky-400",
    "insertText": "accent-sky-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-sky-400",
    "insertText": "caret-sky-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-sky-500",
    "insertText": "bg-sky-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-sky-500",
    "insertText": "text-sky-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-sky-500",
    "insertText": "border-sky-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-sky-500",
    "insertText": "outline-sky-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-sky-500",
    "insertText": "ring-sky-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-sky-500",
    "insertText": "fill-sky-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-sky-500",
    "insertText": "stroke-sky-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-sky-500",
    "insertText": "shadow-sky-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-sky-500",
    "insertText": "decoration-sky-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-sky-500",
    "insertText": "accent-sky-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-sky-500",
    "insertText": "caret-sky-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-sky-600",
    "insertText": "bg-sky-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-sky-600",
    "insertText": "text-sky-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-sky-600",
    "insertText": "border-sky-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-sky-600",
    "insertText": "outline-sky-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-sky-600",
    "insertText": "ring-sky-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-sky-600",
    "insertText": "fill-sky-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-sky-600",
    "insertText": "stroke-sky-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-sky-600",
    "insertText": "shadow-sky-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-sky-600",
    "insertText": "decoration-sky-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-sky-600",
    "insertText": "accent-sky-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-sky-600",
    "insertText": "caret-sky-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-sky-700",
    "insertText": "bg-sky-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-sky-700",
    "insertText": "text-sky-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-sky-700",
    "insertText": "border-sky-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-sky-700",
    "insertText": "outline-sky-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-sky-700",
    "insertText": "ring-sky-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-sky-700",
    "insertText": "fill-sky-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-sky-700",
    "insertText": "stroke-sky-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-sky-700",
    "insertText": "shadow-sky-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-sky-700",
    "insertText": "decoration-sky-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-sky-700",
    "insertText": "accent-sky-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-sky-700",
    "insertText": "caret-sky-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-sky-800",
    "insertText": "bg-sky-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-sky-800",
    "insertText": "text-sky-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-sky-800",
    "insertText": "border-sky-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-sky-800",
    "insertText": "outline-sky-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-sky-800",
    "insertText": "ring-sky-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-sky-800",
    "insertText": "fill-sky-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-sky-800",
    "insertText": "stroke-sky-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-sky-800",
    "insertText": "shadow-sky-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-sky-800",
    "insertText": "decoration-sky-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-sky-800",
    "insertText": "accent-sky-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-sky-800",
    "insertText": "caret-sky-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-sky-900",
    "insertText": "bg-sky-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-sky-900",
    "insertText": "text-sky-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-sky-900",
    "insertText": "border-sky-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-sky-900",
    "insertText": "outline-sky-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-sky-900",
    "insertText": "ring-sky-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-sky-900",
    "insertText": "fill-sky-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-sky-900",
    "insertText": "stroke-sky-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-sky-900",
    "insertText": "shadow-sky-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-sky-900",
    "insertText": "decoration-sky-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-sky-900",
    "insertText": "accent-sky-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-sky-900",
    "insertText": "caret-sky-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-sky-950",
    "insertText": "bg-sky-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-sky-950",
    "insertText": "text-sky-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-sky-950",
    "insertText": "border-sky-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-sky-950",
    "insertText": "outline-sky-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-sky-950",
    "insertText": "ring-sky-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-sky-950",
    "insertText": "fill-sky-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-sky-950",
    "insertText": "stroke-sky-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-sky-950",
    "insertText": "shadow-sky-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-sky-950",
    "insertText": "decoration-sky-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-sky-950",
    "insertText": "accent-sky-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-sky-950",
    "insertText": "caret-sky-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-blue-50",
    "insertText": "bg-blue-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-blue-50",
    "insertText": "text-blue-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-blue-50",
    "insertText": "border-blue-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-blue-50",
    "insertText": "outline-blue-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-blue-50",
    "insertText": "ring-blue-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-blue-50",
    "insertText": "fill-blue-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-blue-50",
    "insertText": "stroke-blue-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-blue-50",
    "insertText": "shadow-blue-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-blue-50",
    "insertText": "decoration-blue-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-blue-50",
    "insertText": "accent-blue-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-blue-50",
    "insertText": "caret-blue-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-blue-100",
    "insertText": "bg-blue-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-blue-100",
    "insertText": "text-blue-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-blue-100",
    "insertText": "border-blue-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-blue-100",
    "insertText": "outline-blue-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-blue-100",
    "insertText": "ring-blue-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-blue-100",
    "insertText": "fill-blue-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-blue-100",
    "insertText": "stroke-blue-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-blue-100",
    "insertText": "shadow-blue-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-blue-100",
    "insertText": "decoration-blue-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-blue-100",
    "insertText": "accent-blue-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-blue-100",
    "insertText": "caret-blue-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-blue-200",
    "insertText": "bg-blue-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-blue-200",
    "insertText": "text-blue-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-blue-200",
    "insertText": "border-blue-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-blue-200",
    "insertText": "outline-blue-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-blue-200",
    "insertText": "ring-blue-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-blue-200",
    "insertText": "fill-blue-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-blue-200",
    "insertText": "stroke-blue-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-blue-200",
    "insertText": "shadow-blue-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-blue-200",
    "insertText": "decoration-blue-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-blue-200",
    "insertText": "accent-blue-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-blue-200",
    "insertText": "caret-blue-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-blue-300",
    "insertText": "bg-blue-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-blue-300",
    "insertText": "text-blue-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-blue-300",
    "insertText": "border-blue-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-blue-300",
    "insertText": "outline-blue-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-blue-300",
    "insertText": "ring-blue-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-blue-300",
    "insertText": "fill-blue-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-blue-300",
    "insertText": "stroke-blue-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-blue-300",
    "insertText": "shadow-blue-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-blue-300",
    "insertText": "decoration-blue-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-blue-300",
    "insertText": "accent-blue-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-blue-300",
    "insertText": "caret-blue-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-blue-400",
    "insertText": "bg-blue-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-blue-400",
    "insertText": "text-blue-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-blue-400",
    "insertText": "border-blue-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-blue-400",
    "insertText": "outline-blue-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-blue-400",
    "insertText": "ring-blue-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-blue-400",
    "insertText": "fill-blue-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-blue-400",
    "insertText": "stroke-blue-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-blue-400",
    "insertText": "shadow-blue-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-blue-400",
    "insertText": "decoration-blue-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-blue-400",
    "insertText": "accent-blue-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-blue-400",
    "insertText": "caret-blue-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-blue-500",
    "insertText": "bg-blue-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-blue-500",
    "insertText": "text-blue-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-blue-500",
    "insertText": "border-blue-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-blue-500",
    "insertText": "outline-blue-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-blue-500",
    "insertText": "ring-blue-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-blue-500",
    "insertText": "fill-blue-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-blue-500",
    "insertText": "stroke-blue-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-blue-500",
    "insertText": "shadow-blue-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-blue-500",
    "insertText": "decoration-blue-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-blue-500",
    "insertText": "accent-blue-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-blue-500",
    "insertText": "caret-blue-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-blue-600",
    "insertText": "bg-blue-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-blue-600",
    "insertText": "text-blue-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-blue-600",
    "insertText": "border-blue-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-blue-600",
    "insertText": "outline-blue-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-blue-600",
    "insertText": "ring-blue-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-blue-600",
    "insertText": "fill-blue-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-blue-600",
    "insertText": "stroke-blue-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-blue-600",
    "insertText": "shadow-blue-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-blue-600",
    "insertText": "decoration-blue-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-blue-600",
    "insertText": "accent-blue-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-blue-600",
    "insertText": "caret-blue-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-blue-700",
    "insertText": "bg-blue-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-blue-700",
    "insertText": "text-blue-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-blue-700",
    "insertText": "border-blue-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-blue-700",
    "insertText": "outline-blue-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-blue-700",
    "insertText": "ring-blue-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-blue-700",
    "insertText": "fill-blue-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-blue-700",
    "insertText": "stroke-blue-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-blue-700",
    "insertText": "shadow-blue-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-blue-700",
    "insertText": "decoration-blue-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-blue-700",
    "insertText": "accent-blue-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-blue-700",
    "insertText": "caret-blue-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-blue-800",
    "insertText": "bg-blue-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-blue-800",
    "insertText": "text-blue-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-blue-800",
    "insertText": "border-blue-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-blue-800",
    "insertText": "outline-blue-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-blue-800",
    "insertText": "ring-blue-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-blue-800",
    "insertText": "fill-blue-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-blue-800",
    "insertText": "stroke-blue-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-blue-800",
    "insertText": "shadow-blue-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-blue-800",
    "insertText": "decoration-blue-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-blue-800",
    "insertText": "accent-blue-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-blue-800",
    "insertText": "caret-blue-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-blue-900",
    "insertText": "bg-blue-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-blue-900",
    "insertText": "text-blue-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-blue-900",
    "insertText": "border-blue-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-blue-900",
    "insertText": "outline-blue-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-blue-900",
    "insertText": "ring-blue-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-blue-900",
    "insertText": "fill-blue-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-blue-900",
    "insertText": "stroke-blue-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-blue-900",
    "insertText": "shadow-blue-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-blue-900",
    "insertText": "decoration-blue-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-blue-900",
    "insertText": "accent-blue-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-blue-900",
    "insertText": "caret-blue-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-blue-950",
    "insertText": "bg-blue-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-blue-950",
    "insertText": "text-blue-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-blue-950",
    "insertText": "border-blue-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-blue-950",
    "insertText": "outline-blue-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-blue-950",
    "insertText": "ring-blue-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-blue-950",
    "insertText": "fill-blue-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-blue-950",
    "insertText": "stroke-blue-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-blue-950",
    "insertText": "shadow-blue-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-blue-950",
    "insertText": "decoration-blue-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-blue-950",
    "insertText": "accent-blue-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-blue-950",
    "insertText": "caret-blue-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-indigo-50",
    "insertText": "bg-indigo-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-indigo-50",
    "insertText": "text-indigo-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-indigo-50",
    "insertText": "border-indigo-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-indigo-50",
    "insertText": "outline-indigo-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-indigo-50",
    "insertText": "ring-indigo-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-indigo-50",
    "insertText": "fill-indigo-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-indigo-50",
    "insertText": "stroke-indigo-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-indigo-50",
    "insertText": "shadow-indigo-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-indigo-50",
    "insertText": "decoration-indigo-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-indigo-50",
    "insertText": "accent-indigo-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-indigo-50",
    "insertText": "caret-indigo-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-indigo-100",
    "insertText": "bg-indigo-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-indigo-100",
    "insertText": "text-indigo-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-indigo-100",
    "insertText": "border-indigo-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-indigo-100",
    "insertText": "outline-indigo-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-indigo-100",
    "insertText": "ring-indigo-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-indigo-100",
    "insertText": "fill-indigo-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-indigo-100",
    "insertText": "stroke-indigo-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-indigo-100",
    "insertText": "shadow-indigo-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-indigo-100",
    "insertText": "decoration-indigo-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-indigo-100",
    "insertText": "accent-indigo-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-indigo-100",
    "insertText": "caret-indigo-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-indigo-200",
    "insertText": "bg-indigo-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-indigo-200",
    "insertText": "text-indigo-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-indigo-200",
    "insertText": "border-indigo-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-indigo-200",
    "insertText": "outline-indigo-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-indigo-200",
    "insertText": "ring-indigo-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-indigo-200",
    "insertText": "fill-indigo-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-indigo-200",
    "insertText": "stroke-indigo-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-indigo-200",
    "insertText": "shadow-indigo-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-indigo-200",
    "insertText": "decoration-indigo-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-indigo-200",
    "insertText": "accent-indigo-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-indigo-200",
    "insertText": "caret-indigo-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-indigo-300",
    "insertText": "bg-indigo-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-indigo-300",
    "insertText": "text-indigo-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-indigo-300",
    "insertText": "border-indigo-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-indigo-300",
    "insertText": "outline-indigo-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-indigo-300",
    "insertText": "ring-indigo-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-indigo-300",
    "insertText": "fill-indigo-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-indigo-300",
    "insertText": "stroke-indigo-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-indigo-300",
    "insertText": "shadow-indigo-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-indigo-300",
    "insertText": "decoration-indigo-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-indigo-300",
    "insertText": "accent-indigo-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-indigo-300",
    "insertText": "caret-indigo-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-indigo-400",
    "insertText": "bg-indigo-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-indigo-400",
    "insertText": "text-indigo-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-indigo-400",
    "insertText": "border-indigo-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-indigo-400",
    "insertText": "outline-indigo-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-indigo-400",
    "insertText": "ring-indigo-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-indigo-400",
    "insertText": "fill-indigo-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-indigo-400",
    "insertText": "stroke-indigo-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-indigo-400",
    "insertText": "shadow-indigo-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-indigo-400",
    "insertText": "decoration-indigo-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-indigo-400",
    "insertText": "accent-indigo-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-indigo-400",
    "insertText": "caret-indigo-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-indigo-500",
    "insertText": "bg-indigo-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-indigo-500",
    "insertText": "text-indigo-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-indigo-500",
    "insertText": "border-indigo-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-indigo-500",
    "insertText": "outline-indigo-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-indigo-500",
    "insertText": "ring-indigo-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-indigo-500",
    "insertText": "fill-indigo-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-indigo-500",
    "insertText": "stroke-indigo-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-indigo-500",
    "insertText": "shadow-indigo-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-indigo-500",
    "insertText": "decoration-indigo-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-indigo-500",
    "insertText": "accent-indigo-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-indigo-500",
    "insertText": "caret-indigo-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-indigo-600",
    "insertText": "bg-indigo-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-indigo-600",
    "insertText": "text-indigo-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-indigo-600",
    "insertText": "border-indigo-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-indigo-600",
    "insertText": "outline-indigo-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-indigo-600",
    "insertText": "ring-indigo-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-indigo-600",
    "insertText": "fill-indigo-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-indigo-600",
    "insertText": "stroke-indigo-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-indigo-600",
    "insertText": "shadow-indigo-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-indigo-600",
    "insertText": "decoration-indigo-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-indigo-600",
    "insertText": "accent-indigo-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-indigo-600",
    "insertText": "caret-indigo-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-indigo-700",
    "insertText": "bg-indigo-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-indigo-700",
    "insertText": "text-indigo-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-indigo-700",
    "insertText": "border-indigo-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-indigo-700",
    "insertText": "outline-indigo-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-indigo-700",
    "insertText": "ring-indigo-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-indigo-700",
    "insertText": "fill-indigo-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-indigo-700",
    "insertText": "stroke-indigo-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-indigo-700",
    "insertText": "shadow-indigo-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-indigo-700",
    "insertText": "decoration-indigo-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-indigo-700",
    "insertText": "accent-indigo-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-indigo-700",
    "insertText": "caret-indigo-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-indigo-800",
    "insertText": "bg-indigo-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-indigo-800",
    "insertText": "text-indigo-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-indigo-800",
    "insertText": "border-indigo-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-indigo-800",
    "insertText": "outline-indigo-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-indigo-800",
    "insertText": "ring-indigo-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-indigo-800",
    "insertText": "fill-indigo-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-indigo-800",
    "insertText": "stroke-indigo-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-indigo-800",
    "insertText": "shadow-indigo-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-indigo-800",
    "insertText": "decoration-indigo-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-indigo-800",
    "insertText": "accent-indigo-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-indigo-800",
    "insertText": "caret-indigo-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-indigo-900",
    "insertText": "bg-indigo-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-indigo-900",
    "insertText": "text-indigo-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-indigo-900",
    "insertText": "border-indigo-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-indigo-900",
    "insertText": "outline-indigo-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-indigo-900",
    "insertText": "ring-indigo-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-indigo-900",
    "insertText": "fill-indigo-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-indigo-900",
    "insertText": "stroke-indigo-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-indigo-900",
    "insertText": "shadow-indigo-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-indigo-900",
    "insertText": "decoration-indigo-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-indigo-900",
    "insertText": "accent-indigo-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-indigo-900",
    "insertText": "caret-indigo-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-indigo-950",
    "insertText": "bg-indigo-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-indigo-950",
    "insertText": "text-indigo-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-indigo-950",
    "insertText": "border-indigo-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-indigo-950",
    "insertText": "outline-indigo-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-indigo-950",
    "insertText": "ring-indigo-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-indigo-950",
    "insertText": "fill-indigo-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-indigo-950",
    "insertText": "stroke-indigo-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-indigo-950",
    "insertText": "shadow-indigo-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-indigo-950",
    "insertText": "decoration-indigo-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-indigo-950",
    "insertText": "accent-indigo-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-indigo-950",
    "insertText": "caret-indigo-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-violet-50",
    "insertText": "bg-violet-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-violet-50",
    "insertText": "text-violet-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-violet-50",
    "insertText": "border-violet-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-violet-50",
    "insertText": "outline-violet-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-violet-50",
    "insertText": "ring-violet-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-violet-50",
    "insertText": "fill-violet-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-violet-50",
    "insertText": "stroke-violet-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-violet-50",
    "insertText": "shadow-violet-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-violet-50",
    "insertText": "decoration-violet-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-violet-50",
    "insertText": "accent-violet-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-violet-50",
    "insertText": "caret-violet-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-violet-100",
    "insertText": "bg-violet-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-violet-100",
    "insertText": "text-violet-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-violet-100",
    "insertText": "border-violet-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-violet-100",
    "insertText": "outline-violet-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-violet-100",
    "insertText": "ring-violet-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-violet-100",
    "insertText": "fill-violet-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-violet-100",
    "insertText": "stroke-violet-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-violet-100",
    "insertText": "shadow-violet-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-violet-100",
    "insertText": "decoration-violet-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-violet-100",
    "insertText": "accent-violet-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-violet-100",
    "insertText": "caret-violet-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-violet-200",
    "insertText": "bg-violet-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-violet-200",
    "insertText": "text-violet-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-violet-200",
    "insertText": "border-violet-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-violet-200",
    "insertText": "outline-violet-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-violet-200",
    "insertText": "ring-violet-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-violet-200",
    "insertText": "fill-violet-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-violet-200",
    "insertText": "stroke-violet-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-violet-200",
    "insertText": "shadow-violet-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-violet-200",
    "insertText": "decoration-violet-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-violet-200",
    "insertText": "accent-violet-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-violet-200",
    "insertText": "caret-violet-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-violet-300",
    "insertText": "bg-violet-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-violet-300",
    "insertText": "text-violet-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-violet-300",
    "insertText": "border-violet-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-violet-300",
    "insertText": "outline-violet-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-violet-300",
    "insertText": "ring-violet-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-violet-300",
    "insertText": "fill-violet-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-violet-300",
    "insertText": "stroke-violet-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-violet-300",
    "insertText": "shadow-violet-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-violet-300",
    "insertText": "decoration-violet-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-violet-300",
    "insertText": "accent-violet-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-violet-300",
    "insertText": "caret-violet-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-violet-400",
    "insertText": "bg-violet-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-violet-400",
    "insertText": "text-violet-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-violet-400",
    "insertText": "border-violet-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-violet-400",
    "insertText": "outline-violet-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-violet-400",
    "insertText": "ring-violet-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-violet-400",
    "insertText": "fill-violet-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-violet-400",
    "insertText": "stroke-violet-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-violet-400",
    "insertText": "shadow-violet-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-violet-400",
    "insertText": "decoration-violet-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-violet-400",
    "insertText": "accent-violet-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-violet-400",
    "insertText": "caret-violet-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-violet-500",
    "insertText": "bg-violet-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-violet-500",
    "insertText": "text-violet-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-violet-500",
    "insertText": "border-violet-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-violet-500",
    "insertText": "outline-violet-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-violet-500",
    "insertText": "ring-violet-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-violet-500",
    "insertText": "fill-violet-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-violet-500",
    "insertText": "stroke-violet-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-violet-500",
    "insertText": "shadow-violet-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-violet-500",
    "insertText": "decoration-violet-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-violet-500",
    "insertText": "accent-violet-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-violet-500",
    "insertText": "caret-violet-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-violet-600",
    "insertText": "bg-violet-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-violet-600",
    "insertText": "text-violet-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-violet-600",
    "insertText": "border-violet-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-violet-600",
    "insertText": "outline-violet-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-violet-600",
    "insertText": "ring-violet-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-violet-600",
    "insertText": "fill-violet-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-violet-600",
    "insertText": "stroke-violet-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-violet-600",
    "insertText": "shadow-violet-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-violet-600",
    "insertText": "decoration-violet-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-violet-600",
    "insertText": "accent-violet-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-violet-600",
    "insertText": "caret-violet-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-violet-700",
    "insertText": "bg-violet-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-violet-700",
    "insertText": "text-violet-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-violet-700",
    "insertText": "border-violet-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-violet-700",
    "insertText": "outline-violet-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-violet-700",
    "insertText": "ring-violet-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-violet-700",
    "insertText": "fill-violet-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-violet-700",
    "insertText": "stroke-violet-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-violet-700",
    "insertText": "shadow-violet-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-violet-700",
    "insertText": "decoration-violet-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-violet-700",
    "insertText": "accent-violet-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-violet-700",
    "insertText": "caret-violet-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-violet-800",
    "insertText": "bg-violet-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-violet-800",
    "insertText": "text-violet-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-violet-800",
    "insertText": "border-violet-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-violet-800",
    "insertText": "outline-violet-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-violet-800",
    "insertText": "ring-violet-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-violet-800",
    "insertText": "fill-violet-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-violet-800",
    "insertText": "stroke-violet-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-violet-800",
    "insertText": "shadow-violet-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-violet-800",
    "insertText": "decoration-violet-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-violet-800",
    "insertText": "accent-violet-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-violet-800",
    "insertText": "caret-violet-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-violet-900",
    "insertText": "bg-violet-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-violet-900",
    "insertText": "text-violet-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-violet-900",
    "insertText": "border-violet-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-violet-900",
    "insertText": "outline-violet-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-violet-900",
    "insertText": "ring-violet-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-violet-900",
    "insertText": "fill-violet-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-violet-900",
    "insertText": "stroke-violet-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-violet-900",
    "insertText": "shadow-violet-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-violet-900",
    "insertText": "decoration-violet-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-violet-900",
    "insertText": "accent-violet-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-violet-900",
    "insertText": "caret-violet-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-violet-950",
    "insertText": "bg-violet-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-violet-950",
    "insertText": "text-violet-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-violet-950",
    "insertText": "border-violet-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-violet-950",
    "insertText": "outline-violet-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-violet-950",
    "insertText": "ring-violet-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-violet-950",
    "insertText": "fill-violet-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-violet-950",
    "insertText": "stroke-violet-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-violet-950",
    "insertText": "shadow-violet-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-violet-950",
    "insertText": "decoration-violet-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-violet-950",
    "insertText": "accent-violet-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-violet-950",
    "insertText": "caret-violet-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-purple-50",
    "insertText": "bg-purple-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-purple-50",
    "insertText": "text-purple-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-purple-50",
    "insertText": "border-purple-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-purple-50",
    "insertText": "outline-purple-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-purple-50",
    "insertText": "ring-purple-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-purple-50",
    "insertText": "fill-purple-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-purple-50",
    "insertText": "stroke-purple-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-purple-50",
    "insertText": "shadow-purple-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-purple-50",
    "insertText": "decoration-purple-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-purple-50",
    "insertText": "accent-purple-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-purple-50",
    "insertText": "caret-purple-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-purple-100",
    "insertText": "bg-purple-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-purple-100",
    "insertText": "text-purple-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-purple-100",
    "insertText": "border-purple-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-purple-100",
    "insertText": "outline-purple-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-purple-100",
    "insertText": "ring-purple-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-purple-100",
    "insertText": "fill-purple-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-purple-100",
    "insertText": "stroke-purple-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-purple-100",
    "insertText": "shadow-purple-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-purple-100",
    "insertText": "decoration-purple-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-purple-100",
    "insertText": "accent-purple-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-purple-100",
    "insertText": "caret-purple-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-purple-200",
    "insertText": "bg-purple-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-purple-200",
    "insertText": "text-purple-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-purple-200",
    "insertText": "border-purple-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-purple-200",
    "insertText": "outline-purple-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-purple-200",
    "insertText": "ring-purple-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-purple-200",
    "insertText": "fill-purple-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-purple-200",
    "insertText": "stroke-purple-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-purple-200",
    "insertText": "shadow-purple-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-purple-200",
    "insertText": "decoration-purple-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-purple-200",
    "insertText": "accent-purple-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-purple-200",
    "insertText": "caret-purple-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-purple-300",
    "insertText": "bg-purple-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-purple-300",
    "insertText": "text-purple-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-purple-300",
    "insertText": "border-purple-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-purple-300",
    "insertText": "outline-purple-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-purple-300",
    "insertText": "ring-purple-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-purple-300",
    "insertText": "fill-purple-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-purple-300",
    "insertText": "stroke-purple-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-purple-300",
    "insertText": "shadow-purple-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-purple-300",
    "insertText": "decoration-purple-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-purple-300",
    "insertText": "accent-purple-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-purple-300",
    "insertText": "caret-purple-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-purple-400",
    "insertText": "bg-purple-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-purple-400",
    "insertText": "text-purple-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-purple-400",
    "insertText": "border-purple-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-purple-400",
    "insertText": "outline-purple-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-purple-400",
    "insertText": "ring-purple-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-purple-400",
    "insertText": "fill-purple-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-purple-400",
    "insertText": "stroke-purple-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-purple-400",
    "insertText": "shadow-purple-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-purple-400",
    "insertText": "decoration-purple-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-purple-400",
    "insertText": "accent-purple-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-purple-400",
    "insertText": "caret-purple-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-purple-500",
    "insertText": "bg-purple-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-purple-500",
    "insertText": "text-purple-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-purple-500",
    "insertText": "border-purple-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-purple-500",
    "insertText": "outline-purple-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-purple-500",
    "insertText": "ring-purple-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-purple-500",
    "insertText": "fill-purple-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-purple-500",
    "insertText": "stroke-purple-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-purple-500",
    "insertText": "shadow-purple-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-purple-500",
    "insertText": "decoration-purple-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-purple-500",
    "insertText": "accent-purple-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-purple-500",
    "insertText": "caret-purple-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-purple-600",
    "insertText": "bg-purple-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-purple-600",
    "insertText": "text-purple-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-purple-600",
    "insertText": "border-purple-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-purple-600",
    "insertText": "outline-purple-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-purple-600",
    "insertText": "ring-purple-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-purple-600",
    "insertText": "fill-purple-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-purple-600",
    "insertText": "stroke-purple-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-purple-600",
    "insertText": "shadow-purple-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-purple-600",
    "insertText": "decoration-purple-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-purple-600",
    "insertText": "accent-purple-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-purple-600",
    "insertText": "caret-purple-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-purple-700",
    "insertText": "bg-purple-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-purple-700",
    "insertText": "text-purple-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-purple-700",
    "insertText": "border-purple-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-purple-700",
    "insertText": "outline-purple-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-purple-700",
    "insertText": "ring-purple-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-purple-700",
    "insertText": "fill-purple-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-purple-700",
    "insertText": "stroke-purple-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-purple-700",
    "insertText": "shadow-purple-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-purple-700",
    "insertText": "decoration-purple-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-purple-700",
    "insertText": "accent-purple-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-purple-700",
    "insertText": "caret-purple-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-purple-800",
    "insertText": "bg-purple-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-purple-800",
    "insertText": "text-purple-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-purple-800",
    "insertText": "border-purple-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-purple-800",
    "insertText": "outline-purple-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-purple-800",
    "insertText": "ring-purple-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-purple-800",
    "insertText": "fill-purple-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-purple-800",
    "insertText": "stroke-purple-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-purple-800",
    "insertText": "shadow-purple-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-purple-800",
    "insertText": "decoration-purple-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-purple-800",
    "insertText": "accent-purple-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-purple-800",
    "insertText": "caret-purple-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-purple-900",
    "insertText": "bg-purple-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-purple-900",
    "insertText": "text-purple-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-purple-900",
    "insertText": "border-purple-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-purple-900",
    "insertText": "outline-purple-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-purple-900",
    "insertText": "ring-purple-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-purple-900",
    "insertText": "fill-purple-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-purple-900",
    "insertText": "stroke-purple-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-purple-900",
    "insertText": "shadow-purple-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-purple-900",
    "insertText": "decoration-purple-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-purple-900",
    "insertText": "accent-purple-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-purple-900",
    "insertText": "caret-purple-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-purple-950",
    "insertText": "bg-purple-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-purple-950",
    "insertText": "text-purple-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-purple-950",
    "insertText": "border-purple-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-purple-950",
    "insertText": "outline-purple-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-purple-950",
    "insertText": "ring-purple-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-purple-950",
    "insertText": "fill-purple-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-purple-950",
    "insertText": "stroke-purple-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-purple-950",
    "insertText": "shadow-purple-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-purple-950",
    "insertText": "decoration-purple-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-purple-950",
    "insertText": "accent-purple-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-purple-950",
    "insertText": "caret-purple-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-fuchsia-50",
    "insertText": "bg-fuchsia-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-fuchsia-50",
    "insertText": "text-fuchsia-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-fuchsia-50",
    "insertText": "border-fuchsia-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-fuchsia-50",
    "insertText": "outline-fuchsia-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-fuchsia-50",
    "insertText": "ring-fuchsia-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-fuchsia-50",
    "insertText": "fill-fuchsia-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-fuchsia-50",
    "insertText": "stroke-fuchsia-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-fuchsia-50",
    "insertText": "shadow-fuchsia-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-fuchsia-50",
    "insertText": "decoration-fuchsia-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-fuchsia-50",
    "insertText": "accent-fuchsia-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-fuchsia-50",
    "insertText": "caret-fuchsia-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-fuchsia-100",
    "insertText": "bg-fuchsia-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-fuchsia-100",
    "insertText": "text-fuchsia-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-fuchsia-100",
    "insertText": "border-fuchsia-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-fuchsia-100",
    "insertText": "outline-fuchsia-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-fuchsia-100",
    "insertText": "ring-fuchsia-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-fuchsia-100",
    "insertText": "fill-fuchsia-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-fuchsia-100",
    "insertText": "stroke-fuchsia-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-fuchsia-100",
    "insertText": "shadow-fuchsia-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-fuchsia-100",
    "insertText": "decoration-fuchsia-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-fuchsia-100",
    "insertText": "accent-fuchsia-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-fuchsia-100",
    "insertText": "caret-fuchsia-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-fuchsia-200",
    "insertText": "bg-fuchsia-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-fuchsia-200",
    "insertText": "text-fuchsia-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-fuchsia-200",
    "insertText": "border-fuchsia-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-fuchsia-200",
    "insertText": "outline-fuchsia-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-fuchsia-200",
    "insertText": "ring-fuchsia-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-fuchsia-200",
    "insertText": "fill-fuchsia-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-fuchsia-200",
    "insertText": "stroke-fuchsia-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-fuchsia-200",
    "insertText": "shadow-fuchsia-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-fuchsia-200",
    "insertText": "decoration-fuchsia-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-fuchsia-200",
    "insertText": "accent-fuchsia-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-fuchsia-200",
    "insertText": "caret-fuchsia-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-fuchsia-300",
    "insertText": "bg-fuchsia-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-fuchsia-300",
    "insertText": "text-fuchsia-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-fuchsia-300",
    "insertText": "border-fuchsia-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-fuchsia-300",
    "insertText": "outline-fuchsia-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-fuchsia-300",
    "insertText": "ring-fuchsia-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-fuchsia-300",
    "insertText": "fill-fuchsia-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-fuchsia-300",
    "insertText": "stroke-fuchsia-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-fuchsia-300",
    "insertText": "shadow-fuchsia-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-fuchsia-300",
    "insertText": "decoration-fuchsia-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-fuchsia-300",
    "insertText": "accent-fuchsia-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-fuchsia-300",
    "insertText": "caret-fuchsia-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-fuchsia-400",
    "insertText": "bg-fuchsia-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-fuchsia-400",
    "insertText": "text-fuchsia-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-fuchsia-400",
    "insertText": "border-fuchsia-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-fuchsia-400",
    "insertText": "outline-fuchsia-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-fuchsia-400",
    "insertText": "ring-fuchsia-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-fuchsia-400",
    "insertText": "fill-fuchsia-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-fuchsia-400",
    "insertText": "stroke-fuchsia-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-fuchsia-400",
    "insertText": "shadow-fuchsia-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-fuchsia-400",
    "insertText": "decoration-fuchsia-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-fuchsia-400",
    "insertText": "accent-fuchsia-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-fuchsia-400",
    "insertText": "caret-fuchsia-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-fuchsia-500",
    "insertText": "bg-fuchsia-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-fuchsia-500",
    "insertText": "text-fuchsia-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-fuchsia-500",
    "insertText": "border-fuchsia-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-fuchsia-500",
    "insertText": "outline-fuchsia-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-fuchsia-500",
    "insertText": "ring-fuchsia-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-fuchsia-500",
    "insertText": "fill-fuchsia-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-fuchsia-500",
    "insertText": "stroke-fuchsia-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-fuchsia-500",
    "insertText": "shadow-fuchsia-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-fuchsia-500",
    "insertText": "decoration-fuchsia-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-fuchsia-500",
    "insertText": "accent-fuchsia-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-fuchsia-500",
    "insertText": "caret-fuchsia-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-fuchsia-600",
    "insertText": "bg-fuchsia-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-fuchsia-600",
    "insertText": "text-fuchsia-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-fuchsia-600",
    "insertText": "border-fuchsia-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-fuchsia-600",
    "insertText": "outline-fuchsia-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-fuchsia-600",
    "insertText": "ring-fuchsia-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-fuchsia-600",
    "insertText": "fill-fuchsia-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-fuchsia-600",
    "insertText": "stroke-fuchsia-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-fuchsia-600",
    "insertText": "shadow-fuchsia-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-fuchsia-600",
    "insertText": "decoration-fuchsia-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-fuchsia-600",
    "insertText": "accent-fuchsia-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-fuchsia-600",
    "insertText": "caret-fuchsia-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-fuchsia-700",
    "insertText": "bg-fuchsia-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-fuchsia-700",
    "insertText": "text-fuchsia-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-fuchsia-700",
    "insertText": "border-fuchsia-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-fuchsia-700",
    "insertText": "outline-fuchsia-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-fuchsia-700",
    "insertText": "ring-fuchsia-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-fuchsia-700",
    "insertText": "fill-fuchsia-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-fuchsia-700",
    "insertText": "stroke-fuchsia-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-fuchsia-700",
    "insertText": "shadow-fuchsia-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-fuchsia-700",
    "insertText": "decoration-fuchsia-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-fuchsia-700",
    "insertText": "accent-fuchsia-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-fuchsia-700",
    "insertText": "caret-fuchsia-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-fuchsia-800",
    "insertText": "bg-fuchsia-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-fuchsia-800",
    "insertText": "text-fuchsia-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-fuchsia-800",
    "insertText": "border-fuchsia-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-fuchsia-800",
    "insertText": "outline-fuchsia-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-fuchsia-800",
    "insertText": "ring-fuchsia-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-fuchsia-800",
    "insertText": "fill-fuchsia-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-fuchsia-800",
    "insertText": "stroke-fuchsia-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-fuchsia-800",
    "insertText": "shadow-fuchsia-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-fuchsia-800",
    "insertText": "decoration-fuchsia-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-fuchsia-800",
    "insertText": "accent-fuchsia-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-fuchsia-800",
    "insertText": "caret-fuchsia-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-fuchsia-900",
    "insertText": "bg-fuchsia-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-fuchsia-900",
    "insertText": "text-fuchsia-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-fuchsia-900",
    "insertText": "border-fuchsia-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-fuchsia-900",
    "insertText": "outline-fuchsia-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-fuchsia-900",
    "insertText": "ring-fuchsia-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-fuchsia-900",
    "insertText": "fill-fuchsia-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-fuchsia-900",
    "insertText": "stroke-fuchsia-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-fuchsia-900",
    "insertText": "shadow-fuchsia-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-fuchsia-900",
    "insertText": "decoration-fuchsia-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-fuchsia-900",
    "insertText": "accent-fuchsia-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-fuchsia-900",
    "insertText": "caret-fuchsia-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-fuchsia-950",
    "insertText": "bg-fuchsia-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-fuchsia-950",
    "insertText": "text-fuchsia-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-fuchsia-950",
    "insertText": "border-fuchsia-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-fuchsia-950",
    "insertText": "outline-fuchsia-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-fuchsia-950",
    "insertText": "ring-fuchsia-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-fuchsia-950",
    "insertText": "fill-fuchsia-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-fuchsia-950",
    "insertText": "stroke-fuchsia-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-fuchsia-950",
    "insertText": "shadow-fuchsia-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-fuchsia-950",
    "insertText": "decoration-fuchsia-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-fuchsia-950",
    "insertText": "accent-fuchsia-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-fuchsia-950",
    "insertText": "caret-fuchsia-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-pink-50",
    "insertText": "bg-pink-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-pink-50",
    "insertText": "text-pink-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-pink-50",
    "insertText": "border-pink-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-pink-50",
    "insertText": "outline-pink-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-pink-50",
    "insertText": "ring-pink-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-pink-50",
    "insertText": "fill-pink-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-pink-50",
    "insertText": "stroke-pink-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-pink-50",
    "insertText": "shadow-pink-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-pink-50",
    "insertText": "decoration-pink-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-pink-50",
    "insertText": "accent-pink-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-pink-50",
    "insertText": "caret-pink-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-pink-100",
    "insertText": "bg-pink-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-pink-100",
    "insertText": "text-pink-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-pink-100",
    "insertText": "border-pink-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-pink-100",
    "insertText": "outline-pink-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-pink-100",
    "insertText": "ring-pink-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-pink-100",
    "insertText": "fill-pink-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-pink-100",
    "insertText": "stroke-pink-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-pink-100",
    "insertText": "shadow-pink-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-pink-100",
    "insertText": "decoration-pink-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-pink-100",
    "insertText": "accent-pink-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-pink-100",
    "insertText": "caret-pink-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-pink-200",
    "insertText": "bg-pink-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-pink-200",
    "insertText": "text-pink-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-pink-200",
    "insertText": "border-pink-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-pink-200",
    "insertText": "outline-pink-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-pink-200",
    "insertText": "ring-pink-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-pink-200",
    "insertText": "fill-pink-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-pink-200",
    "insertText": "stroke-pink-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-pink-200",
    "insertText": "shadow-pink-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-pink-200",
    "insertText": "decoration-pink-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-pink-200",
    "insertText": "accent-pink-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-pink-200",
    "insertText": "caret-pink-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-pink-300",
    "insertText": "bg-pink-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-pink-300",
    "insertText": "text-pink-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-pink-300",
    "insertText": "border-pink-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-pink-300",
    "insertText": "outline-pink-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-pink-300",
    "insertText": "ring-pink-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-pink-300",
    "insertText": "fill-pink-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-pink-300",
    "insertText": "stroke-pink-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-pink-300",
    "insertText": "shadow-pink-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-pink-300",
    "insertText": "decoration-pink-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-pink-300",
    "insertText": "accent-pink-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-pink-300",
    "insertText": "caret-pink-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-pink-400",
    "insertText": "bg-pink-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-pink-400",
    "insertText": "text-pink-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-pink-400",
    "insertText": "border-pink-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-pink-400",
    "insertText": "outline-pink-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-pink-400",
    "insertText": "ring-pink-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-pink-400",
    "insertText": "fill-pink-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-pink-400",
    "insertText": "stroke-pink-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-pink-400",
    "insertText": "shadow-pink-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-pink-400",
    "insertText": "decoration-pink-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-pink-400",
    "insertText": "accent-pink-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-pink-400",
    "insertText": "caret-pink-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-pink-500",
    "insertText": "bg-pink-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-pink-500",
    "insertText": "text-pink-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-pink-500",
    "insertText": "border-pink-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-pink-500",
    "insertText": "outline-pink-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-pink-500",
    "insertText": "ring-pink-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-pink-500",
    "insertText": "fill-pink-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-pink-500",
    "insertText": "stroke-pink-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-pink-500",
    "insertText": "shadow-pink-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-pink-500",
    "insertText": "decoration-pink-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-pink-500",
    "insertText": "accent-pink-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-pink-500",
    "insertText": "caret-pink-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-pink-600",
    "insertText": "bg-pink-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-pink-600",
    "insertText": "text-pink-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-pink-600",
    "insertText": "border-pink-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-pink-600",
    "insertText": "outline-pink-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-pink-600",
    "insertText": "ring-pink-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-pink-600",
    "insertText": "fill-pink-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-pink-600",
    "insertText": "stroke-pink-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-pink-600",
    "insertText": "shadow-pink-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-pink-600",
    "insertText": "decoration-pink-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-pink-600",
    "insertText": "accent-pink-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-pink-600",
    "insertText": "caret-pink-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-pink-700",
    "insertText": "bg-pink-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-pink-700",
    "insertText": "text-pink-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-pink-700",
    "insertText": "border-pink-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-pink-700",
    "insertText": "outline-pink-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-pink-700",
    "insertText": "ring-pink-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-pink-700",
    "insertText": "fill-pink-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-pink-700",
    "insertText": "stroke-pink-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-pink-700",
    "insertText": "shadow-pink-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-pink-700",
    "insertText": "decoration-pink-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-pink-700",
    "insertText": "accent-pink-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-pink-700",
    "insertText": "caret-pink-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-pink-800",
    "insertText": "bg-pink-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-pink-800",
    "insertText": "text-pink-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-pink-800",
    "insertText": "border-pink-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-pink-800",
    "insertText": "outline-pink-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-pink-800",
    "insertText": "ring-pink-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-pink-800",
    "insertText": "fill-pink-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-pink-800",
    "insertText": "stroke-pink-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-pink-800",
    "insertText": "shadow-pink-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-pink-800",
    "insertText": "decoration-pink-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-pink-800",
    "insertText": "accent-pink-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-pink-800",
    "insertText": "caret-pink-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-pink-900",
    "insertText": "bg-pink-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-pink-900",
    "insertText": "text-pink-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-pink-900",
    "insertText": "border-pink-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-pink-900",
    "insertText": "outline-pink-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-pink-900",
    "insertText": "ring-pink-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-pink-900",
    "insertText": "fill-pink-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-pink-900",
    "insertText": "stroke-pink-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-pink-900",
    "insertText": "shadow-pink-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-pink-900",
    "insertText": "decoration-pink-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-pink-900",
    "insertText": "accent-pink-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-pink-900",
    "insertText": "caret-pink-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-pink-950",
    "insertText": "bg-pink-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-pink-950",
    "insertText": "text-pink-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-pink-950",
    "insertText": "border-pink-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-pink-950",
    "insertText": "outline-pink-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-pink-950",
    "insertText": "ring-pink-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-pink-950",
    "insertText": "fill-pink-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-pink-950",
    "insertText": "stroke-pink-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-pink-950",
    "insertText": "shadow-pink-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-pink-950",
    "insertText": "decoration-pink-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-pink-950",
    "insertText": "accent-pink-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-pink-950",
    "insertText": "caret-pink-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-rose-50",
    "insertText": "bg-rose-50",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-rose-50",
    "insertText": "text-rose-50",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-rose-50",
    "insertText": "border-rose-50",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-rose-50",
    "insertText": "outline-rose-50",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-rose-50",
    "insertText": "ring-rose-50",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-rose-50",
    "insertText": "fill-rose-50",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-rose-50",
    "insertText": "stroke-rose-50",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-rose-50",
    "insertText": "shadow-rose-50",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-rose-50",
    "insertText": "decoration-rose-50",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-rose-50",
    "insertText": "accent-rose-50",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-rose-50",
    "insertText": "caret-rose-50",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-rose-100",
    "insertText": "bg-rose-100",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-rose-100",
    "insertText": "text-rose-100",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-rose-100",
    "insertText": "border-rose-100",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-rose-100",
    "insertText": "outline-rose-100",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-rose-100",
    "insertText": "ring-rose-100",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-rose-100",
    "insertText": "fill-rose-100",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-rose-100",
    "insertText": "stroke-rose-100",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-rose-100",
    "insertText": "shadow-rose-100",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-rose-100",
    "insertText": "decoration-rose-100",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-rose-100",
    "insertText": "accent-rose-100",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-rose-100",
    "insertText": "caret-rose-100",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-rose-200",
    "insertText": "bg-rose-200",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-rose-200",
    "insertText": "text-rose-200",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-rose-200",
    "insertText": "border-rose-200",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-rose-200",
    "insertText": "outline-rose-200",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-rose-200",
    "insertText": "ring-rose-200",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-rose-200",
    "insertText": "fill-rose-200",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-rose-200",
    "insertText": "stroke-rose-200",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-rose-200",
    "insertText": "shadow-rose-200",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-rose-200",
    "insertText": "decoration-rose-200",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-rose-200",
    "insertText": "accent-rose-200",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-rose-200",
    "insertText": "caret-rose-200",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-rose-300",
    "insertText": "bg-rose-300",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-rose-300",
    "insertText": "text-rose-300",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-rose-300",
    "insertText": "border-rose-300",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-rose-300",
    "insertText": "outline-rose-300",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-rose-300",
    "insertText": "ring-rose-300",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-rose-300",
    "insertText": "fill-rose-300",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-rose-300",
    "insertText": "stroke-rose-300",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-rose-300",
    "insertText": "shadow-rose-300",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-rose-300",
    "insertText": "decoration-rose-300",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-rose-300",
    "insertText": "accent-rose-300",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-rose-300",
    "insertText": "caret-rose-300",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-rose-400",
    "insertText": "bg-rose-400",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-rose-400",
    "insertText": "text-rose-400",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-rose-400",
    "insertText": "border-rose-400",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-rose-400",
    "insertText": "outline-rose-400",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-rose-400",
    "insertText": "ring-rose-400",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-rose-400",
    "insertText": "fill-rose-400",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-rose-400",
    "insertText": "stroke-rose-400",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-rose-400",
    "insertText": "shadow-rose-400",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-rose-400",
    "insertText": "decoration-rose-400",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-rose-400",
    "insertText": "accent-rose-400",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-rose-400",
    "insertText": "caret-rose-400",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-rose-500",
    "insertText": "bg-rose-500",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-rose-500",
    "insertText": "text-rose-500",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-rose-500",
    "insertText": "border-rose-500",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-rose-500",
    "insertText": "outline-rose-500",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-rose-500",
    "insertText": "ring-rose-500",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-rose-500",
    "insertText": "fill-rose-500",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-rose-500",
    "insertText": "stroke-rose-500",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-rose-500",
    "insertText": "shadow-rose-500",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-rose-500",
    "insertText": "decoration-rose-500",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-rose-500",
    "insertText": "accent-rose-500",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-rose-500",
    "insertText": "caret-rose-500",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-rose-600",
    "insertText": "bg-rose-600",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-rose-600",
    "insertText": "text-rose-600",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-rose-600",
    "insertText": "border-rose-600",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-rose-600",
    "insertText": "outline-rose-600",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-rose-600",
    "insertText": "ring-rose-600",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-rose-600",
    "insertText": "fill-rose-600",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-rose-600",
    "insertText": "stroke-rose-600",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-rose-600",
    "insertText": "shadow-rose-600",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-rose-600",
    "insertText": "decoration-rose-600",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-rose-600",
    "insertText": "accent-rose-600",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-rose-600",
    "insertText": "caret-rose-600",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-rose-700",
    "insertText": "bg-rose-700",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-rose-700",
    "insertText": "text-rose-700",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-rose-700",
    "insertText": "border-rose-700",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-rose-700",
    "insertText": "outline-rose-700",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-rose-700",
    "insertText": "ring-rose-700",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-rose-700",
    "insertText": "fill-rose-700",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-rose-700",
    "insertText": "stroke-rose-700",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-rose-700",
    "insertText": "shadow-rose-700",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-rose-700",
    "insertText": "decoration-rose-700",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-rose-700",
    "insertText": "accent-rose-700",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-rose-700",
    "insertText": "caret-rose-700",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-rose-800",
    "insertText": "bg-rose-800",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-rose-800",
    "insertText": "text-rose-800",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-rose-800",
    "insertText": "border-rose-800",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-rose-800",
    "insertText": "outline-rose-800",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-rose-800",
    "insertText": "ring-rose-800",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-rose-800",
    "insertText": "fill-rose-800",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-rose-800",
    "insertText": "stroke-rose-800",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-rose-800",
    "insertText": "shadow-rose-800",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-rose-800",
    "insertText": "decoration-rose-800",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-rose-800",
    "insertText": "accent-rose-800",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-rose-800",
    "insertText": "caret-rose-800",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-rose-900",
    "insertText": "bg-rose-900",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-rose-900",
    "insertText": "text-rose-900",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-rose-900",
    "insertText": "border-rose-900",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-rose-900",
    "insertText": "outline-rose-900",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-rose-900",
    "insertText": "ring-rose-900",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-rose-900",
    "insertText": "fill-rose-900",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-rose-900",
    "insertText": "stroke-rose-900",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-rose-900",
    "insertText": "shadow-rose-900",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-rose-900",
    "insertText": "decoration-rose-900",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-rose-900",
    "insertText": "accent-rose-900",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-rose-900",
    "insertText": "caret-rose-900",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-bg-rose-950",
    "insertText": "bg-rose-950",
    "detail": "Tailwind bg",
    "kind": "snippet"
  },
  {
    "label": "tw-text-rose-950",
    "insertText": "text-rose-950",
    "detail": "Tailwind text",
    "kind": "snippet"
  },
  {
    "label": "tw-border-rose-950",
    "insertText": "border-rose-950",
    "detail": "Tailwind border",
    "kind": "snippet"
  },
  {
    "label": "tw-outline-rose-950",
    "insertText": "outline-rose-950",
    "detail": "Tailwind outline",
    "kind": "snippet"
  },
  {
    "label": "tw-ring-rose-950",
    "insertText": "ring-rose-950",
    "detail": "Tailwind ring",
    "kind": "snippet"
  },
  {
    "label": "tw-fill-rose-950",
    "insertText": "fill-rose-950",
    "detail": "Tailwind fill",
    "kind": "snippet"
  },
  {
    "label": "tw-stroke-rose-950",
    "insertText": "stroke-rose-950",
    "detail": "Tailwind stroke",
    "kind": "snippet"
  },
  {
    "label": "tw-shadow-rose-950",
    "insertText": "shadow-rose-950",
    "detail": "Tailwind shadow",
    "kind": "snippet"
  },
  {
    "label": "tw-decoration-rose-950",
    "insertText": "decoration-rose-950",
    "detail": "Tailwind decoration",
    "kind": "snippet"
  },
  {
    "label": "tw-accent-rose-950",
    "insertText": "accent-rose-950",
    "detail": "Tailwind accent",
    "kind": "snippet"
  },
  {
    "label": "tw-caret-rose-950",
    "insertText": "caret-rose-950",
    "detail": "Tailwind caret",
    "kind": "snippet"
  },
  {
    "label": "tw-p-0",
    "insertText": "p-0",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-px",
    "insertText": "p-px",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-0.5",
    "insertText": "p-0.5",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-1",
    "insertText": "p-1",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-1.5",
    "insertText": "p-1.5",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-2",
    "insertText": "p-2",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-2.5",
    "insertText": "p-2.5",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-3",
    "insertText": "p-3",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-3.5",
    "insertText": "p-3.5",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-4",
    "insertText": "p-4",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-5",
    "insertText": "p-5",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-6",
    "insertText": "p-6",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-7",
    "insertText": "p-7",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-8",
    "insertText": "p-8",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-9",
    "insertText": "p-9",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-10",
    "insertText": "p-10",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-11",
    "insertText": "p-11",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-12",
    "insertText": "p-12",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-14",
    "insertText": "p-14",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-16",
    "insertText": "p-16",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-20",
    "insertText": "p-20",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-24",
    "insertText": "p-24",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-28",
    "insertText": "p-28",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-32",
    "insertText": "p-32",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-36",
    "insertText": "p-36",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-40",
    "insertText": "p-40",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-44",
    "insertText": "p-44",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-48",
    "insertText": "p-48",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-52",
    "insertText": "p-52",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-56",
    "insertText": "p-56",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-60",
    "insertText": "p-60",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-64",
    "insertText": "p-64",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-72",
    "insertText": "p-72",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-80",
    "insertText": "p-80",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-96",
    "insertText": "p-96",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-auto",
    "insertText": "p-auto",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-1/2",
    "insertText": "p-1/2",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-1/3",
    "insertText": "p-1/3",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-2/3",
    "insertText": "p-2/3",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-1/4",
    "insertText": "p-1/4",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-2/4",
    "insertText": "p-2/4",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-3/4",
    "insertText": "p-3/4",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-1/5",
    "insertText": "p-1/5",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-full",
    "insertText": "p-full",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-screen",
    "insertText": "p-screen",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-min",
    "insertText": "p-min",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-max",
    "insertText": "p-max",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-p-fit",
    "insertText": "p-fit",
    "detail": "Tailwind p",
    "kind": "snippet"
  },
  {
    "label": "tw-px-0",
    "insertText": "px-0",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-px",
    "insertText": "px-px",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-0.5",
    "insertText": "px-0.5",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-1",
    "insertText": "px-1",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-1.5",
    "insertText": "px-1.5",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-2",
    "insertText": "px-2",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-2.5",
    "insertText": "px-2.5",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-3",
    "insertText": "px-3",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-3.5",
    "insertText": "px-3.5",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-4",
    "insertText": "px-4",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-5",
    "insertText": "px-5",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-6",
    "insertText": "px-6",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-7",
    "insertText": "px-7",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-8",
    "insertText": "px-8",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-9",
    "insertText": "px-9",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-10",
    "insertText": "px-10",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-11",
    "insertText": "px-11",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-12",
    "insertText": "px-12",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-14",
    "insertText": "px-14",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-16",
    "insertText": "px-16",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-20",
    "insertText": "px-20",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-24",
    "insertText": "px-24",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-28",
    "insertText": "px-28",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-32",
    "insertText": "px-32",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-36",
    "insertText": "px-36",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-40",
    "insertText": "px-40",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-44",
    "insertText": "px-44",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-48",
    "insertText": "px-48",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-52",
    "insertText": "px-52",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-56",
    "insertText": "px-56",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-60",
    "insertText": "px-60",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-64",
    "insertText": "px-64",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-72",
    "insertText": "px-72",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-80",
    "insertText": "px-80",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-96",
    "insertText": "px-96",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-auto",
    "insertText": "px-auto",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-1/2",
    "insertText": "px-1/2",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-1/3",
    "insertText": "px-1/3",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-2/3",
    "insertText": "px-2/3",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-1/4",
    "insertText": "px-1/4",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-2/4",
    "insertText": "px-2/4",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-3/4",
    "insertText": "px-3/4",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-1/5",
    "insertText": "px-1/5",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-full",
    "insertText": "px-full",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-screen",
    "insertText": "px-screen",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-min",
    "insertText": "px-min",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-max",
    "insertText": "px-max",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-px-fit",
    "insertText": "px-fit",
    "detail": "Tailwind px",
    "kind": "snippet"
  },
  {
    "label": "tw-py-0",
    "insertText": "py-0",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-px",
    "insertText": "py-px",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-0.5",
    "insertText": "py-0.5",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-1",
    "insertText": "py-1",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-1.5",
    "insertText": "py-1.5",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-2",
    "insertText": "py-2",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-2.5",
    "insertText": "py-2.5",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-3",
    "insertText": "py-3",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-3.5",
    "insertText": "py-3.5",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-4",
    "insertText": "py-4",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-5",
    "insertText": "py-5",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-6",
    "insertText": "py-6",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-7",
    "insertText": "py-7",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-8",
    "insertText": "py-8",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-9",
    "insertText": "py-9",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-10",
    "insertText": "py-10",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-11",
    "insertText": "py-11",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-12",
    "insertText": "py-12",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-14",
    "insertText": "py-14",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-16",
    "insertText": "py-16",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-20",
    "insertText": "py-20",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-24",
    "insertText": "py-24",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-28",
    "insertText": "py-28",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-32",
    "insertText": "py-32",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-36",
    "insertText": "py-36",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-40",
    "insertText": "py-40",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-44",
    "insertText": "py-44",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-48",
    "insertText": "py-48",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-52",
    "insertText": "py-52",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-56",
    "insertText": "py-56",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-60",
    "insertText": "py-60",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-64",
    "insertText": "py-64",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-72",
    "insertText": "py-72",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-80",
    "insertText": "py-80",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-96",
    "insertText": "py-96",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-auto",
    "insertText": "py-auto",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-1/2",
    "insertText": "py-1/2",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-1/3",
    "insertText": "py-1/3",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-2/3",
    "insertText": "py-2/3",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-1/4",
    "insertText": "py-1/4",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-2/4",
    "insertText": "py-2/4",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-3/4",
    "insertText": "py-3/4",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-1/5",
    "insertText": "py-1/5",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-full",
    "insertText": "py-full",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-screen",
    "insertText": "py-screen",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-min",
    "insertText": "py-min",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-max",
    "insertText": "py-max",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-py-fit",
    "insertText": "py-fit",
    "detail": "Tailwind py",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-0",
    "insertText": "pt-0",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-px",
    "insertText": "pt-px",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-0.5",
    "insertText": "pt-0.5",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-1",
    "insertText": "pt-1",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-1.5",
    "insertText": "pt-1.5",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-2",
    "insertText": "pt-2",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-2.5",
    "insertText": "pt-2.5",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-3",
    "insertText": "pt-3",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-3.5",
    "insertText": "pt-3.5",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-4",
    "insertText": "pt-4",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-5",
    "insertText": "pt-5",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-6",
    "insertText": "pt-6",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-7",
    "insertText": "pt-7",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-8",
    "insertText": "pt-8",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-9",
    "insertText": "pt-9",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-10",
    "insertText": "pt-10",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-11",
    "insertText": "pt-11",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-12",
    "insertText": "pt-12",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-14",
    "insertText": "pt-14",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-16",
    "insertText": "pt-16",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-20",
    "insertText": "pt-20",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-24",
    "insertText": "pt-24",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-28",
    "insertText": "pt-28",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-32",
    "insertText": "pt-32",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-36",
    "insertText": "pt-36",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-40",
    "insertText": "pt-40",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-44",
    "insertText": "pt-44",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-48",
    "insertText": "pt-48",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-52",
    "insertText": "pt-52",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-56",
    "insertText": "pt-56",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-60",
    "insertText": "pt-60",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-64",
    "insertText": "pt-64",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-72",
    "insertText": "pt-72",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-80",
    "insertText": "pt-80",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-96",
    "insertText": "pt-96",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-auto",
    "insertText": "pt-auto",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-1/2",
    "insertText": "pt-1/2",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-1/3",
    "insertText": "pt-1/3",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-2/3",
    "insertText": "pt-2/3",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-1/4",
    "insertText": "pt-1/4",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-2/4",
    "insertText": "pt-2/4",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-3/4",
    "insertText": "pt-3/4",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-1/5",
    "insertText": "pt-1/5",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-full",
    "insertText": "pt-full",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-screen",
    "insertText": "pt-screen",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-min",
    "insertText": "pt-min",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-max",
    "insertText": "pt-max",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pt-fit",
    "insertText": "pt-fit",
    "detail": "Tailwind pt",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-0",
    "insertText": "pb-0",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-px",
    "insertText": "pb-px",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-0.5",
    "insertText": "pb-0.5",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-1",
    "insertText": "pb-1",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-1.5",
    "insertText": "pb-1.5",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-2",
    "insertText": "pb-2",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-2.5",
    "insertText": "pb-2.5",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-3",
    "insertText": "pb-3",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-3.5",
    "insertText": "pb-3.5",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-4",
    "insertText": "pb-4",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-5",
    "insertText": "pb-5",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-6",
    "insertText": "pb-6",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-7",
    "insertText": "pb-7",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-8",
    "insertText": "pb-8",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-9",
    "insertText": "pb-9",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-10",
    "insertText": "pb-10",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-11",
    "insertText": "pb-11",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-12",
    "insertText": "pb-12",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-14",
    "insertText": "pb-14",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-16",
    "insertText": "pb-16",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-20",
    "insertText": "pb-20",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-24",
    "insertText": "pb-24",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-28",
    "insertText": "pb-28",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-32",
    "insertText": "pb-32",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-36",
    "insertText": "pb-36",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-40",
    "insertText": "pb-40",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-44",
    "insertText": "pb-44",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-48",
    "insertText": "pb-48",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-52",
    "insertText": "pb-52",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-56",
    "insertText": "pb-56",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-60",
    "insertText": "pb-60",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-64",
    "insertText": "pb-64",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-72",
    "insertText": "pb-72",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-80",
    "insertText": "pb-80",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-96",
    "insertText": "pb-96",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-auto",
    "insertText": "pb-auto",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-1/2",
    "insertText": "pb-1/2",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-1/3",
    "insertText": "pb-1/3",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-2/3",
    "insertText": "pb-2/3",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-1/4",
    "insertText": "pb-1/4",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-2/4",
    "insertText": "pb-2/4",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-3/4",
    "insertText": "pb-3/4",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-1/5",
    "insertText": "pb-1/5",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-full",
    "insertText": "pb-full",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-screen",
    "insertText": "pb-screen",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-min",
    "insertText": "pb-min",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-max",
    "insertText": "pb-max",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pb-fit",
    "insertText": "pb-fit",
    "detail": "Tailwind pb",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-0",
    "insertText": "pl-0",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-px",
    "insertText": "pl-px",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-0.5",
    "insertText": "pl-0.5",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-1",
    "insertText": "pl-1",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-1.5",
    "insertText": "pl-1.5",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-2",
    "insertText": "pl-2",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-2.5",
    "insertText": "pl-2.5",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-3",
    "insertText": "pl-3",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-3.5",
    "insertText": "pl-3.5",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-4",
    "insertText": "pl-4",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-5",
    "insertText": "pl-5",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-6",
    "insertText": "pl-6",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-7",
    "insertText": "pl-7",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-8",
    "insertText": "pl-8",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-9",
    "insertText": "pl-9",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-10",
    "insertText": "pl-10",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-11",
    "insertText": "pl-11",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-12",
    "insertText": "pl-12",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-14",
    "insertText": "pl-14",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-16",
    "insertText": "pl-16",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-20",
    "insertText": "pl-20",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-24",
    "insertText": "pl-24",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-28",
    "insertText": "pl-28",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-32",
    "insertText": "pl-32",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-36",
    "insertText": "pl-36",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-40",
    "insertText": "pl-40",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-44",
    "insertText": "pl-44",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-48",
    "insertText": "pl-48",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-52",
    "insertText": "pl-52",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-56",
    "insertText": "pl-56",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-60",
    "insertText": "pl-60",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-64",
    "insertText": "pl-64",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-72",
    "insertText": "pl-72",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-80",
    "insertText": "pl-80",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-96",
    "insertText": "pl-96",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-auto",
    "insertText": "pl-auto",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-1/2",
    "insertText": "pl-1/2",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-1/3",
    "insertText": "pl-1/3",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-2/3",
    "insertText": "pl-2/3",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-1/4",
    "insertText": "pl-1/4",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-2/4",
    "insertText": "pl-2/4",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-3/4",
    "insertText": "pl-3/4",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-1/5",
    "insertText": "pl-1/5",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-full",
    "insertText": "pl-full",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-screen",
    "insertText": "pl-screen",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-min",
    "insertText": "pl-min",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-max",
    "insertText": "pl-max",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pl-fit",
    "insertText": "pl-fit",
    "detail": "Tailwind pl",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-0",
    "insertText": "pr-0",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-px",
    "insertText": "pr-px",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-0.5",
    "insertText": "pr-0.5",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-1",
    "insertText": "pr-1",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-1.5",
    "insertText": "pr-1.5",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-2",
    "insertText": "pr-2",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-2.5",
    "insertText": "pr-2.5",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-3",
    "insertText": "pr-3",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-3.5",
    "insertText": "pr-3.5",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-4",
    "insertText": "pr-4",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-5",
    "insertText": "pr-5",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-6",
    "insertText": "pr-6",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-7",
    "insertText": "pr-7",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-8",
    "insertText": "pr-8",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-9",
    "insertText": "pr-9",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-10",
    "insertText": "pr-10",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-11",
    "insertText": "pr-11",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-12",
    "insertText": "pr-12",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-14",
    "insertText": "pr-14",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-16",
    "insertText": "pr-16",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-20",
    "insertText": "pr-20",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-24",
    "insertText": "pr-24",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-28",
    "insertText": "pr-28",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-32",
    "insertText": "pr-32",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-36",
    "insertText": "pr-36",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-40",
    "insertText": "pr-40",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-44",
    "insertText": "pr-44",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-48",
    "insertText": "pr-48",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-52",
    "insertText": "pr-52",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-56",
    "insertText": "pr-56",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-60",
    "insertText": "pr-60",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-64",
    "insertText": "pr-64",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-72",
    "insertText": "pr-72",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-80",
    "insertText": "pr-80",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-96",
    "insertText": "pr-96",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-auto",
    "insertText": "pr-auto",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-1/2",
    "insertText": "pr-1/2",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-1/3",
    "insertText": "pr-1/3",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-2/3",
    "insertText": "pr-2/3",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-1/4",
    "insertText": "pr-1/4",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-2/4",
    "insertText": "pr-2/4",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-3/4",
    "insertText": "pr-3/4",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-1/5",
    "insertText": "pr-1/5",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-full",
    "insertText": "pr-full",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-screen",
    "insertText": "pr-screen",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-min",
    "insertText": "pr-min",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-max",
    "insertText": "pr-max",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-pr-fit",
    "insertText": "pr-fit",
    "detail": "Tailwind pr",
    "kind": "snippet"
  },
  {
    "label": "tw-m-0",
    "insertText": "m-0",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-px",
    "insertText": "m-px",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-0.5",
    "insertText": "m-0.5",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-1",
    "insertText": "m-1",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-1.5",
    "insertText": "m-1.5",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-2",
    "insertText": "m-2",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-2.5",
    "insertText": "m-2.5",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-3",
    "insertText": "m-3",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-3.5",
    "insertText": "m-3.5",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-4",
    "insertText": "m-4",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-5",
    "insertText": "m-5",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-6",
    "insertText": "m-6",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-7",
    "insertText": "m-7",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-8",
    "insertText": "m-8",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-9",
    "insertText": "m-9",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-10",
    "insertText": "m-10",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-11",
    "insertText": "m-11",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-12",
    "insertText": "m-12",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-14",
    "insertText": "m-14",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-16",
    "insertText": "m-16",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-20",
    "insertText": "m-20",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-24",
    "insertText": "m-24",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-28",
    "insertText": "m-28",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-32",
    "insertText": "m-32",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-36",
    "insertText": "m-36",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-40",
    "insertText": "m-40",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-44",
    "insertText": "m-44",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-48",
    "insertText": "m-48",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-52",
    "insertText": "m-52",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-56",
    "insertText": "m-56",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-60",
    "insertText": "m-60",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-64",
    "insertText": "m-64",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-72",
    "insertText": "m-72",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-80",
    "insertText": "m-80",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-96",
    "insertText": "m-96",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-auto",
    "insertText": "m-auto",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-1/2",
    "insertText": "m-1/2",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-1/3",
    "insertText": "m-1/3",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-2/3",
    "insertText": "m-2/3",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-1/4",
    "insertText": "m-1/4",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-2/4",
    "insertText": "m-2/4",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-3/4",
    "insertText": "m-3/4",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-1/5",
    "insertText": "m-1/5",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-full",
    "insertText": "m-full",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-screen",
    "insertText": "m-screen",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-min",
    "insertText": "m-min",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-max",
    "insertText": "m-max",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-m-fit",
    "insertText": "m-fit",
    "detail": "Tailwind m",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-0",
    "insertText": "mx-0",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-px",
    "insertText": "mx-px",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-0.5",
    "insertText": "mx-0.5",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-1",
    "insertText": "mx-1",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-1.5",
    "insertText": "mx-1.5",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-2",
    "insertText": "mx-2",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-2.5",
    "insertText": "mx-2.5",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-3",
    "insertText": "mx-3",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-3.5",
    "insertText": "mx-3.5",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-4",
    "insertText": "mx-4",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-5",
    "insertText": "mx-5",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-6",
    "insertText": "mx-6",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-7",
    "insertText": "mx-7",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-8",
    "insertText": "mx-8",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-9",
    "insertText": "mx-9",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-10",
    "insertText": "mx-10",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-11",
    "insertText": "mx-11",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-12",
    "insertText": "mx-12",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-14",
    "insertText": "mx-14",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-16",
    "insertText": "mx-16",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-20",
    "insertText": "mx-20",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-24",
    "insertText": "mx-24",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-28",
    "insertText": "mx-28",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-32",
    "insertText": "mx-32",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-36",
    "insertText": "mx-36",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-40",
    "insertText": "mx-40",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-44",
    "insertText": "mx-44",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-48",
    "insertText": "mx-48",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-52",
    "insertText": "mx-52",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-56",
    "insertText": "mx-56",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-60",
    "insertText": "mx-60",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-64",
    "insertText": "mx-64",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-72",
    "insertText": "mx-72",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-80",
    "insertText": "mx-80",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-96",
    "insertText": "mx-96",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-auto",
    "insertText": "mx-auto",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-1/2",
    "insertText": "mx-1/2",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-1/3",
    "insertText": "mx-1/3",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-2/3",
    "insertText": "mx-2/3",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-1/4",
    "insertText": "mx-1/4",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-2/4",
    "insertText": "mx-2/4",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-3/4",
    "insertText": "mx-3/4",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-1/5",
    "insertText": "mx-1/5",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-full",
    "insertText": "mx-full",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-screen",
    "insertText": "mx-screen",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-min",
    "insertText": "mx-min",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-max",
    "insertText": "mx-max",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-mx-fit",
    "insertText": "mx-fit",
    "detail": "Tailwind mx",
    "kind": "snippet"
  },
  {
    "label": "tw-my-0",
    "insertText": "my-0",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-px",
    "insertText": "my-px",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-0.5",
    "insertText": "my-0.5",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-1",
    "insertText": "my-1",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-1.5",
    "insertText": "my-1.5",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-2",
    "insertText": "my-2",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-2.5",
    "insertText": "my-2.5",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-3",
    "insertText": "my-3",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-3.5",
    "insertText": "my-3.5",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-4",
    "insertText": "my-4",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-5",
    "insertText": "my-5",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-6",
    "insertText": "my-6",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-7",
    "insertText": "my-7",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-8",
    "insertText": "my-8",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-9",
    "insertText": "my-9",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-10",
    "insertText": "my-10",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-11",
    "insertText": "my-11",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-12",
    "insertText": "my-12",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-14",
    "insertText": "my-14",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-16",
    "insertText": "my-16",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-20",
    "insertText": "my-20",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-24",
    "insertText": "my-24",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-28",
    "insertText": "my-28",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-32",
    "insertText": "my-32",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-36",
    "insertText": "my-36",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-40",
    "insertText": "my-40",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-44",
    "insertText": "my-44",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-48",
    "insertText": "my-48",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-52",
    "insertText": "my-52",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-56",
    "insertText": "my-56",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-60",
    "insertText": "my-60",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-64",
    "insertText": "my-64",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-72",
    "insertText": "my-72",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-80",
    "insertText": "my-80",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-96",
    "insertText": "my-96",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-auto",
    "insertText": "my-auto",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-1/2",
    "insertText": "my-1/2",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-1/3",
    "insertText": "my-1/3",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-2/3",
    "insertText": "my-2/3",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-1/4",
    "insertText": "my-1/4",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-2/4",
    "insertText": "my-2/4",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-3/4",
    "insertText": "my-3/4",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-1/5",
    "insertText": "my-1/5",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-full",
    "insertText": "my-full",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-screen",
    "insertText": "my-screen",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-min",
    "insertText": "my-min",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-max",
    "insertText": "my-max",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-my-fit",
    "insertText": "my-fit",
    "detail": "Tailwind my",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-0",
    "insertText": "mt-0",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-px",
    "insertText": "mt-px",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-0.5",
    "insertText": "mt-0.5",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-1",
    "insertText": "mt-1",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-1.5",
    "insertText": "mt-1.5",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-2",
    "insertText": "mt-2",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-2.5",
    "insertText": "mt-2.5",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-3",
    "insertText": "mt-3",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-3.5",
    "insertText": "mt-3.5",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-4",
    "insertText": "mt-4",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-5",
    "insertText": "mt-5",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-6",
    "insertText": "mt-6",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-7",
    "insertText": "mt-7",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-8",
    "insertText": "mt-8",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-9",
    "insertText": "mt-9",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-10",
    "insertText": "mt-10",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-11",
    "insertText": "mt-11",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-12",
    "insertText": "mt-12",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-14",
    "insertText": "mt-14",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-16",
    "insertText": "mt-16",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-20",
    "insertText": "mt-20",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-24",
    "insertText": "mt-24",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-28",
    "insertText": "mt-28",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-32",
    "insertText": "mt-32",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-36",
    "insertText": "mt-36",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-40",
    "insertText": "mt-40",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-44",
    "insertText": "mt-44",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-48",
    "insertText": "mt-48",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-52",
    "insertText": "mt-52",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-56",
    "insertText": "mt-56",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-60",
    "insertText": "mt-60",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-64",
    "insertText": "mt-64",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-72",
    "insertText": "mt-72",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-80",
    "insertText": "mt-80",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-96",
    "insertText": "mt-96",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-auto",
    "insertText": "mt-auto",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-1/2",
    "insertText": "mt-1/2",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-1/3",
    "insertText": "mt-1/3",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-2/3",
    "insertText": "mt-2/3",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-1/4",
    "insertText": "mt-1/4",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-2/4",
    "insertText": "mt-2/4",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-3/4",
    "insertText": "mt-3/4",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-1/5",
    "insertText": "mt-1/5",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-full",
    "insertText": "mt-full",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-screen",
    "insertText": "mt-screen",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-min",
    "insertText": "mt-min",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-max",
    "insertText": "mt-max",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mt-fit",
    "insertText": "mt-fit",
    "detail": "Tailwind mt",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-0",
    "insertText": "mb-0",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-px",
    "insertText": "mb-px",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-0.5",
    "insertText": "mb-0.5",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-1",
    "insertText": "mb-1",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-1.5",
    "insertText": "mb-1.5",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-2",
    "insertText": "mb-2",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-2.5",
    "insertText": "mb-2.5",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-3",
    "insertText": "mb-3",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-3.5",
    "insertText": "mb-3.5",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-4",
    "insertText": "mb-4",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-5",
    "insertText": "mb-5",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-6",
    "insertText": "mb-6",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-7",
    "insertText": "mb-7",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-8",
    "insertText": "mb-8",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-9",
    "insertText": "mb-9",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-10",
    "insertText": "mb-10",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-11",
    "insertText": "mb-11",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-12",
    "insertText": "mb-12",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-14",
    "insertText": "mb-14",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-16",
    "insertText": "mb-16",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-20",
    "insertText": "mb-20",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-24",
    "insertText": "mb-24",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-28",
    "insertText": "mb-28",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-32",
    "insertText": "mb-32",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-36",
    "insertText": "mb-36",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-40",
    "insertText": "mb-40",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-44",
    "insertText": "mb-44",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-48",
    "insertText": "mb-48",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-52",
    "insertText": "mb-52",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-56",
    "insertText": "mb-56",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-60",
    "insertText": "mb-60",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-64",
    "insertText": "mb-64",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-72",
    "insertText": "mb-72",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-80",
    "insertText": "mb-80",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-96",
    "insertText": "mb-96",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-auto",
    "insertText": "mb-auto",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-1/2",
    "insertText": "mb-1/2",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-1/3",
    "insertText": "mb-1/3",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-2/3",
    "insertText": "mb-2/3",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-1/4",
    "insertText": "mb-1/4",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-2/4",
    "insertText": "mb-2/4",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-3/4",
    "insertText": "mb-3/4",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-1/5",
    "insertText": "mb-1/5",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-full",
    "insertText": "mb-full",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-screen",
    "insertText": "mb-screen",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-min",
    "insertText": "mb-min",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-max",
    "insertText": "mb-max",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-mb-fit",
    "insertText": "mb-fit",
    "detail": "Tailwind mb",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-0",
    "insertText": "ml-0",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-px",
    "insertText": "ml-px",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-0.5",
    "insertText": "ml-0.5",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-1",
    "insertText": "ml-1",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-1.5",
    "insertText": "ml-1.5",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-2",
    "insertText": "ml-2",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-2.5",
    "insertText": "ml-2.5",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-3",
    "insertText": "ml-3",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-3.5",
    "insertText": "ml-3.5",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-4",
    "insertText": "ml-4",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-5",
    "insertText": "ml-5",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-6",
    "insertText": "ml-6",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-7",
    "insertText": "ml-7",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-8",
    "insertText": "ml-8",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-9",
    "insertText": "ml-9",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-10",
    "insertText": "ml-10",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-11",
    "insertText": "ml-11",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-12",
    "insertText": "ml-12",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-14",
    "insertText": "ml-14",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-16",
    "insertText": "ml-16",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-20",
    "insertText": "ml-20",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-24",
    "insertText": "ml-24",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-28",
    "insertText": "ml-28",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-32",
    "insertText": "ml-32",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-36",
    "insertText": "ml-36",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-40",
    "insertText": "ml-40",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-44",
    "insertText": "ml-44",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-48",
    "insertText": "ml-48",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-52",
    "insertText": "ml-52",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-56",
    "insertText": "ml-56",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-60",
    "insertText": "ml-60",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-64",
    "insertText": "ml-64",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-72",
    "insertText": "ml-72",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-80",
    "insertText": "ml-80",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-96",
    "insertText": "ml-96",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-auto",
    "insertText": "ml-auto",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-1/2",
    "insertText": "ml-1/2",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-1/3",
    "insertText": "ml-1/3",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-2/3",
    "insertText": "ml-2/3",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-1/4",
    "insertText": "ml-1/4",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-2/4",
    "insertText": "ml-2/4",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-3/4",
    "insertText": "ml-3/4",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-1/5",
    "insertText": "ml-1/5",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-full",
    "insertText": "ml-full",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-screen",
    "insertText": "ml-screen",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-min",
    "insertText": "ml-min",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-max",
    "insertText": "ml-max",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-ml-fit",
    "insertText": "ml-fit",
    "detail": "Tailwind ml",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-0",
    "insertText": "mr-0",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-px",
    "insertText": "mr-px",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-0.5",
    "insertText": "mr-0.5",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-1",
    "insertText": "mr-1",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-1.5",
    "insertText": "mr-1.5",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-2",
    "insertText": "mr-2",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-2.5",
    "insertText": "mr-2.5",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-3",
    "insertText": "mr-3",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-3.5",
    "insertText": "mr-3.5",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-4",
    "insertText": "mr-4",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-5",
    "insertText": "mr-5",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-6",
    "insertText": "mr-6",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-7",
    "insertText": "mr-7",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-8",
    "insertText": "mr-8",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-9",
    "insertText": "mr-9",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-10",
    "insertText": "mr-10",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-11",
    "insertText": "mr-11",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-12",
    "insertText": "mr-12",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-14",
    "insertText": "mr-14",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-16",
    "insertText": "mr-16",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-20",
    "insertText": "mr-20",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-24",
    "insertText": "mr-24",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-28",
    "insertText": "mr-28",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-32",
    "insertText": "mr-32",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-36",
    "insertText": "mr-36",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-40",
    "insertText": "mr-40",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-44",
    "insertText": "mr-44",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-48",
    "insertText": "mr-48",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-52",
    "insertText": "mr-52",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-56",
    "insertText": "mr-56",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-60",
    "insertText": "mr-60",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-64",
    "insertText": "mr-64",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-72",
    "insertText": "mr-72",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-80",
    "insertText": "mr-80",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-96",
    "insertText": "mr-96",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-auto",
    "insertText": "mr-auto",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-1/2",
    "insertText": "mr-1/2",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-1/3",
    "insertText": "mr-1/3",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-2/3",
    "insertText": "mr-2/3",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-1/4",
    "insertText": "mr-1/4",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-2/4",
    "insertText": "mr-2/4",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-3/4",
    "insertText": "mr-3/4",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-1/5",
    "insertText": "mr-1/5",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-full",
    "insertText": "mr-full",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-screen",
    "insertText": "mr-screen",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-min",
    "insertText": "mr-min",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-max",
    "insertText": "mr-max",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-mr-fit",
    "insertText": "mr-fit",
    "detail": "Tailwind mr",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-0",
    "insertText": "gap-0",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-px",
    "insertText": "gap-px",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-0.5",
    "insertText": "gap-0.5",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-1",
    "insertText": "gap-1",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-1.5",
    "insertText": "gap-1.5",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-2",
    "insertText": "gap-2",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-2.5",
    "insertText": "gap-2.5",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-3",
    "insertText": "gap-3",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-3.5",
    "insertText": "gap-3.5",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-4",
    "insertText": "gap-4",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-5",
    "insertText": "gap-5",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-6",
    "insertText": "gap-6",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-7",
    "insertText": "gap-7",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-8",
    "insertText": "gap-8",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-9",
    "insertText": "gap-9",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-10",
    "insertText": "gap-10",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-11",
    "insertText": "gap-11",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-12",
    "insertText": "gap-12",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-14",
    "insertText": "gap-14",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-16",
    "insertText": "gap-16",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-20",
    "insertText": "gap-20",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-24",
    "insertText": "gap-24",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-28",
    "insertText": "gap-28",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-32",
    "insertText": "gap-32",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-36",
    "insertText": "gap-36",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-40",
    "insertText": "gap-40",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-44",
    "insertText": "gap-44",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-48",
    "insertText": "gap-48",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-52",
    "insertText": "gap-52",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-56",
    "insertText": "gap-56",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-60",
    "insertText": "gap-60",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-64",
    "insertText": "gap-64",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-72",
    "insertText": "gap-72",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-80",
    "insertText": "gap-80",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-96",
    "insertText": "gap-96",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-auto",
    "insertText": "gap-auto",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-1/2",
    "insertText": "gap-1/2",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-1/3",
    "insertText": "gap-1/3",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-2/3",
    "insertText": "gap-2/3",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-1/4",
    "insertText": "gap-1/4",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-2/4",
    "insertText": "gap-2/4",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-3/4",
    "insertText": "gap-3/4",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-1/5",
    "insertText": "gap-1/5",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-full",
    "insertText": "gap-full",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-screen",
    "insertText": "gap-screen",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-min",
    "insertText": "gap-min",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-max",
    "insertText": "gap-max",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-fit",
    "insertText": "gap-fit",
    "detail": "Tailwind gap",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-0",
    "insertText": "gap-x-0",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-px",
    "insertText": "gap-x-px",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-0.5",
    "insertText": "gap-x-0.5",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-1",
    "insertText": "gap-x-1",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-1.5",
    "insertText": "gap-x-1.5",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-2",
    "insertText": "gap-x-2",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-2.5",
    "insertText": "gap-x-2.5",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-3",
    "insertText": "gap-x-3",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-3.5",
    "insertText": "gap-x-3.5",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-4",
    "insertText": "gap-x-4",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-5",
    "insertText": "gap-x-5",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-6",
    "insertText": "gap-x-6",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-7",
    "insertText": "gap-x-7",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-8",
    "insertText": "gap-x-8",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-9",
    "insertText": "gap-x-9",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-10",
    "insertText": "gap-x-10",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-11",
    "insertText": "gap-x-11",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-12",
    "insertText": "gap-x-12",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-14",
    "insertText": "gap-x-14",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-16",
    "insertText": "gap-x-16",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-20",
    "insertText": "gap-x-20",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-24",
    "insertText": "gap-x-24",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-28",
    "insertText": "gap-x-28",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-32",
    "insertText": "gap-x-32",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-36",
    "insertText": "gap-x-36",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-40",
    "insertText": "gap-x-40",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-44",
    "insertText": "gap-x-44",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-48",
    "insertText": "gap-x-48",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-52",
    "insertText": "gap-x-52",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-56",
    "insertText": "gap-x-56",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-60",
    "insertText": "gap-x-60",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-64",
    "insertText": "gap-x-64",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-72",
    "insertText": "gap-x-72",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-80",
    "insertText": "gap-x-80",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-96",
    "insertText": "gap-x-96",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-auto",
    "insertText": "gap-x-auto",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-1/2",
    "insertText": "gap-x-1/2",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-1/3",
    "insertText": "gap-x-1/3",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-2/3",
    "insertText": "gap-x-2/3",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-1/4",
    "insertText": "gap-x-1/4",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-2/4",
    "insertText": "gap-x-2/4",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-3/4",
    "insertText": "gap-x-3/4",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-1/5",
    "insertText": "gap-x-1/5",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-full",
    "insertText": "gap-x-full",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-screen",
    "insertText": "gap-x-screen",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-min",
    "insertText": "gap-x-min",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-max",
    "insertText": "gap-x-max",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-x-fit",
    "insertText": "gap-x-fit",
    "detail": "Tailwind gap-x",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-0",
    "insertText": "gap-y-0",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-px",
    "insertText": "gap-y-px",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-0.5",
    "insertText": "gap-y-0.5",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-1",
    "insertText": "gap-y-1",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-1.5",
    "insertText": "gap-y-1.5",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-2",
    "insertText": "gap-y-2",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-2.5",
    "insertText": "gap-y-2.5",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-3",
    "insertText": "gap-y-3",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-3.5",
    "insertText": "gap-y-3.5",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-4",
    "insertText": "gap-y-4",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-5",
    "insertText": "gap-y-5",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-6",
    "insertText": "gap-y-6",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-7",
    "insertText": "gap-y-7",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-8",
    "insertText": "gap-y-8",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-9",
    "insertText": "gap-y-9",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-10",
    "insertText": "gap-y-10",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-11",
    "insertText": "gap-y-11",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-12",
    "insertText": "gap-y-12",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-14",
    "insertText": "gap-y-14",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-16",
    "insertText": "gap-y-16",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-20",
    "insertText": "gap-y-20",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-24",
    "insertText": "gap-y-24",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-28",
    "insertText": "gap-y-28",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-32",
    "insertText": "gap-y-32",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-36",
    "insertText": "gap-y-36",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-40",
    "insertText": "gap-y-40",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-44",
    "insertText": "gap-y-44",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-48",
    "insertText": "gap-y-48",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-52",
    "insertText": "gap-y-52",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-56",
    "insertText": "gap-y-56",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-60",
    "insertText": "gap-y-60",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-64",
    "insertText": "gap-y-64",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-72",
    "insertText": "gap-y-72",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-80",
    "insertText": "gap-y-80",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-96",
    "insertText": "gap-y-96",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-auto",
    "insertText": "gap-y-auto",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-1/2",
    "insertText": "gap-y-1/2",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-1/3",
    "insertText": "gap-y-1/3",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-2/3",
    "insertText": "gap-y-2/3",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-1/4",
    "insertText": "gap-y-1/4",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-2/4",
    "insertText": "gap-y-2/4",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-3/4",
    "insertText": "gap-y-3/4",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-1/5",
    "insertText": "gap-y-1/5",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-full",
    "insertText": "gap-y-full",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-screen",
    "insertText": "gap-y-screen",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-min",
    "insertText": "gap-y-min",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-max",
    "insertText": "gap-y-max",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-gap-y-fit",
    "insertText": "gap-y-fit",
    "detail": "Tailwind gap-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-0",
    "insertText": "space-x-0",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-px",
    "insertText": "space-x-px",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-0.5",
    "insertText": "space-x-0.5",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-1",
    "insertText": "space-x-1",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-1.5",
    "insertText": "space-x-1.5",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-2",
    "insertText": "space-x-2",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-2.5",
    "insertText": "space-x-2.5",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-3",
    "insertText": "space-x-3",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-3.5",
    "insertText": "space-x-3.5",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-4",
    "insertText": "space-x-4",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-5",
    "insertText": "space-x-5",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-6",
    "insertText": "space-x-6",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-7",
    "insertText": "space-x-7",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-8",
    "insertText": "space-x-8",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-9",
    "insertText": "space-x-9",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-10",
    "insertText": "space-x-10",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-11",
    "insertText": "space-x-11",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-12",
    "insertText": "space-x-12",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-14",
    "insertText": "space-x-14",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-16",
    "insertText": "space-x-16",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-20",
    "insertText": "space-x-20",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-24",
    "insertText": "space-x-24",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-28",
    "insertText": "space-x-28",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-32",
    "insertText": "space-x-32",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-36",
    "insertText": "space-x-36",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-40",
    "insertText": "space-x-40",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-44",
    "insertText": "space-x-44",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-48",
    "insertText": "space-x-48",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-52",
    "insertText": "space-x-52",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-56",
    "insertText": "space-x-56",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-60",
    "insertText": "space-x-60",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-64",
    "insertText": "space-x-64",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-72",
    "insertText": "space-x-72",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-80",
    "insertText": "space-x-80",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-96",
    "insertText": "space-x-96",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-auto",
    "insertText": "space-x-auto",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-1/2",
    "insertText": "space-x-1/2",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-1/3",
    "insertText": "space-x-1/3",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-2/3",
    "insertText": "space-x-2/3",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-1/4",
    "insertText": "space-x-1/4",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-2/4",
    "insertText": "space-x-2/4",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-3/4",
    "insertText": "space-x-3/4",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-1/5",
    "insertText": "space-x-1/5",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-full",
    "insertText": "space-x-full",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-screen",
    "insertText": "space-x-screen",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-min",
    "insertText": "space-x-min",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-max",
    "insertText": "space-x-max",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-x-fit",
    "insertText": "space-x-fit",
    "detail": "Tailwind space-x",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-0",
    "insertText": "space-y-0",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-px",
    "insertText": "space-y-px",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-0.5",
    "insertText": "space-y-0.5",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-1",
    "insertText": "space-y-1",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-1.5",
    "insertText": "space-y-1.5",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-2",
    "insertText": "space-y-2",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-2.5",
    "insertText": "space-y-2.5",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-3",
    "insertText": "space-y-3",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-3.5",
    "insertText": "space-y-3.5",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-4",
    "insertText": "space-y-4",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-5",
    "insertText": "space-y-5",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-6",
    "insertText": "space-y-6",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-7",
    "insertText": "space-y-7",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-8",
    "insertText": "space-y-8",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-9",
    "insertText": "space-y-9",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-10",
    "insertText": "space-y-10",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-11",
    "insertText": "space-y-11",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-12",
    "insertText": "space-y-12",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-14",
    "insertText": "space-y-14",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-16",
    "insertText": "space-y-16",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-20",
    "insertText": "space-y-20",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-24",
    "insertText": "space-y-24",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-28",
    "insertText": "space-y-28",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-32",
    "insertText": "space-y-32",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-36",
    "insertText": "space-y-36",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-40",
    "insertText": "space-y-40",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-44",
    "insertText": "space-y-44",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-48",
    "insertText": "space-y-48",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-52",
    "insertText": "space-y-52",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-56",
    "insertText": "space-y-56",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-60",
    "insertText": "space-y-60",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-64",
    "insertText": "space-y-64",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-72",
    "insertText": "space-y-72",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-80",
    "insertText": "space-y-80",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-96",
    "insertText": "space-y-96",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-auto",
    "insertText": "space-y-auto",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-1/2",
    "insertText": "space-y-1/2",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-1/3",
    "insertText": "space-y-1/3",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-2/3",
    "insertText": "space-y-2/3",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-1/4",
    "insertText": "space-y-1/4",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-2/4",
    "insertText": "space-y-2/4",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-3/4",
    "insertText": "space-y-3/4",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-1/5",
    "insertText": "space-y-1/5",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-full",
    "insertText": "space-y-full",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-screen",
    "insertText": "space-y-screen",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-min",
    "insertText": "space-y-min",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-max",
    "insertText": "space-y-max",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-space-y-fit",
    "insertText": "space-y-fit",
    "detail": "Tailwind space-y",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-0",
    "insertText": "inset-0",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-px",
    "insertText": "inset-px",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-0.5",
    "insertText": "inset-0.5",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-1",
    "insertText": "inset-1",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-1.5",
    "insertText": "inset-1.5",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-2",
    "insertText": "inset-2",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-2.5",
    "insertText": "inset-2.5",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-3",
    "insertText": "inset-3",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-3.5",
    "insertText": "inset-3.5",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-4",
    "insertText": "inset-4",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-5",
    "insertText": "inset-5",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-6",
    "insertText": "inset-6",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-7",
    "insertText": "inset-7",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-8",
    "insertText": "inset-8",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-9",
    "insertText": "inset-9",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-10",
    "insertText": "inset-10",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-11",
    "insertText": "inset-11",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-12",
    "insertText": "inset-12",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-14",
    "insertText": "inset-14",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-16",
    "insertText": "inset-16",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-20",
    "insertText": "inset-20",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-24",
    "insertText": "inset-24",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-28",
    "insertText": "inset-28",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-32",
    "insertText": "inset-32",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-36",
    "insertText": "inset-36",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-40",
    "insertText": "inset-40",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-44",
    "insertText": "inset-44",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-48",
    "insertText": "inset-48",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-52",
    "insertText": "inset-52",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-56",
    "insertText": "inset-56",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-60",
    "insertText": "inset-60",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-64",
    "insertText": "inset-64",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-72",
    "insertText": "inset-72",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-80",
    "insertText": "inset-80",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-96",
    "insertText": "inset-96",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-auto",
    "insertText": "inset-auto",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-1/2",
    "insertText": "inset-1/2",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-1/3",
    "insertText": "inset-1/3",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-2/3",
    "insertText": "inset-2/3",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-1/4",
    "insertText": "inset-1/4",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-2/4",
    "insertText": "inset-2/4",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-3/4",
    "insertText": "inset-3/4",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-1/5",
    "insertText": "inset-1/5",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-full",
    "insertText": "inset-full",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-screen",
    "insertText": "inset-screen",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-min",
    "insertText": "inset-min",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-max",
    "insertText": "inset-max",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-inset-fit",
    "insertText": "inset-fit",
    "detail": "Tailwind inset",
    "kind": "snippet"
  },
  {
    "label": "tw-top-0",
    "insertText": "top-0",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-px",
    "insertText": "top-px",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-0.5",
    "insertText": "top-0.5",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-1",
    "insertText": "top-1",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-1.5",
    "insertText": "top-1.5",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-2",
    "insertText": "top-2",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-2.5",
    "insertText": "top-2.5",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-3",
    "insertText": "top-3",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-3.5",
    "insertText": "top-3.5",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-4",
    "insertText": "top-4",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-5",
    "insertText": "top-5",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-6",
    "insertText": "top-6",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-7",
    "insertText": "top-7",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-8",
    "insertText": "top-8",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-9",
    "insertText": "top-9",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-10",
    "insertText": "top-10",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-11",
    "insertText": "top-11",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-12",
    "insertText": "top-12",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-14",
    "insertText": "top-14",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-16",
    "insertText": "top-16",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-20",
    "insertText": "top-20",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-24",
    "insertText": "top-24",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-28",
    "insertText": "top-28",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-32",
    "insertText": "top-32",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-36",
    "insertText": "top-36",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-40",
    "insertText": "top-40",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-44",
    "insertText": "top-44",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-48",
    "insertText": "top-48",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-52",
    "insertText": "top-52",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-56",
    "insertText": "top-56",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-60",
    "insertText": "top-60",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-64",
    "insertText": "top-64",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-72",
    "insertText": "top-72",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-80",
    "insertText": "top-80",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-96",
    "insertText": "top-96",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-auto",
    "insertText": "top-auto",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-1/2",
    "insertText": "top-1/2",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-1/3",
    "insertText": "top-1/3",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-2/3",
    "insertText": "top-2/3",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-1/4",
    "insertText": "top-1/4",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-2/4",
    "insertText": "top-2/4",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-3/4",
    "insertText": "top-3/4",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-1/5",
    "insertText": "top-1/5",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-full",
    "insertText": "top-full",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-screen",
    "insertText": "top-screen",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-min",
    "insertText": "top-min",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-max",
    "insertText": "top-max",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-top-fit",
    "insertText": "top-fit",
    "detail": "Tailwind top",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-0",
    "insertText": "bottom-0",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-px",
    "insertText": "bottom-px",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-0.5",
    "insertText": "bottom-0.5",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-1",
    "insertText": "bottom-1",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-1.5",
    "insertText": "bottom-1.5",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-2",
    "insertText": "bottom-2",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-2.5",
    "insertText": "bottom-2.5",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-3",
    "insertText": "bottom-3",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-3.5",
    "insertText": "bottom-3.5",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-4",
    "insertText": "bottom-4",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-5",
    "insertText": "bottom-5",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-6",
    "insertText": "bottom-6",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-7",
    "insertText": "bottom-7",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-8",
    "insertText": "bottom-8",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-9",
    "insertText": "bottom-9",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-10",
    "insertText": "bottom-10",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-11",
    "insertText": "bottom-11",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-12",
    "insertText": "bottom-12",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-14",
    "insertText": "bottom-14",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-16",
    "insertText": "bottom-16",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-20",
    "insertText": "bottom-20",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-24",
    "insertText": "bottom-24",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-28",
    "insertText": "bottom-28",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-32",
    "insertText": "bottom-32",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-36",
    "insertText": "bottom-36",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-40",
    "insertText": "bottom-40",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-44",
    "insertText": "bottom-44",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-48",
    "insertText": "bottom-48",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-52",
    "insertText": "bottom-52",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-56",
    "insertText": "bottom-56",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-60",
    "insertText": "bottom-60",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-64",
    "insertText": "bottom-64",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-72",
    "insertText": "bottom-72",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-80",
    "insertText": "bottom-80",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-96",
    "insertText": "bottom-96",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-auto",
    "insertText": "bottom-auto",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-1/2",
    "insertText": "bottom-1/2",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-1/3",
    "insertText": "bottom-1/3",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-2/3",
    "insertText": "bottom-2/3",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-1/4",
    "insertText": "bottom-1/4",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-2/4",
    "insertText": "bottom-2/4",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-3/4",
    "insertText": "bottom-3/4",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-1/5",
    "insertText": "bottom-1/5",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-full",
    "insertText": "bottom-full",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-screen",
    "insertText": "bottom-screen",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-min",
    "insertText": "bottom-min",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-max",
    "insertText": "bottom-max",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-bottom-fit",
    "insertText": "bottom-fit",
    "detail": "Tailwind bottom",
    "kind": "snippet"
  },
  {
    "label": "tw-left-0",
    "insertText": "left-0",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-px",
    "insertText": "left-px",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-0.5",
    "insertText": "left-0.5",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-1",
    "insertText": "left-1",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-1.5",
    "insertText": "left-1.5",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-2",
    "insertText": "left-2",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-2.5",
    "insertText": "left-2.5",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-3",
    "insertText": "left-3",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-3.5",
    "insertText": "left-3.5",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-4",
    "insertText": "left-4",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-5",
    "insertText": "left-5",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-6",
    "insertText": "left-6",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-7",
    "insertText": "left-7",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-8",
    "insertText": "left-8",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-9",
    "insertText": "left-9",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-10",
    "insertText": "left-10",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-11",
    "insertText": "left-11",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-12",
    "insertText": "left-12",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-14",
    "insertText": "left-14",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-16",
    "insertText": "left-16",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-20",
    "insertText": "left-20",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-24",
    "insertText": "left-24",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-28",
    "insertText": "left-28",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-32",
    "insertText": "left-32",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-36",
    "insertText": "left-36",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-40",
    "insertText": "left-40",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-44",
    "insertText": "left-44",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-48",
    "insertText": "left-48",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-52",
    "insertText": "left-52",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-56",
    "insertText": "left-56",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-60",
    "insertText": "left-60",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-64",
    "insertText": "left-64",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-72",
    "insertText": "left-72",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-80",
    "insertText": "left-80",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-96",
    "insertText": "left-96",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-auto",
    "insertText": "left-auto",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-1/2",
    "insertText": "left-1/2",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-1/3",
    "insertText": "left-1/3",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-2/3",
    "insertText": "left-2/3",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-1/4",
    "insertText": "left-1/4",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-2/4",
    "insertText": "left-2/4",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-3/4",
    "insertText": "left-3/4",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-1/5",
    "insertText": "left-1/5",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-full",
    "insertText": "left-full",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-screen",
    "insertText": "left-screen",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-min",
    "insertText": "left-min",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-max",
    "insertText": "left-max",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-left-fit",
    "insertText": "left-fit",
    "detail": "Tailwind left",
    "kind": "snippet"
  },
  {
    "label": "tw-right-0",
    "insertText": "right-0",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-px",
    "insertText": "right-px",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-0.5",
    "insertText": "right-0.5",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-1",
    "insertText": "right-1",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-1.5",
    "insertText": "right-1.5",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-2",
    "insertText": "right-2",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-2.5",
    "insertText": "right-2.5",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-3",
    "insertText": "right-3",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-3.5",
    "insertText": "right-3.5",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-4",
    "insertText": "right-4",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-5",
    "insertText": "right-5",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-6",
    "insertText": "right-6",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-7",
    "insertText": "right-7",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-8",
    "insertText": "right-8",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-9",
    "insertText": "right-9",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-10",
    "insertText": "right-10",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-11",
    "insertText": "right-11",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-12",
    "insertText": "right-12",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-14",
    "insertText": "right-14",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-16",
    "insertText": "right-16",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-20",
    "insertText": "right-20",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-24",
    "insertText": "right-24",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-28",
    "insertText": "right-28",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-32",
    "insertText": "right-32",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-36",
    "insertText": "right-36",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-40",
    "insertText": "right-40",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-44",
    "insertText": "right-44",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-48",
    "insertText": "right-48",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-52",
    "insertText": "right-52",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-56",
    "insertText": "right-56",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-60",
    "insertText": "right-60",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-64",
    "insertText": "right-64",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-72",
    "insertText": "right-72",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-80",
    "insertText": "right-80",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-96",
    "insertText": "right-96",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-auto",
    "insertText": "right-auto",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-1/2",
    "insertText": "right-1/2",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-1/3",
    "insertText": "right-1/3",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-2/3",
    "insertText": "right-2/3",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-1/4",
    "insertText": "right-1/4",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-2/4",
    "insertText": "right-2/4",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-3/4",
    "insertText": "right-3/4",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-1/5",
    "insertText": "right-1/5",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-full",
    "insertText": "right-full",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-screen",
    "insertText": "right-screen",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-min",
    "insertText": "right-min",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-max",
    "insertText": "right-max",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-right-fit",
    "insertText": "right-fit",
    "detail": "Tailwind right",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-0",
    "insertText": "translate-x-0",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-px",
    "insertText": "translate-x-px",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-0.5",
    "insertText": "translate-x-0.5",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-1",
    "insertText": "translate-x-1",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-1.5",
    "insertText": "translate-x-1.5",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-2",
    "insertText": "translate-x-2",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-2.5",
    "insertText": "translate-x-2.5",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-3",
    "insertText": "translate-x-3",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-3.5",
    "insertText": "translate-x-3.5",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-4",
    "insertText": "translate-x-4",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-5",
    "insertText": "translate-x-5",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-6",
    "insertText": "translate-x-6",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-7",
    "insertText": "translate-x-7",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-8",
    "insertText": "translate-x-8",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-9",
    "insertText": "translate-x-9",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-10",
    "insertText": "translate-x-10",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-11",
    "insertText": "translate-x-11",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-12",
    "insertText": "translate-x-12",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-14",
    "insertText": "translate-x-14",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-16",
    "insertText": "translate-x-16",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-20",
    "insertText": "translate-x-20",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-24",
    "insertText": "translate-x-24",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-28",
    "insertText": "translate-x-28",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-32",
    "insertText": "translate-x-32",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-36",
    "insertText": "translate-x-36",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-40",
    "insertText": "translate-x-40",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-44",
    "insertText": "translate-x-44",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-48",
    "insertText": "translate-x-48",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-52",
    "insertText": "translate-x-52",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-56",
    "insertText": "translate-x-56",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-60",
    "insertText": "translate-x-60",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-64",
    "insertText": "translate-x-64",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-72",
    "insertText": "translate-x-72",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-80",
    "insertText": "translate-x-80",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-96",
    "insertText": "translate-x-96",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-auto",
    "insertText": "translate-x-auto",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-1/2",
    "insertText": "translate-x-1/2",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-1/3",
    "insertText": "translate-x-1/3",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-2/3",
    "insertText": "translate-x-2/3",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-1/4",
    "insertText": "translate-x-1/4",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-2/4",
    "insertText": "translate-x-2/4",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-3/4",
    "insertText": "translate-x-3/4",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-1/5",
    "insertText": "translate-x-1/5",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-full",
    "insertText": "translate-x-full",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-screen",
    "insertText": "translate-x-screen",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-min",
    "insertText": "translate-x-min",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-max",
    "insertText": "translate-x-max",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-x-fit",
    "insertText": "translate-x-fit",
    "detail": "Tailwind translate-x",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-0",
    "insertText": "translate-y-0",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-px",
    "insertText": "translate-y-px",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-0.5",
    "insertText": "translate-y-0.5",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-1",
    "insertText": "translate-y-1",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-1.5",
    "insertText": "translate-y-1.5",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-2",
    "insertText": "translate-y-2",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-2.5",
    "insertText": "translate-y-2.5",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-3",
    "insertText": "translate-y-3",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-3.5",
    "insertText": "translate-y-3.5",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-4",
    "insertText": "translate-y-4",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-5",
    "insertText": "translate-y-5",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-6",
    "insertText": "translate-y-6",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-7",
    "insertText": "translate-y-7",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-8",
    "insertText": "translate-y-8",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-9",
    "insertText": "translate-y-9",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-10",
    "insertText": "translate-y-10",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-11",
    "insertText": "translate-y-11",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-12",
    "insertText": "translate-y-12",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-14",
    "insertText": "translate-y-14",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-16",
    "insertText": "translate-y-16",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-20",
    "insertText": "translate-y-20",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-24",
    "insertText": "translate-y-24",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-28",
    "insertText": "translate-y-28",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-32",
    "insertText": "translate-y-32",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-36",
    "insertText": "translate-y-36",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-40",
    "insertText": "translate-y-40",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-44",
    "insertText": "translate-y-44",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-48",
    "insertText": "translate-y-48",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-52",
    "insertText": "translate-y-52",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-56",
    "insertText": "translate-y-56",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-60",
    "insertText": "translate-y-60",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-64",
    "insertText": "translate-y-64",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-72",
    "insertText": "translate-y-72",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-80",
    "insertText": "translate-y-80",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-96",
    "insertText": "translate-y-96",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-auto",
    "insertText": "translate-y-auto",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-1/2",
    "insertText": "translate-y-1/2",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-1/3",
    "insertText": "translate-y-1/3",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-2/3",
    "insertText": "translate-y-2/3",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-1/4",
    "insertText": "translate-y-1/4",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-2/4",
    "insertText": "translate-y-2/4",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-3/4",
    "insertText": "translate-y-3/4",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-1/5",
    "insertText": "translate-y-1/5",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-full",
    "insertText": "translate-y-full",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-screen",
    "insertText": "translate-y-screen",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-min",
    "insertText": "translate-y-min",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-max",
    "insertText": "translate-y-max",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-translate-y-fit",
    "insertText": "translate-y-fit",
    "detail": "Tailwind translate-y",
    "kind": "snippet"
  },
  {
    "label": "tw-w-0",
    "insertText": "w-0",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-px",
    "insertText": "w-px",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-0.5",
    "insertText": "w-0.5",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-1",
    "insertText": "w-1",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-1.5",
    "insertText": "w-1.5",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-2",
    "insertText": "w-2",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-2.5",
    "insertText": "w-2.5",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-3",
    "insertText": "w-3",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-3.5",
    "insertText": "w-3.5",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-4",
    "insertText": "w-4",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-5",
    "insertText": "w-5",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-6",
    "insertText": "w-6",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-7",
    "insertText": "w-7",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-8",
    "insertText": "w-8",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-9",
    "insertText": "w-9",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-10",
    "insertText": "w-10",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-11",
    "insertText": "w-11",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-12",
    "insertText": "w-12",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-14",
    "insertText": "w-14",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-16",
    "insertText": "w-16",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-20",
    "insertText": "w-20",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-24",
    "insertText": "w-24",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-28",
    "insertText": "w-28",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-32",
    "insertText": "w-32",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-36",
    "insertText": "w-36",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-40",
    "insertText": "w-40",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-44",
    "insertText": "w-44",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-48",
    "insertText": "w-48",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-52",
    "insertText": "w-52",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-56",
    "insertText": "w-56",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-60",
    "insertText": "w-60",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-64",
    "insertText": "w-64",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-72",
    "insertText": "w-72",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-80",
    "insertText": "w-80",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-96",
    "insertText": "w-96",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-auto",
    "insertText": "w-auto",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-1/2",
    "insertText": "w-1/2",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-1/3",
    "insertText": "w-1/3",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-2/3",
    "insertText": "w-2/3",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-1/4",
    "insertText": "w-1/4",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-2/4",
    "insertText": "w-2/4",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-3/4",
    "insertText": "w-3/4",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-1/5",
    "insertText": "w-1/5",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-full",
    "insertText": "w-full",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-screen",
    "insertText": "w-screen",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-min",
    "insertText": "w-min",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-max",
    "insertText": "w-max",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-w-fit",
    "insertText": "w-fit",
    "detail": "Tailwind w",
    "kind": "snippet"
  },
  {
    "label": "tw-h-0",
    "insertText": "h-0",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-px",
    "insertText": "h-px",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-0.5",
    "insertText": "h-0.5",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-1",
    "insertText": "h-1",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-1.5",
    "insertText": "h-1.5",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-2",
    "insertText": "h-2",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-2.5",
    "insertText": "h-2.5",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-3",
    "insertText": "h-3",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-3.5",
    "insertText": "h-3.5",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-4",
    "insertText": "h-4",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-5",
    "insertText": "h-5",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-6",
    "insertText": "h-6",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-7",
    "insertText": "h-7",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-8",
    "insertText": "h-8",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-9",
    "insertText": "h-9",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-10",
    "insertText": "h-10",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-11",
    "insertText": "h-11",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-12",
    "insertText": "h-12",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-14",
    "insertText": "h-14",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-16",
    "insertText": "h-16",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-20",
    "insertText": "h-20",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-24",
    "insertText": "h-24",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-28",
    "insertText": "h-28",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-32",
    "insertText": "h-32",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-36",
    "insertText": "h-36",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-40",
    "insertText": "h-40",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-44",
    "insertText": "h-44",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-48",
    "insertText": "h-48",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-52",
    "insertText": "h-52",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-56",
    "insertText": "h-56",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-60",
    "insertText": "h-60",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-64",
    "insertText": "h-64",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-72",
    "insertText": "h-72",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-80",
    "insertText": "h-80",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-96",
    "insertText": "h-96",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-auto",
    "insertText": "h-auto",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-1/2",
    "insertText": "h-1/2",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-1/3",
    "insertText": "h-1/3",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-2/3",
    "insertText": "h-2/3",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-1/4",
    "insertText": "h-1/4",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-2/4",
    "insertText": "h-2/4",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-3/4",
    "insertText": "h-3/4",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-1/5",
    "insertText": "h-1/5",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-full",
    "insertText": "h-full",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-screen",
    "insertText": "h-screen",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-min",
    "insertText": "h-min",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-max",
    "insertText": "h-max",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-h-fit",
    "insertText": "h-fit",
    "detail": "Tailwind h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-0",
    "insertText": "min-w-0",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-px",
    "insertText": "min-w-px",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-0.5",
    "insertText": "min-w-0.5",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-1",
    "insertText": "min-w-1",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-1.5",
    "insertText": "min-w-1.5",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-2",
    "insertText": "min-w-2",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-2.5",
    "insertText": "min-w-2.5",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-3",
    "insertText": "min-w-3",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-3.5",
    "insertText": "min-w-3.5",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-4",
    "insertText": "min-w-4",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-5",
    "insertText": "min-w-5",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-6",
    "insertText": "min-w-6",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-7",
    "insertText": "min-w-7",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-8",
    "insertText": "min-w-8",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-9",
    "insertText": "min-w-9",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-10",
    "insertText": "min-w-10",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-11",
    "insertText": "min-w-11",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-12",
    "insertText": "min-w-12",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-14",
    "insertText": "min-w-14",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-16",
    "insertText": "min-w-16",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-20",
    "insertText": "min-w-20",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-24",
    "insertText": "min-w-24",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-28",
    "insertText": "min-w-28",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-32",
    "insertText": "min-w-32",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-36",
    "insertText": "min-w-36",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-40",
    "insertText": "min-w-40",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-44",
    "insertText": "min-w-44",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-48",
    "insertText": "min-w-48",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-52",
    "insertText": "min-w-52",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-56",
    "insertText": "min-w-56",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-60",
    "insertText": "min-w-60",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-64",
    "insertText": "min-w-64",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-72",
    "insertText": "min-w-72",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-80",
    "insertText": "min-w-80",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-96",
    "insertText": "min-w-96",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-auto",
    "insertText": "min-w-auto",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-1/2",
    "insertText": "min-w-1/2",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-1/3",
    "insertText": "min-w-1/3",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-2/3",
    "insertText": "min-w-2/3",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-1/4",
    "insertText": "min-w-1/4",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-2/4",
    "insertText": "min-w-2/4",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-3/4",
    "insertText": "min-w-3/4",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-1/5",
    "insertText": "min-w-1/5",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-full",
    "insertText": "min-w-full",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-screen",
    "insertText": "min-w-screen",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-min",
    "insertText": "min-w-min",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-max",
    "insertText": "min-w-max",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-w-fit",
    "insertText": "min-w-fit",
    "detail": "Tailwind min-w",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-0",
    "insertText": "min-h-0",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-px",
    "insertText": "min-h-px",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-0.5",
    "insertText": "min-h-0.5",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-1",
    "insertText": "min-h-1",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-1.5",
    "insertText": "min-h-1.5",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-2",
    "insertText": "min-h-2",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-2.5",
    "insertText": "min-h-2.5",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-3",
    "insertText": "min-h-3",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-3.5",
    "insertText": "min-h-3.5",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-4",
    "insertText": "min-h-4",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-5",
    "insertText": "min-h-5",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-6",
    "insertText": "min-h-6",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-7",
    "insertText": "min-h-7",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-8",
    "insertText": "min-h-8",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-9",
    "insertText": "min-h-9",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-10",
    "insertText": "min-h-10",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-11",
    "insertText": "min-h-11",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-12",
    "insertText": "min-h-12",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-14",
    "insertText": "min-h-14",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-16",
    "insertText": "min-h-16",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-20",
    "insertText": "min-h-20",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-24",
    "insertText": "min-h-24",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-28",
    "insertText": "min-h-28",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-32",
    "insertText": "min-h-32",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-36",
    "insertText": "min-h-36",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-40",
    "insertText": "min-h-40",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-44",
    "insertText": "min-h-44",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-48",
    "insertText": "min-h-48",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-52",
    "insertText": "min-h-52",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-56",
    "insertText": "min-h-56",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-60",
    "insertText": "min-h-60",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-64",
    "insertText": "min-h-64",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-72",
    "insertText": "min-h-72",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-80",
    "insertText": "min-h-80",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-96",
    "insertText": "min-h-96",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-auto",
    "insertText": "min-h-auto",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-1/2",
    "insertText": "min-h-1/2",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-1/3",
    "insertText": "min-h-1/3",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-2/3",
    "insertText": "min-h-2/3",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-1/4",
    "insertText": "min-h-1/4",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-2/4",
    "insertText": "min-h-2/4",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-3/4",
    "insertText": "min-h-3/4",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-1/5",
    "insertText": "min-h-1/5",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-full",
    "insertText": "min-h-full",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-screen",
    "insertText": "min-h-screen",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-min",
    "insertText": "min-h-min",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-max",
    "insertText": "min-h-max",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-min-h-fit",
    "insertText": "min-h-fit",
    "detail": "Tailwind min-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-0",
    "insertText": "max-w-0",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-px",
    "insertText": "max-w-px",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-0.5",
    "insertText": "max-w-0.5",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-1",
    "insertText": "max-w-1",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-1.5",
    "insertText": "max-w-1.5",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-2",
    "insertText": "max-w-2",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-2.5",
    "insertText": "max-w-2.5",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-3",
    "insertText": "max-w-3",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-3.5",
    "insertText": "max-w-3.5",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-4",
    "insertText": "max-w-4",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-5",
    "insertText": "max-w-5",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-6",
    "insertText": "max-w-6",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-7",
    "insertText": "max-w-7",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-8",
    "insertText": "max-w-8",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-9",
    "insertText": "max-w-9",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-10",
    "insertText": "max-w-10",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-11",
    "insertText": "max-w-11",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-12",
    "insertText": "max-w-12",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-14",
    "insertText": "max-w-14",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-16",
    "insertText": "max-w-16",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-20",
    "insertText": "max-w-20",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-24",
    "insertText": "max-w-24",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-28",
    "insertText": "max-w-28",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-32",
    "insertText": "max-w-32",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-36",
    "insertText": "max-w-36",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-40",
    "insertText": "max-w-40",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-44",
    "insertText": "max-w-44",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-48",
    "insertText": "max-w-48",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-52",
    "insertText": "max-w-52",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-56",
    "insertText": "max-w-56",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-60",
    "insertText": "max-w-60",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-64",
    "insertText": "max-w-64",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-72",
    "insertText": "max-w-72",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-80",
    "insertText": "max-w-80",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-96",
    "insertText": "max-w-96",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-auto",
    "insertText": "max-w-auto",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-1/2",
    "insertText": "max-w-1/2",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-1/3",
    "insertText": "max-w-1/3",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-2/3",
    "insertText": "max-w-2/3",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-1/4",
    "insertText": "max-w-1/4",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-2/4",
    "insertText": "max-w-2/4",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-3/4",
    "insertText": "max-w-3/4",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-1/5",
    "insertText": "max-w-1/5",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-full",
    "insertText": "max-w-full",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-screen",
    "insertText": "max-w-screen",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-min",
    "insertText": "max-w-min",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-max",
    "insertText": "max-w-max",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-w-fit",
    "insertText": "max-w-fit",
    "detail": "Tailwind max-w",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-0",
    "insertText": "max-h-0",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-px",
    "insertText": "max-h-px",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-0.5",
    "insertText": "max-h-0.5",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-1",
    "insertText": "max-h-1",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-1.5",
    "insertText": "max-h-1.5",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-2",
    "insertText": "max-h-2",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-2.5",
    "insertText": "max-h-2.5",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-3",
    "insertText": "max-h-3",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-3.5",
    "insertText": "max-h-3.5",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-4",
    "insertText": "max-h-4",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-5",
    "insertText": "max-h-5",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-6",
    "insertText": "max-h-6",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-7",
    "insertText": "max-h-7",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-8",
    "insertText": "max-h-8",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-9",
    "insertText": "max-h-9",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-10",
    "insertText": "max-h-10",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-11",
    "insertText": "max-h-11",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-12",
    "insertText": "max-h-12",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-14",
    "insertText": "max-h-14",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-16",
    "insertText": "max-h-16",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-20",
    "insertText": "max-h-20",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-24",
    "insertText": "max-h-24",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-28",
    "insertText": "max-h-28",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-32",
    "insertText": "max-h-32",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-36",
    "insertText": "max-h-36",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-40",
    "insertText": "max-h-40",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-44",
    "insertText": "max-h-44",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-48",
    "insertText": "max-h-48",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-52",
    "insertText": "max-h-52",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-56",
    "insertText": "max-h-56",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-60",
    "insertText": "max-h-60",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-64",
    "insertText": "max-h-64",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-72",
    "insertText": "max-h-72",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-80",
    "insertText": "max-h-80",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-96",
    "insertText": "max-h-96",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-auto",
    "insertText": "max-h-auto",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-1/2",
    "insertText": "max-h-1/2",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-1/3",
    "insertText": "max-h-1/3",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-2/3",
    "insertText": "max-h-2/3",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-1/4",
    "insertText": "max-h-1/4",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-2/4",
    "insertText": "max-h-2/4",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-3/4",
    "insertText": "max-h-3/4",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-1/5",
    "insertText": "max-h-1/5",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-full",
    "insertText": "max-h-full",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-screen",
    "insertText": "max-h-screen",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-min",
    "insertText": "max-h-min",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-max",
    "insertText": "max-h-max",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-max-h-fit",
    "insertText": "max-h-fit",
    "detail": "Tailwind max-h",
    "kind": "snippet"
  },
  {
    "label": "tw-flex",
    "insertText": "flex",
    "detail": "Tailwind flex",
    "kind": "snippet"
  },
  {
    "label": "tw-inline-flex",
    "insertText": "inline-flex",
    "detail": "Tailwind inline-flex",
    "kind": "snippet"
  },
  {
    "label": "tw-grid",
    "insertText": "grid",
    "detail": "Tailwind grid",
    "kind": "snippet"
  },
  {
    "label": "tw-hidden",
    "insertText": "hidden",
    "detail": "Tailwind hidden",
    "kind": "snippet"
  },
  {
    "label": "tw-block",
    "insertText": "block",
    "detail": "Tailwind block",
    "kind": "snippet"
  },
  {
    "label": "tw-inline-block",
    "insertText": "inline-block",
    "detail": "Tailwind inline-block",
    "kind": "snippet"
  },
  {
    "label": "tw-absolute",
    "insertText": "absolute",
    "detail": "Tailwind absolute",
    "kind": "snippet"
  },
  {
    "label": "tw-relative",
    "insertText": "relative",
    "detail": "Tailwind relative",
    "kind": "snippet"
  },
  {
    "label": "tw-fixed",
    "insertText": "fixed",
    "detail": "Tailwind fixed",
    "kind": "snippet"
  },
  {
    "label": "tw-sticky",
    "insertText": "sticky",
    "detail": "Tailwind sticky",
    "kind": "snippet"
  },
  {
    "label": "tw-static",
    "insertText": "static",
    "detail": "Tailwind static",
    "kind": "snippet"
  },
  {
    "label": "tw-italic",
    "insertText": "italic",
    "detail": "Tailwind italic",
    "kind": "snippet"
  },
  {
    "label": "tw-uppercase",
    "insertText": "uppercase",
    "detail": "Tailwind uppercase",
    "kind": "snippet"
  },
  {
    "label": "tw-lowercase",
    "insertText": "lowercase",
    "detail": "Tailwind lowercase",
    "kind": "snippet"
  },
  {
    "label": "tw-capitalize",
    "insertText": "capitalize",
    "detail": "Tailwind capitalize",
    "kind": "snippet"
  },
  {
    "label": "tw-normal-nums",
    "insertText": "normal-nums",
    "detail": "Tailwind normal-nums",
    "kind": "snippet"
  },
  {
    "label": "tw-truncate",
    "insertText": "truncate",
    "detail": "Tailwind truncate",
    "kind": "snippet"
  },
  {
    "label": "tw-sr-only",
    "insertText": "sr-only",
    "detail": "Tailwind sr-only",
    "kind": "snippet"
  },
  {
    "label": "tw-not-sr-only",
    "insertText": "not-sr-only",
    "detail": "Tailwind not-sr-only",
    "kind": "snippet"
  },
  {
    "label": "tw-antialiased",
    "insertText": "antialiased",
    "detail": "Tailwind antialiased",
    "kind": "snippet"
  },
  {
    "label": "tw-subpixel-antialiased",
    "insertText": "subpixel-antialiased",
    "detail": "Tailwind subpixel-antialiased",
    "kind": "snippet"
  },
  {
    "label": "tw-break-normal",
    "insertText": "break-normal",
    "detail": "Tailwind break-normal",
    "kind": "snippet"
  },
  {
    "label": "tw-break-words",
    "insertText": "break-words",
    "detail": "Tailwind break-words",
    "kind": "snippet"
  },
  {
    "label": "tw-break-all",
    "insertText": "break-all",
    "detail": "Tailwind break-all",
    "kind": "snippet"
  },
  {
    "label": "Icon: HomeIcon",
    "insertText": "<HomeIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component HomeIcon",
    "kind": "snippet"
  },
  {
    "label": "import { HomeIcon }",
    "insertText": "import { HomeIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: HomeOutline",
    "insertText": "<HomeOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component HomeOutline",
    "kind": "snippet"
  },
  {
    "label": "import { HomeOutline }",
    "insertText": "import { HomeOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: HomeSolid",
    "insertText": "<HomeSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component HomeSolid",
    "kind": "snippet"
  },
  {
    "label": "import { HomeSolid }",
    "insertText": "import { HomeSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: UserIcon",
    "insertText": "<UserIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component UserIcon",
    "kind": "snippet"
  },
  {
    "label": "import { UserIcon }",
    "insertText": "import { UserIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: UserOutline",
    "insertText": "<UserOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component UserOutline",
    "kind": "snippet"
  },
  {
    "label": "import { UserOutline }",
    "insertText": "import { UserOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: UserSolid",
    "insertText": "<UserSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component UserSolid",
    "kind": "snippet"
  },
  {
    "label": "import { UserSolid }",
    "insertText": "import { UserSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: SettingsIcon",
    "insertText": "<SettingsIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component SettingsIcon",
    "kind": "snippet"
  },
  {
    "label": "import { SettingsIcon }",
    "insertText": "import { SettingsIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: SettingsOutline",
    "insertText": "<SettingsOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component SettingsOutline",
    "kind": "snippet"
  },
  {
    "label": "import { SettingsOutline }",
    "insertText": "import { SettingsOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: SettingsSolid",
    "insertText": "<SettingsSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component SettingsSolid",
    "kind": "snippet"
  },
  {
    "label": "import { SettingsSolid }",
    "insertText": "import { SettingsSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MenuIcon",
    "insertText": "<MenuIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MenuIcon",
    "kind": "snippet"
  },
  {
    "label": "import { MenuIcon }",
    "insertText": "import { MenuIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MenuOutline",
    "insertText": "<MenuOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MenuOutline",
    "kind": "snippet"
  },
  {
    "label": "import { MenuOutline }",
    "insertText": "import { MenuOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MenuSolid",
    "insertText": "<MenuSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MenuSolid",
    "kind": "snippet"
  },
  {
    "label": "import { MenuSolid }",
    "insertText": "import { MenuSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: XIcon",
    "insertText": "<XIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component XIcon",
    "kind": "snippet"
  },
  {
    "label": "import { XIcon }",
    "insertText": "import { XIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: XOutline",
    "insertText": "<XOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component XOutline",
    "kind": "snippet"
  },
  {
    "label": "import { XOutline }",
    "insertText": "import { XOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: XSolid",
    "insertText": "<XSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component XSolid",
    "kind": "snippet"
  },
  {
    "label": "import { XSolid }",
    "insertText": "import { XSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: CheckIcon",
    "insertText": "<CheckIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component CheckIcon",
    "kind": "snippet"
  },
  {
    "label": "import { CheckIcon }",
    "insertText": "import { CheckIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: CheckOutline",
    "insertText": "<CheckOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component CheckOutline",
    "kind": "snippet"
  },
  {
    "label": "import { CheckOutline }",
    "insertText": "import { CheckOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: CheckSolid",
    "insertText": "<CheckSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component CheckSolid",
    "kind": "snippet"
  },
  {
    "label": "import { CheckSolid }",
    "insertText": "import { CheckSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: SearchIcon",
    "insertText": "<SearchIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component SearchIcon",
    "kind": "snippet"
  },
  {
    "label": "import { SearchIcon }",
    "insertText": "import { SearchIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: SearchOutline",
    "insertText": "<SearchOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component SearchOutline",
    "kind": "snippet"
  },
  {
    "label": "import { SearchOutline }",
    "insertText": "import { SearchOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: SearchSolid",
    "insertText": "<SearchSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component SearchSolid",
    "kind": "snippet"
  },
  {
    "label": "import { SearchSolid }",
    "insertText": "import { SearchSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BellIcon",
    "insertText": "<BellIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BellIcon",
    "kind": "snippet"
  },
  {
    "label": "import { BellIcon }",
    "insertText": "import { BellIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BellOutline",
    "insertText": "<BellOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BellOutline",
    "kind": "snippet"
  },
  {
    "label": "import { BellOutline }",
    "insertText": "import { BellOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BellSolid",
    "insertText": "<BellSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BellSolid",
    "kind": "snippet"
  },
  {
    "label": "import { BellSolid }",
    "insertText": "import { BellSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MailIcon",
    "insertText": "<MailIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MailIcon",
    "kind": "snippet"
  },
  {
    "label": "import { MailIcon }",
    "insertText": "import { MailIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MailOutline",
    "insertText": "<MailOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MailOutline",
    "kind": "snippet"
  },
  {
    "label": "import { MailOutline }",
    "insertText": "import { MailOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MailSolid",
    "insertText": "<MailSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MailSolid",
    "kind": "snippet"
  },
  {
    "label": "import { MailSolid }",
    "insertText": "import { MailSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: HeartIcon",
    "insertText": "<HeartIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component HeartIcon",
    "kind": "snippet"
  },
  {
    "label": "import { HeartIcon }",
    "insertText": "import { HeartIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: HeartOutline",
    "insertText": "<HeartOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component HeartOutline",
    "kind": "snippet"
  },
  {
    "label": "import { HeartOutline }",
    "insertText": "import { HeartOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: HeartSolid",
    "insertText": "<HeartSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component HeartSolid",
    "kind": "snippet"
  },
  {
    "label": "import { HeartSolid }",
    "insertText": "import { HeartSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: StarIcon",
    "insertText": "<StarIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component StarIcon",
    "kind": "snippet"
  },
  {
    "label": "import { StarIcon }",
    "insertText": "import { StarIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: StarOutline",
    "insertText": "<StarOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component StarOutline",
    "kind": "snippet"
  },
  {
    "label": "import { StarOutline }",
    "insertText": "import { StarOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: StarSolid",
    "insertText": "<StarSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component StarSolid",
    "kind": "snippet"
  },
  {
    "label": "import { StarSolid }",
    "insertText": "import { StarSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: CameraIcon",
    "insertText": "<CameraIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component CameraIcon",
    "kind": "snippet"
  },
  {
    "label": "import { CameraIcon }",
    "insertText": "import { CameraIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: CameraOutline",
    "insertText": "<CameraOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component CameraOutline",
    "kind": "snippet"
  },
  {
    "label": "import { CameraOutline }",
    "insertText": "import { CameraOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: CameraSolid",
    "insertText": "<CameraSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component CameraSolid",
    "kind": "snippet"
  },
  {
    "label": "import { CameraSolid }",
    "insertText": "import { CameraSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MapIcon",
    "insertText": "<MapIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MapIcon",
    "kind": "snippet"
  },
  {
    "label": "import { MapIcon }",
    "insertText": "import { MapIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MapOutline",
    "insertText": "<MapOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MapOutline",
    "kind": "snippet"
  },
  {
    "label": "import { MapOutline }",
    "insertText": "import { MapOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MapSolid",
    "insertText": "<MapSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MapSolid",
    "kind": "snippet"
  },
  {
    "label": "import { MapSolid }",
    "insertText": "import { MapSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: CalendarIcon",
    "insertText": "<CalendarIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component CalendarIcon",
    "kind": "snippet"
  },
  {
    "label": "import { CalendarIcon }",
    "insertText": "import { CalendarIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: CalendarOutline",
    "insertText": "<CalendarOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component CalendarOutline",
    "kind": "snippet"
  },
  {
    "label": "import { CalendarOutline }",
    "insertText": "import { CalendarOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: CalendarSolid",
    "insertText": "<CalendarSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component CalendarSolid",
    "kind": "snippet"
  },
  {
    "label": "import { CalendarSolid }",
    "insertText": "import { CalendarSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ClockIcon",
    "insertText": "<ClockIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ClockIcon",
    "kind": "snippet"
  },
  {
    "label": "import { ClockIcon }",
    "insertText": "import { ClockIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ClockOutline",
    "insertText": "<ClockOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ClockOutline",
    "kind": "snippet"
  },
  {
    "label": "import { ClockOutline }",
    "insertText": "import { ClockOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ClockSolid",
    "insertText": "<ClockSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ClockSolid",
    "kind": "snippet"
  },
  {
    "label": "import { ClockSolid }",
    "insertText": "import { ClockSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: TrashIcon",
    "insertText": "<TrashIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component TrashIcon",
    "kind": "snippet"
  },
  {
    "label": "import { TrashIcon }",
    "insertText": "import { TrashIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: TrashOutline",
    "insertText": "<TrashOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component TrashOutline",
    "kind": "snippet"
  },
  {
    "label": "import { TrashOutline }",
    "insertText": "import { TrashOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: TrashSolid",
    "insertText": "<TrashSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component TrashSolid",
    "kind": "snippet"
  },
  {
    "label": "import { TrashSolid }",
    "insertText": "import { TrashSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: EditIcon",
    "insertText": "<EditIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component EditIcon",
    "kind": "snippet"
  },
  {
    "label": "import { EditIcon }",
    "insertText": "import { EditIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: EditOutline",
    "insertText": "<EditOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component EditOutline",
    "kind": "snippet"
  },
  {
    "label": "import { EditOutline }",
    "insertText": "import { EditOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: EditSolid",
    "insertText": "<EditSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component EditSolid",
    "kind": "snippet"
  },
  {
    "label": "import { EditSolid }",
    "insertText": "import { EditSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: PlusIcon",
    "insertText": "<PlusIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component PlusIcon",
    "kind": "snippet"
  },
  {
    "label": "import { PlusIcon }",
    "insertText": "import { PlusIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: PlusOutline",
    "insertText": "<PlusOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component PlusOutline",
    "kind": "snippet"
  },
  {
    "label": "import { PlusOutline }",
    "insertText": "import { PlusOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: PlusSolid",
    "insertText": "<PlusSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component PlusSolid",
    "kind": "snippet"
  },
  {
    "label": "import { PlusSolid }",
    "insertText": "import { PlusSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MinusIcon",
    "insertText": "<MinusIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MinusIcon",
    "kind": "snippet"
  },
  {
    "label": "import { MinusIcon }",
    "insertText": "import { MinusIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MinusOutline",
    "insertText": "<MinusOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MinusOutline",
    "kind": "snippet"
  },
  {
    "label": "import { MinusOutline }",
    "insertText": "import { MinusOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MinusSolid",
    "insertText": "<MinusSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MinusSolid",
    "kind": "snippet"
  },
  {
    "label": "import { MinusSolid }",
    "insertText": "import { MinusSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ChevronLeftIcon",
    "insertText": "<ChevronLeftIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ChevronLeftIcon",
    "kind": "snippet"
  },
  {
    "label": "import { ChevronLeftIcon }",
    "insertText": "import { ChevronLeftIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ChevronLeftOutline",
    "insertText": "<ChevronLeftOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ChevronLeftOutline",
    "kind": "snippet"
  },
  {
    "label": "import { ChevronLeftOutline }",
    "insertText": "import { ChevronLeftOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ChevronLeftSolid",
    "insertText": "<ChevronLeftSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ChevronLeftSolid",
    "kind": "snippet"
  },
  {
    "label": "import { ChevronLeftSolid }",
    "insertText": "import { ChevronLeftSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ChevronRightIcon",
    "insertText": "<ChevronRightIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ChevronRightIcon",
    "kind": "snippet"
  },
  {
    "label": "import { ChevronRightIcon }",
    "insertText": "import { ChevronRightIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ChevronRightOutline",
    "insertText": "<ChevronRightOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ChevronRightOutline",
    "kind": "snippet"
  },
  {
    "label": "import { ChevronRightOutline }",
    "insertText": "import { ChevronRightOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ChevronRightSolid",
    "insertText": "<ChevronRightSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ChevronRightSolid",
    "kind": "snippet"
  },
  {
    "label": "import { ChevronRightSolid }",
    "insertText": "import { ChevronRightSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ChevronUpIcon",
    "insertText": "<ChevronUpIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ChevronUpIcon",
    "kind": "snippet"
  },
  {
    "label": "import { ChevronUpIcon }",
    "insertText": "import { ChevronUpIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ChevronUpOutline",
    "insertText": "<ChevronUpOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ChevronUpOutline",
    "kind": "snippet"
  },
  {
    "label": "import { ChevronUpOutline }",
    "insertText": "import { ChevronUpOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ChevronUpSolid",
    "insertText": "<ChevronUpSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ChevronUpSolid",
    "kind": "snippet"
  },
  {
    "label": "import { ChevronUpSolid }",
    "insertText": "import { ChevronUpSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ChevronDownIcon",
    "insertText": "<ChevronDownIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ChevronDownIcon",
    "kind": "snippet"
  },
  {
    "label": "import { ChevronDownIcon }",
    "insertText": "import { ChevronDownIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ChevronDownOutline",
    "insertText": "<ChevronDownOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ChevronDownOutline",
    "kind": "snippet"
  },
  {
    "label": "import { ChevronDownOutline }",
    "insertText": "import { ChevronDownOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ChevronDownSolid",
    "insertText": "<ChevronDownSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ChevronDownSolid",
    "kind": "snippet"
  },
  {
    "label": "import { ChevronDownSolid }",
    "insertText": "import { ChevronDownSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ArrowLeftIcon",
    "insertText": "<ArrowLeftIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ArrowLeftIcon",
    "kind": "snippet"
  },
  {
    "label": "import { ArrowLeftIcon }",
    "insertText": "import { ArrowLeftIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ArrowLeftOutline",
    "insertText": "<ArrowLeftOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ArrowLeftOutline",
    "kind": "snippet"
  },
  {
    "label": "import { ArrowLeftOutline }",
    "insertText": "import { ArrowLeftOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ArrowLeftSolid",
    "insertText": "<ArrowLeftSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ArrowLeftSolid",
    "kind": "snippet"
  },
  {
    "label": "import { ArrowLeftSolid }",
    "insertText": "import { ArrowLeftSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ArrowRightIcon",
    "insertText": "<ArrowRightIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ArrowRightIcon",
    "kind": "snippet"
  },
  {
    "label": "import { ArrowRightIcon }",
    "insertText": "import { ArrowRightIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ArrowRightOutline",
    "insertText": "<ArrowRightOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ArrowRightOutline",
    "kind": "snippet"
  },
  {
    "label": "import { ArrowRightOutline }",
    "insertText": "import { ArrowRightOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ArrowRightSolid",
    "insertText": "<ArrowRightSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ArrowRightSolid",
    "kind": "snippet"
  },
  {
    "label": "import { ArrowRightSolid }",
    "insertText": "import { ArrowRightSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ArrowUpIcon",
    "insertText": "<ArrowUpIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ArrowUpIcon",
    "kind": "snippet"
  },
  {
    "label": "import { ArrowUpIcon }",
    "insertText": "import { ArrowUpIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ArrowUpOutline",
    "insertText": "<ArrowUpOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ArrowUpOutline",
    "kind": "snippet"
  },
  {
    "label": "import { ArrowUpOutline }",
    "insertText": "import { ArrowUpOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ArrowUpSolid",
    "insertText": "<ArrowUpSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ArrowUpSolid",
    "kind": "snippet"
  },
  {
    "label": "import { ArrowUpSolid }",
    "insertText": "import { ArrowUpSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ArrowDownIcon",
    "insertText": "<ArrowDownIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ArrowDownIcon",
    "kind": "snippet"
  },
  {
    "label": "import { ArrowDownIcon }",
    "insertText": "import { ArrowDownIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ArrowDownOutline",
    "insertText": "<ArrowDownOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ArrowDownOutline",
    "kind": "snippet"
  },
  {
    "label": "import { ArrowDownOutline }",
    "insertText": "import { ArrowDownOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: ArrowDownSolid",
    "insertText": "<ArrowDownSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component ArrowDownSolid",
    "kind": "snippet"
  },
  {
    "label": "import { ArrowDownSolid }",
    "insertText": "import { ArrowDownSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: PlayIcon",
    "insertText": "<PlayIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component PlayIcon",
    "kind": "snippet"
  },
  {
    "label": "import { PlayIcon }",
    "insertText": "import { PlayIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: PlayOutline",
    "insertText": "<PlayOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component PlayOutline",
    "kind": "snippet"
  },
  {
    "label": "import { PlayOutline }",
    "insertText": "import { PlayOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: PlaySolid",
    "insertText": "<PlaySolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component PlaySolid",
    "kind": "snippet"
  },
  {
    "label": "import { PlaySolid }",
    "insertText": "import { PlaySolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: PauseIcon",
    "insertText": "<PauseIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component PauseIcon",
    "kind": "snippet"
  },
  {
    "label": "import { PauseIcon }",
    "insertText": "import { PauseIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: PauseOutline",
    "insertText": "<PauseOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component PauseOutline",
    "kind": "snippet"
  },
  {
    "label": "import { PauseOutline }",
    "insertText": "import { PauseOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: PauseSolid",
    "insertText": "<PauseSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component PauseSolid",
    "kind": "snippet"
  },
  {
    "label": "import { PauseSolid }",
    "insertText": "import { PauseSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: StopIcon",
    "insertText": "<StopIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component StopIcon",
    "kind": "snippet"
  },
  {
    "label": "import { StopIcon }",
    "insertText": "import { StopIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: StopOutline",
    "insertText": "<StopOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component StopOutline",
    "kind": "snippet"
  },
  {
    "label": "import { StopOutline }",
    "insertText": "import { StopOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: StopSolid",
    "insertText": "<StopSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component StopSolid",
    "kind": "snippet"
  },
  {
    "label": "import { StopSolid }",
    "insertText": "import { StopSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: VolumeXIcon",
    "insertText": "<VolumeXIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component VolumeXIcon",
    "kind": "snippet"
  },
  {
    "label": "import { VolumeXIcon }",
    "insertText": "import { VolumeXIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: VolumeXOutline",
    "insertText": "<VolumeXOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component VolumeXOutline",
    "kind": "snippet"
  },
  {
    "label": "import { VolumeXOutline }",
    "insertText": "import { VolumeXOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: VolumeXSolid",
    "insertText": "<VolumeXSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component VolumeXSolid",
    "kind": "snippet"
  },
  {
    "label": "import { VolumeXSolid }",
    "insertText": "import { VolumeXSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: Volume2Icon",
    "insertText": "<Volume2Icon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component Volume2Icon",
    "kind": "snippet"
  },
  {
    "label": "import { Volume2Icon }",
    "insertText": "import { Volume2Icon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: Volume2Outline",
    "insertText": "<Volume2Outline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component Volume2Outline",
    "kind": "snippet"
  },
  {
    "label": "import { Volume2Outline }",
    "insertText": "import { Volume2Outline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: Volume2Solid",
    "insertText": "<Volume2Solid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component Volume2Solid",
    "kind": "snippet"
  },
  {
    "label": "import { Volume2Solid }",
    "insertText": "import { Volume2Solid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MicIcon",
    "insertText": "<MicIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MicIcon",
    "kind": "snippet"
  },
  {
    "label": "import { MicIcon }",
    "insertText": "import { MicIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MicOutline",
    "insertText": "<MicOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MicOutline",
    "kind": "snippet"
  },
  {
    "label": "import { MicOutline }",
    "insertText": "import { MicOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MicSolid",
    "insertText": "<MicSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MicSolid",
    "kind": "snippet"
  },
  {
    "label": "import { MicSolid }",
    "insertText": "import { MicSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MicOffIcon",
    "insertText": "<MicOffIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MicOffIcon",
    "kind": "snippet"
  },
  {
    "label": "import { MicOffIcon }",
    "insertText": "import { MicOffIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MicOffOutline",
    "insertText": "<MicOffOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MicOffOutline",
    "kind": "snippet"
  },
  {
    "label": "import { MicOffOutline }",
    "insertText": "import { MicOffOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MicOffSolid",
    "insertText": "<MicOffSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MicOffSolid",
    "kind": "snippet"
  },
  {
    "label": "import { MicOffSolid }",
    "insertText": "import { MicOffSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: VideoIcon",
    "insertText": "<VideoIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component VideoIcon",
    "kind": "snippet"
  },
  {
    "label": "import { VideoIcon }",
    "insertText": "import { VideoIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: VideoOutline",
    "insertText": "<VideoOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component VideoOutline",
    "kind": "snippet"
  },
  {
    "label": "import { VideoOutline }",
    "insertText": "import { VideoOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: VideoSolid",
    "insertText": "<VideoSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component VideoSolid",
    "kind": "snippet"
  },
  {
    "label": "import { VideoSolid }",
    "insertText": "import { VideoSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: VideoOffIcon",
    "insertText": "<VideoOffIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component VideoOffIcon",
    "kind": "snippet"
  },
  {
    "label": "import { VideoOffIcon }",
    "insertText": "import { VideoOffIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: VideoOffOutline",
    "insertText": "<VideoOffOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component VideoOffOutline",
    "kind": "snippet"
  },
  {
    "label": "import { VideoOffOutline }",
    "insertText": "import { VideoOffOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: VideoOffSolid",
    "insertText": "<VideoOffSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component VideoOffSolid",
    "kind": "snippet"
  },
  {
    "label": "import { VideoOffSolid }",
    "insertText": "import { VideoOffSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MonitorIcon",
    "insertText": "<MonitorIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MonitorIcon",
    "kind": "snippet"
  },
  {
    "label": "import { MonitorIcon }",
    "insertText": "import { MonitorIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MonitorOutline",
    "insertText": "<MonitorOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MonitorOutline",
    "kind": "snippet"
  },
  {
    "label": "import { MonitorOutline }",
    "insertText": "import { MonitorOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: MonitorSolid",
    "insertText": "<MonitorSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component MonitorSolid",
    "kind": "snippet"
  },
  {
    "label": "import { MonitorSolid }",
    "insertText": "import { MonitorSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: SmartphoneIcon",
    "insertText": "<SmartphoneIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component SmartphoneIcon",
    "kind": "snippet"
  },
  {
    "label": "import { SmartphoneIcon }",
    "insertText": "import { SmartphoneIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: SmartphoneOutline",
    "insertText": "<SmartphoneOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component SmartphoneOutline",
    "kind": "snippet"
  },
  {
    "label": "import { SmartphoneOutline }",
    "insertText": "import { SmartphoneOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: SmartphoneSolid",
    "insertText": "<SmartphoneSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component SmartphoneSolid",
    "kind": "snippet"
  },
  {
    "label": "import { SmartphoneSolid }",
    "insertText": "import { SmartphoneSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: TabletIcon",
    "insertText": "<TabletIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component TabletIcon",
    "kind": "snippet"
  },
  {
    "label": "import { TabletIcon }",
    "insertText": "import { TabletIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: TabletOutline",
    "insertText": "<TabletOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component TabletOutline",
    "kind": "snippet"
  },
  {
    "label": "import { TabletOutline }",
    "insertText": "import { TabletOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: TabletSolid",
    "insertText": "<TabletSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component TabletSolid",
    "kind": "snippet"
  },
  {
    "label": "import { TabletSolid }",
    "insertText": "import { TabletSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: LaptopIcon",
    "insertText": "<LaptopIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component LaptopIcon",
    "kind": "snippet"
  },
  {
    "label": "import { LaptopIcon }",
    "insertText": "import { LaptopIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: LaptopOutline",
    "insertText": "<LaptopOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component LaptopOutline",
    "kind": "snippet"
  },
  {
    "label": "import { LaptopOutline }",
    "insertText": "import { LaptopOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: LaptopSolid",
    "insertText": "<LaptopSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component LaptopSolid",
    "kind": "snippet"
  },
  {
    "label": "import { LaptopSolid }",
    "insertText": "import { LaptopSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: WatchIcon",
    "insertText": "<WatchIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component WatchIcon",
    "kind": "snippet"
  },
  {
    "label": "import { WatchIcon }",
    "insertText": "import { WatchIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: WatchOutline",
    "insertText": "<WatchOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component WatchOutline",
    "kind": "snippet"
  },
  {
    "label": "import { WatchOutline }",
    "insertText": "import { WatchOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: WatchSolid",
    "insertText": "<WatchSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component WatchSolid",
    "kind": "snippet"
  },
  {
    "label": "import { WatchSolid }",
    "insertText": "import { WatchSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: HeadphonesIcon",
    "insertText": "<HeadphonesIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component HeadphonesIcon",
    "kind": "snippet"
  },
  {
    "label": "import { HeadphonesIcon }",
    "insertText": "import { HeadphonesIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: HeadphonesOutline",
    "insertText": "<HeadphonesOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component HeadphonesOutline",
    "kind": "snippet"
  },
  {
    "label": "import { HeadphonesOutline }",
    "insertText": "import { HeadphonesOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: HeadphonesSolid",
    "insertText": "<HeadphonesSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component HeadphonesSolid",
    "kind": "snippet"
  },
  {
    "label": "import { HeadphonesSolid }",
    "insertText": "import { HeadphonesSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: SpeakerIcon",
    "insertText": "<SpeakerIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component SpeakerIcon",
    "kind": "snippet"
  },
  {
    "label": "import { SpeakerIcon }",
    "insertText": "import { SpeakerIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: SpeakerOutline",
    "insertText": "<SpeakerOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component SpeakerOutline",
    "kind": "snippet"
  },
  {
    "label": "import { SpeakerOutline }",
    "insertText": "import { SpeakerOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: SpeakerSolid",
    "insertText": "<SpeakerSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component SpeakerSolid",
    "kind": "snippet"
  },
  {
    "label": "import { SpeakerSolid }",
    "insertText": "import { SpeakerSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: WifiIcon",
    "insertText": "<WifiIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component WifiIcon",
    "kind": "snippet"
  },
  {
    "label": "import { WifiIcon }",
    "insertText": "import { WifiIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: WifiOutline",
    "insertText": "<WifiOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component WifiOutline",
    "kind": "snippet"
  },
  {
    "label": "import { WifiOutline }",
    "insertText": "import { WifiOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: WifiSolid",
    "insertText": "<WifiSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component WifiSolid",
    "kind": "snippet"
  },
  {
    "label": "import { WifiSolid }",
    "insertText": "import { WifiSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BluetoothIcon",
    "insertText": "<BluetoothIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BluetoothIcon",
    "kind": "snippet"
  },
  {
    "label": "import { BluetoothIcon }",
    "insertText": "import { BluetoothIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BluetoothOutline",
    "insertText": "<BluetoothOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BluetoothOutline",
    "kind": "snippet"
  },
  {
    "label": "import { BluetoothOutline }",
    "insertText": "import { BluetoothOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BluetoothSolid",
    "insertText": "<BluetoothSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BluetoothSolid",
    "kind": "snippet"
  },
  {
    "label": "import { BluetoothSolid }",
    "insertText": "import { BluetoothSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BatteryIcon",
    "insertText": "<BatteryIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BatteryIcon",
    "kind": "snippet"
  },
  {
    "label": "import { BatteryIcon }",
    "insertText": "import { BatteryIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BatteryOutline",
    "insertText": "<BatteryOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BatteryOutline",
    "kind": "snippet"
  },
  {
    "label": "import { BatteryOutline }",
    "insertText": "import { BatteryOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BatterySolid",
    "insertText": "<BatterySolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BatterySolid",
    "kind": "snippet"
  },
  {
    "label": "import { BatterySolid }",
    "insertText": "import { BatterySolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BatteryChargingIcon",
    "insertText": "<BatteryChargingIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BatteryChargingIcon",
    "kind": "snippet"
  },
  {
    "label": "import { BatteryChargingIcon }",
    "insertText": "import { BatteryChargingIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BatteryChargingOutline",
    "insertText": "<BatteryChargingOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BatteryChargingOutline",
    "kind": "snippet"
  },
  {
    "label": "import { BatteryChargingOutline }",
    "insertText": "import { BatteryChargingOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BatteryChargingSolid",
    "insertText": "<BatteryChargingSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BatteryChargingSolid",
    "kind": "snippet"
  },
  {
    "label": "import { BatteryChargingSolid }",
    "insertText": "import { BatteryChargingSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BatteryFullIcon",
    "insertText": "<BatteryFullIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BatteryFullIcon",
    "kind": "snippet"
  },
  {
    "label": "import { BatteryFullIcon }",
    "insertText": "import { BatteryFullIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BatteryFullOutline",
    "insertText": "<BatteryFullOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BatteryFullOutline",
    "kind": "snippet"
  },
  {
    "label": "import { BatteryFullOutline }",
    "insertText": "import { BatteryFullOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BatteryFullSolid",
    "insertText": "<BatteryFullSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BatteryFullSolid",
    "kind": "snippet"
  },
  {
    "label": "import { BatteryFullSolid }",
    "insertText": "import { BatteryFullSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BatteryLowIcon",
    "insertText": "<BatteryLowIcon className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BatteryLowIcon",
    "kind": "snippet"
  },
  {
    "label": "import { BatteryLowIcon }",
    "insertText": "import { BatteryLowIcon } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BatteryLowOutline",
    "insertText": "<BatteryLowOutline className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BatteryLowOutline",
    "kind": "snippet"
  },
  {
    "label": "import { BatteryLowOutline }",
    "insertText": "import { BatteryLowOutline } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "Icon: BatteryLowSolid",
    "insertText": "<BatteryLowSolid className=\"${1:w-6 h-6}\" />",
    "detail": "Icon Component BatteryLowSolid",
    "kind": "snippet"
  },
  {
    "label": "import { BatteryLowSolid }",
    "insertText": "import { BatteryLowSolid } from 'lucide-react';",
    "detail": "Icon Lucide Import",
    "kind": "snippet"
  },
  {
    "label": "react-router: Link",
    "insertText": "Link",
    "detail": "React Router component Link",
    "kind": "snippet"
  },
  {
    "label": "react-router: Route",
    "insertText": "Route",
    "detail": "React Router component Route",
    "kind": "snippet"
  },
  {
    "label": "react-router: Routes",
    "insertText": "Routes",
    "detail": "React Router component Routes",
    "kind": "snippet"
  },
  {
    "label": "react-router: BrowserRouer",
    "insertText": "BrowserRouer",
    "detail": "React Router component BrowserRouer",
    "kind": "snippet"
  },
  {
    "label": "react-router: Navigate",
    "insertText": "Navigate",
    "detail": "React Router component Navigate",
    "kind": "snippet"
  },
  {
    "label": "react-router: Outlet",
    "insertText": "Outlet",
    "detail": "React Router component Outlet",
    "kind": "snippet"
  },
  {
    "label": "react-router: useNavigate",
    "insertText": "useNavigate",
    "detail": "React Router component useNavigate",
    "kind": "snippet"
  },
  {
    "label": "react-router: useLocation",
    "insertText": "useLocation",
    "detail": "React Router component useLocation",
    "kind": "snippet"
  },
  {
    "label": "react-router: useParams",
    "insertText": "useParams",
    "detail": "React Router component useParams",
    "kind": "snippet"
  },
  {
    "label": "react-router: useSearchParams",
    "insertText": "useSearchParams",
    "detail": "React Router component useSearchParams",
    "kind": "snippet"
  }
];\n  \n  api.completions.register('javascript', snippets);\n  api.completions.register('javascriptreact', snippets);\n  api.completions.register('typescript', snippets);\n  api.completions.register('typescriptreact', snippets);\n  \n  api.commands.register('run-tests', () => {\n    api.notifications.info('Started test runner for react-craft environment.');\n  });\n  \n  api.notifications.info('React Craft activated! Loaded massive amount of snippets.');\n}\n