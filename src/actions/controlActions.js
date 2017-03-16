import { createAction } from 'redux-actions'

import { changeMoney, changeExp, changeEnergy, fetchStatus } from './statusActions'

import { randomSomeOf } from '../utils/common'
import storage from '../utils/storage'
import prepareWorkOrder from '../utils/prepareWorkOrder'

export const activePanel = createAction('active panel', panel => ({ panel }))

export const fetchWorkOrder = createAction('fetch work order', () => {
  return { workOrder: storage.get('workOrder') }
})

export const work = createAction('work', work => {
  const { energy, skills, during, reduceDuring, pay } = work
  const event = {
    type: 'work',
    energy: -energy,
    skills,
    skill: during,
    during: reduceDuring,
    pay,
    timestamp: Date.now(),
    status: 'running'
  }
  storage.set('event', event)
  return { event, workOrder: [] }
})

export const sleep = createAction('sleep', sleep => {
  const { energy, during } = sleep
  const event = {
    type: 'sleep',
    energy,
    during,
    timestamp: Date.now(),
    status: 'running'
  }
  storage.set('event', event)
  return { event }
})

export const study = createAction('study', study => {
  const { skill, pay, energy, during } = study
  const originalSkills = [
    { name: 'frontend' },
    { name: 'backend' },
    { name: 'architecture' },
    { name: 'mobile' }
  ]
  const skills = randomSomeOf(originalSkills, 1)
  const event = {
    type: 'study',
    during,
    skills,
    skill,
    energy: -energy,
    pay: -pay,
    timestamp: Date.now(),
    status: 'running'
  }
  storage.set('event', event)
  return { event }
})

export const getEvent = createAction('get event', () => {
  return { event: storage.get('event') }
})

export const sendEventCompletable = createAction('send event completable', () => {
  let event = storage.get('event')
  event = {...event, ...{
    status: 'done'
  }}
  storage.set('event', event)
  return { event }
})

const complete = createAction('complete event', () => {
  storage.set('event', { type: 'idle' })
  return { event: {
    type: 'idle'
  }}
})

export const completeEvent = () => dispatch => {
  const { skills, skill, during, pay, energy } = storage.get('event')
  if (pay) {
    dispatch(changeMoney(pay))
  }
  if (skills) {
    dispatch(changeExp(skills, skill))
  }
  if (energy) {
    dispatch(changeEnergy(energy))
  }
  dispatch(fetchStatus())
  dispatch(complete())
}

export const getWorkOrder = createAction('get work order', skills => {
  const orderSkills = prepareWorkOrder(skills, 4)
  storage.set('workOrder', orderSkills)
  return {
    workOrder: orderSkills
  }
})
