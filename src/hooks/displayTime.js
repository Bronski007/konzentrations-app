const displayTime = (totalSeconds) => {
  const seconds = totalSeconds % 60
  const minutes = ((totalSeconds - seconds) / 60) % 60
  const hours = ((totalSeconds - seconds - minutes * 60)) / 3600

  const time = `${hours > 0 ? `${hours < 10 ? '0' : ''}${hours}:` : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

  return time
}

export default displayTime
