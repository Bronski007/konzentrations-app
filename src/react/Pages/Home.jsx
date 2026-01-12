import React from 'react'

import { Stack, Typography, Divider } from '@mui/material'

const Home = () => (
  <Stack
    flex="1 1 auto"
    direction="column"
    sx={{
      width: '100%',
      background: '#ccecfa'
    }}
  >
    <Typography
      variant="h4"
      sx={{
        width: 600,
        padding: '20px',
        background: '#35afea',
        fontWeight: 700
      }}
    >
      Todo-planner
    </Typography>
    <Divider
      flexItem
      sx={{
        borderBottomWidth: 3,
        background: '#039be5'
      }}
    />
  </Stack>
)

export default Home
