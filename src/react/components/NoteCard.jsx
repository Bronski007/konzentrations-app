import React from 'react'

import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const getColorByComplexity = (complexity) => {
  if (complexity <= 3) return '#bae6fd' // very easy (light blue)
  if (complexity <= 5) return '#7dd3fc' // easy (blue)
  if (complexity <= 7) return '#fde68a' // medium (yellow)
  if (complexity <= 9) return '#fca5a5' // hard (light red)
  return '#ef4444' // very hard (red)
}

const NoteCard = ({ note }) => (
  <Stack
    direction="column"
    spacing={0.5}
    sx={{
      width: '90%',
      borderRadius: 2,
      padding: 1.5,
      bgcolor: getColorByComplexity(Number(note.complexity)),
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
