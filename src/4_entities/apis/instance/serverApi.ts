import axios from 'axios';
const baseURL = `${import.meta.env.VITE_SERVER_API}/api`;

export const serverApi = axios.create({
  baseURL,
});
