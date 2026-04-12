import React, { useState, useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const QuickFilterSample: React.FC = () => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(500));
  
  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, { field: 'position' }
  ], []);
  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  const onFilterTextBoxChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    gridRef.current?.api.setGridOption('quickFilterText', e.target.value);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="6. Quick Filter (우측 상단 전체 검색)" description="그리드 바깥의 입력창 하나로 모든 컬럼을 구글처럼 일괄 검색합니다."
        coreFeatures={[
          "<code>gridApi.setGridOption('quickFilterText', value)</code>: 검색어를 전체 그리드 매칭 엔진에 즉시 캐싱/매칭"
        ]}
        usageScenarios="세부 컬럼 항목을 지정하지 않고도 단어 일부만으로 빠르게 원하는 행을 찾는 '통합검색 UX'가 필요할 때 사용합니다."
      />
      <div style={{ alignSelf: 'flex-end', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <strong>통합 검색: </strong>
        <input type="text" placeholder="검색어 입력..." onChange={onFilterTextBoxChanged} 
               style={{ padding: '8px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> ref={gridRef} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
    </div>
  );
};
export default QuickFilterSample;
