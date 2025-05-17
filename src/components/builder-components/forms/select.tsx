import React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  id: string;
  name?: string;
  options?: SelectOption[];
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  style?: React.CSSProperties;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  isEditing?: boolean;
  isSelected?: boolean;
  description?: string;
  error?: string;
  multiple?: boolean;
  size?: number;
}

/**
 * Select component for the website builder
 * Renders a dropdown select with configurable options
 */
export default function Select({
  id,
  name,
  options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
  label,
  placeholder = "Select an option",
  value,
  defaultValue,
  required = false,
  disabled = false,
  className = "",
  labelClassName = "",
  selectClassName = "",
  style = {},
  onChange,
  onFocus,
  onBlur,
  isEditing = false,
  isSelected = false,
  description,
  error,
  multiple = false,
  size,
}: SelectProps) {
  // Generate a unique ID for the select if name is not provided
  const selectId = `select-${id}`;

  const containerClasses = cn(
    "flex flex-col space-y-2 w-full",
    isSelected && !isEditing && "ring-2 ring-primary ring-offset-2 p-1 rounded",
    className
  );

  const labelClasses = cn("text-sm font-medium", labelClassName);

  const selectClasses = cn(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    error && "border-red-500 focus-visible:ring-red-500",
    selectClassName
  );

  // Style adjustments for multi-select
  const multiSelectClasses = cn(
    selectClasses,
    multiple && "h-auto min-h-[80px]"
  );

  return (
    <div
      id={id}
      className={containerClasses}
      style={style}
      data-component-type="select"
    >
      {label && (
        <label htmlFor={selectId} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={isEditing ? undefined : value}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled || isEditing}
          className={multiple ? multiSelectClasses : selectClasses}
          onChange={isEditing ? undefined : onChange}
          onFocus={isEditing ? undefined : onFocus}
          onBlur={isEditing ? undefined : onBlur}
          aria-describedby={description ? `${selectId}-description` : undefined}
          aria-invalid={error ? "true" : "false"}
          multiple={multiple}
          size={multiple ? size || 4 : undefined}
        >
          {placeholder && !multiple && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={`${selectId}-${option.value}`}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {!multiple && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        )}
      </div>

      {description && !error && (
        <p id={`${selectId}-description`} className="text-sm text-gray-500">
          {description}
        </p>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
