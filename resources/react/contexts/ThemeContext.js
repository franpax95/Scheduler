import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const getTheme = () => theme;

    const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const value = { toggle, getTheme };
    return (
        <Context.Provider value={value}>
            <ThemeProvider theme={{ mode: theme }}>
                {children}
            </ThemeProvider>
        </Context.Provider>
    );
}

export { Context, Provider };