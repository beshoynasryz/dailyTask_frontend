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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksSummary, deleteTask } from '../features/tasks/tasksSlice';
import axios from 'axios'; // Axios for making the API call to fetch employees
var TaskList = function () {
    var dispatch = useDispatch();
    // Local state for employee & date selection
    var _a = useState(''), employeeId = _a[0], setEmployeeId = _a[1];
    var _b = useState(''), date = _b[0], setDate = _b[1];
    var _c = useState([]), employees = _c[0], setEmployees = _c[1]; // Local state for storing employee list
    var _d = useState(true), loadingEmployees = _d[0], setLoadingEmployees = _d[1]; // Loading state for employees
    var _e = useSelector(function (state) { return state.tasks; }), tasks = _e.tasks, totalHours = _e.totalHours, remainingHours = _e.remainingHours, loading = _e.loading, error = _e.error;
    // Fetch all employees
    useEffect(function () {
        var fetchEmployees = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, axios.get('http://localhost:8000/api/employee')];
                    case 1:
                        response = _a.sent();
                        setEmployees(response.data);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching employees:', error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setLoadingEmployees(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchEmployees();
    }, []);
    // Fetch tasks when employeeId or date changes
    useEffect(function () {
        if (employeeId && date) {
            dispatch(fetchTasksSummary({ employeeId: employeeId, date: date }));
        }
    }, [dispatch, employeeId, date]);
    var handleDelete = function (taskId) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(taskId));
        }
    };
    return (_jsxs("div", { className: "p-4 bg-white shadow rounded-md", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Tasks for the Day" }), _jsxs("select", { value: employeeId, onChange: function (e) { return setEmployeeId(e.target.value); }, className: "border p-2 rounded w-full mb-2", disabled: loadingEmployees, children: [_jsx("option", { value: "", children: "Select Employee" }), loadingEmployees ? (_jsx("option", { children: "Loading employees..." }) // Show loading state for employees
                    ) : (employees.map(function (employee) { return (_jsxs("option", { value: employee.id, children: [employee.name, "  "] }, employee.id)); }))] }), _jsx("input", { type: "date", value: date, onChange: function (e) { return setDate(e.target.value); }, className: "border p-2 rounded w-full mb-4" }), loading && _jsx("p", { children: "Loading tasks..." }), error && _jsxs("p", { className: "text-red-500", children: ["Error: ", error] }), _jsx("ul", { className: "space-y-2", children: tasks.length > 0 ? (tasks.map(function (task) { return (_jsxs("li", { className: "flex justify-between items-center border-b py-2", children: [_jsxs("span", { children: [task.description, " (", task.from, " - ", task.to, ")"] }), _jsx("button", { onClick: function () { return handleDelete(task.id); }, className: "text-red-500 hover:underline", children: "Delete" })] }, task.id)); })) : (_jsx("p", { children: "No tasks found for the selected date." })) }), _jsxs("div", { className: "mt-4 border-t pt-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "Total Hours:" }), " ", totalHours] }), _jsxs("p", { children: [_jsx("strong", { children: "Remaining Hours:" }), " ", remainingHours] })] })] }));
};
export default TaskList;
