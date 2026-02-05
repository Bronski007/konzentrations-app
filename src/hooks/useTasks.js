import { useEffect, useState, useCallback } from 'react'

// All task objects are stored in an array. This key accesses that array.
const STORAGE_KEY = 'tasks_data'

// Global variable to track if storage has changed
let storageListeners = []

const readTasks = () => {
  try {
    const items = localStorage.getItem(STORAGE_KEY)
    return items ? JSON.parse(items) : []
  } catch (error) {
    return []
  }
}

const notifyStorageChange = () => {
  storageListeners.forEach(listener => listener())
}

export default function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const loadedTasks = readTasks()
    console.log('Initial tasks loaded:', loadedTasks)
    return loadedTasks
  })

  // Persist tasks to localStorage whenever the task state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    // Notify other components about the storage change
    notifyStorageChange()
  }, [tasks])

  // Listen for storage changes from other components
  useEffect(() => {
    const handleStorageChange = () => {
      setTasks(readTasks())
    }
    storageListeners.push(handleStorageChange)
    // Listen to localStorage changes from other tabs/windows
    const handleStorageEvent = (e) => {
      if (e.key === STORAGE_KEY) {
        setTasks(readTasks())
      }
    }
    window.addEventListener('storage', handleStorageEvent)
    return () => {
      storageListeners = storageListeners.filter(l => l !== handleStorageChange)
      window.removeEventListener('storage', handleStorageEvent)
    }
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
