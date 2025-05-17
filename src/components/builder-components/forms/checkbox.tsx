import React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
  id: string;
  name?: string;
  label?: string;
  value?: string;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  style?: React.CSSProperties;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing?: boolean;
  isSelected?: boolean;
  description?: string;
}

/**
 * Checkbox component for the website builder
 * Supports label, description, and various states
 */
export default function Checkbox({
  id,
  name,
  label = "Checkbox label",
  value,
  checked = false,
  required = false,
  disabled = false,
  className = "",
  labelClassName = "",
  style = {},
  onChange,
  isEditing = false,
  isSelected = false,
  description,
}: CheckboxProps) {
  // Generate a unique ID for the checkbox if not provided
  const checkboxId = `checkbox-${id}`;

  const containerClasses = cn(
    "flex items-start space-x-2",
    isSelected && !isEditing && "ring-2 ring-primary ring-offset-2 p-1 rounded",
    className
  );

  const checkboxClasses = cn(
    "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary",
    disabled && "cursor-not-allowed opacity-50"
  );

  const labelClasses = cn(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    labelClassName
  );

  return (
    <div
      id={id}
      className={containerClasses}
      style={style}
      data-component-type="checkbox"
    >
      <div className="flex items-center h-4">
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          value={value}
          checked={checked}
          required={required}
          disabled={disabled || isEditing}
          className={checkboxClasses}
          onChange={isEditing ? undefined : onChange}
        />
      </div>
      <div className="grid gap-1.5 leading-none">
        <label htmlFor={checkboxId} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
}
