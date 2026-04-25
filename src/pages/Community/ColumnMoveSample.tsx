import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './ColumnMoveSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

const ColumnMoveSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo', lockPosition: 'left' }, // 번호는 왼쪽 고정하여 이동 불가
    { field: 'name' },
    { field: 'department' },
    { field: 'position' },
    { field: 'salary' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    flex: 1,
    suppressMovable: false // 헤더 드래그 앤 드롭 이동 허용
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="15. Column Move (컬럼 이동 잠금/허용)" description="헤더를 드래그 앤 드롭하여 위치를 변경하거나, 특정 컬럼은 위치를 고정시킵니다."
        coreFeatures={[
          "<code>suppressMovable: false</code>: 사용자가 헤더를 드래그하여 순서를 바꿀 수 있도록 허용",
          "<code>lockPosition: 'left'</code>: 사원번호처럼 중요한 데이터는 드래그로 위치가 바뀌지 않도록 좌/우측에 강제 고정"
        ]}
        usageScenarios="현업 담당자마다 자주 보는 컬럼의 순서가 다릅니다. 이 기능을 허용해 주면 각 담당자가 입맛에 맞게 화면을 커스텀해서 사용할 수 있습니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="ColumnMoveSample.tsx" />
    </div>
  );
};
export default ColumnMoveSample;
