import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardView, type SourceStringRow } from './DashboardView';

import { ProjectViewData } from '../ViewData/ProjectViewData';
import "../Dashboard/DashboardView.css";

// Mock data for different scenarios
const mockSourceStrings: SourceStringRow[] = [
  {
    id: '1',
    key: 'welcome.title',
    source: 'Welcome to our app',
    context: 'Main landing page title',
    translation: 'Chào mừng đến với ứng dụng của chúng tôi',
    status: 'approved'
  },
  {
    id: '2',
    key: 'button.submit',
    source: 'Submit',
    context: 'Form submit button',
    translation: 'Gửi',
    status: 'approved'
  },
  {
    id: '3',
    key: 'error.required',
    source: 'This field is required',
    context: 'Validation error message',
    translation: 'Trường này là bắt buộc',
    status: 'needs_review'
  },
  {
    id: '4',
    key: 'menu.settings',
    source: 'Settings',
    context: 'Navigation menu item',
    translation: '',
    status: 'untranslated'
  },
  {
    id: '5',
    key: 'loading.text',
    source: 'Loading...',
    context: 'Loading indicator',
    translation: 'Đang tải...',
    status: 'draft'
  }
];

const emptySourceStrings: SourceStringRow[] = [];

const completedSourceStrings: SourceStringRow[] = [
  {
    id: '1',
    key: 'welcome.title',
    source: 'Welcome to our app',
    context: 'Main landing page title',
    translation: 'Chào mừng đến với ứng dụng của chúng tôi',
    status: 'approved'
  },
  {
    id: '2',
    key: 'button.submit',
    source: 'Submit',
    context: 'Form submit button',
    translation: 'Gửi',
    status: 'approved'
  },
  {
    id: '3',
    key: 'error.required',
    source: 'This field is required',
    context: 'Validation error message',
    translation: 'Trường này là bắt buộc',
    status: 'approved'
  }
];

const meta = {
  title: 'LocalizeForge/DashboardView',
  component: DashboardView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'DashboardView component displaying translation progress statistics for a LocalizeForge project. Shows completion percentage, total strings, and breakdown by translation status.'
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
    project: {
      control: 'object',
      description: 'Project information to display'
    },
    rows: {
      control: 'object',
      description: 'Array of source string rows with translation status'
    }
  }
} satisfies Meta<typeof DashboardView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyProject: Story = {
  args: {
    project: undefined,
    rows: emptySourceStrings
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with no project selected and no source strings. Shows empty state.'
      }
    }
  }
};

export const InProgress: Story = {
  args: {
    project: ProjectViewData.DefaultItems[1],
    rows: mockSourceStrings
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard showing a project in progress with various translation statuses including untranslated, draft, needs_review, and approved items.'
      }
    }
  }
};

export const Completed: Story = {
  args: {
    project: ProjectViewData.DefaultItems[2],
    rows: completedSourceStrings
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard showing a fully completed project with all translations approved.'
      }
    }
  }
};

export const AllUntranslated: Story = {
  args: {
    project: ProjectViewData.DefaultItems[0],
    rows: [
      {
        id: '1',
        key: 'welcome.title',
        source: 'Welcome to our app',
        context: 'Main landing page title',
        translation: '',
        status: 'untranslated'
      },
      {
        id: '2',
        key: 'button.submit',
        source: 'Submit',
        context: 'Form submit button',
        translation: '',
        status: 'untranslated'
      },
      {
        id: '3',
        key: 'error.required',
        source: 'This field is required',
        context: 'Validation error message',
        translation: '',
        status: 'untranslated'
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard showing a new project with all strings untranslated (0% completion).'
      }
    }
  }
};
