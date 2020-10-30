import styled from 'styled-components';
import { animated } from 'react-spring';

export const Background = styled.div`
    width: max(70vw, 300px);
    max-width: 900px;
    height: 80px;
    margin-bottom: max(5vh, 30px);

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    border-radius: 10px;
    background-color: #808080;
`;

export const AbsoluteWrapper = styled.div`
    width: max(70vw, 300px);
    max-width: 900px;
    height: 80px;
    margin-bottom: max(5vh, 30px);

    position: relative;
    /* display: flex;
    justify-content: center;
    align-items: center; */

    overflow: hidden;
    border-radius: 10px;
    background-color: #808080;
    
    /* transition: opacity ${props => props.transitionDuration}ms; */
`;

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

    /*font-size: max(2vw, 20px);*/
    font-size: 20px;
    font-weight: bold;
    font-style: italic;

    transition: background-color .5s, color .5s;

    &:hover {
        background-color: #999999;
    }

    &:active {
        background-color: #b3b3b3;
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
`;

export const Input = styled.input`
    width: 200px;
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