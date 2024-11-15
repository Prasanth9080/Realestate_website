import axios from 'axios';

// Define the base URL for your backend API
const BASE_URL = 'http://localhost:8000';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosInstance,BASE_URL };