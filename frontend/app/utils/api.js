// utils/api.js
export const apiRequest = async (url, method = 'GET', data = null) => {
    try {
      const baseurl = "http://localhost:8000/api"
      const headers = {
        'Content-Type': 'application/json',
      };
      
      const token = localStorage.getItem('token')
      // Add Authorization header if a token is provided
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
  
      const options = {
        method,
        headers,
      };
  
      if (method === 'POST' || method === 'PUT') {
        options.body = JSON.stringify(data); // For POST/PUT requests, add body
      }
  
      // Call the API
      const response = await fetch(baseurl+url, options);
  
      // Check for response status
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
  
      // Parse the JSON response
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error; // Rethrow the error to handle it in the calling component
    }
  };
  