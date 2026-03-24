import React, { useEffect, useState } from 'react';

const DEFAULT_PROFILE = {
  displayName: 'Tilder User',
  email: '',
  syncSettings: true,
  syncLayout: true,
  syncShortcuts: true,
};

export default function Account({ modalType }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('tilderAccountProfile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });
  const [notice, setNotice] = useState('Connect a provider after you add OAuth client credentials and redirect URIs.');

  useEffect(() => {
    localStorage.setItem('tilderAccountProfile', JSON.stringify(profile));
  }, [profile]);

  if (modalType !== 'Account') {
    return null;
  }

  function toggle(field) {
    setProfile((current) => ({ ...current, [field]: !current[field] }));
  }

  return (
    <div className="account-panel">
      <div className="account-section">
        <div className="account-section-title">Profile</div>
        <label className="account-field">
          <span>Display Name</span>
          <input
            type="text"
            className="account-input"
            value={profile.displayName}
            onChange={(event) => setProfile((current) => ({ ...current, displayName: event.target.value }))}
          />
        </label>
        <label className="account-field">
          <span>Email</span>
          <input
            type="text"
            className="account-input"
            value={profile.email}
            placeholder="name@example.com"
            onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))}
          />
        </label>
      </div>

      <div className="account-section">
        <div className="account-section-title">Sync Targets</div>
        <div className="account-toggle-grid">
          <button type="button" className={`account-chip ${profile.syncSettings ? 'active' : ''}`} onClick={() => toggle('syncSettings')}>
            Settings
          </button>
          <button type="button" className={`account-chip ${profile.syncLayout ? 'active' : ''}`} onClick={() => toggle('syncLayout')}>
            Layout
          </button>
          <button type="button" className={`account-chip ${profile.syncShortcuts ? 'active' : ''}`} onClick={() => toggle('syncShortcuts')}>
            Shortcuts
          </button>
        </div>
      </div>

      <div className="account-section">
        <div className="account-section-title">Providers</div>
        <div className="account-provider-row">
          <button type="button" className="account-provider-btn" onClick={() => setNotice('GitHub OAuth needs a client id, callback URL, and token exchange endpoint before sign-in can go live.')}>
            GitHub
          </button>
          <button type="button" className="account-provider-btn" onClick={() => setNotice('Google OAuth needs a configured consent screen, callback URL, and token exchange endpoint before sign-in can go live.')}>
            Google
          </button>
          <button type="button" className="account-provider-btn" onClick={() => setNotice('Microsoft OAuth needs an app registration, callback URL, and token exchange endpoint before sign-in can go live.')}>
            Microsoft
          </button>
        </div>
        <div className="account-notice">{notice}</div>
      </div>
    </div>
  );
}
