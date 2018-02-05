import { Component } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'
import beep from './assets/beep.mp3'

export const playSound = new Audio(beep)

class Countdown extends Component {
  constructor() {
    super()

    this.state = {
      initialized: false,
    }
  }
  componentDidMount() {
    this.init(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps)
  }

  init(props) {
    cancelAnimationFrame(this.interval)
    const start = Date.now()
    const timer = props.timer * 1000
    this.interval = null

    this.setState(
      {
        initialized: true,
        paused: false,
        progress: 0,
        seconds: props.timer,
        start,
        timer,
        finish: start + timer,
        remaining: timer,
      },
      this.tick,
    )
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.interval)
    this.interval = null
  }

  tick = () => {
    const now = Date.now()
    if (now < this.state.finish) {
      this.interval = requestAnimationFrame(() => {
        this.setState(({ finish }) => {
          const remaining = finish - now

          const update = {
            remaining,
            progress: 100 - Math.round(remaining * 100 / this.state.timer),
          }

          return update
        }, this.tick)
      })
    } else {
      cancelAnimationFrame(this.interval)
      this.setState({
        remaining: 0,
        progress: 100,
      })
      this.props.onEnd()
      if (!this.props.silent) {
        try {
          playSound.play()
        } catch (e) {
          console.error(e)
        }
      }
    }
  }

  pause() {
    this.setState({
      paused: true,
    })
    cancelAnimationFrame(this.interval)
  }

  resume() {
    this.setState(
      {
        paused: false,
        finish: Date.now() + this.state.remaining,
      },
      this.tick,
    )
  }

  toggle = () => {
    if (this.state.paused) {
      this.resume()
    } else {
      this.pause()
    }
  }

  render() {
    return this.state.initialized ? this.props.children(this.state, this.toggle) : null
  }
}

Countdown.defaultProps = {
  onEnd: noop,
  silent: false,
}

Countdown.propTypes = {
  children: PropTypes.func.isRequired,
  onEnd: PropTypes.func,
  silent: PropTypes.bool,
  timer: PropTypes.number.isRequired,
}

export default Countdown
