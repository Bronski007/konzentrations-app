import React, { useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Box, Stack, Typography, Card, CardContent, Button, Rating, Fab, ToggleButton, ToggleButtonGroup, TextField, InputAdornment } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import EventIcon from '@mui/icons-material/Event'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import useTasks from '../../hooks/useTasks'
import TopNavigationBar from '../TopNavigationBar'
import Timer from './Timer/Timer'

// Delete Button and Dialog
const DeleteButton = () => {
  const [open, setOpen] = React.useState(false)
  const { removeTask } = useTasks()
  const { id } = useParams()
  return (
    <>
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={() => { setOpen(true) }}
        endIcon={<DeleteIcon />}
        sx={{ mt: 2, borderRadius: '2rem' }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={() => (setOpen(false))}
        slotProps={{ paper: { sx: { borderRadius: '2rem', p: '0.5rem' } } }}
      >
        <DialogTitle>
          Delete Task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Task will be deleted permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => (setOpen(false))}
            autoFocus
            sx={{ borderRadius: '2rem' }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              removeTask(id)
              window.location.href = '/'
            }}
            color="error"
            sx={{ borderRadius: '2rem' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const StartTask = () => {
  const [timerStarted, setTimerStarted] = useState(false)
  const [timerPaused, setTimerPaused] = useState(false)
  const [atPageTop, setAtPageTop] = useState(true)
  const [studyTechnique, setStudyTechnique] = useState('pomodoro')
  const [learningInterval, setLearningInterval] = useState(25)
  const [breakInterval, setBreakInterval] = useState(5)
  const [flowBreakRatio, setFlowBreakRatio] = useState(5)
  const timerRef = useRef(null)
  const topRef = useRef(null)
  const navigate = useNavigate()

  // Data fetching
  const { getTask, removeTask } = useTasks()
  const { id } = useParams()
  const task = getTask(id)
  const { title, deadline, importance, approximatedTime, description } = task
  const typeMultiplyer = approximatedTime.type === 'h' ? 60 : 1
  const aproxTimeInMin = Number(approximatedTime.value) * typeMultiplyer
  const totalSessions = Math.ceil((aproxTimeInMin) / learningInterval)
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
  const handleTaskComplete = () => {
    // eslint-disable-next-line no-alert
    alert(`Task "${title}" completed! It will be removed from your list.`)

    navigate('/', { replace: true })

    const currentTasks = JSON.parse(localStorage.getItem('tasks_data') || '[]')
    const newTasks = currentTasks.filter(t => t.id !== id)
    localStorage.setItem('tasks_data', JSON.stringify(newTasks))

    removeTask(id)

    window.dispatchEvent(new StorageEvent('storage', {
      key: 'tasks_data',
      newValue: localStorage.getItem('tasks_data')
    }))
  }

  return (
    <Box flex={1} sx={{ width: '100%', overflowY: 'hidden', bgcolor: 'primary.background' }}>
      <div ref={topRef} />
      <TopNavigationBar name={title} xButtonDisabled={timerStarted} />
      <Stack spacing={2} sx={{ height: '200%', m: '1rem', justifyContent: 'space-between' }}>
        <Stack spacing={2} sx={{ height: '46%', justifyContent: 'space-between' }}>
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Card sx={{ borderRadius: '2rem', flex: 1 }}>
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
                <Typography variant="body1" sx={{ wordWrap: 'break-word', scrollbarWidth: 'none' }}>{description}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ borderRadius: '2rem' }}>
              <CardContent>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h5" gutterBottom>Focus Mode</Typography>
                </Stack>
                <ToggleButtonGroup color={timerStarted ? 'standard' : 'primary'} value={studyTechnique} exclusive onChange={handleTechnique} disabled={timerStarted} size="small" sx={{ width: '100%', mt: 1 }}>
                  <ToggleButton value="pomodoro" sx={{ width: '50%', borderRadius: '2rem' }}>
                    <Typography variant="button">pomodoro</Typography>
                  </ToggleButton>
                  <ToggleButton value="flowmodoro" sx={{ width: '50%', borderRadius: '2rem' }}>
                    <Typography variant="button">flowmodoro</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
                { studyTechnique === 'pomodoro' &&
                  <Stack sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ margin: 1 }}
                    >
                      Work in short focus intervals with regular breaks. Intervals and breaks are fully adjustable.
                    </Typography>
                    <Stack spacing={2} direction="row" sx={{ display: 'flex', mt: '1rem' }}>
                      <TextField label="Focus Duration" defaultValue={25} onChange={(e) => setLearningInterval(e.target.value)} disabled={timerStarted} slotProps={{ input: { endAdornment: <InputAdornment position="end">min</InputAdornment>, sx: { borderRadius: '2rem' } } }} />
                      <TextField label="Break Duration" defaultValue={5} onChange={(e) => setBreakInterval(e.target.value)} disabled={timerStarted} slotProps={{ input: { endAdornment: <InputAdornment position="end">min</InputAdornment>, sx: { borderRadius: '2rem' } } }} />
                    </Stack>
                    <Typography variant="subtitle1" sx={{ marginTop: 3 }}>
                      <strong>{Number.isFinite(totalSessions) ? totalSessions : '0'}</strong>
                      {' '}
                      study session
                      {totalSessions > 1 ? 's' : '' }
                    </Typography>
                  </Stack>}
                { studyTechnique === 'flowmodoro' &&
                <Stack sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ margin: 1 }}
                  >
                    Work in more flexible intervals to reach a deeper flow. Take breaks when it feels natural.
                  </Typography>
                  <Typography sx={{ margin: 1 }}>
                    Gain
                    {' '}
                    <strong>1</strong>
                    {' '}
                    minute of break time for every
                  </Typography>
                  <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                      defaultValue={5}
                      onChange={(e) => setFlowBreakRatio(e.target.value)}
                      disabled={timerStarted}
                      slotProps={{ input: { endAdornment: <InputAdornment position="end">min</InputAdornment>,
                        sx: { borderRadius: '2rem' } } }}
                      sx={{ width: 150 }}
                    />
                    <Typography sx={{ margin: 1, marginTop: 2 }}>
                      of studying.
                    </Typography>
                  </Stack>
                </Stack>}

              </CardContent>
            </Card>
            <Button sx={{ borderRadius: '2rem' }} variant="contained" fullWidth endIcon={<PlayArrowIcon />} onClick={startTimer} disabled={timerStarted}>
              <Typography variant="button">Start</Typography>
            </Button>
            <DeleteButton />

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
          <Card sx={{ borderRadius: '2rem', width: '100%', position: 'relative' }}>
            <CardContent ref={timerRef}>
              {timerStarted && <Timer
                studyTechnique={studyTechnique}
                studyDuration={aproxTimeInMin}
                learningIntervalTime={parseFloat(learningInterval)}
                breakIntervalTime={parseFloat(breakInterval)}
                flowBreakRatio={parseFloat(flowBreakRatio)}
                isPaused={timerPaused}
                onTaskComplete={handleTaskComplete}
              />}
            </CardContent>
          </Card>
          {
          timerStarted && (
            <Stack spacing={2} sx={{ width: '100%' }}>
              {timerStarted &&
              <Button
                variant="contained"
                endIcon={(timerPaused ? <PlayArrowIcon /> : <PauseIcon />)}
                onClick={() => setTimerPaused(!timerPaused)}
                sx={{ borderRadius: '2rem', flex: 1 }}
              >
                {(timerPaused ? 'Continue' : 'Pause')}
              </Button>}
              <Button
                variant="contained"
                endIcon={(<ExitToAppIcon />)}
                color="error"
                onClick={() => {
                  navigate(-1)
                }}
                sx={{ mt: 2, borderRadius: '2rem' }}
              >
                Cancel
              </Button>
            </Stack>
          )
          }
          <Box />
        </Stack>
      </Stack>
    </Box>
  )
}

export default StartTask
