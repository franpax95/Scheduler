import styled from 'styled-components';
import theme from 'styled-theming';
import { animated } from 'react-spring';


export const AnimatedWrapper = styled(animated.div)`
    width: 100%;
    height: 100%;
    position: absolute;
`;



const backgroundColor = theme('mode', { light: 'white', dark: '#2B4450' });

export const StyledApp = styled.div`
    height: 100%;
    width: 100%;

    position: relative;

    overflow-x: hidden;
    /* background-color: ${backgroundColor}; */

    transition: background-color .1s;
`;