export default function Tabs({ tabs, activeTabId, setActiveTab, closeTab }) {
  if (!tabs.length) {
    return <div className="tabs empty" />;
  }

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${tab.id === activeTabId ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          title={tab.name}
        >
          <span className="tab-name">{tab.name}</span>
          <span className={`tab-dirty ${tab.dirty ? 'visible' : ''}`}>{tab.dirty ? '*' : ''}</span>
          <button
            className="tabClose"
            type="button"
            aria-label={`Close ${tab.name}`}
            onClick={(event) => {
              event.stopPropagation();
              closeTab(tab.id);
            }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
