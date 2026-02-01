import React, { useState } from 'react'

import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { Stack, TextField, Button, Box, Select, MenuItem, InputAdornment } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import useTasks from '../../hooks/useTasks'
import TopNavigationBar from '../TopNavigationBar'

const initialItems = [
  { key: 0, value: '', name: 'topic' },
  { key: 1, value: '', name: 'title' },
  { key: 2, value: '', name: 'deadline' },
  { key: 3, value: '', name: 'complexity' },
  { key: 4, value: '', name: 'approximated time' },
  { key: 5, value: '', name: 'description', rows: 5 }
]

const Task = () => {
  const [items, setItems] = useState(initialItems)
  const [date, setDate] = useState(null)
  const [[time, type], setTime] = useState(['', 'min'])
  const navigate = useNavigate()

  const { addTask } = useTasks()

  // Returns the current value of a TextField identified by its name
  const getFieldValue = (fieldName) => items.find((item) => item.name === fieldName)?.value ?? ''

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
            label="approximated time"
            size="small"
            color="secondary"
            value={time}
            onChange={(e) => setTime([e.target.value, type])}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Select
                      variant="standard"
                      value={type}
                      onChange={(e) => setTime([time, e.target.value])}
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
              value={date}
              slotProps={{
                textField: {
                  size: 'small'
                }
              }}
              onChange={(newDate) => setDate(newDate)}
            />
          </LocalizationProvider>

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
              slotProps={{
                input: { inputProps: { min: 0, max: 10 } }
              }}
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
            // Creates a new task object from the current item values and adds
            addTask(
              {
                id: nanoid(),
                topic: getFieldValue('topic'),
                title: getFieldValue('title'),
                deadline: getFieldValue('deadline'),
                complexity: Number(getFieldValue('complexity')),
                approximatedTime: getFieldValue('approximated time'),
                description: getFieldValue('description')
              }
            )
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
