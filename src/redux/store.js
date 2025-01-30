// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice'; // Import your slice reducer
export var store = configureStore({
    reducer: {
        tasks: tasksReducer, // Register your slice reducer
    },
});
