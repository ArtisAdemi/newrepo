import axios from "axios";
import API_URL from "./backendUrl";

const USERS_API_URL = `${API_URL}/users`;
const AUTH_API_URL = `${API_URL}/auth`;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

const UserService = {
    getUsers: async () => {
        try {
            const response = await axios.get(USERS_API_URL);
            return response.data;
        } catch (err) {
            console.error("Error fetching users", err);
            throw err;
        }
    },

    getUserById: async (id) => {
        try {
            const response = await axios.get(`${USERS_API_URL}/${id}`);
            return response.data;
        } catch (err) {
            console.error("Error fetching user by ID", err);
            throw err;
        }
    },

    registerUser: async (userData) => {
        let endpoint = `${AUTH_API_URL}/register`
        try {
            const response = await axios.post(endpoint, userData);
            return response.data;
        } catch (err) {
            console.error("Error registering user", err);
            throw err;
        }
    },

    loginUser: async (credentials) => {
        let endpoint = `${AUTH_API_URL}/login`
        try {
            const response = await axios.post(endpoint, credentials);
            return response.data;
        } catch (err) {
            console.error("Error logging in", err);
            throw err;
        }
    },

    validateToken: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return false;
            }
            const response = await axios.get(`${AUTH_API_URL}/validateToken`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            console.error("Error validating token", err);
            throw err;
        }
    },

    updateUser: async (userId, userData) => {
        try {
            const response = await axiosInstance.put(`${USERS_API_URL}/${userId}`, userData);
            return response.data;
        } catch (err) {
            console.error('Error updating user:', err);
            return null;
        }
    },

    giveDiscount: async (userId, discount) => {
        let endpoint = `${USERS_API_URL}/discount`

        try {
            const response = await axiosInstance.put(endpoint, {userId: userId, discount: discount});
            return response.data
        } catch (err) {
            console.error('Error updating discount:', err);
            return null;
        }
    }

    // getUsersWishlist: async (userId) => {
    //     let endpoint = `${USERS_API_URL}/${userId}/wishlist`
    //     try{
    //         const result = await axiosInstance.get(endpoint);
    //         return result.data;
    //     } catch (err) {
    //         console.error("Error getting wishlist", err);
    //         throw err;
    //     }
    // },
}

export default UserService;