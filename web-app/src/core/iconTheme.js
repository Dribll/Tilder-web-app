import {
  MdApi,
  MdBrush,
  MdCode,
  MdDataset,
  MdDataObject,
  MdDescription,
  MdDns,
  MdFolder,
  MdFolderOpen,
  MdImage,
  MdIntegrationInstructions,
  MdLanguage,
  MdLibraryBooks,
  MdMovie,
  MdMusicNote,
  MdOutlineBuild,
  MdOutlineCloud,
  MdOutlineExtension,
  MdOutlineFolderSpecial,
  MdOutlineHub,
  MdOutlineHttp,
  MdOutlineInventory2,
  MdOutlinePalette,
  MdOutlineScience,
  MdOutlineSettings,
  MdOutlineStorage,
  MdOutlineTerminal,
  MdOutlineTopic,
  MdPictureAsPdf,
  MdPreview,
  MdSchema,
  MdTerminal,
  MdTextSnippet,
  MdViewModule,
} from 'react-icons/md';
import { FaJava } from 'react-icons/fa6';
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGo,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiKubernetes,
  SiMarkdown,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPhp,
  SiPython,
  SiReact,
  SiRedis,
  SiRust,
  SiSass,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

export function resolveFolderIcon(name = '') {
  const key = normalize(name);
  const map = {
    src: { Icon: MdDataObject, color: '#66c8ff' },
    app: { Icon: MdViewModule, color: '#7bd3ff' },
    components: { Icon: MdViewModule, color: '#6de0d2' },
    core: { Icon: MdCode, color: '#8da7ff' },
    api: { Icon: MdApi, color: '#70c4ff' },
    services: { Icon: MdDns, color: '#72b9ff' },
    server: { Icon: MdOutlineCloud, color: '#72b9ff' },
    assets: { Icon: MdImage, color: '#63dbc8' },
    images: { Icon: MdImage, color: '#63dbc8' },
    public: { Icon: MdLanguage, color: '#64d8bf' },
    styles: { Icon: MdOutlinePalette, color: '#ff9adf' },
    themes: { Icon: MdOutlinePalette, color: '#ff9adf' },
    config: { Icon: MdOutlineSettings, color: '#d2a1ff' },
    configs: { Icon: MdOutlineSettings, color: '#d2a1ff' },
    test: { Icon: MdOutlineScience, color: '#ffad85' },
    tests: { Icon: MdOutlineScience, color: '#ffad85' },
    docs: { Icon: MdLibraryBooks, color: '#d8dff2' },
    scripts: { Icon: MdTerminal, color: '#98a7ff' },
    extensions: { Icon: MdOutlineExtension, color: '#7fd36d' },
    plugins: { Icon: MdOutlineExtension, color: '#7fd36d' },
    dist: { Icon: MdOutlineInventory2, color: '#86da7a' },
    build: { Icon: MdOutlineBuild, color: '#86da7a' },
    node_modules: { Icon: MdOutlineHub, color: '#86da7a' },
  };
  return map[key] || { Icon: MdFolder, OpenIcon: MdFolderOpen, color: '#f0c65e' };
}

export function resolveFileIcon(name = '') {
  const normalized = normalize(name);
  const extension = normalized.includes('.') ? normalized.split('.').pop() : '';

  const exact = {
    'package.json': { Icon: MdIntegrationInstructions, color: '#7fd36d' },
    'package-lock.json': { Icon: MdIntegrationInstructions, color: '#7fd36d' },
    '.gitignore': { Icon: MdOutlineTopic, color: '#ff8f74' },
    'readme.md': { Icon: MdLibraryBooks, color: '#d8dff2' },
  };
  if (exact[normalized]) return exact[normalized];

  const ext = {
    js: { Icon: SiJavascript, color: '#f7df1e' },
    jsx: { Icon: SiReact, color: '#61dafb' },
    ts: { Icon: SiTypescript, color: '#3178c6' },
    tsx: { Icon: SiReact, color: '#61dafb' },
    c: { Icon: SiC, color: '#a8b9cc' },
    cc: { Icon: SiCplusplus, color: '#659ad2' },
    cxx: { Icon: SiCplusplus, color: '#659ad2' },
    cpp: { Icon: SiCplusplus, color: '#659ad2' },
    h: { Icon: SiC, color: '#a8b9cc' },
    hpp: { Icon: SiCplusplus, color: '#659ad2' },
    java: { Icon: FaJava, color: '#f89820' },
    py: { Icon: SiPython, color: '#ffd43b' },
    go: { Icon: SiGo, color: '#00add8' },
    rs: { Icon: SiRust, color: '#dea584' },
    php: { Icon: SiPhp, color: '#8892be' },
    html: { Icon: SiHtml5, color: '#e34f26' },
    css: { Icon: SiCss, color: '#1572b6' },
    scss: { Icon: SiSass, color: '#cc6699' },
    json: { Icon: SiJsonwebtokens, color: '#c792ea' },
    yaml: { Icon: MdDataObject, color: '#7fd8ff' },
    yml: { Icon: MdDataObject, color: '#7fd8ff' },
    xml: { Icon: MdDataObject, color: '#cdd6f3' },
    md: { Icon: MdDescription, color: '#d4dcf6' },
    sql: { Icon: MdOutlineStorage, color: '#86dbff' },
    sh: { Icon: MdOutlineTerminal, color: '#9ba7ff' },
    bash: { Icon: MdOutlineTerminal, color: '#9ba7ff' },
    zsh: { Icon: MdOutlineTerminal, color: '#9ba7ff' },
    png: { Icon: MdImage, color: '#68dbc9' },
    jpg: { Icon: MdImage, color: '#68dbc9' },
    jpeg: { Icon: MdImage, color: '#68dbc9' },
    gif: { Icon: MdImage, color: '#68dbc9' },
    webp: { Icon: MdImage, color: '#68dbc9' },
    svg: { Icon: MdImage, color: '#68dbc9' },
    pdf: { Icon: MdPictureAsPdf, color: '#ff8f8f' },
    mp3: { Icon: MdMusicNote, color: '#a8c2ff' },
    wav: { Icon: MdMusicNote, color: '#a8c2ff' },
    mp4: { Icon: MdMovie, color: '#89b9ff' },
    mov: { Icon: MdMovie, color: '#89b9ff' },
    avi: { Icon: MdMovie, color: '#89b9ff' },
    webm: { Icon: MdMovie, color: '#89b9ff' },
    txt: { Icon: MdTextSnippet, color: '#d4dcf6' },
    log: { Icon: MdTextSnippet, color: '#a9b3cf' },
  };
  return ext[extension] || { Icon: MdDescription, color: '#d4dcf6' };
}

export function resolveExtensionIcon(extension = {}) {
  const tags = Array.isArray(extension.tags) ? extension.tags.map((tag) => normalize(tag)) : [];
  const category = normalize(extension.category);
  const hasTag = (value) => tags.includes(value);

  if (hasTag('docker') || hasTag('containers') || hasTag('kubernetes') || category.includes('devops')) {
    return hasTag('kubernetes')
      ? { Icon: SiKubernetes, color: '#326ce5' }
      : { Icon: SiDocker, color: '#2496ed' };
  }
  if (hasTag('graphql') || hasTag('api') || category.includes('api')) {
    if (hasTag('graphql')) return { Icon: SiGraphql, color: '#e10098' };
    if (hasTag('openapi') || hasTag('swagger')) return { Icon: SiOpenapiinitiative, color: '#6ba539' };
    return { Icon: MdOutlineHttp, color: '#8ec7ff' };
  }
  if (hasTag('sql') || hasTag('database') || hasTag('mongo') || hasTag('redis') || category.includes('database')) {
    if (hasTag('redis')) return { Icon: SiRedis, color: '#dc382d' };
    return { Icon: MdOutlineStorage, color: '#8fc3ff' };
  }
  if (hasTag('tailwind') || hasTag('css') || hasTag('scss') || category.includes('styling')) {
    if (hasTag('tailwind')) return { Icon: SiTailwindcss, color: '#06b6d4' };
    return { Icon: MdOutlinePalette, color: '#8fe5ff' };
  }
  if (hasTag('markdown') || hasTag('preview') || category.includes('preview')) {
    return { Icon: MdPreview, color: '#bf9cff' };
  }
  if (hasTag('linting') || category.includes('lint')) {
    return { Icon: MdSchema, color: '#ff9f9f' };
  }
  if (category.includes('language')) {
    if (hasTag('c') || hasTag('cpp') || hasTag('clangd')) return { Icon: SiCplusplus, color: '#659ad2' };
    if (hasTag('python') || hasTag('fastapi')) return hasTag('fastapi') ? { Icon: SiFastapi, color: '#009688' } : { Icon: SiPython, color: '#ffd43b' };
    if (hasTag('go') || hasTag('gopls')) return { Icon: SiGo, color: '#00add8' };
    if (hasTag('rust') || hasTag('cargo')) return { Icon: SiRust, color: '#dea584' };
    if (hasTag('java') || hasTag('jdtls')) return { Icon: FaJava, color: '#f89820' };
    if (hasTag('php')) return { Icon: SiPhp, color: '#8892be' };
    return { Icon: MdCode, color: '#9fb4ff' };
  }
  if (category.includes('frontend')) {
    if (hasTag('react')) return { Icon: SiReact, color: '#61dafb' };
    if (hasTag('vue')) return { Icon: SiVuedotjs, color: '#42b883' };
    return { Icon: MdViewModule, color: '#7de4ff' };
  }
  if (category.includes('backend')) {
    if (hasTag('node') || hasTag('express') || hasTag('nest')) return { Icon: SiNodedotjs, color: '#5fa04e' };
    if (hasTag('laravel')) return { Icon: SiPhp, color: '#ff2d20' };
    return { Icon: MdDns, color: '#7abaff' };
  }
  if (hasTag('terraform')) {
    return { Icon: SiTerraform, color: '#7b42bc' };
  }
  if (hasTag('git') || hasTag('source') || hasTag('branch')) {
    return { Icon: SiGit, color: '#f05032' };
  }
  if (category.includes('data')) {
    return { Icon: MdDataset, color: '#8edfd0' };
  }
  if (category.includes('tool') || category.includes('productivity')) {
    return { Icon: MdOutlineFolderSpecial, color: '#f6d28c' };
  }
  return { Icon: MdOutlineExtension, color: '#c4ceff' };
}
