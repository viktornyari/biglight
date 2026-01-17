import { JSX } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { forwardRef } from 'preact/compat';

export type InputState = 'default' | 'focus' | 'filled' | 'disabled' | 'error' | 'success';

export interface InputProps extends JSX.HTMLAttributes<HTMLInputElement> {
  label?: string;
  state?: InputState;
  errorMessage?: string;
  successMessage?: string;
  helperText?: string;
  required?: boolean;
  iconLeft?: boolean;
  iconRight?: boolean;
  onClear?: () => void;
}

// Clock Icon (left icon) - matches Figma design
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

// X Icon (right icon for default/error)
function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

// Checkmark Icon (right icon for success)
function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    state = 'default', 
    errorMessage, 
    successMessage, 
    helperText,
    required = false,
    iconLeft = false,
    iconRight = false,
    onClear,
    className = '', 
    id,
    disabled,
    value,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value as string || '');
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const isDisabled = disabled || state === 'disabled';
    const isError = state === 'error' || !!errorMessage;
    const isSuccess = state === 'success' || !!successMessage;
    const hasValue = internalValue || value;
    const showFloatingLabel = isFocused || hasValue || state === 'filled';
    
    // Determine actual state
    let displayState: InputState = state;
    if (isFocused && state === 'default') {
      displayState = 'focus';
    } else if (hasValue && state === 'default') {
      displayState = 'filled';
    }
    
    const baseClasses = 'w-full h-12 px-3 py-4 rounded-lg inline-flex justify-start items-center gap-2 transition-all';
    
    const stateClasses = {
      default: 'bg-white outline outline-[0.5px] outline-offset-[-0.5px] outline-border-passive text-text-passive placeholder:text-text-passive',
      focus: 'bg-surface-secondary outline outline-[1.5px] outline-offset-[-1.5px] outline-border-passive text-text-action-active placeholder:text-text-action-active',
      filled: 'bg-white outline outline-[0.5px] outline-offset-[-0.5px] outline-border-passive text-text-body',
      disabled: 'bg-surface-disabled-dark text-text-disabled cursor-not-allowed outline-none',
      error: 'bg-surface-secondary outline outline-[1.5px] outline-offset-[-1.5px] outline-error text-text-error',
      success: 'bg-surface-secondary outline outline-[1.5px] outline-offset-[-1.5px] outline-success/20 text-text-body',
    };
    
    const handleFocus = (e: JSX.TargetedFocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };
    
    const handleBlur = (e: JSX.TargetedFocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };
    
    const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
      setInternalValue(e.currentTarget.value);
      if (props.onInput) props.onInput(e);
    };
    
    const handleClear = () => {
      setInternalValue('');
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
      if (onClear) onClear();
    };
    
    // Get icon color based on state
    const getIconColor = () => {
      if (isDisabled) return 'text-icon-action-disabled opacity-20';
      if (isError) return 'text-icon-error';
      if (isSuccess) return 'text-icon-positive';
      return 'text-icon-action-active';
    };
    
    const iconColor = getIconColor();
    
    return (
      <div className="w-full relative">
        <div className="flex flex-col gap-1">
          {/* Input Container */}
          <div className="relative flex flex-col gap-2">
            <div className={`${baseClasses} ${stateClasses[displayState]} ${className}`}>
              {/* Left Icon */}
              {iconLeft && (
                <div className="flex items-center">
                  <ClockIcon className={iconColor} />
                </div>
              )}
              
              {/* Input Field */}
              <input
                ref={(node) => {
                  inputRef.current = node;
                  if (typeof ref === 'function') {
                    ref(node);
                  } else if (ref) {
                    ref.current = node;
                  }
                }}
                id={inputId}
                className={`flex-1 bg-transparent outline-none text-base leading-6 ${
                  displayState === 'focus' ? 'font-medium leading-4' : 'font-normal leading-6'
                }`}
                disabled={isDisabled}
                value={value !== undefined ? value : internalValue}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-invalid={isError}
                aria-describedby={
                  (errorMessage || successMessage || helperText) 
                    ? `${inputId}-message` 
                    : undefined
                }
                {...props}
              />
              
              {/* Right Icon */}
              <div className="flex items-center">
                {iconRight && !isSuccess && !isError && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className={iconColor}
                    tabIndex={-1}
                    aria-label="Clear input"
                  >
                    <XIcon />
                  </button>
                )}
                {isError && (
                  <div className={iconColor}>
                    <XIcon />
                  </div>
                )}
                {isSuccess && (
                  <div className={iconColor}>
                    <CheckIcon />
                  </div>
                )}
              </div>
            </div>
            
            {/* Floating Label - only shows when focused or has value */}
            {label && showFloatingLabel && (
              <div className="absolute left-[8px] top-[-8px] h-4 px-1 rounded-lg inline-flex justify-start items-center gap-2 z-10 bg-surface-secondary">
                <div className="flex justify-start items-center gap-1">
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
        
        {/* Error/Success Message */}
        {(errorMessage || successMessage) && (
          <p 
            id={`${inputId}-message`}
            className={`mt-1 text-xs font-normal leading-3 ${
              isError ? 'text-text-error' : 'text-success'
            }`}
            role={isError ? 'alert' : undefined}
          >
            {errorMessage || successMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
