import type { Preview } from '@storybook/preact';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story, context) => {
      // Get theme from global args or default to brandA
      const theme = (context.globals?.theme as string) || 'brandA';
      
      // Apply theme to document root for CSS variables
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
      
      return Story();
    },
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'brandA',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'brandA', title: 'Brand A' },
          { value: 'brandB', title: 'Brand B' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
