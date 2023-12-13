import axios from "axios";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000/api'
});

const axiosSecureConfig = () => {
    return [axiosSecure];
}

export default axiosSecureConfig;