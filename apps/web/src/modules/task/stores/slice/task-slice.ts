import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  day: string | null;
  slotCount: number;
  startSlot: number | null;
  scheduled: boolean;
}

export interface TaskState {
  items: Task[];
}

const initialState: TaskState = {
  items: [
    {
      id: '1',
      day: null,
      title: 'Task 1',
      slotCount: 0,
      startSlot: null,
      scheduled: false,
    },
    {
      id: '2',
      day: null,
      title: 'Task 2',
      slotCount: 0,
      startSlot: null,
      scheduled: false,
    },
  ],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    makeScheduledTask: (
      state,
      action: PayloadAction<{ id: string; day: string; startSlot: number }>
    ) => {
      const task = state.items.find(task => task.id === action.payload.id);
      if (task) {
        task.day = action.payload.day;
        task.startSlot = action.payload.startSlot;
        task.slotCount = 3; // Mặc định là 1 slot
        task.scheduled = true;
      }
    },
  },
});

export const { addTask, makeScheduledTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
