import fs from 'fs';
import path from 'path';

// Paths
const snippetsDbPath = path.join(process.cwd(), 'src/components/Editor/friendlySnippets.generated.json');
const reactCraftPath = path.join(process.cwd(), 'public/extensions/react-craft/main.js');

// Read large snippet DB
const dbContent = JSON.parse(fs.readFileSync(snippetsDbPath, 'utf8'));
const snippets = dbContent.snippets || {};

// We want all JS, JSX, TS, TSX snippets
const langs = ['javascript', 'javascriptreact', 'typescript', 'typescriptreact'];

let combinedSnippets = [];

langs.forEach(lang => {
  if (snippets[lang]) {
    // Some basic normalization in case the regex stuff is too complex
    // Though we assume standard snippet syntax works. 
    // We already know some regex TextMate transforms might crash Monaco. 
    // Let's sanitize to remove advanced regex replacement in snippet body entirely,
    // or just let them through and hope for the best?
    // Actually, Monaco handles most standard snippets. We can just regex replace the 
    // complex ${num/pattern/replacement/options} syntax if it shows up.
    
    let sanitizedList = snippets[lang].map(snippet => {
      let text = snippet.insertText || '';
      // Remove regex transforms like ${1/(.*)/${1:/capitalize}/} which might crash Monaco
      // A simple regex to strip transforms: ${<number>/<anything>} => $number
      text = text.replace(/\$\{([0-9]+)\/[^}]+\}/g, '$$$1');
      return {
        ...snippet,
        insertText: text
      };
    });
    
    combinedSnippets.push(...sanitizedList);
  }
});

// Dedup exact same labels
const map = new Map();
combinedSnippets.forEach(s => map.set(s.label, s));
const finalSnippets = Array.from(map.values());

console.log(`Found ${finalSnippets.length} snippets for React/JS/TS environments.`);

const mainJsContent = `
export async function activate(api) {
  console.log('React Craft (Ultra) activated! Injecting ${finalSnippets.length} snippets...');
  
  const massiveSnippetList = ${JSON.stringify(finalSnippets, null, 2)};
  
  api.completions.register('javascript', massiveSnippetList);
  api.completions.register('javascriptreact', massiveSnippetList);
  api.completions.register('typescript', massiveSnippetList);
  api.completions.register('typescriptreact', massiveSnippetList);
  
  api.commands.register('run-tests', () => {
    api.notifications.info('Started test runner for react-craft environment...');
  });
}
`;

fs.writeFileSync(reactCraftPath, mainJsContent);
console.log('Successfully injected massive snippets into react-craft.');
