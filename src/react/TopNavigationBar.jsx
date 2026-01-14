import React from 'react'

import { Typography, Divider } from '@mui/material'

const TopNavigationBar = () => (
  <>
    <Typography
      variant="h4"
      sx={{
        width: 600,
        padding: '20px',
        fontWeight: 700,
        color: 'primary.contrastText',
        bgcolor: 'primary.main'
      }}
    >
      Todo-planner
    </Typography>
    <Divider
      flexItem
      sx={{
        borderBottomWidth: 3,
        bgcolor: 'primary.light'
      }}
    />
  </>
)

export default TopNavigationBar
