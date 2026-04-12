import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const BasicGridSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(5000));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo', headerName: 'Emp No' },
    { field: 'name', headerName: 'Name' },
    { field: 'department', headerName: 'Department' },
    { field: 'position', headerName: 'Position' },
    { field: 'joinDate', headerName: 'Join Date' },
    { field: 'salary', headerName: 'Salary' },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    flex: 1,
    minWidth: 100,
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="1. Basic Grid (기본 그리드)"
        description="AG Grid의 가장 기초적인 데이터 바인딩 형태입니다."
        coreFeatures={[
          "<code>rowData</code>: 그리드에 바인딩할 원본 배열",
          "<code>columnDefs</code>: 화면에 표시할 컬럼들의 맵핑 정보",
          "<code>defaultColDef</code>: 전체 컬럼에 일괄 적용할 공통 옵션"
        ]}
        usageScenarios="단순히 데이터 목록을 화면에 표출할 때 사용하며, 실무에서는 보통 defaultColDef에 flex나 기본 너비를 잡아줍니다."
      />

      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}>
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
          <AgGridReact<Employee>
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicGridSample;
