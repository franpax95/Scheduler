import React, { useState } from 'react';
import axios from 'axios';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const token = () => sessionStorage.getItem('token');

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

    const value = {
        schedules, loading, error,
        getSchedules
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };