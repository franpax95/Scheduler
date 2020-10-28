import React, { useState } from 'react';
import axios from 'axios';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    /**
     * States
     */
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [schedulesByDate, setSchedulesByDate] = useState([]);
    const [schedule, setSchedule] = useState({});



    /**
     * private methods
     */
    const token = () => sessionStorage.getItem('token');
    const config = () => ({ headers: { Authorization: `Bearer ${token()}` } });



    /**
     * public methods
     */
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


    const getSchedulesByDate = async date => {
        //Puede estar mal, ya que schedules puede estar desactualizado
        if(schedules.length){
            setDateSchedules(schedules.filter(sch => sch.date === date));
        }
        
        else{
            setLoading(true);
            try {
                const { data } = await axios.get(`/api/schedules/date/${date}`, config());
                setSchedulesByDate(data.success);
            }catch(error) {
                setError(error);
                console.error('Error schedule', error);
            }finally {
                setLoading(false);
            }
        }
    }


    const getSchedule = async id => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/schedules/${id}`, config());
            setSchedule(data.success);
        }catch(error) {
            setError(error);
            console.error('Error schedule', error);
        }finally {
            setLoading(false);
        }
    }


    const addSchedule = async schedule => {
        setLoading(true);
        try {
            await axios.post(`/api/schedules`, schedule, config());
            setSchedules([]);
            setSchedulesByDate([]);
        }catch(error) {
            setError(error);
            console.error('Error schedule', error);
        }finally {
            setLoading(false);
        }
    }


    const editSchedule = async (schedule, id) => {
        setLoading(true);
        try {
            await axios.put(`/api/schedules/${id}`, schedule, config());
            setSchedules([]);
            setSchedulesByDate([]);
            setSchedule({});
        }catch(error) {
            setError(error);
            console.error('Error schedule', error);
        }finally {
            setLoading(false);
        }
    }


    const deleteSchedule = async id => {
        setLoading(true);
        try {
            await axios.delete(`/api/schedules/${id}`, config());
            setSchedules([]);
            setSchedulesByDate([]);
        }catch(error) {
            setError(error);
            console.error('Error schedule', error);
        }finally {
            setLoading(false);
        }
    }


    /**
     * exports value & provider
     */
    const value = {
        loading, error, schedules, schedulesByDate, schedule,
        getSchedules, getSchedulesByDate, getSchedule, addSchedule, editSchedule, deleteSchedule
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };