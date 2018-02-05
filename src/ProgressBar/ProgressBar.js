import React from 'react'
import PropTypes from 'prop-types'
import Clock from '../Clock'

const ProgressBar = ({ time, progress }) => {
  const path = `polygon(0% 0%, ${progress}% 0%, ${progress}% 100%, 0% 100%)`
  const style = {
    clipPath: path,
    webkitClipPath: path,
  }
  return (
    <div className="ProgressBar">
      <div className="ProgressBar-wrapper">
        <div className="ProgressBar-time">
          <Clock seconds={time} />
        </div>
        <div className="ProgressBar-time invert" style={style}>
          <Clock seconds={time} />
        </div>
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  time: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
}

export default ProgressBar
