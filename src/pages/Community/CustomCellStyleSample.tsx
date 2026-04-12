import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type CellClassParams, type CellStyle } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllCommunityModule]);

const CustomCellStyleSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(200));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'name' },
    { field: 'department' },
    { 
      field: 'salary', 
      valueFormatter: p => `$${(p.value||0).toLocaleString()}`,
      // 1. 객체를 반환하는 스타일 로직
      cellStyle: (params: CellClassParams<Employee>): CellStyle | null => {
        if (!params.value) return null;
        if (params.value > 120000) return { backgroundColor: '#fef08a', fontWeight: 'bold', color: '#854d0e' }; // 고연봉
        if (params.value < 50000) return { backgroundColor: '#fecaca', color: '#991b1b' }; // 저연봉
        return null;
      }
    },
    {
      field: 'isActive',
      // 2. CSS 클래스 명을 반환하는 로직 (SCSS 연동에 좋음)
      cellClassRules: {
        'status-active-row': (params: CellClassParams) => params.value === true,
        'status-inactive-row': (params: CellClassParams) => params.value === false,
      }
    }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <style>{`
        .status-active-row { color: #16a34a; font-weight: bold; background: #f0fdf4; }
        .status-inactive-row { color: #dc2626; text-decoration: line-through; background: #fef2f2; }
      `}</style>
      <SampleHeader 
        title="19. Custom Cell Style (조건부 형광펜)" description="데이터 값에 따라 셀의 배경색, 글자색 등 스타일을 동적으로 입힙니다."
        coreFeatures={[
          "<code>cellStyle</code>: 인라인 스타일 객체(React.CSSProperties)를 리턴하여 직접 스타일 제어",
          "<code>cellClassRules</code>: 조건부를 Key-Value로 엮어, true가 되는 CSS 클래스명을 부여"
        ]}
        usageScenarios="초과 근무자 표시, 재고 부족 알림 빨간색 표시, 특정 부서 하이라이팅 등 엑셀의 '조건부 서식' 기능을 완벽하게 대체합니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
    </div>
  );
};
export default CustomCellStyleSample;
