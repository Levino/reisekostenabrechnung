import {
  CREATE_TRIP_ERROR,
  CREATE_TRIP_SUCCESS,
  DELETE_TRIP_ERROR,
  DELETE_TRIP_SUCCESS,
  UPDATE_TRIP_ERROR,
  UPDATE_TRIP_SUCCESS
} from './action-types';


export function createTrip(title) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`trips/${auth.id}`)
      .push({completed: false, title}, error => {
        if (error) {
          console.error('ERROR @ createTrip :', error); // eslint-disable-line no-console
          dispatch({
            type: CREATE_TRIP_ERROR,
            payload: error
          });
        }
      });
  };
}


export function deleteTrip(trip) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`trips/${auth.id}/${trip.key}`)
      .remove(error => {
        if (error) {
          console.error('ERROR @ deleteTrip :', error); // eslint-disable-line no-console
          dispatch({
            type: DELETE_TRIP_ERROR,
            payload: error
          });
        }
      });
  };
}


export function undeleteTrip() {
  return (dispatch, getState) => {
    const { auth, firebase, trips } = getState();
    const trip = trips.deleted;

    firebase.child(`trips/${auth.id}/${trip.key}`)
      .set({completed: trip.completed, title: trip.title}, error => {
        if (error) {
          console.error('ERROR @ undeleteTrip :', error); // eslint-disable-line no-console
        }
      });
  };
}


export function updateTrip(trip, changes) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`trips/${auth.id}/${trip.key}`)
      .update(changes, error => {
        if (error) {
          console.error('ERROR @ updateTrip :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_TRIP_ERROR,
            payload: error
          });
        }
      });
  };
}


export function registerListeners() {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();
    const ref = firebase.child(`trips/${auth.id}`);

    ref.on('child_added', snapshot => dispatch({
      type: CREATE_TRIP_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_changed', snapshot => dispatch({
      type: UPDATE_TRIP_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_removed', snapshot => dispatch({
      type: DELETE_TRIP_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));
  };
}


function recordFromSnapshot(snapshot) {
  let record = snapshot.val();
  record.key = snapshot.key();
  return record;
}
