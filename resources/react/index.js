import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider as UserProvider } from './contexts/UserContext';
import { Provider } from './contexts/Context';

import { GlobalStyle } from './components/GlobalStyle';
import App from './components/App';


const app = document.getElementById('app');

ReactDOM.render(<>
        <GlobalStyle />
        <Provider>
            <UserProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </UserProvider>
        </Provider>
    </>, app
);