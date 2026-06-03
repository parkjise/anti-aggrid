import React, { useMemo, useState } from 'react';
import { type ColDef, type ICellRendererParams } from 'ag-grid-community';
import { CommonGrid } from '../../common/components/CommonGrid';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

// ----------------------------------------------------------------------------
// [커스텀 셀 렌더러 정의 영역]
// TypeScript 환경에서 이벤트 버블링(상위로 전달)을 깔끔하게 처리하기 위한 패턴입니다.
// ----------------------------------------------------------------------------

// 1. 태그(Tag) UI를 그리는 Cell Renderer
const StatusTagRenderer = (params: ICellRendererParams<Employee>) => {
  const value = params.value;
  // 부서에 따라 다른 색상 부여 (예시)
  const isDev = value === 'Engineering';
  const bgColor = isDev ? '#e3f2fd' : '#fce4ec';
  const textColor = isDev ? '#1565c0' : '#c2185b';

  return (
    <span style={{
      backgroundColor: bgColor,
      color: textColor,
      padding: '4px 8px',
      borderRadius: '4px',
      fontWeight: 'bold',
      fontSize: '12px'
    }}>
      {value}
    </span>
  );
};

// 2. 버튼 클릭 이벤트가 있는 Cell Renderer
// AG Grid의 context를 통해 외부의 함수(콜백)를 주입받아 실행합니다.
const ActionButtonRenderer = (params: ICellRendererParams<Employee>) => {
  const handleAction = () => {
    // params.context에서 함수를 꺼내어 호출 (이벤트 상위 전달)
    if (params.context && params.context.onRowAction) {
      params.context.onRowAction(params.data);
    }
  };

  return (
    <button 
      onClick={handleAction}
      style={{
        padding: '4px 12px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      상세 보기
    </button>
  );
};


// ----------------------------------------------------------------------------
// [공통 컴포넌트 사용 예시 페이지]
// ----------------------------------------------------------------------------
const UsageExample: React.FC = () => {
  // 가상 데이터 로드
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(50));

  // 커스텀 셀 렌더러에서 발생한 이벤트를 처리하는 부모 함수
  const handleRowAction = (data?: Employee) => {
    if (data) {
      alert(`[${data.employeeNo}] ${data.name}님의 상세 정보를 엽니다.`);
    }
  };

  // 컬럼 정의 (외부 주입)
  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo', headerName: '사번', width: 100 },
    { field: 'name', headerName: '이름', width: 120 },
    { 
      field: 'department', 
      headerName: '부서 (Tag)', 
      width: 150,
      cellRenderer: StatusTagRenderer // 컴포넌트 직접 주입
    },
    { field: 'salary', headerName: '연봉', width: 120 },
    { field: 'joinDate', headerName: '입사일', width: 120 },
    { 
      headerName: '액션', 
      width: 120,
      cellRenderer: ActionButtonRenderer,
      // 정렬 및 필터 불필요 (CommonGrid의 defaultColDef 무효화)
      sortable: false,
      filter: false 
    },
  ], []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="전사 공통 AG Grid 컴포넌트"
        description="개발팀 누구나 일관된 UI와 로직(정렬, 필터 기본 내장)을 사용할 수 있는 CommonGrid 사용 예시입니다."
        coreFeatures={[
          "<code>autoFitColumns</code>: 초기 로딩 시 테이블 꽉 채우기 옵션",
          "<code>paginationType='client'</code>: 내부 페이징 간편 활성화",
          "<code>cellRenderer & context</code>: 커스텀 버튼 렌더러와 이벤트 외부 주입 패턴"
        ]}
        usageScenarios="신규 화면 개발 시 AG Grid 설정을 반복하지 않고 CommonGrid 컴포넌트만 재사용합니다."
      />

      <div style={{ flex: 1, padding: 0 }}>
        {/* CommonGrid 컴포넌트 호출 */}
        <CommonGrid<Employee>
          rowData={rowData}
          columnDefs={columnDefs}
          autoFitColumns={true} // 자동 크기 조절 옵션
          paginationType="client" // 클라이언트 페이징 사용
          
          // ActionButtonRenderer에서 사용할 콜백 함수 전달
          context={{
            onRowAction: handleRowAction
          }}
          
          // AG Grid 고유 Props 확장 가능 테스트 (Row 클릭)
          onRowClicked={(e) => console.log('Row Clicked:', e.data?.name)}
        />
      </div>
    </div>
  );
};

export default UsageExample;
