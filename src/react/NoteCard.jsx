import React from 'react'
import { Stack, Typography, Card, CardContent } from '@mui/material'
import EventIcon from '@mui/icons-material/Event'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'

import PropTypes from 'prop-types'

const NoteCard = ({ task: { title, approximatedTime: { value, type }, deadline, description }, onClick }) => (
  <Card sx={{ borderRadius: '2rem', flex: 1, width: '100%', cursor: 'pointer' }}>
    <CardContent>
      <Stack
        direction="column"
        overflow="hidden"
        spacing={1}
        onClick={onClick}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={0.5} sx={{ position: 'relative', top: '-0.25rem' }}>
              <HourglassTopIcon fontSize="small" color="action" />
              <Typography variant="body2" color="textSecondary">{`${value}${type}`}</Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} sx={{ position: 'relative', top: '-0.25rem' }}>
              <EventIcon fontSize="small" color="action" />
              <Typography variant="body2" color="textSecondary">{new Date(deadline).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })}</Typography>
            </Stack>
          </Stack>

        </Stack>
        <Typography
          variant="body1"
          sx={{
            wordWrap: 'break-word',
            scrollbarWidth: 'none'
          }}
        >
          {description}
        </Typography>
      </Stack>
    </CardContent>
  </Card>
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
