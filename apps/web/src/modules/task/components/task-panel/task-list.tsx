import useDragDropTask from "@/modules/task/hooks/use-drag-drop-task";
import TaskItem from "./task-item";
import { Task } from "@ttrak/types/task";

interface TaskListProps {
  tasks: Task[];
}
export default function TaskList({ tasks }: TaskListProps) {
  const { draftTask } = useDragDropTask();
  return (
    <div className="mb-6">
      <ul className="task-list space-y-2 overflow-y-auto">
        {tasks.map((task, idx) => {
          if (task.scheduled) return null;
          return (
            <TaskItem
              key={idx}
              task={task}
              isHidden={!!draftTask && task.id === draftTask.id}
            />
          );
        })}
      </ul>
    </div>
  );
}
