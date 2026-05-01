import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './GridHeight100Sample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

interface DataRow {
  id: string;
  name: string;
  status: string;
  role: string;
}

const GridHeight100Sample: React.FC = () => {
  // 스크롤이 생기도록 충분한 양의 데이터를 생성합니다.
  const [rowData] = useState<DataRow[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: `USER-${i + 1}`,
      name: `사용자 ${i + 1}`,
      status: i % 3 === 0 ? '완료' : '진행중',
      role: i % 2 === 0 ? 'Admin' : 'User'
    }))
  );

  const columnDefs = useMemo<ColDef<DataRow>[]>(() => [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'name', headerName: '이름', flex: 1 },
    { field: 'role', headerName: '권한', width: 150 },
    { field: 'status', headerName: '상태', width: 150 },
  ], []);

  return (
    // 1. 가장 바깥쪽 부모는 전체 높이(height: 100%)와 flex-direction: column을 가져야 합니다.
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="9. Grid Height 100% (그리드 높이 100% 꽉 채우기)"
        description="상단 검색 영역이나 헤더를 제외한 나머지 화면의 모든 높이를 그리드가 차지하도록 설정하는 실무 표준 레이아웃 예제입니다."
        coreFeatures={[
          "전체 컨테이너: <code>display: flex; flexDirection: column; height: 100%;</code>",
          "그리드 래퍼: <code>flex: 1; minHeight: 0;</code> (Flex 자식이 자신의 콘텐츠 크기보다 작아질 수 있도록 min-height 0 필수)",
          "AG Grid 부모 div: <code>height: '100%', width: '100%'</code> 지정"
        ]}
        usageScenarios="브라우저 자체의 스크롤바가 생기지 않고, 화면에 꽉 찬 엑셀이나 ERP 프로그램처럼 그리드 내부에서만 스크롤되도록 만들 때 사용합니다."
      />

      {/* 상단 고정 영역 (예: 검색 필터) */}
      <div style={{ padding: '20px', background: '#fff', border: '1px solid var(--border)', borderRadius: '8px' }}>
        <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-dark)' }}>
          🔍 상단 검색 영역 (이 영역의 높이를 제외한 나머지 모든 공간을 아래 그리드가 차지합니다)
        </p>
      </div>

      {/* 2. 그리드 영역이 남은 공간을 모두 차지하도록 flex: 1 설정 */}
      {/* minHeight: 0 은 flex 컨테이너 내부에서 내용물이 넘칠 때 그리드가 자체 스크롤을 갖도록 하기 위해 매우 중요합니다. */}
      <div className="grid-wrapper" style={{ flex: 1, padding: 0, minHeight: 0, overflow: 'hidden' }}>
        
        {/* 3. AG Grid는 반드시 구체적인 높이(100% 등)를 가진 컨테이너 안에 있어야 렌더링됩니다. */}
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
           <AgGridReact<DataRow> 
            theme="legacy"
            rowData={rowData}
            columnDefs={columnDefs}
          />
        </div>
      </div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="GridHeight100Sample.tsx" />
    </div>
  );
};

export default GridHeight100Sample;
