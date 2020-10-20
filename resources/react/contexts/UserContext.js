import React, { useState } from 'react';
import axios from 'axios';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children, _user = {} }) => {
    const [isAuth, setIsAuth] = useState(() => window.sessionStorage.getItem('token'));
    const [user, setUser] = useState({ ..._user });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const login = async ({ email, password }) => {
        setLoading(true);

        try{
            const response = await axios.post('/api/login', { email, password });
            const { user, token } = response.data.success;

            window.sessionStorage.setItem('token', token);

            setUser(user);
            setIsAuth(true);
            setLoading(false);
        }catch(error){
            setError(error);
        }
    }

    const register = async ({ name, email, password, password_verification }) => {
        setLoading(true);

        try{
            const response = await axios.post('/api/register', { name, email, password, password_verification });
            const { user, token } = response.data.success;

            window.sessionStorage.setItem('token', token);
            
            setUser(user);
            setIsAuth(true);
            setLoading(false);
        }catch(error){
            setError(error);
        }
    }

    const logout = async () => {
        try{
            await axios.post('/api/logout');
            window.sessionStorage.removeItem('token');
            setIsAuth(false);
        }catch(error){
            setError(error);
            console.error(error);
        }
    }

    const value = {
        isAuth, user, loading, error,
        login, register, logout
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };