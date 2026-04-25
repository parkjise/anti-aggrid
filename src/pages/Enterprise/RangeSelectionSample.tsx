import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './RangeSelectionSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const RangeSelectionSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, 
    { field: 'position' }, { field: 'salary' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="10. Range Selection (범위 선택 및 클립보드)" description="엑셀처럼 마우스를 누른 채로 쓱 드래그하면, 파란색 점선이 쳐지면서 다수의 셀 블록이 통째로 선택집계(Ctrl+C 동작)됩니다."
        coreFeatures={[
          "<code>enableRangeSelection={true}</code>: 드래그 영역 선택 활성화",
          "Ctrl+C: 선택된 데이터를 운영체제 클립보드로 복사 호환"
        ]}
        usageScenarios="복잡한 분석 업무를 하는 기획자나 재무팀은 그리드 내의 셀 일부 영역만 드래그하여 자신들의 엑셀 시트에 Ctrl+C, Ctrl+V 하고 싶어합니다. 이 때 반드시 켜주어야 합니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          enableRangeSelection={true} 
        />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="RangeSelectionSample.tsx" />
    </div>
  );
};
export default RangeSelectionSample;
