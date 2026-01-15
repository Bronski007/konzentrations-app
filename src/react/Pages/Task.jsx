import React from 'react'

import { Stack, TextField } from '@mui/material'

import TopNavigationBar from '../TopNavigationBar'

function createInput(item) {
  return (
    <TextField
      key={item}
      label={item}
      size="small"
      color="secondary"
      required
    />
  )
}

const Task = () => {
  const items = ['name', 'deadline', 'approximated time']
  return (
    <Stack
      flex="1 1 auto"
      sx={{
        width: '100%'
      }}
    >
      <TopNavigationBar name="Task" />
      <Stack
        flex="1 1 auto"
        spacing={2}
      >
        {items.map(createInput)}
      </Stack>
    </Stack>
  )
}

export default Task
