import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider as UserProvider } from './contexts/UserContext';
import { Provider as ScheduleProvider } from './contexts/ScheduleContext';
import { Provider as TaskProvider } from './contexts/TaskContext';

import { GlobalStyle } from './components/GlobalStyle';
import App from './components/App';


const app = document.getElementById('app');

ReactDOM.render(<>
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
    </>, app
);