import React, { useState } from 'react';
import axios from 'axios';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    const [schedules, setSchedules] = useState([]);
    const [dateSchedules, setDateSchedules] = useState([]);
    const [schedule, setSchedule] = useState({});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const token = () => sessionStorage.getItem('token');
    const config = () => ({ headers: { Authorization: `Bearer ${token()}` } });

    const getSchedules = async () => {
        setLoading(true);

        try{
            const { data } = await axios.get('/api/schedules', config());
            setSchedules(data.success);
            setLoading(false);
        }catch(error){
            setError(error);
        }
    }

    const getDateSchedules = async date => {
        if(schedules.length){
            setDateSchedules(schedules.filter(sch => sch.date === date));
        }else{
            setLoading(true);

            try{
                const { data } = await axios.get(`/api/schedules/date/${date}`, config());
                console.log(data.success);
                setDateSchedules(data.success);
                setLoading(false);
            }catch(error){
                setError(error);
            }
        }
    }

    const getSchedule = async id => {
        setLoading(true);

        try{
            const { data } = await axios.get(`/api/schedules/${id}`, config());
            setSchedule(data.success);
            setLoading(false);
        }catch(error){
            setError(error);
        }
    }

    const changeTask = ({ id, name, completed, order }) => {
        const index = schedule.tasks.findIndex(task => task.order === order);
        setSchedule({
            ...schedule,
            tasks: [
                ...schedule.tasks.slice(0, index),
                { id, name, completed, order },
                ...schedule.tasks.slice(index + 1, schedule.tasks.length)
            ]
        });
    }

    const addTask = order => {
        if(order === schedule.tasks.length){
            setSchedule({
                ...schedule,
                tasks: [
                    ...schedule.tasks,
                    { name: '', completed: false, order: schedule.tasks.length, schedule_id: schedule.id }
                ]
            });
        }else{
            setSchedule({
                ...schedule,
                tasks: [
                    { name: '', completed: false, order: 0, schedule_id: schedule.id },
                    ...taskOrderIncrement(0)
                ]
            });
        }
    }

    const deleteTask = order => {
        const index = schedule.tasks.findIndex(task => task.order === order);
        setSchedule({
            ...schedule,
            tasks: [
                ...schedule.tasks.slice(0, index),
                ...schedule.tasks.slice(index + 1, schedule.tasks.length)
            ]
        });
    }

    const reorderTasks = (order1, order2) => {
        setSchedule({
            ...schedule,
            tasks: [
                ...schedule.tasks.slice(0, order1),
                { ... schedule.tasks[order2], order: order2 },
                ...schedule.tasks.slice(order1 + 1, order2),
                { ...schedule.tasks[order1], order: order1 },
                ...schedule.tasks.slice(order2 + 1, schedule.tasks.length)
            ]
        });
    }

    const submitTask = async task => {
        setLoading(true);
        
        try {
            if(!task.id){
                const { data } = await axios.post(`/api/tasks`, { ...task, schedule_id: schedule.id }, config());
                setSchedule({
                    ...schedule,
                    tasks: [
                        ...schedule.tasks.slice(0, task.order),
                        data.success,
                        ...schedule.tasks.slice(task.order + 1, schedule.tasks.length)
                    ]
                });
                setLoading(false);
            }

        }catch(error){
            console.error(error);
            setError(error);
        }
    }


    /**
     * Subfunctions
     */
    const taskOrderIncrement = order => {
        const tasks = new Array(schedule.tasks.length);
        schedule.tasks.map((task, key) => { 
            tasks[key] = (task.order >= order) ? { ...task, order: task.order + 1 } : task;
        });
        return tasks;
    }

    /**
     * value & provider
     */
    const value = {
        schedules, dateSchedules, schedule, loading, error,
        getSchedules, getDateSchedules, getSchedule, changeTask, addTask,
        reorderTasks, deleteTask, submitTask
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };