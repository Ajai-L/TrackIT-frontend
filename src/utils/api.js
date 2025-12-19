// API utility for making authenticated requests
const API_BASE = 'https://trackit-backend-r4kw.onrender.com';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  return response;
};

export const apiGet = async (endpoint) => {
  try {
    const response = await apiCall(endpoint, {
      method: 'GET'
    });
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      const errorData = await response.json();
      return errorData;
    }
    
    return response.json();
  } catch (error) {
    console.error('apiGet error:', error);
    return {
      status: 'fail',
      message: error.message
    };
  }
};

export const apiPost = async (endpoint, data) => {
  const response = await apiCall(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response.json();
};

export const apiPut = async (endpoint, data) => {
  try {
    const response = await apiCall(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      const errorData = await response.json();
      return errorData;
    }
    
    return response.json();
  } catch (error) {
    console.error('apiPut error:', error);
    return {
      status: 'fail',
      message: error.message
    };
  }
};

export const apiDelete = async (endpoint) => {
  const response = await apiCall(endpoint, {
    method: 'DELETE'
  });
  return response.json();
};
