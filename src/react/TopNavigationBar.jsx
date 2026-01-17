import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Stack, Typography, Divider, IconButton, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const TopNavigationBar = ({ name }) => {
  const navigate = useNavigate()

  const location = window.location.pathname
  const isRoot = location === '/'

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 10000 }}>
      <Stack
        display="flex"
        direction="row"
        spacing={2}
        sx={{
          width: '100%',
          padding: '2% 3%',
          color: 'primary.contrastText',
          bgcolor: 'primary.main'
        }}
      >
        {!isRoot && (
          <IconButton
            onClick={() => navigate(-1)}
          >
            <CloseIcon
              sx={{ color: 'primary.contrastText' }}
            />
          </IconButton>
        )}

        <Typography
          variant="h4"
          sx={{ fontWeight: 700, overflow: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none' }}
        >
          {name}
        </Typography>
      </Stack>

      <Divider
        flexItem
        sx={{
          borderBottomWidth: 3,
          bgcolor: 'primary.light'
        }}
      />
    </Box>
  )
}

export default TopNavigationBar
