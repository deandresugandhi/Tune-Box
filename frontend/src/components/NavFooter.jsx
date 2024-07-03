import React from 'react';
import NavLinkContainer from './NavLinkContainer';


const NavFooter = () => {
    return (
        <div class="hero-foot">
            <nav class="tabs is-fullwidth">
                <ul>
                    <li><NavLinkContainer text="Chord Translator" path="/tools/chord-translator" className="tab-item"/></li>
                    <li><NavLinkContainer text="Chord Transposer" path="/tools/chord-transposer" className="tab-item"/></li>
                    <li><NavLinkContainer text="Instant Translate" path="/tools/instant-translate" className="tab-item"/></li>
                    <li><NavLinkContainer text="Instant Transpose" path="/tools/instant-transpose" className="tab-item"/></li>
                    <li><NavLinkContainer text="Chromatic Tuner" path="/tools/chromatic-tuner" className="tab-item"/></li>
                </ul>
            </nav>
        </div>
    )
}

  
export default NavFooter