import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { Button, Stack } from '@mui/material'

import displayTime from '../../../hooks/displayTime'

const FlowTimer = ({ studyDuration, onTaskComplete }) => {
  const [time, setTime] = useState(0)
  const [timePassed, setTimePassed] = useState(0)
  const [isBreak, setBreak] = useState(false)

  const switchToBreak = () => {
    setBreak(true)
    setTime(Math.floor(time / 5))
  }

  useEffect(() => {
    if (timePassed === studyDuration && onTaskComplete) {
      onTaskComplete()
    }
  }, [timePassed, studyDuration, onTaskComplete])

  useEffect(() => {
    if (studyDuration > timePassed) {
      if (time === 0 && isBreak) {
        setBreak(false)
      }

      const interval = setInterval(() => {
        if (studyDuration > timePassed) {
          setTime(isBreak ? time - 1 : time + 1)
          if (isBreak) {
            setTime(time - 1)
          } else {
            setTime(time + 1)
          }
        }
        setTimePassed(timePassed + 1)
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [time, timePassed, isBreak, studyDuration])

  return (
    <Stack spacing={2} alignItems="center">

      <Typography variant="h5" gutterBottom>
        { isBreak && !(timePassed === studyDuration) && 'break for' }
        { !isBreak && !(timePassed === studyDuration) && 'focusing for' }
        { (timePassed === studyDuration) && 'done' }
      </Typography>

      <Typography variant="h1">
        {displayTime(time)}
      </Typography>

      <Typography variant="body1">
        {displayTime(timePassed)}
        {' / '}
        {displayTime(studyDuration)}
        {' '}
        total passed
      </Typography>

      <Button fullWidth sx={{ borderRadius: '2rem' }} variant="contained" onClick={() => { switchToBreak() }} disabled={isBreak || studyDuration === timePassed}>
        break
      </Button>

    </Stack>

  )
}

FlowTimer.propTypes = {
  studyDuration: PropTypes.number,
  onTaskComplete: PropTypes.func
}

export default FlowTimer
