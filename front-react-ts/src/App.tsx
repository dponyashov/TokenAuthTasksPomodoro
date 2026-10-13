import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegistryPage from './pages/RegistryPage'
import PrivatePage from './pages/PrivatePage'
import MainPage from './pages/MainPage'
import { AuthProvider } from './context/AuthContext'

function App() {
    return (
        <AuthProvider>
          <Router>
            <Routes>
              <Route path='/login' element={<LoginPage />}/>
              <Route path='/registry' element={<RegistryPage />}/>
              <Route path='/' element={
                <PrivatePage>
                  <MainPage />
                </PrivatePage>
              }/>
              <Route path='*' element={<Navigate to="/login" replace />}/>
            </Routes>
          </Router>
        </AuthProvider>
    )
}

export default App
