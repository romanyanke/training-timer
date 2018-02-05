import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { noop } from 'lodash'

class InputNumber extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: this.props.value,
    }
  }

  setTime = count => {
    this.setState({ count })
    this.props.onChange(count)
  }

  render() {
    return (
      <div>
        <input
          min={this.props.min}
          step={this.props.step}
          type="number"
          value={this.state.count}
          onChange={e => this.setTime(e.target.value)}
        />
      </div>
    )
  }
}

InputNumber.propTypes = {
  onChange: PropTypes.func.isRequired,
}

InputNumber.defaultProps = {
  min: 0,
  step: 1,
  value: '',
}

export default InputNumber
