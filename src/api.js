// src/api.js
const apiUrl = process.env.REACT_APP_API_URL;

// Generic function for GET requests
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Other API functions can be defined here, e.g., for POST, PUT, DELETE

