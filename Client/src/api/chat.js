import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const chatAPI = {
  sendMessage: async (userId, message) => {
    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        userId,
        message,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  getChatHistory: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/chat/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  },
};

export default chatAPI;
