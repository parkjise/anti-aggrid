import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const SortGridSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(5000));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo', headerName: 'Emp No' },
    { field: 'name', headerName: 'Name' },
    { field: 'department', headerName: 'Department' },
    { field: 'position', headerName: 'Position', sortable: false },
    { field: 'joinDate', headerName: 'Join Date' },
    { field: 'salary', headerName: 'Salary' },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    flex: 1,
    minWidth: 100,
    sortable: true,
    unSortIcon: true,
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="2. Sorting Grid (정렬 가능 그리드)"
        description="클릭 한 번으로 컬럼을 정렬하고 Shift 키로 다중 정렬을 수행합니다."
        coreFeatures={[
          "<code>sortable: true</code>: 컬럼의 정렬 기능을 허용합니다.",
          "<code>unSortIcon: true</code>: 정렬 아이콘을 상시 노출하여 직관성을 높입니다.",
          "<code>multiSortKey</code>: 다중 정렬을 위한 Modifier 키(Shift, Ctrl)를 커스텀할 수 있습니다."
        ]}
        usageScenarios="현업에서 사용자가 날짜순, 이름순, 매출순 등으로 조회할 때 가장 먼저 추가해 달라고 요청하는 필수 기능입니다."
      />

      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}>
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
          <AgGridReact<Employee>
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            multiSortKey="ctrl"
          />
        </div>
      </div>
    </div>
  );
};

export default SortGridSample;
