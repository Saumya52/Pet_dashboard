import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  fullWidth = false,
  type = 'button'
}) => {
  const variantClasses = {
    primary: 'bg-lime-green hover:bg-lime-green-dark text-white',
    secondary: 'bg-red-600 hover:bg-blue-700 text-white',
    outline: 'bg-transparent border border-lime-green-dark text-lime-green-dark hover:bg-lime-green-dark hover:text-white',
  };

  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${fullWidth ? 'w-full' : ''}
        rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
      `}
    >
      {children}
    </button>
  );
};

export default Button;