import React, { useRef, useState, useEffect } from 'react'
import { Box, Stack, Typography, Card, CardContent, Button, Rating, Fab, ToggleButton, ToggleButtonGroup } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import TopNavigationBar from '../TopNavigationBar'
import Timer from './Timer/Timer'

const StartTask = ({ name = 'Mathe Klausur', description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non officiis reiciendis et iste officia enim aspernatur quam autem veritatis voluptas blanditiis, explicabo accusantium laboriosam illo minima voluptate, optio quae omnis?', complexity = 7, duration = 5}) => {
  const [timerStarted, setTimerStarted] = useState(false)
  const [atPageTop, setAtPageTop] = useState(true)
  const timerRef = useRef(null)
  const topRef = useRef(null)

  const scroll = () => {
    if (atPageTop) {
      timerRef.current?.scrollIntoView({ behavior: 'smooth' })
      setAtPageTop(false)
    } else {
      topRef.current?.scrollIntoView({ behavior: 'smooth' })
      setAtPageTop(true)
    }
  }

  const [studyTechnique, setStudyTechnique] = React.useState('pomodoro');
    const handleTechnique = (event, newTechnique) => {
      if (newTechnique !== null) {
        setStudyTechnique(newTechnique);
      }
    };

  const startTimer = () => {
    setTimerStarted(true)
    // ToDo: Timer starten
  }

  useEffect(() => {
    if (timerStarted) {
      scroll()
    }
  }, [timerStarted])

  return (
    <Box flex={1} sx={{ width: '100%', overflowY: 'hidden' }}>
      <div ref={topRef} />
      <TopNavigationBar name={name} />
      <Stack spacing={2} sx={{ height: '200%', m: '1rem', justifyContent: 'space-between' }}>
        <Stack spacing={2} sx={{ height: '46%', justifyContent: 'space-between' }}>
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Card sx={{ borderRadius: '2rem' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>Komplexität</Typography>
                  <Rating size="small" value={complexity} readOnly max={10} icon={<CircleIcon fontSize="inherit" color="secondary" />} emptyIcon={<CircleOutlinedIcon fontSize="inherit" />} />
                </CardContent>
              </Card>
              <Card sx={{ borderRadius: '2rem', flex: 1 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>Dauer</Typography>
                  <Typography variant="body1">
                    {duration}
                    {' Minuten'}
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
            <Card sx={{ borderRadius: '2rem' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Ziel</Typography>
                <Typography variant="body1" sx={{ overflow: 'auto', scrollbarWidth: 'none', maxHeight: '20vh' }}>{description}</Typography>
              </CardContent>
            </Card>
            <ToggleButtonGroup
              color={timerStarted? 'standard':'primary'}
              value={studyTechnique}
              exclusive
              onChange={handleTechnique}
              aria-label="study-technique"
              disabled = {timerStarted}
              size='small'
            >
              <ToggleButton value="pomodoro" aria-label="left">
                <Typography variant="button" gutterBottom>pomodoro</Typography>
              </ToggleButton>
                <ToggleButton value="flow" aria-label="right">
                <Typography variant="button" gutterBottom>flow</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
            <Button sx={{ borderRadius: '2rem' }} variant="contained" fullWidth endIcon={<PlayArrowIcon />} onClick={startTimer} disabled={timerStarted}>
              <Typography variant="button">Start</Typography>
            </Button>
          </Stack>
          {
            timerStarted && atPageTop &&
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '7rem' }}>
              <Fab onClick={scroll}>
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
              <Fab onClick={scroll}>
                <ArrowUpwardIcon />
              </Fab>
            </Box>
          }
          {
            atPageTop &&
            <Box sx={{ height: '7rem' }} />
          }
          <Card sx={{ borderRadius: '2rem', width: '100%', position: 'relative', top: '-5rem', display:'flex', justifyContent:'center'}}>
            <CardContent ref={timerRef}>
              <Timer studyTechnique= {studyTechnique} studyDuration = {duration} learningIntervalTime = {0.8} breakIntervalTime = {0.2}/>  
            </CardContent>
          </Card>
          <Box />
        </Stack>
      </Stack>
    </Box>
  )
}

export default StartTask
