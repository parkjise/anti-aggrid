import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const SetFilterSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(500));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' },
    { field: 'name' },
    { 
      field: 'department', 
      filter: 'agSetColumnFilter' // 엑셀처럼 유니크한 값들의 체크박스 리스트 표시
    },
    { 
      field: 'position', 
      filter: 'agSetColumnFilter' 
    }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1, floatingFilter: true }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="1. Set Filter (엑셀형 집합 필터)" description="엑셀과 동일하게 해당 열에 존재하는 유니크한 값들을 체크박스 리스트로 추출합니다. (Enterprise 기능)"
        coreFeatures={[
          "<code>filter: 'agSetColumnFilter'</code>: 해당 컬럼의 모든 고유값을 찾아 체크 가능한 목록 생성",
          "검색창 내장: 필터링 목록이 너무 길어지면 그 안에서 다시 텍스트로 검색하는 기능 자동 호환"
        ]}
        usageScenarios="'부서', '직급', '도시'처럼 정해져 있는 카테고리성 데이터를 필터링할 때 가장 많이 사용됩니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
    </div>
  );
};
export default SetFilterSample;
