import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar';
import Socials from './Socials'
import aboutPage from '../assets/AboutPage.jpg';
import toolbox from '../assets/toolbox.png';

const Home = () => {
  const navigate = useNavigate()
  return (
    <section class="hero hero-custom is-fullheight">
      <NavBar/>
        <div class="hero-body is-flex is-justify-content-center">
          <div class='columns p-5 is-8 is-centered is-desktop'>
            <div class="column is-two-fifths-desktop is-flex is-flex-direction-row is-justify-content-center is-align-items-center">
              <img className="image" src={aboutPage} alt="About"/>
            </div>
            <div class="column is-1" />
            <div class="column is-two-fifths-desktop is-flex is-flex-direction-column is-justify-content-center is-align-items-flex-start">
              <h1 className="title mb-5 is-size-1-desktop is-size-3-tablet is-size-3-mobile has-text-weight-heavy"><span className='pink'>About</span> <span className='orange'>Tune</span><span className='blue'>Box</span></h1>
              <p className="subtitle custom-paragraph is-size-4-desktop is-size-5-tablet is-size-6-mobile has-text-weight-light">
                Welcome to TuneBox, your online musical toolbox! This site was created with a simple goal in mind: to provide musicians of all levels with convenient tools to support their work and learning journey. Whether you need to transpose your chord chart to a different key, ensure your instrument is perfectly tuned, or convert between different chord notations, TuneBox has you covered.
              </p>
              <p className="subtitle custom-paragraph is-size-4-desktop is-size-5-tablet is-size-6-mobile has-text-weight-light mt-5">
                While the site has limited features at the moment, we are constantly adding more tools to the collection.
              </p>
              <button className="button is-responsive mt-6 is-large is-dark has-text-black has-text-weight-bold is-rounded" onClick={() => navigate('/tools/chord-translator')}>Get started</button>
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
