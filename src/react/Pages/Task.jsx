import React, { useState } from 'react'

import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'

import { Slider, Typography, Stack, TextField, Button, Box, Select, MenuItem, InputAdornment } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import useTasks from '../../hooks/useTasks'
import TopNavigationBar from '../TopNavigationBar'

const initialItems = {
  title: '',
  description: '',
  approximatedTime: { value: '', type: 'min' },
  importance: 1
}

const Task = () => {
  const [items, setItems] = useState(initialItems)
  const [deadlineDate, setDeadlineDate] = useState(null)

  const navigate = useNavigate()
  const { addTask } = useTasks()

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <TopNavigationBar name="Task" />
      <Stack
        flex={1}
        alignItems="center"
        sx={{
          width: '100%',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <Stack
          sx={{
            width: '90%',
            margin: '0 auto',
            padding: 2,
            paddingBottom: 4
          }}
          spacing={2}
        >
          <TextField
            label="Title"
            value={items.title}
            size="small"
            slotProps={{
              htmlInput: {
                maxLength: 20
              }
            }}
            required
            onChange={(e) => {
              const clonedItems = structuredClone(items)
              clonedItems.title = e.target.value
              setItems(clonedItems)
            }}
          />

          <TextField
            label="Approximated Time"
            size="small"
            type="number"
            value={items.approximatedTime.value}
            required
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
              disablePast
              required
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

          <Box
            spacing={1}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              padding: 2,
              flexDirection: 'column'
            }}
          >
            <Typography>
              Importance:
              {' '}
              {items.importance || 1}
            </Typography>

            <Slider
              value={items.importance || 1}
              min={1}
              max={5}
              step={1}
              marks
              valueLabelDisplay="auto"
              onChange={(_, newValue) => {
                const clonedItems = structuredClone(items)
                clonedItems.importance = newValue
                setItems(clonedItems)
              }}
            />
          </Box>

          <TextField
            label="Description"
            value={items.description}
            slotProps={{
              htmlInput: {
                maxLength: 150
              }
            }}
            multiline
            rows="5"
            size="small"
            required
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
              title: items.title,
              description: items.description,
              approximatedTime: items.approximatedTime,
              importance: Number(items.importance),
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
