import React, { useState, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type GridSizeChangedEvent, type GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './ColumnFitSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

const ColumnFitSample: React.FC = () => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(20));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 120 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'position', headerName: 'Position', width: 150 },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    resizable: true,
  }), []);

  // 버튼 클릭 시 수동으로 호출하는 API 방식
  const onFitColumns = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, []);

  // 그리드 크기가 변할 때 자동으로 호출 (반응형 구현)
  const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="23. Column Fit (그리드 너비에 맞춤)"
        description="sizeColumnsToFit API와 autoSizeStrategy를 사용하여 컬럼을 그리드 너비에 꽉 채웁니다."
        coreFeatures={[
          "<code>autoSizeStrategy</code>: 'fitGridWidth' 타입을 사용하여 초기 로딩 시 자동 조절합니다.",
          "<code>api.sizeColumnsToFit()</code>: 명령형 API로 원할 때 언제든 너비를 재조정할 수 있습니다.",
          "<code>onGridSizeChanged</code>: 그리드 컨테이너 크기가 바뀔 때 API를 호출하여 반응형을 구현합니다."
        ]}
        usageScenarios="Flex 속성을 개별 컬럼에 설정하기 번거롭거나, 특정 시점에 전체 컬럼 너비를 그리드 폭에 딱 맞추고 싶을 때 사용합니다."
      />

      <div style={{ marginBottom: '8px' }}>
        <button 
          onClick={onFitColumns}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Fit Columns Now (API 호출)
        </button>
      </div>

      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}>
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
           <AgGridReact<Employee> theme="legacy"
            ref={gridRef}
            rowHeight={40} 
            headerHeight={40}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoSizeStrategy={{ type: 'fitGridWidth' }}
            onGridSizeChanged={onGridSizeChanged}
          />
        </div>
      </div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="ColumnFitSample.tsx" />
    </div>
  );
};

export default ColumnFitSample;
