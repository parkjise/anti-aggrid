import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type ICellRendererParams } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './CellRendererSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

// 1. 상태를 태그 형태로 예쁘게 꾸미는 렌더러
const StatusBadgeRenderer = (params: ICellRendererParams) => {
  const isActive = params.value as boolean;
  return (
    <span style={{ 
      padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', 
      background: isActive ? '#dcfce7' : '#fee2e2', color: isActive ? '#16a34a' : '#dc2626' 
    }}>
      {isActive ? '✅ 재직중' : '❌ 퇴사/휴직'}
    </span>
  );
};

// 2. 버튼 클릭 액션을 포함하는 렌더러
const ActionButtonRenderer = (params: ICellRendererParams) => {
  const { data } = params;
  if(!data) return null;
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', height: '100%' }}>
      <button style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #3b82f6', background: '#eff6ff', color: '#3b82f6', cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => alert(`[${data.name}]님의 상세 프로필을 조회합니다.`)}>
        프로필
      </button>
    </div>
  );
};

const CellRendererSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'name' },
    { field: 'department' },
    { 
      field: 'isActive', 
      headerName: 'Status Badge', 
      cellRenderer: StatusBadgeRenderer, 
      width: 140 
    },
    { 
      headerName: 'Actions', 
      cellRenderer: ActionButtonRenderer, 
      width: 150, 
      sortable: false, 
      filter: false 
    }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1, minWidth: 100 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="10. Cell Renderer (커스텀 셀 렌더러)" description="가장 많이 쓰이는 옵션 중 하나! 단순 텍스트 대신 React 컴포넌트(버튼, 배지 등)를 데이터에 씌웁니다."
        coreFeatures={[
          "<code>cellRenderer: React.FC</code>: 셀 내부에 개발자가 직접 짠 커스텀 UI(JSX)를 마운트",
          "<code>params.data</code>: 렌더러 내부에서 해당 행의 원본 데이터를 내려받아 외부 시스템 이벤트와 연결"
        ]}
        usageScenarios="행마다 '상세보기' 팝업 띄우기 버튼을 삽입하거나, DB 상태값(true/false)을 분석하여 예쁜 뱃지(Badge) 컴포넌트로 꾸밀 때 사용되는 코어 기능입니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="CellRendererSample.tsx" />
    </div>
  );
};
export default CellRendererSample;
