import thunk from 'redux-thunk';
import { addDataToFirebase, createMockStore } from 'test/utils';

import {
  CREATE_TRIP_SUCCESS,
  DELETE_TRIP_SUCCESS,
  UPDATE_TRIP_SUCCESS
} from './action-types';

import {
  createTrip,
  deleteTrip,
  updateTrip,
  registerListeners
} from './actions';


describe('Trips actions', () => {
  describe('createTrip', () => {
    it('should create CREATE_TRIP_SUCCESS', done => {
      const expectedActions = [action => {
        return action.type === CREATE_TRIP_SUCCESS &&
               action.payload.title === 'create trip';
      }];

      const firebase = new MockFirebase();

      const store = createMockStore({
        auth: {id: '123'},
        firebase: firebase,
        trips: []
      }, expectedActions, [thunk], done);

      store.dispatch(registerListeners());
      store.dispatch(createTrip('create trip'));

      firebase.flush();
    });
  });


  describe('deleteTrip', () => {
    it('should create DELETE_TRIP_SUCCESS', done => {
      const auth = {id: '123'};
      const firebase = new MockFirebase();
      const trip = addDataToFirebase({title: 'delete trip'}, firebase, `trips/${auth.id}`);

      const expectedActions = [
        {type: CREATE_TRIP_SUCCESS, payload: trip},
        {type: DELETE_TRIP_SUCCESS, payload: trip}
      ];

      const store = createMockStore({
        auth,
        firebase,
        trips: []
      }, expectedActions, [thunk], done);

      store.dispatch(registerListeners());
      store.dispatch(deleteTrip(trip));

      firebase.flush();
    });
  });


  describe('updateTrip', () => {
    it('should create UPDATE_TRIP_SUCCESS', done => {
      const auth = {id: '123'};
      const changes = {title: 'updated title'};
      const firebase = new MockFirebase();
      const trip = addDataToFirebase({title: 'update trip'}, firebase, `trips/${auth.id}`);

      const expectedActions = [
        {type: CREATE_TRIP_SUCCESS, payload: trip},
        {type: UPDATE_TRIP_SUCCESS, payload: Object.assign({}, trip, changes)}
      ];

      const store = createMockStore({
        auth,
        firebase,
        trips: []
      }, expectedActions, [thunk], done);

      store.dispatch(registerListeners());
      store.dispatch(updateTrip(trip, changes));

      firebase.flush();
    });
  });
});
