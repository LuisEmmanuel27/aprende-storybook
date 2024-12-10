import { Meta } from '@storybook/react'
import { ToDoList } from './ToDoList'
import { http, HttpResponse } from 'msw'
import { todos } from './__fixtures__/todos'
import { expect, userEvent, within } from '@storybook/test'

const meta = {
  title: 'Components/ToDoList',
  component: ToDoList,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const todoInput = canvas.getByLabelText('Todo')
    await userEvent.type(todoInput, 'Buy milk')

    const saveButton = canvas.getByRole('button')
    await userEvent.click(saveButton)

    const newTodo = canvas.getByText('Buy milk')
    await expect(newTodo).toBeInTheDocument()
  },
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
