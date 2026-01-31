// (zeineb) TO:DO create hook to link tasks with home note screen (substitute placeholder notes with input data from tasks) + link to local storage

import { useEffect, useState, useCallback } from 'react'

// All task objects are stored in an array. This key accesses that array.
const STORAGE_KEY = 'tasks_data'

const readTasks = () => {
  try {
    const items = localStorage.getItem(STORAGE_KEY)
    return items ? JSON.parse(items) : []
  } catch (error) {
    return []
  }
}

export default function useTasks() {
  const [tasks, setTasks] = useState(() => readTasks())

  // keeping localStorage in sync
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => setTasks((prev) => [{ ...task }, ...prev])

  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { tasks, addTask, removeTask }
}
