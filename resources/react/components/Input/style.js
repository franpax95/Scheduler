import styled from 'styled-components';
import theme from 'styled-theming';

const color = theme('mode', { light: '', dark: '#262626' });
const boxShadowScheduleInput = theme('mode', { light: '0px 10px 10px 0px rgba(128,128,128,.6)', dark: 'none' });
const boxShadowScheduleInputFocus = theme('mode', { light: '0px 0px 15px 0px rgba(40,60,80,1)', dark: 'none' });

export const StyledScheduleInput = styled.input`
    padding: 4px 2px;

    border: solid 1px gray;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, .9);
    color: ${color};
    -webkit-box-shadow: ${boxShadowScheduleInput};
    -moz-box-shadow: ${boxShadowScheduleInput};
    box-shadow: ${boxShadowScheduleInput};

    font-size: min(max(1.5vw, 14px), 20px);

    transition: box-shadow .2s;

    &:focus {
        -webkit-box-shadow: ${boxShadowScheduleInputFocus};
        -moz-box-shadow: ${boxShadowScheduleInputFocus};
        box-shadow: ${boxShadowScheduleInputFocus};
    }
`;


