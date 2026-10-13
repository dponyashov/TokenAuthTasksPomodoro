import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthRequest, AuthResponse, AuthTokens } from "../types/auth-types";
import api from "../api/axios";

interface ContextProps { 
    user: AuthTokens | null; 
    loading: boolean; 
    login: ( 
        email: string, 
        password: string, 
        setError: (msg: string) => void, 
        setSubmitting: (s: boolean) => void 
    ) => Promise<void>; 
    registry: ( 
        email: string, 
        password: string, 
        setError: (msg: string) => void, 
        setSubmitting: (s: boolean) => void 
    ) => Promise<void>; 
    logout: () => void; 
} 

const AuthContext = createContext<ContextProps | undefined>(undefined); 

export function useAuth() { 
    const context = useContext(AuthContext); 
    if (!context) { 
        throw new Error('useAuth должкен быть использован в AuthProvider'); 
    } return context; 
} 

export function AuthProvider({ children }: { children: ReactNode }) { 
    const [user, setUser] = useState<AuthTokens | null>(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        const saved = localStorage.getItem('user'); 
        if (saved) { 
            setUser(JSON.parse(saved)); 
        } 
        setLoading(false); 
    }, []);
    
    const authAction = async ( 
        endpoint: string, 
        data: AuthRequest, 
        setError: (msg: string) => void, 
        setSubmitting: (s: boolean) => void 
    ): Promise<AuthResponse | null> => { 
        setSubmitting(true); 
        try {
            const res = await api.post<AuthResponse>(endpoint, data, { withCredentials: true });
            return res.data; 
        } catch (err: any) { 
            setError(err.message || 'Произошла ошибка'); //err.response?.data?.message
            return null; 
        } finally {
            setSubmitting(false); 
        }
    };

    const login = async (
        email: string, 
        password: string,
        setError: (msg: string) => void, 
        setSubmitting: (s: boolean) => void
    ) => {
        const data = await authAction('/auth/login', { userName: email, password: password }, setError, setSubmitting);
        if (data) { 
            const tokens: AuthTokens = { 
                user: data.user, accessToken: data.accessToken
            };
            // localStorage.setItem('user', JSON.stringify(tokens));
            setUser(tokens);
            setError('');
        } 
    }; 

    const registry = async (
        email: string, 
        password: string, 
        setError: (msg: string) => void, 
        setSubmitting: (s: boolean) => void
    ) => { 
        const data = await authAction('/auth/registry', { userName: email, password: password }, setError, setSubmitting); 
        if (data) {
            const tokens: AuthTokens = { 
                user: data.user, accessToken: data.accessToken 
            }; 
            localStorage.setItem('user', JSON.stringify(tokens)); 
            setUser(tokens); 
            setError(''); 
        }
    }; 
        
    const logout = () => { 
        localStorage.removeItem('user'); 
        setUser(null); 
    }; 
    
    return ( 
        <AuthContext.Provider value={{ user, login, registry, logout, loading }}> 
            {children} 
        </AuthContext.Provider>
    ); 
}