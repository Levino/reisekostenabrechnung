import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_TRIP_SUCCESS,
  DELETE_TRIP_SUCCESS,
  UPDATE_TRIP_SUCCESS
} from './action-types';


export const initialState = {
  deleted: null,
  list: [],
  previous: []
};


export function tripsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TRIP_SUCCESS:
      return {
        deleted: null,
        list: (state.deleted && state.deleted.key === action.payload.key) ?
              [ ...state.previous ] :
              [ action.payload, ...state.list ],
        previous: []
      };

    case DELETE_TRIP_SUCCESS:
      return {
        deleted: action.payload,
        list: state.list.filter(trip => {
          return trip.key !== action.payload.key;
        }),
        previous: [ ...state.list ]
      };

    case UPDATE_TRIP_SUCCESS:
      return {
        deleted: null,
        list: state.list.map(trip => {
          return trip.key === action.payload.key ? action.payload : trip;
        }),
        previous: []
      };

    case SIGN_OUT_SUCCESS:
      return {
        deleted: null,
        list: [],
        previous: []
      };

    default:
      return state;
  }
}
