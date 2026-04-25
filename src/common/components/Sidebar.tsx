import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { communitySamples, enterpriseSamples, stylingSamples, type SampleMenuItem } from '../sampleMenu';

const SidebarItem: React.FC<{ title: string; items: SampleMenuItem[], icon?: React.ReactNode }> = ({ title, items, icon }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (items.length === 0) return null;

  return (
    <div style={{ marginBottom: '10px' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ padding: '12px 20px', color: 'var(--text-dark)', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#96A0AF', display: 'flex' }}>{icon}</span>
          {title}
        </div>
        <span style={{ fontSize: '0.8em', color: '#96A0AF', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>▶</span>
      </div>
      {isOpen && (
        <nav style={{ padding: '4px 0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              title={item.label}
            >
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.label}
              </div>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header" style={{ padding: '0 20px', marginBottom: '10px' }}>
        AG Grid 가이드
      </div>
      <div style={{ overflowY: 'auto', flex: 1, paddingBottom: '20px' }}>
        <SidebarItem
          title="Community 기능"
          items={communitySamples}
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
        />
        <SidebarItem
          title="Enterprise 기능"
          items={enterpriseSamples}
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>}
        />
        <SidebarItem
          title="스타일링 & 테마"
          items={stylingSamples}
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4.9V17L12 22l-9-4.9V7z"></path></svg>}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
