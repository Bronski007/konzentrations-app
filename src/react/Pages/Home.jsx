import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Stack, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import useTasks from '../../hooks/useTasks'

import TopNavigationBar from '../TopNavigationBar'

import NoteCard from '../components/NoteCard'

const Home = () => {
  const navigate = useNavigate()

  const { tasks } = useTasks()

  // temporary mock notes until replacement with backend data
  const notes = tasks

  return (
    <Stack
      flex="1 1 auto"
      direction="column"
      alignItems="center"
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
          paddingTop: 2,
          paddingBottom: 2,
          position: 'relative' // for positioning the FAB
        }}
      >

        {/* Notes list (Frame 3) */}
        <Stack
          direction="column"
          alignItems="center"
          spacing={1.5}
          sx={{
            width: '100%',
            flex: '1 1 auto',
            overflowY: 'auto',
            paddingBottom: 2
          }}
        >
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </Stack>

        {/* Create (+) Fab (Frame 1,3,...) */}

        <Fab
          color="primary"
          onClick={() => navigate('/Task')}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16
          }}
          aria-label="add task"
        >
          <AddIcon />
        </Fab>

      </Stack>
    </Stack>
  )
}

export default Home
