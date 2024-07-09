import axios from 'axios';
import buildUrl from "../helpers/BuildParam";
import API_URL from './backendUrl';
const CLIENTS_API_URL = `${API_URL}/clients`;

const ClientsService = {
    getClients: async (limit) => {
        let endpoint = `${CLIENTS_API_URL}?`
        try{
            let params = {}
            if (limit) {
                params["limit"] = limit
            }
            endpoint += buildUrl(params)
            const response = await axios.get(endpoint, {withCredentials:true});
            return response.data;
        } catch (err) {
            console.error('Error fetching categories:', err);
            return null
        }
    },



    
};

export default ClientsService;