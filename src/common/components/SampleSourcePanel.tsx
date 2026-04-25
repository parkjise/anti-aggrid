import React, { useState } from 'react';

interface SampleSourcePanelProps {
  sourceCode: string;
  fileName: string;
}

const codeTokenPattern = /(\/\/.*|'.*?'|".*?"|`.*?`|\b(?:const|let|return|null|if|else|true|false|import|from|type|interface|useMemo|useState|useRef)\b|<\/?[A-Z][A-Za-z0-9]*|[A-Z][A-Za-z0-9_]*(?=[<\s[])|[a-zA-Z_$][\w$]*(?==)|\b\d+\b|[{}[\]().,:;<>/=])/g;

const optionCatalog = [
  { token: 'rowData', description: '그리드에 표시할 데이터 배열입니다.' },
  { token: 'columnDefs', description: '컬럼 구성, 필터, 정렬, 셀 스타일 등 컬럼별 동작을 정의합니다.' },
  { token: 'defaultColDef', description: '모든 컬럼에 공통으로 적용할 기본 옵션입니다.' },
  { token: 'cellStyle', description: '셀 단위 인라인 스타일을 고정값 또는 조건 함수로 적용합니다.' },
  { token: 'cellClass', description: '셀에 CSS 클래스를 붙여 스타일을 외부 CSS에서 관리합니다.' },
  { token: 'cellRenderer', description: '셀 값을 텍스트 대신 커스텀 UI로 렌더링합니다.' },
  { token: 'editable', description: '셀을 직접 편집할 수 있게 활성화합니다.' },
  { token: 'filter', description: '컬럼 헤더에서 사용할 필터 타입을 지정합니다.' },
  { token: 'pagination', description: '행을 페이지 단위로 나눠 표시합니다.' },
  { token: 'paginationPageSize', description: '한 페이지에 보여줄 행 개수를 지정합니다.' },
  { token: 'rowSelection', description: '행 단위 선택 방식을 설정합니다.' },
  { token: 'rowHeight', description: '데이터 행의 높이를 고정합니다.' },
  { token: 'headerHeight', description: '헤더 행의 높이를 고정합니다.' },
  { token: 'valueFormatter', description: '셀 값을 화면에 표시하기 전 원하는 문자열 형식으로 변환합니다.' },
  { token: 'valueGetter', description: '원본 데이터에 없는 표시 값을 동적으로 계산합니다.' },
  { token: 'theme="legacy"', description: 'CSS 파일 기반 ag-theme-quartz 테마를 AG Grid v35에서 사용합니다.' },
  { token: 'masterDetail', description: '행 확장 시 하위 디테일 그리드를 렌더링합니다.' },
  { token: 'treeData', description: '계층형 데이터를 트리 구조로 표시합니다.' },
  { token: 'sideBar', description: '컬럼/필터 도구 패널을 그리드 옆에 표시합니다.' },
  { token: 'statusBar', description: '그리드 하단에 집계 상태 패널을 표시합니다.' },
  { token: 'enableRangeSelection', description: '엑셀처럼 셀 범위 선택을 활성화합니다.' },
  { token: 'enableCharts', description: '그리드 데이터 기반 내장 차트 기능을 활성화합니다.' },
  { token: 'getContextMenuItems', description: '우클릭 컨텍스트 메뉴의 기본/커스텀 항목을 구성합니다.' },
  { token: 'onCellValueChanged', description: '셀 편집이 끝난 뒤 실행할 콜백입니다.' },
  { token: 'quickFilterText', description: '모든 컬럼을 대상으로 빠른 검색어를 적용합니다.' },
  { token: 'isExternalFilterPresent', description: '외부 필터가 활성화되어 있는지 AG Grid에 알려줍니다.' },
  { token: 'doesExternalFilterPass', description: '각 행이 외부 필터 조건을 통과하는지 판정합니다.' },
  { token: 'serverSideDatasource', description: '서버 사이드 로우 모델에 데이터 요청/응답 방식을 제공합니다.' }
];

const getTokenColor = (token: string) => {
  if (token.startsWith('//')) return '#6A9955';
  if (/^['"`]/.test(token)) return '#CE9178';
  if (/^(const|let|return|null|if|else|true|false|import|from|type|interface|useMemo|useState|useRef)$/.test(token)) return '#569CD6';
  if (/^<\/?[A-Z]/.test(token)) return '#4EC9B0';
  if (/^[A-Z]/.test(token)) return '#4EC9B0';
  if (/^[a-zA-Z_$][\w$]*(?=$)/.test(token)) return '#9CDCFE';
  if (/^\d+$/.test(token)) return '#B5CEA8';
  return '#D4D4D4';
};

const renderHighlightedCode = (source: string) => {
  return source.split('\n').map((line, lineIndex) => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    line.replace(codeTokenPattern, (match, _token, offset) => {
      if (offset > lastIndex) parts.push(line.slice(lastIndex, offset));
      parts.push(
        <span key={`${lineIndex}-${offset}`} style={{ color: getTokenColor(match) }}>
          {match}
        </span>
      );
      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < line.length) parts.push(line.slice(lastIndex));

    return (
      <div key={lineIndex} style={{ display: 'table-row' }}>
        <span style={{ display: 'table-cell', minWidth: '34px', paddingRight: '16px', color: '#858585', textAlign: 'right', userSelect: 'none' }}>
          {lineIndex + 1}
        </span>
        <span style={{ display: 'table-cell', whiteSpace: 'pre' }}>{parts.length > 0 ? parts : ' '}</span>
      </div>
    );
  });
};

const getOptionDescriptions = (sourceCode: string) => {
  return optionCatalog.filter((item) => sourceCode.includes(item.token)).slice(0, 8);
};

const SampleSourcePanel: React.FC<SampleSourcePanelProps> = ({ sourceCode, fileName }) => {
  const [isCopied, setIsCopied] = useState(false);
  const optionDescriptions = getOptionDescriptions(sourceCode);

  const handleCopySource = async () => {
    await navigator.clipboard.writeText(sourceCode);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1400);
  };

  return (
    <section style={{ background: '#fff', border: '1px solid #DEE1ED', borderRadius: '8px', overflow: 'hidden', flex: '0 0 auto' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #DEE1ED', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#10131e', fontSize: '1rem', fontWeight: 700 }}>그리드 관련 소스</h2>
          <p style={{ margin: '4px 0 0', color: '#737B8B', fontSize: '0.875rem' }}>현재 샘플에 적용된 AG Grid 옵션과 역할입니다.</p>
        </div>
        <button
          type="button"
          onClick={handleCopySource}
          style={{ height: '34px', padding: '0 14px', border: '1px solid #0074FF', borderRadius: '6px', background: isCopied ? '#e8f4ff' : '#0074FF', color: isCopied ? '#005dcc' : '#fff', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          {isCopied ? '복사됨' : '소스 복사'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(280px, 0.85fr)', gap: 0 }}>
        <div style={{ background: '#1e1e1e', minWidth: 0 }}>
          <div style={{ height: '32px', padding: '0 14px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #2d2d2d', color: '#cccccc', fontSize: '0.78rem', fontFamily: 'Menlo, Monaco, Consolas, monospace' }}>
            {fileName}
          </div>
          <pre style={{ margin: 0, padding: '14px 16px', overflow: 'auto', background: '#1e1e1e', color: '#D4D4D4', fontSize: '0.85rem', lineHeight: 1.55, height: '360px', maxHeight: '360px', fontFamily: 'Menlo, Monaco, Consolas, monospace', tabSize: 2 }}>
            <code style={{ display: 'table', minWidth: 'max-content' }}>{renderHighlightedCode(sourceCode)}</code>
          </pre>
        </div>
        <div style={{ padding: '16px', borderLeft: '1px solid #DEE1ED', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '393px', overflow: 'auto' }}>
          {optionDescriptions.map((item) => (
            <div key={item.token}>
              <div style={{ color: '#10131e', fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>{item.token}</div>
              <div style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.45 }}>{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SampleSourcePanel;
