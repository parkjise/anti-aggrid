import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './SelectEditorSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

const SelectEditorSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'name' },
    { 
      field: 'department', 
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Sales', 'Engineering', 'HR', 'Marketing', 'Finance', 'Design']
      }
    },
    { 
      field: 'position', 
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Staff', 'Senior', 'Manager', 'Director', 'VP']
      }
    }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="12. Select Editor (드롭다운 에디터)" description="자유 텍스트 입력 대신, 정해진 배열 중에서만 선택하도록 하는 드롭다운 에디터입니다."
        coreFeatures={[
          "<code>cellEditor: 'agSelectCellEditor'</code>: 텍스트 박스 대신 Select 박스 노출",
          "<code>cellEditorParams.values</code>: 사용자가 선택할 수 있는 보기 배열"
        ]}
        usageScenarios="부서, 직급, 상태코드 등 DB에 정해진 공통 코드 범위 안에서만 값을 수정해야 휴먼 에러를 막을 수 있을 때 필수적으로 사용됩니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="SelectEditorSample.tsx" />
    </div>
  );
};
export default SelectEditorSample;
