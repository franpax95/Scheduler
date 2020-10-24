import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.nav`
    z-index: 1000;
    width: 100%;
    height: 80px;

    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
    background-blend-mode: multiply,multiply;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.75);
    box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.75)
`;

export const RightSection = styled.div`
    position: absolute;
    right: 0;
    display: flex; /** for transition transform: translate() */
`;

export const MainLink = styled(Link)`
    padding: 10px 20px;

    color: white;

    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;

    transition: color .2s;

    &:hover{
        color: lightgray;
    }

    &:active{
        color: darkgray;
    }
`;

export const DangerLink = styled(Link)`
    padding: 8px 16px;
    margin-right: 16px;

    border-radius: 5px;
    background-color: red;
    color: white;
    -webkit-box-shadow: 5px 5px 10px -6px rgba(255,0,0,1);
    -moz-box-shadow: 5px 5px 10px -6px rgba(255,0,0,1);
    box-shadow: 5px 5px 10px -6px rgba(255,0,0,1);

    font-size: 18px;

    transition: box-shadow .2s, transform .3s, background-color .3s;

    &:hover{
        -webkit-box-shadow: 5px 5px 10px -3px rgba(255,0,0,1);
        -moz-box-shadow: 5px 5px 10px -3px rgba(255,0,0,1);
        box-shadow: 5px 5px 10px -3px rgba(255,0,0,1);
    }

    &:active{
        background-color: #e61919;
        -webkit-box-shadow: 5px 5px 10px -6px rgba(255,0,0,1);
        -moz-box-shadow: 5px 5px 10px -8px rgba(255,0,0,1);
        box-shadow: 5px 5px 10px -8px rgba(255,0,0,1);
        transform: translate(1px, 1px);
    }

    & *{
        color: white;
    }
`;

export const StyledLink = styled(Link)`
    padding: 8px 16px;
    margin-right: 10px;

    border: solid 2px white;
    border-radius: 5px;
    background-color: transparent;
    color: white;
    -webkit-box-shadow: 5px 5px 10px -6px rgba(255,255,255,1);
    -moz-box-shadow: 5px 5px 10px -6px rgba(255,255,255,1);
    box-shadow: 5px 5px 10px -6px rgba(255,255,255,1);
    
    font-size: 18px;

    transition: box-shadow .2s, transform .3s;

    &:hover{
        -webkit-box-shadow: 5px 5px 10px -4px rgba(255,255,255,1);
        -moz-box-shadow: 5px 5px 10px -4px rgba(255,255,255,1);
        box-shadow: 5px 5px 10px -4px rgba(255,255,255,1);
    }

    &:active{
        -webkit-box-shadow: 5px 5px 10px -6px rgba(255,255,255,1);
        -moz-box-shadow: 5px 5px 10px -8px rgba(255,255,255,1);
        box-shadow: 5px 5px 10px -8px rgba(255,255,255,1);
        transform: translate(1px, 1px);
    }

    & *{
        color: white;
    }
`;

