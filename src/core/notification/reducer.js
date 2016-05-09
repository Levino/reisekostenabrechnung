import { DELETE_TRIP_SUCCESS } from 'src/core/trips';
import { DISMISS_NOTIFICATION } from './action-types';


export const initialState = {
  actionLabel: '',
  display: false,
  message: ''
};


export function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_TRIP_SUCCESS:
      return {
        actionLabel: 'Undo',
        display: true,
        message: 'Trip deleted'
      };

    case DISMISS_NOTIFICATION:
      return {
        actionLabel: '',
        display: false,
        message: ''
      };

    default:
      return {
        actionLabel: '',
        display: false,
        message: ''
      };
  }
}
