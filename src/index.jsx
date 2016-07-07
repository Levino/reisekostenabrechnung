import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import tripsApp from './reducers'
import App from './components/app'

let store = createStore(tripsApp)

render(
  <Provider store={store}>
      <App/>
  </Provider>,
  document.getElementById('app'))
