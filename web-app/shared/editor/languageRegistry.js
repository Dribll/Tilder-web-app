function nativeLanguage(id, aliases, extensions, detail, extras = {}) {
  return {
    id,
    aliases,
    extensions,
    supportLevel: 'native',
    detail,
    ...extras,
  };
}

function lspLanguage(id, aliases, extensions, serverLabel, serverCommands, serverArgs, rootPatterns, extras = {}) {
  return {
    id,
    aliases,
    extensions,
    supportLevel: 'lsp',
    serverLabel,
    serverCommands,
    serverArgs,
    rootPatterns,
    ...extras,
  };
}

function basicLanguage(id, aliases, extensions, extras = {}) {
  return {
    id,
    aliases,
    extensions,
    supportLevel: 'basic',
    detail: 'Syntax highlighting, language mode detection, and editor basics are available.',
    ...extras,
  };
}

const nativeLanguages = [
  nativeLanguage('html', ['HTML'], ['.html', '.htm', '.xhtml', '.vue', '.svelte', '.astro'], 'Native Monaco HTML language service.', {
    family: 'markup',
  }),
  nativeLanguage('css', ['CSS'], ['.css'], 'Native Monaco CSS language service.', {
    family: 'stylesheet',
  }),
  nativeLanguage('scss', ['SCSS', 'Sass'], ['.scss', '.sass'], 'Native Monaco SCSS language service.', {
    family: 'stylesheet',
  }),
  nativeLanguage('javascript', ['JavaScript', 'JS', 'Node.js'], ['.js', '.mjs', '.cjs', '.jsx', '.es6'], 'Native Monaco JavaScript language service.', {
    family: 'javascript',
  }),
  nativeLanguage('typescript', ['TypeScript', 'TS', 'TSX'], ['.ts', '.tsx', '.mts', '.cts'], 'Native Monaco TypeScript language service.', {
    family: 'typescript',
  }),
  nativeLanguage('json', ['JSON'], [
    '.json',
    '.jsonc',
    '.webmanifest',
    '.ipynb',
    '.geojson',
    '.har',
    'package-lock.json',
    'tsconfig.json',
    'jsconfig.json',
    '.eslintrc',
    '.prettierrc',
  ], 'Native Monaco JSON language service.', {
    family: 'data',
  }),
  nativeLanguage('markdown', ['Markdown', 'MD'], ['.md', '.mdx', '.markdown', '.mkd'], 'Native Monaco Markdown language service.', {
    family: 'markup',
  }),
];

const lspLanguages = [
  lspLanguage('python', ['Python', 'Py'], ['.py', '.pyw', '.pyi'], 'Pyright', ['pyright-langserver'], ['--stdio'], ['pyproject.toml', 'setup.py', 'requirements.txt', '.git'], {
    family: 'python',
  }),
  lspLanguage('c', ['C'], ['.c', '.h'], 'clangd', ['clangd'], ['--background-index'], ['compile_commands.json', 'compile_flags.txt', '.clangd', '.git'], {
    family: 'clang',
  }),
  lspLanguage('cpp', ['C++', 'CPP', 'CXX'], ['.cpp', '.cc', '.cxx', '.hpp', '.hh', '.hxx', '.ino', '.ipp', '.ixx'], 'clangd', ['clangd'], ['--background-index'], ['compile_commands.json', 'compile_flags.txt', '.clangd', '.git'], {
    family: 'clang',
  }),
  lspLanguage('go', ['Go', 'Golang'], ['.go'], 'gopls', ['gopls'], [], ['go.work', 'go.mod', '.git'], {
    family: 'go',
  }),
  lspLanguage('rust', ['Rust'], ['.rs'], 'rust-analyzer', ['rust-analyzer'], [], ['Cargo.toml', 'rust-project.json', '.git'], {
    family: 'rust',
  }),
  lspLanguage('java', ['Java'], ['.java'], 'jdtls', ['jdtls'], [], ['pom.xml', 'build.gradle', 'settings.gradle', '.git'], {
    family: 'java',
  }),
  lspLanguage('csharp', ['C#', 'CSharp', 'CS'], ['.cs', '.csx'], 'OmniSharp', ['OmniSharp', 'omnisharp'], ['-lsp'], ['*.sln', '*.csproj', '.git'], {
    family: 'dotnet',
  }),
  lspLanguage('php', ['PHP'], ['.php', '.phtml', '.php4', '.php5', '.php7', '.php8'], 'phpactor', ['phpactor'], ['language-server'], ['composer.json', '.git'], {
    family: 'php',
  }),
  lspLanguage('shell', ['Shell', 'Bash', 'sh'], ['.sh', '.bash', '.zsh', '.ksh', '.fish', '.command', '.envrc', '.bashrc', '.zshrc'], 'bash-language-server', ['bash-language-server'], ['start'], ['.git'], {
    family: 'shell',
    detail: 'Hosted shell IntelliSense via bash-language-server when the backend server pack is installed.',
  }),
  lspLanguage('yaml', ['YAML', 'YML'], ['.yaml', '.yml', '.clang-format', '.clang-tidy', '.yamllint', '.ansible-lint'], 'yaml-language-server', ['yaml-language-server'], ['--stdio'], ['.git'], {
    family: 'data',
    detail: 'Hosted YAML IntelliSense via yaml-language-server when the backend server pack is installed.',
  }),
  lspLanguage('dockerfile', ['Dockerfile'], ['Dockerfile', '.dockerfile', 'dockerfile'], 'docker-langserver', ['docker-langserver'], ['--stdio'], ['Dockerfile', 'docker-compose.yml', '.git'], {
    family: 'infra',
    detail: 'Hosted Dockerfile IntelliSense via docker-langserver when the backend server pack is installed.',
  }),
];

const basicLanguages = [
  basicLanguage('plaintext', ['Plain Text'], ['.txt', '.text', '.log'], { family: 'text' }),
  basicLanguage('xml', ['XML', 'XAML', 'SVG'], ['.xml', '.xaml', '.svg', '.plist', '.xsd', '.wsdl', '.csproj', '.vbproj', '.fsproj', '.props', '.targets'], { family: 'markup' }),
  basicLanguage('toml', ['TOML'], ['.toml', 'cargo.lock', '.taplo.toml'], { family: 'data' }),
  basicLanguage('ini', ['INI', 'Config'], ['.ini', '.conf', '.cfg', '.cnf', '.properties', '.editorconfig', '.env', '.env.local', '.env.development', '.env.production', '.env.test', '.npmrc', '.yarnrc', '.pnpmrc', '.gitconfig'], {
    family: 'config',
  }),
  basicLanguage('sql', ['SQL'], ['.sql', '.ddl', '.dml'], { family: 'database' }),
  basicLanguage('graphql', ['GraphQL'], ['.graphql', '.gql'], { family: 'api' }),
  basicLanguage('protobuf', ['Protocol Buffers', 'Proto'], ['.proto'], { family: 'data' }),
  basicLanguage('terraform', ['Terraform', 'HCL'], ['.tf', '.tfvars', '.hcl'], { family: 'infra' }),
  basicLanguage('makefile', ['Makefile'], ['Makefile', '.mk', 'GNUmakefile', 'makefile'], { family: 'build' }),
  basicLanguage('cmake', ['CMake'], ['.cmake', 'CMakeLists.txt'], { family: 'build' }),
  basicLanguage('gradle', ['Gradle'], ['.gradle'], { family: 'build' }),
  basicLanguage('groovy', ['Groovy'], ['.groovy', '.gvy', '.gradle.kts', 'Jenkinsfile'], { family: 'jvm' }),
  basicLanguage('powershell', ['PowerShell', 'PS1'], ['.ps1', '.psm1', '.psd1'], { family: 'shell' }),
  basicLanguage('bat', ['Batch', 'CMD'], ['.bat', '.cmd'], { family: 'shell' }),
  basicLanguage('ruby', ['Ruby', 'RB'], ['.rb', '.erb', '.rake', '.gemspec', 'Gemfile'], { family: 'ruby' }),
  basicLanguage('perl', ['Perl'], ['.pl', '.pm', '.t'], { family: 'perl' }),
  basicLanguage('lua', ['Lua'], ['.lua'], { family: 'lua' }),
  basicLanguage('dart', ['Dart'], ['.dart'], { family: 'dart' }),
  basicLanguage('kotlin', ['Kotlin', 'KT'], ['.kt', '.kts'], { family: 'jvm' }),
  basicLanguage('swift', ['Swift'], ['.swift'], { family: 'swift' }),
  basicLanguage('scala', ['Scala'], ['.scala', '.sc', '.sbt'], { family: 'jvm' }),
  basicLanguage('r', ['R'], ['.r', '.R', '.rmd'], { family: 'statistics' }),
  basicLanguage('fortran', ['Fortran', 'F90'], ['.f', '.f90', '.f95', '.f03', '.f08'], { family: 'scientific' }),
  basicLanguage('julia', ['Julia'], ['.jl'], { family: 'scientific' }),
  basicLanguage('matlab', ['MATLAB'], ['.m'], { family: 'scientific' }),
  basicLanguage('objective-c', ['Objective-C'], ['.m', '.mm'], { family: 'clang' }),
  basicLanguage('haskell', ['Haskell'], ['.hs', '.lhs'], { family: 'functional' }),
  basicLanguage('ocaml', ['OCaml'], ['.ml', '.mli'], { family: 'functional' }),
  basicLanguage('fsharp', ['F#', 'FSharp'], ['.fs', '.fsi', '.fsx'], { family: 'dotnet' }),
  basicLanguage('elixir', ['Elixir'], ['.ex', '.exs'], { family: 'beam' }),
  basicLanguage('erlang', ['Erlang'], ['.erl', '.hrl'], { family: 'beam' }),
  basicLanguage('clojure', ['Clojure'], ['.clj', '.cljs', '.cljc', '.edn'], { family: 'lisp' }),
  basicLanguage('scheme', ['Scheme'], ['.scm', '.ss'], { family: 'lisp' }),
  basicLanguage('nim', ['Nim'], ['.nim', '.nims'], { family: 'nim' }),
  basicLanguage('zig', ['Zig'], ['.zig'], { family: 'systems' }),
  basicLanguage('assembly', ['Assembly', 'ASM'], ['.asm', '.s', '.S', '.inc'], { family: 'systems' }),
  basicLanguage('mips', ['MIPS'], ['.mips'], { family: 'systems' }),
  basicLanguage('pascal', ['Pascal'], ['.pas', '.pp', '.lpr'], { family: 'systems' }),
  basicLanguage('vb', ['Visual Basic'], ['.vb', '.vbs'], { family: 'dotnet' }),
  basicLanguage('tcl', ['Tcl'], ['.tcl'], { family: 'scripting' }),
  basicLanguage('coffee', ['CoffeeScript'], ['.coffee', '.litcoffee'], { family: 'javascript' }),
  basicLanguage('less', ['LESS'], ['.less'], { family: 'stylesheet' }),
  basicLanguage('pug', ['Pug', 'Jade'], ['.pug', '.jade'], { family: 'markup' }),
  basicLanguage('handlebars', ['Handlebars', 'HBS'], ['.hbs', '.handlebars', '.mustache'], { family: 'markup' }),
  basicLanguage('nginx', ['Nginx'], ['nginx.conf'], { family: 'infra' }),
  basicLanguage('apache', ['Apache'], ['.htaccess', 'httpd.conf'], { family: 'infra' }),
  basicLanguage('latex', ['LaTeX', 'TeX'], ['.tex', '.sty', '.cls'], { family: 'document' }),
  basicLanguage('dockercompose', ['Docker Compose'], ['docker-compose.yml', 'docker-compose.yaml', 'compose.yml', 'compose.yaml'], {
    family: 'infra',
  }),
  basicLanguage('solidity', ['Solidity'], ['.sol'], { family: 'blockchain' }),
  basicLanguage('verilog', ['Verilog'], ['.v', '.vh'], { family: 'hardware' }),
  basicLanguage('systemverilog', ['SystemVerilog'], ['.sv', '.svh'], { family: 'hardware' }),
  basicLanguage('vhdl', ['VHDL'], ['.vhd', '.vhdl'], { family: 'hardware' }),
  basicLanguage('abap', ['ABAP'], ['.abap'], { family: 'enterprise' }),
  basicLanguage('apex', ['Apex'], ['.cls', '.trigger'], { family: 'enterprise' }),
  basicLanguage('azcli', ['Azure CLI'], ['.azcli'], { family: 'cloud' }),
  basicLanguage('bicep', ['Bicep'], ['.bicep'], { family: 'cloud' }),
  basicLanguage('cameligo', ['CameLIGO'], ['.mligo'], { family: 'blockchain' }),
  basicLanguage('cypher', ['Cypher'], ['.cypher', '.cql'], { family: 'database' }),
  basicLanguage('csp', ['CSP'], ['.csp'], { family: 'web' }),
  basicLanguage('diff', ['Diff', 'Patch'], ['.diff', '.patch'], { family: 'tools' }),
  basicLanguage('ecl', ['ECL'], ['.ecl'], { family: 'data' }),
  basicLanguage('freemarker2', ['FreeMarker'], ['.ftl'], { family: 'markup' }),
  basicLanguage('liquid', ['Liquid'], ['.liquid'], { family: 'markup' }),
  basicLanguage('postiats', ['ATS/Postiats'], ['.dats', '.sats', '.hats'], { family: 'systems' }),
  basicLanguage('powerquery', ['Power Query'], ['.pq', '.mquery'], { family: 'data' }),
  basicLanguage('qsharp', ['Q#'], ['.qs'], { family: 'quantum' }),
  basicLanguage('razor', ['Razor'], ['.cshtml', '.razor'], { family: 'web' }),
  basicLanguage('redis', ['Redis'], ['.redis'], { family: 'database' }),
  basicLanguage('redshift', ['Redshift'], ['.redshift'], { family: 'database' }),
  basicLanguage('sb', ['Small Basic'], ['.sb'], { family: 'education' }),
  basicLanguage('sparql', ['SPARQL'], ['.rq', '.sparql'], { family: 'data' }),
  basicLanguage('st', ['Structured Text'], ['.st'], { family: 'industrial' }),
  basicLanguage('twig', ['Twig'], ['.twig'], { family: 'markup' }),
  basicLanguage('wgsl', ['WGSL'], ['.wgsl'], { family: 'graphics' }),
];

export const EDITOR_LANGUAGE_REGISTRY = [...nativeLanguages, ...lspLanguages, ...basicLanguages];

export const EDITOR_LANGUAGE_BY_ID = Object.fromEntries(
  EDITOR_LANGUAGE_REGISTRY.map((entry) => [entry.id, entry])
);

export function getEditorLanguage(languageId) {
  return EDITOR_LANGUAGE_BY_ID[languageId] || null;
}

export function getEditorLanguagesBySupportLevel(supportLevel) {
  return EDITOR_LANGUAGE_REGISTRY.filter((entry) => entry.supportLevel === supportLevel);
}
