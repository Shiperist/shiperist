import React from 'react';

const Bold: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className = '',
  children,
  ...other
}) => {
  const textClass = 'text-base font-bold text-ctp-text';
  return (
    <b className={`${className} ${textClass}`} {...other}>
      {children}
    </b>
  );
};

export default Bold;
