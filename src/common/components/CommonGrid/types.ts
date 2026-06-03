import type { AgGridReactProps } from 'ag-grid-react';

// 외부 API 연동 기반의 서버사이드 페이징 파라미터 제안
export interface ServerPaginationParams {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onChangePage: (page: number) => void;
}

// AG Grid의 기존 Props를 상속받으면서 커스텀 Props 확장
export interface CommonGridProps<TData = any> extends AgGridReactProps<TData> {
  /**
   * 컴포넌트 마운트 시, 브라우저 가로 폭에 맞춰 컬럼 너비를 자동으로 꽉 채울지 여부 (기본값: false)
   */
  autoFitColumns?: boolean;
  
  /**
   * 페이징 처리 방식 (기본값: 'none')
   * - 'client': AG Grid 내장 클라이언트 사이드 페이징 사용
   * - 'server': 외부 서버사이드 연동 페이징 사용 (serverPaginationParams 필수)
   * - 'none': 페이징 사용 안 함
   */
  paginationType?: 'client' | 'server' | 'none';

  /**
   * paginationType이 'server'일 때 필수 입력하는 커스텀 페이징 속성
   */
  serverPaginationParams?: ServerPaginationParams;

  /**
   * 커스텀 빈 데이터 메시지
   */
  customEmptyMessage?: string;
}
