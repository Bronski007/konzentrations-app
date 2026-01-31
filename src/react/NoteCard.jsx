import React from 'react'

import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const getColorByComplexity = (complexity) => {
  if (complexity <= 3) return '#cdfee2'
  if (complexity <= 5) return '#8ff77c'
  if (complexity <= 7) return '#f3bd8a'
  return '#ff8787'
}

const NoteCard = ({ note }) => (
  <Stack
    direction="column"
    sx={{
      width: '95%',
      borderRadius: 3,
      padding: 1.5,
      bgcolor: getColorByComplexity(note.complexity),
      color: '#0f172a'
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography fontWeight={700}>{note.title}</Typography>
      {note.date ? (
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          {note.date}
        </Typography>
      ) : null}
    </Stack>

    {note.description ? (
      <Typography variant="body2" sx={{ opacity: 0.95 }}>
        {note.description}
      </Typography>
    ) : null}
  </Stack>
)

NoteCard.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string,
    complexity: PropTypes.number.isRequired
  }).isRequired
}

export default NoteCard
