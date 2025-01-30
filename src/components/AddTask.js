var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'; // Import toast
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
var fetchEmployees = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get('http://localhost:8000/api/employee')];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var fetchEmployeeTasks = function (employeeId) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get("http://localhost:8000/api/employee/".concat(employeeId))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.tasks];
        }
    });
}); };
var fetchTaskSummary = function (employeeId, date) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get("http://localhost:8000/api/task/summary/".concat(employeeId, "/").concat(date))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var createTask = function (employeeId, task) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.post("http://localhost:8000/api/task", __assign({ employeeId: employeeId }, task))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var updateTask = function (taskId, updatedTask) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.put("http://localhost:8000/api/task/".concat(taskId), updatedTask)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var deleteTask = function (taskId) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.delete("http://localhost:8000/api/task/".concat(taskId))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
// Validation Schema using Yup
var taskValidationSchema = Yup.object({
    description: Yup.string().required('Task description is required'),
    from: Yup.date().required('Start time is required'),
    to: Yup.date()
        .required('End time is required')
        .test('duration', 'Task cannot exceed 8 hours', function (value) {
        var from = this.parent.from;
        if (!from || !value)
            return true;
        var duration = (new Date(value).getTime() - new Date(from).getTime()) / (1000 * 60 * 60); // Convert to hours
        return duration <= 8;
    }),
});
var AddTask = function () {
    var dispatch = useDispatch();
    var _a = useState(''), employeeId = _a[0], setEmployeeId = _a[1];
    var _b = useState(''), employeeName = _b[0], setEmployeeName = _b[1];
    var _c = useState([]), employees = _c[0], setEmployees = _c[1];
    var _d = useState([]), tasks = _d[0], setTasks = _d[1];
    var _e = useState({}), taskSummary = _e[0], setTaskSummary = _e[1];
    var _f = useState('2025-01-28'), selectedDate = _f[0], setSelectedDate = _f[1]; // Default date
    useEffect(function () {
        var loadEmployees = function () { return __awaiter(void 0, void 0, void 0, function () {
            var employeesData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchEmployees()];
                    case 1:
                        employeesData = _a.sent();
                        setEmployees(employeesData);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching employees', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        loadEmployees();
    }, []);
    useEffect(function () {
        var loadTasks = function () { return __awaiter(void 0, void 0, void 0, function () {
            var employeeTasks, summary, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!employeeId) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetchEmployeeTasks(employeeId)];
                    case 2:
                        employeeTasks = _a.sent();
                        setTasks(employeeTasks);
                        return [4 /*yield*/, fetchTaskSummary(employeeId, selectedDate)];
                    case 3:
                        summary = _a.sent();
                        setTaskSummary(summary);
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.error('Error fetching tasks for employee', error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        loadTasks();
    }, [employeeId, selectedDate]); // Re-fetch when employee or date changes
    var handleCreateTask = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var createdTask, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, createTask(employeeId, values)];
                case 1:
                    createdTask = _a.sent();
                    setTasks(__spreadArray(__spreadArray([], tasks, true), [createdTask], false)); // Add to the list of tasks
                    toast.success('Task created successfully!');
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error creating task', error_3);
                    toast.error('Failed to create task!');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleEmployeeChange = function (e) {
        var selectedEmployeeId = e.target.value;
        setEmployeeId(selectedEmployeeId);
        var selectedEmployee = employees.find(function (employee) { return employee._id === selectedEmployeeId; });
        if (selectedEmployee) {
            setEmployeeName(selectedEmployee.name);
        }
    };
    return (_jsxs("div", { className: "p-8 max-w-5xl mx-auto bg-gradient-to-r from-blue-400 via-blue-300 to-blue-100 rounded-lg shadow-xl", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-6 text-center", children: "Employee Task Management" }), _jsxs("div", { className: "mb-8", children: [_jsx("label", { htmlFor: "employee", className: "block text-xl font-medium text-white mb-2", children: "Select Employee" }), _jsxs("select", { id: "employee", value: employeeId, onChange: handleEmployeeChange, className: "w-full p-3 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "", children: "Select Employee" }), employees.map(function (employee) { return (_jsx("option", { value: employee._id, children: employee.name }, employee._id)); })] })] }), employeeName && _jsxs("div", { className: "mb-8 text-xl font-medium text-white", children: ["Selected Employee: ", employeeName] }), _jsxs("div", { className: "mb-8", children: [_jsx("label", { htmlFor: "date", className: "block text-xl font-medium text-white mb-2", children: "Select Date" }), _jsx("input", { type: "date", id: "date", value: selectedDate, onChange: function (e) { return setSelectedDate(e.target.value); }, className: "w-full p-3 bg-white border border-gray-300 rounded-md shadow-md" })] }), taskSummary && taskSummary.date && (_jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md mb-8", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: taskSummary.date }), _jsxs("p", { children: ["Total Hours: ", _jsx("span", { className: "font-bold", children: taskSummary.totalHours })] }), _jsxs("p", { children: ["Remaining Hours: ", _jsx("span", { className: "font-bold text-red-500", children: taskSummary.remainingHours })] }), _jsx("h3", { className: "text-xl font-semibold text-gray-800 mt-4", children: "Tasks" }), _jsx("ul", { children: taskSummary.tasks.map(function (task) { return (_jsxs("li", { className: "bg-gray-50 p-4 rounded-lg shadow-sm mb-4", children: [_jsx("div", { children: task.description }), _jsxs("div", { children: [new Date(task.from).toLocaleString(), " - ", new Date(task.to).toLocaleString()] })] }, task._id)); }) })] })), _jsx(Formik, { initialValues: {
                    description: '',
                    from: '',
                    to: ''
                }, validationSchema: taskValidationSchema, onSubmit: handleCreateTask, children: function (_a) {
                    var setFieldValue = _a.setFieldValue, handleSubmit = _a.handleSubmit;
                    return (_jsxs(Form, { className: "bg-white p-6 rounded-lg shadow-lg", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Create New Task" }), _jsxs("div", { className: "mb-4", children: [_jsx(Field, { type: "text", name: "description", className: "w-full p-3 bg-gray-100 border border-gray-300 rounded-md", placeholder: "Task Description" }), _jsx(ErrorMessage, { name: "description", component: "div", className: "text-red-500" })] }), _jsxs("div", { className: "mb-4", children: [_jsx(Field, { type: "datetime-local", name: "from", className: "w-full p-3 bg-gray-100 border border-gray-300 rounded-md" }), _jsx(ErrorMessage, { name: "from", component: "div", className: "text-red-500" })] }), _jsxs("div", { className: "mb-4", children: [_jsx(Field, { type: "datetime-local", name: "to", className: "w-full p-3 bg-gray-100 border border-gray-300 rounded-md" }), _jsx(ErrorMessage, { name: "to", component: "div", className: "text-red-500" })] }), _jsx("button", { type: "submit", className: "bg-blue-500 text-white py-2 px-4 rounded-md", children: "Create Task" })] }));
                } })] }));
};
export default AddTask;
