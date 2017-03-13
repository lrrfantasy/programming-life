import { createAction } from 'redux-actions'

import storage from '../utils/storage'

export const fetchStatus = createAction('fetch status', () => {
  return storage.get('status')
})

export const upgradeTool = ({ tool, money }) => dispatch => {
  let status = storage.get('status')
  status.tool[tool] = !!status.tool[tool] ? status.tool[tool] + 1 : 1
  storage.set('status', status)
  dispatch(changeMoney(money))
  dispatch(fetchStatus())
}

export const changeEnergy = energy => dispatch => {
  let status = storage.get('status')
  status.energy.value = Math.min(status.energy.value + energy, status.energy.max)
  storage.set('status', status)
}

export const changeMoney = money => dispatch =>  {
  let status = storage.get('status')
  status.money += money
  storage.set('status', status)
}

export const changeExp = (skills, value) => dispatch => {
  let status = storage.get('status')
  const skillName = skills.map(i => i.name)
  let { skill } = status
  skill.forEach(s => {
    if (skillName.includes(s.name)) {
      s.exp += value
      const maxExp = s.level ** 2 * 100
      if (s.exp >= maxExp) {
        s.exp -= maxExp
        s.level += 1
      }
    }
  })
  storage.set('status', status)
}

export const init = createAction('init', () => {
  return storage.set('status', {
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
    tool: {
      bed: 1
    }
  })
})
