import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './StyledComponentSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

// Styled Components를 사용해 커스텀 래퍼 정의
const StyledGridWrapper = styled.div`
  flex: 1;
  width: 100%;
  
  /* ag-theme-quartz 하위 요소들을 강제 CSS 오버라이드 하는 전용 컨테이너 방식 */
  .ag-theme-quartz {
    height: 100%;

    /* 변수를 덮어쓰거나 직접 지정 가능 (Teal Color Theme) */
    --ag-header-background-color: #0f766e; /* Teal 700 */
    --ag-header-foreground-color: #ffffff;
    --ag-row-hover-color: #ccfbf1; /* Teal 50 */
    --ag-selected-row-background-color: #99f6e4; /* Teal 200 */
    
    .ag-header-cell {
      font-weight: 800;
      letter-spacing: 1px;
    }
    
    .ag-row {
      transition: background-color 0.2s ease;
    }
  }
`;

const StyledComponentSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));
  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'name' }, { field: 'department' }, { field: 'position' }
  ], []);
  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="2. Styled-Components Wrapper" description="React 진영의 CSS-in-JS 대표주자인 styled-components를 활용해 부작용(Side Effect) 없이 컴포넌트 레벨에서 스타일을 덮어씌웁니다."
        coreFeatures={[
          "<code>styled.div</code>: 래퍼 컴포넌트를 만들어 그 내부의 열그리드 전용 스타일을 캡슐화",
          "<code>--ag-*</code> 변수 오버라이드 및 내부 하위(pseudo) 선택자 강제 조정 가능"
        ]}
        usageScenarios="프로젝트의 CSS 엔진이 명시적으로 styled-components나 emotion 등으로 통일되어 있어서, 개별 SCSS/CSS 파일을 별도로 운영하여 복잡도를 높이고 싶지 않을 때 사용합니다."
      />
      <StyledGridWrapper>
        <div className="ag-theme-quartz">
          <AgGridReact theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
        </div>
      </StyledGridWrapper>
      <SampleSourcePanel sourceCode={sourceCode} fileName="StyledComponentSample.tsx" />
    </div>
  );
};
export default StyledComponentSample;
