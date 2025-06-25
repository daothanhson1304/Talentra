import { useSelector } from 'react-redux';
import { selectedEmployeeIdSelector } from '../stores/selector/employee-selector';
import { useGetEmployeesQuery } from '../stores/api/employee.api';

export const useGetEmployeeState = () => {
  const selectedEmployeeId = useSelector(selectedEmployeeIdSelector);
  const { data: employees } = useGetEmployeesQuery();
  const getEmployeeById = (id: string) => {
    return employees?.find(employee => employee._id === id);
  };
  return { selectedEmployeeId, employees, getEmployeeById };
};
