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
  dateOfBirth: string;
  country: string;
  city: string;
  createdAt: string;
}

export interface EmployeePagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number;
}

export interface EmployeeFilter {
  search: string;
  department: string;
  position: string;
  sortBy: string;
  sortOrder: string;
}
