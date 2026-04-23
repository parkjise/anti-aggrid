
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './common/components/Layout';
import BasicGridSample from './pages/Community/BasicGridSample';
import SortGridSample from './pages/Community/SortGridSample';
import TextFilterSample from './pages/Community/TextFilterSample';
import NumberFilterSample from './pages/Community/NumberFilterSample';
import DateFilterSample from './pages/Community/DateFilterSample';
import QuickFilterSample from './pages/Community/QuickFilterSample';
import ExternalFilterSample from './pages/Community/ExternalFilterSample';
import RowSelectionSample from './pages/Community/RowSelectionSample';
import RowNumbersSample from './pages/Community/RowNumbersSample';
import CellRendererSample from './pages/Community/CellRendererSample';

// Phase 3
import EditableCellSample from './pages/Community/EditableCellSample';
import SelectEditorSample from './pages/Community/SelectEditorSample';
import CheckboxEditorSample from './pages/Community/CheckboxEditorSample';
import ColumnResizeSample from './pages/Community/ColumnResizeSample';
import ColumnMoveSample from './pages/Community/ColumnMoveSample';
import ColumnHideShowSample from './pages/Community/ColumnHideShowSample';
import PaginationSample from './pages/Community/PaginationSample';
import CsvExportSample from './pages/Community/CsvExportSample';
import CustomCellStyleSample from './pages/Community/CustomCellStyleSample';
import LoadingEmptyStateSample from './pages/Community/LoadingEmptyStateSample';
import ScssStyleSample from './pages/Styling/ScssStyleSample';
import StyledComponentSample from './pages/Styling/StyledComponentSample';
import RowHeightSample from './pages/Styling/RowHeightSample';
import CellBorderSample from './pages/Styling/CellBorderSample';
import CellAlignmentSample from './pages/Styling/CellAlignmentSample';
import CellClassAlignmentSample from './pages/Styling/CellClassAlignmentSample';

// Phase 4
import SetFilterSample from './pages/Enterprise/SetFilterSample';
import MultiFilterSample from './pages/Enterprise/MultiFilterSample';
import AdvancedFilterSample from './pages/Enterprise/AdvancedFilterSample';
import ExcelExportSample from './pages/Enterprise/ExcelExportSample';
import RowGroupingSample from './pages/Enterprise/RowGroupingSample';
import AggregationSample from './pages/Enterprise/AggregationSample';
import PivotSample from './pages/Enterprise/PivotSample';
import MasterDetailSample from './pages/Enterprise/MasterDetailSample';
import TreeDataSample from './pages/Enterprise/TreeDataSample';
import RangeSelectionSample from './pages/Enterprise/RangeSelectionSample';

// Phase 5
import ClipboardCopyPasteSample from './pages/Enterprise/ClipboardCopyPasteSample';
import FillHandleSample from './pages/Enterprise/FillHandleSample';
import StatusBarSample from './pages/Enterprise/StatusBarSample';
import ColumnsToolPanelSample from './pages/Enterprise/ColumnsToolPanelSample';
import FiltersToolPanelSample from './pages/Enterprise/FiltersToolPanelSample';
import ContextMenuSample from './pages/Enterprise/ContextMenuSample';
import BatchEditingSample from './pages/Enterprise/BatchEditingSample';
import UndoRedoSample from './pages/Enterprise/UndoRedoSample';
import ServerSideRowModelSample from './pages/Enterprise/ServerSideRowModelSample';
import IntegratedChartsSample from './pages/Enterprise/IntegratedChartsSample';

// 엔터프라이즈 기능 테스트를 위해 필요하지만, 데모 환경이므로 무시 (워터마크 출력)

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/community/basic" replace />} />
          
          <Route path="community/basic" element={<BasicGridSample />} />
          <Route path="community/sorting" element={<SortGridSample />} />
          <Route path="community/text-filter" element={<TextFilterSample />} />
          <Route path="community/number-filter" element={<NumberFilterSample />} />
          <Route path="community/date-filter" element={<DateFilterSample />} />
          <Route path="community/quick-filter" element={<QuickFilterSample />} />
          <Route path="community/external-filter" element={<ExternalFilterSample />} />
          <Route path="community/row-selection" element={<RowSelectionSample />} />
          <Route path="community/row-numbers" element={<RowNumbersSample />} />
          <Route path="community/cell-renderer" element={<CellRendererSample />} />
          
          {/* Phase 3 */}
          <Route path="community/editable-cell" element={<EditableCellSample />} />
          <Route path="community/select-editor" element={<SelectEditorSample />} />
          <Route path="community/checkbox-editor" element={<CheckboxEditorSample />} />
          <Route path="community/column-resize" element={<ColumnResizeSample />} />
          <Route path="community/column-move" element={<ColumnMoveSample />} />
          <Route path="community/column-hide-show" element={<ColumnHideShowSample />} />
          <Route path="community/pagination" element={<PaginationSample />} />
          <Route path="community/csv-export" element={<CsvExportSample />} />
          <Route path="community/custom-cell-style" element={<CustomCellStyleSample />} />
          <Route path="community/loading-empty-state" element={<LoadingEmptyStateSample />} />

          {/* Styling */}
          <Route path="styling/scss" element={<ScssStyleSample />} />
          <Route path="styling/styled-components" element={<StyledComponentSample />} />
          <Route path="styling/row-height" element={<RowHeightSample />} />
          <Route path="styling/cell-border" element={<CellBorderSample />} />
          <Route path="styling/cell-alignment" element={<CellAlignmentSample />} />
          <Route path="styling/cell-class-alignment" element={<CellClassAlignmentSample />} />

          {/* Phase 4 Enterprise */}
          <Route path="enterprise/set-filter" element={<SetFilterSample />} />
          <Route path="enterprise/multi-filter" element={<MultiFilterSample />} />
          <Route path="enterprise/advanced-filter" element={<AdvancedFilterSample />} />
          <Route path="enterprise/excel-export" element={<ExcelExportSample />} />
          <Route path="enterprise/row-grouping" element={<RowGroupingSample />} />
          <Route path="enterprise/aggregation" element={<AggregationSample />} />
          <Route path="enterprise/pivot" element={<PivotSample />} />
          <Route path="enterprise/master-detail" element={<MasterDetailSample />} />
          <Route path="enterprise/tree-data" element={<TreeDataSample />} />
          <Route path="enterprise/range-selection" element={<RangeSelectionSample />} />
          
          {/* Phase 5 */}
          <Route path="enterprise/clipboard" element={<ClipboardCopyPasteSample />} />
          <Route path="enterprise/fill-handle" element={<FillHandleSample />} />
          <Route path="enterprise/status-bar" element={<StatusBarSample />} />
          <Route path="enterprise/columns-tool-panel" element={<ColumnsToolPanelSample />} />
          <Route path="enterprise/filters-tool-panel" element={<FiltersToolPanelSample />} />
          <Route path="enterprise/context-menu" element={<ContextMenuSample />} />
          <Route path="enterprise/batch-editing" element={<BatchEditingSample />} />
          <Route path="enterprise/undo-redo" element={<UndoRedoSample />} />
          <Route path="enterprise/ssrm" element={<ServerSideRowModelSample />} />
          <Route path="enterprise/integrated-charts" element={<IntegratedChartsSample />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
