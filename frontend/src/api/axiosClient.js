import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://haibazo-test-b1.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;