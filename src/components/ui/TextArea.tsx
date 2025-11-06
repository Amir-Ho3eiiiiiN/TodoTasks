import React, { type TextareaHTMLAttributes } from "react";

type TextareaProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ value, onChange, ...rest }: TextareaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className="flex-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      {...rest}
    />
  );
}
