
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full mb-4 sm:mb-5 md:mb-6">
        {label && (
          <label 
            htmlFor={inputId}
            className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-zen-700 tracking-wide"
          >
            {label}
          </label>
        )}
        
        <div className="relative group">
          {icon && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-zen-400 
                           text-lg sm:text-xl transition-colors group-focus-within:text-sakura-400">
              {icon}
            </span>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full py-2 sm:py-2.5 md:py-3
              ${icon ? 'pl-7 sm:pl-8 md:pl-9' : 'pl-2 sm:pl-3'}
              pr-3 sm:pr-4
              bg-transparent
              border-b-2 
              ${error 
                ? 'border-red-400 focus:border-red-500' 
                : 'border-zen-200 group-focus-within:border-sakura-400'
              }
              text-sm sm:text-base text-zen-800
              placeholder:text-zen-300 placeholder:text-xs sm:placeholder:text-sm
              outline-none
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />
        </div>
        
        {error && (
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-500 flex items-center gap-1.5">
            <span className="text-base sm:text-lg">⚠️</span>
            <span className="flex-1">{error}</span>
          </p>
        )}
      </div>
    );
  }
);