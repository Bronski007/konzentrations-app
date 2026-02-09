import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Stack, Typography, Divider, IconButton, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'

const TopNavigationBar = ({ name, xButtonDisabled }) => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10000
      }}
    >
      <Stack
        display="flex"
        direction="row"
        sx={{
          width: '100%',
          padding: '2% 3%',
          color: 'primary.contrastText',
          bgcolor: 'primary.main'
        }}
      >
        {
          xButtonDisabled ? <Box marginLeft={5} /> :
          <IconButton
            onClick={() => navigate(-1)}
          >
            <CloseIcon
              sx={{
                color: 'primary.contrastText'
              }}
            />
          </IconButton>
        }
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            overflow: 'auto',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none'
          }}
        >
          {name}
        </Typography>
      </Stack>

      <Divider
        flexItem
        sx={{
          borderBottomWidth: 3,
          marginBottom: 2,
          bgcolor: 'primary.divider'
        }}
      />
    </Box>
  )
}

TopNavigationBar.propTypes = {
  name: PropTypes.string.isRequired,
  xButtonDisabled: PropTypes.bool
}

export default TopNavigationBar
