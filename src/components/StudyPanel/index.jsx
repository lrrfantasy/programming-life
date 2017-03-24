import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Icon from '../../ui/Icon'
import { TimeLabel, EnergyLabel, PayLabel } from '../../ui/Label'
import Container from '../../ui/Container'

import * as controlActions from '../../actions/controlActions'

import studyOrders from '../../data/studyOrder'
import { findToolByNameLevel } from '../../data/tool'
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
    const membership = findToolByNameLevel('membership', this.props.status.tool.membership)
    const priceRate = 1 - (!!membership ? membership.buff.studyPrice : 0)
    const orderList = studyOrders.map((study, idx) => {
      const { skill, during, energy, pay } = study
      const reducedPay = Math.floor(pay * priceRate)
      const actualStudy = { ...study, pay: reducedPay }
      const hasEnoughEnergy = energyHave >= energy
      const hasEnoughMoney = moneyHave >= reducedPay
      const studyOrderClass = classnames(style.studyOrder, {
        [`${style.disable}`]: !hasEnoughEnergy || !hasEnoughMoney
      })
      const energyClass = classnames({
        notEnough: !hasEnoughEnergy
      })
      const moneyClass = classnames({
        notEnough: !hasEnoughMoney
      })
      const isDisabled = !hasEnoughEnergy || !hasEnoughMoney
      return (
        <li className={studyOrderClass} onClick={isDisabled ? () => {} : ::this.study(actualStudy)} key={idx}>
          <div className={style.studyPay}>
            <Icon icon='question' />
          </div>
          <span className={style.studySkill}>{skill}</span>
          <ul className={style.studyTime}>
            <TimeLabel text={timeFormat(during)} />
            <EnergyLabel className={energyClass} text={energy} />
            <PayLabel className={moneyClass} text={reducedPay} />
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
