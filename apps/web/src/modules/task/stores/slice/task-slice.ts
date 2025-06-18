import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Importance, Task } from '@ttrak/types/task';
export interface TaskState {
  items: Task[];
  draggingTaskId: string | null;
}

const initialState: TaskState = {
  items: [
    {
      id: '1',
      day: '2025-06-17T00:00:00Z',
      title: 'Little Master 5 - Mrs. Alice',
      slotCount: 20,
      startSlot: 15,
      scheduled: true,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '2',
      day: '2025-06-18T00:00:00Z',
      title: 'Elementary 1 - Mrs. Alice',
      slotCount: 12,
      startSlot: 17,
      scheduled: true,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '3',
      day: '2025-06-20T00:00:00Z',
      title: 'Bần 2 - Mrs. Alice',
      slotCount: 18,
      startSlot: 18,
      scheduled: true,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '4',
      day: '2025-06-16T00:00:00Z',
      title: 'Nhân hòa 1 - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '5',
      day: '2025-06-16T00:00:00Z',
      title: 'Phùng Chí Kiên - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },

    {
      id: '6',
      day: '2025-06-16T00:00:00Z',
      title: 'Little Master 5 - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '7',
      day: '2025-06-16T00:00:00Z',
      title: 'Elementary 1 - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '8',
      day: '2025-06-16T00:00:00Z',
      title: 'Bần 2 - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '9',
      day: '2025-06-16T00:00:00Z',
      title: 'Nhân hòa 1 - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '10',
      day: '2025-06-16T00:00:00Z',
      title: 'Phùng Chí Kiên - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '11',
      day: '2025-06-16T00:00:00Z',
      title: 'Little Master 5 - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '12',
      day: '2025-06-16T00:00:00Z',
      title: 'Elementary 1 - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '13',
      day: '2025-06-21T00:00:00Z',
      title: 'Bần 2 - Mrs. Alice',
      slotCount: 8,
      startSlot: 14,
      scheduled: true,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '14',
      day: '2025-06-16T00:00:00Z',
      title: 'Nhân hòa 1 - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '15',
      day: '2025-06-16T00:00:00Z',
      title: 'Phùng Chí Kiên - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '16',
      day: '2025-06-16T00:00:00Z',
      title: 'Little Master 5 - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '17',
      day: '2025-06-16T00:00:00Z',
      title: 'Elementary 1 - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '18',
      day: '2025-06-16T00:00:00Z',
      title: 'Bần 2 - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
    {
      id: '19',
      day: '2025-06-16T00:00:00Z',
      title: 'Nhân hòa 1 - Mrs. Alice',
      slotCount: 6,
      startSlot: 0,
      scheduled: false,
      description: 'Take care of the children',
      importance: Importance.medium,
    },
  ],
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
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    setDraggingTaskId: (state, action: PayloadAction<string | null>) => {
      state.draggingTaskId = action.payload;
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
        task.slotCount = 2;
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
