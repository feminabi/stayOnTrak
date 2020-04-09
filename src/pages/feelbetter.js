import React from 'react'
import Link from 'gatsby-link'

import OnTrakLogo from '../elements/OnTrakLogo'
import FormCallback from '../components/FormCallback'
import AssessmentEntryCard from '../components/AssessmentEntryCard'
import ChatPrompt from '../components/ChatPrompt'

import '../stylesheets/pages/get-started.scss'

import bannerImage from '../images/bg-banner-quiz.jpg'

const FeelBetter = () => {
  return (
    <div>
      <div className="screen-heading logo">
          <OnTrakLogo />
            <div className="phone">
              Questions?{' '}
              <a href="tel:+01-866-517-1417">Call us at 1-866-517-1417</a>
            </div>
      </div>
      <section style={{ 'padding-top': '0rem' }}>
        <div className="page-intro-block">
          <h1>Take the Quiz</h1>
          <p>
          OnTrak has helped thousands of people find the help and support they need to live better lives. Answer a few quick questions to find out which OnTrak path is right for you.
          </p>
        </div>
        <div className="content-block banner">
          <img src={bannerImage} alt="" />
        </div>
        <div className="page-heading-block start-assessment">
          <p>
          </p>
        </div>
        <AssessmentEntryCard source={'feelbetter'} />
      </section>
    </div>
  )
}

export default FeelBetter
