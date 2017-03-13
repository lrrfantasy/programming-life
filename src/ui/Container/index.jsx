import React from 'react'
import classnames from 'classnames'
import style from './style.styl'

export default ({ classes = [], children }) => (
  <div className={classnames(...classes, style.container)}>
    {children}
  </div>
)
