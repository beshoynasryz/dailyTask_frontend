// src/utils/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://daily-task-backend-kappa.vercel.app/api', // Base URL for your API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
