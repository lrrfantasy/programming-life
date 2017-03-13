import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Icon from '../../ui/Icon'
import Button from '../../ui/Button'
import Container from '../../ui/Container'

import * as controlActions from '../../actions/controlActions'

import style from './style.styl'

@connect(({control, status}) => ({control, status}), controlActions)
export default class ControlPanel extends Component {
  componentDidMount () {
    this.props.fetchWorkOrder()
  }

  work () {
    const { skill } = this.props.status
    if (!this.props.control.workOrder || this.props.control.workOrder.length === 0) {
      this.props.getWorkOrder(skill)
    }
    this.props.activePanel('work')
  }

  sleep () {
    this.props.activePanel('sleep')
  }

  study () {
    this.props.activePanel('study')
  }

  tool () {
    this.props.activePanel('tool')
  }

  render () {
    const { type, during, timestamp, status } = this.props.control.event
    const isInProgress = type !== 'idle'
    const isCompletable = status === 'done'
    return (
      <Container>
        <ul>
          <Button disabled={isInProgress} handleClick={::this.work} icon='briefcase' text='Work' />
          <Button disabled={isInProgress} handleClick={::this.sleep} icon='bed' text='Sleep' />
          <Button disabled={isInProgress} handleClick={::this.study} icon='book' text='Study' />
          <Button disabled={!isCompletable} handleClick={::this.props.completeEvent} icon='check' text='Done' />
          <Button handleClick={::this.tool} icon='wrench' text='Tool' />
        </ul>
    </Container>
    )
  }
}
