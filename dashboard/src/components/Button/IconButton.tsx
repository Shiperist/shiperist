import React, { useState } from 'react';
import type { Color } from '~/utils/colors';
import type { ButtonVariant } from '~/components/Button/ButtonBase';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
  tooltip?: string;
  variant?: ButtonVariant;
  color?: Color;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  tooltip,
  variant = 'outline',
  color = 'green',
  className,
  ...other
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  let buttonClasses =
    'transition ease-in-out delay-150 flex items-center justify-center rounded-lg active:scale-95 ';

  if (variant === 'outline') {
    buttonClasses += `border-1 border-ctp-${color} text-ctp-${color} hover:bg-ctp-${color} hover:text-ctp-base`;
  } else if (variant === 'ghost') {
    buttonClasses += `text-ctp-${color}`;
  } else if (variant === 'solid') {
    buttonClasses += `bg-ctp-${color} text-ctp-base hover:bg-ctp-${color}`;
  }

  return (
    <button
      className={`${buttonClasses} ${className || ''}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      {...other}
    >
      {showTooltip && <div className="absolute top-0 left-0">{tooltip}</div>}
      {Icon && <Icon className="h-4 w-4" />}
    </button>
  );
};

export default IconButton;
