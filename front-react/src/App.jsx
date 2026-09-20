import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage'
import PrivateRoute from './components/PrivateRoute';
import RegistryPage from './components/pages/RegistryPage';
import { AppConfig } from './config/AppCongig';
import { useEffect } from 'react';

function App() {

    useEffect(() => {
        // Логируем конфу при монтировании для проверки
        console.log(AppConfig.toString());
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <PrivateRoute redirectPath='/login'>
                      <MainPage />
                    </PrivateRoute>
                }/>
                <Route path='/login' Component={LoginPage} />
                <Route path='/registry' Component={RegistryPage} />
            </Routes>
        </BrowserRouter>    
    )
}

export default App
