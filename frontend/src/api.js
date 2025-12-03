import axios from 'axios';

// URL de base du backend
const API_URL = "http://localhost:5000/api";

// ===== AUTH =====
export const login = (email, password) => {
    return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const register = (name, email, password) => {
    return axios.post(`${API_URL}/auth/register`, { name, email, password });
};

// ===== PAIEMENTS =====
export const verifyPayment = (paymentData) => {
    return axios.post(`${API_URL}/payments/verify`, paymentData);
};

// ===== YOUTUBE =====
export const getYoutubeData = () => {
    return axios.get(`${API_URL}/youtube`);
};

// ===== INSTAGRAM =====
export const getInstagramData = () => {
    return axios.get(`${API_URL}/instagram`);
};

// ===== TWITTER =====
export const getTwitterData = () => {
    return axios.get(`${API_URL}/twitter`);
};

// ===== SUBSCRIPTIONS =====
export const getSubscriptions = () => {
    return axios.get(`${API_URL}/subscriptions`);
};

export const createSubscription = (subData) => {
    return axios.post(`${API_URL}/subscriptions`, subData);
};
