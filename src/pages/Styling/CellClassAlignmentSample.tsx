import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import './CellClassAlignmentSample.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const CellClassAlignmentSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(50));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { 
      field: 'employeeNo',
      headerName: '사번 (좌측 정렬)',
      cellClass: 'left-aligned-cell',
      headerClass: 'ag-left-aligned-header'
    },
    { 
      field: 'name',
      headerName: '이름 (중앙 정렬)',
      // CSS 클래스를 사용한 중앙 정렬 (수직/수평)
      cellClass: 'centered-cell',
      headerClass: 'ag-center-aligned-header'
    },
    { 
      field: 'department',
      headerName: '부서 (중앙 정렬)',
      cellClass: 'centered-cell',
      headerClass: 'ag-center-aligned-header'
    },
    { 
      field: 'salary',
      headerName: '급여 (우측 정렬)',
      // CSS 클래스를 사용한 우측 정렬
      cellClass: 'right-aligned-cell',
      headerClass: 'ag-right-aligned-header',
      valueFormatter: (p) => `$${p.value?.toLocaleString()}`
    }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    flex: 1,
    resizable: true
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="24. Alignment via CSS Class (클래스 기반 정렬)" 
        description="cellStyle 대신 CSS 클래스(cellClass)를 사용하여 셀의 텍스트 및 콘텐츠를 정렬합니다."
        coreFeatures={[
          "<code>cellClass: 'centered-cell'</code>: 외부 CSS 파일에 정의된 클래스를 적용하여 중앙 정렬 구현",
          "<code>headerClass: 'ag-center-aligned-header'</code>: 헤더의 텍스트를 중앙으로 정렬하는 AG Grid 내장 클래스",
          "수직/수평 정렬을 동시에 제어하기 위해 <code>display: flex</code>와 <code>align-items/justify-content</code> 활용"
        ]}
        usageScenarios="인라인 스타일(cellStyle)을 피하고 프로젝트 표준 CSS 시스템에 맞춰 정렬 스타일을 관리하고자 할 때 사용합니다. 특히 행 높이가 커질 때 수직 중앙 정렬을 보장하기에 유리합니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}>
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
          <AgGridReact<Employee> 
            rowData={rowData} 
            columnDefs={columnDefs} 
            defaultColDef={defaultColDef}
            rowHeight={60} // 클래스 기반 수직 중앙 정렬 확인을 위해 높이 설정
          />
        </div>
      </div>
    </div>
  );
};

export default CellClassAlignmentSample;
