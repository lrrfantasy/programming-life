import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Icon from '../../ui/Icon'
import { TimeLabel, EnergyLabel, PayLabel } from '../../ui/Label'
import Container from '../../ui/Container'

import * as controlActions from '../../actions/controlActions'

import studyOrders from '../../data/studyOrder'
import { timeFormat } from '../../utils/common'

import style from './style.styl'

@connect(({ status }) =>({ status }), controlActions)
export default class StudyPanel extends Component {
  study (studyOrder) {
    return () => {
      this.props.study(studyOrder)
      this.props.activePanel('')
    }
  }
  render () {
    const energyHave = this.props.status.energy.value
    const moneyHave = this.props.status.money
    const orderList = studyOrders.map((study, idx) => {
      const { skill, during, energy, pay } = study
      const hasEnoughEnergy = energyHave >= energy
      const hasEnoughMoney = moneyHave >= pay
      const studyOrderClass = classnames(style.studyOrder, {
        [`${style.disable}`]: !hasEnoughEnergy || !hasEnoughMoney
      })
      const energyClass = classnames({
        notEnough: !hasEnoughEnergy
      })
      const moneyClass = classnames({
        notEnough: !hasEnoughMoney
      })
      return (
        <li className={studyOrderClass} onClick={::this.study(study)} key={idx}>
          <div className={style.studyPay}>
            <Icon icon='question' />
          </div>
          <span className={style.studySkill}>{skill}</span>
          <ul className={style.studyTime}>
            <TimeLabel text={timeFormat(during)} />
            <EnergyLabel className={energyClass} text={energy} />
            <PayLabel className={moneyClass} text={pay} />
          </ul>
        </li>
      )
    })
    return (
      <Container>
        <ul className={style.studyOrders}>
          {orderList}
        </ul>
      </Container>
    )
  }
}
