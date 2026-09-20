import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

function Tasks() {
    const { tasks, loading, error, addTask, deleteTask, changeTask } = useTasks();
        
    const [taskText, setText] = useState('');

    const addTaskHandle = () => {

        const newTask = {
            text: taskText,
            completed: false
        }

        addTask(newTask);
        setText('');
    }

    const toggleTaskCompleted = (id) => {
        const task = tasks.filter(t => t.id === id)[0];
        if( task ){
            const changedTask = {
                        ...task,
                        completed: !task.completed
                    }
            changeTask(changedTask);
        }
    }

    const deleteTaskHandle = (id) => {
        const task = tasks.filter(t => t.id === id)[0];
        if( task ){
            deleteTask(id);
        }
    }

    // Обработка нажатия Enter в поле ввода 
    const handleKeyDown = (e) => { 
        if (e.key === 'Enter') { 
            addTaskHandle(); 
        } 
    };

    return (
        <div style={styles.container}> 
            <h1 style={styles.title}>Список задач</h1>
            {loading && <p>Загрузка...</p>}
            <div style={styles.inputContainer}> 
                <input type="text" value={taskText} onChange={(e) => setText(e.target.value)} 
                placeholder="Введите новую задачу..." onKeyDown={handleKeyDown} style={styles.input} /> 
                <button onClick={addTaskHandle} style={styles.addButton}> Добавить </button> 
            </div> 
            <ul style={styles.list}> {
                tasks.map((task) => ( 
                    <li key={task.id} style={styles.taskItem}> 
                        <div style={styles.taskContent}> 
                            <input type="checkbox" checked={task.completed} 
                                onChange={() => toggleTaskCompleted(task.id)} style={styles.checkbox} /> 
                            <span style={task.completed ? styles.completedText : styles.taskText}> {task.text} </span> 
                        </div> 
                        <button onClick={() => deleteTaskHandle(task.id)} style={styles.deleteButton} 
                            onMouseOver={(e) => Object.assign(e.target.style, styles.deleteButtonHover)} 
                            onMouseOut={(e) => e.target.style.opacity = '0.7'} > &times; 
                        </button> 
                    </li> 
                ))
            } 
            {/* Подсказка, если список пуст */} 
            {tasks.length === 0 && ( 
                <p style={{ color: '#777', textAlign: 'center' }}> 
                    Начните добавлять задачи, чтобы увидеть их здесь 
                </p> )} 
        </ul> 
    </div>
    )
}

const styles = { 
    container: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        height: '100vh', 
        fontFamily: 'Arial, sans-serif', 
        backgroundColor: '#f4f4f9', 
        paddingTop: '40px', 
        boxSizing: 'border-box', 
    }, 
    title: { 
        marginBottom: '20px', 
        color: '#333', 
        fontSize: '2rem', 
    }, 
    inputContainer: { 
        display: 'flex', 
        gap: '10px', 
        width: '100%', 
        maxWidth: '400px', 
        marginBottom: '20px', 
    }, 
    input: { 
        flexGrow: 1, 
        padding: '12px 15px', 
        fontSize: '16px', 
        borderRadius: '6px', 
        border: '1px solid #ccc', 
    }, 
    addButton: { 
        padding: '0 20px', 
        fontSize: '16px', 
        cursor: 'pointer', 
        borderRadius: '6px', 
        border: 'none', 
        backgroundColor: '#007bff', 
        color: 'white', 
        transition: 'background-color 0.2s', 
    }, 
    list: { 
        listStyle: 'none', 
        padding: 0, 
        margin: 0, 
        width: '100%', 
        maxWidth: '400px', 
    }, 
    taskItem: { 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '12px 15px', 
        backgroundColor: 'white', 
        borderRadius: '6px', 
        marginBottom: '10px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
    }, 
    taskContent: { 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        flexGrow: 1, 
    }, 
    checkbox: { 
        width: '18px', 
        height: '18px', 
        cursor: 'pointer', 
    }, 
    taskText: { 
        fontSize: '16px', 
    }, 
    completedText: { 
        fontSize: '16px', 
        textDecoration: 'line-through', 
        color: '#aaa', 
    }, 
    deleteButton: { 
        background: 'transparent', 
        border: 'none', 
        cursor: 'pointer', 
        color: '#dc3545', // Красный цвет как у ошибок/удаления 
        fontSize: '18px', 
        lineHeight: 1, padding: 0, width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7, transition: 'opacity 0.2s', }, deleteButtonHover: { opacity: 1, }, };

export default Tasks