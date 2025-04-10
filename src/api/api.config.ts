import axios from 'axios';

export const APIConfig = axios.create({
    baseURL: import.meta.env.VITE_API_LOCAL,
    withCredentials: true
})