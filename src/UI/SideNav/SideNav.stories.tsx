import type { Meta, StoryObj } from '@storybook/react-vite';

import { SideNav } from './SideNav';

const meta = {
  title: 'SideNav/SideNav',
  component: SideNav,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'SideNav component with LocalizeForge styling. This component provides navigation between different views in the application.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="lf-app" style={{ minHeight: '400px', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onViewChange: {
      action: 'viewChanged',
      description: 'Callback function when view is changed'
    }
  },
  args: { onViewChange: () => { } },
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    onViewChange: () => { },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive version of SideNav with all navigation states. Click on different items to see the active state change.'
      }
    }
  }
};
