import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './AdvancedFilterSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const AdvancedFilterSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, 
    { field: 'salary', type: 'numericColumn' }, { field: 'joinDate' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="3. Advanced Filter (고급 조합 필터)" description="엑셀이 아닌 JIRA, Github 이슈 검색기와 같은 텍스트 기반 수식 인풋 필터를 활성화합니다."
        coreFeatures={[
          "<code>enableAdvancedFilter={true}</code>: 그리드 상단에 수식을 입력할 수 있는 거대한 바(Advanced Filter) 생성",
          "AND, OR, NOT 연산자 혼합 지원 트리 기반 파싱"
        ]}
        usageScenarios="파워 유저들이나 데이터 분석가들이 복잡한 쿼리(예: 'department = Sales AND salary > 80000')를 마우스 클릭 없이 키보드만으로 빠르게 치고 싶어할 때 매우 유용합니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          enableAdvancedFilter={true} // 핵심 속성

        />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="AdvancedFilterSample.tsx" />
    </div>
  );
};
export default AdvancedFilterSample;
