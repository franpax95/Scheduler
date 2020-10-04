import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './components/GlobalStyle';
import App from './components/App';


const app = document.getElementById('app');

ReactDOM.render(<>
        <GlobalStyle />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </>, app
);