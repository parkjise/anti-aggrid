import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const ColumnResizeSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(100));

  // flex가 아닌 고정 width를 부여해야 리사이징 테스트가 용이
  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo', width: 120 },
    { field: 'name', width: 150 },
    { field: 'email', width: 250 },
    { field: 'department', width: 120 }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    resizable: true, // 사용자가 드래그로 너비를 늘리고 줄일 수 있음
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="14. Column Resize (컬럼 너비 조절)" description="사용자가 마우스 드래그로 헤더 경계를 잡아 컬럼의 너비를 동적으로 변경합니다."
        coreFeatures={[
          "<code>resizable: true</code>: 이 옵션을 적용하면 헤더 컬럼 간 경계선에 리사이즈 핸들이 생성됩니다."
        ]}
        usageScenarios="이메일, 주소, 비고(메모) 란 처럼 내용이 길어서 잘릴 수 있는 데이터가 있을 경우 필수입니다. 사용자가 직접 너비를 조정하게 열어두는 것이 좋습니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
    </div>
  );
};
export default ColumnResizeSample;
