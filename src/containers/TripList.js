import { connect } from 'react-redux'
import { toggleTrip } from '../actions'
import SideMenu from '../components/sideMenu'

const getVisibleTrips = (trips, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return trips
    case 'SHOW_COMPLETED':
      return trips.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return trips.filter(t => !t.completed)
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTripClick: (id) => {
      dispatch(toggleTrip(id))
    }
  }
}

const VisibleTripList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu)

export default VisibleTripList