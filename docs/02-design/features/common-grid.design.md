# Design: CommonGrid Component (전사 공통 그리드 컴포넌트)

## Context Anchor
| Dimension | Content |
|-----------|---------|
| WHY | 각 팀/페이지마다 AG Grid 설정이 파편화되어 유지보수가 어렵고 중복 코드가 발생함 |
| WHO | AG Grid를 화면에 구현해야 하는 프론트엔드 개발자 전원 |
| RISK | 공통 컴포넌트가 너무 무거워지거나 확장성이 떨어지면 오히려 사용을 기피하게 됨 |
| SUCCESS | AgGridReactProps를 완벽히 상속받아 유연성을 보장하면서도, 필수 기능(Sort, Filter)이 기본 내장됨 |
| SCOPE | `CommonGrid.tsx`, `types.ts`, `UsageExample.tsx` 구현 및 샘플 페이지 연동 |

## 1. Overview
AG Grid의 `AgGridReact`를 래핑하는 HOC(Higher-Order Component) 형태의 컴포넌트입니다. 팀 컨벤션에 맞는 기본 설정을 캡슐화하면서도 확장을 열어둡니다.

## 2. Architecture & Types (`types.ts`)
```typescript
import { AgGridReactProps } from 'ag-grid-react';

export interface CommonGridProps<TData = any> extends AgGridReactProps<TData> {
  // 팀만의 커스텀 Props 정의
  customEmptyMessage?: string;
  autoFitColumns?: boolean; // 초기 로딩 시 컬럼을 화면 폭에 맞출지 여부
  // 페이징 관련 제안: 서버사이드 처리를 위한 별도 props 그룹
  serverPaginationParams?: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    onChangePage: (page: number) => void;
  };
}
```

## 3. Component Implementation (`CommonGrid.tsx`)
- `useMemo`를 통해 `baseDefaultColDef` (sortable: true, filter: true) 정의.
- 외부에서 전달된 `defaultColDef`와 병합.
- `autoFitColumns`가 true일 때 `autoSizeStrategy={{ type: 'fitGridWidth' }}`를 기본 적용.
- 페이징 제안: 외부 `serverPaginationParams`가 들어오면 하단에 커스텀 페이지네이션 UI를 렌더링, 없으면 AG Grid 내부 페이징(`pagination={true}`)을 사용하도록 설계. (여기서는 구조만 잡거나 AG 기본 기능 사용).

## 4. Custom Cell Renderer Pattern
- `frameworkComponents` 또는 `columnDefs` 내부의 `cellRenderer` 속성에 React 컴포넌트를 주입.
- 셀 컴포넌트에 이벤트 콜백을 props로 넘길 때, `cellRendererParams`를 활용하는 AG Grid 표준 패턴 적용.

## 5. UI/UX Design
- 부모 요소에서 명시적으로 `height`와 `width`를 갖도록 유도(예: `flex: 1`).
- AG Grid 테마는 전사 공통 테마(예: `ag-theme-quartz`)를 내부에서 고정 적용.

## 6. Verification Plan
- [ ] 정렬/필터가 기본적으로 적용되는지 확인.
- [ ] 커스텀 Props(`autoFitColumns`) 동작 확인.
- [ ] 커스텀 셀 렌더러(버튼 클릭)가 상위로 이벤트를 전달하는지 확인.
