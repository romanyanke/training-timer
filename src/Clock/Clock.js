import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  seconds: PropTypes.number.isRequired,
}

const Clock = ({ seconds }) => {
  const sec = seconds % 60
  const min = (seconds - sec) / 60

  return <span>{`${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`}</span>
}

Clock.propTypes = propTypes

export default Clock
