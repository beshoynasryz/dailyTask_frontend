import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksSummary, deleteTask } from '../features/tasks/tasksSlice';
import { RootState, AppDispatch } from '../redux/store';  // Ensure AppDispatch and RootState are imported
import axios from 'axios';  // Axios for making the API call to fetch employees

const TaskList = () => {
  const dispatch: AppDispatch = useDispatch();
  
  // Local state for employee & date selection
  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState('');
  const [employees, setEmployees] = useState<any[]>([]);  // Local state for storing employee list
  const [loadingEmployees, setLoadingEmployees] = useState(true);  // Loading state for employees
  
  const { tasks, totalHours, remainingHours, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employee');  // Update with your actual API
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  // Fetch tasks when employeeId or date changes
  useEffect(() => {
    if (employeeId && date) {
      dispatch(fetchTasksSummary({ employeeId, date }));
    }
  }, [dispatch, employeeId, date]);

  const handleDelete = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId));
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-2">Tasks for the Day</h2>

      {/* Employee Selection */}
      <select 
        value={employeeId} 
        onChange={(e) => setEmployeeId(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        disabled={loadingEmployees}  // Disable select while employees are loading
      >
        <option value="">Select Employee</option>
        {loadingEmployees ? (
          <option>Loading employees...</option>  // Show loading state for employees
        ) : (
          employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}  {/* Display employee name */}
            </option>
          ))
        )}
      </select>

      {/* Date Picker */}
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center border-b py-2">
              <span>{task.description} ({task.from} - {task.to})</span>
              <button 
                onClick={() => handleDelete(task.id)} 
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No tasks found for the selected date.</p>
        )}
      </ul>

      {/* Summary */}
      <div className="mt-4 border-t pt-2">
        <p><strong>Total Hours:</strong> {totalHours}</p>
        <p><strong>Remaining Hours:</strong> {remainingHours}</p>
      </div>
    </div>
  );
};

export default TaskList;
