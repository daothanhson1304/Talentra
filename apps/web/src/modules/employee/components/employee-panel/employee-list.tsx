import { Employee } from "@ttrak/types/employee";
import EmployeeItem from "./employee-item";

const employees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    totalHours: 10,
    totalTasks: 10,
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "098-765-4321",
    address: "456 Oak Ave",
    totalHours: 10,
    totalTasks: 10,
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Jim Beam",
    email: "jim@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    totalHours: 10,
    totalTasks: 10,
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Jill Johnson",
    email: "jill@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    totalHours: 10,
    totalTasks: 10,
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    name: "Jack Johnson",
    email: "jack@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    totalHours: 10,
    totalTasks: 10,
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "6",
    name: "Jill Johnson",
    email: "jill@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    totalHours: 10,
    totalTasks: 10,
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "7",
    name: "Jill Johnson",
    email: "jill@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    totalHours: 10,
    totalTasks: 10,
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "8",
    name: "Jill Johnson",
    email: "jill@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    totalHours: 10,
    totalTasks: 10,
    avatar: "https://via.placeholder.com/150",
  },
];
export default function EmployeeList() {
  return (
    <div className="flex flex-col gap-5 mt-5">
      {employees.map((employee) => (
        <EmployeeItem key={employee.id} employee={employee} />
      ))}
    </div>
  );
}
