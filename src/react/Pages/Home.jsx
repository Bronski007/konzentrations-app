import React from 'react'

import { Stack, Button, Typography, CircularProgress, Divider } from '@mui/material'

import useRandomFact from '../../hooks/useRandomFact'

const Home = () => {
  const { fact, isWaiting, getRandomFact } = useRandomFact()

  return (
    <Stack flex="1 1 auto" justifyContent="center" alignItems="center" divider={<Divider orientation="horizontal" flexItem />} spacing={4} margin={2}>
      <Typography variant="h3">
        Zufällige Fakten
      </Typography>
      {
        isWaiting
          && <CircularProgress />
      }
      {
        !isWaiting && fact
          && <h3>{fact}</h3>
      }
      <Button variant="outlined" onClick={getRandomFact}>
        Neuer Fakt
      </Button>
    </Stack>
  )
}

export default Home
