import React, { useState } from 'react'

import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'

import { Slider, Typography, Stack, TextField, Button, Box, Select, MenuItem, InputAdornment, Card, CardContent } from '@mui/material'
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
  complexity: 1
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
        overflow: 'hidden',
        background: '#fafcff'
      }}
    >
      <TopNavigationBar name="Task" />
      <Stack
        flex={1}
        spacing={2}
        alignItems="center"
        sx={{
          width: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          margin: '0 auto'
        }}
      >
        <Card sx={{ borderRadius: '2rem', width: '90%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>create task</Typography>
            <Stack
              sx={{
                width: '100%',
                margin: '0 auto'
              }}
              spacing={2}
            >
              <TextField
                label="topic"
                slotProps={{ input: { sx: { borderRadius: '1rem' } } }}
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
                slotProps={{ input: { sx: { borderRadius: '1rem' } } }}
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
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                borderRadius: '1rem'
                              }
                            }
                          }}
                        >
                          <MenuItem value="min">min</MenuItem>
                          <MenuItem value="h">h</MenuItem>
                        </Select>
                      </InputAdornment>
                    ),
                    sx: { borderRadius: '1rem' }
                  }
                }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="deadline"
                  format="DD/MM/YYYY"
                  value={deadlineDate}
                  slotProps={{
                    textField: {
                      size: 'small',
                      InputProps: {
                        sx: { borderRadius: '1rem' }
                      }
                    },
                    popper: {
                      sx: {
                        '& .MuiPaper-root': {
                          borderRadius: '1rem'
                        }
                      }
                    }
                  }}
                  onChange={(newDeadline) => {
                    setDeadlineDate(newDeadline)
                  }}
                />
              </LocalizationProvider>

              <Stack
                spacing={1}
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: '1rem',
                  padding: 2,
                  flexDirection: 'column'
                }}
              >
                <Typography>
                  complexity:
                  {' '}
                  {items.complexity || 1}
                </Typography>

                <Slider
                  value={items.complexity || 1}
                  min={1}
                  max={10}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                  onChange={(_, newValue) => {
                    const clonedItems = structuredClone(items)
                    clonedItems.complexity = newValue
                    setItems(clonedItems)
                  }}
                />
              </Stack>

              <TextField
                label="description"
                slotProps={{ input: { sx: { borderRadius: '1rem' } } }}
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
          </CardContent>
        </Card>
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
          sx={{ borderRadius: '2rem', width: '90%' }}
          disabled={items.topic.trim() === '' || items.title.trim() === '' || items.description.trim() === '' || items.approximatedTime.value.trim() === '' || deadlineDate === null}
        >
          Create Task
        </Button>
      </Stack>
    </Box>
  )
}

export default Task
