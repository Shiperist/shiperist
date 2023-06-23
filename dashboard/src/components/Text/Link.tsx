import React from 'react';

const Link: React.FC<React.HTMLAttributes<HTMLAnchorElement>> = ({
  className = '',
  children,
  ...other
}) => {
  const textClass =
    'text-base text-ctp-text hover:underline hover:text-ctp-subtext1 cursor-pointer';
  return (
    <a className={`${className} ${textClass}`} {...other}>
      {children}
    </a>
  );
};

export default Link;
