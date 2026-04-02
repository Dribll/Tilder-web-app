import React, { useEffect, useMemo, useState } from 'react';
import { commitScm, fetchScmStatus, initializeScm, stageAllScm } from '../../../../core/scmApi.js';

function toFriendlyError(error, fallback) {
  const message = error instanceof Error ? error.message : fallback;
  if (message.includes('Failed to fetch')) {
    return 'Tilder API server is not reachable. Start or restart the Node server on port 3210.';
  }

  if (message.includes('PayloadTooLargeError') || message.includes('workspace mirror payload is too large')) {
    return 'This workspace is too large to mirror as-is for Source Control. Tilder now skips generated folders like node_modules, dist, build, and target. Refresh Source Control and try again.';
  }

  return message || fallback;
}

export default function Git({ ariaExpandedisplaygit, workspace, workspaceVersion, authSession, pushNotification }) {
  const isVisible = ariaExpandedisplaygit === 'flex';
  const [scmState, setScmState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [busyAction, setBusyAction] = useState('');

  const connectedAccountLabel = useMemo(() => {
    const githubAccount = authSession?.accounts?.github;
    const microsoftAccount = authSession?.accounts?.microsoft;
    return githubAccount?.displayName || githubAccount?.username || microsoftAccount?.displayName || '';
  }, [authSession?.accounts?.github, authSession?.accounts?.microsoft]);

  async function buildPayload() {
    return (await workspace.getSyncPayload({ includeGeneratedDirectories: false })) || workspace.getStructureSnapshot();
  }

  async function refreshScm() {
    try {
      setLoading(true);
      setError('');
      const payload = await buildPayload();
      if (!payload) {
        setScmState(null);
        return;
      }

      const nextState = await fetchScmStatus(payload);
      setScmState(nextState);
    } catch (caughtError) {
      setError(toFriendlyError(caughtError, 'Unable to load source control state.'));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    refreshScm();
  }, [isVisible, workspaceVersion]);

  async function runScmAction(action, successMessage) {
    try {
      setBusyAction(successMessage);
      setError('');
      const payload = await buildPayload();
      if (!payload) {
        throw new Error('Open or create a workspace first.');
      }

      const nextState = await action(payload);
      setScmState(nextState);
      pushNotification?.(successMessage);
      return true;
    } catch (caughtError) {
      const message = toFriendlyError(caughtError, 'Source control action failed.');
      setError(message);
      pushNotification?.(message, 'warning');
      return false;
    } finally {
      setBusyAction('');
    }
  }

  return (
    <div id="gitarea" className={`sidebarscontent d-${ariaExpandedisplaygit}`}>
      <div className="scm-panel">
        <div className="scm-header">
          <div>
            <div className="scm-title">Source Control</div>
            <div className="scm-subtitle">
              {workspace.rootName || workspace.getRootNode()?.name || 'Open a folder or draft workspace'}
            </div>
          </div>
          <button type="button" className="scm-icon-btn" onClick={refreshScm} title="Refresh Source Control">
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </div>

        {connectedAccountLabel ? <div className="scm-connected">Author: {connectedAccountLabel}</div> : null}
        {error ? <div className="scm-error">{error}</div> : null}

        {scmState?.available === false ? (
          <div className="scm-card">
            <div className="scm-card-title">Git Unavailable</div>
            <div className="scm-card-copy">{scmState.message || 'Git is not available for this Tilder server yet.'}</div>
          </div>
        ) : !scmState?.initialized ? (
          <div className="scm-card">
            <div className="scm-card-title">Initialize Repository</div>
            <div className="scm-card-copy">
              Create a Git repository for this mirrored Tilder workspace so status, staging, and commits are available.
            </div>
            <button
              type="button"
              className="scm-primary-btn"
              disabled={Boolean(busyAction) || loading}
              onClick={() => runScmAction(initializeScm, 'Repository initialized.')}
            >
              {busyAction === 'Repository initialized.' ? 'Initializing...' : 'Initialize Repository'}
            </button>
          </div>
        ) : (
          <>
            <div className="scm-summary-grid">
              <div className="scm-summary-item">
                <span className="scm-summary-label">Branch</span>
                <span className="scm-summary-value">{scmState.branch || 'main'}</span>
              </div>
              <div className="scm-summary-item">
                <span className="scm-summary-label">Changed</span>
                <span className="scm-summary-value">{scmState.changedCount || 0}</span>
              </div>
              <div className="scm-summary-item">
                <span className="scm-summary-label">Staged</span>
                <span className="scm-summary-value">{scmState.stagedCount || 0}</span>
              </div>
            </div>

            <div className="scm-card">
              <div className="scm-card-title">Commit</div>
              <textarea
                className="scm-commit-input"
                value={commitMessage}
                onChange={(event) => setCommitMessage(event.target.value)}
                placeholder="Type a commit message and click Commit"
              />
              <div className="scm-action-row">
                <button
                  type="button"
                  className="scm-secondary-btn"
                  disabled={Boolean(busyAction) || loading}
                  onClick={() => runScmAction(stageAllScm, 'All changes staged.')}
                >
                  {busyAction === 'All changes staged.' ? 'Staging...' : 'Stage All'}
                </button>
                <button
                  type="button"
                  className="scm-primary-btn"
                  disabled={Boolean(busyAction) || loading || !commitMessage.trim()}
                  onClick={async () => {
                    const message = commitMessage.trim();
                    const committed = await runScmAction(
                      (payload) => commitScm({ ...payload, message }),
                      'Commit created.'
                    );
                    if (committed) {
                      setCommitMessage('');
                    }
                  }}
                >
                  {busyAction === 'Commit created.' ? 'Committing...' : 'Commit'}
                </button>
              </div>
            </div>

            <div className="scm-card">
              <div className="scm-card-title">Changes</div>
              <div className="scm-file-list">
                {scmState.files?.length ? (
                  scmState.files.map((file) => (
                    <div key={`${file.path}-${file.index}-${file.workingDir}`} className="scm-file-row">
                      <span className="scm-file-path">{file.path}</span>
                      <span className="scm-file-status">{`${file.index || ' '} ${file.workingDir || ' '}`.trim()}</span>
                    </div>
                  ))
                ) : (
                  <div className="scm-empty">No pending changes.</div>
                )}
              </div>
            </div>

            <div className="scm-card">
              <div className="scm-card-title">Recent Commits</div>
              <div className="scm-commit-list">
                {scmState.recentCommits?.length ? (
                  scmState.recentCommits.map((commit) => (
                    <div key={commit.hash} className="scm-commit-row">
                      <div className="scm-commit-message">{commit.message}</div>
                      <div className="scm-commit-meta">
                        {(commit.hash || '').slice(0, 7)} {commit.author_name ? `· ${commit.author_name}` : ''}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="scm-empty">No commits yet.</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
