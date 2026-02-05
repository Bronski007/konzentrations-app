/* eslint-disable camelcase */
const displayTime = (total_seconds) => {
  const seconds = total_seconds % 60
  const minutes = ((total_seconds - seconds) / 60) % 60
  const hours = ((total_seconds - seconds - minutes * 60)) / 3600

  return `${(hours > 0 ? `${hours < 10 ? `0${hours}` : hours}:` : '')
         + (minutes < 10 ? `0${minutes}` : minutes)}:${
    seconds < 10 ? `0${seconds}` : seconds}`
}

export default displayTime
