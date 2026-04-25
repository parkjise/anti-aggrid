import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './AggregationSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const AggregationSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'department', rowGroup: true, hide: true },
    { field: 'name' },
    // 연봉은 집계(Aggregation)되어 그룹 타이틀에 함께 나옵니다.
    { field: 'salary', aggFunc: 'sum', valueFormatter: p => `$${(p.value||0).toLocaleString()}` },
    { field: 'joinDate', aggFunc: 'count' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="6. Aggregation (집계 함수)" description="그룹핑을 수행할 때 묶여 있는 자식 행들의 숫자들을 자동으로 합산, 평균 계산합니다."
        coreFeatures={[
          "<code>aggFunc: 'sum' | 'min' | 'max' | 'avg' | 'count'</code>: 그룹별 합계 생성"
        ]}
        usageScenarios="부서별로 폴더가 묶였을 때, 묶인 행들의 총 매출, 평균 급여 등을 상위 폴더 행에 실시간으로 표시해주고 싶을 때 사용합니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          autoGroupColumnDef={{ headerName: '조직 (부서)', minWidth: 200 }} 
        />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="AggregationSample.tsx" />
    </div>
  );
};
export default AggregationSample;
