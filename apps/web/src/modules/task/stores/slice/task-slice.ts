import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@talentra/types/task';
export interface TaskState {
  items: Task[];
  draggingTaskId: string | null;
  originalTasks: Record<string, Task[]>;
  editedTasks: Record<string, Task[]>;
  isSavingBulkTask: boolean;
}

const initialState: TaskState = {
  items: [],
  draggingTaskId: null,
  originalTasks: {},
  editedTasks: {},
  isSavingBulkTask: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setDraggingTaskId: (state, action: PayloadAction<string | null>) => {
      state.draggingTaskId = action.payload;
    },
    setIsSavingBulkTask: (state, action: PayloadAction<boolean>) => {
      state.isSavingBulkTask = action.payload;
    },
    updateSlotCount: (
      state,
      action: PayloadAction<{
        id: string;
        slotCount: number;
        employeeId: string;
      }>
    ) => {
      const task = state.editedTasks[action.payload.employeeId]?.find(
        (task: Task) => task._id === action.payload.id
      );
      if (task) {
        task.slotCount = action.payload.slotCount;
      }
    },
    setTasks: (state, action: PayloadAction<Record<string, Task[]>>) => {
      state.editedTasks = {
        ...state.editedTasks,
        ...action.payload,
      };
      state.originalTasks = {
        ...state.originalTasks,
        ...action.payload,
      };
    },
    updateScheduledTask: (
      state,
      action: PayloadAction<{
        id: string;
        day: string;
        startSlot: number;
        employeeId: string;
      }>
    ) => {
      const task = state.editedTasks[action.payload.employeeId]?.find(
        task => task._id === action.payload.id
      );
      if (task) {
        task.day = action.payload.day;
        task.startSlot = task.startSlot + action.payload.startSlot;
        task.scheduled = true;
      }
    },
    syncWithOriginal(state) {
      state.originalTasks = JSON.parse(JSON.stringify(state.editedTasks));
    },
  },
});

export const {
  updateSlotCount,
  updateScheduledTask,
  setDraggingTaskId,
  setTasks,
  setIsSavingBulkTask,
  syncWithOriginal,
} = taskSlice.actions;
export default taskSlice.reducer;
