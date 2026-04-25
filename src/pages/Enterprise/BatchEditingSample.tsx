import React, { useState, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type IRowNode } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './BatchEditingSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const BatchEditingSample: React.FC = () => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));
  
  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department', editable: true }, { field: 'salary', editable: true }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  const onUpdateSalary10Percent = () => {
    const itemsToUpdate: Employee[] = [];
    gridRef.current?.api.forEachNode((node: IRowNode<Employee>) => {
      if (node.data) {
        itemsToUpdate.push({ ...node.data, salary: Math.floor(node.data.salary * 1.1) });
      }
    });
    // applyTransaction은 전체 리렌더를 일으키지 않고 대상 Row만 교체하므로 성능이 매우 우수합니다.
    gridRef.current?.api.applyTransaction({ update: itemsToUpdate });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="17. Batch Editing (트랜잭션 일괄 변경)" description="상태 데이터 통째 교체(리렌더) 없이 내부 트랜잭션 API를 호출해 특정 Row들만 가볍게 일괄 변경합니다."
        coreFeatures={[
          "<code>api.applyTransaction({ update: [], add: [], remove: [] })</code>: React 상태변경 없이 Virtual DOM에 등록된 원본 데이터 객체만 초고속 업데이트"
        ]}
        usageScenarios="'전 직원 급여 일괄인상' 처럼 수천 건의 항목 중 일부 속성들만 자바스크립트로 일괄 처리하여 렌더링 부하를 제로(0)에 가깝게 만들 때 사용하는 고급 기법입니다."
      />
      <div style={{ padding: '8px', background: '#eef2ff', borderRadius: '4px' }}>
        <button onClick={onUpdateSalary10Percent} style={{ padding: '8px 16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          일괄 처리: 전체 연봉 10% 인상
        </button>
      </div>
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> theme="legacy" ref={gridRef} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="BatchEditingSample.tsx" />
    </div>
  );
};
export default BatchEditingSample;
