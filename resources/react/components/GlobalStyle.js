import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        outline: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        
        font-family: 'Roboto', sans-serif;
    }

    ul {
        list-style: none;
    }

    a, button {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    a{
        text-decoration: none;
    }

    button {
        border: 0;
        cursor: pointer;
    }

    html, body, #app, .App{
        width: 100%;
        height: 100%;
        position: relative;
    }

    .App{ 
        overflow-x: hidden; 
        /* overflow-y: scroll;  */
        height: 100%;
        background-color: lightgray;
    }
`;