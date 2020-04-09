import React from 'react'

import Link from 'gatsby-link'

import '../stylesheets/components/contact-bar.scss'

const ContactBar = () => {
  return (
    <div className="contact-bar">
      <h2>Reach out and get started today!</h2>
      <h3>
        Give us a call at <a href="tel:1-866-517-1417">1-866-517-1417</a>, email
        us at <a href="mailto:contact@stayontrak.com">contact@stayontrak.com</a>{' '}
        or <Link to="/contact-us">book a call</Link>.
      </h3>
    </div>
  )
}

export default ContactBar
