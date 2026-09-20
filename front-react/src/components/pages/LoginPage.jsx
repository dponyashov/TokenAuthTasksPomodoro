import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {

  const [loginTxt, setLogin] = useState('');
  const [passw, setPassw] = useState('');
  const [localError, setError] = useState('');

  const {login, error, loading} = useAuth();

  const navigate = useNavigate();

  useEffect (()=> {
    if(error && error.length > 0) {
      setError(error);
    }
  }, [error, loading]);

  const onClickHandle = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    setError('');

    if(loginTxt.trim() === '') {
      setError('Логин должен быть заполнен');
      return;
    }

    if(passw.trim() === '') {
      setError('Пароль не должен быть пустым');
      return;
    }

    const isSuccess = await login(loginTxt, passw);

    if(!isSuccess){
      return;
    }

    setLogin('');
    setPassw('');
    navigate('/');
  }

  return (
    <div style={styles.container}>
      <h3>Вход</h3>
      {localError && <div style={styles.error}>ОШИБКА: {localError}</div>}
      <div>
        <input type='text' style={styles.input}
          value={loginTxt} onChange={(e)=>setLogin(e.target.value)} />
        <input type='password' style={styles.input}
        value={passw} onChange={(e)=>setPassw(e.target.value)} />
        
        <button style={styles.button} disabled={loading} 
          onClick={onClickHandle}
          >{loading ? 'Загрузка...' : 'Вход'}</button>
      </div>
      <p> Нет аккаунта?{' '} <Link to="/registry" style={styles.link}>Зарегистрируйтесь</Link> </p> 
    </div>
  )
}

const styles = { 
    container: { 
        maxWidth: '400px', 
        margin: '50px auto', 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '8px' 
    }, 
    input: { 
        width: '100%', 
        padding: '10px', 
        marginBottom: '10px', 
        boxSizing: 'border-box' 
    }, 
    button: { 
        width: '100%', 
        padding: '10px', 
        backgroundColor: '#28a745', 
        color: 'white', 
        border: 'none', 
        cursor: 'pointer' 
    }, 
    error: { 
        color: 'red', 
        marginBottom: '15px' 
    }, 
    link: { 
        color: '#007bff', 
        textDecoration: 'none' 
    } 
}