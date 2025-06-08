import { useSelector } from 'react-redux';
import { selectEmployees } from '../stores/selector';

export default function useEmployeeStore() {
  const employees = useSelector(selectEmployees);
  return {
    employees,
  };
}
