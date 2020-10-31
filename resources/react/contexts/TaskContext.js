import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Context as UserContext } from './UserContext';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    /**
     * States
     */
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [tasks, setTasks] = useState([]);
    const [scheduleId, setScheduleId] = useState(-1);

    const [toastSuccess, setToastSuccess] = useState('');
    const [toastError, setToastError] = useState('');



    /**
     * private methods
     */
    const { token } = useContext(UserContext);
    const config = () => ({ headers: { Authorization: `Bearer ${token()}` } });

    //return new array with tasks since position with order + 1
    const incrementOrderSincePosition = pos => {
        const tasksIncremented = new Array();
        tasks.slice(pos, tasks.length).map(task => { tasksIncremented.push({ ...task, order: task.order + 1 }); });
        return tasksIncremented;
    }



    /**
     * public methods
     */

    // get tasks by schedule id
    const getTasks = async () => {
        setLoading(true);
        try {
            const { data: { success: tasks } } = await axios.get(`/api/tasks/${scheduleId}`, config());
            setTasks(tasks);
        }catch(error) {
            setError(error);
            setToastError('An error occurred loading tasks. Try again later...');
            console.error('Error object', error);
        }finally {
            setLoading(false);
        }
    }


    // insert/upload task
    const submitTask = async task => {
        setLoading(true);
        try {
            // edit task
            if(task.id){
                await axios.post(`/api/tasks/${task.id}`, task, config());
    
                const { data: { success: tasks } } = await axios.get(`/api/tasks/${scheduleId}`, config());
                setTasks(tasks);
                setToastSuccess('Task upload successfully');
            }
            
            // add task
            else {
                await axios.post(`/api/tasks`, { ...task, schedule_id: scheduleId }, config());

                const { data: { success: tasks } } = await axios.get(`/api/tasks/${scheduleId}`, config());
                setTasks(tasks);
                setToastSuccess('Task created successfully');
            }
        }catch(error) {
            setError(error);
            setToastError('An error occurred updating the task. Try again later...');
            setTasks([]);
            console.error('Error object', error);
        }finally {
            setLoading(false);
        }
    }


    // delete task in database
    const deleteTask = async (task_id) => {
        setLoading(true);
        try {
            await axios.delete(`/api/tasks/${task_id}`, config());

            //Empezamos probando a actualizar todas las tasks
            const { data: { success: tasks } } = await axios.get(`/api/tasks/${scheduleId}`, config());
            setTasks(tasks);
            //Sino, actualizar directamente el estado
            // setTasks([ ...schedule.tasks.slice(0, order), task, ...schedule.tasks.slice(order + 1, tasks.length)]);
            //También es útil por temas de performance, supongo. Es una petición menos

            setToastSuccess('Task deleted successfully');
        }catch(error) {
            setError(error),
            setToastError('An error occurred updating the task. Try again later...');
            console.error('Error object', error);
        }finally {
            setLoading(false);
        }
    }


    // set schedule_id
    const changeSchedule = schedule_id => { setScheduleId(schedule_id) }


    // change 'name' or 'completed' attributes in the state
    const changeTask = async task => {
        const { order } = task;
        setTasks([ ...tasks.slice(0, order), task, ...tasks.slice(order + 1, tasks.length)]);
    }


    // swap 2 task order
    const swapTasks = async (order1, order2) => {
        setLoading(true);
        try {
            // TODO Quizás es más correcto preparar una única petición. Sería 1 petición en lugar de 2 y me aseguro que no quedan orders repetidos
            await axios.post(`/api/tasks/${tasks[order1].id}`, { ...tasks[order1], order: order2 }, config());
            await axios.post(`/api/tasks/${tasks[order2].id}`, { ...tasks[order2], order: order1 }, config());
    
            //Empezamos probando a actualizar todas las tasks
            const { data } = await axios.get(`/api/tasks/${scheduleId}`, config());
            setTasks(data.success);
            //Sino, actualizar directamente el estado
            // setTasks([
            //     ...tasks.slice(0, order1),
            //     { ... tasks[order2], order: order2 },
            //     ...tasks.slice(order1 + 1, order2),
            //     { ...tasks[order1], order: order1 },
            //     ...tasks.slice(order2 + 1, tasks.length)
            // ]);
            //También es útil por temas de performance, supongo. Es una petición menos

            setToastSuccess('Tasks reorder successfully');
        }catch(error) {
            setError(error),
            setToastError('An error occurred reording the tasks. Try again later...');
            console.error('Error object', error);
        }finally {
            setLoading(false);
        }
    }


    // add empty task in the first or the last position (only in front, not in database)
    // combine with submitTask()
    const addTask = order => {
        const newTask = { name: '', completed: 0, order, schedule_id: scheduleId };
        if(order === 0) 
            setTasks([ newTask, ...incrementOrderSincePosition(order) ]);
        else if(order === tasks.length) 
            setTasks([ ...tasks, newTask ]);
    }

    
    //reset toasts
    const resetToasts = () => {
        if(toastSuccess.length) setToastSuccess('');
        if(toastError.length)   setToastError('');
    }



    /**
     * exports value & provider
     */
    const value = {
        loading, error, tasks, toastSuccess, toastError, scheduleId,
        getTasks, submitTask, deleteTask, changeSchedule, changeTask, swapTasks, addTask, resetToasts
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };