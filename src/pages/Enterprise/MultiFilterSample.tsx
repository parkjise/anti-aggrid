import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './MultiFilterSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const MultiFilterSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'name' },
    { 
      field: 'department', 
      // Multi Column 필터는 보통 Text 기반 검색과 + Set(체크박스) 검색을 동시에 지원할 때 사용합니다.
      filter: 'agMultiColumnFilter', 
      filterParams: {
        filters: [
          { filter: 'agTextColumnFilter', display: 'subMenu' },
          { filter: 'agSetColumnFilter' }
        ]
      }
    },
    { field: 'salary', filter: 'agNumberColumnFilter' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="2. Multi Filter (다중 필터 조합)" description="하나의 열에 두 가지 이상의 필터(예: Text 필터 + Set 필터)를 중첩해서 사용합니다."
        coreFeatures={[
          "<code>filter: 'agMultiColumnFilter'</code>: 필터 패널에 두 가지 필터를 함께 배치",
          "<code>filterParams.filters</code>: 조합할 필터 종류의 배열 전달"
        ]}
        usageScenarios="고객명부에 너무 다양한 카테고리가 섞여있어서, 'A로 시작하는 단어(Text)'를 찾으면서 동시에 체크박스(Set)로도 제어하고 싶을 때 사용합니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="MultiFilterSample.tsx" />
    </div>
  );
};
export default MultiFilterSample;
