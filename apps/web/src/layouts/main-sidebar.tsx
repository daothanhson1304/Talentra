import EmployeePanel from "@/modules/employee/components/employee-panel/employee-panel";
import TaskPanel from "@/modules/task/components/task-panel/task-panel";

export default function MainSidebar() {
  return (
    <div className="h-full">
      <EmployeePanel />
      <TaskPanel />
    </div>
  );
}
