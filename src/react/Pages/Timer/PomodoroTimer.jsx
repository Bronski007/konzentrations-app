import React, { useState, useEffect } from 'react'
import { Typography, Stack } from '@mui/material/'
import PropTypes from 'prop-types'

import displayTime from '../../../hooks/displayTime'

const PomodoroTimer = ({ studyDuration, learningIntervalTime, breakIntervalTime }) => {
  const [time, setTime] = useState(learningIntervalTime)
  const [TimeLeft, setTimeLeft] = useState(studyDuration)
  const [isBreak, setBreak] = useState(false)

  useEffect(() => {
    if (TimeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(TimeLeft - 1)

        if (time > 1) {
          setTime(time - 1)
        } else if (isBreak) {
          setTime(learningIntervalTime)
          setBreak(false)
        } else {
          setTime(breakIntervalTime)
          setBreak(true)
        }
      }, 100)

      return () => {
        clearInterval(interval)
      }
    }
  })

  return (
    <Stack spacing={2} alignItems="center">

      <Typography variant="h5" gutterBottom>
        { isBreak && !(TimeLeft === 0) && 'break for' }
        { !isBreak && !(TimeLeft === 0) && 'focus for' }
        { (TimeLeft === 0) && 'done' }
      </Typography>

      <Typography variant="h1">
        {displayTime(time)}
      </Typography>

      <Typography variant="body1">
        {displayTime(TimeLeft)}
        {' '}
        total left
      </Typography>

    </Stack>
  )
}

PomodoroTimer.propTypes = {
  studyDuration: PropTypes.number,
  learningIntervalTime: PropTypes.number,
  breakIntervalTime: PropTypes.number
}

export default PomodoroTimer
