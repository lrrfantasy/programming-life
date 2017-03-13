import { handleActions } from 'redux-actions'

const initialState = {
  skill: [
    { name: 'frontend', level: 1, exp: 0 },
    { name: 'backend', level: 1, exp: 0 },
    { name: 'architecture', level: 1, exp: 0 },
    { name: 'mobile', level: 1, exp: 0 }
  ],
  money: 0,
  energy: {
    value: 100,
    max: 100
  },
  tool: {}
}

export default handleActions({
  'fetch status' (state, action) {
    return {...state, ...action.payload}
  },
  'init' (state, action) {
    return {...state, ...action.payload}
  }
}, initialState)
