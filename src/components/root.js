import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';

// Config
import { SIGN_IN_PATH, TRIPS_PATH } from 'src/config';

// Components
import App from './app/app';
import SignIn from './sign-in/sign-in';
import Trips from './trips/trips';


export function Root({history, onEnter, store}) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route component={App} onEnter={onEnter} path="/">
          <Route component={SignIn} path={SIGN_IN_PATH} />
          <Route component={Trips} path={TRIPS_PATH} />
        </Route>
      </Router>
    </Provider>
  );
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  onEnter: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
};
