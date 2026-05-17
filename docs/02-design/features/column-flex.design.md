# Design: Column Flex Sample (유연한 컬럼 너비 예제)

## Context Anchor
| Dimension | Content |
|-----------|---------|
| WHY | 고정 너비 컬럼은 다양한 해상도에서 공간 낭비나 가독성 저하를 유발함 |
| WHO | 반응형 웹을 구현해야 하는 개발자 |
| RISK | 과도한 유연성으로 인해 중요한 데이터가 가려질 수 있음 (minWidth로 해결) |
| SUCCESS | 브라우저 리사이즈 시 가로 스크롤 없이 모든 컬럼이 조절됨 |
| SCOPE | flex 속성 및 autoSizeStrategy를 활용한 예제 페이지 구현 |

## 1. Overview
AG Grid의 `flex` 속성과 `autoSizeStrategy`를 사용하여 브라우저 크기에 따라 컬럼 너비가 유연하게 변하는 예제를 구현합니다.

## 2. Architecture Options

### Option A — Flex Property (Recommended)
- **Description**: `defaultColDef`에 `flex: 1`을 설정하여 모든 컬럼이 남은 공간을 공평하게 나눠 갖도록 합니다.
- **Pros**: 구현이 매우 간단하며, 브라우저 리사이즈에 즉각 반응합니다.
- **Cons**: 컬럼별로 중요도가 다를 때 세밀한 조절이 필요합니다.

### Option B — autoSizeStrategy
- **Description**: 그리드 옵션의 `autoSizeStrategy`를 `{ type: 'fitGridWidth' }`로 설정합니다.
- **Pros**: 초기 로딩 시 그리드 너비에 딱 맞게 컬럼을 배치합니다.
- **Cons**: `flex`와 혼용 시 우선순위 혼동이 올 수 있습니다.

### 선택: Option A 기반 + 특정 컬럼 가중치 부여
- `defaultColDef`: `flex: 1`, `minWidth: 100`
- 특정 컬럼(예: 이메일): `flex: 2` (공간을 2배 더 차지)
- 특정 컬럼(예: ID): `width: 80`, `flex: 0` (고정 너비)

## 3. Implementation Details

### File: `src/pages/Community/ColumnFlexSample.tsx`
```tsx
const columnDefs = [
  { field: 'employeeNo', headerName: 'ID', width: 80, flex: 0 },
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 120 },
  { field: 'department', headerName: 'Department', flex: 1 },
  { field: 'email', headerName: 'Email (Flexible x2)', flex: 2, minWidth: 200 },
];

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
};
```

### Integration
- `src/common/sampleMenu.ts`에 메뉴 추가
- `src/App.tsx`에 라우트 추가 (자동으로 처리되는지 확인 필요)

## 4. UI/UX Design
- 상단에 기능 설명 및 사용된 속성(`flex`, `minWidth`) 표시
- 하단에 소스 코드 패널 배치
- 그리드 컨테이너의 너비를 100%로 설정하여 리사이즈 테스트가 용이하도록 함

## 5. Verification Plan
- [ ] 브라우저 창을 늘렸을 때 'Email' 컬럼이 다른 컬럼보다 빠르게 넓어지는지 확인
- [ ] 브라우저 창을 줄였을 때 설정된 `minWidth` 이하로는 줄어들지 않고 가로 스크롤이 생기는지 확인
- [ ] 고정 너비(`flex: 0`)인 'ID' 컬럼이 변하지 않는지 확인
