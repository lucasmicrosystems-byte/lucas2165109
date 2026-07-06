import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname.includes('netlify.app') 
    ? 'https://agriverse-smart-farming.onrender.com' 
    : 'http://localhost:8000');

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authService = {
  login: (email, password) => 
    api.post('/api/auth/login', { email, password }),
  
  register: (farmerName, email, location, language, password) => 
    api.post('/api/auth/register', { 
      farmer_name: farmerName, 
      email, 
      location, 
      language, 
      password 
    }),
};

export const weatherService = {
  getWeather: (city) => 
    api.get(`/api/weather/${city}`),
};

export const cropService = {
  getCrops: (search = '', season = '') => 
    api.get('/api/crops', { params: { search, season } }),
};

export const taskService = {
  getTasks: (userId) => 
    api.get(`/api/tasks/${userId}`),
  
  createTask: (userId, taskName, dueDate) => 
    api.post(`/api/tasks/${userId}`, { 
      task_name: taskName, 
      due_date: dueDate, 
      completed_status: false 
    }),
  
  updateTask: (taskId, taskData) => 
    api.put(`/api/tasks/${taskId}`, taskData),
  
  deleteTask: (taskId) => 
    api.delete(`/api/tasks/${taskId}`),
};

export const marketplaceService = {
  getProducts: (search = '', category = '') => 
    api.get('/api/marketplace', { params: { search, category } }),
  
  createProduct: (productData) => 
    api.post('/api/marketplace', productData),
};

export const searchService = {
  globalSearch: (query) => 
    api.get('/api/search', { params: { query } }),
};

export const scannerService = {
  uploadLeaf: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/scanner/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const dashboardService = {
  getSummary: (userId) => 
    api.get(`/api/dashboard/${userId}`),
};

export default api;
