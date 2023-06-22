import React, { useState } from 'react';
import type { ButtonSize, ButtonVariant } from '~/components/button/ButtonBase';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  tooltip?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  tooltip,
  variant = 'outline',
  size = 'medium',
  children,
  className,
  ...other
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  let buttonClasses =
    'transition ease-in-out duration-150 flex items-center justify-center rounded-lg bg-transparent border-1 active:translate-y-0.5 ';

  if (variant === 'success') {
    buttonClasses +=
      'border-ctp-green text-ctp-green hover:bg-ctp-green hover:text-ctp-base';
  } else if (variant === 'danger') {
    buttonClasses +=
      'border-ctp-red text-ctp-red hover:bg-ctp-red hover:text-ctp-base';
  } else if (variant === 'warning') {
    buttonClasses +=
      'border-ctp-yellow text-ctp-yellow hover:bg-ctp-yellow hover:text-ctp-base';
  } else if (variant === 'info') {
    buttonClasses +=
      'border-ctp-blue text-ctp-blue hover:bg-ctp-blue hover:text-ctp-base';
  }

  if (size === 'small') {
    buttonClasses += ' text-sm px-2 py-1';
  } else if (size === 'medium') {
    buttonClasses += ' text-base px-4 py-2';
  } else if (size === 'large') {
    buttonClasses += ' text-lg px-6 py-3';
  } else if (size === 'xlarge') {
    buttonClasses += ' text-xl px-8 py-4';
  }

  const currentIcon = loading ? (
    <Loader2 className="animate-spin h-4 w-4 text-ctp-subtext1" />
  ) : (
    Icon && <Icon className="h-4 w-4 text-ctp-subtext1" />
  );

  return (
    <button
      className={`${buttonClasses} ${className || ''}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      {...other}
    >
      {showTooltip && <div className="absolute top-0 left-0">{tooltip}</div>}
      {currentIcon && iconPosition === 'left' && currentIcon}
      <span className="mx-2">{children}</span>
      {currentIcon && iconPosition === 'right' && currentIcon}
    </button>
  );
};

export default Button;
