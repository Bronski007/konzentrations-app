import React from 'react'

import { useNavigate, useLocation } from 'react-router-dom'
import { Stack, Typography, Divider, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PropTypes from 'prop-types'

const TopNavigationBar = ({ name }) => {
  const navigate = useNavigate()

  const location = useLocation()
  const isRoot = location.pathname === '/'

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
          marginBottom: 2,
          bgcolor: 'primary.light'
        }}
      />
    </>
  )
}

TopNavigationBar.propTypes = {
  name: PropTypes.string.isRequired
}

export default TopNavigationBar
