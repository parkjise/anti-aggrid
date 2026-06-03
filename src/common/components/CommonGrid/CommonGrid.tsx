import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import type { CommonGridProps } from './types';

// AG Grid 스타일 임포트 (공통 컴포넌트 내부에 두어 사용처에서 잊지 않도록 함)
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './CommonGrid.css';

// 모듈 등록 (전역 1회 실행 보장)
ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * 전사 공통 AG Grid 컴포넌트 (Best Practice)
 * 개발팀 누구나 직관적으로 사용하고 확장할 수 있도록 구성되었습니다.
 */
export const CommonGrid = <TData extends any>(props: CommonGridProps<TData>) => {
  const {
    rowData,
    columnDefs,
    defaultColDef,
    autoFitColumns = false,
    paginationType = 'none',
    serverPaginationParams,
    customEmptyMessage = '조회된 데이터가 없습니다.',
    theme = 'quartz', // 기본 테마 지정 (사내 표준에 따라 변경)
    ...restAgGridProps
  } = props;

  // 1. 필수 내장 기능: 모든 컬럼에 정렬(Sort)과 필터(Filter) 기본 활성화
  const baseDefaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true, // 사용자가 임의로 조절 가능하도록 허용
      // 외부에서 전달된 defaultColDef가 있다면 덮어쓰거나 병합합니다.
      ...defaultColDef,
    };
  }, [defaultColDef]);

  // 2. 테이블 레이아웃 자동 크기 조절 옵션 구성
  // autoFitColumns가 true일 경우, AG Grid의 최신 autoSizeStrategy를 사용하여 꽉 채웁니다.
  const autoSizeStrategy = useMemo(() => {
    if (autoFitColumns && !restAgGridProps.autoSizeStrategy) {
      return { type: 'fitGridWidth' as const, defaultMinWidth: 100 };
    }
    return restAgGridProps.autoSizeStrategy;
  }, [autoFitColumns, restAgGridProps.autoSizeStrategy]);

  // 3. 페이징 로직 처리 (Client vs Server 구조 분리)
  const isClientPagination = paginationType === 'client';
  
  return (
    <div className="common-grid-wrapper">
      <div className={`common-grid-container ag-theme-${theme}`}>
        <AgGridReact<TData>
          // 필수 데이터와 컬럼
          rowData={rowData}
          columnDefs={columnDefs}
          
          // 테마 설정 (v31+ 에서는 legacy로 설정해야 기존 CSS 클래스 방식이 안정적으로 동작할 수 있음)
          theme="legacy"
          
          // 공통 설정 병합
          defaultColDef={baseDefaultColDef}
          
          // 자동 너비 설정
          autoSizeStrategy={autoSizeStrategy}

          // 클라이언트 페이징 설정
          pagination={isClientPagination}
          paginationPageSize={isClientPagination ? 10 : undefined}

          // 빈 데이터 시 보여줄 문구 설정
          overlayNoRowsTemplate={`<span class="common-grid-empty-msg">${customEmptyMessage}</span>`}

          // 나머지 AG Grid의 모든 Props를 그대로 통과시켜 확장성 보장
          {...restAgGridProps}
        />
      </div>
      
      {/* 서버사이드 페이징 UI (디자인 컨벤션에 맞춰 별도 컴포넌트로 분리 가능) */}
      {paginationType === 'server' && serverPaginationParams && (
        <div className="common-grid-pagination-server">
          <button 
            disabled={serverPaginationParams.currentPage === 1}
            onClick={() => serverPaginationParams.onChangePage(serverPaginationParams.currentPage - 1)}
          >
            Prev
          </button>
          <span className="common-grid-pagination-info">
            Page {serverPaginationParams.currentPage} (Total: {serverPaginationParams.totalCount})
          </span>
          <button 
            disabled={serverPaginationParams.currentPage * serverPaginationParams.pageSize >= serverPaginationParams.totalCount}
            onClick={() => serverPaginationParams.onChangePage(serverPaginationParams.currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
