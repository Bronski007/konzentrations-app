import React, { useState } from 'react'

import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { Stack, TextField, Button, Box } from '@mui/material'

import useTasks from '../../hooks/useTasks'

import TopNavigationBar from '../TopNavigationBar'

const Task = () => {
  const initialItems = [
    { key: 0, value: '', name: 'topic' },
    { key: 1, value: '', name: 'name' },
    { key: 2, value: '', name: 'deadline' },
    { key: 3, value: '', name: 'complexity' },
    { key: 4, value: '', name: 'approximated time' },
    { key: 5, value: '', name: 'description', rows: 5 }
  ]
  const [items, setItems] = useState(initialItems)

  const { addTask } = useTasks()

  const navigate = useNavigate()

  const getValue = (name) => items.find((it) => it.name === name)?.value ?? ''

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
      <TopNavigationBar name="Task" />
      <Stack
        flex="1 1 auto"
        alignItems="center"
        sx={{ width: '100%' }}
      >

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
              type={item.name === 'complexity' ? 'number' : 'text'}
              slotProps={{ input: item.name === 'complexity' ? { min: 1, max: 10 } : undefined }}
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
            const task = {
              id: nanoid(),
              title: getValue('name'),
              description: getValue('description'),
              date: getValue('deadline'),
              complexity: Number(getValue('complexity'))
            }
            addTask(task)
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
