import { useSelector } from 'react-redux';
import { selectedEmployeeIdSelector } from '../stores/selector/employee-selector';

export const useGetEmployeeState = () => {
  const selectedEmployeeId = useSelector(selectedEmployeeIdSelector);

  return { selectedEmployeeId };
};
