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
    const [schedules, setSchedules] = useState([]);
    const [schedulesByDate, setSchedulesByDate] = useState([]);
    const [schedule, setSchedule] = useState({});



    /**
     * private methods
     */
    const { token } = useContext(UserContext);
    const config = () => ({ headers: { Authorization: `Bearer ${token()}` } });

    const addAndSortSchedules = sch => schedulesByDate
        .slice(0) //copy array
        .concat(sch) //push alternative
        .sort((a, b) => { //reorder
            if(a.name < b.name) return - 1;
            else if(a.name > b.name) return 1;
            else return 0;
        });



    /**
     * public methods
     */
    const getSchedules = async () => {
        setLoading(true);
        try{
            const { data } = await axios.get('/api/schedules', config());
            setSchedules(data.success);
        }catch(error){
            setError(error);
        }finally {
            setLoading(false);
        }
    }


    const getSchedulesByDate = async date => {
        if(schedules.length){
            setSchedulesByDate(schedules.filter(sch => sch.date === date).sort((a, b) => {
                if(a.name < b.name) return - 1;
                else if(a.name > b.name) return 1;
                else return 0;
            }));
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
        let ok = true;

        try {
            const { data } = await axios.post(`/api/schedules`, schedule, config());
            setSchedules([]);
            console.log(data);
            setSchedulesByDate(addAndSortSchedules(data.success));
        }catch(error) {
            setError(error);
            ok = false;
            console.error('Error schedule', error);
        }finally {
            setLoading(false);
        }

        return true;
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