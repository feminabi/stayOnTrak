import React from 'react'
import PropTypes from 'prop-types'

import Link from 'gatsby-link'

import SmallArrow from '../elements/SmallArrowIcon'

import '../stylesheets/components/assessment-entry-card.scss'

export default class AssessmentEntryCard extends React.Component {
  static propTypes = {
    source: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      sadHappy: 50,
    }

    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler(event) {
    this.setState({ sadHappy: event.target.value })
  }

  render() {
    return (
      <div className="content-block-small">
        <div className="assessment-entry-card">
          <p>Can you tell me how you’ve been feeling lately?</p>

          <div className="assessment-scale">
            <label className="assessment-label">Sad</label>
            <input
              type="range"
              min="1"
              max="100"
              name="sadHappy"
              value={this.state.sadHappy}
              onChange={this.changeHandler}
            />
            <label className="assessment-label">Happy</label>
          </div>

          <div className="link-next-question">
            <Link
              to={`assessment?q=1&v=${this.state.sadHappy}&source=${
                this.props.source
              }`}
              className="arrow-link"
            >
              <button className="button button-primary smaller">
                Next question <SmallArrow />
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

AssessmentEntryCard.propTypes = {
  source: PropTypes.string,
}
