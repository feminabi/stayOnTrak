import React from 'react'
import PropTypes from 'prop-types'

import Coaches from '../components/Coaches'
import OnTrakModules from '../components/OnTrakModules'

// Section 1: 'wishesFor' icons
import moreTime from '../images/icon-more-time.svg'
import timeConnection from '../images/icon-time-connection.svg'
import senseCommunity from '../images/icon-sense-community.svg'
import financialSecurity from '../images/icon-financial-security.svg'
import peaceHappiness from '../images/icon-peace-happiness.svg'
import healthyEnergized from '../images/icon-healthy-energized.svg'
import doctorListens from '../images/icon-doctor-listens.svg'
import other from '../images/icon-other.svg'

import '../stylesheets/components/assessment-results.scss' 

class AssessmentResults extends React.Component {
  constructor(props) {
    super(props)
    this.questions = props.assessmentData
    /**
     * These icons are in the same order as the 'wishesForOptions' values
     */
    this.wishesForIcons = [
      moreTime,
      timeConnection,
      senseCommunity,
      financialSecurity,
      peaceHappiness,
      healthyEnergized,
      doctorListens,
    ]

    /**
     * Default both of these values to 'true', which covers the case of users skipping questions
     */
    this.highSupport = true
    this.highMotivation = true

    if (
      this.questions.relyUponWhom.has(this.props.relyUponWhomOptions[0]) ||
      this.questions.relyUponWhom.has(this.props.relyUponWhomOptions[1])
    ) {
      this.highSupport = false
    }

    // for ui behavior reasons, the scale for this question runs 0-100 (this is resolved back to 0-10 when posting to the server)
    if (
      this.questions.howMotivated !== '' &&
      this.questions.howMotivated <= 30
    ) {
      this.highMotivation = false
    }

    /**
     * Because these values are sent as strings, and because there are more options than
     * modules, we need to map them appropriately. Additionally, some answers could
     * have multiple modules associated with them, so the map value is an array
     */
    const moduleMap = new Map([
      ['Cope better with stress', ['anxiety']],
      ['Feel calmer', ['anxiety']],
      ['Feel more positive and optimistic', ['depression', 'stressManagement']],
      ['Decrease or stop drinking', ['drinkingDrugs']],
      ['Decrease or stop drug use', ['drinkingDrugs']],
      ['Become tobacco and nicotine free', ['smoking']],
      ['Get to a healthier weight', ['weightManagement']],
      ['Generally live a healthier life', ['livingHealthy']],
      ['Better manage chronic pain', ['chronicPain']],
    ])

    /**
     * Map the given answers to the module mapping above, then flatten the array and filter out duplicates
     */
    this.modulesList = Array.from(this.questions.wantsChange)
      .map(wish => moduleMap.get(wish))
      .reduce((a, b) => a.concat(b))
      .filter((value, index, self) => self.indexOf(value) === index)
  }

  /**
   * @description Use the icons array above to return the correct icon given the options array. This depends on the options array being in the correct order.
   * @param {string} goal
   * @returns {string} the SVG string
   * @memberof AssessmentResults
   */
  getWishesForIcon(goal) {
    const index = this.props.wishesForOptions.indexOf(goal)
    if (index >= 0) {
      return this.wishesForIcons[index]
    } else {
      return other
    }
  }

  /**
   * Section 1: Goals (wishesFor)
   *  - Icons for each selected goal
   *  - Hidden if no goals are selected
   * Section 2: Support and Motivation (relyUponWhom, howMotivated)
   *  - Support:
   *    - Low: "No one" || "Just myself"
   *    - High: Anything else or none
   *  - Motivation:
   *    - Low: Motivation < 30
   *    - High: Motivation >= 30 or none
   * Section 3: Coach bios
   * Section 4: What we treat (wantsChange)
   *  - Map answers to treatment options
   */
  render() {
    return (
      <div>
        <div className="page-intro-block results-thanks">
          <h1>Thank you for telling us about yourself!</h1>
          <p>
            Now we can design a personalized program to help you get more of
            what <strong>you</strong> want out of life.
          </p>
        </div>  
        {/** Section 1 **/}
        {this.questions.wishesFor.size && (
          <div className="page-intro-block want-more">
            <p>You want more:</p>
          </div>
        )}
        {this.questions.wishesFor.size && (
          <section>
            <div className="content-block">
              <ul className="three-column-block wishes">
                {Array.from(this.questions.wishesFor).map((goal, i) => (
                  <li key={i}>
                    <img
                      src={this.getWishesForIcon(goal)}
                      className="circle-icon"
                      alt=""
                    />

                    <h4>{goal}</h4>
                  </li>
                ))}
              </ul>
            </div>
            <div className="centered-button-assessment">
              <a href="https://members.stayontrak.com/apply?utm_source=website&utm_medium=apply_button&utm_campaign=website_apply_now" target="_blank" className="arrow-link">
                <button type="button" className="button button-primary smaller applynow">
                    Apply Now
                </button>
              </a>
            </div>  
          </section>
        )}   
        {/** Section 3 **/} 
        <section>
          <div className="content-block here-to-help">
            {this.highSupport &&
              this.highMotivation && (
                <div>
                  <h3>We’re here to help</h3>

                  <p>
                    You’d like to make changes in your life. That’s great!
                    Sometimes change can be hard.
                  </p>

                  <p>
                    It sounds like you have some support, and that will help.
                    But working with someone who understands your challenges and
                    has experience can help you get back on track even faster.
                  </p>

                  <p>
                    With OnTrak, you’ll have a personal coach and a dedicated
                    care team to lean on — and learn from — every step of the
                    way.
                  </p>

                  <p>
                    Take the first step! Schedule a call with a trained OnTrak
                    Specialist today.
                  </p>
                </div>
              )}
            {this.highSupport &&
              !this.highMotivation && (
                <div>
                  <h3>We’re here to help</h3>

                  <p>
                    Even if you’re only a little bit ready, our OnTrak
                    Specialists can help you understand why you might want to
                    change, and give you the tools to take the first step.
                  </p>

                  <p>
                    With OnTrak, you’re never alone. We’ll match you with a
                    personal coach who understands your challenges and has
                    experience to help you get back on track. And you’ll have a
                    dedicated care team to lean on — and learn from — every step
                    of the way.
                  </p>

                  <p>
                    Take the first step! Schedule a call with a trained OnTrak
                    Specialist today.
                  </p>
                </div>
              )}
            {!this.highSupport &&
              this.highMotivation && (
                <div>
                  <h3>We’re here to help</h3>

                  <p>
                    You’d like to make changes in your life. That’s great! With
                    your readiness and our support,{' '}
                    <strong>change is possible</strong>.
                  </p>

                  <p>
                    We’ll match you with a personal coach who understands your
                    challenges and has experience to help you get back on track.
                    And you’ll have a dedicated care team to lean on — and learn
                    from — every step of the way.
                  </p>

                  <p>
                    Take the first step! Schedule a call with a trained OnTrak
                    Specialist today.
                  </p>
                </div>
              )}
            {!this.highSupport &&
              !this.highMotivation && (
                <div>
                  <h3>We’re here to help</h3>
                  <p>
                    Even if you’re only a little bit ready, our OnTrak
                    Specialists can help you understand why you might want to
                    change, and give you the tools to take the first step.
                  </p>

                  <p>
                    With OnTrak’s personalized support,{' '}
                    <strong>change is possible</strong>. We’ll match you with a
                    personal coach who understands your challenges and has
                    experience to help you get back on track. And you’ll have a
                    dedicated care team to lean on — and learn from — every step
                    of the way.
                  </p>

                  <p>
                    Take the first step! Schedule a call with a trained OnTrak
                    Specialist today.
                  </p>
                </div>
              )}

            <Coaches
              headerText={
                'Meet a few of our Nurse Care Coaches who are ready to work with you!'
              }
              headerPosition={'above'}
            />
          </div>
        </section>

        <section>
          <div className="page-heading-block suggestions">
            <h3>
              Based on what you’ve told us, here are some of the OnTrak modules
              that may be a good fit.
            </h3>
          </div>

          <OnTrakModules modulesToDisplay={this.modulesList} />
        </section> 
        <section>{this.props.children}</section>
      </div>
    )
  }
}

AssessmentResults.propTypes = {
  assessmentData: PropTypes.object,
  wishesForOptions: PropTypes.array,
  wantsChangeOptions: PropTypes.array,
  relyUponWhomOptions: PropTypes.array,
}

export default AssessmentResults

