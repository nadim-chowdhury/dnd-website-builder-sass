import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps {
  id: string;
  name?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "date"
    | "time"
    | "datetime-local"
    | "search";
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  style?: React.CSSProperties;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isEditing?: boolean;
  isSelected?: boolean;
  description?: string;
  error?: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

/**
 * Input component for the website builder
 * Supports various input types, validation, and styling options
 */
export default function Input({
  id,
  name,
  type = "text",
  label,
  placeholder = "",
  value,
  defaultValue,
  required = false,
  disabled = false,
  readOnly = false,
  className = "",
  labelClassName = "",
  inputClassName = "",
  style = {},
  min,
  max,
  step,
  pattern,
  autoComplete = "on",
  onChange,
  onFocus,
  onBlur,
  isEditing = false,
  isSelected = false,
  description,
  error,
  icon,
  iconPosition = "left",
}: InputProps) {
  // Generate a unique ID for the input if name is not provided
  const inputId = `input-${id}`;

  const containerClasses = cn(
    "flex flex-col space-y-2 w-full",
    isSelected && !isEditing && "ring-2 ring-primary ring-offset-2 p-1 rounded",
    className
  );

  const labelClasses = cn("text-sm font-medium", labelClassName);

  const inputContainerClasses = cn("relative", icon && "flex items-center");

  const inputClasses = cn(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    icon && iconPosition === "left" && "pl-10",
    icon && iconPosition === "right" && "pr-10",
    error && "border-red-500 focus-visible:ring-red-500",
    inputClassName
  );

  return (
    <div
      id={id}
      className={containerClasses}
      style={style}
      data-component-type="input"
    >
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={inputContainerClasses}>
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <i className={icon}></i>
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={isEditing ? undefined : value}
          defaultValue={isEditing ? label || placeholder : defaultValue}
          required={required}
          disabled={disabled || isEditing}
          readOnly={readOnly || isEditing}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          autoComplete={autoComplete}
          className={inputClasses}
          onChange={isEditing ? undefined : onChange}
          onFocus={isEditing ? undefined : onFocus}
          onBlur={isEditing ? undefined : onBlur}
          aria-describedby={description ? `${inputId}-description` : undefined}
          aria-invalid={error ? "true" : "false"}
        />

        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <i className={icon}></i>
          </div>
        )}
      </div>

      {description && !error && (
        <p id={`${inputId}-description`} className="text-sm text-gray-500">
          {description}
        </p>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
