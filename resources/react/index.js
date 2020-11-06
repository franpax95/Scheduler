import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider as ThemeProvider } from './contexts/ThemeContext';
import { Provider as UserProvider } from './contexts/UserContext';
import { Provider as ScheduleProvider } from './contexts/ScheduleContext';
import { Provider as TaskProvider } from './contexts/TaskContext';

import { GlobalStyle } from './GlobalStyle';
import App from './components/App';


const app = document.getElementById('app');

ReactDOM.render(<>
        <ThemeProvider>
            <GlobalStyle />
            
            <UserProvider>
                <ScheduleProvider>
                    <TaskProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </TaskProvider>
                </ScheduleProvider>
            </UserProvider>
        </ThemeProvider>
    </>, app
);