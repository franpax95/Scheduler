import React, { useState } from 'react';
import axios from 'axios';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    const [schedules, setSchedules] = useState([]);
    const [dateSchedules, setDateSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const token = () => sessionStorage.getItem('token');
    const config = () => ({ headers: { Authorization: `Bearer ${token()}` } });

    const getSchedules = async () => {
        setLoading(true);

        try{
            const config = { headers: { Authorization: `Bearer ${token()}` } };
            const { data } = await axios.get('/api/schedules', config);

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
                setDateSchedules(data.success);
                setLoading(false);
            }catch(error){
                setError(error);
            }
        }
    }

    const value = {
        schedules, dateSchedules, loading, error,
        getSchedules, getDateSchedules
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };