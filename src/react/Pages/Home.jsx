import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Fab, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import useTasks from '../../hooks/useTasks'
import TopNavigationBar from '../TopNavigationBar'
import NoteCard from '../NoteCard'

const Home = () => {
  const navigate = useNavigate()
  const { tasks } = useTasks()

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <TopNavigationBar name="Todo Planner" xButtonDisabled />

      <Box
        sx={{
          flex: 1,
          position: 'relative',
          bgcolor: 'primary.contrastText',
          overflow: 'hidden'
        }}
      >
        {/* Main scrollable content area */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            padding: 0.7,
            paddingBottom: 8 // Extra space for FAB
          }}
        >
          <Stack
            direction="column"
            alignItems="center"
            spacing={2}
            sx={{ width: '100%' }}
          >
            {tasks.map((task) => (
              <NoteCard
                key={task.id}
                task={task}
                onClick={() => navigate(`/StartTask/${task.id}`)}
                sx={{ width: '100%', maxWidth: 700 }}
              />
            ))}
          </Stack>
        </Box>

        <Fab
          color="primary"
          onClick={() => navigate('/Task')}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 1000
          }}
          aria-label="Add Task"
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  )
}

export default Home
