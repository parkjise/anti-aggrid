import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './CheckboxEditorSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

const CheckboxEditorSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'name' },
    { field: 'department' },
    { 
      field: 'isActive', 
      headerName: 'Active Status (Edit)',
      editable: true,
      cellDataType: 'boolean' // v31+ 최신 스펙: boolean 타입 지정 시 자동으로 체크박스 렌더러/에디터가 장착됩니다.
    }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="13. Checkbox Editor (체크박스 에디터)" description="불리언(Boolean) 값을 체크박스 UI로 노출하고 편집합니다."
        coreFeatures={[
          "<code>cellDataType: 'boolean'</code>: 브라우저/AG Grid 최신 스펙에 따라 boolean 데이터에 대해 자체 체크박스 UI 자동 지원",
          "더 이상 <code>cellRenderer:'agCheckboxCellRenderer'</code> 구식 문자열을 사용하지 않아도 됩니다."
        ]}
        usageScenarios="'퇴사 여부', '승인 여부' 등 Yes/No 데이터 항목을 관리할 때, True/False 글자를 띄우는 것보다 직관적인 On/Off 체크박스를 제공하여 편집 효율을 높입니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="CheckboxEditorSample.tsx" />
    </div>
  );
};
export default CheckboxEditorSample;
