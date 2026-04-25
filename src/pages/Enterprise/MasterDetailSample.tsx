import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, ModuleRegistry, type GetDetailRowDataParams, type ValueFormatterParams } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { generateOrderData, generateOrderDetails, type Order, type OrderDetail } from '../../common/dummyData';
import SampleHeader from '../../common/components/SampleHeader';
import SampleSourcePanel from '../../common/components/SampleSourcePanel';
import sourceCode from './MasterDetailSample.tsx?raw';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const MasterDetailSample: React.FC = () => {
  const [rowData] = useState<Order[]>(() => generateOrderData(10));

  const columnDefs = useMemo<ColDef<Order>[]>(() => [
    // cellRenderer: 'agGroupCellRenderer' 를 써야 화살표(확장 버튼)가 나옵니다.
    { field: 'orderId', cellRenderer: 'agGroupCellRenderer' },
    { field: 'customerId' },
    { field: 'status' },
    { field: 'totalAmount', valueFormatter: p => `$${(p.value||0).toLocaleString()}` }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  const detailCellRendererParams = useMemo(() => ({
    detailGridOptions: {
      columnDefs: [
        { field: 'productId', headerName: '상품코드' },
        { field: 'productName', headerName: '상품명', flex: 2 },
        { field: 'quantity', headerName: '수량' },
        { field: 'unitPrice', headerName: '단가', valueFormatter: (p: ValueFormatterParams<OrderDetail, number>) => `$${(p.value || 0).toLocaleString()}` }
      ],
      defaultColDef: { flex: 1 }
    },
    getDetailRowData: (params: GetDetailRowDataParams<Order, OrderDetail>) => {
      const orderId = params.data.orderId;
      // 실무: 여기서 백엔드 상품 상세 API 통신을 수행 후 successCallback 으로 흘려보냅니다.
      const detailData = generateOrderDetails(orderId, Math.floor(Math.random() * 4) + 1);
      params.successCallback(detailData);
    }
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <SampleHeader 
        title="8. Master Detail (마스터/디테일 중첩 창)" description="특정 행의 확장(▶)을 누루면 그 밑에 완전히 새로운 2차 그리드(디테일)가 렌더링됩니다."
        coreFeatures={[
          "<code>masterDetail={true}</code>: 마스터-디테일 플러그인 활성화",
          "<code>cellRenderer: 'agGroupCellRenderer'</code>: 화살표를 달아줄 마스터 기준 컬럼 지정",
          "<code>detailCellRendererParams.getDetailRowData</code>: 확장되는 순간 디테일 데이터를 비동기로 채우는 콜백 등록"
        ]}
        usageScenarios="ERP에서 '주문원장 목록'을 보여주고, 특정 주문을 확장하면 그 주문의 '상세 상품 리스트'를 불러오는 구조 등, 1:N 관계의 테이블을 가장 깔끔하게 보여주는 방식입니다."
      />
      <div className="grid-wrapper" style={{ flex: 1, padding: 0 }}><div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
         <AgGridReact<Order> theme="legacy" rowHeight={40} headerHeight={40} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
        />
      </div></div>
      <SampleSourcePanel sourceCode={sourceCode} fileName="MasterDetailSample.tsx" />
    </div>
  );
};
export default MasterDetailSample;
