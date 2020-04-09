import React from 'react'
import PropTypes from 'prop-types'

import '../stylesheets/components/member-quote.scss'

import Icons from '../elements/Icons'

const MemberQuote = props => {
  return (
    <div className="content-block-small">
      <div className="quote">
        <div className="quote-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="66"
            height="56"
            viewBox="0 0 66 56"
          >
            <Icons />

            <use xlinkHref="#icon-quotes" />
          </svg>
        </div>

        <div className="quote-photo">
          <img src={props.image} alt="" />
        </div>

        <blockquote className="quote-copy">
          {props.children}

          <cite>{props.citation}</cite>
        </blockquote>
      </div>
    </div>
  )
}

MemberQuote.propTypes = {
  image: PropTypes.string,
  citation: PropTypes.string,
}

export default MemberQuote
