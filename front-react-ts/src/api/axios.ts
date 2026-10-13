import axios from 'axios';
import type { AuthResponse, AuthTokens } from '../types/auth-types';

const api = axios.create({ 
    baseURL: 'http://localhost:8080/api', 
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
}); 

let isRefreshing = false; 
let refreshSubscribers: Array<(token: string) => void> = []; 

const subscribeTokenRefresh = (cb: (token: string) => void) => { 
    refreshSubscribers.push(cb); 
}; 

const onRefreshed = (newToken: string) => { 
    refreshSubscribers.map((cb) => cb(newToken));
    refreshSubscribers = []; 
}; 

// Request Interceptor 
api.interceptors.request.use( 
    (config) => { 
        const userDataStr = localStorage.getItem('user'); 
        if (userDataStr) { 
            const userData = JSON.parse(userDataStr) as AuthTokens; 
            if (userData.accessToken) { 
                config.headers['Authorization'] = `Bearer ${userData.accessToken}`; 
            } 
        } 
        return config; 
    }, 
    
    (error) => Promise.reject(error) 
); 

// Response Interceptor 
api.interceptors.response.use( 
    (response) => response, 
    async (error) => { 
        const originalRequest = error.config; 
        // @ts-ignore: Динамическое добавление флага повтора 
        if (error.response?.status === 401 && !originalRequest._retry) { 
            if (!isRefreshing) { 
                isRefreshing = true; 
                try { 
                    const userDataStr = localStorage.getItem('user'); 
                    if (!userDataStr) throw new Error('No user data'); 
                    const userData = JSON.parse(userDataStr) as AuthTokens; 
                    const response = await axios.post<AuthResponse>('/auth/refresh-token', 
                        { },
                        {withCredentials: true}
                    ); 
                    const tokens = response.data; 
                    localStorage.setItem('user', JSON.stringify({ ...userData, ...tokens })); 
                    onRefreshed(tokens.accessToken); 
                    originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`; 
                    originalRequest._retry = true; 
                    return api(originalRequest); 
                } catch (err) { 
                    window.location.href = '/login'; 
                    return Promise.reject(err); 
                } finally { 
                    isRefreshing = false; 
                } 
            } else { 
                return new Promise<void>(
                    (resolve) => { 
                        subscribeTokenRefresh((token) => { 
                            originalRequest.headers['Authorization'] = `Bearer ${token}`; 
                            resolve();
                        }); 
                    }
                )
                .then(() => api(originalRequest)); 
            } 
        } 
        return Promise.reject(error); 
    } 
); 

export default api;