import React, { Component } from 'react'
import { connect } from 'react-redux'

import Icon from '../../ui/Icon'
import { TimeLabel } from '../../ui/Label'
import Container from '../../ui/Container'

import * as controlActions from '../../actions/controlActions'

import sleepOrders from '../../data/sleepOrder'
import { findToolByNameLevel } from '../../data/tool'
import { timeFormat } from '../../utils/common'

import style from './style.styl'

@connect(({ status }) =>({ status }), controlActions)
export default class SleepPanel extends Component {
  sleep (sleepOrder) {
    return () => {
      this.props.sleep(sleepOrder)
      this.props.activePanel('')
    }
  }
  render () {
    const bathtub = findToolByNameLevel('bathtub', this.props.status.tool.bathtub)
    const energyRate = 1 + (!!bathtub ? bathtub.buff.energyGain : 0)
    const orderList = sleepOrders.map(({ energy, during }, idx) => {
      const increasedEnergy = Math.floor(energy * energyRate)
      return (
        <li className={style.sleepOrder} onClick={::this.sleep({ increasedEnergy, during })} key={idx}>
          <div className={style.sleepPay}>
            <Icon icon='bolt' />
          </div>
          <span className={style.sleepEnergy}>{increasedEnergy}</span>
          <ul className={style.sleepTime}>
            <TimeLabel text={timeFormat(during)} />
          </ul>
        </li>
      )
    })
    return (
      <Container>
        <ul className={style.sleepOrders}>
          {orderList}
        </ul>
      </Container>
    )
  }
}
