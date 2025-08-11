import axios from 'axios';
import{BASE_URL} from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // Set a timeout of 10 seconds
    headers: {
        'Content-Type': 'application/json',
        Accept:"application/json",
    },
});

//Request interceptor 
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);     

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
    if (error.response) {
        if(error.response.status === 401) {
            window.location.href = '/login'; 
        }else if(error.response.status === 500){
            console.error("Internal Server Error. try again later."); 
        }
        return Promise.reject(error);
    }
    else if (error.code=="ECONNABORTED") {
        console.error("Request timed out. Please try again later.");
    }
    return Promise.reject(error);
    }
);
export default axiosInstance;