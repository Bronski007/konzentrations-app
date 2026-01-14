import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Stack, Button } from '@mui/material'

import TopNavigationBar from '../TopNavigationBar'

const Home = () => {
  const navigate = useNavigate()
  return (
    <Stack
      flex="1 1 auto"
      direction="column"
      alignItems="center"
      sx={{
        width: '100%'
      }}
    >
      <TopNavigationBar />
      <Stack
        flex="1 1 auto"
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          width: '100%',
          bgcolor: 'primary.contrastText'
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate('/Task')}
          sx={{
            width: '60%',
            marginBottom: '30px'
          }}
        >
          Create Task
        </Button>
      </Stack>
    </Stack>
  )
}

export default Home
