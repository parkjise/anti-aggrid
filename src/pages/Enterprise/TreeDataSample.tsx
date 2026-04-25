import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type GetDataPath, type ICellRendererParams } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateTreeEmployeeData, type Employee } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './TreeDataSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

type TreeEmployee = Employee & { path: string[] };

const TreeDataSample: React.FC = () => {
  const [quickFilterText, setQuickFilterText] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuickFilterText(event.target.value);
  };

  const clearSearch = () => {
    setQuickFilterText('');
  };

  // 트리에 쓸 데이터(id, managerId 포함)를 가져와서,
  // AG Grid TreeData 명세 형태인 "path"(루트부터 현재 노드까지의 id 계층 배열)를 동적으로 만들어줍니다.
  const rowData = useMemo(() => {
    const data = generateTreeEmployeeData();
    const idMap = new Map<string, Employee>();
    data.forEach(d => idMap.set(d.id, d));
    
    return data.map(d => {
      const path: string[] = [];
      let temp: Employee | undefined = d;
      while(temp) {
        path.unshift(temp.id); // 부모 ID를 배열 맨 앞에 삽입
        temp = temp.managerId ? idMap.get(temp.managerId) : undefined;
      }
      return { ...d, path };
    }) satisfies TreeEmployee[];
  }, []);

  const filteredRowData = useMemo(() => {
    const searchText = quickFilterText.trim().toLowerCase();
    if (!searchText) return rowData;

    const idMap = new Map(rowData.map((row) => [row.id, row]));
    const includedIds = new Set<string>();

    rowData.forEach((row) => {
      const isMatched = [row.employeeNo, row.name, row.department, row.position]
        .some((value) => value.toLowerCase().includes(searchText));

      if (!isMatched) return;

      let current: TreeEmployee | undefined = row;
      while (current) {
        includedIds.add(current.id);
        current = current.managerId ? idMap.get(current.managerId) : undefined;
      }
    });

    return rowData.filter((row) => includedIds.has(row.id));
  }, [quickFilterText, rowData]);

  const columnDefs = useMemo<ColDef<TreeEmployee>[]>(() => [
    // 조직도 계층(Group Column)은 AG-Grid가 알아서 만들어주지만, 추가 정보 컬럼은 별도 선언
    { field: 'employeeNo' }, { field: 'name' }, { field: 'department' }, { field: 'position' }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);
  
  // path 속성이 배열 구조 [ 'CEO-1', 'VP-0', ... ] 임을 알려주는 함수
  const getDataPath = useMemo<GetDataPath<TreeEmployee>>(() => {
    return (data) => data.path;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="9. Tree Data (계층형 트리 데이터)" description="내부에 부모/자식(Manager ID) 관계를 가지는 데이터들을 디렉토리/조직도 구조로 파싱하여 렌더링합니다."
        coreFeatures={[
          "<code>treeData={true}</code>: 트리 구조 활성화",
          "<code>getDataPath(data)</code>: AG-Grid에게 이 데이터의 계층 루트(Root->Parent->Child 배열)가 뭔지 알려주는 콜백 등록",
          "<code>groupDefaultExpanded={-1}</code>: 검색 결과 확인이 쉽도록 전체 트리 기본 확장",
          "<code>filteredRowData</code>: 검색어에 맞는 노드와 부모 노드만 표시"
        ]}
        usageScenarios="카테고리 분류 트리, 팀 조직도 계층 트리, 컴퓨터 파일 폴더 시스템 등을 구현할 때 무조건 써야하는 막강한 기능입니다."
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', border: '1px solid #DEE1ED', borderRadius: '8px', padding: '12px 14px' }}>
        <label htmlFor="tree-data-search" style={{ color: '#10131e', fontSize: '0.9rem', fontWeight: 700, whiteSpace: 'nowrap' }}>통합 검색</label>
        <input
          id="tree-data-search"
          type="search"
          value={quickFilterText}
          onChange={handleSearchChange}
          placeholder="이름, 부서, 직급 검색..."
          style={{ width: 'min(420px, 100%)', height: '36px', border: '1px solid #cfd5e3', borderRadius: '6px', padding: '0 12px', color: '#10131e', outline: 'none' }}
        />
        {quickFilterText && (
          <button
            type="button"
            onClick={clearSearch}
            style={{ height: '34px', padding: '0 12px', border: '1px solid #cfd5e3', borderRadius: '6px', background: '#f8fafc', color: '#475569', fontWeight: 700, cursor: 'pointer' }}
          >
            초기화
          </button>
        )}
      </div>
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<TreeEmployee> theme="legacy" rowHeight={40} headerHeight={40} 
          rowData={filteredRowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          treeData={true}
          groupDefaultExpanded={-1}
          getDataPath={getDataPath}
          autoGroupColumnDef={{
            headerName: '조직도',
            minWidth: 300,
            cellRendererParams: { innerRenderer: (params: ICellRendererParams<TreeEmployee>) => params.data ? `${params.data.position} - ${params.data.name}` : '' }
          }}
        />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="TreeDataSample.tsx" />
    </div>
  );
};
export default TreeDataSample;
