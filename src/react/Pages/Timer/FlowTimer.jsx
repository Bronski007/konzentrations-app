import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import displayTime from '../../../hooks/displayTime'

const FlowTimer = ({ studyDuration }) => {
  const [time, setTime] = useState(0)
  const [timePassed, setTimePassed] = useState(0)
  const [isBreak, setBreak] = useState(false)

  const switchToBreak = () => {
    setBreak(true)
    setTime(Math.floor(time / 5))
  }

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
      }, 100)

      return () => {
        clearInterval(interval)
      }
    }
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>

      <Typography variant="caption" gutterBottom>
        duration:
        {' '}
        {studyDuration / 60}
        {' '}
        minutes.
      </Typography>

      <Typography variant="h4" gutterbottom>
        {isBreak ? 'break' : 'learn'}
      </Typography>

      <Typography variant="h2" gutterbottom>
        {displayTime(time)}
      </Typography>

      <Typography variant="caption" gutterbottom>
        time passed:
        {' '}
        {displayTime(timePassed)}
      </Typography>

      <Button variant="contained" onClick={() => { switchToBreak() }} disabled={isBreak || studyDuration === timePassed}>
        break
      </Button>

      <Typography variant="h3" sx={{ color: 'rgb(6, 112, 66)', display: (studyDuration === timePassed) ? 'block' : 'none' }}>
        done!
      </Typography>

    </div>

  )
}

FlowTimer.propTypes = {
  studyDuration: PropTypes.number
}

export default FlowTimer
