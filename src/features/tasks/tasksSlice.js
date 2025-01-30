var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// ✅ Initial State
var initialState = {
    tasks: [],
    totalHours: 0,
    remainingHours: 0,
    loading: false,
    error: null
};
// ✅ Async Thunks
// Fetch tasks summary for an employee & date
export var fetchTasksSummary = createAsyncThunk("tasks/fetchSummary", function (_a, _b) { return __awaiter(void 0, [_a, _b], void 0, function (_c, _d) {
    var response, error_1;
    var _e, _f;
    var employeeId = _c.employeeId, date = _c.date;
    var rejectWithValue = _d.rejectWithValue;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.get("http://localhost:8000/api/task/summary/".concat(employeeId, "/").concat(date))];
            case 1:
                response = _g.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_1 = _g.sent();
                return [2 /*return*/, rejectWithValue(((_f = (_e = error_1.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.message) || "Failed to fetch tasks")];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Create a new task
export var createTask = createAsyncThunk("tasks/createTask", function (taskData_1, _a) { return __awaiter(void 0, [taskData_1, _a], void 0, function (taskData, _b) {
    var response, error_2;
    var _c, _d;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.post("http://localhost:8000/api/task", taskData)];
            case 1:
                response = _e.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_2 = _e.sent();
                return [2 /*return*/, rejectWithValue(((_d = (_c = error_2.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || "Failed to create task")];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Update an existing task
export var updateTask = createAsyncThunk("tasks/updateTask", function (_a, _b) { return __awaiter(void 0, [_a, _b], void 0, function (_c, _d) {
    var response, error_3;
    var _e, _f;
    var taskId = _c.taskId, updatedData = _c.updatedData;
    var rejectWithValue = _d.rejectWithValue;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.put("http://localhost:8000/api/task/".concat(taskId), updatedData)];
            case 1:
                response = _g.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_3 = _g.sent();
                return [2 /*return*/, rejectWithValue(((_f = (_e = error_3.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.message) || "Failed to update task")];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete a task
export var deleteTask = createAsyncThunk("tasks/deleteTask", function (taskId_1, _a) { return __awaiter(void 0, [taskId_1, _a], void 0, function (taskId, _b) {
    var error_4;
    var _c, _d;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.delete("http://localhost:8000/api/task/".concat(taskId))];
            case 1:
                _e.sent();
                return [2 /*return*/, taskId];
            case 2:
                error_4 = _e.sent();
                return [2 /*return*/, rejectWithValue(((_d = (_c = error_4.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || "Failed to delete task")];
            case 3: return [2 /*return*/];
        }
    });
}); });
// ✅ Slice
var tasksSlice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            // Fetch Tasks Summary
            .addCase(fetchTasksSummary.pending, function (state) {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchTasksSummary.fulfilled, function (state, action) {
            state.loading = false;
            state.tasks = action.payload.tasks;
            state.totalHours = action.payload.totalHours;
            state.remainingHours = action.payload.remainingHours;
        })
            .addCase(fetchTasksSummary.rejected, function (state, action) {
            state.loading = false;
            state.error = action.payload;
        })
            // Create Task
            .addCase(createTask.pending, function (state) {
            state.loading = true;
            state.error = null;
        })
            .addCase(createTask.fulfilled, function (state, action) {
            state.loading = false;
            state.tasks.push(action.payload);
        })
            .addCase(createTask.rejected, function (state, action) {
            state.loading = false;
            state.error = action.payload;
        })
            // Update Task
            .addCase(updateTask.pending, function (state) {
            state.loading = true;
            state.error = null;
        })
            .addCase(updateTask.fulfilled, function (state, action) {
            state.loading = false;
            var index = state.tasks.findIndex(function (task) { return task.id === action.payload.id; });
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        })
            .addCase(updateTask.rejected, function (state, action) {
            state.loading = false;
            state.error = action.payload;
        })
            // Delete Task
            .addCase(deleteTask.pending, function (state) {
            state.loading = true;
            state.error = null;
        })
            .addCase(deleteTask.fulfilled, function (state, action) {
            state.loading = false;
            state.tasks = state.tasks.filter(function (task) { return task.id !== action.payload; });
        })
            .addCase(deleteTask.rejected, function (state, action) {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
export default tasksSlice.reducer;
