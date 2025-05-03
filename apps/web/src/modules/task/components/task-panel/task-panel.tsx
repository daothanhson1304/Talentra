import useTasks from '../../hooks/useTasks';
import TaskGroup from './task-group';

export default function TaskPanel() {
  const { tasks } = useTasks();
  return (
    <section className='w-[300px] bg-[#1c1c1c] text-white p-4 '>
      <h2 className='text-lg font-semibold mb-4'>Tasks</h2>
      <TaskGroup title='Info' tasks={tasks} />
    </section>
  );
}
