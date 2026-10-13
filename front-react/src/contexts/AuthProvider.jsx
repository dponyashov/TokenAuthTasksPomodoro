import { createContext, useEffect, useState } from 'react';
import { api, apiPublic } from '../api/AxiosAuthApi';

const TOKEN_NAME = 'token';

export const AuthContext = createContext(null);

function AuthProvider({children}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [auth, setAuth] = useState(() => { return JSON.parse(sessionStorage.getItem(TOKEN_NAME)) || null });

    useEffect(()=> {
        if(auth){
            sessionStorage.setItem(TOKEN_NAME, JSON.stringify(auth));
        } else {
            sessionStorage.removeItem(TOKEN_NAME);
        }
    }, [auth]);

    const login = async (login, password) => {
        console.log("login");
        setLoading(true);
        setError('');
        try{
            const response = await apiPublic.post('/auth/login', 
                { email: login, password: password }, 
                { withCredentials: true });

            console.log(response.data);

            setAuth(response.data);
            return true;
        } catch (error) {
            setAuth(null);
            setError(error.message + ': "' + error.response?.data.message + '"');         
            console.log(`login error.response?.data  ${error.response?.data.message} `);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const refresh = async () => {
        console.log("refresh");
        setLoading(true);
        setError('');
        try {

            // Сервер сам прочитает Refresh Token из HttpOnly Cookie
            // const response = await axios.post('http://localhost:8080/api/auth/refresh', {}, { withCredentials: true });
            const response = await apiPublic.post('/auth/refresh', {}, { withCredentials: true });
            setAuth(response.data);
            return response.data;
        } catch (error) {
            setAuth(null);
            setError(error.message + ': "' + error.response?.data.message + '"');  
            console.log(`refresh error ${error.response?.data}`);
        } finally {
            setLoading(false);
        }
    }

    const registry = async (login, password, firstName, lastName) => {
        console.log("registry");
        setLoading(true);
        setError('');
        try{
            const response = await apiPublic.post('/auth/registry', 
                { 
                    email: login, 
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                }, 
                { withCredentials: true });
            setAuth(response.data);
            return true;
        } catch (error) {
            setError(error.message + ': "' + error.response?.data.message + '"');
            setAuth(null);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        console.log("logout");
        setLoading(true);
        setError('');
        try{
            await api.post('/auth/logout', {}, { withCredentials: true });
        } catch (error){
            setError(error.response?.data.message);
            console.log(`logout error ${error.response?.data?.message}`)
        } finally {
            setAuth(null);
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{auth, loading, error, login, refresh, registry, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider