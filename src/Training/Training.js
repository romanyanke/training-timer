import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { times, sum, map, take } from 'lodash'
import { withRouter } from 'react-router-dom'
import routes from '../routes'
import Countdown from '../Countdown'
import ProgressBar from '../ProgressBar'
import Donut from '../Donut'
import classnames from 'classnames'

const spaceBarKeyCode = 32

class Training extends Component {
  constructor(props) {
    super(props)

    const program = []
    times(this.props.repeat, () => {
      program.push(
        {
          type: 'work',
          time: this.props.trainingTime,
        },
        {
          type: 'rest',
          time: this.props.restTime,
        },
      )
    })

    const totalTime = sum(map(program, 'time'))
    this.state = {
      total: program.length,
      totalTime,
      restSeconds: totalTime,
      current: 0,
      program,
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', this.listenKeys)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.listenKeys)
  }

  nextStep = () => {
    const next = this.state.current + 1

    if (this.state.program.length === next) {
      this.props.history.push(routes.finish)
    } else {
      this.setState({ current: next })
    }
  }

  listenKeys = ({ keyCode }) => {
    if (keyCode === spaceBarKeyCode) {
      this.btn.click()
    }
  }

  interrupt = () => {
    if (window.confirm('Прервать?')) {
      this.props.history.push(routes.root)
    }
  }

  render() {
    const { current, program, totalTime } = this.state
    const { type, time } = program[current]
    const totalElapsed = sum(map(take(program, current), 'time'))

    return (
      <Fragment>
        <Countdown timer={time} onEnd={this.nextStep}>
          {({ progress, remaining, paused }, toggle) => {
            const stepRemainig = Math.round(remaining / 1000)
            const displayStepRemainig = Math.ceil(remaining / 1000)
            const timeRemaining = totalTime - totalElapsed + stepRemainig - time
            const totalProgress = 100 - timeRemaining * 100 / totalTime

            return (
              <Fragment>
                <div className={classnames('Training', type)}>
                  <div className="Training-donut">
                    <Donut size={500} invert progress={progress} />

                    <div className="Training-donut-inside">{displayStepRemainig}</div>
                  </div>

                  <button className={'Training-control stop'} onClick={this.interrupt} />
                  <button
                    className={classnames('Training-control', { paused })}
                    onClick={toggle}
                    ref={btn => (this.btn = btn)}
                  />
                </div>
                <div className="Training-progress">
                  <ProgressBar time={timeRemaining} progress={totalProgress} />
                </div>
              </Fragment>
            )
          }}
        </Countdown>
      </Fragment>
    )
  }
}

export default connect(({ setup }) => setup)(withRouter(Training))
