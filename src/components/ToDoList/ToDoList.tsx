import { useEffect, useState } from 'react'
import ToDo, { ToDoProps } from '../ToDo/ToDo'
import { Button } from '../../stories/Button'

export const ToDoList = () => {
  const [todos, setTodos] = useState<ToDoProps[] | undefined>()
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => response.json())
      .then((json) => setTodos(json))
      .catch(() => setError(true))
  }, [])

  const onSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const title = formData.get('todo') as string

    if (!title) return

    const newTodo: ToDoProps = {
      id: (todos?.length || 0) + 1,
      title,
      completed: false,
    }

    setTodos([newTodo, ...(todos || [])])
    event.currentTarget.reset()
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={onSave}>
        <label htmlFor='todo'>Todo</label>
        <input type='text' name='todo' id='todo' />
        <Button label='Guardar' primary type='submit' />
      </form>
      {error && <h1>Error, intenta más tarde</h1>}
      {todos?.map((item) => (
        <ToDo {...item} />
      ))}
    </div>
  )
}
