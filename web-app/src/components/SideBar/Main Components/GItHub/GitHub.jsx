import React, { useEffect, useState } from 'react';
import { fetchGitHubRepos } from '../../../../core/accountApi.js';

export default function GitHub({ ariaExpandedisplaygithub, authSession, openAccount }) {
  const isVisible = ariaExpandedisplaygithub === 'flex';
  const githubAccount = authSession?.accounts?.github;
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isVisible || !githubAccount) {
      return;
    }

    let active = true;
    setLoading(true);
    setError('');

    fetchGitHubRepos()
      .then((response) => {
        if (!active) {
          return;
        }

        setRepositories(response.repositories || []);
      })
      .catch((caughtError) => {
        if (!active) {
          return;
        }

        setError(caughtError instanceof Error ? caughtError.message : 'Unable to load GitHub repositories.');
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [githubAccount?.id, isVisible]);

  return (
    <div id="githubarea" className={`sidebarscontent d-${ariaExpandedisplaygithub}`}>
      <div className="github-panel">
        <div className="github-header">
          <div className="github-title">GitHub</div>
          {githubAccount ? (
            <button type="button" className="github-connect-btn" onClick={openAccount}>
              Manage Account
            </button>
          ) : null}
        </div>

        {!githubAccount ? (
          <div className="github-card">
            <div className="github-card-title">Connect GitHub</div>
            <div className="github-card-copy">
              Sign in with GitHub from the Account modal to browse repositories and use GitHub-backed sync.
            </div>
            <button type="button" className="github-connect-btn" onClick={openAccount}>
              Open Account Center
            </button>
          </div>
        ) : (
          <>
            <div className="github-profile-card">
              {githubAccount.avatarUrl ? <img src={githubAccount.avatarUrl} alt={githubAccount.displayName || githubAccount.username} className="github-avatar" /> : null}
              <div className="github-profile-copy">
                <div className="github-profile-name">{githubAccount.displayName || githubAccount.username}</div>
                <div className="github-profile-handle">
                  {githubAccount.username ? `@${githubAccount.username}` : githubAccount.email || 'Connected'}
                </div>
                {authSession?.syncProvider === 'github' ? <div className="github-sync-pill">Settings Sync Active</div> : null}
              </div>
            </div>

            <div className="github-card">
              <div className="github-card-title">Repositories</div>
              {loading ? <div className="github-loading">Loading repositories...</div> : null}
              {error ? <div className="github-error">{error}</div> : null}
              {!loading && !error ? (
                <div className="github-repo-list">
                  {repositories.length ? (
                    repositories.map((repo) => (
                      <a
                        key={repo.id}
                        className="github-repo-row"
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="github-repo-name">{repo.fullName}</div>
                        <div className="github-repo-meta">
                          {repo.private ? 'Private' : 'Public'} · {repo.defaultBranch || 'main'}
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="github-loading">No repositories returned for this account yet.</div>
                  )}
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
