import React, { useState } from 'react'

import { Stack, Button, Typography, CircularProgress, Divider } from '@mui/material'

const Home = () => {
  const [isWaiting, setIsWaiting] = useState(false)
  const [fact, setFact] = useState('')

  const serverCall = async () => {
    setIsWaiting(true)
    const r = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=de')
    const data = await r.json()
    setFact(data.text)
    setIsWaiting(false)
  }

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
      <Button variant="outlined" onClick={serverCall}>
        Neuer Fakt
      </Button>
    </Stack>
  )
}

export default Home
