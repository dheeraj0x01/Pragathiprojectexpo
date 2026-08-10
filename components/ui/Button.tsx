import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', isLoading = false, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sru-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm";
    
    const variants = {
      primary: "bg-sru-blue text-white hover:bg-sru-darkBlue hover:shadow-md",
      secondary: "bg-sru-lightBlue text-white hover:bg-blue-700",
      outline: "border border-sru-blue/30 text-sru-blue hover:bg-sru-blue/10 dark:text-blue-400 dark:border-blue-400/40",
      danger: "bg-red-600 text-white hover:bg-red-700",
      ghost: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-none shadow-none",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs font-medium",
      md: "px-4 py-2 text-sm font-semibold",
      lg: "px-6 py-3 text-base font-semibold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
