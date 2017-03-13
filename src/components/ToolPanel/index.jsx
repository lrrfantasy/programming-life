import React, { Component } from 'react'
import { connect } from 'react-redux'

import ToolItem from '../ToolItem'
import Icon from '../../ui/Icon'
import Container from '../../ui/Container'

import tools from '../../data/tool'

import style from './style.styl'

@connect(({ status }) =>({ status }))
export default class ToolPanel extends Component {
  render () {
    const toolHave = this.props.status.tool
    const toolList = tools.map((tool, idx) => {
      const { icon, levels, type } = tool
      const currentLevel = toolHave[type] || 0
      if (!currentLevel) {
        const { name, description } = levels[0]
        return (
          <ToolItem
            notPurchased={true} type={type} icon={icon}
            name={name} level={currentLevel} maxLevel={levels.length}
            description={description} key={idx} />
        )
      } else {
        const { name, description } = levels[currentLevel - 1]
        const nextDesc = levels[currentLevel]
          ? `(next level: ${levels[currentLevel].description})`
          : ''
        const desc = `${description} ${nextDesc}`
        return (
          <ToolItem type={type} icon={icon} name={name} level={currentLevel}
            maxLevel={levels.length} description={desc} key={idx} />
        )
      }
    })
    return (
      <Container>
        <ul>
          {toolList}
        </ul>
      </Container>
    )
  }
}
