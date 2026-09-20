import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ redirectPath = '/login', children }) => {

    const {auth, loading} = useAuth();

    if (loading) return <div>Авторизация...</div>

    if (!auth?.accessToken || auth?.accessToken.trim() === '') {
        return <Navigate to={redirectPath}/>
    }

    return children;
};

export default PrivateRoute