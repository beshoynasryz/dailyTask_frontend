import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Define Task Interface
interface Task {
  id: string;
  name: string;
  description: string;
  from: string;
  to: string;
}

interface TasksState {
  tasks: Task[];
  totalHours: number;
  remainingHours: number;
  loading: boolean;
  error: string | null;
}

// ✅ Initial State
const initialState: TasksState = {
  tasks: [],
  totalHours: 0,
  remainingHours: 0,
  loading: false,
  error: null
};

// ✅ Async Thunks

// Fetch tasks summary for an employee & date
export const fetchTasksSummary = createAsyncThunk(
  "tasks/fetchSummary",
  async ({ employeeId, date }: { employeeId: string; date: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://daily-task-backend-kappa.vercel.app/api/task/summary/${employeeId}/${date}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch tasks");
    }
  }
);

// Create a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData: { name: string; description: string; employeeId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://daily-task-backend-kappa.vercel.app/api/task", taskData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create task");
    }
  }
);

// Update an existing task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedData }: { taskId: string; updatedData: Partial<Task> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://daily-task-backend-kappa.vercel.app/api/task/${taskId}`, updatedData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update task");
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`https://daily-task-backend-kappa.vercel.app/api/task/${taskId}`);
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete task");
    }
  }
);

// ✅ Slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tasks Summary
      .addCase(fetchTasksSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksSummary.fulfilled, (state, action: PayloadAction<{ tasks: Task[]; totalHours: number; remainingHours: number }>) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.totalHours = action.payload.totalHours;
        state.remainingHours = action.payload.remainingHours;
      })
      .addCase(fetchTasksSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default tasksSlice.reducer;
