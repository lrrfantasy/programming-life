import React, { Component } from 'react'
import { connect } from 'react-redux'

import ControlPanel from '../../components/ControlPanel'
import EventProgress from '../../components/EventProgress'
import WorkPanel from '../../components/WorkPanel'
import SleepPanel from '../../components/SleepPanel'
import StudyPanel from '../../components/StudyPanel'
import ToolPanel from '../../components/ToolPanel'
import AdminMenu from '../../components/AdminMenu'
import ExpBar from '../../components/ExpBar'
import EnergyBar from '../../components/EnergyBar'

import Icon from '../../ui/Icon'
import Container from '../../ui/Container'

import * as statusActions from '../../actions/statusActions'

import { iconMap } from '../../data/const'
import { findToolByNameLevel } from '../../data/tool'

import style from './style.styl'

const panelMap = {
  work: (<WorkPanel />),
  sleep: (<SleepPanel />),
  study: (<StudyPanel />),
  tool: (<ToolPanel />)
}

@connect(state => state, statusActions)
export default class Homepage extends Component {
  componentDidMount () {
    this.props.fetchStatus()
  }

  render () {
    const { status } = this.props
    const skills = (status.skill || []).map((skill, idx) => {
      const { name, level, exp } = skill
      const maxExp = level ** 2 * 100
      return (
        <li className={style.skill} key={idx}>
          <span className={style.skillLevel}>
            <Icon icon={iconMap[name]} />
            <span>{level}</span>
          </span>
          <ExpBar value={exp} max={maxExp} />
        </li>
      )
    })
    const { panel } = this.props.control
    const activePanel = panel ? panelMap[panel] : (<div></div>)
    const bed = findToolByNameLevel('bed', status.tool.bed)
    const maxEnergy = status.energy.max + (!!bed ? bed.buff.maxEnergy : 0)
    return (
      <div>
        <EventProgress />
        <ControlPanel />
        <Container>
          <div>
            <EnergyBar value={status.energy.value} max={maxEnergy} />
            <span className={style.status}>
              <Icon icon='usd' />
              <span className={style.statusValue}>{status.money}</span>
            </span>
          </div>
          <ul>
            {skills}
          </ul>
        </Container>
        <div>
          {activePanel}
        </div>
        <AdminMenu />
      </div>
    );
  }
}
