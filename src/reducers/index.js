import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import status from './status'
import control from './control'

const rootReducer = combineReducers({
  status,
  control,
  routing
})

export default rootReducer
