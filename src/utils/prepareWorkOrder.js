import R from 'ramda'

import { software, theme, company } from '../data/workOrder'
import { randomOf, randomSomeOf } from '../utils/common'

import config from '../config'

const duringMultiplier = config.debug ? 1 : 60

const { floor, random, sqrt } = Math

const coefs = {
  zeroLevel: 0.2,
  oneLevel: 0.5,
  twoLevel: 0.2,
  removal: 0.5,
  oneSkill: 0.6,
  twoSkill: 0.25,
  threeSkill: 0.1
}

const adjustLevel = level => {
  const coef = random()
  const dLevel = coef <= coefs.zeroLevel
    ? 0
    : coef <= coefs.zeroLevel + coefs.oneLevel
      ? -1
      : coef <= coefs.zeroLevel + coefs.oneLevel + coefs.twoLevel
        ? -2
        : -3
  return level + dLevel
}

const adjustSkill = skills => {
  const coef = random()
  const dSkill = coef <= coefs.oneSkill
    ? 1
    : coef <= coefs.oneSkill + coefs.twoSkill
      ? 2
      : coef <= coefs.oneSkill + coefs.twoSkill + coefs.threeSkill
        ? 3
        : 4
  return randomSomeOf(skills, dSkill)
}

const randomName = () => {
  const softwareName = randomOf(software)
  const themeName = randomOf(theme)
  const companyName = randomOf(company)
  return `A ${themeName} ${softwareName} by ${companyName}`
}
const scale = basic => floor((random() * 1.5 + 1) * sqrt(basic) * 5)
const scalePay = (basic, level) => floor(basic * 10 * (random() * 0.4 + 0.8) * level)

function oneWorkOrder (skills) {
  const orderSkills = adjustSkill(skills.map(skill => {
    const level = Math.max(adjustLevel(skill.level), 1)
    return {
      name: skill.name,
      level
    }
  }))
  const totalSkillLevel = orderSkills.reduce((mem, cur) => mem + cur.level, 0)
  const during = scale(totalSkillLevel)
  return {
    name: randomName(),
    during: during * duringMultiplier,
    energy: Math.floor(during * 1.5),
    skills: orderSkills,
    pay: scalePay(during, totalSkillLevel)
  }
}

export default function prepareWorkOrder (skills, amount) {
  return R.times(() => oneWorkOrder(skills))(amount)
}
