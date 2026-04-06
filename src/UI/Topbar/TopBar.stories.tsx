import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopBar } from './TopBar';
import { ProjectViewData } from '../ViewData/ProjectViewData';

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
    projects: ProjectViewData.DefaultItems,
    selectedProjectId: '1',
    onProjectChange: () => { },
    onOpenPalette: () => { }
  }
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    projects: ProjectViewData.DefaultItems,
    selectedProjectId: '1',
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