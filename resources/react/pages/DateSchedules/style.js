import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { Link } from 'react-router-dom';



export const StyledDateSchedules = styled.section`
    padding: 12vh 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;



const backgroundColor = theme('mode', {
    light: css`
        &:nth-child(8n + 0) { background-color: #2D86F8; };
        &:nth-child(8n + 1) { background-color: #27A4D9; };
        &:nth-child(8n + 2) { background-color: #38EBF0; };
        &:nth-child(8n + 3) { background-color: #27D9AD; };
        &:nth-child(8n + 4) { background-color: #2DF88C; };
        &:nth-child(8n + 5) { background-color: #27D9AD; };
        &:nth-child(8n + 6) { background-color: #38EBF0; };
        &:nth-child(8n + 7) { background-color: #27A4D9; };

        &:nth-child(8n + 0):hover { background-color: #0659c6; };
        &:nth-child(8n + 1):hover { background-color: #1f83ad; };
        &:nth-child(8n + 2):hover { background-color: #0eb8be; };
        &:nth-child(8n + 3):hover { background-color: #1fad8a; };
        &:nth-child(8n + 4):hover { background-color: #06c660; };
        &:nth-child(8n + 5):hover { background-color: #1fad8a; };
        &:nth-child(8n + 6):hover { background-color: #0eb8be; };
        &:nth-child(8n + 7):hover { background-color: #1f83ad; };
    `,
    dark: css`
        background-color: #F78536;
        &:hover{ background-color: #f56c0a; }
    `,
});

export const ScheduleLink = styled(Link)`
    width: max(70vw, 300px);
    max-width: 900px;
    height: 80px;
    margin-bottom: max(5vh, 30px);

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    ${backgroundColor};
    color: white;

    font-size: min(max(2.5vw, 22px), 36px);
    font-weight: bold;
    text-shadow: 1px 1px #000000;

    transition: background-color .2s;
`;



export const DeleteScheduleButton = styled.button`
    z-index: 500;
    width: min(max(5vw, 20px), 30px);
    height: min(max(5vw, 20px), 30px);
    margin: auto 0;

    position: absolute;
    right: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    background-color: rgba(255, 36, 0, 1);
    color: white;

    font-size: min(max(2vw, 16px), 22px);
    font-weight: bold;

    transition: background-color .2s;

    &:hover{
        background-color: #e60800;
    }

    &:active{
        background-color: rgba(194, 24, 7, 1);
    }
`;
