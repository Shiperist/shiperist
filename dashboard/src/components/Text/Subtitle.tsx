import React from 'react';

const Subtitle: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...other
}) => {
  const textClass = 'text-2xl text-ctp-text';
  return (
    <h3 className={`${className} ${textClass}`} {...other}>
      {children}
    </h3>
  );
};

export default Subtitle;
