import type { Meta, StoryObj } from '@storybook/preact';
import { Button } from '../Button';
import { Input } from '../Input';
import { Dropdown } from '../Dropdown';

const meta: Meta = {
  title: 'Pages/Log in - Drawer',
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Desktop: Story = {
  render: () => (
    <div className="w-[1280px] h-[1252px] relative bg-surface-page overflow-x-hidden mx-auto">
      <div 
        data-size="Default" 
        data-state="Default" 
        className="w-[480px] h-[949px] p-10 left-[400px] top-[152px] absolute bg-surface-secondary shadow-[16px_32px_56px_-24px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-border-primary inline-flex flex-col justify-start items-end gap-6 overflow-hidden"
      >
        <div className="self-stretch inline-flex justify-end items-center">
          <div data-size="24" className="w-6 h-6 relative overflow-hidden flex items-center justify-center cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-icon-action-active">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-10">
          <div className="self-stretch justify-end text-text-brand text-4xl font-medium font-['Inter'] leading-[48px]">
            Log into your account
          </div>
          <div className="self-stretch justify-end text-text-body text-base font-normal font-['Inter'] leading-6">
            Please enter your email for a one-time-only code
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-8">
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <Dropdown
                label="Customer type"
                placeholder="Customer type"
                options={[
                  { value: 'retail', label: 'Retail Store Owner' },
                  { value: 'convenience', label: 'Convenience Shop' },
                  { value: 'hospitality', label: 'Hospitality' },
                  { value: 'catering', label: 'Catering & Events' },
                  { value: 'online', label: 'Online/Delivery Only' },
                ]}
                state="default"
                required
              />
            </div>
            <Input
              label="Email"
              placeholder="Email"
              type="email"
              state="default"
              required
            />
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <Button variant="secondary" size="md" className="w-full">
              Continue
            </Button>
            <Button variant="tertiary" size="md" className="w-full">
              Login with your password
            </Button>
          </div>
          <div 
            data-size="Desktop" 
            data-type="Filled" 
            className="self-stretch p-6 bg-surface-brand-secondary rounded-[20px] inline-flex justify-start items-start gap-6"
          >
            <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-8">
              <div className="self-stretch flex-1 justify-start text-text-action-inverse text-3xl font-medium font-['Inter'] leading-10">
                Join the family.
              </div>
              <button
                className="inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-[120px] px-2 py-3 text-sm leading-4 bg-surface-action-primary text-text-action-on-primary hover:bg-surface-action-hover-primary hover:text-text-action-inverse group whitespace-nowrap"
              >
                <span className="px-1 flex items-center text-icon-action-on-primary group-hover:text-icon-action-inverse">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
                    <path d="M10 10.5V9.5C10 8.96957 9.78929 8.46086 9.41421 8.08579C9.03914 7.71071 8.53043 7.5 8 7.5H4C3.46957 7.5 2.96086 7.71071 2.58579 8.08579C2.21071 8.46086 2 8.96957 2 9.5V10.5M8 3.5C8 4.60457 7.10457 5.5 6 5.5C4.89543 5.5 4 4.60457 4 3.5C4 2.39543 4.89543 1.5 6 1.5C7.10457 1.5 8 2.39543 8 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="px-1 flex items-center">
                  Become a member
                </span>
              </button>
            </div>
            <div 
              data-type="Arrows-Up" 
              className="w-36 h-36 relative bg-surface-page rounded-lg outline outline-[1.50px] outline-offset-[-1.50px] outline-border-primary overflow-hidden flex items-center justify-center"
            >
              <svg width="145" height="146" viewBox="0 0 145 146" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g clipPath="url(#clip0_13026_140)">
                  <mask id="path-1-inside-1_13026_140" fill="white">
                    <path d="M0 8C0 3.58173 3.58172 0 8 0H136.413C140.831 0 144.413 3.58172 144.413 8V138C144.413 142.418 140.831 146 136.413 146H7.99999C3.58172 146 0 142.418 0 138V8Z"/>
                  </mask>
                  <path d="M0 8C0 3.58173 3.58172 0 8 0H136.413C140.831 0 144.413 3.58172 144.413 8V138C144.413 142.418 140.831 146 136.413 146H7.99999C3.58172 146 0 142.418 0 138V8Z" fill="#FAF9F5"/>
                  <path d="M1.94928 72.8495H72.1169V143.761L1.94928 72.8495Z" fill="#FC4C02"/>
                  <path d="M1.94928 2.67896L72.1169 72.8495M142.284 143.761L72.1169 72.8495M72.1169 72.8495H1.94928L72.1169 143.761V72.8495Z" stroke="black" strokeWidth="1.5"/>
                </g>
                <path d="M8 0V1.5H136.413V0V-1.5H8V0ZM144.413 8H142.913V138H144.413H145.913V8H144.413ZM136.413 146V144.5H7.99999V146V147.5H136.413V146ZM0 138H1.5V8H0H-1.5V138H0ZM7.99999 146V144.5C4.41014 144.5 1.5 141.59 1.5 138H0H-1.5C-1.5 143.247 2.75329 147.5 7.99999 147.5V146ZM144.413 138H142.913C142.913 141.59 140.003 144.5 136.413 144.5V146V147.5C141.66 147.5 145.913 143.247 145.913 138H144.413ZM136.413 0V1.5C140.003 1.5 142.913 4.41015 142.913 8H144.413H145.913C145.913 2.7533 141.66 -1.5 136.413 -1.5V0ZM8 0V-1.5C2.75329 -1.5 -1.5 2.7533 -1.5 8H0H1.5C1.5 4.41015 4.41015 1.5 8 1.5V0Z" fill="black" mask="url(#path-1-inside-1_13026_140)"/>
                <defs>
                  <clipPath id="clip0_13026_140">
                    <path d="M0 8C0 3.58173 3.58172 0 8 0H136.413C140.831 0 144.413 3.58172 144.413 8V138C144.413 142.418 140.831 146 136.413 146H7.99999C3.58172 146 0 142.418 0 138V8Z" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Mobile: Story = {
  render: () => (
    <div className="min-h-screen w-full flex items-center justify-center bg-surface-page overflow-x-hidden p-4">
      <div className="w-96 h-[812px] p-6 bg-surface-secondary inline-flex flex-col justify-start items-end gap-4 overflow-hidden shadow-lg rounded-lg">
        <div className="self-stretch inline-flex justify-end items-center">
          <div data-size="20" className="w-5 h-5 relative overflow-hidden flex items-center justify-center cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-icon-action-active">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-8">
          <div className="self-stretch justify-end text-text-brand text-2xl font-medium font-['Inter'] leading-7">
            Log into your account
          </div>
          <div className="self-stretch justify-end text-text-body text-base font-normal font-['Inter'] leading-6">
            Please enter your email for a one-time-only code
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-6">
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <Dropdown
                label="Customer type"
                placeholder="Customer type"
                options={[
                  { value: 'retail', label: 'Retail Store Owner' },
                  { value: 'convenience', label: 'Convenience Shop' },
                  { value: 'hospitality', label: 'Hospitality' },
                  { value: 'catering', label: 'Catering & Events' },
                  { value: 'online', label: 'Online/Delivery Only' },
                ]}
                state="default"
                required
              />
            </div>
            <Input
              label="Email"
              placeholder="Email"
              type="email"
              state="default"
              required
            />
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-6">
            <div data-position="Vertical" data-size="Medium" className="self-stretch flex flex-col justify-start items-start gap-4">
              <Button variant="secondary" size="md" className="w-full">
                Continue
              </Button>
              <Button variant="tertiary" size="md" className="w-full">
                Login with your password
              </Button>
            </div>
          </div>
          <div 
            data-size="Mobile" 
            data-type="Filled" 
            className="self-stretch h-36 p-4 bg-surface-brand-secondary rounded-[20px] inline-flex justify-start items-start gap-4"
          >
            <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-5">
              <div className="self-stretch flex-1 justify-start text-text-action-inverse text-xl font-medium font-['Inter'] leading-6">
                Join the family.
              </div>
              <button
                className="inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-[120px] px-2 py-3 text-sm leading-4 bg-surface-action-primary text-text-action-on-primary hover:bg-surface-action-hover-primary hover:text-text-action-inverse group whitespace-nowrap"
              >
                <span className="px-1 flex items-center text-icon-action-on-primary group-hover:text-icon-action-inverse">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
                    <path d="M10 10.5V9.5C10 8.96957 9.78929 8.46086 9.41421 8.08579C9.03914 7.71071 8.53043 7.5 8 7.5H4C3.46957 7.5 2.96086 7.71071 2.58579 8.08579C2.21071 8.46086 2 8.96957 2 9.5V10.5M8 3.5C8 4.60457 7.10457 5.5 6 5.5C4.89543 5.5 4 4.60457 4 3.5C4 2.39543 4.89543 1.5 6 1.5C7.10457 1.5 8 2.39543 8 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="px-1 flex items-center">
                  Become a member
                </span>
              </button>
            </div>
            <div 
              data-type="Arrows-Up" 
              className="w-20 h-20 relative bg-surface-page rounded-lg outline outline-[1.50px] outline-offset-[-1.50px] outline-border-primary overflow-hidden flex items-center justify-center"
            >
              <svg width="80" height="80" viewBox="0 0 145 146" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g clipPath="url(#clip0_mobile_13026_140)">
                  <mask id="path-1-inside-1_mobile_13026_140" fill="white">
                    <path d="M0 8C0 3.58173 3.58172 0 8 0H136.413C140.831 0 144.413 3.58172 144.413 8V138C144.413 142.418 140.831 146 136.413 146H7.99999C3.58172 146 0 142.418 0 138V8Z"/>
                  </mask>
                  <path d="M0 8C0 3.58173 3.58172 0 8 0H136.413C140.831 0 144.413 3.58172 144.413 8V138C144.413 142.418 140.831 146 136.413 146H7.99999C3.58172 146 0 142.418 0 138V8Z" fill="#FAF9F5"/>
                  <path d="M1.94928 72.8495H72.1169V143.761L1.94928 72.8495Z" fill="#FC4C02"/>
                  <path d="M1.94928 2.67896L72.1169 72.8495M142.284 143.761L72.1169 72.8495M72.1169 72.8495H1.94928L72.1169 143.761V72.8495Z" stroke="black" strokeWidth="1.5"/>
                </g>
                <path d="M8 0V1.5H136.413V0V-1.5H8V0ZM144.413 8H142.913V138H144.413H145.913V8H144.413ZM136.413 146V144.5H7.99999V146V147.5H136.413V146ZM0 138H1.5V8H0H-1.5V138H0ZM7.99999 146V144.5C4.41014 144.5 1.5 141.59 1.5 138H0H-1.5C-1.5 143.247 2.75329 147.5 7.99999 147.5V146ZM144.413 138H142.913C142.913 141.59 140.003 144.5 136.413 144.5V146V147.5C141.66 147.5 145.913 143.247 145.913 138H144.413ZM136.413 0V1.5C140.003 1.5 142.913 4.41015 142.913 8H144.413H145.913C145.913 2.7533 141.66 -1.5 136.413 -1.5V0ZM8 0V-1.5C2.75329 -1.5 -1.5 2.7533 -1.5 8H0H1.5C1.5 4.41015 4.41015 1.5 8 1.5V0Z" fill="black" mask="url(#path-1-inside-1_mobile_13026_140)"/>
                <defs>
                  <clipPath id="clip0_mobile_13026_140">
                    <path d="M0 8C0 3.58173 3.58172 0 8 0H136.413C140.831 0 144.413 3.58172 144.413 8V138C144.413 142.418 140.831 146 136.413 146H7.99999C3.58172 146 0 142.418 0 138V8Z" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
