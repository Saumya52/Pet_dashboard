import React from 'react';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ initials, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div 
      className={`rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium ${sizeClasses[size]}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;