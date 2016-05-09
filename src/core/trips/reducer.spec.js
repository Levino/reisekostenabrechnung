/* eslint-disable no-undefined */
import { SIGN_OUT_SUCCESS } from 'src/core/auth';

import {
  CREATE_TRIP_SUCCESS,
  DELETE_TRIP_SUCCESS,
  UPDATE_TRIP_SUCCESS
} from './action-types';

import { initialState, tripsReducer } from './reducer';


describe('Trips reducer', () => {
  let trip1;
  let trip2;

  beforeEach(() => {
    trip1 = {completed: false, key: '0', title: 'trip 1'};
    trip2 = {completed: false, key: '1', title: 'trip 2'};
  });


  function getInitialState() {
    return Object.assign({}, initialState);
  }


  it('should return the initial state when action.type is not found', () => {
    expect(tripsReducer(undefined, {})).toEqual(getInitialState());
  });


  describe('CREATE_TRIP_SUCCESS', () => {
    it('should prepend new trip to list', () => {
      let state = getInitialState();
      state.list = [ trip1 ];

      let nextState = tripsReducer(state, {
        type: CREATE_TRIP_SUCCESS,
        payload: trip2
      });

      expect(nextState).toEqual({
        deleted: null,
        list: [ trip2, trip1 ],
        previous: []
      });
    });
  });


  describe('DELETE_TRIP_SUCCESS', () => {
    it('should remove trip from list', () => {
      let state = getInitialState();
      state.list = [trip1, trip2];

      let nextState = tripsReducer(state, {
        type: DELETE_TRIP_SUCCESS,
        payload: trip2
      });

      expect(nextState).toEqual({
        deleted: trip2,
        list: [trip1],
        previous: [trip1, trip2]
      });
    });
  });


  describe('UPDATE_TRIP_SUCCESS', () => {
    it('should update trip', () => {
      let state = getInitialState();
      state.list = [trip1, trip2];

      let changedTrip2 = Object.assign({}, trip2, {title: 'changed'});

      let nextState = tripsReducer(state, {
        type: UPDATE_TRIP_SUCCESS,
        payload: changedTrip2
      });

      expect(nextState).toEqual({
        deleted: null,
        list: [trip1, changedTrip2],
        previous: []
      });
    });
  });


  describe('SIGN_OUT_SUCCESS', () => {
    it('should reset state', () => {
      let state = {
        deleted: true,
        list: [{}],
        previous: [{}, {}]
      };

      expect(tripsReducer(state, {
        type: SIGN_OUT_SUCCESS
      })).toEqual(getInitialState());
    });
  });
});
