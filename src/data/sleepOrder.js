import config from '../config'
const duringMultiplier = config.debug ? 1 : 60

export default [
  { energy: 30, during: 10 * duringMultiplier },
  { energy: 70, during: 30 * duringMultiplier },
  { energy: 120, during: 60 * duringMultiplier }
]
