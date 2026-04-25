import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './PaginationSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

const PaginationSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, { field: 'salary' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="17. Pagination (클라이언트 페이지네이션)" description="대용량 데이터를 10, 20, 50건씩 쪼개어 보여줍니다."
        coreFeatures={[
          "<code>pagination={true}</code>: 클라이언트 사이드 페이징 엔진 활성화",
          "<code>paginationPageSizeSelector={[10, 20, 50]}</code>: 우측 하단에 페이지 개수 선택 드롭다운 노출",
          "<code>paginationPageSize={20}</code>: 첫 렌더링 시 노출할 개수"
        ]}
        usageScenarios="수천 건의 데이터를 한 번에 그리면 브라우저 DOM이 무거워져 스크롤 렉이 발생합니다. 페이징 처리는 데이터 그리드 최적화의 첫 걸음입니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} 
          rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50, 100]}
        />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="PaginationSample.tsx" />
    </div>
  );
};
export default PaginationSample;
