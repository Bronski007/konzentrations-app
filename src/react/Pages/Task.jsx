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
      flex={1}
      sx={{
        width: '100%',
        overflow: 'hidden',
        bgcolor: 'primary.background'
      }}
    >
      <TopNavigationBar name="Task" />
      <Stack
        flex={1}
        spacing={2}
        alignItems="center"
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <Card sx={{ borderRadius: '2rem', width: '90%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Create task</Typography>
            <Stack
              spacing={2}
            >
              <TextField
                label="Title"
                value={items.title}
                size="small"
                slotProps={{
                  input: { sx: { borderRadius: '1rem' } },
                  htmlInput: {
                    maxLength: 20
                  }
                }}
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
                  label="Deadline"
                  format="DD/MM/YYYY"
                  value={deadlineDate}
                  disablePast
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
              </Stack>

              <TextField
                label="Description"
                value={items.description}
                slotProps={{
                  input: { sx: { borderRadius: '1rem' } },
                  htmlInput: { maxLength: 300 }
                }}
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
              title: items.title,
              description: items.description,
              approximatedTime: items.approximatedTime,
              importance: Number(items.importance),
              deadline: deadlineDate
            })
            navigate(-1)
          }}
          sx={{ borderRadius: '2rem', width: '90%' }}
          disabled={items.title.trim() === '' || items.description.trim() === '' || items.approximatedTime.value.trim() === '' || deadlineDate === null}
        >
          Create Task
        </Button>
      </Stack>
    </Box>
  )
}

export default Task
