import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaUserAlt,FaPowerOff } from 'react-icons/fa';

// import { Context as UserContext } from '../../contexts/UserContext';

import { 
    Navbar as StyledNavbar, RightSection,
    MainLink, DangerLink, StyledLink
} from './style';


const Navbar = () => {
    return (
        <StyledNavbar>
            <MainLink to="/">
                TODO List App
            </MainLink>

            <RightSection>
                <StyledLink to="/profile">
                    <FaUserAlt />
                    Profile
                </StyledLink>
                
                <DangerLink to="/logout">
                    <FaPowerOff />
                    Logout
                </DangerLink>
            </RightSection>
        </StyledNavbar>
    );
}

export default Navbar;