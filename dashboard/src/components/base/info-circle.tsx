import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface InfoCircleProps extends React.HTMLAttributes<HTMLSpanElement> {
  tooltip?: string;
}

const InfoCircle: React.FC<InfoCircleProps> = ({
  tooltip,
  className,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const infoClass = 'w-4 h-4 stroke-cat-overlay1';
  const tooltipClass =
    'absolute z-10 bottom-full w-32 left-1/2 p-2 text-center transform text-cat-text text-xs -translate-x-1/2 bg-cat-crust border border-cat-overlay1 rounded-md shadow break-words';

  return (
    <span
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={`${className ?? ''}`}
      {...props}
    >
      <div className="relative">
        <InformationCircleIcon className={`${infoClass}`} />
        {showTooltip && <div className={tooltipClass}>{tooltip}</div>}
      </div>
    </span>
  );
};

export default InfoCircle;
