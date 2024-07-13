import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import logoURL from '../assets/logo.png';
import NavLinkContainer from './NavLinkContainer';


const NavBar = () => {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <div class="hero-head">
            <nav class="navbar is-fixed-top has-background-black-bis">
                <div class="navbar-brand">
                    <a class="navbar-item" onClick={() => navigate("/")}>
                        <img src={logoURL} alt="Logo" />
                        <p class="is-size-4 is-size-5-mobile">TuneBox</p>
                    </a>
                    <div className={`navbar-burger ${isActive ? 'is-active' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div id="navbarMenuHeroA" className={`navbar-menu ${isActive ? 'is-active has-background-grey-darker' : ''}`}>
                    <div class="navbar-end">
                        <NavLinkContainer text="Home" path="/" className="navbar-item has-text-centered"/>
                        <NavLinkContainer text="Tools" path="/tools/chord-translator" className="navbar-item has-text-centered" activePath="/tools"/>
                        <NavLinkContainer text="About" path="/about" className="navbar-item has-text-centered"/>
                    </div>
                </div>
            </nav>
        </div>
    );
};

  
  export default NavBar