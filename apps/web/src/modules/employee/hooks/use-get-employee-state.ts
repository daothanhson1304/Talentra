import { useSelector } from 'react-redux';
import {
  selectEmployees,
  selectSelectedEmployeeId,
} from '../stores/selector/employee-selector';

export const useGetEmployeeState = () => {
  const selectedEmployeeId = useSelector(selectSelectedEmployeeId);
  const employees = useSelector(selectEmployees);
  const getEmployeeById = (id: string) => {
    return employees.find(employee => employee.id === id);
  };
  return { selectedEmployeeId, employees, getEmployeeById };
};
