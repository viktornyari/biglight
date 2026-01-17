import { JSX } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { forwardRef } from 'preact/compat';

export type DropdownState = 'default' | 'open' | 'disabled' | 'error';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends Omit<JSX.HTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: DropdownOption[];
  state?: DropdownState;
  errorMessage?: string;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
  iconLeft?: boolean;
}

// Clock Icon (left icon)
function ClockIcon({ className = '' }: { className?: string }) {
  return (
    <div className={`w-4 h-4 relative ${className}`}>
      <svg
        className="w-3.5 h-3.5 absolute left-[1.33px] top-[1.33px]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.6}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    </div>
  );
}

export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ 
    label, 
    options,
    state = 'default', 
    errorMessage, 
    helperText,
    placeholder = 'Select an option',
    required = false,
    iconLeft = false,
    className = '', 
    id,
    disabled,
    value,
    onChange,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>(value as string || '');
    const [internalState, setInternalState] = useState<DropdownState>(state);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const isDisabled = disabled || state === 'disabled';
    const isError = state === 'error' || !!errorMessage;
    const displayState = isOpen ? 'open' : internalState;
    const hasValue = selectedValue || value;
    const showFloatingLabel = isFocused || hasValue || isOpen;
    
    const inputId = id || `dropdown-${Math.random().toString(36).substr(2, 9)}`;
    
    const baseClasses = 'w-full h-12 px-3 py-4 rounded-lg inline-flex items-center gap-2 transition-all';
    
    const stateClasses = {
      default: 'bg-white border-[0.5px] border-border-passive text-text-passive',
      open: 'bg-surface-secondary border-[1.5px] border-border-passive text-text-body',
      disabled: 'bg-surface-disabled-dark text-text-disabled cursor-not-allowed border-none',
      error: 'bg-surface-secondary border-[1.5px] border-error text-text-error',
    };
    
    const messageText = errorMessage || helperText;
    const messageColor = isError ? 'text-text-error' : 'text-text-disabled';
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);
    
    const handleSelectChange = (e: JSX.TargetedEvent<HTMLSelectElement>) => {
      const newValue = e.currentTarget.value;
      setSelectedValue(newValue);
      setInternalState('default');
      setIsOpen(false);
      setIsFocused(false);
      if (onChange) {
        onChange(e);
      }
    };
    
    const handleFocus = (e: JSX.TargetedFocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      setIsOpen(true);
      if (onFocus) onFocus(e);
    };
    
    const handleBlur = (e: JSX.TargetedFocusEvent<HTMLSelectElement>) => {
      setTimeout(() => {
        setIsFocused(false);
        setIsOpen(false);
      }, 200);
      if (onBlur) onBlur(e);
    };
    
    // Get icon color based on state
    const getIconColor = () => {
      if (isDisabled) return 'text-icon-action-disabled opacity-20';
      if (isError) return 'text-icon-error';
      return 'text-icon-action-active';
    };
    
    const iconColor = getIconColor();
    
    return (
      <div className="w-full relative" ref={dropdownRef}>
        <div className="flex flex-col gap-1">
          {/* Dropdown Container */}
          <div className="relative flex flex-col gap-2">
            <div className="relative">
              <div className={`${baseClasses} ${stateClasses[displayState]} ${className}`}>
                {/* Left Icon */}
                {iconLeft && (
                  <div className="flex items-center">
                    <ClockIcon className={iconColor} />
                  </div>
                )}
                
                {/* Select Field */}
                <select
                  ref={ref}
                  id={inputId}
                  className="flex-1 bg-transparent outline-none text-base font-normal leading-6 appearance-none cursor-pointer"
                  disabled={isDisabled}
                  value={selectedValue}
                  onChange={handleSelectChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  aria-invalid={isError}
                  aria-describedby={messageText ? `${inputId}-message` : undefined}
                  {...props}
                >
                  {!selectedValue && (
                    <option value="" disabled>
                      {placeholder}
                    </option>
                  )}
                  {options.map((option) => (
                    <option 
                      key={option.value} 
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                
                {/* Right Chevron Icon */}
                <div className="flex items-center pointer-events-none">
                  <svg 
                    className={`w-4 h-4 ${iconColor} transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.6}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            
              {/* Floating Label - only shows when has value or is open/focused */}
              {label && showFloatingLabel && (
                <div className="absolute left-[8px] top-[-8px] inline-flex items-center gap-2 z-10">
                  {/* Background line to cover border */}
                  <div className={`w-14 h-1 absolute left-[-4px] top-[7px] ${
                    displayState === 'open' || isFocused
                      ? 'bg-surface-secondary'
                      : hasValue
                      ? 'bg-white'
                      : 'bg-surface-secondary'
                  }`} />
                  <div className={`h-4 px-1 rounded-lg flex items-center gap-2 relative z-10 ${
                    displayState === 'open' || isFocused
                      ? 'bg-surface-secondary'
                      : hasValue
                      ? 'bg-white'
                      : 'bg-surface-secondary'
                  }`}>
                    <span className={`text-xs font-normal leading-3 ${
                      isError ? 'text-text-error' : isDisabled ? 'text-text-disabled' : 'text-text-body'
                    }`}>
                      {label}
                    </span>
                  </div>
                </div>
              )}
            </div>
          
            {/* Required Indicator / Helper Text */}
            <div className="p-0.5 inline-flex items-center gap-2">
              {required && (
                <span className="text-xs font-normal leading-3">
                  <span className="text-text-warning">*</span>
                  <span className="text-text-disabled">required</span>
                </span>
              )}
              {!required && helperText && (
                <span className="text-xs font-normal leading-3 text-text-disabled">
                  {helperText}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {messageText && (
          <p 
            id={`${inputId}-message`}
            className={`mt-1 text-sm ${messageColor}`}
            role={isError ? 'alert' : undefined}
          >
            {messageText}
          </p>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';
