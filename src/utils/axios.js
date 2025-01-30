// src/utils/axios.ts
import axios from 'axios';
var axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api', // Base URL for your API
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;
