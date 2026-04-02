import React, { useEffect, useMemo, useState } from 'react';
import { createGitHubRepo, fetchGitHubRepos } from '../../../../core/accountApi.js';

export default function GitHub({ ariaExpandedisplaygithub, authSession, openAccount, workspace, pushNotification }) {
  const isVisible = ariaExpandedisplaygithub === 'flex';
  const githubAccount = authSession?.accounts?.github;
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [creatingRepo, setCreatingRepo] = useState(false);
  const [repoName, setRepoName] = useState('');
  const [repoDescription, setRepoDescription] = useState('');
  const [isPrivateRepo, setIsPrivateRepo] = useState(true);

  const suggestedRepoName = useMemo(() => {
    const raw = workspace?.rootName || workspace?.getRootNode?.()?.name || 'tilder-project';
    return String(raw || 'tilder-project')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'tilder-project';
  }, [workspace]);

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

  useEffect(() => {
    if (!isVisible || repoName.trim()) {
      return;
    }

    setRepoName(suggestedRepoName);
  }, [isVisible, repoName, suggestedRepoName]);

  async function handleCreateRepository() {
    try {
      setCreatingRepo(true);
      setError('');
      const response = await createGitHubRepo({
        name: repoName.trim(),
        description: repoDescription.trim(),
        private: isPrivateRepo,
      });

      const repository = response?.repository;
      if (repository) {
        setRepositories((current) => [repository, ...current.filter((entry) => entry.id !== repository.id)]);
      }
      setRepoDescription('');
      pushNotification?.(`GitHub repository ${repository?.fullName || repoName.trim()} created.`);
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Unable to create GitHub repository.';
      setError(message);
      pushNotification?.(message, 'warning');
    } finally {
      setCreatingRepo(false);
    }
  }

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
              <div className="github-card-title">Create Repository</div>
              <div className="github-card-copy">
                Create a new GitHub repository directly from Tilder for the current workspace.
              </div>
              <input
                type="text"
                className="github-input"
                value={repoName}
                onChange={(event) => setRepoName(event.target.value)}
                placeholder="Repository name"
              />
              <textarea
                className="github-input github-textarea"
                value={repoDescription}
                onChange={(event) => setRepoDescription(event.target.value)}
                placeholder="Description (optional)"
              />
              <label className="github-checkbox-row">
                <input
                  type="checkbox"
                  checked={isPrivateRepo}
                  onChange={(event) => setIsPrivateRepo(event.target.checked)}
                />
                <span>Private repository</span>
              </label>
              <div className="scm-action-row">
                <button
                  type="button"
                  className="scm-primary-btn"
                  disabled={creatingRepo || !repoName.trim()}
                  onClick={handleCreateRepository}
                >
                  {creatingRepo ? 'Creating...' : 'Create GitHub Repo'}
                </button>
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
