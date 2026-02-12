const taskTimeInMinutes = (value, type) => {
  const multiplier = (type === 'h') ? 60 : 1
  const minutesForTask = Number(value) * multiplier

  return minutesForTask
}

// Calculates the difference in minutes between the deadline and the current time
const differenceDateInMin = (deadline) => {
  const diff = new Date(deadline).getTime() - new Date().getTime()
  const minutes = Math.ceil(diff / (1000 * 60))

  return minutes
}

// Computes the required daily minutes to complete the task by the deadline
const getLearningTimePerDay = (minutesForTask, minutesTillDeadline) => {
  const daysUntilDeadline = minutesTillDeadline / 1440

  return minutesForTask / daysUntilDeadline
}

// Calculates a weight based on task duration, giving higher weight to shorter tasks
const weightShorterTask = (minutesForTask) => {
  if (minutesForTask <= 10) return 10
  if (minutesForTask <= 20) return 7
  if (minutesForTask <= 30) return 5
  if (minutesForTask <= 60) return 3
  return 1
}

const weightImportance = (importance) => (1 + importance * 0.2)

// Calculates a weight based the deadline
const weightDeadline = (minutesTillDeadline) => {
  const hoursTillDeadline = minutesTillDeadline / 60
  if (hoursTillDeadline <= 24) return 10
  if (hoursTillDeadline <= 48) return 7
  if (hoursTillDeadline <= 72) return 5
  if (hoursTillDeadline <= 120) return 3
  if (hoursTillDeadline <= 168) return 2
  return 1
}

const calculateTaskScore = ({ approximatedTime: { value, type }, importance, deadline }) => {
  const minutesForTask = taskTimeInMinutes(value, type)
  const minutesTillDeadline = differenceDateInMin(deadline)

  const ltpd = getLearningTimePerDay(minutesForTask, minutesTillDeadline)
  const deadlineWeight = weightDeadline(minutesTillDeadline)
  const timeWeight = weightShorterTask(minutesForTask)
  const importanceWeight = weightImportance(importance)

  const score = (deadlineWeight * timeWeight * importanceWeight) + (0.25 * ltpd)

  return score
}

export default calculateTaskScore
