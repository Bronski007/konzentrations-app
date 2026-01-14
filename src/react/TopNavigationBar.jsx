import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Stack, Typography, Divider, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const TopNavigationBar = ({ name }) => {
  const navigate = useNavigate()

  const location = window.location.pathname
  const isRoot = location === '/'

  return (
    <>
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
            <ArrowBackIcon
              sx={{ color: 'primary.contrastText' }}
            />
          </IconButton>
        )}

        <Typography
          variant="h4"
          sx={{ fontWeight: 700 }}
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
    </>
  )
}

export default TopNavigationBar
