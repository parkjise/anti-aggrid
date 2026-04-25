import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type ValueGetterParams } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './RowNumbersSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

const RowNumbersSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { 
      headerName: 'No.', 
      valueGetter: (params: ValueGetterParams) => {
        return params.node ? params.node.rowIndex! + 1 : null;
      },
      width: 80,
      suppressHeaderMenuButton: true, // v32/v35+ 최신 메뉴 숨김 프롭스
      sortable: false,
      pinned: 'left' // 가로 스크롤 시에도 맨 왼쪽에 고정되게
    },
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, { field: 'salary' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1, sortable: true }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="9. Row Numbers (가상 순번 컬럼)" description="원본 데이터에 없는 가상의 순번(No) 열을 좌측에 동적으로 생성합니다."
        coreFeatures={[
          "<code>valueGetter</code>: 원본 데이터 필드 매핑이 아닌, 그리드의 내부 rowIndex 속성을 참조해 화면에만 데이터 렌더링",
          "<code>pinned: 'left'</code>: 화면 가로 길이가 길어져 우측으로 스크롤하더라도 항상 맨 왼쪽에 고정"
        ]}
        usageScenarios="게시판 목록이나 결제 내역의 맨 앞에 '1, 2, 3...' 번호를 달아둘 때 유용하며, 이름순/날짜순으로 컬럼 정렬을 가해도 항상 1번부터 차례대로 번호가 재배치됩니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="RowNumbersSample.tsx" />
    </div>
  );
};
export default RowNumbersSample;
