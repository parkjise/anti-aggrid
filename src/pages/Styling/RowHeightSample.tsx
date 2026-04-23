import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const RowHeightSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(50));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' },
    { field: 'name' },
    { field: 'department' },
    { field: 'salary' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    flex: 1,
    cellStyle: { display: 'flex', alignItems: 'center' }
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="21. Header & Row Height (높이 조절)" description="그리드의 헤더(Header) 및 개별 로우(Row)의 높이를 자유롭게 조절합니다."
        coreFeatures={[
          "<code>headerHeight={80}</code>: 그리드의 헤더 영역 높이를 일괄 고정 (기본값보다 높게)",
          "<code>rowHeight={60}</code>: 데이터가 표시되는 모든 일반 로우의 높이를 일괄 고정"
        ]}
        usageScenarios="표안에 썸네일 이미지를 넣거나, 다줄 텍스트(멀티 라인)를 표시해야 해서 답답한 기본 로우 높이를 크게 늘려야 할 때 사용합니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> 
          rowData={rowData} 
          columnDefs={columnDefs} 
          defaultColDef={defaultColDef} 
          headerHeight={80} // 헤더 높이를 80px로 수정
          rowHeight={60}    // 로우 높이를 60px로 수정
        />
      </div></div>
    </div>
  );
};
export default RowHeightSample;
