import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { notificationActions } from 'src/core/notification';
import { tripsActions } from 'src/core/trips';
import { Notification } from './notification';
import { TripFilters } from './trip-filters';
import { TripForm } from './trip-form';
import { TripList } from './trip-list';


export class Trips extends Component {
  static propTypes = {
    createTrip: PropTypes.func.isRequired,
    deleteTrip: PropTypes.func.isRequired,
    dismissNotification: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
    registerListeners: PropTypes.func.isRequired,
    trips: PropTypes.array.isRequired,
    undeleteTrip: PropTypes.func.isRequired,
    updateTrip: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.registerListeners();
  }

  renderNotification() {
    const {
      dismissNotification,
      notification,
      undeleteTrip
    } = this.props;

    return (
      <Notification
        action={undeleteTrip}
        dismiss={dismissNotification}
        {...notification}
      />
    );
  }

  render() {
    const {
      createTrip,
      deleteTrip,
      location,
      notification,
      trips,
      updateTrip
    } = this.props;

    const { filter } = location.query;

    return (
      <div className="g-row">
        <div className="g-col">
          <TripForm createTrip={createTrip} />
        </div>

        <div className="g-col">
          <TripFilters filter={filter} />
          <TripList
            deleteTrip={deleteTrip}
            filter={filter}
            trips={trips}
            updateTrip={updateTrip}
          />
        </div>

        {notification.display ? this.renderNotification() : null}
      </div>
    );
  }
}

export default connect(state => ({
  notification: state.notification,
  trips: state.trips.list
}), Object.assign({}, tripsActions, notificationActions))(Trips);
