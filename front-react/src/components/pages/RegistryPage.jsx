import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function RegistryPage() {

  const [loginTxt, setLogin] = useState('');
  const [passw, setPassw] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [localError, setError] = useState('');

  const {registry, error, loading} = useAuth();

  const navigate = useNavigate();

  console.log("RegistryPage.error", error);


  useEffect(()=>{
    if(error && error.length > 0){
      setError(error);
    }
    }, [error, loading]
  );

  const onClickHandle = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if(loginTxt.trim() === '') {
      setError('Логин должен быть заполнен');
      return;
    }

    if(passw.trim() === '') {
      setError('Пароль не должен быть пустым');
      return;
    }

    const isSuccess = await registry(loginTxt, passw, firstName, lastName);

    if( !isSuccess){
      return;
    }

    setLogin('');
    setPassw('');
    setLastName('');
    setLastName('');
    navigate('/login', {replace: true});
  }

  return (
    <div style={styles.container}>
      <h3>Регистрация</h3>
      {localError && <div style={styles.error}>ОШИБКА: {localError}</div>}
      <div>
        <input style={styles.input}
          type='email' placeholder="Email"
          required  value={loginTxt} onChange={(e)=>setLogin(e.target.value)} />
        <input style={styles.input}
          type='password' placeholder="Пароль" required minLength="3"
          value={passw} onChange={(e)=>setPassw(e.target.value)} />
        <input style={styles.input}
          type='text' placeholder="Имя"
          value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
        <input style={styles.input}
          type='text' placeholder="Фамилия"
          value={lastName} onChange={(e)=>setLastName(e.target.value)} />
        <button style={styles.button} disabled={loading}
          onClick={onClickHandle}>{loading ? 'Загрузка...' : 'Регистрация'}</button>
      </div>
      <p> Уже есть аккаунт?{' '} <Link to="/login" style={styles.link}>Войдите здесь</Link> </p>
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
        backgroundColor: '#007bff', 
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
};