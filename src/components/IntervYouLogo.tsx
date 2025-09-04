import React from 'react';

interface IntervYouLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const IntervYouLogo: React.FC<IntervYouLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <div className="flex items-center">
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        <div className="w-1 h-0.5 bg-blue-400"></div>
        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
      </div>
      
      {/* Logo Text */}
      <div className={`font-bold ${sizeClasses[size]}`}>
        <span className="text-gray-900">Interv</span>
        <span className="text-blue-600">You</span>
      </div>
      
      {/* Tagline */}
      <div className="hidden lg:block ml-2">
        <span className="text-sm text-blue-800 font-medium">AI-Powered Interview Platform</span>
      </div>
    </div>
  );
};

export default IntervYouLogo;
