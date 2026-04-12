import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

// SCSS 파일 임포트
import './ScssStyleSample.scss';

ModuleRegistry.registerModules([AllCommunityModule]);

const ScssStyleSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(50));
  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'name' }, { field: 'department' }, { field: 'salary' }
  ], []);
  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="SCSS 기반 테마 커스텀" description="SCSS와 CSS 변수(Variables)를 이용하여 최신 방식의 AG Grid 전역 테마를 손쉽게 변경합니다."
        coreFeatures={[
          "<code>.my-scss-theme</code>: 커스텀 클래스 하위에 AG Grid 테마 변수 재할당",
          "<code>--ag-header-background-color</code>: 헤더 배경색 변경"
        ]}
        usageScenarios="사내 디자인 시스템의 메인 테마 색상, 폰트 등을 AG Grid 전체에 일괄 적용(글로벌 테마)해야 할 때 가장 권장되는 깔끔한 해결책입니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}>
        {/* 기본 ag-theme-quartz 옆에 우리가 정의한 커스텀 클래스를 함께 붙입니다. */}
        <div className="ag-theme-quartz my-scss-theme">
          <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
        </div>
      </div>
    </div>
  );
};
export default ScssStyleSample;
