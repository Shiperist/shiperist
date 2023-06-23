import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { Transition } from '@headlessui/react';

interface InfoTooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  tooltip?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  tooltip,
  className,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const infoClass = 'w-4 h-4 fill-ctp-text';
  const tooltipClass =
    'absolute z-10 w-32 p-2 text-center transform left-1/2 -translate-x-1/2 bg-ctp-crust text-ctp-text text-xs rounded-lg shadow break-words';

  return (
    <span>
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
          <div className={`${className ?? ''} ${tooltipClass}`} {...props}>
            {tooltip}
          </div>
        </Transition>
      </div>
    </span>
  );
};

export default InfoTooltip;
