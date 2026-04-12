import React, { useState, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const LoadingEmptyStateSample: React.FC = () => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [rowData, setRowData] = useState<Employee[] | undefined>(undefined); // undefined면 로딩 상태를 암시

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'name' }, { field: 'department' }, { field: 'position' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  const onFetchData = () => {
    // 로딩 오버레이 수동 호출
    gridRef.current?.api.showLoadingOverlay();
    setTimeout(() => {
      setRowData(generateEmployeeData(50));
      // gridApi.hideOverlay() 는 rowData가 들어오면 알아서 닫힙니다 (설정에 따라)
    }, 2000);
  };

  const onClearData = () => {
    setRowData([]); // 빈 배열을 넣으면 '데이터 없음' 마크가 나옵니다
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="20. Loading / Empty State (스피너 & 빈 화면)" description="백엔드 통신 중일 때 돌아가는 로딩 표시나, 데이터가 0건일 때의 레이아웃을 처리합니다."
        coreFeatures={[
          "<code>rowData={undefined}</code> 혹은 <code>api.showLoadingOverlay()</code>: 로딩 스피너 작동",
          "<code>rowData={[]}</code>: 표시할 데이터가 없다는 No Rows 빈 화면 문구 표출"
        ]}
        usageScenarios="API 기반의 SPA(React) 환경에서는 필수적인 UX 요소입니다. 단순히 데이터가 비었는지, 아직 응답이 오지 않은 상태인지를 사용자가 명확히 알 수 있게 해줍니다."
      />
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={onFetchData} style={{ padding: '8px 16px', background: '#eab308', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          ⏳ 서버에 데이터 요청 (2초 지연 로딩)
        </button>
        <button onClick={onClearData} style={{ padding: '8px 16px', background: '#94a3b8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          🗑 데이터 없음으로 치우기
        </button>
      </div>
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> ref={gridRef} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          overlayLoadingTemplate={`<span class="ag-overlay-loading-center" style="border: 2px solid #eab308; padding: 10px; border-radius: 4px; color: #ca8a04;">데이터를 불러오는 중입니다...</span>`}
          overlayNoRowsTemplate={`<span style="font-size: 1.2rem; color: #94a3b8;">조회된 직원이 없습니다.</span>`}
        />
      </div></div>
    </div>
  );
};
export default LoadingEmptyStateSample;
