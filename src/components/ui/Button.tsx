import React, { type ButtonHTMLAttributes } from "react";

type ButtonProps = {
  className: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${className} px-4 py-2 transition rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
