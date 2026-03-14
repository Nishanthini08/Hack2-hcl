import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div
      className={twMerge(clsx("flex flex-col space-y-1.5 p-6", className))}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3
      className={twMerge(
        clsx("font-semibold leading-none tracking-tight text-xl text-slate-900", className)
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={twMerge(clsx("p-6 pt-0", className))} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className, children, ...props }) => {
  return (
    <div
      className={twMerge(clsx("flex items-center p-6 pt-0", className))}
      {...props}
    >
      {children}
    </div>
  );
};
