import React from 'react';

export const ButtonComponent = ({
  className = '',
  disabled,
  ...props
}: {
  className?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonClasses = `rounded-md border-transparent bg-amber-200 px-4 py-2 text-sm font-medium text-amber-900 ${
    !disabled
      ? 'hover:bg-amber-400 hover:border-transparent cursor-pointer'
      : '!cursor-default opacity-80'
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
