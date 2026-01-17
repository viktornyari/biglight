import type { Meta, StoryObj } from '@storybook/preact';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'open', 'disabled', 'error'],
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
    helperText: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
  { value: 'option5', label: 'Option 5' },
];

export const Default: Story = {
  args: {
    label: 'Select an option',
    options: sampleOptions,
    placeholder: 'Choose...',
    state: 'default',
  },
};

export const WithSelection: Story = {
  args: {
    label: 'Select an option',
    options: sampleOptions,
    value: 'option2',
    state: 'default',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Select an option',
    options: sampleOptions,
    state: 'disabled',
  },
};

export const Error: Story = {
  args: {
    label: 'Select an option',
    options: sampleOptions,
    state: 'error',
    errorMessage: 'Please select an option',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Country',
    options: sampleOptions,
    helperText: 'Select your country of residence',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <Dropdown 
        label="Default" 
        options={sampleOptions}
        placeholder="Choose an option"
        state="default" 
      />
      <Dropdown 
        label="With Selection" 
        options={sampleOptions}
        value="option2"
        state="default" 
      />
      <Dropdown 
        label="Disabled" 
        options={sampleOptions}
        state="disabled" 
      />
      <Dropdown 
        label="Error" 
        options={sampleOptions}
        state="error" 
        errorMessage="This field is required"
      />
      <Dropdown 
        label="With Helper Text" 
        options={sampleOptions}
        helperText="Select your preferred option"
      />
    </div>
  ),
};
