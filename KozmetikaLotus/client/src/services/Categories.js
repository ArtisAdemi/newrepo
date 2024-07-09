import axios from 'axios';
import buildUrl from '../helpers/BuildParam';
import API_URL from './backendUrl';
const CATEGORIES_API_URL = `${API_URL}/categories`;

const CategoryService = {
    getCategories: async () => {
        try{

            const response = await axios.get(`${CATEGORIES_API_URL}`, {withCredentials: true});
            return response.data;
        } catch (err) {
            console.error('Error fetching categories:', err);
            return null
        }
    },

    getSubcategories: async (id) => {
        let endpoint = `${CATEGORIES_API_URL}/${id}/subcategories`
        try{
            const response = await axios.get(endpoint, {withCredentials: true});
            return response.data
        }
        catch (err) {  
            console.error('Error fetching subcategories:', err);
            return null
        }
    }

    
};

export default CategoryService;