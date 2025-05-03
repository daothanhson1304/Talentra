import { useDispatch, useSelector } from 'react-redux';
import { getTaskListSelector } from '../stores/selector/task-selector';
import { makeScheduledTask } from '../stores/slice/task-slice';

export default function useTasks() {
  const dispatch = useDispatch();
  const tasks = useSelector(getTaskListSelector);
  const scheduleTask = (taskId: string, day: string, startSlot: number) => {
    dispatch(makeScheduledTask({ id: taskId, day, startSlot }));
  };
  return { tasks, scheduleTask };
}
