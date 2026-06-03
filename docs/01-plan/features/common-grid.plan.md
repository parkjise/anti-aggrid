# Plan: CommonGrid Component (전사 공통 그리드 컴포넌트)

## Executive Summary
전사적으로 재사용 가능한 AG Grid 기반의 공통 컴포넌트(`CommonGrid`)를 설계 및 구현하여, 개발 생산성을 높이고 일관된 사용자 경험을 제공합니다.

### Context Anchor
| Dimension | Content |
|-----------|---------|
| WHY | 각 팀/페이지마다 AG Grid 설정이 파편화되어 유지보수가 어렵고 중복 코드가 발생함 |
| WHO | AG Grid를 화면에 구현해야 하는 프론트엔드 개발자 전원 |
| RISK | 공통 컴포넌트가 너무 무거워지거나 확장성이 떨어지면 오히려 사용을 기피하게 됨 |
| SUCCESS | AgGridReactProps를 완벽히 상속받아 유연성을 보장하면서도, 필수 기능(Sort, Filter)이 기본 내장됨 |
| SCOPE | `CommonGrid.tsx`, `types.ts`, `UsageExample.tsx` 구현 및 샘플 페이지 연동 |

## 1. Requirements
- **TypeScript**: `AgGridReactProps` 상속 및 커스텀 Props 확장 (`CommonGridProps`)
- **Default Features**: 모든 컬럼에 기본적으로 Sort, Filter 활성화 (`defaultColDef`)
- **Layout**: 반응형 대응 (`autoSizeStrategy` 또는 `sizeColumnsToFit` 고려)
- **Extensibility**: Custom Cell Renderer 주입 및 이벤트 버블링 패턴 제시
- **Pagination**: 페이징 처리 구조 제안 (Client-side vs Server-side)

## 2. Implementation Strategy
- **Location**: `src/common/components/CommonGrid/` 디렉토리에 분리.
- **Props Design**: 기존 AG Grid 설정을 덮어쓸 수 있도록 스프레드 연산자(`...props`) 활용되, `defaultColDef` 등은 깊은 병합(deep merge)을 통해 안전하게 확장.
- **Pagination Strategy**: 기본적으로 외부 API 연동(Server-side)을 위한 커스텀 속성(예: `serverSidePagination`)을 열어두고, 내부 동작 시에는 AG Grid 기본 페이징 속성을 통과시킴.

## 3. Success Criteria
- 개발자가 `CommonGrid`를 import하여 `rowData`와 `columnDefs`만 넣어도 즉시 정렬/필터가 동작하는가?
- 필요한 경우 AG Grid의 고유 기능(예: `onRowClicked`)을 제한 없이 사용할 수 있는가?
- 커스텀 렌더러를 통한 클릭 이벤트가 상위 컴포넌트로 원활히 전달되는가?
