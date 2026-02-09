// calculates the difference between a deadline and today in minutes
const differenceDateInMin = (deadline) => {
  const diff = new Date(deadline).getTime() - new Date().getTime()
  const minutes = Math.ceil(diff / (1000 * 60))

  return minutes
}

const getHoursPerDay = (value, type, deadline) => {
  const multiplier = (type === 'h') ? 60 : 1
  const minutesForTask = Number(value) * multiplier
  const minutesBetweenDates = differenceDateInMin(deadline)

  return minutesBetweenDates / minutesForTask // momentan prozent der zeit von heute bis deadline
}

const sortTasks = ({ approximatedTime: { value, type }, importance, deadline }) => {
  const hpd = getHoursPerDay(value, type, deadline)
  return hpd
}

export default sortTasks
