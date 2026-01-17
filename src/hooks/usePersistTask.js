const usePersistTask = () => {
  const persist = (task) => {
    localStorage.setItem('value', JSON.stringify(task))
  }

  return persist
}

export default usePersistTask
