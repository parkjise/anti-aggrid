import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type SideBarDef } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './ColumnsToolPanelSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const ColumnsToolPanelSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));
  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, 
    { field: 'position' }, { field: 'salary' }, { field: 'joinDate' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);
  
  // 사이드바 설정에 'columns' 전용 패널만 주입
  const sideBar = useMemo<SideBarDef | string | string[] | boolean | null>(() => {
    return {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns (컬럼 조작)',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
        }
      ]
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="14. Columns Tool Panel (좌/우측 컬럼 도구창)" description="그리드 옆면에 컬럼을 체크형태로 켜고 끄거나 피벗/그룹핑을 드래그로 조작할 수 있는 전용 도구창을 붙입니다."
        coreFeatures={[
          "<code>sideBar={{ toolPanels: [...] }}</code>: 사이드 툴패널 위치 및 도구 구성",
          "<code>toolPanel: 'agColumnsToolPanel'</code>: 체크박스와 피벗 대상 드롭박스 UI가 내장된 기본 컴포넌트"
        ]}
        usageScenarios="컬럼이 50개가 넘어가는 거대한 회계장부나 주문원장 화면에서, 눈아프게 스크롤을 넘기지 않고도 우측 사이드바에서 원하는 컬럼만 체크하고 드래그 앤 드롭해서 모아보고 싶을 때 씁니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          sideBar={sideBar}
        />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="ColumnsToolPanelSample.tsx" />
    </div>
  );
};
export default ColumnsToolPanelSample;
