import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

export default function PrivatePage({children}: Props) {
    const { user } = useAuth();
    
    // Если пользователя нет, отправляем на /login 
    // if (!user) { 
    //     return <Navigate to="/login" replace />; 
    // } 

    return children;
}