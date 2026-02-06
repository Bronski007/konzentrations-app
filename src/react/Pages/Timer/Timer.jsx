import React from 'react'
import PropTypes from 'prop-types'

import FlowTimer from './FlowTimer'
import PomodoroTimer from './PomodoroTimer'

const Timer = ({ studyTechnique, studyDuration, learningIntervalTime, breakIntervalTime, isPaused, onTaskComplete }) => {
  // converting minutes to seconds for displayTime funtion
  if (studyTechnique === 'pomodoro') {
    return (
      <PomodoroTimer
        studyDuration={studyDuration * 60}
        learningIntervalTime={learningIntervalTime * 60}
        breakIntervalTime={breakIntervalTime * 60}
        isPaused={isPaused}
        onTaskComplete={onTaskComplete}
      />
    )
  }

  return (
    <FlowTimer
      studyDuration={studyDuration * 60}
      isPaused={isPaused}
      onTaskComplete={onTaskComplete}
    />
  )
}

Timer.propTypes = {
  studyTechnique: PropTypes.string,
  studyDuration: PropTypes.number,
  learningIntervalTime: PropTypes.number,
  breakIntervalTime: PropTypes.number,
  onTaskComplete: PropTypes.func,
  isPaused: PropTypes.bool
}

export default Timer
