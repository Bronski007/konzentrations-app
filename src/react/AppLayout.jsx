import React from 'react'

import {
  Stack,
  Container,
  Paper
} from '@mui/material'

import AppRoutes from './AppRoutes'

const borderRadius = 6

const AppLayout = () => (
  <Stack
    direction="row"
    justifyContent="center"
    sx={{
      width: '100%',
      height: '100%',
      paddingTop: theme => theme.spacing(5),
      paddingBottom: theme => theme.spacing(5)
    }}
  >
    <Container
      maxWidth="sm"
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 2,
          paddingRight: 1,
          paddingBottom: 2,
          paddingLeft: 1,
          overflow: 'hidden',
          borderRadius: theme => theme.spacing(borderRadius),
          background: theme => theme.palette.grey[900]
        }}
      >
        <Stack
          flex="1 1 auto"
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            overflow: 'hidden',
            borderRadius: theme => theme.spacing(borderRadius),
            background: theme => theme.palette.background.paper
          }}
        >
          <AppRoutes />
        </Stack>
      </Paper>
    </Container>
  </Stack>
)

export default AppLayout
