import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './CellTextWrapSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

interface FeedbackData {
  id: string;
  customer: string;
  feedback: string;
  date: string;
}

const CellTextWrapSample: React.FC = () => {
  const [rowData] = useState<FeedbackData[]>([
    { id: 'FB-101', customer: '홍길동', date: '2023-10-01', feedback: '서비스가 전반적으로 매우 만족스럽습니다. 다만 모바일 환경에서 일부 버튼이 너무 작아서 터치하기 힘든 경우가 종종 발생합니다. 이 부분 개선 부탁드립니다.' },
    { id: 'FB-102', customer: '김유신', date: '2023-10-02', feedback: '빠른 처리 감사합니다.' },
    { id: 'FB-103', customer: '이순신', date: '2023-10-03', feedback: '결제 페이지에서 카카오페이를 선택했는데, 계속해서 오류 메시지가 노출되며 진행되지 않습니다. 캐시를 지우고 다시 해봐도 동일한 증상입니다. 빠른 확인 바랍니다.' },
    { id: 'FB-104', customer: '유관순', date: '2023-10-04', feedback: '항상 친절한 답변 감사합니다. 이번 업데이트 이후로 속도가 눈에 띄게 빨라져서 업무 효율이 많이 올라갔습니다. 앞으로도 좋은 서비스 부탁드립니다.' },
  ]);

  const columnDefs = useMemo<ColDef<FeedbackData>[]>(() => [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'customer', headerName: '고객명', width: 120 },
    {
      field: 'feedback',
      headerName: '고객 의견 (자동 줄바꿈 & 높이 조절)',
      wrapText: true,     // 텍스트 줄바꿈 허용
      autoHeight: true,   // 내용에 맞게 행 높이 자동 조절
      cellStyle: { lineHeight: '1.5', padding: '10px 10px' } // 줄바꿈 시 가독성을 위한 스타일
    },
    { field: 'date', headerName: '등록일', width: 120 },
  ], []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader
        title="8. Cell Text Wrap (텍스트 줄바꿈 & 자동 높이)"
        description="셀의 데이터가 길 경우 말줄임 처리하지 않고, 줄바꿈을 통해 모든 텍스트를 표시하며 행(Row)의 높이를 자동으로 조절합니다."
        coreFeatures={[
          "<code>wrapText: true</code>: 셀 내부의 텍스트가 너비를 넘어갈 때 줄바꿈을 허용합니다.",
          "<code>autoHeight: true</code>: 줄바꿈된 텍스트의 전체 분량에 맞추어 행의 높이를 동적으로 늘려줍니다.",
          "주의: 대용량 데이터에서 모든 행에 autoHeight를 적용하면 스크롤 성능이 저하될 수 있으므로 유의해야 합니다."
        ]}
        usageScenarios="고객의 긴 문의 내용, 게시글 본문 요약 등 말줄임 처리 없이 내용을 한눈에 모두 파악해야 하는 목록에서 사용합니다."
      />

      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}>
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
          <AgGridReact<FeedbackData>
            theme="legacy"
            headerHeight={40}
            rowData={rowData}
            columnDefs={columnDefs}
          // 여기서 rowHeight는 지정하지 않거나, 최소 높이의 개념으로만 작동합니다. autoHeight가 우선합니다.
          />
        </div>
      </div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="CellTextWrapSample.tsx" />
    </div>
  );
};

export default CellTextWrapSample;
