import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './CellAlignmentSample.tsx?raw';

ModuleRegistry.registerModules([AllCommunityModule]);

const CellAlignmentSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(10));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { 
      field: 'employeeNo',
      headerName: '아이디 (좌측 정렬)',
      // 기본 값이 좌측 정렬이므로 생략 가능
    },
    { 
      field: 'name',
      headerName: '이름 (중앙 정렬)',
      // 셀 내용 중앙 정렬
      cellStyle: { textAlign: 'center' },
      // 헤더 내용 중앙 정렬을 위한 내장 클래스
      headerClass: 'ag-center-aligned-header'
    },
    { 
      field: 'salary',
      headerName: '급여 (우측 정렬)',
      // 셀 내용 우측 정렬
      cellStyle: { textAlign: 'right' },
      // 헤더 내용 우측 정렬을 위한 내장 클래스
      headerClass: 'ag-right-aligned-header',
      valueFormatter: (p) => `$${p.value?.toLocaleString()}`
    }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="5. Cell Alignment" description="헤더와 데이터 셀의 좌/중/우 정렬 방향을 개별적으로 맞춥니다."
        coreFeatures={[
          "<code>cellStyle: { textAlign: 'center' | 'right' }</code>: 셀 내부의 데이터 정렬",
          "<code>headerClass: 'ag-center-aligned-header' | 'ag-right-aligned-header'</code>: 헤더(타이틀) 영역의 텍스트 정렬 제어용 AG Grid 내장 클래스 적용"
        ]}
        usageScenarios="숫자(금액, 수량 등) 데이터는 우측 정렬, 이름은 가독성을 위해 중앙 정렬하는 등 가장 기본적인 엑셀 표의 포맷팅 기준을 적용할 때 사용됩니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Employee> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="CellAlignmentSample.tsx" />
    </div>
  );
};
export default CellAlignmentSample;
