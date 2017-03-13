import { Router, Route, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createHashHistory from 'history/lib/createHashHistory'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import Homepage from './containers/Homepage'
import configure from './store'

import './styles/main.styl'
import 'font-awesome/css/font-awesome.min.css'

const store = configure(undefined, process.env)

const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Homepage}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
