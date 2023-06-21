import React, { useState } from 'react';
import {
  ButtonVariant,
  Color,
  getBackgroundColor,
  getBorderColor,
  getHoverBackgroundColor,
  getTextColor
} from '~/utils/colors';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  tooltip?: string;
  variant?: ButtonVariant;
  color?: Color;
}

const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  tooltip,
  variant = 'outline',
  color = 'green',
  children,
  className,
  ...other
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  let buttonClasses =
    'flex items-center justify-center px-4 py-2 rounded-lg transition duration-200 ';

  if (variant === 'outline') {
    buttonClasses += `border-1 ${getBorderColor(color)} ${getTextColor(
      color
    )} ${getHoverBackgroundColor(color)} hover:text-cat-base`;
  } else if (variant === 'ghost') {
    buttonClasses += `text-${color} hover:bg-cat-${color}-opacity-20`;
  } else if (variant === 'solid') {
    buttonClasses += `${getBackgroundColor(
      color
    )} text-cat-overlay0 hover:bg-cat-${color}-dark`;
  }

  return (
    <button
      className={`${buttonClasses} ${className || ''}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      {...other}
    >
      {showTooltip && <div className="absolute top-0 left-0">{tooltip}</div>}
      {Icon &&
        iconPosition === 'left' &&
        (loading ? (
          <div>Loading...</div>
        ) : (
          <Icon className="h-4 w-4 text-cat-subtext1" />
        ))}
      <span className="mx-2">{children}</span>
      {Icon &&
        iconPosition === 'right' &&
        (loading ? (
          <div>Loading...</div>
        ) : (
          <Icon className="h-4 w-4 text-cat-subtext1" />
        ))}
    </button>
  );
};

export default Button;
