import React, { Component } from 'react'

import style from './style.styl'

export default props => {
  const { value, max } = props
  const barStyle = {
    width: `${value * 100 / max}%`
  }
  return (
    <div className={style.bar}>
      <div className={style.fill} style={barStyle}></div>
      <span className={style.info}>{value} / {max}</span>
    </div>
  )
}
