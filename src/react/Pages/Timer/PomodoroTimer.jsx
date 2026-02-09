/* eslint-disable no-lonely-if */
import React, { useState, useEffect } from 'react'
import { Typography, Stack } from '@mui/material/'
import PropTypes from 'prop-types'

import displayTime from '../../../hooks/displayTime'

const PomodoroTimer = ({ studyDuration, learningIntervalTime, breakIntervalTime, isPaused, onTaskComplete }) => {
  const [sessionTime, setSessionTime] = useState(Math.min(learningIntervalTime, studyDuration))
  const [totalStudyTimeRemaining, setTotalStudyTimeRemaining] = useState(studyDuration)
  const [isBreak, setIsBreak] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  // Calculate total sessions needed
  const totalSessions = Math.ceil(studyDuration / learningIntervalTime)

  // Handle timer completion
  useEffect(() => {
    if (totalStudyTimeRemaining <= 0 && !isBreak) {
      if (onTaskComplete) {
        onTaskComplete()
      }
      setIsRunning(false)
    }
  }, [totalStudyTimeRemaining, isBreak, onTaskComplete])

  // Main timer logic (FIXED)

  useEffect(() => {
    if (!isRunning || isPaused || totalStudyTimeRemaining <= 0) return

    const interval = setInterval(() => {
      if (sessionTime > 0) {
        setSessionTime(prev => prev - 1)

        // ONLY decrement study time during focus sessions, not breaks
        if (!isBreak) {
          setTotalStudyTimeRemaining(prev => Math.max(0, prev - 1))
        }
      } else {
        // Session finished
        if (isBreak) {
          // Break finished, start next focus session
          setIsBreak(false)
          setSessionTime(learningIntervalTime)
        } else {
          // Focus session finished
          const newSessions = sessionsCompleted + 1
          setSessionsCompleted(newSessions)

          // Check if we've completed all study time
          if (newSessions >= totalSessions) {
            setTotalStudyTimeRemaining(0)
            setIsRunning(false)
          } else {
            // Start break
            setIsBreak(true)
            setSessionTime(breakIntervalTime)
          }
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [sessionTime, isBreak, isRunning, learningIntervalTime, breakIntervalTime,
    totalStudyTimeRemaining, sessionsCompleted, totalSessions, isPaused])

  return (
    <Stack spacing={2} alignItems="center">

      <Typography variant="h5" gutterBottom>
        {isBreak && 'break for'}
        {!isBreak && totalStudyTimeRemaining > 0 && 'focus for' }
        {!isBreak && totalStudyTimeRemaining <= 0 && 'done' }
      </Typography>

      <Typography variant="h1">
        {displayTime(sessionTime)}
      </Typography>

      <Typography variant="body1">
        Session:
        {' '}
        {sessionsCompleted + (isBreak ? 0 : 1)}
        /
        {totalSessions}
        {' | '}
        Study left:
        {' '}
        {displayTime(totalStudyTimeRemaining)}
      </Typography>

      <Typography variant="body2" color="textSecondary">
        {isBreak ? 'Taking a break...' : 'Focus time - this counts toward total study'}
      </Typography>

    </Stack>
  )
}

PomodoroTimer.propTypes = {
  studyDuration: PropTypes.number,
  learningIntervalTime: PropTypes.number,
  breakIntervalTime: PropTypes.number,
  isPaused: PropTypes.bool,
  onTaskComplete: PropTypes.func
}

export default PomodoroTimer
