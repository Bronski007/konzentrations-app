import React from 'react'

import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const NoteCard = ({ task: { title, approximatedTime: { value, type }, deadline, description }, onClick }) => (
  <Stack
    direction="column"
    overflow="hidden"
    spacing={1}
    onClick={onClick}
    sx={{
      width: '95%',
      borderRadius: '1rem',
      padding: 1.5,
      bgcolor: 'primary.light',
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
          {`${value}${type}`}
        </Typography>
      </Stack>

      <Typography variant="body1">
        {new Date(deadline).toLocaleDateString('de-DE')}
      </Typography>

    </Stack>
    <Typography
      variant="body2"
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
    >
      {description}
    </Typography>
  </Stack>
)

NoteCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    approximatedTime: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

export default NoteCard
