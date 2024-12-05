# Hacemos fetch de datos y utilizamos la extensión MSW para hacer mock 📚

1. Vamos a reorganizar un poco el codigo, creando una carpeta ToDo para guardar nestro componente, stories y estilos.
2. Seguido de ello vamos a crear una nueva carpeta y componente de nombre `ToDoList` para el componente que va a mostrar los todos los ToDos.
3. Vamos a hacer uso de la extensión MSW para hacer el mock de datos, pero antes que nada para el fetch usaremos jsonplaceholder, por lo que agregamos lo siguiente a nuestro componente ToDoList:

```jsx
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
```

4. Esto dara varios errores por lo que debemos hacer algunos ajustes, modificamos nuestro componente ToDo para que la interface se pueda exportar, además de actualizarla a como nos responde jsonplaceholder:

```jsx
import { useState } from 'react'
import styles from './ToDo.module.css'

// interface actualizada
export interface ToDoProps {
  id: number
  title: string
  completed?: boolean
}

// props actualizados
const ToDo = ({ id, title, completed: isCompleted = false }: ToDoProps) => {
  const [completed, setCompleted] = useState(isCompleted)

  return (
    <div className={styles.toDo}>
      <input
        type='checkbox'
        // id pasado a string o dara error
        id={id.toString()}
        checked={completed}
        onChange={() => setCompleted(!completed)}
      />
      <span className={completed ? styles.completed : ''}>{title}</span>
    </div>
  )
}

export default ToDo
```

5. Además debemos también actualizar nuestro archivo de stories para que coincida con el cambio de la interface y componente:

```jsx
import { Meta } from '@storybook/react'
import ToDo from './ToDo'

const meta = {
  title: 'Components/ToDo',
  component: ToDo,
  args: {
    id: 1, // modificado
    title: 'Hello World', // modificado
  },
} satisfies Meta<typeof ToDo>

export default meta

export const Default = {}

export const Story2 = {
  args: {
    title: 'Hello Storybook', // modificado
  },
}

export const Completed = {
  args: {
    title: 'Im completed', // modificado
    completed: true, // modificado
  },
}
```

6. Realizado lo anterior los errores deberían desaparecer y veremos con normalidad la pagina de Storybook.
7. Ahora agregamos nuestro ToDoList a la pagina de Storybook modificando el archivo `ToDoList.stories.tsx`:

```jsx
import { Meta } from '@storybook/react'
import { ToDoList } from './ToDoList'

const meta = {
  title: 'Components/ToDoList',
  component: ToDoList,
} satisfies Meta<typeof ToDoList>

export default meta

export const Default = {}
```

8. Revisamos que se ha creado el componente en la pagina de Storybook.
9. En la [documentación](https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-network-requests#set-up-the-msw-addon) vemos como instalar la extensión MSW, en este caso el comando es:

```bash
pnpm add msw msw-storybook-addon --save-dev
```

10. Para más información sobre la extensión MSW podemos ir a su [documentación](https://msw-sb.vercel.app/?path=/docs/guides-getting-started--docs), la cuál vamos a seguir un poco para configurar la extensión.
11. Empezando por crear el service worker:

```bash
npx msw init public/
```

12. Seguido de eso vamos a nuestro archivo `preview.tsx` y agregamos lo siguiente:

```jsx
import { initialize } from 'msw-storybook-addon' // agregado
import { mswLoader } from 'msw-storybook-addon' // agregado

initialize() // agregado

const preview: Preview = {
  loaders: [mswLoader], // agregado
  .
  .
  .
}
```

13. Creamos una carpeta `__fixtures__` dentro de los archivos de `ToDoList` y dentro de ella creamos un archivo `todos.ts` que va a contener los datos de los ToDos, para ello vamos a crear un array de objetos `ToDoProps` y luego exportamos el mismo:

```ts
import { ToDoProps } from '../../ToDo/ToDo'

export const todos: ToDoProps[] = [
  {
    id: 1,
    title: 'Hello World',
    completed: false,
  },
  {
    id: 2,
    title: 'Hello Storybook',
    completed: false,
  },
  {
    id: 3,
    title: 'Im completed',
    completed: true,
  },
]
```

14. Finalmente en ToDoList.stories.tsx agregamos los parameters de MSW:

```jsx
import { Meta } from '@storybook/react'
import { ToDoList } from './ToDoList'
import { http, HttpResponse } from 'msw'
import { todos } from './__fixtures__/todos'

const meta = {
  title: 'Components/ToDoList',
  component: ToDoList,
  // agregados
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?_limit=10', () => {
          return HttpResponse.json(todos)
        }),
      ],
    },
  },
} satisfies Meta<typeof ToDoList>

export default meta

export const Default = {}
```

15. Revisamos que el componente ToDoList ya no haga el fech a jsonplaceholder, sino que debe aparecer los ToDos que tenemos en nuestro archivo `todos.ts`.
16. También podemos simular un error y darle su propia story, para ello solo agregamos lo siguiente al final de nuestro archivo `ToDoList.stories.tsx`:

```jsx
export const Default = {}

export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?_limit=10', () => {
          return HttpResponse.error()
        }),
      ],
    },
  },
}
```

17. Revisamos que aparezca una nueva story en la pagina de Storybook dondé vemos que pasa si hay un error.