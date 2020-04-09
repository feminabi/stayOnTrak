import React from 'react'

import Link from 'gatsby-link'

import '../stylesheets/components/welcome-contact-bar.scss'

const ContactBar = () => {
  return (
    <div className="contact-bar">
      <h2>Want to speak with someone now?</h2>
      <h3>
      Call us at  <a href="tel:1-866-321-6560">1-866-321-6560</a>, or email
        us at <a href="mailto:contact@stayontrak.com">contact@stayontrak.com</a>.
      </h3>
    </div>
  )
}

export default ContactBar
