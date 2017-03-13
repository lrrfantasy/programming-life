import React, { Component } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import classnames from 'classnames'

import * as statusActions from '../../actions/statusActions'

import config from '../../config.js'

import Icon from '../../ui/Icon'

import style from './style.styl'

@connect(({ status }) => ({ status }), statusActions)
export default class ToolItem extends Component {
  render () {
    const { type, icon, name, level, maxLevel, description, notPurchased, status: { money } } = this.props
    const stars = R.concat(
      R.times(i => (<Icon icon='star' key={i} />))(level),
      R.times(i => (<Icon icon='star-o' key={level + i}/>))(maxLevel - level)
    )
    const isMaxLevel = level === maxLevel
    const upgradeText = !!level
      ? isMaxLevel ? 'Level Max' : 'Upgrade'
      : 'Purchase'
    const upgradePrice = isMaxLevel ? '' : (config.debug ? 1 : 2000) * (level + 1)
    const hasEnoughMoney = money >= upgradePrice
    const upgradeClass = classnames(style.toolUpgradeButton, {
      [`${style.disable}`]: isMaxLevel || !hasEnoughMoney
    })
    const upgradeTool = (isMaxLevel || !hasEnoughMoney)
      ? () => {}
      : () => this.props.upgradeTool({
        tool: type,
        money: -upgradePrice
      })
    return (
      <li className={style.toolItem}>
        <div className={style.toolIcon}>
          <Icon icon={icon} />
        </div>
        <div className={style.toolDetail}>
          <h3 className={style.toolTitle}>{name}</h3>
          <div className={style.toolStars}>
            {stars}
          </div>
          <p className={style.toolDesc}>{description}</p>
        </div>
        <div className={style.toolUpgrade}
          onClick={upgradeTool}>
          <span className={upgradeClass}>{upgradeText}</span>
          <span className={style.toolUpgradePrice}>{upgradePrice}</span>
        </div>
      </li>
    )
  }
}
