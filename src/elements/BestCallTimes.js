import React from 'react'
import PropTypes from 'prop-types'

const days = [
  'Any Day',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const times = ['Any Time', 'Morning', 'Afternoon', 'Evening']

export default class BestCallTimes extends React.Component {
  static propTypes = {
    updateValue: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      bestDay: days[0],
      bestTime: times[0],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.props.updateValue(this.state)
    })
  }

  componentDidMount() {
    this.props.updateValue(this.state)
  }

  render() {
    return (
      <div className="best-time-controls">
        <div className="dropdown-select">
          <select
            name="bestDay"
            value={this.state.bestDay}
            onChange={this.handleChange}
          >
            {days.map((day, i) => (
              <option key={i} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-select">
          <select
            name="bestTime"
            value={this.state.bestTime}
            onChange={this.handleChange}
          >
            {times.map((time, i) => (
              <option key={i} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}
