import React, { useRef, useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  //TODO: Fix colors currently only pink works for some reason
  color?:
    | 'rosewater'
    | 'flamingo'
    | 'pink'
    | 'mauve'
    | 'maroon'
    | 'peach'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'sky'
    | 'sapphire'
    | 'lavender';
  icon?: React.ElementType;
  error?: boolean;
  errorMessage?: string;
}

const TextInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = (props, ref) => {
  const {
    color = 'pink',
    icon: Icon,
    error = false,
    errorMessage,
    className,
    ...other
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocusChange = (focusState: boolean) => {
    if (focusState === false) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
    setIsFocused(focusState);
  };

  console.log('TextInputProps', color);

  return (
    <>
      <div className={`flex flex-col ${className || ''}`}>
        <div
          className={`relative flex items-center min-w-[10rem] h-full outline-none rounded-lg shadow-sm border border-ctp-overlay0 ${
            !isFocused && !error ? 'hover:border-ctp-overlay2' : ''
          } ${isFocused && !error ? 'border-1 border-ctp-' + color : ''} ${
            error ? 'border-ctp-red' : ''
          }`}
          onClick={() => handleFocusChange(true)}
          onFocus={() => handleFocusChange(true)}
          onBlur={() => handleFocusChange(false)}
        >
          {Icon && (
            <div className="ml-3 shrink-0">
              <Icon className="h-4 w-4 text-ctp-subtext1" />
            </div>
          )}
          <input
            ref={inputRef}
            className={`w-full focus:outline-none focus:ring-0 border-none bg-transparent text-ctp-subtext1 ${
              Icon ? 'pl-2' : 'px-4'
            } py-1`}
            {...other}
          />
          {error && (
            <div className="mr-3">
              <ExclamationCircleIcon className="h-4 w-4 text-ctp-red" />
            </div>
          )}
        </div>
        {errorMessage && (
          <p className="text-sm text-ctp-red mt-1">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default React.forwardRef(TextInput);
