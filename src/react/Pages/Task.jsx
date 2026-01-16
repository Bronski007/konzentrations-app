import React, { useState } from 'react'

import { Stack, TextField, Button } from '@mui/material'

import TopNavigationBar from '../TopNavigationBar'

const Task = () => {
  const initialItems = [
    { key: 0, value: '', name: 'topic' },
    { key: 1, value: '', name: 'task name' },
    { key: 2, value: '', name: 'deadline' },
    { key: 3, value: '', name: 'approximated time' }
  ]

  const [items, setItems] = useState(initialItems)

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
        {items.map((item) => (
          <TextField
            key={item.key}
            label={item.name}
            value={item.value}
            size="small"
            color="secondary"
            onChange={(event) => {
              const newItems = [...items]
              newItems[item.key].value = event.target.value
              setItems(newItems)
            }}
            required
          />
        ))}

        <TextField
          label="Description of your task"
          color="secondary"
          multiline
          rows={5}
        />
      </Stack>

      <Button
        variant="contained"
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
