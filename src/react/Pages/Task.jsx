import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { Stack, TextField, Button } from '@mui/material'

import TopNavigationBar from '../TopNavigationBar'
import usePersistTask from '../../hooks/usePersistTask'

const Task = () => {
  const initialItems = [
    { key: 0, value: '', name: 'topic' },
    { key: 1, value: '', name: 'name' },
    { key: 2, value: '', name: 'deadline' },
    { key: 3, value: '', name: 'approximated time' },
    { key: 4, value: '', name: 'description', rows: 5 }
  ]
  const [items, setItems] = useState(initialItems)

  const persistTask = usePersistTask()
  const navigate = useNavigate()

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
            multiline={item.rows > 1}
            rows={item.rows ?? 1}
            size="small"
            color="secondary"
            onChange={(event) => {
              const newItems = [...items]
              newItems[item.key].value = event.target.value
              setItems(newItems)
            }}
          />
        ))}
      </Stack>

      <Button
        variant="contained"
        onClick={() => {
          persistTask(items)
          navigate(-1)
        }}
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
