import React, { useContext } from 'react';
import { FaUserAlt, FaPowerOff, FaPaintBrush } from 'react-icons/fa';

import { Context as ThemeContext } from '../../contexts/ThemeContext';
import { Context as UserContext } from '../../contexts/UserContext';

import { StyledNavbar, RightSection, MainLink, ThemeButton, ProfileLink, LogoutLink } from './style';


const Navbar = () => {
    const { isAuth, user, logout } = useContext(UserContext);
    const { toggle, getTheme } = useContext(ThemeContext);
    
    return (
        <StyledNavbar>
            <MainLink to="/">
                Scheduler
            </MainLink>

            <RightSection>
                <ThemeButton onClick={() => toggle()}>
                    <FaPaintBrush />
                    {getTheme() === 'light' ? 'Dark' : 'Light'} theme
                </ThemeButton>

                <ProfileLink to="/profile">
                    <FaUserAlt />
                    Profile
                </ProfileLink>
                
                <LogoutLink to="/logout" onClick={() => logout()}>
                    <FaPowerOff />
                    Logout
                </LogoutLink>
            </RightSection>
        </StyledNavbar>
    );
}

export default Navbar;