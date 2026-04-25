import React, { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type CellValueChangedEvent } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './EditableCellSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

const EditableCellSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));
  const [log, setLog] = useState<string>('');

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo', editable: false }, // PK 등은 수정 불가 처리
    { field: 'name', editable: true },
    { 
      field: 'salary', 
      editable: true, 
      cellEditor: 'agNumberCellEditor',
      valueFormatter: p => `$${(p.value || 0).toLocaleString()}`
    }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  const onCellValueChanged = useCallback((e: CellValueChangedEvent) => {
    if(e.oldValue !== e.newValue) {
      setLog(`[${e.data.name}] 직원의 ${e.colDef.headerName} 값이 ${e.oldValue} -> ${e.newValue} 로 변경되었습니다.`);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="11. Editable Cell (기본 셀 편집)" description="셀을 더블 클릭해 직접 텍스트를 수정하는 인라인 편집 기능입니다."
        coreFeatures={[
          "<code>editable: true</code>: 셀 편집 기능 활성화",
          "<code>cellEditor: 'agNumberCellEditor'</code>: 단순 텍스트가 아닌 숫자 전용 키패드/입력기 지정",
          "<code>onCellValueChanged</code>: 편집 완료 시점에 호출되어 변경 감지 및 서버 전송 트리거"
        ]}
        usageScenarios="목록 조회뿐만 아니라 즉석에서 담당자 이름이나 연봉 등의 데이터를 빠르게 엑셀처럼 쳐서 변경할 때 엑셀형 백오피스 UI에서 가장 많이 쓰입니다."
      />
      {log && <div style={{ padding: '8px', color: '#b91c1c', fontWeight: 'bold' }}>💡 {log}</div>}
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} onCellValueChanged={onCellValueChanged} />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="EditableCellSample.tsx" />
    </div>
  );
};
export default EditableCellSample;
