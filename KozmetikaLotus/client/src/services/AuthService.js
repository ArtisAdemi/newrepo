import axios from 'axios';
import API_URL from './backendUrl';

const AUTH_API_URL = `${API_URL}/auth`;

const axiosInstance = axios.create();
axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;

const AuthService = {
    setAuthToken: () => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
        }
    },

    decodeUser: async () => {
        try {
            AuthService.setAuthToken(); // Set the Authorization header
            const response = await axiosInstance.get(`${AUTH_API_URL}/getUserData`);
            return response.data;
        } catch (err) {
            console.log("You are not logged in");
        }
    }
}

export default AuthService;