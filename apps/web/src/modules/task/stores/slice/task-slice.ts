import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@ttrak/types/task';
export interface TaskState {
  items: Task[];
  draftTask: Task | null;
}

const initialState: TaskState = {
  items: [
    {
      id: '1',
      day: null,
      title: 'Little Master 5 - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '2',
      day: null,
      title: 'Elementary 1 - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '3',
      day: null,
      title: 'Bần 2 - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '4',
      day: null,
      title: 'Nhân hòa 1 - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '5',
      day: null,
      title: 'Phùng Chí Kiên - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },

    {
      id: '6',
      day: null,
      title: 'Little Master 5 - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '7',
      day: null,
      title: 'Elementary 1 - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '8',
      day: null,
      title: 'Bần 2 - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '9',
      day: null,
      title: 'Nhân hòa 1 - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '10',
      day: null,
      title: 'Phùng Chí Kiên - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '11',
      day: null,
      title: 'Little Master 5 - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '12',
      day: null,
      title: 'Elementary 1 - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '13',
      day: null,
      title: 'Bần 2 - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '14',
      day: null,
      title: 'Nhân hòa 1 - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
    },
    {
      id: '15',
      day: null,
      title: 'Phùng Chí Kiên - Mrs. Alice',
      slotCount: 2,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
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
