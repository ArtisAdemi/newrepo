import axios from 'axios';
import API_URL from './backendUrl';
//import buildUrl from '../middleware/BuildParam';
const MAILER_API_URL = `${API_URL}/mailer`;

const MailerService = {
    sendEmail: async (userData) => {
        try {
            const response = await axios.post(`${MAILER_API_URL}`, userData);
            console.log('Email sent successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    },

    // sendStatusEmail: async (userId) => {
    //     try {
    //         const response = await axios.post(`${API_URL}/status`, userId);
    //         console.log('Email sent successfully:', response.data);
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error sending email:', error);
    //         throw error;
    //     }
    // }
    
};

export default MailerService;