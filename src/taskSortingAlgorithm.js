const taskTimeInMinutes = (value, type) => {
  const multiplier = (type === 'h') ? 60 : 1
  const minutesForTask = Number(value) * multiplier

  return minutesForTask
}

// calculates the difference between a deadline and today in minutes
const differenceDateInMin = (deadline) => {
  const diff = new Date(deadline).getTime() - new Date().getTime()
  const minutes = Math.ceil(diff / (1000 * 60))

  return minutes
}

// calculates the minutes of a day needed to complete a task until the deadline
// Todo: Sonderfall falls Deadline heute ist und est. Time länger ist
const getLearningTimePerDay = (minutesForTask, deadline) => {
  const minutesUntilDeadline = differenceDateInMin(deadline)
  const daysUntilDeadline = minutesUntilDeadline / 1440

  return minutesForTask / daysUntilDeadline
}

// takes the time for a task and returns a wheight in order to reccommend very short tasks
const weightShorterTask = (minutesForTask) => {
  if (minutesForTask <= 10) return 10
  if (minutesForTask <= 20) return 7
  if (minutesForTask <= 30) return 5
  if (minutesForTask <= 60) return 2
  return 1
}

const weightImportance = (importance) => (1 + importance * 0.2)

const sortTasks = ({ approximatedTime: { value, type }, importance, deadline }) => {
  const minutesForTask = taskTimeInMinutes(value, type)

  const ltpd = getLearningTimePerDay(minutesForTask, deadline)
  const timeWeight = weightShorterTask(minutesForTask)
  const importanceWeight = weightImportance(importance)

  return ltpd
}

export default sortTasks
