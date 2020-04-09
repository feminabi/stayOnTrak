import React from 'react'

import FormCallback from '../components/FormCallback'
import ChatPrompt from '../components/ChatPrompt'

const contactUs = () => {
  return (
    <div>
      <section>
        <div className="page-intro-block">
          <h1>Contact Us</h1>
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

          <p className="chatFillout">Fill out the form below to book a callback:</p>
        </div>

        <FormCallback isSimplified={true} />
      </section>
    </div>
  )
}

export default contactUs
