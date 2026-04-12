import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const ClipboardCopyPasteSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(300));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, 
    { field: 'salary', editable: true } // 급여 열은 편집(붙여넣기) 허용
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="11. Clipboard Copy / Paste (클립보드 조작)" description="OS의 클립보드와 완벽하게 연동되어, 엑셀 데이터를 복사해서 그리드에 바로 붙여넣거나 그 반대 동작이 가능합니다."
        coreFeatures={[
          "<code>enableRangeSelection={true}</code>: 드래그 영역 선택 활성화가 전제 조건",
          "<code>copyHeadersToClipboard={true}</code>: 표의 헤더까지 통째로 복사본에 포함할지 여부 결정",
          "셀 편집 허용(`editable: true`)인 곳에 붙여넣기 시 엑셀처럼 여러 행을 덮어씀"
        ]}
        usageScenarios="현업에서 사용자가 엑셀로 한참 작업 시뮬레이션을 하다가, 결과물 블록만 주르륵 복사해서 백오피스망 그리드에 Ctrl+V 로 때려박을 때(대량 입력 UX) 필수적입니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          enableRangeSelection={true} 
          copyHeadersToClipboard={true}
        />
      </div></div>
    </div>
  );
};
export default ClipboardCopyPasteSample;
