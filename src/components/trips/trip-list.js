import React, { Component, PropTypes } from 'react';
import { TripItem } from './trip-item';


export class TripList extends Component {
  static propTypes = {
    deleteTrip: PropTypes.func.isRequired,
    filter: PropTypes.string,
    trips: PropTypes.array.isRequired,
    updateTrip: PropTypes.func.isRequired
  };

  renderTripItems() {
    const {
      deleteTrip,
      filter,
      trips,
      updateTrip
    } = this.props;

    return trips
      .filter(trip => {
        if (filter === 'active') return !trip.completed;
        if (filter === 'completed') return trip.completed;
        return trip;
      })
      .map((trip, index) => {
        return (
          <TripItem
            deleteTrip={deleteTrip}
            key={index}
            trip={trip}
            updateTrip={updateTrip}
          />
        );
      });
  }

  render() {
    return (
      <div className="trip-list">
        {this.renderTripItems()}
      </div>
    );
  }
}
