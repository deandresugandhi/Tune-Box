import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'


const NavLinkContainer = ({ text, path, className, activePath = path }) => {
    const location = useLocation()
    const isActive = activePath === '/' 
        ? location.pathname === activePath
        : location.pathname.startsWith(activePath);

    return (
        <NavLink
            to={path}
            className={({ isActive: isNavLinkActive }) => `${className} ${isActive || isNavLinkActive ? "is-active" : ""}`}
        >
            {text}
        </NavLink>
                
    );
};

  
  export default NavLinkContainer