import React from 'react'
import PropTypes from 'prop-types'

import SmallArrow from '../elements/SmallArrowIcon'

import '../stylesheets/components/coaches.scss'

import coachImageKathleen from '../images/photo-coach-KathleenH.jpg'
import coachImageSarah from '../images/photo-coach-SarahH.jpg'
import coachImageJillian from '../images/photo-coach-JillianM.jpg'
import coachImageJodi from '../images/photo-coach-JodiM.jpg'
import coachImageKristy from '../images/photo-coach-KristyH.jpg'
import coachImageAshley from '../images/photo-coach-AshleyB.jpg'
import coachImageStacie from '../images/photo-coach-StacieP.jpg'
import coachImageJenniferT from '../images/photo-coach-JenniferT.jpg'

const coaches = [
  {
    firstName: 'Kristy',
    lastName: 'H',
    credentials: 'Care Coach',
    photo: coachImageKristy,
    content:
      'Physical and emotional pain can make you feel hopeless. Kristy knows that hopelessness can make it feel like no one understands you. Her goal is to support you and help you find relief and strength.',
  },
  {
    firstName: 'Kathleen',
    lastName: 'H',
    credentials: 'Care Coach',
    photo: coachImageKathleen,
    content:
      'Kathy believes that feeling lonely impacts everyday life. She is an active listener who wants to build a strong connection with you. Her goal is to give hope to people with pain, depression, or substance use.',
  },
  {
    firstName: 'Ashley',
    lastName: 'B',
    credentials: 'Care Coach',
    photo: coachImageAshley,
    content:
      'Ashley believes that no one should suffer in silence. Her supportive nature and calm style are comforting during sad or angry times. She wants to help you plan a bright future and be your best with support from the program and your community',
  },
  {
    firstName: 'Sarah',
    lastName: 'H',
    credentials: 'Care Coach',
    photo: coachImageSarah,
    content:
      'Sarah knows that life can feel random, but better days are on the horizon! Sarah is someone you can count on to support you and help you figure out how to take charge of your life. Building a strong and positive support network starts with Sarah.',
  },
  {
    firstName: 'Jillian',
    lastName: 'M',
    credentials: 'Care Coach',
    photo: coachImageJillian,
    content:
      'Jillian wants to help make positive change in your life with kindness and support. She believes that differences are a good thing. Jillian will do all she can to support your overall wellness.',
  },
  {
    firstName: 'Stacie',
    lastName: 'P',
    credentials: 'Care Coach',
    photo: coachImageStacie,
    content:
      'Traumatic events can make you feel alone. Stacie will help you take back your life by giving you a safe space to talk about feelings of anger, rejection, or grief. Your story matters, and Stacie will help you feel stronger and more powerful one day at a time.',
  },
  {
    firstName: 'Jennifer',
    lastName: 'T',
    credentials: 'Care Coach',
    photo: coachImageJenniferT,
    content:
      'Traumatic experiences should not follow you the rest of your life. Jennifer believes that your hard times do not define you, no matter how hard they have been. With Jennifer’s support, you can create a healthy, happy tomorrow.',
  },
  {
    firstName: 'Jodi',
    lastName: 'M',
    credentials: 'Care Coach',
    photo: coachImageJodi,
    content:
      'You can be your best self! Jodi will help you handle hard times and learn to deal with everyday events. By listening and understanding, she can help you work through tough times and meet your mental and physical goals.',
    },
  ]

class Coaches extends React.Component {
  static propTypes = {
    displayCoach: PropTypes.number,
    headerText: PropTypes.string,
    headerPosition: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      currentCoach: coaches[props.displayCoach] || coaches[0],
    }
  }

  moveToNextCoach() {
    const lastCoach = coaches.length - 1
    const coachIndex = coaches.indexOf(this.state.currentCoach)

    // when last coach is reached, loop back to first coach
    if (coachIndex < lastCoach) {
      this.setState({ currentCoach: coaches[coachIndex + 1] })
    } else {
      this.setState({ currentCoach: coaches[0] })
    }
  }

  render() {
    const headingText = this.props.headerText || 'Meet Our Coaches'
    const headingPosition = this.props.headerPosition || 'inside'
    // const photoStyle = this.props.imageSize || 'full-bleed';

    return (
      <div className={`coaches-component`}>
        {headingPosition === 'above' ? <h3>{headingText}</h3> : null}

        <article>
          <div className="coach-photo">
            <img src={this.state.currentCoach.photo} alt="" />
          </div>

          <div className="coach-content">
            {headingPosition === 'inside' ? <h4>{headingText}</h4> : null}

            <blockquote>
              {this.state.currentCoach.content}

              <cite>
                — {this.state.currentCoach.firstName},{' '}
                {this.state.currentCoach.credentials}
              </cite>
            </blockquote>

            <div>
              <button
                type="button"
                className="link-styled arrow-link"
                onClick={() => this.moveToNextCoach()}
              >
                Meet the next coach <SmallArrow cssClass="next-coach-arrow" />
              </button>
            </div>
          </div>
        </article>
      </div>
    )
  }
}

export default Coaches
