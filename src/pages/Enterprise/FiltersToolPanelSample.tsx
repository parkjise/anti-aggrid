import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type SideBarDef } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const FiltersToolPanelSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(500));
  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo', filter: true }, 
    { field: 'name', filter: true }, 
    { field: 'department', filter: 'agSetColumnFilter' }, 
    { field: 'salary', filter: 'agNumberColumnFilter' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);
  
  // 사이드바 설정에 'filters' 전용 툴패널만 주입
  const sideBar = useMemo<SideBarDef | string | string[] | boolean | null>(() => {
    return {
      toolPanels: [
        {
          id: 'filters',
          labelDefault: 'Filters (전역 필터 조작)',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        }
      ]
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="15. Filters Tool Panel (우측 필터 도구창)" description="헤더 공간이 모자랄 때 헤더 팝업 대신 우측 사이드바에 모든 종류의 필터를 나열해두고 조작합니다."
        coreFeatures={[
          "<code>sideBar={{ toolPanels: [{ toolPanel: 'agFiltersToolPanel' }] }}</code>",
          "헤더명 아래로 모든 필터 인풋 및 체크박스(Set)가 펼침 목록으로 배치됨"
        ]}
        usageScenarios="아마존 상품 검색이나 쇼핑몰의 좌측 패널처럼, 다양한 조건(10개 이상)을 한 번에 내려다보면서 조합형으로 켜고 끄고 싶을 때 헤더클릭 방식보다 월등한 UX를 자랑합니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          sideBar={sideBar}
        />
      </div></div>
    </div>
  );
};
export default FiltersToolPanelSample;
