import * as reducers from './reducers'

import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'

import sagas from './sagas'

const rootReducer = combineReducers(reducers)
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    'production' !== process.env.NODE_ENV && global.devToolsExtension ?
      global.devToolsExtension() :
      f => f
  )
)

sagaMiddleware.run(sagas)

if ('production' !== process.env.NODE_ENV && module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    /* eslint global-require: ["off"] */
    const nextRootReducer = require('./reducers').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
