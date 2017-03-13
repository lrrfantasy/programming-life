import { handleActions } from 'redux-actions'

const initialState = {
  event: {
    type: 'idle'
  },
  panel: '',
  workOrder: []
}

export default handleActions({
  'active panel' (state, action) {
    return {...state, ...action.payload}
  },
  'fetch work order' (state, action) {
    return {...state, ...action.payload}
  },
  'work' (state, action) {
    return {...state, ...action.payload}
  },
  'sleep' (state, action) {
    return {...state, ...action.payload}
  },
  'study' (state, action) {
    return {...state, ...action.payload}
  },
  'get event' (state, action) {
    if (action.payload.event) {
      return {...state, ...action.payload}
    }
    return state
  },
  'send event completable' (state, action) {
    return {...state, ...action.payload}
  },
  'complete event' (state, action) {
    return {...state, ...action.payload}
  },
  'get work order' (state, action) {
    return {...state, ...action.payload}
  }
}, initialState)
