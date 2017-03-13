import React, { Component } from 'react'

import { connect } from 'react-redux'

import * as controlActions from '../../actions/controlActions'

import { timeFormat } from '../../utils/common'
import style from './style.styl'

@connect(state => state.control, controlActions)
export default class EventProgress extends Component {
  constructor () {
    super()
    this.timer = setInterval(() => {
      this.forceUpdate()
    }, 1000)
  }

  componentDidMount () {
    this.props.getEvent()
  }

  shouldComponentUpdate (nextProps) {
    return !(this.props.event.status === 'running' && nextProps.event.status === 'done')
  }

  componentDidUpdate () {
    const { during, timestamp } = this.props.event
    if (Math.floor((Date.now() - timestamp) / 1000) === during) {
      this.props.sendEventCompletable()
    }
  }

  render () {
    const { type, during, timestamp } = this.props.event
    let progressStyle, countdownText
    let timeElapse = !!timestamp
      ? Math.min(Math.floor((Date.now() - timestamp) / 1000), during)
      : null
    if (!timestamp || type === 'idle') {
      progressStyle = {
        width: 0
      }
      countdownText = ''
    } else {
      const width = `${timeElapse * 100 / during}%`
      progressStyle = { width }
      countdownText = timeFormat(during - timeElapse)
    }
    return (
      <div>
        <div className={style.progress}>
          <div className={style.progressElapse} style={progressStyle}></div>
          <div className={style.info}>
            <span>{ type }</span>
            <span>{ countdownText }</span>
          </div>
        </div>
      </div>
    )
  }
}
