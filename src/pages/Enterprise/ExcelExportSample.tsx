import React, { useState, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const ExcelExportSample: React.FC = () => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(300));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, 
    { field: 'salary', valueFormatter: p => `$${(p.value||0).toLocaleString()}` }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1, filter: true }), []);

  const onExportExcel = () => {
    // 엑셀 내보내기. CSV와 달리 셀 스타일, 그룹핑, 탭 시트 구조를 그대로 유지할 수 있음
    gridRef.current?.api.exportDataAsExcel({
      fileName: '직원_보고서.xlsx',
      sheetName: '직원명부'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="4. Excel Export (엑셀 원본 내보내기)" description="단순 문자열인 CSV를 넘어 서식이 유지되는 네이티브 XLSX 파일로 다운로드합니다."
        coreFeatures={[
          "<code>api.exportDataAsExcel()</code>: XML/XLSX 기반 바이너리 작성 후 다운로드"
        ]}
        usageScenarios="백엔드에서 엑셀 라이브러리(POI, OpenPyXL) 등을 쓰지 않아도, 클라이언트 화면의 데이터를 통째로 엑셀 보고서 형태로 만들 때 서버 부하를 100% 줄일 수 있습니다."
      />
      <div style={{ padding: '8px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '4px', textAlign: 'right' }}>
        <button onClick={onExportExcel} style={{ padding: '10px 20px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer' }}>
          ✅ Excel (xlsx) 로 추출
        </button>
      </div>
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> ref={gridRef} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
    </div>
  );
};
export default ExcelExportSample;
