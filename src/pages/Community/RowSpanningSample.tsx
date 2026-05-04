import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type RowSpanParams } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './RowSpanningSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

interface EmployeeData {
  department: string;
  name: string;
  position: string;
  salary: number;
}

const RowSpanningSample: React.FC = () => {
  const [rowData] = useState<EmployeeData[]>([
    { department: '글로벌 IT 디지털 혁신 개발본부 (Cloud & AI)', name: '김철수', position: '프론트엔드', salary: 5000 },
    { department: '글로벌 IT 디지털 혁신 개발본부 (Cloud & AI)', name: '이영희', position: '백엔드', salary: 4500 },
    { department: '글로벌 IT 디지털 혁신 개발본부 (Cloud & AI)', name: '박민수', position: '데브옵스', salary: 4800 },
    { department: '마케팅팀', name: '송지은', position: '퍼포먼스 마케터', salary: 4300 }, // 1줄 데이터
    { department: '인사팀', name: '정지원', position: '인사담당', salary: 4200 },
    { department: '인사팀', name: '최현우', position: '채용담당', salary: 4000 },
    { department: '영업본부', name: '이동욱', position: 'B2B 영업', salary: 4600 }, // 1줄 데이터
    { department: '재무팀', name: '강민주', position: '회계', salary: 5500 },
    { department: '재무팀', name: '조성민', position: '재무', salary: 5800 },
    { department: '재무팀', name: '윤건우', position: '세무', salary: 5100 },
    { department: '법무팀', name: '한소희', position: '사내변호사', salary: 6200 }, // 1줄 데이터
  ]);

  const columnDefs = useMemo<ColDef<EmployeeData>[]>(() => [
    { 
      field: 'department', 
      headerName: '부서 (Row Span)',
      width: 160,
      wrapText: true,
      rowSpan: (params: RowSpanParams<EmployeeData>) => {
        const department = params.data?.department;
        const rowIndex = params.node?.rowIndex;
        if (department === undefined || rowIndex == null) return 1;

        // 이전 행이 같은 부서인지 확인 (같은 부서면 이미 병합되었으므로 1 반환)
        const prevRow = params.api.getDisplayedRowAtIndex(rowIndex - 1);
        if (prevRow && prevRow.data?.department === department) {
          return 1;
        }

        // 첫 번째 행이므로, 아래로 같은 부서가 몇 개 연속되는지 계산
        let span = 1;
        while (true) {
          const nextRow = params.api.getDisplayedRowAtIndex(rowIndex + span);
          if (nextRow && nextRow.data?.department === department) {
            span++;
          } else {
            break;
          }
        }
        return span;
      },
      cellClassRules: {
        'row-span-cell': (params) => {
          // 병합되는 첫 번째 셀(또는 1줄짜리 단일 셀)에 스타일을 적용하기 위함
          const department = params.data?.department;
          const rowIndex = params.node?.rowIndex;
          if (department === undefined || rowIndex == null) return false;
          
          const prevRow = params.api.getDisplayedRowAtIndex(rowIndex - 1);
          return !prevRow || prevRow.data?.department !== department;
        }
      }
    },
    { field: 'name', headerName: '이름', flex: 1 },
    { field: 'position', headerName: '직급/역할', flex: 1 },
    { field: 'salary', headerName: '연봉', flex: 1 },
  ], []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="21. Row Spanning (로우 병합)"
        description="특정 컬럼의 위아래 셀을 병합하여 시각적으로 하나의 셀처럼 보여주는 기능입니다."
        coreFeatures={[
          "<code>rowSpan</code>: 콜백 함수를 통해 해당 셀이 몇 개의 행(row)을 차지할지 반환합니다.",
          "<code>suppressRowTransform={true}</code>: Row Spanning을 사용할 때 그리드 옵션에 반드시 추가해야 렌더링이 깨지지 않습니다.",
          "<code>cellClassRules</code>를 통해 병합된 셀이 배경색이나 테두리를 가지도록 스타일을 지정해야 완벽하게 가려집니다."
        ]}
        usageScenarios="부서별 명단, 날짜별 일정 등 공통된 상위 카테고리를 기준으로 데이터 목록을 묶어서 표현할 때 주로 사용됩니다."
      />

      <style>
        {`
          .row-span-cell {
            background-color: #f8fafc !important;
            border-bottom: 1px solid var(--border) !important;
            display: flex !important;
            align-items: center;
            font-weight: 600;
            color: var(--primary-dark);
            z-index: 1; /* 병합된 셀이 다른 셀 위로 올라오도록 보장 */
            white-space: normal !important;
            word-break: keep-all;
            line-height: 1.4 !important;
          }
        `}
      </style>

      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}>
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
           <AgGridReact<EmployeeData> 
            theme="legacy"
            rowHeight={40} 
            headerHeight={40}
            rowData={rowData}
            columnDefs={columnDefs}
            suppressRowTransform={true}
          />
        </div>
      </div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="RowSpanningSample.tsx" />
    </div>
  );
};

export default RowSpanningSample;
