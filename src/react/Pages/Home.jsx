import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { Box, Stack, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import useTasks from '../../hooks/useTasks'

import TopNavigationBar from '../TopNavigationBar'

import NoteCard from '../NoteCard'

const Home = () => {
  const navigate = useNavigate()
  const { tasks } = useTasks()

  // Logging when tasks change
  useEffect(() => {
    console.log('Home component rendered with tasks:', tasks)
    console.log('Task IDs:', tasks.map(t => t.id))
  }, [tasks])

  return (
    <Box flex={1} sx={{ width: '100%', overflowY: 'hidden', bgcolor: 'primary.background' }}>
      <TopNavigationBar name="Todo Planner" xButtonDisabled />
      <Stack spacing={2} sx={{ m: '1rem', justifyContent: 'space-between' }}>
        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
        >
          {tasks.map((task) => (
            <NoteCard
              key={task.id}
              task={task}
              onClick={() => navigate(`/StartTask/${task.id}`)}
            />
          ))}
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Fab
            color="primary"
            onClick={() => navigate('/Task')}
            aria-label="Add Task"
          >
            <AddIcon />
          </Fab>
        </Box>
      </Stack>
    </Box>
  )
}

export default Home
