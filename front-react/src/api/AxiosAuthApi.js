import axios from 'axios';
import { AppConfig } from '../config/AppCongig';

export const api = axios.create({
  baseURL: AppConfig.getApiUrl(), //'http://localhost:8080/api',
  withCredentials: true, // Обязательно для отправки HttpOnly Cookies
});

export const apiPublic = axios.create({
  baseURL: AppConfig.getApiUrl(), //'http://localhost:8080/api',
  withCredentials: true, // Обязательно для отправки HttpOnly Cookies
});

export default api;