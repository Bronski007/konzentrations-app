import React from 'react'
import PropTypes from 'prop-types'

import FlowTimer from './FlowTimer'
import PomodoroTimer from './PomodoroTimer'

const Timer = ({ studyTechnique, studyDuration, learningIntervalTime, breakIntervalTime }) => {
  if (studyTechnique === 'pomodoro') {
    return (
      <PomodoroTimer studyDuration={studyDuration * 60} learningIntervalTime={learningIntervalTime * 60} breakIntervalTime={breakIntervalTime * 60} />
    )
  }

  return (
    <FlowTimer studyDuration={studyDuration * 60} />
  )
}

Timer.propTypes = {
  studyTechnique: PropTypes.string,
  studyDuration: PropTypes.number,
  learningIntervalTime: PropTypes.number,
  breakIntervalTime: PropTypes.number
}

export default Timer
