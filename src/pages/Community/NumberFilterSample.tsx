import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type INumberFilterParams } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const NumberFilterSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(500));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'name', headerName: 'Name' },
    { 
      field: 'salary', 
      headerName: 'Salary',
      filter: 'agNumberColumnFilter',
      filterParams: {
        filterOptions: ['greaterThan', 'lessThan', 'equals', 'inRange'],
      } as INumberFilterParams,
      valueFormatter: p => `$${(p.value || 0).toLocaleString()}`
    },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1, minWidth: 120, floatingFilter: true }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="4. Number Filter (숫자 필터)" description="숫자 대소 비교 및 범위 검색에 특화된 필터입니다."
        coreFeatures={[
          "<code>filter: 'agNumberColumnFilter'</code>: 숫자 전용 필터 활성화",
          "<code>inRange</code>: '에서 ~ 까지' 범위 필터링 제공"
        ]}
        usageScenarios="매출액, 재고량, 연봉 등 크기 비교가 중요한 데이터에 쓰입니다. 특정 금액 이상 조회 등에 아주 유용합니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
    </div>
  );
};
export default NumberFilterSample;
