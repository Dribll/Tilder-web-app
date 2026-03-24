import React, { useMemo } from 'react';

function getPrimarySymbol(content = '') {
  const patterns = [
    /export\s+default\s+function\s+([A-Za-z0-9_]+)/,
    /export\s+default\s+class\s+([A-Za-z0-9_]+)/,
    /function\s+([A-Za-z0-9_]+)/,
    /const\s+([A-Za-z0-9_]+)\s*=\s*\(/,
    /class\s+([A-Za-z0-9_]+)/,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return '';
}

export default function BreadcrumbsBar({ activeTab, rootName }) {
  if (!activeTab) {
    return null;
  }

  const crumbs = useMemo(() => {
    const base = [];
    if (rootName && !activeTab.external) {
      base.push(rootName);
    }

    if (activeTab.external || !activeTab.path) {
      base.push(activeTab.name);
    } else {
      base.push(...activeTab.path.split('/'));
    }

    const symbol = getPrimarySymbol(activeTab.content);
    if (symbol) {
      base.push(symbol);
    }

    return base;
  }, [activeTab, rootName]);

  return (
    <div className="breadcrumbs-bar">
      {crumbs.map((crumb, index) => (
        <React.Fragment key={`${crumb}-${index}`}>
          <span className={`breadcrumb-item ${index === crumbs.length - 1 ? 'active' : ''}`}>{crumb}</span>
          {index < crumbs.length - 1 ? <span className="breadcrumb-separator">{'>'}</span> : null}
        </React.Fragment>
      ))}
    </div>
  );
}
