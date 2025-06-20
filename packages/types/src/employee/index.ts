export type EmployeeRole = 'teacher' | 'admin' | 'manager';
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalHours: number;
  totalTasks: number;
  avatar: string;
  role: EmployeeRole;
}
