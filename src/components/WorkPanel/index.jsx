import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Icon from '../../ui/Icon'
import Container from '../../ui/Container'

import { TimeLabel, EnergyLabel, SkillLabel } from '../../ui/Label'

import * as controlActions from '../../actions/controlActions'

import { iconMap } from '../../data/const'
import { findToolByNameLevel } from '../../data/tool'
import { timeFormat } from '../../utils/common'

import style from './style.styl'

@connect(({ control, status }) => ({ ...control, status }), controlActions)
export default class WorkPanel extends Component {
  work (workOrder) {
    return () => {
      this.props.work(workOrder)
      this.props.activePanel('')
    }
  }

  render () {
    const laptop = findToolByNameLevel('laptop', this.props.status.tool.laptop)
    const duringReduce = 1 - (!!laptop ? laptop.buff.workingTime : 0)
    const workOrderList = this.props.workOrder.map((workOrder, i) => {
      const { name, during, energy, skills, pay } = workOrder
      const energyHave = this.props.status.energy.value
      const reduceDuring = Math.floor(during * duringReduce)
      const actualWorkOrder = { ...workOrder, reduceDuring }

      const skillList = skills.map((skill, idx) => {
        const { name, level } = skill
        return (
          <SkillLabel icon={iconMap[name]} text={level} key={idx} />
        )
      })
      const hasEnoughEnergy = energyHave >= energy
      const workOrderClass = classnames(style.workOrder, {
        [`${style.disable}`]: !hasEnoughEnergy
      })
      const energyClass = classnames({
        notEnough: !hasEnoughEnergy
      })
      return (
        <li className={workOrderClass} onClick={hasEnoughEnergy ? ::this.work(actualWorkOrder) : () => {}} key={i}>
          <div className={style.workDetail}>
            <h3 className={style.workTitle}>{name}</h3>
            <ul className={style.workRequirements}>
              <TimeLabel text={timeFormat(reduceDuring)} />
              <EnergyLabel className={energyClass} text={energy} />
              {skillList}
            </ul>
          </div>
          <div className={style.workPay}>
            <Icon icon='usd' />{pay}
          </div>
        </li>
      )
    })
    return (
      <Container>
        <ul>
          {workOrderList}
        </ul>
      </Container>
    )
  }
}
