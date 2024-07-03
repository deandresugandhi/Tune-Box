import { React, useState } from 'react'
import NavBar from './NavBar';
import Socials from './Socials'
import toolbox from '../assets/toolbox.png';

const Home = () => {

  return (
    <section class="hero hero-custom is-fullheight">
      <NavBar/>
        <div class="hero-body is-flex is-justify-content-center">
          <div class='columns p-5 is-centered is-desktop'>
            <div class="column is-two-fifths-desktop is-flex is-flex-direction-column is-justify-content-flex-center is-align-items-flex-start">
              <h1 className="title mb-5 is-size-1-desktop is-size-3-tablet is-size-2-mobile has-text-weight-heavy"><span className='pink'>The</span> <span className='orange'>online</span> <span className='blue'>toolbox</span> for musicians.</h1>
              <p className="subtitle custom-paragraph is-size-4-desktop is-size-5-tablet is-size-6-mobile has-text-weight-light">A collection of essential tools for musicians at your fingertips, designed to make musical multitasking as simple as hitting play.</p>
              <button className="button is-responsive mt-6 is-large is-dark has-text-black has-text-weight-bold is-rounded">Get started</button>
            </div>
            <div class="column is-two-fifths-desktop is-flex is-flex-direction-row is-justify-content-center is-align-items-center">
              <img className="image" src={toolbox} alt="Logo"/>
            </div>
          </div>
        </div>
      <div class="hero-foot shadowed has-background-black">
          <Socials/>
          <p className="has-text-centered is-size-7-mobile mb-3 pl-6 pr-6">
            <strong>TuneBox</strong> by <a className='has-text-dark' href="https://deandresugandhi.dev">Deandre Sugandhi</a>.
            The source code is licensed <a className='has-text-dark' href="https://opensource.org/license/mit">MIT</a>. 
            The website content is licensed <a className='has-text-dark' href="https://creativecommons.org/licenses/by-nc-sa/4.0//">CC BY NC SA 4.0</a>.
          </p>
      </div>
    </section>  
  )
}

export default Home
