import React, { useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { Size } from '~/components/Base/BaseTypes';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingElement?: React.ElementType | string;
  trailingElement?: React.ElementType | string;
  loading?: boolean;
  disabled?: boolean;
  caption?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  leadingElement: LeadingElement,
  trailingElement: TrailingElement,
  loading = false,
  disabled = false,
  caption,
  className = '',
  ...other
}) => {
  const inputClasses = useMemo(() => {
    const baseClass = `flex flex-col bg-transparent border ring-0 border-1 border-ctp-overlay1 rounded-lg h-12 py-2`;
    return `${baseClass} ${className}`;
  }, [className]);

  const currentTrailingElement = loading ? (
    <Loader2 className="animate-spin h-4 w-4" />
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
    <div className={inputClasses}>
      <div className={`flex items-center h-full flex-row px-4`}>
        {currentLeadingElement && <div>{currentLeadingElement}</div>}
        <input
          className="bg-transparent border-0 outline-none flex-grow"
          disabled={disabled}
          {...other}
        />
        {currentTrailingElement && <div>{currentTrailingElement}</div>}
      </div>
      {caption && <p className="pt-2 mt-2 text-sm text-gray-500">{caption}</p>}
    </div>
  );
};

export default TextInput;
