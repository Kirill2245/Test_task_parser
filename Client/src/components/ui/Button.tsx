
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = `
    relative overflow-hidden
    px-4 sm:px-5 md:px-6
    py-2.5 sm:py-3 md:py-3.5
    rounded-lg
    font-medium text-sm sm:text-base
    transition-all duration-300
    transform hover:scale-[1.02] active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${fullWidth ? 'w-full' : ''}
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-sakura-400 to-sakura-500
      text-white
      shadow-lg hover:shadow-xl
      focus:ring-sakura-400
    `,
    secondary: `
      bg-transparent
      border-2 border-sakura-400
      text-sakura-600
      hover:bg-sakura-50
      focus:ring-sakura-400
    `,
    outline: `
      bg-transparent
      border border-zen-200
      text-zen-600
      hover:border-zen-300 hover:bg-zen-50
      focus:ring-zen-400
    `
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-full animate-bounce" />
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
        </span>
      ) : (
        children
      )}
      ы
      <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </button>
  );
};