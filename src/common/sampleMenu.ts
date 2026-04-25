export interface SampleMenuItem {
  path: string;
  label: string;
  group: string;
}

export const communitySamples: SampleMenuItem[] = [
  { path: '/community/basic', label: '1. Basic Grid', group: 'Community 기능' },
  { path: '/community/sorting', label: '2. Sorting', group: 'Community 기능' },
  { path: '/community/text-filter', label: '3. Text Filter', group: 'Community 기능' },
  { path: '/community/number-filter', label: '4. Number Filter', group: 'Community 기능' },
  { path: '/community/date-filter', label: '5. Date Filter', group: 'Community 기능' },
  { path: '/community/quick-filter', label: '6. Quick Filter', group: 'Community 기능' },
  { path: '/community/external-filter', label: '7. External Filter', group: 'Community 기능' },
  { path: '/community/row-selection', label: '8. Row Selection', group: 'Community 기능' },
  { path: '/community/row-numbers', label: '9. Row Numbers', group: 'Community 기능' },
  { path: '/community/cell-renderer', label: '10. Cell Renderer', group: 'Community 기능' },
  { path: '/community/editable-cell', label: '11. Editable Cell', group: 'Community 기능' },
  { path: '/community/select-editor', label: '12. Select Editor', group: 'Community 기능' },
  { path: '/community/checkbox-editor', label: '13. Checkbox Editor', group: 'Community 기능' },
  { path: '/community/column-resize', label: '14. Column Resize', group: 'Community 기능' },
  { path: '/community/column-move', label: '15. Column Move', group: 'Community 기능' },
  { path: '/community/column-hide-show', label: '16. Column Hide/Show', group: 'Community 기능' },
  { path: '/community/pagination', label: '17. Pagination', group: 'Community 기능' },
  { path: '/community/csv-export', label: '18. CSV Export', group: 'Community 기능' },
  { path: '/community/custom-cell-style', label: '19. Custom Cell Style', group: 'Community 기능' },
  { path: '/community/loading-empty-state', label: '20. Loading / Empty State', group: 'Community 기능' },
];

export const enterpriseSamples: SampleMenuItem[] = [
  { path: '/enterprise/set-filter', label: '1. Set Filter', group: 'Enterprise 기능' },
  { path: '/enterprise/multi-filter', label: '2. Multi Filter', group: 'Enterprise 기능' },
  { path: '/enterprise/advanced-filter', label: '3. Advanced Filter', group: 'Enterprise 기능' },
  { path: '/enterprise/excel-export', label: '4. Excel Export', group: 'Enterprise 기능' },
  { path: '/enterprise/row-grouping', label: '5. Row Grouping', group: 'Enterprise 기능' },
  { path: '/enterprise/aggregation', label: '6. Aggregation', group: 'Enterprise 기능' },
  { path: '/enterprise/pivot', label: '7. Pivot', group: 'Enterprise 기능' },
  { path: '/enterprise/master-detail', label: '8. Master Detail', group: 'Enterprise 기능' },
  { path: '/enterprise/tree-data', label: '9. Tree Data', group: 'Enterprise 기능' },
  { path: '/enterprise/range-selection', label: '10. Range Selection', group: 'Enterprise 기능' },
  { path: '/enterprise/clipboard', label: '11. Clipboard', group: 'Enterprise 기능' },
  { path: '/enterprise/fill-handle', label: '12. Fill Handle', group: 'Enterprise 기능' },
  { path: '/enterprise/status-bar', label: '13. Status Bar', group: 'Enterprise 기능' },
  { path: '/enterprise/columns-tool-panel', label: '14. Columns Tool Panel', group: 'Enterprise 기능' },
  { path: '/enterprise/filters-tool-panel', label: '15. Filters Tool Panel', group: 'Enterprise 기능' },
  { path: '/enterprise/context-menu', label: '16. Context Menu', group: 'Enterprise 기능' },
  { path: '/enterprise/batch-editing', label: '17. Batch Editing', group: 'Enterprise 기능' },
  { path: '/enterprise/undo-redo', label: '18. Undo / Redo', group: 'Enterprise 기능' },
  { path: '/enterprise/ssrm', label: '19. Server-Side Row Model', group: 'Enterprise 기능' },
  { path: '/enterprise/integrated-charts', label: '20. Integrated Charts', group: 'Enterprise 기능' },
];

export const stylingSamples: SampleMenuItem[] = [
  { path: '/styling/scss', label: '1. Theme Custom (SCSS)', group: '스타일링 & 테마' },
  { path: '/styling/styled-components', label: '2. Styled-Components Wrapper', group: '스타일링 & 테마' },
  { path: '/styling/row-height', label: '3. Row & Header Height', group: '스타일링 & 테마' },
  { path: '/styling/cell-border', label: '4. Cell Border Styling', group: '스타일링 & 테마' },
  { path: '/styling/cell-alignment', label: '5. Cell Alignment', group: '스타일링 & 테마' },
  { path: '/styling/cell-class-alignment', label: '6. Cell Class Alignment', group: '스타일링 & 테마' },
];

export const allSamples = [...communitySamples, ...enterpriseSamples, ...stylingSamples];
