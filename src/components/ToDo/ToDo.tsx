import { useState } from 'react'
import styles from './ToDo.module.css'

export interface ToDoProps {
  id: number
  title: string
  completed?: boolean
}

const ToDo = ({ id, title, completed: isCompleted = false }: ToDoProps) => {
  const [completed, setCompleted] = useState(isCompleted)

  return (
    <div className={styles.toDo}>
      <input
        type='checkbox'
        id={id.toString()}
        checked={completed}
        onChange={() => setCompleted(!completed)}
      />
      <span className={completed ? styles.completed : ''}>{title}</span>
    </div>
  )
}

export default ToDo
