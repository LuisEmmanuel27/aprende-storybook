import { Meta } from '@storybook/react'
import { ToDoList } from './ToDoList'
import { http, HttpResponse } from 'msw'
import { todos } from './__fixtures__/todos'

const meta = {
  title: 'Components/ToDoList',
  component: ToDoList,
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
