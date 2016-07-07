import React, { PropTypes } from 'react'

const Trip = ({ onClick, title }) => (
  <li
    onClick={onClick}>
    {title}
  </li>
)

Trip.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default Trip
