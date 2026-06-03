import type { GridOptions } from 'ag-grid-community';
import type { CSSProperties } from 'react';

// 외부 API 연동 기반의 서버사이드 페이징 파라미터 제안
export interface ServerPaginationParams {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onChangePage: (page: number) => void;
}

// ag-grid-react의 AgGridReactProps 대신 community의 GridOptions를 직접 상속
// Vite 빌드 시 ag-grid-react에서 특정 타입을 찾지 못하는 문제를 해결합니다.
export interface CommonGridProps<TData = any> extends GridOptions<TData> {
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

  /**
   * AG Grid 컨테이너 스타일 확장
   */
  containerStyle?: CSSProperties;

  /**
   * AG Grid 컨테이너 클래스 확장
   */
  className?: string;
}
