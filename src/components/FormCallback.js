import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import axios from 'axios'
import moment from 'moment-timezone'

import BestCallTimes from '../elements/BestCallTimes'
import FormCallbackSuccess from './FormCallbackSuccess'
import SmallArrow from '../elements/SmallArrowIcon'

import '../stylesheets/components/form-callback.scss'

class FormCallback extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
      // dateOfBirth: '',
      bestCallTimes: {},
      isEnrolled: null,
      formErrors: {
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        isEnrolled: '',
        // dateOfBirth: ''
      },
      fieldValid: {
        fullName: null,
        phoneNumber: null,
        emailAddress: null,
        isEnrolled: null,
        // dateOfBirth: null
      },
      formValid: false,
      submitting: false,
      submitted: false,
      submitResults: null,
      submitError: null,
    }

    this.setBestCallTimes = this.setBestCallTimes.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  setBestCallTimes = value => {
    this.setState({ bestCallTimes: value })
  }

  handleRadioChange = event => {
    this.setState({ isEnrolled: event.target.value })
  }

  handleInputChange = event => {
    let name = event.target.name
    let value = event.target.value

    this.setState({ [name]: value }, () => {
      this.validateField(name, value)
    })
  }

  validateField(name, value) {
    let formErrors = this.state.formErrors
    let fieldValid = this.state.fieldValid
    let isValid = true
    let errorMessage = ''

    switch (name) {
      case 'fullName':
        isValid = !validator.isEmpty(value)
        errorMessage = 'Full name is required'
        break
      case 'phoneNumber':
        isValid =
          validator.isMobilePhone(value.replace(/\D/g, ''), 'en-US') &&
          !validator.isEmpty(value)
        errorMessage = 'Please enter a valid phone number'
        break
      case 'emailAddress':
        isValid =
          validator.isEmail(validator.normalizeEmail(value)) &&
          !validator.isEmpty(value)
        errorMessage = 'Please enter a valid email address'
        break
      case 'dateOfBirth':
        isValid = !Number.isNaN(new Date(value)) // Simple date validation
        errorMessage = 'Please enter a valid date'
        break
    }
    fieldValid[name] = isValid
    formErrors[name] = isValid ? '' : errorMessage

    this.setState({
      formErrors: formErrors,
      fieldValid: fieldValid,
    })
  }

  errorClass(error) {
    return error ? 'has-error' : ''
  }

  componentDidUpdate(prevProps, prevState) {
    // Handle full form validation here
    let isValid = Object.keys(this.state.fieldValid).every(field => {
      if (field === 'isEnrolled' && this.props.isSimplified) {
        return true
      }
      return this.state.fieldValid[field]
    })
    if (isValid !== prevState.formValid) {
      this.setState({ formValid: isValid })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const tzGuess = moment.tz.guess()
    const timezone = moment.tz(tzGuess)
    const request = {
      fullName: validator.escape(this.state.fullName),
      phoneNumber: validator.escape(this.state.phoneNumber),
      emailAddress: validator.normalizeEmail(this.state.emailAddress),
      // dateOfBirth: validator.escape(this.state.dateOfBirth),
      bestCallTimes: validator.escape(
        `${this.state.bestCallTimes.bestDay} ${this.state.bestCallTimes
          .bestTime}`
      ),
      isEnrolled: this.props.isSimplified ? null : this.state.isEnrolled,
      timezone: {
        identifier: tzGuess,
        zone: timezone.zoneAbbr(),
        offset: timezone.format('Z'),
      },
    }

    const resultHandler = response => {
      this.setState({
        submitResults: response.data.results,
        submitting: false,
        submitted: true,
        submitError: false,
      })
    }
    const errorHandler = err => {
      this.setState({
        submitResults: null,
        submitting: false,
        submitted: false,
        submitError: err,
      })
    }

    this.setState(
      {
        submitting: true,
      },
      () => {
        if (this.props.onSubmit) {
          this.props
            .onSubmit(request)
            .then(resultHandler)
            .catch(errorHandler)
        } else {
          axios
            .post('/api/contact', request)
            .then(resultHandler)
            .catch(errorHandler)
        }
      }
    )
  }

  renderForm() {
    const buttonText = this.state.submitting ? (
      <span>Submitting, Please wait ...</span>
    ) : (
      <span>
        Request Callback <SmallArrow /> 
      </span>
    )
    return ( 
      <form
        onSubmit={this.handleSubmit}
        disabled={this.state.submitting}
        aria-label="schedule a call back"
      >
        <div className={this.props.isSimplified ? 'two-cols' : 'three-cols'}>
          <label>
            <input
              type="text"
              name="fullName"
              value={this.state.fullName}
              onChange={this.handleInputChange}
              className={this.errorClass(this.state.formErrors.fullName)}
            />
            <span>Full name</span>
          </label>

          <label>
            <input
              type="text"
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleInputChange}
              className={this.errorClass(this.state.formErrors.phoneNumber)}
            />
            <span>Phone number</span>
          </label>

          <label>
            <input
              type="text"
              name="emailAddress"
              value={this.state.emailAddress}
              onChange={this.handleInputChange}
              className={this.errorClass(this.state.formErrors.emailAddress)}
            />
            <span>
              Email address <em>(for confirmation)</em>
            </span>
          </label>

          <div className="label">
            <BestCallTimes updateValue={this.setBestCallTimes} />
            <span>Best times to call</span>
          </div>

          {/*<label>
                        <input type="date" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleInputChange}/>
                        <span>Date of Birth</span>
                    </label>*/}

          {this.props.isSimplified ? null : (
            <label className="span-two-cols">
              <span className="radio-button-group button-group">
                <label className="button-style-radio">
                  <input
                    type="radio"
                    name="isEnrolled"
                    value="yes"
                    checked={this.state.isEnrolled === 'yes'}
                    onChange={this.handleRadioChange}
                  />
                  <span>Yes, I am enrolled</span>
                </label>

                <label className="button-style-radio">
                  <input
                    type="radio"
                    name="isEnrolled"
                    value="no"
                    checked={this.state.isEnrolled === 'no'}
                    onChange={this.handleRadioChange}
                  />
                  <span>No, I’m not enrolled</span>
                </label>

                <label className="button-style-radio">
                  <input
                    type="radio"
                    name="isEnrolled"
                    value="unsure"
                    checked={this.state.isEnrolled === 'unsure'}
                    onChange={this.handleRadioChange}
                  />
                  <span>I’m not sure if I’m enrolled</span>
                </label>
              </span>

              <span>Are you already an OnTrak member?</span>
            </label>
          )}
        </div>

        <div className="centered-control">
          <button
            type="submit"
            className="button-primary smaller"
            disabled={!this.state.formValid || this.state.submitting}
          >
            {buttonText}
          </button>  
        </div>
        <center>
          <div className="centered-button">
            <a href="https://members.stayontrak.com/apply?utm_source=website&utm_medium=apply_button&utm_campaign=website_apply_now" target="_blank" className="arrow-link">
              <button type="button" className="button button-primary smaller applynow">
                  Apply Now
              </button>
            </a>
          </div>  
      </center>
      </form>
    )
  }

  renderSubmitted() {
    if (this.state.submitError === false) {
      return this.renderSuccess()
    } else {
      return this.renderError()
    }
  }

  renderSuccess() {
    return (
      <FormCallbackSuccess
        submittedInfo={this.state.submitResults}
        isAssessment={this.props.isAssessment}
      />
    )
  }

  renderError() {
    return (
      <form>
        <div className="page-heading-block">
          <p>
            An error has occurred submitting your information. We apologize for
            the inconvenience. Please go back and try submitting the form again.
          </p>
        </div>
      </form>
    )
  }

  componentWillMount() {
    if (this.props.isSimplified === false) {
      this.setState({ isEnrolled: 'no' })
    }
  }

  render() {
    return this.state.submitted === false
      ? this.renderForm()
      : this.renderSubmitted()
  }
}

FormCallback.propTypes = {
  isAssessment: PropTypes.bool,
  isSimplified: PropTypes.bool,
  onSubmit: PropTypes.func,
}

export default FormCallback
