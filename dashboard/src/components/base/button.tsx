import React from 'react';

export const Button = ({
  className = '',
  disabled,
  ...props
}: {
  className?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonClasses = `rounded-md border-transparent text-sm font-medium ${
    !disabled
      ? 'hover:bg-cat-overlay2 bg-cat-overlay1 text-cat-text hover:border-transparent cursor-pointer'
      : '!cursor-default bg-gray-200 text-gray-400 opacity-80'
  } transition duration-150 ease-in-out ${className}`;

  return <button className={buttonClasses.trim()} {...props}></button>;
};

export const RequiredLabel = ({ text }: { text: string }) => {
  return (
    <p className="text-sm text-gray-500">
      {text}:<span className="text-red-600"> *</span>
    </p>
  );
};
