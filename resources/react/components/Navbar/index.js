import React, { useContext, useState } from 'react';

// import { Context as UserContext } from '../../contexts/UserContext';

import { Link, NavLink } from 'react-router-dom';

import { FaRegUser } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import { GoSignIn, GoSignOut } from 'react-icons/go';

const Navbar = () => {
    return (
        <div className="Navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/notfound">NotFound</NavLink>
        </div>
    );
}

export default Navbar;