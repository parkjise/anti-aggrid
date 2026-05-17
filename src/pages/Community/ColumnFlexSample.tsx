import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './ColumnFlexSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

const ColumnFlexSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(20));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { 
      field: 'employeeNo', 
      headerName: 'ID (Fixed)', 
      width: 100, 
      flex: 0 // 고정 너비
    },
    { 
      field: 'name', 
      headerName: 'Name (Flex 1)', 
      flex: 1, 
      minWidth: 120 
    },
    { 
      field: 'department', 
      headerName: 'Department (Flex 1)', 
      flex: 1 
    },
    { 
      field: 'email', 
      headerName: 'Email (Flex 2 + MinWidth)', 
      flex: 2, 
      minWidth: 250 
    },
    { 
      field: 'position', 
      headerName: 'Position (Flex 1)', 
      flex: 1 
    },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    resizable: true,
    sortable: true,
    filter: true,
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="22. Column Flex (유연한 컬럼 너비)"
        description="브라우저 크기에 따라 컬럼 너비가 자동으로 조절되도록 설정합니다."
        coreFeatures={[
          "<code>flex</code>: 숫자가 클수록 더 많은 여유 공간을 차지합니다 (0은 고정).",
          "<code>minWidth</code>: 컬럼이 아무리 줄어들어도 유지해야 할 최소 너비입니다.",
          "<code>defaultColDef.flex</code>: 모든 컬럼에 기본 flex 값을 부여할 수 있습니다."
        ]}
        usageScenarios="반응형 웹 대시보드에서 가로 스크롤을 최소화하면서도 중요한 데이터(예: 이메일)에 더 많은 공간을 할당하고 싶을 때 사용합니다."
      />

      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}>
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
           <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="ColumnFlexSample.tsx" />
    </div>
  );
};

export default ColumnFlexSample;
