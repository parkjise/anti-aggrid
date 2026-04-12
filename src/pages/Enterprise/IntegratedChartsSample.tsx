import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const IntegratedChartsSample: React.FC = () => {
  const [rowData] = useState<Employee[]>(() => generateEmployeeData(100));

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    { field: 'name', chartDataType: 'category' }, // X축 (라벨 이름)
    { field: 'department', chartDataType: 'category' },
    { field: 'salary', chartDataType: 'series' }, // Y축 (숫자 값)
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="20. Integrated Charts (내장 차트 생성)" description="그리드 안에 있는 데이터를 마우스로 드래그한 뒤 우클릭하면, 그 자리에서 즉시 막대 차트나 원형 차트가 팝업으로 생성됩니다."
        coreFeatures={[
          "<code>enableCharts={true}</code>: 네이티브 차팅 엔진 활성화 (Range Selection 선행 필수)",
          "<code>chartDataType: 'category' | 'series'</code>: 어떤 데이터가 축이 될지, 어떤 데이터가 값이 될지 기준을 잡아줌"
        ]}
        usageScenarios="Highcharts나 ECharts 같은 무거운 라이브러리를 붙이지 않아도, 재무팀이나 기획팀이 엑셀처럼 표 데이터의 일부분을 드래그-우클릭 해서 다이나믹 보고서용 차트 스냅샷을 찍을 수 있게 해줍니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<Employee> rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          enableRangeSelection={true} 
          enableCharts={true}
        />
      </div></div>
    </div>
  );
};
export default IntegratedChartsSample;
