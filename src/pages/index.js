import React from 'react'
import PropTypes from 'prop-types'

import Link from 'gatsby-link'

import SmallArrow from '../elements/SmallArrowIcon'
import MemberQuote from '../components/MemberQuote'
import Coaches from '../components/Coaches'
import AssessmentEntryCard from '../components/AssessmentEntryCard'
import ResultsThreeColumns from '../components/ResultsThreeColumns'
import ChatPrompt from '../components/ChatPrompt'
import FormCallback from '../components/FormCallback'

import '../stylesheets/pages/homepage.scss'

import bannerCurve from '../images/banner-curve.svg'
import backgroundImage from '../images/bg-banner-homepage-top.jpg'
import bannerImage from '../images/bg-banner-homepage-results.jpg'
import memberQuoteImage from '../images/photo-stories-shellie-s.jpg'

(function() {
  var didInit = false;
  function initMunchkin() {
    if(didInit === false) {
      didInit = true;
      Munchkin.init('978-UUX-953');
    }
  }
  if (typeof window !== `undefined`) { 
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//munchkin.marketo.net/munchkin.js';
  s.onreadystatechange = function() {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      initMunchkin();
    }
  };
  s.onload = initMunchkin;
  document.getElementsByTagName('head')[0].appendChild(s);
  }
})();

const Index = () => {
  return (
    <div>
      <section
        className="home-banner"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div>
          <div className="home-banner-content">
            <div className="copy">
              <h1>It’s time to feel better.</h1>
              <p>
                Take the first step. OnTrak can help you feel better and
                live better. And it’s often covered by insurance.
              </p>
            </div>

            <div className="button-group">
              <a href="https://members.stayontrak.com/apply?utm_source=website&utm_medium=apply_button&utm_campaign=website_apply_now" target="_blank" className="button button-secondary">
              Apply now
              </a>
              {/*<Link to="eligibility/" className="button button-secondary">Am I Eligible?</Link>*/}
            </div>
          </div>

          <div
            className="banner-decorative-curve"
            style={{
              height: '56px',
              width: '316px',
              backgroundImage: `url(${bannerCurve})`,
            }}
          />
        </div>
      </section>

      <section className="bg-color-white">
        <ChatPrompt />

        <div>
          <div className="page-heading-block testimonials">
            <h2>What Our Members Say</h2>
          </div>

          <MemberQuote
            image={memberQuoteImage}
            citation={'Shellie S, Richland Hills, TX'}
          >
            <p>
              The OnTrak program did exactly what its name says – it got me back
              on track. If you are wanting to improve your life, want to just
              find a different avenue or help with anything, OnTrak gives all
              the tools – you just have to take advantage.
            </p>
          </MemberQuote>

          <div className="centered-control">
            <Link to="stories/" className="arrow-link">
              Read more stories <SmallArrow />
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="page-heading-block how-it-works">
          <h2>How It Works</h2>
          <p>
            OnTrak matches you to the right Care Coach who will work with you to
            craft the perfect health plan for your needs.
          </p>
        </div>

        <div className="content-block">
          <Coaches headerPosition={'inside'} />
        </div>

        <div className="page-heading-block start-assessment">
          <h3>Start the Tailored Assessment</h3>
          <p>
            Answer a few short questions to help us match you with the right
            program for you.
          </p>
        </div>

        <AssessmentEntryCard source={'homepage'} />

        <div className="content-block banner">
          <img src={bannerImage} alt="" />
        </div>

        <div className="page-heading-block get-results">
          <h2>We Get Results</h2>
        </div>

        <ResultsThreeColumns />

        <div className="centered-control learn-more">
          <Link to="/how-it-works" className="arrow-link">
            Learn more about the program <SmallArrow />
          </Link>
        </div>
      </section>

      <section className="bg-color-blue full-width">

        <div className="page-heading-block ready-to-talk">
          <h2>Ready to talk?</h2>
          <p>Call us now at <b><a href="tel:+01-866-517-1417">1-866-517-1417</a></b>
          </p>
          <p>Email us at <b><a href="mailto:contact@stayontrak.com">contact@stayontrak.com</a></b>
          </p>
          <p>Or fill out the form below to book a callback:</p>
        </div>

        <FormCallback isSimplified={true} />
      </section>
    </div>
  )
}

Index.propTypes = {}

export default Index

