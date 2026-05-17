# Design: Column Fit Sample (sizeColumnsToFit 예제)

## Context Anchor
| Dimension | Content |
|-----------|---------|
| WHY | 초기 로딩 시나 창 크기 변경 시 컬럼들이 그리드 너비를 꽉 채우지 못하는 현상을 방지함 |
| WHO | 정교한 컬럼 배치가 필요한 개발자 |
| RISK | 컬럼이 너무 많을 경우 개별 너비가 너무 좁아질 수 있음 |
| SUCCESS | 버튼 클릭 또는 창 리사이즈 시 모든 컬럼이 그리드 너비에 딱 맞게 조절됨 |
| SCOPE | `sizeColumnsToFit` API 및 `autoSizeStrategy: fitGridWidth` 활용 예제 구현 |

## 1. Overview
AG Grid의 최신 선언적 방식인 `autoSizeStrategy`와 전통적인 명령적 방식인 `api.sizeColumnsToFit()`을 함께 비교하며 학습할 수 있는 예제를 구현합니다.

## 2. Architecture Options

### Option A — autoSizeStrategy (Modern)
- **Description**: 그리드 속성에 `autoSizeStrategy={{ type: 'fitGridWidth' }}`를 설정합니다.
- **Pros**: 코드가 간결하며 AG Grid가 자동으로 관리를 수행합니다.
- **Cons**: 특정 타이밍에 수동으로 호출해야 할 경우 추가 처리가 필요합니다.

### Option B — sizeColumnsToFit API (Imperative)
- **Description**: `onGridReady` 또는 `onGridSizeChanged`에서 `params.api.sizeColumnsToFit()`을 직접 호출합니다.
- **Pros**: 호출 시점을 정밀하게 제어할 수 있습니다.
- **Cons**: 이벤트 리스너를 직접 관리해야 하는 번거로움이 있습니다.

### 선택: 하이브리드 방식
- 초기 로딩: `autoSizeStrategy` 사용
- 수동 조작: 상단 버튼을 배치하여 `api.sizeColumnsToFit()` 호출 시연

## 3. Implementation Details

### File: `src/pages/Community/ColumnFitSample.tsx`
```tsx
const onGridSizeChanged = (params: GridSizeChangedEvent) => {
  // 그리드 크기가 변경될 때 API를 사용하여 너비 재조절
  params.api.sizeColumnsToFit();
};

// ...
<AgGridReact
  autoSizeStrategy={{ type: 'fitGridWidth', defaultMinWidth: 100 }}
  onGridSizeChanged={onGridSizeChanged}
  // ...
/>
```

## 4. UI/UX Design
- **Action Bar**: "Fit Columns Now" 버튼을 배치하여 API 효과를 시각적으로 확인.
- **Grid Context**: `flex`를 사용하지 않은 일반적인 고정 너비 컬럼들을 정의하고, 이것들이 어떻게 늘어나는지 보여줌.

## 5. Verification Plan
- [ ] 초기 렌더링 시 컬럼들이 그리드 가로폭을 꽉 채우는지 확인
- [ ] 브라우저 창 크기를 늘리고 줄일 때 컬럼들이 실시간으로 재배치되는지 확인
- [ ] 컬럼 하나를 수동으로 늘린 후 "Fit Columns" 버튼을 눌렀을 때 다시 균형이 잡히는지 확인
