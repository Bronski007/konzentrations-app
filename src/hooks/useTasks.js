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

  // Persist tasks to localStorage whenever the task state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  // Add a new task to the beginning of the task list
  const addTask = (task) => setTasks((prev) => [{ ...task }, ...prev])

  // Retrieve a single task by its id
  const getTask = (id) => tasks.find(task => task.id === id)

  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { tasks, getTask, addTask, removeTask }
}
