import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Stack, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import useTasks from '../../hooks/useTasks'
import sortTasks from '../../taskSortingAlgorithm'

import TopNavigationBar from '../TopNavigationBar'

import NoteCard from '../NoteCard'

const Home = () => {
  const navigate = useNavigate()
  const { tasks } = useTasks()

  return (
    <Stack
      flex="1"
      direction="column"
      sx={{
        width: '100%'
      }}
    >
      <TopNavigationBar name="Todo Planner" />
      <Stack
        flex="1 1 auto"
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: '100%',
          bgcolor: 'primary.contrastText',
          paddingBottom: 2,
          position: 'relative'
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{
            width: '100%',
            flex: '1 1 auto',
            paddingBottom: 2
          }}
        >
          {tasks.map(task => (
            console.log(`${task.title}: ${sortTasks(task)}`)
          ))}
          {structuredClone(tasks)
            .sort((a, b) => sortTasks(b) - sortTasks(a))
            .map(task => (
              <NoteCard
                key={task.id}
                task={task}
                onClick={() => navigate(`/StartTask/${task.id}`)}
              />
            ))}
        </Stack>

        <Fab
          color="primary"
          onClick={() => navigate('/Task')}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16
          }}
          aria-label="Add Task"
        >
          <AddIcon />
        </Fab>

      </Stack>
    </Stack>
  )
}

export default Home
