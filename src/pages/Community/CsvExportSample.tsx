import React, { useState, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './CsvExportSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

const CsvExportSample: React.FC = () => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, 
    { field: 'salary', valueFormatter: p => `$${(p.value||0).toLocaleString()}` }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1, filter: true }), []);

  const onExportCsv = () => {
    // 옵션을 주어 파일명, 필터된 데이터만 내보내는 것도 가능합니다 (기본은 모든 화면 데이터)
    gridRef.current?.api.exportDataAsCsv({
      fileName: '직원_목록_추출본.csv'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="18. CSV Export (무료 다운로드)" description="별도의 백엔드 없이 현재 그리드에 렌더링된 데이터를 즉시 CSV 형식으로 다운로드합니다."
        coreFeatures={[
          "<code>api.exportDataAsCsv({ fileName })</code>: 클라이언트 JS 단에서 파일 스트림을 생성해 다운로드 실행"
        ]}
        usageScenarios="엑셀(XLSX) 다운로드는 Enterprise(유료) 기능이지만, 단순 데이터 테이블은 무료인 CSV 다운로드만으로도 현업의 요구사항 90%를 충족시킬 수 있습니다."
      />
      <div style={{ padding: '8px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '4px', textAlign: 'right' }}>
        <button onClick={onExportCsv} style={{ padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer' }}>
          ⬇️ CSV 파일로 다운로드
        </button>
      </div>
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> theme="legacy" ref={gridRef} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="CsvExportSample.tsx" />
    </div>
  );
};
export default CsvExportSample;
