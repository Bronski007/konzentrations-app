import React from 'react'

import { Stack, TextField, Button } from '@mui/material'

import TopNavigationBar from '../TopNavigationBar'
import usePersistTask from '../../hooks/usePersistTask'

function persistTask() {
  {/* 
    - takes the input from all fields and stores them in an array
    - calls usePersistTask() to persist the data
    - validate the input?
  */}
  usePersistTask()
}

function createInputField(item) {
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
  const items = ['topic', 'task name', 'deadline', 'approximated time']
  return (
    <Stack
      flex="1 1 auto"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <TopNavigationBar name="Task" />

      <Stack
        flex="1 1 auto"
        sx={{ width: '90%' }}
        spacing={2}
      >
        {items.map(createInputField)}
        <TextField
          label="Description of your task"
          color="secondary"
          multiline
          rows={5}
        />
      </Stack>
      <Button
        variant="contained"
        onClick={() => persistTask}
        sx={{
          width: '60%',
          marginBottom: '4%'
        }}
      >
        Create Task
      </Button>
    </Stack>
  )
}

export default Task
