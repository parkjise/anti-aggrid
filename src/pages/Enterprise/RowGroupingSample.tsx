import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const RowGroupingSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(1000));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    // rowGroup: true 를 주는 순간 자동으로 그룹핑 폴더 뷰가 생성됩니다.
    { field: 'department', rowGroup: true, hide: true }, 
    { field: 'position', rowGroup: true, hide: true },
    { field: 'employeeNo' }, { field: 'name' }, { field: 'salary' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1, flexMin: 150 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="5. Row Grouping (행 그룹화)" description="지정된 기준으로 행들을 트리 형태로 자동 병합/계층화합니다. 이 기능 하나만으로도 수백만 원짜리 라이선스 값을 합니다."
        coreFeatures={[
          "<code>rowGroup: true</code>: 해당 컬럼을 기준으로 같은 값들을 묶어 가상 부모 행 생성",
          "<code>hide: true</code>: 이미 그룹화된 패널에서 값이 보이므로 실제 원본 열은 보통 숨김 처리",
          "<code>groupDisplayType='multipleColumns'</code> 또는 안주면 단일 그룹 열 방식 제공"
        ]}
        usageScenarios="부서별로 소속 직원을 묶어보거나, 제품 카테고리별로 주문들을 묶어서 볼 때 가장 직관적인 UI(폴더 트리 형태)를 제공해 줍니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          groupDisplayType="singleColumn" // 여러 그룹을 하나의 컬럼 계층에 표시
          autoGroupColumnDef={{ headerName: '조직도', minWidth: 250 }}
        />
      </div></div>
    </div>
  );
};
export default RowGroupingSample;
