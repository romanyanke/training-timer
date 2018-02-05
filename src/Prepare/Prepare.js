import React, { Component } from 'react'
import Countdown from '../Countdown'
import Donut from '../Donut'
import { withRouter } from 'react-router-dom'
import routes from '../routes'

class Prepare extends Component {
  constructor() {
    super()

    this.state = {
      count: 3,
    }
  }

  nextCount = () => {
    const next = this.state.count - 1

    if (next === 0) {
      this.props.history.push(routes.training)
    } else {
      this.setState({ count: next })
    }
  }

  render() {
    return (
      <div className="Prepare">
        <div className="Prepare-frame Prepare-counter">
          <span>{this.state.count}</span>
        </div>
        <div className="Prepare-frame">
          <Countdown timer={1} onEnd={this.nextCount}>
            {({ progress }) => <Donut invert progress={progress} />}
          </Countdown>
        </div>
      </div>
    )
  }
}

export default withRouter(Prepare)
