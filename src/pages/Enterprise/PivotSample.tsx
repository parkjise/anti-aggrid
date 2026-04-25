import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './PivotSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const PivotSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    // 세로축 (Row Grouping)
    { field: 'department', rowGroup: true },
    // 가로축 분할 (Pivot)
    { field: 'position', pivot: true },
    // 피벗 셀 안에 들어갈 데이터 단위
    { field: 'salary', aggFunc: 'sum', valueFormatter: p => `$${(p.value||0).toLocaleString()}` },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1, minWidth: 120 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="7. Pivot (피벗 테이블)" description="데이터를 행과 열 두 방향으로 쪼개어 그룹핑하는 엑셀의 꽃, 피벗 모드입니다."
        coreFeatures={[
          "<code>pivotMode={true}</code>: 일반 그리드를 피벗 모드 엔진으로 교체",
          "<code>rowGroup: true</code> (세로축 기준), <code>pivot: true</code> (가로축 기준), <code>aggFunc</code> (교차점 값 집계)"
        ]}
        usageScenarios="'월별(가로) 카테고리별(세로) 매출액(값)'과 같이 다차원 분석 데이터 구조를 뿜어낼 때, 백엔드에서 복잡한 Pivot 쿼리를 짜지 않아도 클라이언트에서 이 화면을 한 방에 구성합니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          pivotMode={true} 
        />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="PivotSample.tsx" />
    </div>
  );
};
export default PivotSample;
