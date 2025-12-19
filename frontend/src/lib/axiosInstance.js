import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    // baseURL: 'http://<vm_ip>:5000/api/',
});


export default axiosInstance;