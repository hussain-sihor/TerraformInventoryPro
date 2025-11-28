import axios from 'axios';

// Create an Axios instance with a base URL
// http://localhost:5000/api/
const axiosInstance = axios.create({
    // baseURL: 'https://inventorybackend-gray.vercel.app/api/',
    baseURL: 'http://localhost:5000/api/',
});


export default axiosInstance;