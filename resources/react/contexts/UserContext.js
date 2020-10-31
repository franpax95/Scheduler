import React, { useState } from 'react';
import axios from 'axios';
import * as Cookies from "js-cookies";

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    /**
     * Consts
     */
    const _SESSION = "scheduler-session";
    
    

    /**
     * private methods
     */
    const setSessionCookie = sessionInfo => {
        Cookies.default.removeItem(_SESSION);
        Cookies.default.setItem(_SESSION, sessionInfo, { expires: 14 });
    }

    const getSessionCookie = () => {
        const sessionCookie = Cookies.default.getItem(_SESSION);
        return sessionCookie ? JSON.parse(sessionCookie) : {};
    }

    const removeSessionCookie = () => {
        Cookies.default.removeItem(_SESSION);
    }



    /**
     * States
     */
    const [isAuth, setIsAuth] = useState(getSessionCookie().token ? true : false);
    const [user, setUser] = useState(getSessionCookie().user ? getSessionCookie().user : {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');



    /**
     * public methods
     */
    const login = async ({ email, password }) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/login', { email, password });
            const { user, token } = response.data.success;

            setSessionCookie(JSON.stringify({ user, token }));
            setUser(user);
            setIsAuth(true);
        }catch(error) {
            setError(error);
        }finally {
            setLoading(false);
        }
    }

    const register = async ({ name, email, password, password_verification }) => {
        setLoading(true);
        try{
            const response = await axios.post('/api/register', { name, email, password, password_verification });
            const { user, token } = response.data.success;

            setSessionCookie(JSON.stringify({ user, token }));
            setUser(user);
            setIsAuth(true);
        }catch(error){
            setError(error);
        }finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        setLoading(true);
        try{
            await axios.post('/api/logout');

            removeSessionCookie();
            setIsAuth(false);
            setUser({});
        }catch(error){
            setError(error);
            console.error(error);
        }finally {
            setLoading(false);
        }
    }

    const token = () => getSessionCookie().token;

    const value = {
        isAuth, user, loading, error,
        login, register, logout, token
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };