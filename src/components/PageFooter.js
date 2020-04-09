import React from 'react'

import Link from 'gatsby-link'

import OnTrakLogo from '../elements/OnTrakLogo'
import Icons from '../elements/Icons'

import '../stylesheets/components/page-footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <span className="logo">
          <OnTrakLogo />
        </span>

        <ul className="social-media">
          <li>
            <a href="https://twitter.com/mycarecoach">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="47"
                height="47"
                viewBox="0 0 47 47"
              >
                <Icons />
                <use xlinkHref="#icon-logo-twitter" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/OnTrak-202350820249/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="47"
                height="47"
                viewBox="0 0 47 47"
              >
                <Icons />
                <use xlinkHref="#icon-logo-facebook" />
              </svg>
            </a>
          </li>
        </ul>

        <p className="contact-info">
          Call us toll free <a href="tel:1-866-517-1417">1-866-517-1417</a>{' '}
          <br />Email us at{' '}
          <a
            href="mailto:contact@stayontrak.com"
            style={{ color: 'currentColor' }}
          >
            contact@stayontrak.com
          </a>
        </p>

        <ul className="nav-links">
          <li>&copy; OnTrak, Inc.</li>
          <li>
            <Link to="hipaa/">HIPAA Notice</Link>
          </li>
          <li>
            <Link to="privacy-policy/">Privacy Policy</Link>
          </li>
          <li>
            <Link to="terms-of-use/">Terms of Use</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
