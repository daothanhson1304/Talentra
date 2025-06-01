import useTaskStore from "@/modules/task/hooks/use-task-store";
import { DragOverEvent } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { setOverId } from "../../shared/drag-drop/stores/drag-slice.js";
import { Task } from "@ttrak/types/task";

export default function useDragDropTask() {
  const dispatch = useDispatch();
  const { draftTask, updateDraftTask } = useTaskStore();
  const dragOverHandler = (e: DragOverEvent) => {
    dispatch(setOverId(e.over?.id as string));
    const activeTask = e.active?.data.current as Task;
    const overTask = e.over?.data.current as Task;
    const draftTask = overTask
      ? {
          ...activeTask,
          day: overTask.day,
          startSlot: overTask.startSlot,
        }
      : null;
    updateDraftTask(draftTask);
  };
  const clearDraftState = () => {
    updateDraftTask(null);
    dispatch(setOverId(null));
  };

  return {
    dragOverHandler,
    clearDraftState,
    draftTask,
  };
}
