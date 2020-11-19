import styled, { css } from 'styled-components';
import theme from 'styled-theming';



export const StyledSchedule = styled.div`
    padding: 8vh 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;



const taskRowBackgroundColor = theme('mode', {
    light: css`
        &:nth-child(8n + 0) { background-color: #2D86F8; };
        &:nth-child(8n + 1) { background-color: #27A4D9; };
        &:nth-child(8n + 2) { background-color: #38EBF0; };
        &:nth-child(8n + 3) { background-color: #27D9AD; };
        &:nth-child(8n + 4) { background-color: #2DF88C; };
        &:nth-child(8n + 5) { background-color: #27D9AD; };
        &:nth-child(8n + 6) { background-color: #38EBF0; };
        &:nth-child(8n + 7) { background-color: #27A4D9; };
    `,
    dark: css`
        background-color: #F78536;
    `,
});

export const StyledTaskRow = styled.div`
    margin: 10px 0;
    padding: 20px;
    width: 70vw;
    max-width: 600px;
    min-width: 250px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-radius: 5px;
    ${taskRowBackgroundColor};
`;



const taskRowButtonBackgroundColor = theme('mode', { light: '#69D17F', dark: '#428551' });
const taskRowButtonBackgroundColor_Hover = theme('mode', { light: '#4fc96a', dark: '#4c9a5d' });
const taskRowButtonBackgroundColor_Active = theme('mode', { light: '#36b050', dark: '#65b376' });

export const StyledTaskRowButton = styled.button`
    margin: 10px 0;
    height: 60px;
    width: 70vw;
    max-width: 600px;
    min-width: 250px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border-radius: 5px;
    background-color: ${taskRowButtonBackgroundColor};
    -webkit-box-shadow: 5px 5px 10px -10px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 10px -10px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 10px -10px rgba(0,0,0,0.75);

    font-size: min(18px, max(13px, 1.8vw));

    transition: background-color .2s, color .2s;

    &:hover{
        background-color: ${taskRowButtonBackgroundColor_Hover};
    }

    &:active{
        background-color: ${taskRowButtonBackgroundColor_Active};
    }
`;



export const StyledTaskInput = styled.input`
    margin-right: auto;
    width: 80%;
    max-width: 400px;
    min-width: 150px;

    cursor: default;
    border: none;
    border-bottom: solid 1.5px transparent;
    background-color: inherit;

    font-size: min(20px, max(14px, 2.2vw));

    transition: background-color .2s, border .2s;

    @media (max-width: 500px) {
        margin-right: 5px;
    }
    
    &:focus {
        cursor: auto;
        background-color: rgba(255, 255, 255, .1);
        border-bottom: solid 1.5px gray;
    }
`;