import React, { useState } from 'react'

import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { Stack, TextField, Button, Box, Select, MenuItem, InputAdornment } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import useTasks from '../../hooks/useTasks'
import TopNavigationBar from '../TopNavigationBar'

const initialItems = {
  topic: '',
  title: '',
  description: '',
  approximatedTime: { value: '', type: 'min' },
  complexity: ''
}

const Task = () => {
  const [items, setItems] = useState(initialItems)
  const [deadlineDate, setDeadlineDate] = useState(null)

  const navigate = useNavigate()
  const { addTask } = useTasks()

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
          <TextField
            label="topic"
            value={items.topic}
            size="small"
            onChange={(e) => {
              const clonedItems = structuredClone(items)
              clonedItems.topic = e.target.value
              setItems(clonedItems)
            }}
          />

          <TextField
            label="title"
            value={items.title}
            size="small"
            onChange={(e) => {
              const clonedItems = structuredClone(items)
              clonedItems.title = e.target.value
              setItems(clonedItems)
            }}
          />

          <TextField
            label="approximated time"
            size="small"
            type="number"
            value={items.approximatedTime.value}
            onChange={(e) => {
              const clonedItems = structuredClone(items)
              clonedItems.approximatedTime.value = e.target.value
              setItems(clonedItems)
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Select
                      variant="standard"
                      value={items.approximatedTime.type}
                      onChange={(e) => {
                        const clonedItems = structuredClone(items)
                        clonedItems.approximatedTime.type = e.target.value
                        setItems(clonedItems)
                      }}
                      disableUnderline
                    >
                      <MenuItem value="h">h</MenuItem>
                      <MenuItem value="min">min</MenuItem>
                    </Select>
                  </InputAdornment>
                )
              }
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Deadline"
              format="DD/MM/YYYY"
              value={deadlineDate}
              slotProps={{
                textField: {
                  size: 'small'
                }
              }}
              onChange={(newDeadline) => {
                setDeadlineDate(newDeadline)
              }}
            />
          </LocalizationProvider>

          <TextField
            label="complexity"
            value={items.complexity}
            type="number"
            size="small"
            onChange={(e) => {
              const clonedItems = structuredClone(items)
              clonedItems.complexity = e.target.value
              setItems(clonedItems)
            }}
          />

          <TextField
            label="description"
            value={items.description}
            multiline
            rows="5"
            size="small"
            onChange={(e) => {
              const clonedItems = structuredClone(items)
              clonedItems.description = e.target.value
              setItems(clonedItems)
            }}
          />

        </Stack>
        <Button
          variant="contained"
          onClick={() => {
            // Creates a new task object from the current item values and adds
            addTask({
              id: nanoid(),
              topic: items.topic,
              title: items.title,
              description: items.description,
              approximatedTime: items.approximatedTime,
              complexity: Number(items.complexity),
              deadline: deadlineDate
            })
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
