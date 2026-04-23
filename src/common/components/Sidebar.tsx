import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const communitySamples = [
  { path: '/community/basic', label: '1. Basic Grid' },
  { path: '/community/sorting', label: '2. Sorting' },
  { path: '/community/text-filter', label: '3. Text Filter' },
  { path: '/community/number-filter', label: '4. Number Filter' },
  { path: '/community/date-filter', label: '5. Date Filter' },
  { path: '/community/quick-filter', label: '6. Quick Filter' },
  { path: '/community/external-filter', label: '7. External Filter' },
  { path: '/community/row-selection', label: '8. Row Selection' },
  { path: '/community/row-numbers', label: '9. Row Numbers' },
  { path: '/community/cell-renderer', label: '10. Cell Renderer' },
  { path: '/community/editable-cell', label: '11. Editable Cell' },
  { path: '/community/select-editor', label: '12. Select Editor' },
  { path: '/community/checkbox-editor', label: '13. Checkbox Editor' },
  { path: '/community/column-resize', label: '14. Column Resize' },
  { path: '/community/column-move', label: '15. Column Move' },
  { path: '/community/column-hide-show', label: '16. Column Hide/Show' },
  { path: '/community/pagination', label: '17. Pagination' },
  { path: '/community/csv-export', label: '18. CSV Export' },
  { path: '/community/custom-cell-style', label: '19. Custom Cell Style' },
  { path: '/community/loading-empty-state', label: '20. Loading / Empty State' },
];

const enterpriseSamples = [
  { path: '/enterprise/set-filter', label: '1. Set Filter' },
  { path: '/enterprise/multi-filter', label: '2. Multi Filter' },
  { path: '/enterprise/advanced-filter', label: '3. Advanced Filter' },
  { path: '/enterprise/excel-export', label: '4. Excel Export' },
  { path: '/enterprise/row-grouping', label: '5. Row Grouping' },
  { path: '/enterprise/aggregation', label: '6. Aggregation' },
  { path: '/enterprise/pivot', label: '7. Pivot' },
  { path: '/enterprise/master-detail', label: '8. Master Detail' },
  { path: '/enterprise/tree-data', label: '9. Tree Data' },
  { path: '/enterprise/range-selection', label: '10. Range Selection' },
  { path: '/enterprise/clipboard', label: '11. Clipboard' },
  { path: '/enterprise/fill-handle', label: '12. Fill Handle' },
  { path: '/enterprise/status-bar', label: '13. Status Bar' },
  { path: '/enterprise/columns-tool-panel', label: '14. Columns Tool Panel' },
  { path: '/enterprise/filters-tool-panel', label: '15. Filters Tool Panel' },
  { path: '/enterprise/context-menu', label: '16. Context Menu' },
  { path: '/enterprise/batch-editing', label: '17. Batch Editing' },
  { path: '/enterprise/undo-redo', label: '18. Undo / Redo' },
  { path: '/enterprise/ssrm', label: '19. Server-Side Row Model' },
  { path: '/enterprise/integrated-charts', label: '20. Integrated Charts' },
];

const stylingSamples = [
  { path: '/styling/scss', label: '1. Theme Custom (SCSS)' },
  { path: '/styling/styled-components', label: '2. Styled-Components Wrapper' },
  { path: '/styling/row-height', label: '3. Row & Header Height' },
  { path: '/styling/cell-border', label: '4. Cell Border Styling' },
  { path: '/styling/cell-alignment', label: '5. Cell Alignment' },
  { path: '/styling/cell-class-alignment', label: '6. Cell Class Alignment' },
];

const SidebarItem: React.FC<{ title: string; items: {path: string, label: string}[] }> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (items.length === 0) return null;

  return (
    <div style={{ marginBottom: '16px' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ padding: '10px 20px', color: '#fff', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.05)', userSelect: 'none' }}
      >
        {title} <span style={{ fontSize: '0.8em' }}>{isOpen ? '▼' : '▶'}</span>
      </div>
      {isOpen && (
         <nav style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
    <aside className="sidebar" style={{ width: '280px', overflowY: 'auto', flexShrink: 0 }}>
      <div className="sidebar-header" style={{ marginBottom: '8px' }}>
        AG Grid 실무 가이드
      </div>
      <SidebarItem title="Community 기능" items={communitySamples} />
      <SidebarItem title="Enterprise 기능" items={enterpriseSamples} />
      <SidebarItem title="스타일링 & 테마" items={stylingSamples} />
    </aside>
  );
};

export default Sidebar;
