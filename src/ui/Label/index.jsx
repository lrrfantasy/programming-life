import React, { Component } from 'react'
import classnames from 'classnames'

import Icon from '../Icon'

import style from './style.styl'

export const TimeLabel = props => (<Label type='time' icon='clock-o' {...props} />)
export const EnergyLabel = props => (<Label type='energy' icon='bolt' {...props} />)
export const SkillLabel = props => (<Label type='skill' {...props} />)
export const PayLabel = props => (<Label type='pay' icon='money' {...props} />)

const Label = props => {
  const { type, icon, text, className } = props
  const labelClass = classnames(style.label, style[type], style[className])
  return (
    <li className={labelClass}>
      <Icon icon={icon} />
      {text}
    </li>
  )
}
