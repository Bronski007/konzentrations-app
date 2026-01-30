// (zeineb) TO:DO create hook to link tasks with home note screen (substitute placeholder notes with input data from tasks) + link to local storage

import { useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'tasks_data'

const readTasks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
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

  const addTask = useCallback((task) => {
    setTasks((prev) => [{ ...task }, ...prev])
  }, [])

  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { tasks, addTask, removeTask }
}
