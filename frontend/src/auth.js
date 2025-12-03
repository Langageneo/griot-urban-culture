import axios from 'axios';

// URL de base de ton backend
const API_URL = "http://localhost:5000/api";

// Auth
export const login = (email, password) => {
    return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const register = (email, password, name) => {
    return axios.post(`${API_URL}/auth/register`, { email, password, name });
};

// Paiements
export const verifyPayment = (paymentData) => {
    return axios.post(`${API_URL}/payments/verify`, paymentData);
};
