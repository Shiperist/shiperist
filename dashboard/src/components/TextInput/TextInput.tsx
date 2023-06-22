import React, { useMemo } from 'react';
import { Loader2 } from 'lucide-react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingElement?: React.ElementType | string;
  trailingElement?: React.ElementType | string;
  loading?: boolean;
  disabled?: boolean;
  error?: boolean;
  caption?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  leadingElement: LeadingElement,
  trailingElement: TrailingElement,
  loading = false,
  disabled = false,
  error = false,
  caption,
  className = '',
  ...other
}) => {
  const baseClass = `flex flex-col ${className}`;
  const inputClass = `bg-transparent border-0 outline-none flex-grow placeholder-ctp-subtext2 text-ctp-text mx-1 ${
    disabled ? 'cursor-not-allowed' : ''
  }`;
  const containerClass = `flex w-full h-full flex-row px-4 bg-transparent border ring-0 border-1 border-ctp-overlay1 rounded-lg h-12 py-2 ${
    error
      ? 'border-ctp-red hover:border-ctp-red'
      : `${!disabled ? 'hover:border-ctp-subtext1' : ''}`
  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  const iconClass = 'text-ctp-overlay1';
  const captionClass = 'pt-2 text-sm text-ctp-overlay2';

  const currentTrailingElement = loading ? (
    <Loader2 className="animate-spin" />
  ) : (
    TrailingElement &&
    (typeof TrailingElement === 'string' ? (
      TrailingElement
    ) : (
      <TrailingElement className="" />
    ))
  );

  const currentLeadingElement =
    typeof LeadingElement === 'string'
      ? LeadingElement
      : LeadingElement && <LeadingElement className="" />;

  return (
    <div className={baseClass}>
      <div className={containerClass}>
        {currentLeadingElement && (
          <div className={iconClass}>{currentLeadingElement}</div>
        )}
        <input className={inputClass} disabled={disabled} {...other} />
        {currentTrailingElement && (
          <div className={iconClass}>{currentTrailingElement}</div>
        )}
      </div>
      {caption && <p className={captionClass}>{caption}</p>}
    </div>
  );
};

export default TextInput;
