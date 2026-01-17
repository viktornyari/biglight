import type { Meta, StoryObj } from '@storybook/preact';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'focus', 'filled', 'disabled', 'error', 'success'],
    },
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    errorMessage: {
      control: 'text',
    },
    successMessage: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    state: 'default',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Label',
    value: 'Filled value',
    state: 'filled',
  },
};

export const Focus: Story = {
  args: {
    label: 'Label',
    placeholder: 'Focus state',
    state: 'focus',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Disabled input',
    state: 'disabled',
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    state: 'error',
    errorMessage: 'Please enter a valid email address',
  },
};

export const Success: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    state: 'success',
    successMessage: 'Email is valid',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <Input 
        label="Label" 
        placeholder="Input label" 
        state="default"
        iconRight
        required
      />
      <Input 
        label="Label" 
        placeholder="Focus state" 
        state="focus"
        iconRight
        required
      />
      <Input 
        label="Label" 
        value="Selected Value" 
        state="filled"
        iconRight
        required
      />
      <Input 
        label="Label" 
        placeholder="Input label" 
        state="disabled"
        iconRight
        required
      />
      <Input 
        label="Label" 
        placeholder="Placeholder" 
        state="error" 
        errorMessage="This field is required"
        iconRight
        required
      />
      <Input 
        label="Label" 
        placeholder="Placeholder" 
        state="success" 
        successMessage="Looks good!"
        iconRight
        required
      />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <Input 
        label="Label" 
        placeholder="Label" 
        iconLeft
        iconRight
        required
      />
      <Input 
        label="Label" 
        placeholder="Label" 
        iconRight
        required
      />
    </div>
  ),
};
