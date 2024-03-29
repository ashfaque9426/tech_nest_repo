import axios from "axios";
import store from "@/lib/redux/store/store";
import { accessDenied } from "@/lib/redux/features/authorizationSlice";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000/api'
});

const axiosSecureConfig = () => {
    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('tech-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    });

    axiosSecure.interceptors.response.use(response => response, async error => {
        if (error.response && error.response.status === 401 || error.response.status === 403) {
            store.dispatch(accessDenied());
        }
    });

    return axiosSecure;
}

export default axiosSecureConfig;