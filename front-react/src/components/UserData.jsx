import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function UserData() {
    const {auth, loading, logout} = useAuth();
    const navigate = useNavigate();

    const logoutHandle = async () => {
        await logout();
        if(!loading){
            navigate("/login")
        }
    }

    return (
        <div style={styles.container}> 
            <h3>Данные пользователя</h3> 
            <p>Добро пожаловать, <strong>{auth?.user.firstName} {auth?.user.lastName}</strong>!</p> 
            {/* <p>Это защищенная страница. Вы успешно прошли аутентификацию.</p> */}
            <button onClick={logoutHandle} style={styles.button}> Выйти </button> 
        </div>
    )
}

const styles = { 
    container: { 
        maxWidth: '600px',
        height: '15vh',
        margin: '5px auto', 
        padding: '5px', 
        textAlign: 'center' 
    }, 
    button: { 
        padding: '10px 20px', 
        backgroundColor: '#dc3545', 
        color: 'white', 
        border: 'none', 
        cursor: 'pointer', 
        marginTop: '10px' 
    } 
};

export default UserData