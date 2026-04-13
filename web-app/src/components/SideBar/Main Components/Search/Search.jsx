import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ASSET_EXTENSIONS,
  CODE_EXTENSIONS,
  buildMatcher,
  collectSymbols,
  getExtension,
  getLinePreview,
  getSearchPool,
  matchesPathFilters,
  readSearchContent,
} from '../../../../core/searchUtils.js';

export default function Search({
  ariaExpandedisplaysearch,
  workspace,
  workspaceVersion,
  searchFocusNonce,
  openSearchResult,
  searchRequest,
  onGoToLine,
  onGoToFile,
  onGoToSymbolInWorkspace,
  onGoToSymbolInEditor,
  onGoToDefinition,
  onGoToReferences,
}) {
  const [mode, setMode] = useState('content');
  const [query, setQuery] = useState('');
  const [includeFilter, setIncludeFilter] = useState('');
  const [excludeFilter, setExcludeFilter] = useState('node_modules, dist');
  const [scope, setScope] = useState('workspace');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState({ files: 0, matches: 0 });
  const [error, setError] = useState('');
  const [recentQueries, setRecentQueries] = useState([]);
  const searchInputRef = useRef(null);

  const scopeOptions = useMemo(
    () => [
      { id: 'workspace', label: 'Workspace' },
      { id: 'open', label: 'Open Editors' },
      { id: 'code', label: 'Code Only' },
      { id: 'assets', label: 'Assets' },
    ],
    []
  );

  useEffect(() => {
    if (ariaExpandedisplaysearch !== 'flex') {
      return;
    }

    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
      searchInputRef.current?.select?.();
    }, 0);

    return () => clearTimeout(timer);
  }, [ariaExpandedisplaysearch, searchFocusNonce]);

  useEffect(() => {
    if (ariaExpandedisplaysearch !== 'flex' || !searchRequest) {
      return;
    }

    if (searchRequest.mode) {
      setMode(searchRequest.mode);
    }

    if (typeof searchRequest.query === 'string') {
      setQuery(searchRequest.query);
    }

    if (searchRequest.scope) {
      setScope(searchRequest.scope);
    }
  }, [ariaExpandedisplaysearch, searchRequest]);

  useEffect(() => {
    if (ariaExpandedisplaysearch !== 'flex') {
      return;
    }

    if (!query.trim()) {
      setLoading(false);
      setError('');
      setResults([]);
      setSummary({ files: 0, matches: 0 });
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const matcher = buildMatcher(query, { caseSensitive, wholeWord, useRegex });
        const pool = getSearchPool(workspace, scope === 'workspace' ? 'workspace' : scope === 'open' ? 'open' : 'workspace')
          .filter((entry) => matchesPathFilters(entry.path, includeFilter, excludeFilter))
          .filter((entry) => {
            const extension = getExtension(entry.name);
            if (scope === 'code') {
              return CODE_EXTENSIONS.has(extension);
            }
            if (scope === 'assets') {
              return ASSET_EXTENSIONS.has(extension);
            }
            return true;
          });

        if (!matcher) {
          if (!cancelled) {
            setResults([]);
            setSummary({ files: 0, matches: 0 });
          }
          return;
        }

        if (mode === 'files') {
          const fileResults = pool
            .filter((entry) => {
              matcher.lastIndex = 0;
              return matcher.test(entry.path);
            })
            .map((entry) => ({
              path: entry.path,
              name: entry.name,
              matches: [],
            }));

          if (!cancelled) {
            setResults(fileResults);
            setSummary({ files: fileResults.length, matches: fileResults.length });
            setRecentQueries((current) => [query.trim(), ...current.filter((entry) => entry !== query.trim())].slice(0, 5));
          }
          return;
        }

        if (mode === 'symbols') {
          const symbolResults = [];

          for (const entry of pool) {
            const content = await readSearchContent(workspace, entry);

            if (!content) {
              continue;
            }

            const matches = collectSymbols(content).filter((symbol) => {
              matcher.lastIndex = 0;
              return matcher.test(`${symbol.name} ${symbol.type}`);
            });

            if (matches.length) {
              symbolResults.push({
                path: entry.path,
                name: entry.name,
                matches,
              });
            }
          }

          const totalSymbols = symbolResults.reduce((total, result) => total + result.matches.length, 0);
          if (!cancelled) {
            setResults(symbolResults);
            setSummary({ files: symbolResults.length, matches: totalSymbols });
            setRecentQueries((current) => [query.trim(), ...current.filter((entry) => entry !== query.trim())].slice(0, 5));
          }
          return;
        }

        const contentResults = [];
        let totalMatches = 0;

        for (const entry of pool) {
          const content = await readSearchContent(workspace, entry);

          if (!content) {
            continue;
          }

          matcher.lastIndex = 0;
          const matches = [];
          let nextMatch = matcher.exec(content);

          while (nextMatch && matches.length < 6) {
            const preview = getLinePreview(content, nextMatch.index);
            matches.push({
              line: preview.line,
              column: preview.column,
              preview: preview.preview,
              matchLength: nextMatch[0].length,
            });
            if (nextMatch[0].length === 0) {
              matcher.lastIndex += 1;
            }
            nextMatch = matcher.exec(content);
          }

          if (matches.length) {
            totalMatches += matches.length;
            contentResults.push({
              path: entry.path,
              name: entry.name,
              matches,
            });
          }
        }

        if (!cancelled) {
          setResults(contentResults);
          setSummary({ files: contentResults.length, matches: totalMatches });
          setRecentQueries((current) => [query.trim(), ...current.filter((entry) => entry !== query.trim())].slice(0, 5));
        }
      } catch (searchError) {
        if (!cancelled) {
          setResults([]);
          setSummary({ files: 0, matches: 0 });
          setError(searchError instanceof Error ? searchError.message : 'Search failed.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 220);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [ariaExpandedisplaysearch, caseSensitive, excludeFilter, includeFilter, mode, query, scope, useRegex, wholeWord, workspace, workspaceVersion]);

  return (
    <div id="searcharea" className={`sidebarscontent d-${ariaExpandedisplaysearch}`}>
      <div className="search-shell">
        <div className="search-header">
          <p className="explorer-eyebrow">Search</p>
          <h6 className="explorer-title">Workspace Search</h6>
        </div>

        <div className="search-mode-row">
          <button type="button" className={`search-mode-btn ${mode === 'content' ? 'active' : ''}`} onClick={() => setMode('content')}>
            Content
          </button>
          <button type="button" className={`search-mode-btn ${mode === 'files' ? 'active' : ''}`} onClick={() => setMode('files')}>
            Files
          </button>
          <button type="button" className={`search-mode-btn ${mode === 'symbols' ? 'active' : ''}`} onClick={() => setMode('symbols')}>
            Symbols
          </button>
        </div>

        <div className="search-go-block">
          <div className="search-scope-label">Go</div>
          <div className="search-go-row">
            <button type="button" className="search-go-chip" onClick={onGoToLine}>
              Line
            </button>
            <button type="button" className="search-go-chip" onClick={onGoToFile}>
              File
            </button>
            <button type="button" className="search-go-chip" onClick={onGoToSymbolInWorkspace}>
              Workspace Symbol
            </button>
            <button type="button" className="search-go-chip" onClick={onGoToSymbolInEditor}>
              Editor Symbol
            </button>
            <button type="button" className="search-go-chip" onClick={onGoToDefinition}>
              Definition
            </button>
            <button type="button" className="search-go-chip" onClick={onGoToReferences}>
              References
            </button>
          </div>
        </div>

        <div className="search-input-group">
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={mode === 'content' ? 'Search across files' : mode === 'files' ? 'Search file names' : 'Search symbols'}
            spellCheck={false}
          />
          <div className="search-toggle-row">
            <button type="button" className={`search-toggle-btn ${caseSensitive ? 'active' : ''}`} onClick={() => setCaseSensitive((current) => !current)}>
              Aa
            </button>
            <button type="button" className={`search-toggle-btn ${wholeWord ? 'active' : ''}`} onClick={() => setWholeWord((current) => !current)}>
              W
            </button>
            <button type="button" className={`search-toggle-btn ${useRegex ? 'active' : ''}`} onClick={() => setUseRegex((current) => !current)}>
              .*
            </button>
          </div>
        </div>

        <input
          type="text"
          className="search-input secondary"
          value={includeFilter}
          onChange={(event) => setIncludeFilter(event.target.value)}
          placeholder="Include files: src, .js, components"
          spellCheck={false}
        />
        <input
          type="text"
          className="search-input secondary"
          value={excludeFilter}
          onChange={(event) => setExcludeFilter(event.target.value)}
          placeholder="Exclude files: dist, node_modules"
          spellCheck={false}
        />

        <div className="search-scope-block">
          <div className="search-scope-label">Smart Scope</div>
          <div className="search-scope-row">
            {scopeOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`search-scope-chip ${scope === option.id ? 'active' : ''}`}
                onClick={() => setScope(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {recentQueries.length ? (
          <div className="search-history-block">
            <div className="search-scope-label">Quick Recall</div>
            <div className="search-history-row">
              {recentQueries.map((entry) => (
                <button key={entry} type="button" className="search-history-chip" onClick={() => setQuery(entry)}>
                  {entry}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="search-summary">
          {error
            ? error
            : query.trim()
            ? loading
              ? 'Searching...'
              : `${summary.matches} result${summary.matches === 1 ? '' : 's'} in ${summary.files} file${summary.files === 1 ? '' : 's'}`
            : 'Search your workspace, open editors, code only, or assets.'}
        </div>

        <div className="search-results">
          {!query.trim() ? (
            <div className="search-empty-state">
              <div className="search-empty-title">Search Everything</div>
              <p>Find text in files, search by file name, or switch to Smart Scope for code-only and open-editor search.</p>
            </div>
          ) : null}

          {error ? <div className="search-empty-state search-error-state">{error}</div> : null}

          {query.trim() && !loading && !results.length ? <div className="search-empty-state">No matches found.</div> : null}

          {(Array.isArray(results) ? results : []).map((result) => (
            <div key={result.path} className="search-result-card">
              <button type="button" className="search-result-file" onClick={() => openSearchResult(result)}>
                <span className="search-result-name">{result.name}</span>
                <span className="search-result-path">{result.path}</span>
              </button>

              {(mode === 'content' || mode === 'symbols') && Array.isArray(result.matches) ? (
                <div className="search-result-matches">
                  {result.matches.map((match, index) => (
                    <button
                      key={`${result.path}-${match.line}-${index}`}
                      type="button"
                      className="search-result-match"
                      onClick={() => openSearchResult({ ...result, ...match })}
                    >
                      <span className="search-result-line">
                        {mode === 'symbols' ? `${match.type} • ${match.line}:${match.column}` : `${match.line}:${match.column}`}
                      </span>
                      <span className="search-result-preview">{mode === 'symbols' ? `${match.name} — ${match.preview}` : match.preview}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
