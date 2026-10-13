import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type Props = {}

export default function MainPage({}: Props) {
    const navigate = useNavigate(); 
    const { user, logout } = useAuth();
    const handleLogout = () => { 
        logout(); 
        navigate('/login'); 
    }; 
    
    return ( 
        <div style={styles.container}> 
            <h1>Панель управления</h1> 
            <p>Добро пожаловать, <strong>{user?.user.userName} {user?.user.firstName} {user?.user.lastName}</strong>!</p> 
            <p>Это защищенная страница. Вы успешно прошли аутентификацию.</p> 
            <button onClick={handleLogout} style={styles.button}> Выйти </button> 
        </div> 
    ); 
} const styles = { 
    container: { 
        maxWidth: '600px', 
        margin: '50px auto', 
        padding: '20px', 
        textAlign: 'center' 
    }, 
    button: { 
        padding: '10px 20px', 
        backgroundColor: '#dc3545', 
        color: 'white', 
        border: 'none', 
        cursor: 'pointer', 
        marginTop: '20px' 
    } 
};