import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Button from '../../ui/Button'
import Container from '../../ui/Container'

import * as statusActions from '../../actions/statusActions'

import style from './style.styl'

@connect(() => ({}), statusActions)
export default class AdminMenu extends Component {
  render () {
    return (
      <Container classes={[style.admin]}>
        <Button disabled={false} handleClick={this.props.init} icon='rocket' text='Init' />
      </Container>
    )
  }
}
