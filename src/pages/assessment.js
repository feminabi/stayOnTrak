import React from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import axios from 'axios'
import Link from 'gatsby-link'

import Icons from '../elements/Icons'
import SmallArrow from '../elements/SmallArrowIcon'
import OnTrakLogo from '../elements/OnTrakLogo'
import { ClickToEdit } from '../elements/ClickToEdit'
import AssessmentResults from '../components/AssessmentResults'
import FormCallback from '../components/FormCallback'

import '../stylesheets/components/assessment.scss'

export default class Assessment extends React.Component {
  static propTypes = {
    assessmentData: PropTypes.object,
    writeAssessmentData: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      currentQuestionNumber: 0,
      currentQuestion: 'feelingLately',
      assessmentData: {
        feelingLately: {
          sadHappy: 50,
          illWell: 50,
          stressedRelaxed: 50,
          angryContent: 50,
          fearfulConfident: 50,
          nervousCalm: 50,
        },
        wishesFor: new Set(),
        wantsChange: new Set(),
        relyUponWhom: new Set(),
        howMotivated: 50,
      },
      source: '',
      userSuppliedWishesForValue: '',
      buttonIsDisabled: true,
      serverResponse: {},
    }

    this.scaleTouched = {
      sadHappy: false,
      illWell: false,
      stressedRelaxed: false,
      angryContent: false,
      fearfulConfident: false,
      nervousCalm: false,
      howMotivated: false,
    }

    this.isButtonDisabled = this.isButtonDisabled.bind(this)
    this.setUserSuppliedWishesForValue = this.setUserSuppliedWishesForValue.bind(
      this
    )
    this.handleFeelingLatelyChange = this.handleFeelingLatelyChange.bind(this)
    this.handleScaleChange = this.handleScaleChange.bind(this)
    this.handleMultiselectChange = this.handleMultiselectChange.bind(this)
    this.moveToNextQuestion = this.moveToNextQuestion.bind(this)
    this.moveToPreviousQuestion = this.moveToPreviousQuestion.bind(this)
    this.postResults = this.postResults.bind(this)

    this.orderedQuestions = [
      'feelingLately',
      'wishesFor',
      'wantsChange',
      'relyUponWhom',
      'howMotivated',
    ]

    this.wishesForOptions = [
      'More time for the things that are important to me',
      'A better connection with family or friends',
      'A sense of community and support',
      'Greater financial security',
      'Moments of peace or happiness',
      'More days where I feel healthy and energized',
      'A doctor or healthcare professional who listens / cares',
    ]

    this.wantsChangeOptions = [
      'Cope better with stress',
      'Feel calmer',
      'Feel more positive and optimistic',
      'Decrease or stop drinking',
      'Decrease or stop drug use',
      'Become tobacco and nicotine free',
      'Get to a healthier weight',
      'Generally live a healthier life',
      'Better manage chronic pain',
    ]

    this.relyUponWhomOptions = [
      'No one',
      'Myself',
      'My spouse or significant other',
      'My parents, siblings or extended family',
      'One or two friends',
      'A community of friends',
      'Religious support',
      'Coworkers',
      'My doctor',
    ]
  }

  isButtonDisabled(question = this.state.currentQuestion) {
    const currentAnswer = this.state.assessmentData[question]
    let isDisabled = true
    if (question === 'feelingLately' && this.scaleTouched['nervousCalm']) {
      isDisabled = false
    } else if (
      question === 'howMotivated' &&
      this.scaleTouched['howMotivated']
    ) {
      isDisabled = false
    } else if (
      question === 'wishesFor' &&
      this.state.userSuppliedWishesForValue
    ) {
      isDisabled = false
    }
    if (currentAnswer instanceof Set && currentAnswer.size >= 1) {
      isDisabled = false
    }
    this.setState({ buttonIsDisabled: isDisabled })
  }

  setUserSuppliedWishesForValue(value) {
    this.setState(prevState => {
      const assessmentData = prevState.assessmentData
      if (assessmentData.wishesFor.has(this.state.userSuppliedWishesForValue)) {
        assessmentData.wishesFor.delete(this.state.userSuppliedWishesForValue)
      }
      if (value) {
        assessmentData.wishesFor.add(value)
      }
      return {
        assessmentData: assessmentData,
        userSuppliedWishesForValue: value,
      }
    }, this.isButtonDisabled)
  }

  handleFeelingLatelyChange(event) {
    const name = event.target.name
    const value = parseInt(event.target.value)
    this.setState(
      prevState => {
        const result = prevState.assessmentData
        result.feelingLately[name] = value
        return {
          assessmentData: result,
        }
      },
      () => {
        this.scaleTouched[name] = true
        this.isButtonDisabled()
      }
    )
  }

  handleScaleChange(event) {
    const name = event.target.name
    const value = parseInt(event.target.value)
    this.setState(
      prevState => {
        const result = prevState.assessmentData
        result[name] = value
        return {
          assessmentData: result,
        }
      },
      () => {
        this.scaleTouched[name] = true
        this.isButtonDisabled()
      }
    )
  }

  handleMultiselectChange(event) {
    const question = event.target.name
    const value = event.target.value

    this.setState(prevState => {
      const result = prevState.assessmentData
      const answers = result[question]
      if (answers.has(value)) {
        answers.delete(value)
      } else {
        if (question === 'wantsChange' && answers.size < 3) {
          answers.add(value)
        } else {
          answers.add(value)
        }
      }
      return {
        assessmentData: result,
      }
    }, this.isButtonDisabled)
  }

  moveToNextQuestion() {
    let nextQuestionNumber = this.state.currentQuestionNumber + 1

    this.postAnswer()

    if (nextQuestionNumber <= this.orderedQuestions.length) {
      let nextQuestion = this.orderedQuestions[nextQuestionNumber] || null

      this.setState(
        {
          currentQuestionNumber: nextQuestionNumber,
          currentQuestion: nextQuestion,
        },
        this.isButtonDisabled
      )
    }
  }

  postAnswer() {
    let currentQuestion = this.state.currentQuestion
    let currentAnswer = this.state.assessmentData[currentQuestion]
    let data = {
      source: this.state.source,
      question: currentQuestion,
    }
    if (currentAnswer instanceof Set) {
      data.answer = Array.from(currentAnswer)
    } else if (typeof currentAnswer === 'number') {
      data.answer = this.convertValue(currentAnswer)
    } else if (currentAnswer.hasOwnProperty('sadHappy')) {
      data.answer = {
        sadHappy: this.convertValue(currentAnswer.sadHappy),
        illWell: this.convertValue(currentAnswer.illWell),
        stressedRelaxed: this.convertValue(currentAnswer.stressedRelaxed),
        angryContent: this.convertValue(currentAnswer.angryContent),
        fearfulConfident: this.convertValue(currentAnswer.fearfulConfident),
        nervousCalm: this.convertValue(currentAnswer.nervousCalm),
      }
    } else {
      data.answer = 'No answer'
    }
    axios.post('/api/assessment/answer', data).catch(err => {
      console.log(err)
      return err
    })
  }

  moveToPreviousQuestion() {
    const currentNumber = this.state.currentQuestionNumber
    if (currentNumber > 1) {
      this.setState(
        {
          currentQuestionNumber: currentNumber - 1,
          currentQuestion: this.orderedQuestions[currentNumber - 1],
        },
        this.isButtonDisabled
      )
    }
  }

  convertValue = value => {
    return Math.round(value / 10)
  }

  postResults(contactInfo) {
    const questions = {
      feelingLately: {
        sadHappy: this.convertValue(
          this.state.assessmentData.feelingLately.sadHappy
        ),
        illWell: this.convertValue(
          this.state.assessmentData.feelingLately.illWell
        ),
        stressedRelaxed: this.convertValue(
          this.state.assessmentData.feelingLately.stressedRelaxed
        ),
        angryContent: this.convertValue(
          this.state.assessmentData.feelingLately.angryContent
        ),
        fearfulConfident: this.convertValue(
          this.state.assessmentData.feelingLately.fearfulConfident
        ),
        nervousCalm: this.convertValue(
          this.state.assessmentData.feelingLately.nervousCalm
        ),
      },
      wishesFor: Array.from(this.state.assessmentData.wishesFor),
      wantsChange: Array.from(this.state.assessmentData.wantsChange),
      relyUponWhom: Array.from(this.state.assessmentData.relyUponWhom),
      howMotivated: this.convertValue(this.state.assessmentData.howMotivated),
    }
    return axios
      .post('/api/assessment', {
        questions,
        contactInfo,
        source: this.state.source,
      })
      .then(response => {
        this.setState({
          serverResponse: response,
        })
        // Send the result to the contact info form matching the shape it expects
        return {
          data: {
            results: response.data.results.contactInfo,
          },
        }
      })
  }

  componentDidMount() {
    let params = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    })
    this.setState(prevState => {
      let result = {
        source: params.source
          ? params.source
              .replace(/[^\w\s]/gi, '')
              .trim()
              .toLowerCase()
          : null,
      }
      if (
        params.q &&
        isNaN(parseInt(params.q)) === false &&
        parseInt(params.q) === 1 &&
        (params.v &&
          isNaN(parseFloat(params.v)) === false &&
          parseFloat(params.v) >= 1 &&
          parseFloat(params.v) <= 100)
      ) {
        const assessmentData = prevState.assessmentData
        assessmentData.feelingLately.sadHappy = parseFloat(params.v)

        result.currentQuestionNumber = parseInt(params.q) - 1
        result.currentQuestion = this.orderedQuestions[parseInt(params.q) - 1]
        result.assessmentData = assessmentData

        this.scaleTouched.sadHappy = true
      }
      return result
    }, this.isButtonDisabled)
  }

  render() {
    const totalQuestionsNumber = this.orderedQuestions.length
    return (
      <div className="assessment-screen">
        <div className="screen-heading logo">
          <OnTrakLogo />

          {this.state.currentQuestionNumber >= 1 ? (
            <Link to="/">
              <div className="back-link">
                <span>Back to stayontrak.com</span>

                <svg>
                  <Icons />
                  <use xlinkHref="#icon-assessment-exit-x" />
                </svg>
              </div>
            </Link>
          ) : (
            <div className="phone">
              Questions?{' '}
              <a href="tel:+01-866-517-1417">Call us at 1-866-517-1417</a>
            </div>
          )}
        </div>

        {this.state.currentQuestion === 'feelingLately' && (
          <section className="page-intro-block start-assessment">
            <h1>Take the first step!</h1>

            <p>Complete this assessment.</p>
          </section>
        )}

        {this.state.currentQuestionNumber > 0 &&
          this.state.currentQuestionNumber < this.orderedQuestions.length && (
            <section className="assessment-progress">
              <div>
                Question {this.state.currentQuestionNumber + 1} of{' '}
                {totalQuestionsNumber}
              </div>
              <progress
                value={this.state.currentQuestionNumber + 1}
                max={totalQuestionsNumber}
              />
            </section>
          )}

        {this.state.currentQuestionNumber < this.orderedQuestions.length ? (
          <section
            className={`assessment-card ${
              this.state.currentQuestion === 'feelingLately'
                ? 'first-question'
                : ''
            } ${this.state.source ? '' : 'is-landing-page'}`}
          >
            {this.state.currentQuestion === 'feelingLately' && (
              <FeelingLately
                feelingLately={this.state.assessmentData.feelingLately}
                scaleTouched={this.scaleTouched}
                changeHandler={this.handleFeelingLatelyChange}
              />
            )}

            {this.state.currentQuestion === 'wishesFor' && (
              <div className="assessment-question">
                <h1>What do you wish you had in your life?</h1>
                <p>[check all that apply]</p>

                <div className="multiselect-group">
                  {this.wishesForOptions.map((labelValue, i) => {
                    return (
                      <label key={i} className="button-style-checkbox">
                        <input
                          type="checkbox"
                          name="wishesFor"
                          value={labelValue}
                          onChange={this.handleMultiselectChange}
                          checked={this.state.assessmentData.wishesFor.has(
                            labelValue
                          )}
                        />
                        <span className="free-height">{labelValue}</span>
                      </label>
                    )
                  })}

                  <label
                    className={`button-style-checkbox label-styling ${
                      this.state.userSuppliedWishesForValue ? 'checked' : ''
                    }`}
                  >
                    <ClickToEdit
                      setEditedValue={this.setUserSuppliedWishesForValue}
                      priorValue={this.state.userSuppliedWishesForValue}
                      maxLength={70}
                    >
                      <span>
                        {this.state.userSuppliedWishesForValue
                          ? this.state.userSuppliedWishesForValue
                          : 'Other [insert your own]'}
                      </span>
                    </ClickToEdit>
                  </label>
                </div>
              </div>
            )}

            {this.state.currentQuestion === 'wantsChange' && (
              <div className="assessment-question">
                <h1>What do you most want to change in your life?</h1>
                <p>[choose up to 3]</p>

                <div className="multiselect-group wants-change">
                  {this.wantsChangeOptions.map((labelValue, i) => {
                    return (
                      <label key={i} className="button-style-checkbox">
                        <input
                          type="checkbox"
                          name="wantsChange"
                          value={labelValue}
                          onChange={this.handleMultiselectChange}
                          checked={this.state.assessmentData.wantsChange.has(
                            labelValue
                          )}
                          disabled={
                            this.state.assessmentData.wantsChange.size >= 3 &&
                            !this.state.assessmentData.wantsChange.has(
                              labelValue
                            )
                          }
                        />
                        <span className="free-height">{labelValue}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            )}

            {this.state.currentQuestion === 'relyUponWhom' && (
              <div className="assessment-question">
                <h1>
                  When you are feeling stressed or down, who do you rely on?
                </h1>
                <p>[check all that apply]</p>

                <div className="multiselect-group">
                  {this.relyUponWhomOptions.map((labelValue, i) => {
                    return (
                      <label key={i} className="button-style-checkbox">
                        <input
                          type="checkbox"
                          name="relyUponWhom"
                          value={labelValue}
                          onChange={this.handleMultiselectChange}
                          checked={this.state.assessmentData.relyUponWhom.has(
                            labelValue
                          )}
                        />
                        <span className="free-height">{labelValue}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            )}

            {this.state.currentQuestion === 'howMotivated' && (
              <div className="assessment-question">
                <h1>
                  How ready do you feel to make changes, on a scale of 0-10?
                </h1>

                <div className="assessment-scale show-value">
                  <label className="assessment-label">0</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    name="howMotivated"
                    value={this.state.assessmentData.howMotivated}
                    onChange={this.handleScaleChange}
                  />
                  <label className="assessment-label">10</label>
                </div>

                <div>
                  <span>
                    {Math.round(this.state.assessmentData.howMotivated / 10)}
                  </span>
                </div>
              </div>
            )}

            {this.state.currentQuestion && (
              <div className="question-navigation-group">
                <button
                  type="button"
                  className="link-styled"
                  onClick={this.moveToPreviousQuestion}
                  style={{
                    visibility:
                      this.state.currentQuestionNumber === 0
                        ? 'hidden'
                        : 'visible',
                  }}
                >
                  <SmallArrow direction="left" /> Previous question
                </button>

                <button
                  type="button"
                  className="button-primary"
                  onClick={this.moveToNextQuestion}
                  disabled={this.state.buttonIsDisabled}
                >
                  {this.state.currentQuestionNumber >=
                  this.orderedQuestions.length
                    ? `Submit Results ${<SmallArrow />}`
                    : 'I’m done choosing'}
                </button>
              </div>
            )}
          </section>
        ) : (
          <AssessmentResults
            assessmentData={this.state.assessmentData}
            wishesForOptions={this.wishesForOptions}
            wantsChangeOptions={this.wantsChangeOptions}
            relyUponWhomOptions={this.relyUponWhomOptions}
          >
            <div className="page-heading-block ready-to-talk">
              <h2>Ready to talk?</h2>
              <p>Call us now at <b><a href="tel:+01-866-517-1417">1-866-517-1417</a></b>
              </p>
              <p>Email us at <b><a href="mailto:contact@stayontrak.com">contact@stayontrak.com</a></b>
              </p>
              <p>Or fill out the form below to book a callback:</p>
            </div>
            <FormCallback
              onSubmit={this.postResults}
              isSimplified={true}
              isAssessment={true}
            />
          </AssessmentResults>
        )}
      </div>
    )
  }
}

const FeelingLately = ({
  feelingLately = {},
  scaleTouched = {},
  changeHandler = f => f,
}) => {
  return (
    <div className="assessment-question">
      <h2>Can you tell me how you’ve been feeling lately?</h2>

      <div className="assessment-scale">
        <label className="assessment-label">Sad</label>
        <input
          type="range"
          min="1"
          max="100"
          name="sadHappy"
          value={feelingLately.sadHappy}
          onChange={changeHandler}
        />
        <label className="assessment-label">Happy</label>
      </div>

      {scaleTouched.sadHappy && (
        <div className="assessment-scale">
          <label className="assessment-label">Very ill</label>
          <input
            type="range"
            min="1"
            max="100"
            name="illWell"
            value={feelingLately.illWell}
            onChange={changeHandler}
          />
          <label className="assessment-label">Generally well</label>
        </div>
      )}

      {scaleTouched.illWell && (
        <div className="assessment-scale">
          <label className="assessment-label">Very stressed</label>
          <input
            type="range"
            min="1"
            max="100"
            step="any"
            name="stressedRelaxed"
            value={feelingLately.stressedRelaxed}
            onChange={changeHandler}
          />
          <label className="assessment-label">Mostly relaxed</label>
        </div>
      )}

      {scaleTouched.stressedRelaxed && (
        <div className="assessment-scale">
          <label className="assessment-label">Angry</label>
          <input
            type="range"
            min="1"
            max="100"
            name="angryContent"
            value={feelingLately.angryContent}
            onChange={changeHandler}
          />
          <label className="assessment-label">Content</label>
        </div>
      )}

      {scaleTouched.angryContent && (
        <div className="assessment-scale">
          <label className="assessment-label">Fearful</label>
          <input
            type="range"
            min="1"
            max="100"
            name="fearfulConfident"
            value={feelingLately.fearfulConfident}
            onChange={changeHandler}
          />
          <label className="assessment-label">Confident</label>
        </div>
      )}

      {scaleTouched.fearfulConfident && (
        <div className="assessment-scale">
          <label className="assessment-label">Nervous</label>
          <input
            type="range"
            min="1"
            max="100"
            name="nervousCalm"
            value={feelingLately.nervousCalm}
            onChange={changeHandler}
          />
          <label className="assessment-label">Calm</label>
        </div>
      )}
    </div>
  )
}
