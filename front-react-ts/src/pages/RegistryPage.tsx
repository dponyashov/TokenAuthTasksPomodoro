import { useState, type Dispatch, type SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

type Props = {}

export default function RegistryPage({}: Props) {

    const navigate = useNavigate(); 
    const { registry } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' }); 
    const [error, setError] = useState(''); 
    const [submitting, setSubmitting] = useState(false);
    
    const handleChange = (e) => { 
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); 
    };

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        await registry(form.email, form.password, setError, setSubmitting); 
        // Если ошибки нет (очищена внутри registry), переходим дальше 
        if (!error) { 
            navigate('/'); 
        } 
    };


    return (
        <div style={styles.container}> 
            <h2>Регистрация</h2> 
            {error && <p style={styles.error}>{error}</p>} 
            {/* <form onSubmit={handleSubmit}>  */}
                <input type="text" 
                    name="email" 
                    placeholder="Email" required value={form.email} 
                    onChange={handleChange} disabled={submitting} 
                    style={styles.input}
                /> 
                <input type="password" name="password" 
                    placeholder="Пароль" required minLength="3" value={form.password} 
                    onChange={handleChange} disabled={submitting} 
                    style={styles.input} 
                />
                <button onClick={handleSubmit} style={styles.button} >Регистрация</button>
                {/* <button type="submit" disabled={submitting} style={styles.button}> 
                    {submitting ? 'Загрузка...' : 'Зарегистрироваться'} 
                </button>  */}
            {/* </form>  */}
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
