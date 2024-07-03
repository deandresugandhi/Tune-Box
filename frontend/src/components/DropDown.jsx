import React, { useState } from 'react';


const DropDown = ({ text, children }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleDropdown = () => {
        setIsActive(!isActive);
        console.log(isActive)
    };

    return (
        <div className={`dropdown is-up ${isActive ? 'is-active' : ''}`}>
            <div className="container">
                <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu7" onClick={toggleDropdown}>
                    <span>{text}</span>
                    <span className="icon is-small">
                    <i className="fas fa-angle-up" aria-hidden="true"></i>
                    </span>
                </button>
                </div>
                <div className={`dropdown-menu ${isActive ? 'is-active' : ''}`} id="dropdown-menu7" role="menu">
                    {children}
                </div>
            </div>
        </div>
    )
}

  
export default DropDown