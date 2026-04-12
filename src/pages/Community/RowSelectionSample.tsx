import React, { useState, useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type SelectionChangedEvent } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const RowSelectionSample: React.FC = () => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(300));
  const [selectedCount, setSelectedCount] = useState(0);

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo', checkboxSelection: true, headerCheckboxSelection: true, minWidth: 150 },
    { field: 'name' }, { field: 'department' }, { field: 'position' }
  ], []);
  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  const onSelectionChanged = useCallback((e: SelectionChangedEvent) => {
    setSelectedCount(e.api.getSelectedRows().length);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="8. Row Selection (다중 객체 선택)" description="체크박스로 여러 행을 선택하여 외부 버튼 액션과 연동합니다."
        coreFeatures={[
          "<code>rowSelection='multiple'</code>: 그리드 다중 행 선택 활성화옵션 추가",
          "<code>headerCheckboxSelection: true</code>: 전체 선택 및 해제 체크박스",
          "<code>api.getSelectedRows()</code>: 선택된 원본 객체들의 배열을 즉시 추출"
        ]}
        usageScenarios="'선택된 N건 승인', '선택된 사용자에게 메일 발송' 등 복수 데이터에 대한 일괄 서버 통신을 수행할 때 프론트엔드의 기초 상태관리가 됩니다."
      />
      <div style={{ padding: '8px 12px', background: '#eff6ff', borderRadius: '4px', border: '1px solid #bfdbfe' }}>
        <strong>선택된 항목 수: </strong><span style={{ color: '#1d4ed8', fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedCount}</span>
        <button disabled={selectedCount === 0} style={{ marginLeft: '16px', padding: '6px 12px', background: selectedCount > 0 ? '#1d4ed8' : '#9ca3af', color: 'white', border: 'none', borderRadius: '4px' }}>테스트용 일괄 삭제 버튼</button>
      </div>
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> ref={gridRef} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          rowSelection="multiple" onSelectionChanged={onSelectionChanged} />
      </div></div>
    </div>
  );
};
export default RowSelectionSample;
