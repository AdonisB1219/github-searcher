import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com', // Aquí debes colocar la URL base de tu API
});

export const fetchUserData = async (username) => {
    try {
      const response = await api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  export const fetchRepositories = async (username) => {
    try {
      const response = await api.get(`/users/${username}/repos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };


export default api;
