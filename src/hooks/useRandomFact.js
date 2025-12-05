import { useState } from 'react'

const useRandomFact = () => {
  const [isWaiting, setIsWaiting] = useState(false)
  const [fact, setFact] = useState('')

  const getRandomFact = async () => {
    setIsWaiting(true)
    const r = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=de')
    const data = await r.json()
    setFact(data.text)
    setIsWaiting(false)
  }

  return {
    fact,
    isWaiting,
    getRandomFact
  }
}

export default useRandomFact
