import * as reducers from './reducers'

import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'

import sagas from './sagas'

export default (socket, exchange) => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = applyMiddleware(sagaMiddleware)
  const store = createStore(
    combineReducers(reducers),
    middleware
  )

  sagaMiddleware.run(sagas, socket, exchange)

  return store
}
