import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type IDateFilterParams } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const DateFilterSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(500));



  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'name', headerName: 'Name' },
    { 
      field: 'joinDate', 
      headerName: 'Join Date',
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: (filterLocalDate: Date, cellValue: Date) => {
          if (!cellValue) return -1;
          const cellDate = new Date(cellValue);
          cellDate.setHours(0, 0, 0, 0);
          return cellDate.getTime() === filterLocalDate.getTime() ? 0 : 
                 (cellDate < filterLocalDate ? -1 : 1);
        }
      },
      valueFormatter: p => p.value ? new Date(p.value).toLocaleDateString() : ''
    },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1, minWidth: 150, floatingFilter: true }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="5. Date Filter (날짜 달력 필터)" description="네이티브 달력을 통해 날짜 기간을 필터링합니다."
        coreFeatures={[
          "<code>filter: 'agDateColumnFilter'</code>: 달력 UI 기반 필터 제공",
          "<code>comparator</code>: 데이터 로우의 Date 객체/문자열을 브라우저 시간대와 비교하는 로직 구현"
        ]}
        usageScenarios="가입일, 주문일 등 트랜잭션 데이터에서 '최근 1주일', '특정 일자 이전' 등을 조회할 때 반드시 필요합니다. comparator 커스텀은 필수입니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
    </div>
  );
};
export default DateFilterSample;
