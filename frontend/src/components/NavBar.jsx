import React from 'react';
import logoURL from '../assets/logo.png';


const NavBar = () => {
    return (
        <div class="hero-head">
            <nav class="navbar mt-5">
                <div class="container">
                    <div class="navbar-brand pt-4 pb-4">
                    <a class="navbar-item">
                        <img src={logoURL} alt="Logo" />
                        <p class="is-size-3">TuneBox</p>
                    </a>
                    <span class="navbar-burger" data-target="navbarMenuHeroA">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                    </div>
                    <div id="navbarMenuHeroA" class="navbar-menu">
                    <div class="navbar-end">
                        <a class="navbar-item is-active"> Home </a>
                        <a class="navbar-item is-rounded"> Examples </a>
                        <a class="navbar-item is-rounded"> Documentation </a>
                    </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

  
  export default NavBar