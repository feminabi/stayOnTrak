import React from 'react'
import PropTypes from 'prop-types'

const FormCallbackSuccess = ({ submittedInfo, isAssessment }) => {
  return (
    <div className="content-block">
      <p>
        {isAssessment
          ? (<span><h3>Thank you for taking the assessment.</h3></span>)
          : (<span><h3>Thank you for sending your call request.</h3></span>)}{' '}
        <br />
        We’ll aim to call you within 7 days. If you want to talk to someone sooner, you can call us anytime
        toll free at 1-866-517-1417.
      </p>
      <div>
        <p>Your phone number: {submittedInfo.phoneNumber}</p>
        <p>Your name: {submittedInfo.fullName}</p>
        <p>Best times to call: {submittedInfo.bestCallTimes}</p>
        <p>Your email address: {submittedInfo.emailAddress}</p>
        <p>
          Problems? Let us know at{' '}
          <a href="mailto:contact@stayontrak.com">contact@stayontrak.com</a>
        </p>
      </div>
    </div>
  )
}

FormCallbackSuccess.propTypes = {
  isAssessment: PropTypes.bool,
  submittedInfo: PropTypes.object,
}

export default FormCallbackSuccess
