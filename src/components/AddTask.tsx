import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AppDispatch } from '../redux/store';
import toast from 'react-hot-toast';  // Import toast
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const fetchEmployees = async () => {
  const response = await axios.get('http://localhost:8000/api/employee');
  return response.data;
};

const fetchEmployeeTasks = async (employeeId: string) => {
  const response = await axios.get(`http://localhost:8000/api/employee/${employeeId}`);
  return response.data.tasks;
};

const fetchTaskSummary = async (employeeId: string, date: string) => {
  const response = await axios.get(`http://localhost:8000/api/task/summary/${employeeId}/${date}`);
  return response.data;
};

const createTask = async (employeeId: string, task: any) => {
  const response = await axios.post(`http://localhost:8000/api/task`, { employeeId, ...task });
  return response.data;
};

const updateTask = async (taskId: string, updatedTask: any) => {
  const response = await axios.put(`http://localhost:8000/api/task/${taskId}`, updatedTask);
  return response.data;
};

const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`http://localhost:8000/api/task/${taskId}`);
  return response.data;
};

// Validation Schema using Yup
const taskValidationSchema = Yup.object({
  description: Yup.string().required('Task description is required'),
  from: Yup.date().required('Start time is required'),
  to: Yup.date()
    .required('End time is required')
    .test('duration', 'Task cannot exceed 8 hours', function(value) {
      const { from } = this.parent;
      if (!from || !value) return true;

      const duration = (new Date(value).getTime() - new Date(from).getTime()) / (1000 * 60 * 60); // Convert to hours
      return duration <= 8;
    }),
});

const AddTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employees, setEmployees] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskSummary, setTaskSummary] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState('2025-01-28'); // Default date

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const employeesData = await fetchEmployees();
        setEmployees(employeesData);
      } catch (error) {
        console.error('Error fetching employees', error);
      }
    };
    loadEmployees();
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      if (employeeId) {
        try {
          const employeeTasks = await fetchEmployeeTasks(employeeId);
          setTasks(employeeTasks);

          // Fetch task summary for the selected date
          const summary = await fetchTaskSummary(employeeId, selectedDate);
          setTaskSummary(summary);
        } catch (error) {
          console.error('Error fetching tasks for employee', error);
        }
      }
    };
    loadTasks();
  }, [employeeId, selectedDate]); // Re-fetch when employee or date changes

  const handleCreateTask = async (values: any) => {
    try {
      const createdTask = await createTask(employeeId, values);
      setTasks([...tasks, createdTask]); // Add to the list of tasks
      toast.success('Task created successfully!');
    } catch (error) {
      console.error('Error creating task', error);
      toast.error('Failed to create task!');
    }
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmployeeId = e.target.value;
    setEmployeeId(selectedEmployeeId);
    const selectedEmployee = employees.find(employee => employee._id === selectedEmployeeId);
    if (selectedEmployee) {
      setEmployeeName(selectedEmployee.name);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gradient-to-r from-blue-400 via-blue-300 to-blue-100 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">Employee Task Management</h1>

      {/* Employee Selection */}
      <div className="mb-8">
        <label htmlFor="employee" className="block text-xl font-medium text-white mb-2">Select Employee</label>
        <select
          id="employee"
          value={employeeId}
          onChange={handleEmployeeChange}
          className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Employee</option>
          {employees.map((employee: any) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display selected employee name */}
      {employeeName && <div className="mb-8 text-xl font-medium text-white">Selected Employee: {employeeName}</div>}

      {/* Date Picker for Task Summary */}
      <div className="mb-8">
        <label htmlFor="date" className="block text-xl font-medium text-white mb-2">Select Date</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-md"
        />
      </div>

      {/* Task Summary */}
      {taskSummary && taskSummary.date && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{taskSummary.date}</h2>
          <p>Total Hours: <span className="font-bold">{taskSummary.totalHours}</span></p>
          <p>Remaining Hours: <span className="font-bold text-red-500">{taskSummary.remainingHours}</span></p>
          <h3 className="text-xl font-semibold text-gray-800 mt-4">Tasks</h3>
          <ul>
            {taskSummary.tasks.map((task: any) => (
              <li key={task._id} className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                <div>{task.description}</div>
                <div>{new Date(task.from).toLocaleString()} - {new Date(task.to).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Task Creation Form */}
      <Formik
        initialValues={{
          description: '',
          from: '',
          to: ''
        }}
        validationSchema={taskValidationSchema}
        onSubmit={handleCreateTask}
      >
        {({ setFieldValue, handleSubmit }) => (
          <Form className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Task</h2>
            <div className="mb-4">
              <Field
                type="text"
                name="description"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md"
                placeholder="Task Description"
              />
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <Field
                type="datetime-local"
                name="from"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="from" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <Field
                type="datetime-local"
                name="to"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="to" component="div" className="text-red-500" />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Create Task
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTask;
