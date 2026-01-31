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

  // updates the local storage when ever the state of taks changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => setTasks((prev) => [{ ...task }, ...prev])

  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { tasks, addTask, removeTask }
}
