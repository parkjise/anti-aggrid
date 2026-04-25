import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type DefaultMenuItem, type GetContextMenuItemsParams, type MenuItemDef } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './ContextMenuSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const ContextMenuSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));
  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, { field: 'salary' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  const getContextMenuItems = (params: GetContextMenuItemsParams<Employee>): (DefaultMenuItem | MenuItemDef<Employee>)[] => {
    // 기본 제공되는 복사, 붙여넣기 기능과 커스텀 메뉴를 조합하여 반환합니다.
    return [
      'copy', // "Copy" 기본 메뉴
      'copyWithHeaders', // "Copy with Headers" 기본 메뉴
      'paste', // "Paste" 기본 메뉴
      'separator', // 가로 구분선
      {
        name: 'Alert(사원 정보)',
        action: () => {
          window.alert(`이름: ${params.node?.data?.name}\n부서: ${params.node?.data?.department}`);
        },
        icon: '<span style="font-size: 1.2rem;">🔈</span>'
      },
      'export' // 내보내기 그룹 (CSV, 엑셀 등)
    ];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="16. Context Menu (우클릭 컨텍스트 메뉴)" description="셀 위에서 우클릭 시, 브라우저 기본 우클릭 대신 자체 컨텍스트 팝업을 띄우고 커스텀 액션을 주입합니다."
        coreFeatures={[
          "<code>getContextMenuItems</code>: 복사, 붙여넣기, 내보내기 등 빌트인 명령어와 커스텀 <code>MenuItemDef</code>를 조합",
          "커스텀 팝업 내에서 해당 셀/행 데이터(`params.node.data`)에 접근해 API 전송이나 팝업을 띄울 수 있음"
        ]}
        usageScenarios="오직 화면 공간 최적화를 위해 컬럼에 버튼을 그리지 않고, 해당 사용자를 우클릭해 나오는 팝업에서 '상세조회', '권한변경', '강제탈퇴' 등의 부가 액션을 처리할 때 사용합니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          allowContextMenuWithControlKey={true}
          getContextMenuItems={getContextMenuItems}
        />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="ContextMenuSample.tsx" />
    </div>
  );
};
export default ContextMenuSample;
