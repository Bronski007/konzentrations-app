import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Box, Stack, Typography, Card, CardContent, Button, Rating, Fab, ToggleButton, ToggleButtonGroup, TextField, InputAdornment, Popover, IconButton } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CloseIcon from '@mui/icons-material/Close'
import EventIcon from '@mui/icons-material/Event'

import useTasks from '../../hooks/useTasks'
import TopNavigationBar from '../TopNavigationBar'
import Timer from './Timer/Timer'

const StartTask = () => {
  const [timerStarted, setTimerStarted] = useState(false)
  const [atPageTop, setAtPageTop] = useState(true)
  const [studyTechnique, setStudyTechnique] = useState('pomodoro')
  const [learningInterval, setLearningInterval] = useState(25)
  const [breakInterval, setBreakInterval] = useState(5)
  const [infoAnchorEl, setInfoAnchorEl] = useState(null)
  const timerRef = useRef(null)
  const topRef = useRef(null)

  // Data fetching
  const { getTask } = useTasks()
  const { id } = useParams()
  const task = getTask(id)
  const { title, deadline, importance, approximatedTime, description } = task
  const typeMultiplyer = approximatedTime.type === 'h' ? 60 : 1
  const aproxTimeInMin = Number(approximatedTime.value) * typeMultiplyer

  const scroll = () => {
    if (atPageTop) {
      timerRef.current?.scrollIntoView({ behavior: 'smooth' })
      setAtPageTop(false)
    } else {
      topRef.current?.scrollIntoView({ behavior: 'smooth' })
      setAtPageTop(true)
    }
  }

  const startTimer = () => {
    setTimerStarted(true)
  }

  useEffect(() => {
    if (timerStarted) {
      scroll()
    }
  }, [timerStarted])

  const handleTechnique = (event, newTechnique) => {
    if (newTechnique !== null) {
      setStudyTechnique(newTechnique)
    }
  }

  const handleInfoButtonClick = (event) => {
    setInfoAnchorEl(event.currentTarget)
  }

  const handleInfoButtonClose = () => {
    setInfoAnchorEl(null)
  }

  const infoOpen = Boolean(infoAnchorEl)
  const infoId = infoOpen ? 'info' : undefined

  return (
    <Box flex={1} sx={{ width: '100%', overflowY: 'hidden', background: '#fafcff' }}>
      <div ref={topRef} />
      <TopNavigationBar name={title} />
      <Stack spacing={2} sx={{ height: '200%', m: '1rem', justifyContent: 'space-between' }}>
        <Stack spacing={2} sx={{ height: '46%', justifyContent: 'space-between' }}>
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Card sx={{ borderRadius: '2rem' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>Importance</Typography>
                  <Rating size="small" value={importance} readOnly max={5} icon={<CircleIcon fontSize="inherit" color="error" />} emptyIcon={<CircleOutlinedIcon fontSize="inherit" />} />
                </CardContent>
              </Card>
              <Card sx={{ borderRadius: '2rem', flex: 1 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>Duration</Typography>
                  <Typography variant="body1">
                    {`${approximatedTime.value}${approximatedTime.type}`}
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
            <Card sx={{ borderRadius: '2rem' }}>
              <CardContent>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
                  <Typography variant="h5" gutterBottom>Description</Typography>
                  <Stack direction="row" spacing={0.5} sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <EventIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="textSecondary">{new Date(deadline).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })}</Typography>
                  </Stack>
                </Stack>
                <Typography variant="body1" sx={{ overflow: 'auto', scrollbarWidth: 'none', maxHeight: '15vh' }}>{description}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ borderRadius: '2rem' }}>
              <CardContent>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h5" gutterBottom>Focus Mode</Typography>
                  <IconButton color="primary" onClick={handleInfoButtonClick}>
                    <InfoOutlinedIcon />
                  </IconButton>
                  <Popover id={infoId} open={infoOpen} anchorEl={infoAnchorEl} onClose={handleInfoButtonClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} slotProps={{ paper: { sx: { borderRadius: '2rem', maxWidth: '273pt' } } }}>
                    <Stack spacing={0.25} sx={{ p: 2 }}>
                      <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="body1">Pomodoro:</Typography>
                        <IconButton onClick={handleInfoButtonClose} size="small" sx={{ position: 'absolute', top: 8, right: 8 }}>
                          <CloseIcon color="primary" />
                        </IconButton>
                      </Stack>
                      <Typography variant="body2">Work in short focus intervals with regular breaks. Intervals and breaks are fully adjustable.</Typography>
                      <Typography variant="body1">Flowmodoro:</Typography>
                      <Typography variant="body2">Work in longer, flexible blocks to reach a deeper flow. Take breaks when it feels natural.</Typography>
                    </Stack>
                  </Popover>
                </Stack>
                <ToggleButtonGroup color={timerStarted ? 'standard' : 'primary'} value={studyTechnique} exclusive onChange={handleTechnique} disabled={timerStarted} size="small" sx={{ width: '100%' }}>
                  <ToggleButton value="pomodoro" sx={{ width: '50%', borderRadius: '2rem' }}>
                    <Typography variant="button">pomodoro</Typography>
                  </ToggleButton>
                  <ToggleButton value="flowmodoro" sx={{ width: '50%', borderRadius: '2rem' }}>
                    <Typography variant="button">flowmodoro</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>

                <Stack spacing={2} direction="row" sx={{ display: studyTechnique === 'pomodoro' ? 'flex' : 'none', mt: '1rem' }}>
                  <TextField label="Focus Duration" defaultValue={25} onChange={(e) => setLearningInterval(e.target.value)} disabled={timerStarted} slotProps={{ input: { endAdornment: <InputAdornment position="end">min</InputAdornment> } }} />
                  <TextField label="Break Duration" defaultValue={5} onChange={(e) => setBreakInterval(e.target.value)} disabled={timerStarted} slotProps={{ input: { endAdornment: <InputAdornment position="end">min</InputAdornment> } }} />
                </Stack>
              </CardContent>
            </Card>
            <Button sx={{ borderRadius: '2rem' }} variant="contained" fullWidth endIcon={<PlayArrowIcon />} onClick={startTimer} disabled={timerStarted}>
              <Typography variant="button">Start</Typography>
            </Button>
          </Stack>
          {
            timerStarted && atPageTop &&
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '7rem' }}>
              <Fab onClick={scroll} color="primary">
                <ArrowDownwardIcon />
              </Fab>
            </Box>
          }
          {
            !timerStarted && !atPageTop &&
            <Box sx={{ height: '7rem' }} />
          }
        </Stack>
        <Stack sx={{ height: '46%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {
            !atPageTop &&
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '7rem' }}>
              <Fab onClick={scroll} color="primary">
                <ArrowUpwardIcon />
              </Fab>
            </Box>
          }
          {
            atPageTop &&
            <Box sx={{ height: '7rem' }} />
          }
          <Card sx={{ borderRadius: '2rem', width: '100%', position: 'relative', top: '-5rem' }}>
            <CardContent ref={timerRef}>
              {timerStarted && <Timer studyTechnique={studyTechnique} studyDuration={aproxTimeInMin} learningIntervalTime={parseFloat(learningInterval)} breakIntervalTime={parseFloat(breakInterval)} />}
            </CardContent>
          </Card>
          <Box />
        </Stack>
      </Stack>
    </Box>
  )
}

export default StartTask
