// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice'; // Import your slice reducer

export const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Register your slice reducer
  },
});

// Type for the dispatch function
export type AppDispatch = typeof store.dispatch;

// Type for the root state (the entire store)
export type RootState = ReturnType<typeof store.getState>;
