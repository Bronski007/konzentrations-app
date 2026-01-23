import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Stack, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import TopNavigationBar from '../TopNavigationBar'

import NoteCard from '../components/NoteCard'

const Home = () => {
  const navigate = useNavigate()

  // temporary mock notes until replacement with backend data
  const notes = [
    {
      id: 1,
      title: 'Biology Assignment',
      description: 'Complete the biology assignment on genetics.',
      date: '2026-01-13',
      complexity: 6
    },
    {
      id: 2,
      title: 'Math Homework',
      description: 'Finish tasks 2 to 6 from chapter 4 and check solutions.',
      date: '2026-01-15',
      complexity: 10
    }
  ]

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
