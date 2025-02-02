import axios from 'axios';

const API_BASE_URL = 'https://daily-task-backend-kappa.vercel.app/api';

export const fetchEmployees = async () => {
  const response = await axios.get(`${API_BASE_URL}/employee`);
  return response.data;
};

export const fetchEmployeeTasks = async (employeeId: string) => {
  const response = await axios.get(`${API_BASE_URL}/employee/${employeeId}`);
  return response.data.tasks;
};

export const fetchTaskSummary = async (employeeId: string, date: string) => {
  const response = await axios.get(`${API_BASE_URL}/task/summary/${employeeId}/${date}`);
  return response.data;
};

export const createTask = async (employeeId: string, task: any) => {
  const response = await axios.post(`${API_BASE_URL}/task`, { employeeId, ...task });
  return response.data;
};

export const updateTask = async (taskId: string, updatedTask: any) => {
  const response = await axios.put(`${API_BASE_URL}/task/${taskId}`, updatedTask);
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`${API_BASE_URL}/task/${taskId}`);
  return response.data;
};
