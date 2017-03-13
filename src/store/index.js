import { createStore, applyMiddleware } from 'redux'

import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'
import { logger } from '../middleware'
import rootReducer from '../reducers'

export default function configure(initialState, processEnv) {
  const env = processEnv.NODE_ENV
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  let createStoreWithMiddleware
  if (env === 'development') {
    createStoreWithMiddleware = applyMiddleware(
      logger,
      thunk,
      promiseMiddleware
    )(create)
  } else {
    createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk)(create)
  }

  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
