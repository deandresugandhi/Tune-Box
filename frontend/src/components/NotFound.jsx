import { React } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorImage from '../assets/duck3.png';

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <section class="hero hero-custom is-fullheight">
      <div class="hero-body no-margin is-flex is-justify-content-center">
        <div class='columns p-5 is-centered is-desktop'>
          <div class="column is-two-fifths-desktop is-flex is-flex-direction-column is-justify-content-center is-align-items-flex-start">
            <h1 className="title mb-5 is-size-1-desktop is-size-3-tablet is-size-2-mobile has-text-weight-heavy"><span className='pink'>Page</span> <span className='orange'>Not</span> <span className='blue'>Found</span></h1>
            <p className="subtitle custom-paragraph is-size-4-desktop is-size-5-tablet is-size-6-mobile has-text-weight-light">Oops, the page you are looking for doesn't exist. Try looking for something else.</p>
            <button className="button is-responsive mt-6 is-large is-dark has-text-black has-text-weight-bold is-rounded" onClick={() => navigate('/')}>Back to Home</button>
          </div>
          <div class="column is-1"/>
          <div class="column is-two-fifths-desktop is-flex is-flex-direction-row is-justify-content-center is-align-items-center">
            <img className="image" src={ErrorImage} alt="Logo"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound
