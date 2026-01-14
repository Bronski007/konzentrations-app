import React from 'react'

import { Stack } from '@mui/material'

import TopNavigationBar from '../TopNavigationBar'

const Task = () => (
  <Stack
    flex="1 1 auto"
    sx={{
      width: '100%'
    }}
  >
    <TopNavigationBar name="Task" />
  </Stack>
)

export default Task
