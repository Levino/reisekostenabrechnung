import React, { PropTypes } from 'react'
import Trip from './menuItem'
const SideBarMenu = ({trips, onTripClick}) => (
  <ul>
    {trips.map(trip =>
      <Trip
      key={trip.title}
        {...trip}
      onClick={() => onTripClick(trip.id)}/>
    )}
  </ul>
)

SideBarMenu.propTypes = {
  trips: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTripClick: PropTypes.func.isRequired
}

export default SideBarMenu
