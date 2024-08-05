import axios from 'axios';

const API_URL = 'https://klevv-server.vercel.app/api/v1/form'; // Ganti dengan URL backend Anda

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
