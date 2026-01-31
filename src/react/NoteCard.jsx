import React from 'react'

import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const getColorByComplexity = (complexity) => {
  if (complexity <= 3) return '#cdfee2'
  if (complexity <= 5) return '#8ff77c'
  if (complexity <= 7) return '#f3bd8a'
  return '#ff8787'
}

const NoteCard = ({ task: { title, deadline, complexity, approximatedTime, description }, onClick }) => (
  <Stack
    direction="column"
    spacing={1}
    onClick={onClick}
    sx={{
      width: '95%',
      borderRadius: 3,
      padding: 1.5,
      bgcolor: getColorByComplexity(complexity),
      color: '#0f172a'
    }}
  >
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack
        direction="row"
        alignItems="baseline"
        spacing={0.6}
      >
        <Typography variant="h6" fontWeight="700">
          {title}
        </Typography>

        <Typography variant="body1">
          (
          {approximatedTime}
          h)
        </Typography>
      </Stack>

      <Typography variant="body1">
        {deadline}
      </Typography>

    </Stack>
    <Typography variant="body2">
      {description}
    </Typography>
  </Stack>
)

NoteCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    deadline: PropTypes.string,
    complexity: PropTypes.number.isRequired,
    approximatedTime: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

export default NoteCard
