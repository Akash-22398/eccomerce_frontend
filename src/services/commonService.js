import axios from "axios";

// Base URL for your API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7071';
const user = JSON.parse(localStorage.getItem('user'));
const token = user?.result?.token
const apiCall = async (method, url, data) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers you may need here
        },
    };

    // Only include body if there's data to send
    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json(); // Return the response data
    } catch (error) {
        console.error(`API call error: ${error}`);
        throw error; // Re-throw the error for handling in the component
    }
};

// Common functions for different HTTP methods
export const apiGet = (url) => apiCall('GET', url);
export const apiPost = (url, data) => apiCall('POST', url, data);
export const apiListPost = (url, data) => apiCall('POST', url, data);
export const apiPut = (url, data) => apiCall('PUT', url, data);
export const apiDelete = (url) => apiCall('DELETE', url);

export const uploadImage = async (file, objectType) => {
    try {
      const formData = new FormData();
      formData.append('objectType', objectType);
    //   formData.append('storage', 'local');
      formData.append('file', file);
  
      const response = await axios.post(`${API_BASE_URL}/media`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `bearer ${token}`
        },
      });
  
      return response;
    } catch (error) {
      console.error('Error uploading image:', error);
      return false;
      // throw new Error('Failed to upload image');
    }
  };

export default apiCall;
