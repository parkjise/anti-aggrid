import { faker } from '@faker-js/faker';
import type { Employee, Order, OrderDetail } from './types';
// 다른 파일에서 편하게 import 하도록 그대로 re-export 합니다.
export type { Employee, Order, OrderDetail };

const departments = ['Sales', 'Engineering', 'HR', 'Marketing', 'Finance', 'Design'];
const positions = ['Staff', 'Senior', 'Manager', 'Director', 'VP'];
const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

// 단일 레벨 기본 직원 데이터
export const generateEmployeeData = (count: number = 1000): Employee[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    employeeNo: `EMP-${faker.number.int({ min: 10000, max: 99999 })}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    department: faker.helpers.arrayElement(departments),
    position: faker.helpers.arrayElement(positions),
    joinDate: faker.date.past({ years: 10 }),
    salary: faker.number.int({ min: 40000, max: 150000 }),
    isActive: faker.datatype.boolean({ probability: 0.8 }),
  }));
};

// 트리형 시나리오용 계층형 직원 데이터
export const generateTreeEmployeeData = (): Employee[] => {
  const ceo: Employee = {
    id: 'CEO-1', employeeNo: 'EMP-00001', name: 'John Doe', email: 'ceo@company.com',
    department: 'Executive', position: 'CEO', joinDate: new Date('2010-01-01'), salary: 300000, isActive: true
  };

  const vps = Array.from({ length: 3 }).map((_, i) => ({
    id: `VP-${i}`, employeeNo: `EMP-000${i + 2}`, name: faker.person.fullName(), email: faker.internet.email(),
    department: departments[i], position: 'VP', joinDate: faker.date.past({ years: 8 }), salary: 200000, isActive: true,
    managerId: 'CEO-1'
  }));

  const directReports = vps.flatMap(vp =>
    Array.from({ length: 5 }).map(() => ({
      ...generateEmployeeData(1)[0],
      department: vp.department, // 부모 부서 상속
      managerId: vp.id
    }))
  );

  return [ceo, ...vps, ...directReports];
};

// 마스터 디테일용 시나리오 데이터
export const generateOrderData = (count: number = 100): Order[] => {
  return Array.from({ length: count }).map(() => ({
    orderId: `ORD-${faker.string.alphanumeric(5).toUpperCase()}`,
    customerId: `CUST-${faker.number.int({ min: 1000, max: 9999 })}`,
    orderDate: faker.date.past({ years: 2 }),
    totalAmount: faker.number.int({ min: 100, max: 5000 }),
    status: faker.helpers.arrayElement(statuses)
  }));
};

export const generateOrderDetails = (orderId: string, count: number = 3): OrderDetail[] => {
  return Array.from({ length: count }).map(() => ({
    orderId,
    productId: `PROD-${faker.string.alphanumeric(4).toUpperCase()}`,
    productName: faker.commerce.productName(),
    quantity: faker.number.int({ min: 1, max: 10 }),
    unitPrice: parseFloat(faker.commerce.price({ min: 10, max: 500 }))
  }));
};
