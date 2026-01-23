import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import displayTime from '../../../hooks/displayTime'

const PomodoroTimer = ({ studyDuration, learningIntervalTime, breakIntervalTime }) => {
  const [time, setTime] = useState(learningIntervalTime)
  const [TimeLeft, setTimeLeft] = useState(studyDuration)
  const [isBreak, setBreak] = useState(false)

  console.log(displayTime(time))

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
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>

      <Typography variant="caption" gutterBottom>
        learning interval:
        {' '}
        {learningIntervalTime}
        {' '}
        seconds
      </Typography>

      <Typography variant="caption" gutterBottom>
        break interval:
        {' '}
        {breakIntervalTime}
        {' '}
        seconds
      </Typography>

      <Typography variant="h4" gutterbottom>
        {isBreak ? 'break' : 'learn'}
      </Typography>

      <Typography variant="h2">
        {displayTime(time)}
      </Typography>

      <Typography variant="h6" gutterbottom>
        {displayTime(TimeLeft)}
        {' '}
        left
      </Typography>

      <Typography variant="h3" sx={{ color: 'rgb(6, 112, 66)', display: (TimeLeft === 0) ? 'block' : 'none' }}>
        done!
      </Typography>

    </div>

  )
}

PomodoroTimer.propTypes = {
  studyDuration: PropTypes.number,
  learningIntervalTime: PropTypes.string,
  breakIntervalTime: PropTypes.number
}

export default PomodoroTimer
