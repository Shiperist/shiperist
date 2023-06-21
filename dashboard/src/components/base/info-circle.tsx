import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';

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
    'absolute z-10 w-32 p-2 text-center transform top-[-32px] left-1/2 -translate-x-1/2 bg-cat-crust text-cat-text text-xs rounded-md shadow break-words';

  return (
    <span className={`${className ?? ''}`} {...props}>
      <div className="relative inline-flex">
        <InformationCircleIcon
          className={`${infoClass}`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        />
        <Transition
          show={showTooltip}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={tooltipClass}>{tooltip}</div>
        </Transition>
      </div>
    </span>
  );
};

export default InfoCircle;
