import styled from 'styled-components';
import theme from 'styled-theming';
import { Link } from 'react-router-dom';



const navBackgroundColor = theme('mode', { light: 'cornflowerblue', dark: '#2B4450' });
const navBoxShadow = theme('mode', { light: '0px 5px 40px -10px rgba(0,0,0,0.75)', dark: 'none' });
const navBorderBottom = theme('mode', { light: 'none', dark: 'solid 1px gray' });

export const StyledNavbar = styled.nav`
    z-index: 1000;
    width: 100%;
    height: 80px;

    position: sticky;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-bottom: ${navBorderBottom};
    background-color: ${navBackgroundColor};
    -webkit-box-shadow: ${navBoxShadow};
    -moz-box-shadow: ${navBoxShadow};
    box-shadow: ${navBoxShadow};

    transition: background-color .1s, box-shadow .1s, border .1s;
`;



export const RightSection = styled.div`
    position: absolute;
    right: 0;
    display: flex; /** for transition transform: translate() */
`;



const mainLinkColor = theme('mode', { light: 'white', dark: 'whitesmoke' });

export const MainLink = styled(Link)`
    padding: 10px 20px;

    color: ${mainLinkColor};

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



const themeButtonBorder = theme('mode', { light: 'solid 2px #F78536', dark: 'solid 2px cornflowerblue' });
const themeButtonBorderColor_Hover = theme('mode', { light: '#f89854', dark: '#4881ea' });
const themeButtonBorderColor_Active = theme('mode', { light: '#f56c0a', dark: '#8db0f2' });

const themeButtonBackgroundColor = theme('mode', { light: '#F78536', dark: 'cornflowerblue' });
const themeButtonBackgroundColor_Hover = theme('mode', { light: '#f89854', dark: '#4881ea' });
const themeButtonBackgroundColor_Active = theme('mode', { light: '#f56c0a', dark: '#8db0f2' });

const themeButtonColor = theme('mode', { light: 'white', dark: 'white' });
const themeButtonBoxShadow = theme('mode' , { light: '0px 0px 5px 0px rgba(247,133,54,1)', dark: 'none' });

export const ThemeButton = styled.button`
    padding: 8px 16px;
    margin-right: 10px;

    border: ${themeButtonBorder};
    border-radius: 5px;
    background-color: ${themeButtonBackgroundColor};
    color: ${themeButtonColor};
    -webkit-box-shadow: ${themeButtonBoxShadow};
    -moz-box-shadow: ${themeButtonBoxShadow};
    box-shadow: ${themeButtonBoxShadow};
    
    font-size: 18px;

    transition: background-color .2s, border-color .2s;

    &:hover{
        border-color: ${themeButtonBorderColor_Hover};
        background-color: ${themeButtonBackgroundColor_Hover};
    }

    &:active{
        border-color: ${themeButtonBorderColor_Active};
        background-color: ${themeButtonBackgroundColor_Active};
    }
`;



const profileLinkBorder = theme('mode', { light: 'solid 2px white', dark: 'solid 2px #F78536' });
const profileLinkBorderColor_Hover = theme('mode', { light: 'white', dark: '#f89854' });
const profileLinkBorderColor_Active = theme('mode', { light: 'white', dark: '#f56c0a' });

const profileLinkBackgroundColor = theme('mode', { light: 'transparent', dark: '#F78536' });
const profileLinkBackgroundColor_Hover = theme('mode', { light: 'rgba(255, 255, 255, .2)', dark: '#f89854' });
const profileLinkBackgroundColor_Active = theme('mode', { light: 'rgba(255, 255, 255, .4)', dark: '#f56c0a' });

const profileLinkColor = theme('mode', { light: 'white', dark: 'white' });
const profileLinkBoxShadow = theme('mode' , { light: '0px 0px 5px 0px rgba(255,255,255,1)', dark: 'none' });

export const ProfileLink = styled(Link)`
    padding: 8px 16px;
    margin-right: 10px;

    border: ${profileLinkBorder};
    border-radius: 5px;
    background-color: ${profileLinkBackgroundColor};
    color: ${profileLinkColor};
    -webkit-box-shadow: ${profileLinkBoxShadow};
    -moz-box-shadow: ${profileLinkBoxShadow};
    box-shadow: ${profileLinkBoxShadow};
    
    font-size: 18px;

    transition: background-color .2s, border-color .2s;

    &:hover{
        border-color: ${profileLinkBorderColor_Hover};
        background-color: ${profileLinkBackgroundColor_Hover};
    }

    &:active{
        border-color: ${profileLinkBorderColor_Active};
        background-color: ${profileLinkBackgroundColor_Active};
    }
`;



export const LogoutLink = styled(Link)`
    padding: 8px 16px;
    margin-right: 16px;

    border: solid 2px rgba(255, 36, 0, 1);
    border-radius: 5px;
    background-color: rgba(255, 36, 0, 1);
    color: white;

    font-size: 18px;

    transition: background-color .2s, border-color .2s;

    &:hover{
        border-color: #e60800;
        background-color: #e60800;
    }

    &:active{
        border-color: rgba(194, 24, 7, 1);
        background-color: rgba(194, 24, 7, 1);
    }
`;