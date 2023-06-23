import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { Size } from '~/components/Base/BaseTypes';
import type { ButtonVariant } from '../Base/BaseButtonVariants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  tooltip?: string;
  variant?: ButtonVariant;
  size?: Size;
}

const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  tooltip,
  variant = 'success',
  size = 'medium',
  children,
  className = '',
  ...other
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const baseClass =
    'transition ease-in-out duration-150 flex items-center justify-center rounded-lg bg-transparent border-1 active:translate-y-0.5';
  const variantColor = {
    success: 'green',
    danger: 'red',
    warning: 'yellow',
    info: 'blue'
  }[variant];
  const sizeClass =
    {
      small: 'text-sm px-2 py-1',
      medium: 'text-base px-4 py-2',
      large: 'text-lg px-6 py-3',
      xlarge: 'text-xl px-8 py-4'
    }[size] || '';
  const iconSizeClass =
    {
      small: 'p-1',
      medium: 'p-2',
      large: 'p-3',
      xlarge: 'p-4'
    }[size] || '';

  const variantClass = variantColor
    ? `border-ctp-${variantColor} text-ctp-${variantColor} hover:bg-ctp-${variantColor} hover:text-ctp-base`
    : '';

  const buttonClasses = `${baseClass} ${variantClass} ${
    !children && (Icon || loading) ? iconSizeClass : sizeClass
  } ${className}`;

  const currentIcon = loading ? (
    <Loader2 className="animate-spin h-4 w-4" />
  ) : (
    Icon && <Icon className="h-4 w-4" />
  );

  return (
    <button
      className={buttonClasses}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      {...other}
    >
      {showTooltip && <div className="absolute top-0 left-0">{tooltip}</div>}
      {currentIcon && iconPosition === 'left' && currentIcon}
      <span className={`${children ? 'mx-2' : ''}`}>{children}</span>
      {currentIcon && iconPosition === 'right' && currentIcon}
    </button>
  );
};

export default Button;
