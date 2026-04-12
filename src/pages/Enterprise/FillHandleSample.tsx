import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const FillHandleSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(300));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, 
    { field: 'name' }, 
    { field: 'department', editable: true }, // 부서 열에 채우기 핸들 시나리오
    { field: 'salary', editable: true } 
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="12. Fill Handle (자동 채우기 핸들)" description="엑셀 표 우측 하단에 나타나는 작은 점(+)을 드래그해서 주변 데이터를 일괄 복사/채워넣는 기능입니다."
        coreFeatures={[
          "<code>enableFillHandle={true}</code>: 셀을 클릭하거나 범위를 드래그하면 십자가(+) 핸들이 셀 하단 우측에 나타남",
          "기본적으로 편집(<code>editable: true</code>)이 허용된 열에서만 드래그한 값으로 내용이 덮어씌워짐"
        ]}
        usageScenarios="부서 이름을 옮기거나, 한꺼번에 50명의 연봉 값을 0으로 덮어쓸 일이 있을 때 일일이 붙여넣기 대신 하단으로 쭉 드래그해서 데이터를 덮어쓰게 만들어 줍니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          enableRangeSelection={true} 
          enableFillHandle={true}
        />
      </div></div>
    </div>
  );
};
export default FillHandleSample;
