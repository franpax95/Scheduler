import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider as UserProvider } from './contexts/UserContext';

import { GlobalStyle } from './components/GlobalStyle';
import App from './components/App';


const app = document.getElementById('app');

ReactDOM.render(<>
        <GlobalStyle />
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
    </>, app
);