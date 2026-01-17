import type { Meta, StoryObj } from '@storybook/preact';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'small'],
    },
    title: {
      control: 'text',
    },
    buttonText: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Large: Story = {
  args: {
    size: 'large',
    title: 'Join the family.',
    buttonText: 'Join',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    title: 'Join the family.',
    buttonText: 'Join',
  },
};

export const BothSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <Card
        size="large"
        title="Join the family."
        buttonText="Join"
        onButtonClick={() => console.log('Join clicked')}
      />
      <Card
        size="small"
        title="Join the family."
        buttonText="Join"
        onButtonClick={() => console.log('Join clicked')}
      />
    </div>
  ),
};
