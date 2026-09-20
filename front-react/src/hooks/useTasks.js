import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const api = useAxios();

    const addTask = async (task)=> {        
        try {
            setLoading(true);
            const response = await api.post('/tasks', 
                {
                    ...task
                },
                {
                    withCredentials: true,
                    // headers: {
                    //     'Authorization': `Bearer ${auth?.accessToken}`
                    // }
                }
            );
            // setTasks([...tasks, response.data]);
            fetchData();
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteTask = async (id)=> {        
        try {
            setLoading(true);
            const response = await api.delete(`/tasks/${id}`, 
                {
                    withCredentials: true,
                    // headers: {
                    //     'Authorization': `Bearer ${auth?.accessToken}`
                    // }
                }
            );
            fetchData();
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const changeTask = async (task)=> {
        try {
            setLoading(true);
            const response = await api.put(`/tasks/${task.id}`,
                {
                    ...task
                },
                {
                    withCredentials: true,
                    // headers: {
                    //     'Authorization': `Bearer ${auth?.accessToken}`
                    // }
                }
            );
            const changedTask = response.data;

            const newTasks = tasks.map(t => 
                t.id === changedTask.id ? changedTask : t
            );
            setTasks(newTasks);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchData = async () => {
        console.log('useTasks.fetchData')   
        try {
            setLoading(true);
            const response = await api.get('/tasks', 
                {
                    withCredentials: true,
                    // headers: {
                    //     'Authorization': `Bearer ${auth?.accessToken}`
                    // }
                }
            );
            setTasks(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { tasks, loading, error, addTask, deleteTask, changeTask };
}