import config from '../config'
const duringMultiplier = config.debug ? 1 : 60

export default [
  { skill: 30, during: 10 * duringMultiplier, energy: 15, pay: 200 },
  { skill: 80, during: 30 * duringMultiplier, energy: 50, pay: 800 },
  { skill: 150, during: 60 * duringMultiplier, energy: 100, pay: 2000 }
]
