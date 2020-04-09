import React from 'react'
import PropTypes from 'prop-types'

const HamburgerButton = ({
  color = 'currentColor',
  size,
  toggleMenu = f => f,
}) => {
  return (
    <button
      type="button"
      style={{
        border: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        padding: '8px',
        margin: '-8px',
        cursor: 'pointer',
      }}
      onClick={() => toggleMenu()}
      aria-label="open menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 17 17"
        id="icon-hamburger"
      >
        <title>toggle navigation menu</title>
        <line
          x1="1"
          y1="4"
          x2="16"
          y2="4"
          strokeLinecap="round"
          strokeWidth="1.5"
          fill="none"
          stroke={color}
        />
        <line
          x1="1"
          y1="9"
          x2="16"
          y2="9"
          strokeLinecap="round"
          strokeWidth="1.5"
          fill="none"
          stroke={color}
        />
        <line
          x1="1"
          y1="14"
          x2="16"
          y2="14"
          strokeLinecap="round"
          strokeWidth="1.5"
          fill="none"
          stroke={color}
        />
      </svg>
    </button>
  )
}

HamburgerButton.propTypes = {
  size: PropTypes.number,
  toggleMenu: PropTypes.func,
}

export default HamburgerButton
