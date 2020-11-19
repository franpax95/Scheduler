import styled from 'styled-components';
import theme from 'styled-theming';
import { animated } from 'react-spring';


const absoluteWrapperBackgroundColor = theme('mode', { light: 'cornflowerblue', dark: '#428551' });

export const AbsoluteWrapper = styled.div`
    width: max(70vw, 300px);
    max-width: 900px;
    height: 80px;
    margin-top: 5vh;
    margin-bottom: max(5vh, 30px);

    position: relative;
    /* display: flex;
    justify-content: center;
    align-items: center; */

    overflow: hidden;
    border-radius: 10px;
    background-color: ${absoluteWrapperBackgroundColor};
    
    /* transition: opacity ${props => props.transitionDuration}ms; */
`;

const openButtonBackgroundHover = theme('mode', { light: '#8db0f2', dark: '#4c9a5d' });
const openButtonBackgroundActive = theme('mode', { light: '#3271e7', dark: '#32673e' });

export const OpenButton = styled(animated.button)`
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: transparent;
    color: white;

    font-size: min(max(2vw, 18px), 30px);
    font-size: 20px;
    font-weight: bold;
    font-style: italic;

    transition: background-color .5s, color .5s;

    &:hover {
        background-color: ${openButtonBackgroundHover};
    }

    &:active {
        background-color: ${openButtonBackgroundActive};
    }
`;

export const FormWrapper = styled(animated.form)`
    padding: 0 50px;
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & > * {
        margin: 0 5px;
    }
`;

export const Submit = styled.input`
    margin-left: 10px;
`;

export const CloseButton = styled.button`
    margin-left: 10px;
    background-color: red;
    color: white;
    font-size: 30px;
`;