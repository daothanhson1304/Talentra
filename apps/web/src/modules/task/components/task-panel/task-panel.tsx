import { ListFilter } from "lucide-react";
import useTaskStore from "../../hooks/use-task-store";
import CreateTaskPopover from "../create-task-popover";
import TaskList from "./task-list";

export default function TaskPanel() {
  const { tasks } = useTaskStore();
  return (
    <section className="bg-layer0 p-4 h-full w-full">
      <div className="flex items-start justify-between items-center gap-8">
        <h2>Tasks</h2>
        <div className="flex text-primary-foreground justify-end items-center gap-3 flex-1">
          <ListFilter size={18} />
          <CreateTaskPopover />
        </div>
      </div>
      <TaskList tasks={tasks} />
    </section>
  );
}
