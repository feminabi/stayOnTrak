import React from 'react'
import PropTypes from 'prop-types'

const SmallArrow = ({ direction, cssClass }) => {
  const rotateBy = direction === 'left' ? 180 : 0

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="12"
      viewBox="0 0 21 12"
      className={`small-arrow ${cssClass || ''} ${direction || ''}`}
    >
      <path
        fill="currentColor"
        d="M16.626 4.5H1.682c-.5524 0-1 .4477-1 1s.4476 1 1 1h15.1944l-2.7772 3.046c-.372.408-.343 1.0406.0652 1.4127.408.372 1.0406.343 1.4127-.0652l4.7703-5.2318-.3834-.4288c-.0834-.3015-.3044-.5458-.591-.661L15.5836.3334c-.368-.4117-1.0003-.447-1.412-.079-.4118.368-.447 1.0003-.079 1.412L16.626 4.5z"
        transform={`rotate(${rotateBy} 11 6)`}
      />
    </svg>
  )
}

SmallArrow.propTypes = {
  direction: PropTypes.string,
  cssClass: PropTypes.string,
}

export default SmallArrow
