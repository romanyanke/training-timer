import React from 'react'

const Donut = ({ size, progress, invert }) => {
  const round = 2 * Math.PI * (size / 2)
  const radius = size * 0.4
  const donutProgress = invert
    ? -Math.PI * (progress / 50) * radius
    : round - Math.PI * (progress / 50) * radius

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox={`0 0 ${size} ${size}`}
      enableBackground={`new 0 0 ${size} ${size}`}
      className="Donut"
    >
      <defs>
        <linearGradient id="quotaDonut__gradient">
          <stop stopColor="#fc0023" offset="0%" />
          <stop stopColor="#f50" className="quotaDonut__gradientStopEnd" offset="100%" />
        </linearGradient>
      </defs>

      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle
          r={radius}
          fill="none"
          stroke="url(#quotaDonut__gradient)"
          strokeWidth="30px"
          transform="rotate(270.1)"
          strokeDasharray={round}
          strokeDashoffset={donutProgress}
        />
      </g>
    </svg>
  )
}

Donut.defaultProps = {
  invert: false,
  size: 200,
  progress: 100,
}

export default Donut
