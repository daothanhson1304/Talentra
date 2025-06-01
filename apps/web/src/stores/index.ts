import { configureStore } from '@reduxjs/toolkit';
import dragReducer from '@/modules/shared/drag-drop/stores/drag-slice';
import taskReducer from '@/modules/task/stores/slice/task-slice';

export const store = configureStore({
  reducer: {
    drag: dragReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
