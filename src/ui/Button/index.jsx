import React, { Component } from 'react'
import classnames from 'classnames'

import Icon from '../../ui/Icon'

import style from './style.styl'

export default props => {
  const handleClick = props.disabled ? () => {} : props.handleClick
  const className = classnames(style.button, {
    [`${style.disable}`]: props.disabled
  })
  return (
    <li className={className} onClick={handleClick}>
      <Icon icon={props.icon} />
      <div>{props.text}</div>
    </li>
  )
}
