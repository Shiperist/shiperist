import React from 'react';

const Italic: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className = '',
  children,
  ...other
}) => {
  const textClass = 'text-base italic text-ctp-text';
  return (
    <i className={`${className} ${textClass}`} {...other}>
      {children}
    </i>
  );
};

export default Italic;
