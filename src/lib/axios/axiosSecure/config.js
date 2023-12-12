import axios from "axios";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000/api'
});

const AxiosSecure = () => {
    return [axiosSecure];
}

export default AxiosSecure;