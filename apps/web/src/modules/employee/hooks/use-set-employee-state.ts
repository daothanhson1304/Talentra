import { useDispatch } from 'react-redux';
import { setSelectedEmployeeId } from '../stores/slice/employee-slice';

const useSetEmployeeState = () => {
  const dispatch = useDispatch();
  return {
    setSelectedEmployeeId: (id: string) => dispatch(setSelectedEmployeeId(id)),
  };
};

export default useSetEmployeeState;
