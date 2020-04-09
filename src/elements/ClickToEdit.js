import React from 'react'
import PropTypes from 'prop-types'

export class ClickToEdit extends React.Component {
  static propTypes = {
    setEditedValue: PropTypes.func,
    priorValue: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      currentValue: props.priorValue,
    }

    this.maxLength = this.props.maxLength || 70
    this.toggleEditingState = this.toggleEditingState.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSaveInput = this.handleSaveInput.bind(this)
    this.checkForSpecialKey = this.checkForSpecialKey.bind(this)
  }

  toggleEditingState() {
    if (this.state.isEditing) {
      this.setState({ isEditing: false })
    } else {
      this.setState({ isEditing: true })
    }
  }

  handleInputChange(event) {
    if (event.target.value.length <= this.maxLength) {
      this.setState({ currentValue: event.target.value })
    }
  }

  handleSaveInput(event) {
    this.props.setEditedValue(event.target.value)

    this.toggleEditingState()
  }

  checkForSpecialKey(event) {
    if (event.key === 'Enter') {
      this.handleSaveInput(event)
    }

    if (event.key === 'Escape') {
      this.toggleEditingState()
    }
  }

  render() {
    return (
      <div>
        {this.state.isEditing ? (
          <div>
            <input
              type="text"
              value={this.state.currentValue}
              onChange={this.handleInputChange}
              onBlur={this.handleSaveInput}
              onKeyDown={this.checkForSpecialKey}
            />
          </div>
        ) : (
          <div onClick={this.toggleEditingState}>
            {this.state.currentValue.length > 0 && (
              <input
                type="checkbox"
                style={{ display: 'none' }}
                checked="checked"
              />
            )}
            {this.props.children}
          </div>
        )}
      </div>
    )
  }
}
