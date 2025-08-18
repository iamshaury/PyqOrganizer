import React from 'react';

const Textarea = ({ 
  label, 
  error, 
  icon, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none ${error ? 'border-red-500/50 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
