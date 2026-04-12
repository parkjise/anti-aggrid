import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type ITextFilterParams } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const TextFilterSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(500));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo', headerName: 'Emp No' },
    { 
      field: 'name', 
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith'],
        defaultOption: 'contains',
      } as ITextFilterParams
    },
    { 
      field: 'department', 
      headerName: 'Department',
      filter: 'agTextColumnFilter'
    },
    { field: 'position', headerName: 'Position' },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    flex: 1, minWidth: 120, floatingFilter: true,
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="3. Text Filter (텍스트 필터)" description="문자열 데이터에 특화된 텍스트 필터 옵션 예제입니다."
        coreFeatures={[
          "<code>filter: 'agTextColumnFilter'</code>: 텍스트 전용 필터 적용",
          "<code>filterParams.filterOptions</code>: 사용자에게 제공할 조건식('포함', '시작 단어' 등)을 제한하거나 커스텀합니다."
        ]}
        usageScenarios="이름, 주소, 상품명과 같은 문자열 데이터를 검색할 때 필수적입니다. 실무에서는 사용자가 헷갈리지 않게 '포함됨(contains)' 조건을 디폴트로 걸어주는 것이 좋습니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
    </div>
  );
};
export default TextFilterSample;
