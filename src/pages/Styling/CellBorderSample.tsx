import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type CellClassParams } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const CellBorderSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(50));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' },
    { field: 'name' },
    { 
      field: 'department',
      // 특정 컬럼(모든 셀)에 오른쪽 라인 색상을 강제로 부여
      cellStyle: { borderRight: '3px solid #ff4d4f' }
    },
    { 
      field: 'position',
      // 조건부 특정 셀 우측 라인 부여 (Director인 경우 파란색 라인)
      cellStyle: (params: CellClassParams<Employee>) => {
        if (params.value === 'Director') {
          return { borderRight: '4px solid #1677ff', backgroundColor: '#e6f4ff' };
        }
        return null; // 조건에 안 맞으면 기본 스타일
      }
    },
    { field: 'salary' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="22. Cell Border Styling (특정 셀 오른쪽 라인 색상)" description="일부 특정 컬럼이나 조건에 일치하는 셀의 우측 외곽선(Right Border) 색상과 두께를 칠해 영역을 구분합니다."
        coreFeatures={[
          "<code>cellStyle: { borderRight: '...' }</code>: 특정 컬럼 전체의 오른쪽 라인을 강조",
          "<code>cellStyle: (params) => { ... }</code>: 데이터 값을 판단하여 특정 조건을 만족하는 셀만 라인 강조"
        ]}
        usageScenarios="회계 대시보드나 비교 표에서 1분기/2분기를 구분 짓거나, 총합(SubTotal)이 끝나는 컬럼의 우측 라인을 굵게 칠해 구획을 명확히 나누고 싶을 때 사용합니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
    </div>
  );
};
export default CellBorderSample;
