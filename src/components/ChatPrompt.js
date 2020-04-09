import React from 'react'
import PropTypes from 'prop-types'

import Icons from '../elements/Icons'

import '../stylesheets/components/chat-prompt.scss'
import ChatImg from '../images/chat-top.png'
class ChatPrompt extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    try {
      SnapEngage.startLink()
    } catch (e) {
      console.log('SnapEngage API is not available.')
    }
  }

  render() {
    if (process.env.GATSBY_DISABLE_CHAT === undefined) {
      return (
        <div className="chat-prompt mobile-chat" onClick={this.handleClick}>
          <img src={ChatImg}/>
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="47"
              viewBox="0 0 47 47"
            >
              <Icons />
              <use xlinkHref="#icon-chat" />
            </svg>
            <p>Need help? Chat with an OnTrak Specialist</p>
          </span>
        </div>
      )
    } else {
      return null
    }
  }
}

ChatPrompt.propTypes = {}

export default ChatPrompt
