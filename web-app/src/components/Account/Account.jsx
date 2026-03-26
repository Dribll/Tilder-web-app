import React from 'react';

const PROVIDER_LABELS = {
  github: 'GitHub',
  microsoft: 'Microsoft',
};

const PROVIDER_DESCRIPTIONS = {
  github: 'Use GitHub for account sign-in, settings sync, and repository integration.',
  microsoft: 'Use Microsoft for account sign-in and VS Code-style settings sync.',
};

function getProviderBadge(provider, authSession) {
  const connected = Boolean(authSession?.accounts?.[provider]);
  const configured = Boolean(authSession?.providers?.[provider]);

  if (connected) {
    return { label: 'Connected', tone: 'success' };
  }

  if (configured) {
    return { label: 'Ready', tone: 'ready' };
  }

  return { label: 'Not Enabled', tone: 'muted' };
}

export default function Account({
  modalType,
  authSession,
  authServiceStatus,
  authServiceMessage,
  authBusyProvider,
  syncBusy,
  onStartOAuth,
  onDisconnectProvider,
  onSetSyncProvider,
  onToggleSyncPreference,
  onPushSync,
  onPullSync,
}) {
  if (modalType !== 'Account') {
    return null;
  }

  const accounts = authSession?.accounts || {};
  const syncPreferences = authSession?.syncPreferences || {
    syncSettings: true,
    syncLayout: true,
    syncShortcuts: true,
  };
  const connectedProviders = Object.keys(accounts);

  return (
    <div className="account-panel">
      <div className={`account-service-banner ${authServiceStatus === 'error' ? 'error' : authServiceStatus === 'ready' ? 'ready' : ''}`}>
        {authServiceStatus === 'error'
          ? authServiceMessage || 'The Tilder auth server is not reachable.'
          : authServiceStatus === 'ready'
            ? 'Tilder auth server is reachable.'
            : 'Checking Tilder auth server...'}
      </div>

      <div className="account-section">
        <div className="account-section-title">Connected Accounts</div>
        <div className="account-provider-stack">
          {['github', 'microsoft'].map((provider) => {
            const account = accounts[provider];
            const connecting = authBusyProvider === provider;
            const selectedForSync = authSession?.syncProvider === provider;
            const providerLabel = PROVIDER_LABELS[provider];
            const badge = getProviderBadge(provider, authSession);

            return (
              <div key={provider} className={`account-provider-card ${account ? 'connected' : ''}`}>
                <div className="account-provider-summary">
                  <div className="account-provider-copy">
                    <div className="account-provider-head">
                      <div className="account-provider-name">{providerLabel}</div>
                      <span className={`account-status-badge ${badge.tone}`}>{badge.label}</span>
                    </div>
                    <div className="account-provider-subtitle">
                      {account
                        ? `${account.displayName || account.email || 'Connected'}${account.email ? ` - ${account.email}` : ''}`
                        : PROVIDER_DESCRIPTIONS[provider]}
                    </div>
                  </div>
                  {account?.avatarUrl ? <img src={account.avatarUrl} alt={account.displayName || provider} className="account-avatar" /> : null}
                </div>

                <div className="account-provider-actions">
                  {account ? (
                    <>
                      <button
                        type="button"
                        className={`account-chip ${selectedForSync ? 'active' : ''}`}
                        disabled={syncBusy}
                        onClick={() => onSetSyncProvider(provider)}
                      >
                        {selectedForSync ? 'Sync Provider' : 'Use For Sync'}
                      </button>
                      <button type="button" className="account-provider-btn" disabled={connecting || syncBusy} onClick={() => onDisconnectProvider(provider)}>
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="account-provider-btn"
                      disabled={connecting || authServiceStatus === 'loading'}
                      onClick={() => onStartOAuth(provider)}
                    >
                      {connecting ? 'Opening...' : `Connect ${providerLabel}`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="account-section">
        <div className="account-section-title">Settings Sync</div>
        <div className="account-sync-summary">
          {authSession?.syncProvider
            ? `Sync target: ${PROVIDER_LABELS[authSession.syncProvider]}`
            : connectedProviders.length
              ? 'Choose a connected provider for settings sync.'
              : 'Connect GitHub or Microsoft to enable settings sync.'}
        </div>
        <div className="account-toggle-grid">
          <button type="button" className={`account-chip ${syncPreferences.syncSettings ? 'active' : ''}`} disabled={syncBusy} onClick={() => onToggleSyncPreference('syncSettings')}>
            Settings
          </button>
          <button type="button" className={`account-chip ${syncPreferences.syncLayout ? 'active' : ''}`} disabled={syncBusy} onClick={() => onToggleSyncPreference('syncLayout')}>
            Layout
          </button>
          <button type="button" className={`account-chip ${syncPreferences.syncShortcuts ? 'active' : ''}`} disabled={syncBusy} onClick={() => onToggleSyncPreference('syncShortcuts')}>
            Shortcuts
          </button>
        </div>
        <div className="account-provider-row">
          <button
            type="button"
            className="account-provider-btn"
            disabled={!authSession?.syncProvider || syncBusy}
            onClick={onPullSync}
          >
            {syncBusy ? 'Syncing...' : 'Pull From Cloud'}
          </button>
          <button
            type="button"
            className="account-provider-btn"
            disabled={!authSession?.syncProvider || syncBusy}
            onClick={onPushSync}
          >
            {syncBusy ? 'Syncing...' : 'Push To Cloud'}
          </button>
        </div>
      </div>
    </div>
  );
}
