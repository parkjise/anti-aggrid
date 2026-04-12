export interface Employee {
  id: string;
  employeeNo: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: Date;
  salary: number;
  isActive: boolean;
  // 트리 데이터용 (상위 관리자 ID)
  managerId?: string;
}

export interface Order {
  orderId: string;
  customerId: string;
  orderDate: Date;
  totalAmount: number;
  status: string;
}

export interface OrderDetail {
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}
