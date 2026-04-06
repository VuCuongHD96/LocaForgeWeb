import type { Meta, StoryObj } from '@storybook/react-vite';

import { TopBar } from './TopBar';

const meta = {
  title: 'TopBar/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'TopBar component with LocalizeForge styling. This component provides the main application header with project selection, search functionality, and user actions.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="lf-app">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    selectedProjectId: {
      control: 'text',
      description: 'ID of the currently selected project'
    },
    onProjectChange: {
      action: 'projectChanged',
      description: 'Callback function when project is changed'
    },
    onOpenPalette: {
      action: 'paletteOpened',
      description: 'Callback function when search palette is opened'
    }
  },
  args: {
    selectedProjectId: 'project-1',
    onProjectChange: () => { },
    onOpenPalette: () => { }
  }
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedProjectId: 'project-1',
    onProjectChange: () => { },
    onOpenPalette: () => { }
  },
  parameters: {
    docs: {
      description: {
        story: 'Default TopBar with basic functionality. The project selector is currently disabled (commented out) but the search trigger and user actions are functional.'
      }
    }
  }
};

export const WithSelectedProject: Story = {
  args: {
    selectedProjectId: 'demo-project-123',
    onProjectChange: () => { },
    onOpenPalette: () => { }
  },
  parameters: {
    docs: {
      description: {
        story: 'TopBar with a specific project selected. The selectedProjectId prop determines which project would be highlighted in the dropdown when projects are enabled.'
      }
    }
  }
};

export const Interactive: Story = {
  args: {
    selectedProjectId: 'interactive-project',
    onProjectChange: () => { },
    onOpenPalette: () => { }
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive TopBar with all callbacks active. Click the search trigger to see the onOpenPalette action, or interact with the project selector to see onProjectChange actions when projects are enabled.'
      }
    }
  }
};

export const MacKeyboard: Story = {
  args: {
    selectedProjectId: 'mac-project',
    onProjectChange: () => { },
    onOpenPalette: () => { }
  },
  parameters: {
    docs: {
      description: {
        story: 'TopBar displaying Mac keyboard shortcuts (⌘+K). The component automatically detects Mac platform and shows appropriate keyboard modifiers.'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="lf-app">
        <div style={{ marginBottom: '20px', color: 'var(--lf-text-muted)' }}>
          Simulating Mac platform - should show ⌘+K shortcut
        </div>
        <Story />
      </div>
    ),
  ],
};
