import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type IServerSideDatasource, type IServerSideGetRowsParams } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
// 이 예제에서는 원본 전체 데이터를 Server DB라고 가정합니다.
import { generateEmployeeData } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './ServerSideRowModelSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

// 1만건의 백엔드 가상 데이터 베이스 생성
const mockDatabase = generateEmployeeData(10);

const ServerSideRowModelSample: React.FC = () => {
  const columnDefs = useMemo<ColDef[]>(() => [
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, { field: 'salary' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1, sortable: false, filter: false }), []);

  // AG Grid 서버 사이드 전용 데이터소스 명세 구성을 이용해 가상 API 통신을 모사합니다.
  const serverSideDatasource = useMemo<IServerSideDatasource>(() => ({
    getRows: (params: IServerSideGetRowsParams) => {
      // 스크롤이 트리거되어 새로운 페이지 요청이 올 때마다 백엔드로 보낼 시작 index와 종료 index
      const startRow = params.request.startRow ?? 0;
      const endRow = params.request.endRow ?? 100;
      
      console.log(`[서버에 쿼리 요청] : LIMIT ${endRow - startRow} OFFSET ${startRow}...`);
      
      // 실제 프로젝트에서는 여기서 axios 로 get 요청을 함
      setTimeout(() => {
        const rowData = mockDatabase.slice(startRow, endRow);
        // 서버에서 받아온 데이터 chunk 와 전체 카운트를 넘겨줍니다 (무한 스크롤 연산)
        params.success({ rowData, rowCount: mockDatabase.length });
      }, 500); // 0.5초 네트워크 딜레이
    }
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="19. Server-Side Row Model (서버 무한 페이징)" description="수천만 건의 데이터를 다룰 때, 클라이언트에 모든 값을 받지 않고 화면 스크롤이 넘어갈 때마다 백엔드로 부분 요청(Chunk)을 보내 렌더링합니다."
        coreFeatures={[
          "<code>rowModelType='serverSide'</code>: 그리드의 구동 방식 자체를 Client 측 모델에서 Server 측 모델로 환장",
          "<code>serverSideDatasource</code>: 스크롤 위치에 따라 콜백을 받아 통신하고 `success/fail`을 호출"
        ]}
        usageScenarios="현업에서 빅데이터 1,000만 건 테이블을 스크롤로 가볍게 보여줘야 할 때 사용하는 '무한 스크롤(Infinite Scroll) 및 서버사이드 그룹핑'의 정수입니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact theme="legacy" rowHeight={40} headerHeight={40} 
          columnDefs={columnDefs} defaultColDef={defaultColDef} 
          rowModelType="serverSide"
          serverSideDatasource={serverSideDatasource}
          // 캐싱 블록 사이즈 조정 가능
          cacheBlockSize={50}
        />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="ServerSideRowModelSample.tsx" />
    </div>
  );
};
export default ServerSideRowModelSample;
