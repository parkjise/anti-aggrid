# Plan: Column Fit Sample (sizeColumnsToFit 예제)

## Executive Summary
AG Grid의 `sizeColumnsToFit` API와 `autoSizeStrategy`를 사용하여 그리드의 전체 너비에 맞춰 컬럼들을 자동으로 배분하는 예제를 제작합니다.

### Context Anchor
| Dimension | Content |
|-----------|---------|
| WHY | 초기 로딩 시나 창 크기 변경 시 컬럼들이 그리드 너비를 꽉 채우지 못하는 현상을 방지함 |
| WHO | 정교한 컬럼 배치가 필요한 개발자 |
| RISK | 컬럼이 너무 많을 경우 개별 너비가 너무 좁아질 수 있음 |
| SUCCESS | 버튼 클릭 또는 창 리사이즈 시 모든 컬럼이 그리드 너비에 딱 맞게 조절됨 |
| SCOPE | `sizeColumnsToFit` API 및 `autoSizeStrategy: fitGridWidth` 활용 예제 구현 |

## 1. Requirements
- 초기 렌더링 시 그리드 너비에 맞춤 (`autoSizeStrategy`)
- 버튼 클릭을 통한 수동 맞춤 기능 (`api.sizeColumnsToFit()`)
- 특정 컬럼의 최소/최대 너비 제한 유지 확인
- 창 크기 변경 감지(`onGridSizeChanged`)를 통한 자동 리사이즈

## 2. Implementation Strategy
- **File Location**: `src/pages/Community/ColumnFitSample.tsx`
- **Key Features**:
  - `autoSizeStrategy: { type: 'fitGridWidth', defaultMinWidth: 100 }` 설정
  - `onGridReady`에서 API 호출 테스트
  - `onGridSizeChanged` 이벤트 핸들러 구현

## 3. Success Criteria
- 그리드 로딩 즉시 모든 컬럼이 가로 너비를 100% 채움
- 버튼 클릭 시 컬럼 너비가 현재 그리드 폭에 맞춰 재계산됨
- 창 크기를 조절할 때 실시간으로 컬럼 너비가 반응함 (이벤트 기반)
