import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputNumber from '../InputNumber'
import Clock from '../Clock'
import { saveParameters } from './Setup.actions'
import { pick, mapValues } from 'lodash'
import { withRouter } from 'react-router-dom'
import routes from '../routes'

import { playSound } from '../Countdown/Countdown'

class Setup extends Component {
  constructor(props) {
    super(props)

    this.state = pick(this.props, ['trainingTime', 'restTime', 'repeat'])
  }

  update(payload) {
    this.setState({ ...mapValues(payload, parseInt) })
  }

  save = () => {
    playSound.play()
    this.props.saveParameters(this.state)
    this.props.history.push(routes.prepare)
  }

  render() {
    const { trainingTime, restTime, repeat } = this.state
    const totalTime = repeat * (trainingTime + restTime)

    return (
      <div className="Setup">
        <label>
          время на упражнение
          <InputNumber
            value={trainingTime}
            onChange={trainingTime => this.update({ trainingTime })}
          />
        </label>
        <label>
          время на отдых
          <InputNumber value={restTime} onChange={restTime => this.update({ restTime })} />
        </label>

        <label>
          сколько подходов
          <InputNumber value={repeat} onChange={repeat => this.update({ repeat })} />
        </label>

        <button onClick={this.save}>
          Начать <Clock seconds={totalTime} />
        </button>
      </div>
    )
  }
}

export default connect(({ setup }) => setup, { saveParameters })(withRouter(Setup))
