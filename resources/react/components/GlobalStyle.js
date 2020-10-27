import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        outline: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        
        color: #262626;
        font-family: 'Roboto', sans-serif;
    }

    ul {
        list-style: none;
    }

    a, button, input[type=submit] {
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

    button, input[type=submit] {
        border: none;
        cursor: pointer;
    }

    html, body, #app{
        height: 100%;
        overflow: hidden;
    }

    html, body, #app, .App{
        width: 100%;
        position: relative;
    }

    .App{ 
        height: 100%;
        overflow-x: hidden;
        
        background-color: #E4E4E1;
        background-image: radial-gradient(at top center, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.03) 100%), linear-gradient(to top, rgba(255,255,255,0.1) 0%, rgba(143,152,157,0.60) 100%);
        background-blend-mode: normal, multiply;
    }
`;