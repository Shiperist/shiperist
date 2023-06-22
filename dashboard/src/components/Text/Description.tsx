import React from 'react';

const Description: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...other
}) => {
  const textClass = 'text-sm text-ctp-text';
  return (
    <p className={`${className} ${textClass}`} {...other}>
      {children}
    </p>
  );
};

export default Description;
