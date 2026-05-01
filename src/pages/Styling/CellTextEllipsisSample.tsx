import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './CellTextEllipsisSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

interface TaskData {
  id: string;
  title: string;
  description: string;
  assignee: string;
}

const CellTextEllipsisSample: React.FC = () => {
  const [rowData] = useState<TaskData[]>([
    { id: 'TASK-1', title: '로그인 페이지 UI 개편', description: '기존 로그인 페이지의 디자인을 최신 가이드라인에 맞추어 개편하고, 소셜 로그인 버튼을 추가합니다.', assignee: '김철수' },
    { id: 'TASK-2', title: '결제 모듈 연동 및 테스트', description: '새로운 결제 PG사 API를 연동하고, 성공/실패 케이스에 대한 통합 테스트를 진행해야 합니다. 특히 예외 처리에 신경써주세요.', assignee: '이영희' },
    { id: 'TASK-3', title: '메인 페이지 렌더링 성능 최적화', description: '초기 로딩 속도가 느리다는 이슈가 접수되었습니다. Lighthouse 점수를 90점 이상으로 끌어올리기 위해 이미지 지연 로딩 및 코드 스플릿팅을 적용합니다.', assignee: '박민수' },
    { id: 'TASK-4', title: '약관 동의 팝업 수정', description: '단순 텍스트 수정', assignee: '정지원' },
  ]);

  const columnDefs = useMemo<ColDef<TaskData>[]>(() => [
    { field: 'id', headerName: 'Task ID', width: 100 },
    { field: 'title', headerName: '제목', width: 200, tooltipField: 'title' },
    {
      field: 'description',
      headerName: '상세 설명 (말줄임 + 툴팁)',
      width: 400,
      tooltipField: 'description',
      cellRenderer: (params: any) => {
        return (
          <div style={{
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {params.value}
          </div>
        );
      }
    },
    { field: 'assignee', headerName: '담당자', width: 120 },
  ], []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader
        title="7. Cell Text Ellipsis (텍스트 말줄임 & 툴팁)"
        description="셀의 너비보다 데이터가 길 경우, 자동으로 말줄임(...) 처리하고 마우스 호버 시 툴팁으로 전체 내용을 보여줍니다."
        coreFeatures={[
          "AG Grid의 셀은 별도의 CSS를 추가하지 않아도 기본적으로 내용이 길면 말줄임(text-overflow: ellipsis) 처리됩니다.",
          "<code>tooltipField</code>: 말줄임된 텍스트 전체를 사용자가 확인할 수 있도록 기본 툴팁 기능을 제공합니다.",
          "커스텀 툴팁 컴포넌트(tooltipComponent)를 활용하면 더 예쁜 디자인으로 정보를 표시할 수 있습니다."
        ]}
        usageScenarios="요약 정보만 표출하여 테이블을 깔끔하게 유지하고, 상세 내용은 툴팁으로 제공하여 화면 공간을 절약하고 싶을 때 사용합니다."
      />

      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}>
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
          <AgGridReact<TaskData>
            theme="legacy"
            rowHeight={40}
            headerHeight={40}
            rowData={rowData}
            columnDefs={columnDefs}
            // 툴팁 표시 지연 시간(ms)
            tooltipShowDelay={500}
          />
        </div>
      </div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="CellTextEllipsisSample.tsx" />
    </div>
  );
};

export default CellTextEllipsisSample;
