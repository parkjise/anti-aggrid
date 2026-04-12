import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type GetDataPath } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateTreeEmployeeData } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const TreeDataSample: React.FC = () => {
  // 트리에 쓸 데이터(id, managerId 포함)를 가져와서,
  // AG Grid TreeData 명세 형태인 "path"(루트부터 현재 노드까지의 id 계층 배열)를 동적으로 만들어줍니다.
  const rowData = useMemo(() => {
    const data = generateTreeEmployeeData();
    const idMap = new Map();
    data.forEach(d => idMap.set(d.id, d));
    
    return data.map(d => {
      const path: string[] = [];
      let temp: any = d;
      while(temp) {
        path.unshift(temp.id); // 부모 ID를 배열 맨 앞에 삽입
        temp = idMap.get(temp.managerId);
      }
      return { ...d, path };
    });
  }, []);

  const columnDefs = useMemo<ColDef[]>(() => [
    // 조직도 계층(Group Column)은 AG-Grid가 알아서 만들어주지만, 추가 정보 컬럼은 별도 선언
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, { field: 'position' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);
  
  // path 속성이 배열 구조 [ 'CEO-1', 'VP-0', ... ] 임을 알려주는 함수
  const getDataPath = useMemo<GetDataPath<any>>(() => {
    return (data) => data.path;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="9. Tree Data (계층형 트리 데이터)" description="내부에 부모/자식(Manager ID) 관계를 가지는 데이터들을 디렉토리/조직도 구조로 파싱하여 렌더링합니다."
        coreFeatures={[
          "<code>treeData={true}</code>: 트리 구조 활성화",
          "<code>getDataPath(data)</code>: AG-Grid에게 이 데이터의 계층 루트(Root->Parent->Child 배열)가 뭔지 알려주는 콜백 등록"
        ]}
        usageScenarios="카테고리 분류 트리, 팀 조직도 계층 트리, 컴퓨터 파일 폴더 시스템 등을 구현할 때 무조건 써야하는 막강한 기능입니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact 
          rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          treeData={true}
          getDataPath={getDataPath}
          autoGroupColumnDef={{
            headerName: '조직도',
            minWidth: 300,
            cellRendererParams: { innerRenderer: (params:any) => params.data.position + ' - ' + params.data.name }
          }}
        />
      </div></div>
    </div>
  );
};
export default TreeDataSample;
