import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type StatusPanelDef } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './StatusBarSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const StatusBarSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'name' }, { field: 'department', filter: true }, 
    { field: 'salary', filter: 'agNumberColumnFilter', valueFormatter: p => `$${(p.value||0).toLocaleString()}` }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  const statusBar = useMemo<{ statusPanels: StatusPanelDef[] }>(() => ({
    statusPanels: [
      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
      { statusPanel: 'agTotalRowCountComponent', align: 'center' },
      { statusPanel: 'agFilteredRowCountComponent' },
      { statusPanel: 'agSelectedRowCountComponent' },
      { statusPanel: 'agAggregationComponent' } // 가장 우측 합계/평균
    ]
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="13. Status Bar (상태 집계 표시줄)" description="그리드 최하단에 엑셀처럼 실시간 행 개수 및 통계(합산/평균/수량) 상태 툴바를 부착합니다."
        coreFeatures={[
          "<code>statusBar.statusPanels</code>: 하단 바에 어떤 컴포넌트를 배치할지 배열로 정의",
          "<code>agAggregationComponent</code>: 마우스로 숫자열 영역(Range)을 드래그하면, 우측 하단에 자동으로 Sum/Avg/Min/Max 가 즉시 계산됨"
        ]}
        usageScenarios="숫자 데이터(예: 급여 열) 일부를 마우스로 쭉 긁었을 때 하단에 '합계: $150,000' 이라고 바로 떠주기를 기대하는 임원진(의사결정권자)의 요구를 한 방에 만족시킵니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          enableRangeSelection={true} 
          rowSelection="multiple"
          statusBar={statusBar}
        />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="StatusBarSample.tsx" />
    </div>
  );
};
export default StatusBarSample;
