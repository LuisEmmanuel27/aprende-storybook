import { useEffect, useState } from 'react'
import ToDo, { ToDoProps } from '../ToDo/ToDo'

export const ToDoList = () => {
  const [todos, setTodos] = useState<ToDoProps[] | undefined>()
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => response.json())
      .then((json) => setTodos(json))
      .catch(() => setError(true))
  }, [])

  return (
    <div>
      <h1>Todo List</h1>
      {error && <h1>Error, intenta más tarde</h1>}
      {todos?.map((item) => (
        <ToDo {...item} />
      ))}
    </div>
  )
}
