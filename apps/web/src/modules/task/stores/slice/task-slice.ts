import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@ttrak/types/task';
export interface TaskState {
  items: Task[];
  draggingTaskId: string | null;
}

const initialState: TaskState = {
  items: [],
  draggingTaskId: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(task => task._id !== action.payload);
    },
    setDraggingTaskId: (state, action: PayloadAction<string | null>) => {
      state.draggingTaskId = action.payload;
    },
    updateSlotCount: (
      state,
      action: PayloadAction<{ id: string; slotCount: number }>
    ) => {
      const task = state.items.find(t => t._id === action.payload.id);
      if (task) {
        task.slotCount = action.payload.slotCount;
      }
    },
    makeScheduledTask: (
      state,
      action: PayloadAction<{ id: string; day: string; startSlot: number }>
    ) => {
      const task = state.items.find(task => task._id === action.payload.id);
      if (task) {
        task.day = action.payload.day;
        task.startSlot = action.payload.startSlot;
        task.slotCount = 2;
        task.scheduled = true;
      }
    },
    updateScheduledTask: (
      state,
      action: PayloadAction<{ id: string; day: string; startSlot: number }>
    ) => {
      const task = state.items.find(task => task._id === action.payload.id);
      if (task) {
        task.day = action.payload.day;
        task.startSlot = task.startSlot + action.payload.startSlot;
        task.scheduled = true;
      }
    },
  },
});

export const {
  addTask,
  makeScheduledTask,
  removeTask,
  updateSlotCount,
  updateScheduledTask,
  setDraggingTaskId,
} = taskSlice.actions;
export default taskSlice.reducer;
