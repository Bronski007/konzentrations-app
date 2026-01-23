import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Stack, Button, Box } from '@mui/material'

import TopNavigationBar from '../TopNavigationBar'

const Home = () => {
  const navigate = useNavigate()
  return (
    <Box
      flex={1}
      sx={{
        width: '100%',
        height: '100vh',
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <TopNavigationBar name="Todo Planner" />
      <Stack
        flex={1}
        alignItems="center"
      >
        <Stack
          flex={1}
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            width: '100%'
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate('/Task')}
            sx={{
              width: '60%',
              marginBottom: '4%'
            }}
          >
            Create Task
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Home
