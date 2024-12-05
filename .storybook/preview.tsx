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
  globalTypes: {
    theme: {
      description: 'Dark or Light Theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark', 'both'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals

      if (theme === 'light') {
        return <Story />
      }

      if (theme === 'dark') {
        return (
          <div className='dark-theme' style={{ padding: '.5rem' }}>
            <Story />
          </div>
        )
      }

      return (
        <div>
          <Story />
          <div className='dark-theme' style={{ padding: '.5rem' }}>
            <Story />
          </div>
        </div>
      )
    },
  ],
}

export default preview
