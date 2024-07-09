import axios from "axios";
import API_URL from "./backendUrl";

const USERS_API_URL = `${API_URL}/users`;

const axiosInstance = axios.create({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*',
    }
});


const WishlistService = {
    setAuthToken: () => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
        }
    },

    getUsersWishlist: async (userId) => {
        WishlistService.setAuthToken();
        let endpoint = `${USERS_API_URL}/${userId}/wishlist`
        try{
            const result = await axiosInstance.get(endpoint);
            return result.data;
        } catch (err) {
            console.error("Error getting wishlist", err);
            throw err;
        }
    },

    addToWishlist: async (userId, productId) => {
        let endpoint = `${USERS_API_URL}/${userId}/wishlist`
        try{
            const result = await axiosInstance.post(endpoint, {productId: productId});
            return result;
        } catch (err) {
            console.error("Error getting wishlist", err);
            throw err;
        }
    },

    removeFromWishlist: async (userId, productId) => {
        let endpoint = `${USERS_API_URL}/${userId}/wishlist/${productId}`
        try{
            const result = await axiosInstance.delete(endpoint);
            return result;
        } catch (err) {
            console.error("Error getting wishlist", err);
            throw err;
        }
    },

    checkIfProductIsInWishlist: async (userId, productId) => {
        let endpoint = `${USERS_API_URL}/${userId}/wishlist/${productId}`;
        try{
            const result = await axiosInstance.get(endpoint);
            return result;
        } catch (err) {
            console.error("Error checking if product is in wishlist", err);
            throw err;
        }
    }
}

export default WishlistService;