import React, { useState } from 'react'

import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { Stack, TextField, Button, Box } from '@mui/material'

import TopNavigationBar from '../TopNavigationBar'

const initialItems = [
  { key: 0, value: '', name: 'topic' },
  { key: 1, value: '', name: 'task' },
  { key: 2, value: '', name: 'deadline' },
  { key: 3, value: '', name: 'approximated time' },
  { key: 4, value: '', name: 'description', rows: 5 }
]

const Task = () => {
  const [items, setItems] = useState(initialItems)
  const navigate = useNavigate()

  return (
    <Box
      flex={1}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <TopNavigationBar name="Task" />
      <Stack
        flex={1}
        alignItems="center"
        sx={{
          width: '100%'
        }}
      >
        <Stack
          flex={1}
          sx={{
            width: '90%'
          }}
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
            const id = nanoid()
            localStorage.setItem(id, JSON.stringify(items))
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
    </Box>
  )
}

export default Task
