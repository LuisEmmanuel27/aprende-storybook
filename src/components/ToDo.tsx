import { useState } from 'react'
import styles from './ToDo.module.css'

interface ToDoProps {
  id: string
  todo: string
  isDone?: boolean
}

const ToDo = ({ id, todo, isDone }: ToDoProps) => {
  const [completed, setCompleted] = useState(isDone)

  return (
    <div className={styles.toDo}>
      <input
        type='checkbox'
        id={id}
        checked={completed}
        onChange={() => setCompleted(!completed)}
      />
      <span className={completed ? styles.completed : ''}>{todo}</span>
    </div>
  )
}

export default ToDo
