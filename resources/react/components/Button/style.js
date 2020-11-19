import styled from 'styled-components';
import theme from 'styled-theming';


const scheduleSubmitBackgroundColor = theme('mode', { light: '#58ED58', dark: '#E08F26' });
const scheduleSubmitBackgroundColor_Hover = theme('mode', { light: '#2fe92f', dark: '#c97e1d' });
const scheduleSubmitBackgroundColor_Active = theme('mode', { light: '#16d016', dark: '#9c6216' });
const scheduleSubmitTextShadow = theme('mode', { light: 'none', dark: '1px 1px #262626' });
const scheduleSubmitTextStroke = theme('mode', { light: '1px #666666', dark: 'none' });

export const StyledScheduleSubmitButton = styled.input`
    padding: 8px 20px;
    
    border-radius: 5px;
    background-color: ${scheduleSubmitBackgroundColor};
    color: white;

    font-size: 22px;
    font-weight: bold;
    text-shadow: ${scheduleSubmitTextShadow};
    -webkit-text-stroke: ${scheduleSubmitTextStroke};
    transition: background-color .2s;

    &:hover {
        background-color: ${scheduleSubmitBackgroundColor_Hover};
    }

    &:active {
        background-color: ${scheduleSubmitBackgroundColor_Active};
    }
`;

export const StyledQuitButton = styled.button`
    width: ${props => {
        if(props.size === 'big') return 'min(max(5vw, 20px), 30px)';
        else if(props.size === 'small') return '25px';
    }};
    height: ${props => {
        if(props.size === 'big') return 'min(max(5vw, 20px), 30px)';
        else if(props.size === 'small') return '25px';
    }};

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
