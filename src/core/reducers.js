import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { firebaseReducer } from './firebase';
import { notificationReducer } from './notification';
import { tripsReducer } from './trips';


export default combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  notification: notificationReducer,
  routing: routerReducer,
  trips: tripsReducer
});
