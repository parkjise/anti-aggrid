import React, { useState, useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type IRowNode } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const ExternalFilterSample: React.FC = () => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(500));
  const [activeFilter, setActiveFilter] = useState<'all'|'highSalary'>('all');

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, 
    { field: 'salary', valueFormatter: p => `$${(p.value || 0).toLocaleString()}` }
  ], []);
  
  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  const isExternalFilterPresent = useCallback(() => activeFilter !== 'all', [activeFilter]);
  const doesExternalFilterPass = useCallback((node: IRowNode<Employee>) => {
    if (activeFilter === 'highSalary') return node.data ? node.data.salary >= 100000 : false;
    return true;
  }, [activeFilter]);

  const applyFilter = (filterType: 'all'|'highSalary') => {
    setActiveFilter(filterType);
    // 상태 변경 후 그리드 필터 갱신 트리거
    setTimeout(() => gridRef.current?.api.onFilterChanged(), 0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="7. External Filter (그리드 외부 필터연동)" description="그리드에 종속되지 않은 외부 UI 폼/버튼들을 이용해 전역 필터를 제어합니다."
        coreFeatures={[
          "<code>isExternalFilterPresent()</code>: 외부 필터가 활성화된 상태인지 bool 반환",
          "<code>doesExternalFilterPass()</code>: 렌더링 시 각 Node를 순회하며 통과 여부 검사 로직",
          "<code>api.onFilterChanged()</code>: 필터 상태(State) 변경 시 리렌더링 수동 트리거"
        ]}
        usageScenarios="현업에서 그리드를 다룰때 70% 이상의 필터박스(조회 폼)는 그리드 바깥에 그립니다. 그럴때 해당 폼의 값들과 그리드를 연결하는 핵심 방식입니다."
      />
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => applyFilter('all')} 
                style={{ padding: '8px 16px', fontWeight: 'bold', background: activeFilter==='all' ? '#2563eb' : '#e5e7eb', color: activeFilter==='all' ? '#fff' : '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          전체 보기
        </button>
        <button onClick={() => applyFilter('highSalary')} 
                style={{ padding: '8px 16px', fontWeight: 'bold', background: activeFilter==='highSalary' ? '#2563eb' : '#e5e7eb', color: activeFilter==='highSalary' ? '#fff' : '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          고액 연봉자 (10만 달러 이상) 보기
        </button>
      </div>

      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> ref={gridRef} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          isExternalFilterPresent={isExternalFilterPresent} doesExternalFilterPass={doesExternalFilterPass} />
      </div></div>
    </div>
  );
};
export default ExternalFilterSample;
