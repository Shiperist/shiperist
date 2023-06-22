import React from 'react';

const Title: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...other
}) => {
  const textClass = 'text-ctp-text text-4xl';
  return (
    <h1 className={`${className} ${textClass}`} {...other}>
      {children}
    </h1>
  );
};

export default Title;
