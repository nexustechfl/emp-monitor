import axios from 'axios';

const BASE_URL = ``;
const SOCKET_BASE_URL = ``;
const BACKEND_V4_URL = ``;

const authInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

const apiInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const loginApiInstance = axios.create({
    baseURL: BACKEND_V4_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

export default {
    authInstance: authInstance,
    apiInstance: apiInstance,
    SOCKET_BASE_URL,
    loginApiInstance
};