import type { Preview } from '@storybook/react'
import '../src/index.css'
import React from 'react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className='dark-theme' style={{ padding: '.5rem' }}>
          <Story />
        </div>
      </div>
    ),
  ],
}

export default preview
