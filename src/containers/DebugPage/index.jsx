import React, { Component } from 'react'

import AdminMenu from '../../components/AdminMenu'
import Button from '../../ui/Button'

import storage from '../../utils/storage'

import style from './style.styl'

export default class DebugPage extends Component {
  state = {
    status: '',
    workOrder: '',
    event: ''
  }
  componentDidMount () {
    const [status, workOrder, event] = ['status', 'workOrder', 'event'].map(key =>
      JSON.stringify(storage.get(key))
    )
    this.setState({ status, workOrder, event})
  }
  handleStatusChange (evt) {
    this.setState({ status: evt.target.value })
  }
  handleWorkOrderChange (evt) {
    this.setState({ workOrder: evt.target.value })
  }
  handleEventChange (evt) {
    this.setState({ event: evt.target.value })
  }
  save () {
    const { status, workOrder, event } = this.state
    storage.set('status', JSON.parse(status))
    storage.set('workOrder', JSON.parse(workOrder))
    storage.set('event', JSON.parse(event))
  }
  render () {
    const { status, workOrder, event } = this.state
    return (
      <div>
        <div className={style.container}>
          <div>
            <h2>Status</h2>
            <textarea cols={80} rows={7} className={style.textarea}
              value={status} onChange={::this.handleStatusChange}/ >
          </div>
          <div>
            <h2>Event</h2>
            <textarea cols={80} rows={7} className={style.textarea}
              value={event} onChange={::this.handleEventChange} />
          </div>
          <div>
            <h2>Work Order</h2>
            <textarea cols={80} rows={10} className={style.textarea}
              value={workOrder} onChange={::this.handleWorkOrderChange} />
          </div>
          <Button icon='save' text='Save' handleClick={::this.save}/>
        </div>
        <AdminMenu />
      </div>
    )
  }
}
