export enum EmployeeRole {
  Teacher = 'teacher',
  Admin = 'admin',
  Manager = 'manager',
}
export interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  salary: number;
  department: string;
  position: string;
  avatar: string;
  role: string;
}
