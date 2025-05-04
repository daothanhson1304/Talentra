import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  day: string | null;
  slotCount: number;
  startSlot: number;
  scheduled: boolean;
}

export interface TaskState {
  items: Task[];
  draftTask: Task | null;
}

const initialState: TaskState = {
  items: [
    {
      id: '1',
      day: null,
      title: 'Task 1',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
    },
    {
      id: '2',
      day: null,
      title: 'Task 2',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
    },
    {
      id: '3',
      day: null,
      title: 'Task 3',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
    },
    {
      id: '4',
      day: null,
      title: 'Task 4',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
    },
    {
      id: '5',
      day: null,
      title: 'Task 5',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
    },
  ],
  draftTask: null,
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
    setDraftTask: (state, action: PayloadAction<Task | null>) => {
      state.draftTask = action.payload;
    },
    updateSlotCount: (
      state,
      action: PayloadAction<{ id: string; slotCount: number }>
    ) => {
      const task = state.items.find(t => t.id === action.payload.id);
      if (task) {
        task.slotCount = action.payload.slotCount;
      }
    },
    makeScheduledTask: (
      state,
      action: PayloadAction<{ id: string; day: string; startSlot: number }>
    ) => {
      const task = state.items.find(task => task.id === action.payload.id);
      if (task) {
        task.day = action.payload.day;
        task.startSlot = action.payload.startSlot;
        task.slotCount = 2; // Mặc định là 2 slot
        task.scheduled = true;
      }
    },
    updateScheduledTask: (
      state,
      action: PayloadAction<{ id: string; day: string; startSlot: number }>
    ) => {
      const task = state.items.find(task => task.id === action.payload.id);
      if (task) {
        task.day = action.payload.day;
        task.startSlot = action.payload.startSlot;
      }
    },
  },
});

export const {
  addTask,
  makeScheduledTask,
  removeTask,
  setDraftTask,
  updateSlotCount,
  updateScheduledTask,
} = taskSlice.actions;
export default taskSlice.reducer;
