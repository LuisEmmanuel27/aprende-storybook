import { Meta } from '@storybook/react'
import ToDo from './ToDo'

const meta = {
  title: 'Components/ToDo',
  component: ToDo,
  args: {
    id: 1,
    title: 'Hello World',
  },
} satisfies Meta<typeof ToDo>

export default meta

export const Default = {}

export const Story2 = {
  args: {
    title: 'Hello Storybook',
  },
}

export const Completed = {
  args: {
    title: 'Im completed',
    completed: true,
  },
}
