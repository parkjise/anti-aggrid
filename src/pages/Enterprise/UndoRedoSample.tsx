import React, { useState, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './UndoRedoSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const UndoRedoSample: React.FC = () => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, { field: 'name', editable: true }, 
    { field: 'department', editable: true }, { field: 'salary', editable: true }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  const onUndo = () => gridRef.current?.api.undoCellEditing();
  const onRedo = () => gridRef.current?.api.redoCellEditing();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="18. Undo / Redo (실행 취소 처리)" description="수정(Edit) 내역 히스토리를 기억하고, Ctrl+Z(가장 최근 수정 취소), Ctrl+Y(다시 반복)를 지원합니다."
        coreFeatures={[
          "<code>undoRedoCellEditing={true}</code>: 실행 취소 기록 활성화",
          "<code>undoRedoCellEditingLimit={20}</code>: 브라우저 메모리에 얼마나 많은 이전 단계까지 기억할지 설정",
          "<code>api.undoCellEditing()</code> 등 외부 리모컨 버튼 연동 가능"
        ]}
        usageScenarios="엑셀 라이크 한 화면을 원할 때 필수적입니다. 수백 건을 클립보드로 붙여넣기 하다가 실수했을 때 Ctrl+Z로 되돌리는 기능은 담당자들에게 구세주와 같습니다."
      />
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={onUndo} style={{ padding: '8px 16px', fontWeight: 'bold' }}>↶ 되돌리기 (Ctrl+Z)</button>
        <button onClick={onRedo} style={{ padding: '8px 16px', fontWeight: 'bold' }}>↷ 다시 실행 (Ctrl+Y)</button>
      </div>
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> theme="legacy" ref={gridRef} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
        />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="UndoRedoSample.tsx" />
    </div>
  );
};
export default UndoRedoSample;
