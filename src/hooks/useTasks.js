import { useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'tasks_data'

// Create a global event system for task updates
const createTaskStore = () => {
  let tasks = []
  let listeners = []

  // Read from localStorage
  const loadTasks = () => {
    try {
      const items = localStorage.getItem(STORAGE_KEY)
      tasks = items ? JSON.parse(items) : []
    } catch (error) {
      tasks = []
    }
    return tasks
  }

  // Save to localStorage
  const saveTasks = (newTasks) => {
    tasks = newTasks
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
    // Notify all listeners
    listeners.forEach(listener => listener(newTasks))
  }

  // Subscribe to changes
  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  return { loadTasks, saveTasks, subscribe }
}

// Single global instance
const taskStore = createTaskStore()

export default function useTasks() {
  const [tasks, setTasks] = useState(() => taskStore.loadTasks())

  // Subscribe to task changes from ANY component
  useEffect(() => {
    const unsubscribe = taskStore.subscribe((newTasks) => {
      console.log('Task store updated, syncing state:', newTasks)
      setTasks(newTasks)
    })

    // Listen for storage events from other tabs
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        const newTasks = taskStore.loadTasks()
        setTasks(newTasks)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      unsubscribe()
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const addTask = useCallback((task) => {
    console.log('Adding task:', task.id)
    const currentTasks = taskStore.loadTasks()
    const newTasks = [task, ...currentTasks]
    taskStore.saveTasks(newTasks)
  }, [])

  const getTask = useCallback((id) => {
    const currentTasks = taskStore.loadTasks()
    return currentTasks.find(task => task.id === id)
  }, [])

  const removeTask = useCallback((id) => {
    console.log('REMOVING task ID:', id)
    const currentTasks = taskStore.loadTasks()
    console.log('Before removal:', currentTasks)

    const newTasks = currentTasks.filter(task => task.id !== id)
    console.log('After removal:', newTasks)

    taskStore.saveTasks(newTasks)

    // update local state immediately
    setTasks(newTasks)
  }, [])

  return { tasks, getTask, addTask, removeTask }
}
