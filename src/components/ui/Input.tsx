import React, { type InputHTMLAttributes } from "react";

type InputProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;
export function Input({ value, onChange, ...rest }: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      className="flex-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...rest}
    />
  );
}
