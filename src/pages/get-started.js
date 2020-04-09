import React from 'react'
import Link from 'gatsby-link'

import FormCallback from '../components/FormCallback'
import AssessmentEntryCard from '../components/AssessmentEntryCard'
import ChatPrompt from '../components/ChatPrompt'

import '../stylesheets/pages/get-started.scss'

import bannerImage from '../images/bg-banner-get-started.jpg'

const GetStarted = () => {
  return (
    <div>
      <section>
        <div className="page-intro-block">
          <h1>Get Started</h1>
          <p>
            Getting to a healthier, happier life isn’t easy. But working with
            OnTrak is. We’ll help you take it one step at a time.
          </p>
        </div>

        <div className="content-block banner">
          <img src={bannerImage} alt="" />
        </div>

<div className="page-heading-block start-assessment">
          <h2>Start the Tailored Assessment</h2>
          <p>
            Answer a few short questions to help us match you with the right
            program for you.
          </p>
        </div>

        <AssessmentEntryCard source={'homepage'} />

        <div className="page-heading-block start-today">
          <h2>Start today!</h2>
          <p>
            Call us now toll free at{' '}
            <b>
              <a href="tel:+01-866-517-1417">1-866-517-1417</a>
            </b>
            <br />
            Email us at{' '}
            <b>
              <a href="mailto:contact@stayontrak.com">contact@stayontrak.com</a>
            </b>
          </p>

          <ChatPrompt />
          <p>
            <br />
            Fill out the form below to book a callback:
          </p>
        </div>

        <div className="content-block not-sure">
          <div className="content-card bg-color-beige-light">
            <h4>Not sure if you’re eligible?</h4>
            <p>
              Let us know your name, email, and phone number, and we’ll let you
              know if OnTrak is available to you.
            </p>
          </div>
        </div>

        <FormCallback isSimplified={true} />
      </section>
    </div>
  )
}

export default GetStarted
