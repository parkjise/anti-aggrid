# Plan: Column Flex Sample (유연한 컬럼 너비 예제)

## Executive Summary
사용자의 브라우저 크기에 대응하여 컬럼 너비가 자동으로 조절되면서도, 최소/기본 너비를 유지하는 AG Grid 예제를 제작합니다.

### Context Anchor
| Dimension | Content |
|-----------|---------|
| WHY | 고정 너비 컬럼은 다양한 해상도에서 공간 낭비나 가독성 저하를 유발함 |
| WHO | 반응형 웹을 구현해야 하는 개발자 |
| RISK | 과도한 유연성으로 인해 중요한 데이터가 가려질 수 있음 (minWidth로 해결) |
| SUCCESS | 브라우저 리사이즈 시 가로 스크롤 없이 모든 컬럼이 조절됨 |
| SCOPE | flex 속성 및 autoSizeStrategy를 활용한 예제 페이지 구현 |

## 1. Requirements
- 기본 너비(base width) 설정 가능
- 브라우저 크기에 따른 자동 너비 조절 (Flex)
- 최소 너비(minWidth) 보장을 통한 데이터 보호
- AG Grid `autoSizeStrategy` 또는 `flex` 속성 활용

## 2. Implementation Strategy
- **File Location**: `src/pages/Community/ColumnFlexSample.tsx`
- **Tech Stack**: React + AG Grid Community
- **Key Features**:
  - `defaultColDef`에서 `flex: 1` 및 `minWidth` 설정
  - 특정 컬럼에 대해 다른 `flex` 비율 적용 예시 (예: 이름은 2, 직급은 1)
  - `autoSizeStrategy: { type: 'fitGridWidth' }` 활용 시연

## 3. Risks & Mitigations
- **Risk**: 컬럼이 너무 많을 경우 `flex: 1`만으로는 가독성이 떨어짐
- **Mitigation**: `minWidth`를 적절히 설정하여 가로 스크롤이 필요할 때는 발생하도록 유도

## 4. Success Criteria
- 브라우저 창 크기를 줄여도 설정된 `minWidth` 이하로는 줄어들지 않음
- 빈 공간이 생기면 설정된 `flex` 비율에 따라 컬럼이 채워짐
- `autoSizeStrategy`가 의도대로 동작하여 초기 렌더링 시 그리드 폭에 딱 맞춤
