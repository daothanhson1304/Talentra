import useTaskStore from "@/modules/task/hooks/use-task-store";
import CalendarGrid from "./calendar-grid";
import CalendarHeader from "./calendar-header";
import useDragDropTask from "@/modules/task/hooks/use-drag-drop-task";

export default function CalendarPanel() {
  const { tasks } = useTaskStore();
  const { draftTask } = useDragDropTask();
  return (
    <section className="flex-1 bg-layer1 text-white p-4 h-dvh overflow-auto">
      <CalendarHeader />
      <CalendarGrid tasks={tasks} draftTask={draftTask} />
    </section>
  );
}
