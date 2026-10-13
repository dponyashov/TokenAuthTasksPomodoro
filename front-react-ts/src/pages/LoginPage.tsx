import { useState, type ChangeEvent, type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type Props = {}

export default function LoginPage({}: Props) {
    const navigate = useNavigate(); 
    const { login } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' }); 
    const [error, setError] = useState(''); 
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); 
    };

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        // e.stopPropagation();
        e.preventDefault();

        await login(form.email, form.password, setError, setSubmitting);

        if (!error) {
            setForm({ email: '', password: '' });
            navigate('/');
        }
    }; 
    return ( 
        <div style={styles.container}> 
            <h2>Вход</h2> 
            {error && <p style={styles.error}>{error}</p>}
            <div>
                <input type="text" 
                name="email" placeholder="Email" required value={form.email} 
                onChange={handleChange} disabled={submitting} style={styles.input} /> 
                <input type="password" name="password" placeholder="Пароль" required value={form.password} 
                onChange={handleChange} disabled={submitting} style={styles.input} />
                <button disabled={submitting} style={styles.button}
                    onClick={handleSubmit} >
                    {submitting ? 'Проверка...' : 'Войти'} 
                </button> 
            </div> 
            <p> Нет аккаунта?{' '} <Link to="/registry" style={styles.link}>Зарегистрируйтесь</Link> </p> 
        </div> 
    ); 
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
};