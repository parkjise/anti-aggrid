import React, { useState, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const ColumnHideShowSample: React.FC = () => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(100));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' },
    { field: 'name' },
    { field: 'department' },
    { field: 'salary' }, // 이 열을 숨기거나 보여줍니다.
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  const toggleSalaryColumn = (visible: boolean) => {
    gridRef.current?.api.setColumnsVisible(['salary'], visible);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="16. Column Hide/Show (컬럼 숨기기/보이기)" description="외부 버튼을 이용해 특정 컬럼을 동적으로 숨기거나 보여줍니다."
        coreFeatures={[
          "<code>api.setColumnsVisible(['colId'], true/false)</code>: 특정 컬럼 배열의 표시 여부 동적 제어"
        ]}
        usageScenarios="권한(관리자/일반사용자)에 따라 '연봉', '원가' 등 민감한 데이터 열을 숨기거나, 화면 크기가 좁아질 때 중요도가 떨어지는 열을 접을 수 있습니다."
      />
      <div style={{ padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
        <strong>급여 열 조작: </strong>
        <button onClick={() => toggleSalaryColumn(true)} style={{ marginLeft: '8px', padding: '6px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>급여 보이기</button>
        <button onClick={() => toggleSalaryColumn(false)} style={{ marginLeft: '8px', padding: '6px 12px', background: '#94a3b8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>급여 숨기기</button>
      </div>
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> ref={gridRef} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
    </div>
  );
};
export default ColumnHideShowSample;
