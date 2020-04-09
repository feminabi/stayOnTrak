import React from 'react'
import Link from 'gatsby-link'

import FormCallback from '../components/FormCallback'
import AssessmentEntryCard from '../components/AssessmentEntryCard'
import ChatPrompt from '../components/ChatPrompt'

import '../stylesheets/pages/get-started.scss'

import bannerImage from '../images/bg-banner-quiz.jpg'

const GetStarted = () => {
  return (
    <div>
      <section>
        <div className="page-intro-block">
          <h1>Take the Quiz</h1>
          <p>
          Help us match you with the right program for you.
          </p>
        </div>

        <div className="content-block banner">
          <img src={bannerImage} alt="" />
        </div>

<div className="page-heading-block start-assessment">
          
          <p>
          </p>
        </div>

        <AssessmentEntryCard source={'homepage'} />

      </section>
    </div>
  )
}

export default GetStarted
