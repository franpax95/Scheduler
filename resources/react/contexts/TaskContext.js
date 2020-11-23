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

    const swapTasks = (startIndex, endIndex) => {
        const newTasks = Array.from(tasks);
        const [removed] = newTasks.splice(startIndex, 1);
        newTasks.splice(endIndex, 0, removed);
        newTasks[startIndex] = { ...newTasks[startIndex], order: startIndex };
        newTasks[endIndex] = { ...newTasks[endIndex], order: endIndex };

        return newTasks;
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


    // insert a task in a new position and update the rest of them
    const reorderTasks = async (order, newOrder) => {
        const oldTasks = Array.from(tasks);

        console.log(newOrder);
        
        setLoading(true);
        try {
            //setTasks(incrementTasks(order, newOrder));
            const task_id = tasks[order].id;


            await axios.post(`/api/tasks/reorder/${scheduleId}`, { 
                task_id, 
                order: newOrder 
            }, config());

            const { data: { success: updatedTasks } } = await axios.get(`/api/tasks/${scheduleId}`, config());
            setTasks(updatedTasks);

            setToastSuccess('Tasks reorder successfully');
        }catch(error) {
            setError(error);
            setTasks(oldTasks);
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
        getTasks, submitTask, deleteTask, changeSchedule, changeTask, reorderTasks, addTask, resetToasts
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };