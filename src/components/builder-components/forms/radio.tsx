import React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioProps {
  id: string;
  name: string;
  options?: RadioOption[];
  selectedValue?: string;
  label?: string;
  required?: boolean;
  className?: string;
  radioGroupClassName?: string;
  labelClassName?: string;
  radioItemClassName?: string;
  style?: React.CSSProperties;
  layout?: "vertical" | "horizontal";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing?: boolean;
  isSelected?: boolean;
  description?: string;
}

/**
 * Radio group component for the website builder
 * Displays a set of radio button options in vertical or horizontal layout
 */
export default function Radio({
  id,
  name,
  options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
  selectedValue,
  label = "Select an option",
  required = false,
  className = "",
  radioGroupClassName = "",
  labelClassName = "",
  radioItemClassName = "",
  style = {},
  layout = "vertical",
  onChange,
  isEditing = false,
  isSelected = false,
  description,
}: RadioProps) {
  const containerClasses = cn(
    "flex flex-col space-y-2",
    isSelected && !isEditing && "ring-2 ring-primary ring-offset-2 p-1 rounded",
    className
  );

  const radioGroupClasses = cn(
    layout === "vertical" && "flex flex-col space-y-2",
    layout === "horizontal" && "flex flex-row space-x-6 flex-wrap",
    radioGroupClassName
  );

  const labelClasses = cn("text-sm font-medium", labelClassName);

  return (
    <div
      id={id}
      className={containerClasses}
      style={style}
      data-component-type="radio"
    >
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {description && <p className="text-sm text-gray-500">{description}</p>}

      <div
        className={radioGroupClasses}
        role="radiogroup"
        aria-labelledby={`${id}-label`}
      >
        {options.map((option, index) => {
          const optionId = `${id}-${option.value}`;

          const radioItemClasses = cn(
            "flex items-center space-x-2",
            option.disabled && "opacity-50 cursor-not-allowed",
            radioItemClassName
          );

          return (
            <div key={optionId} className={radioItemClasses}>
              <input
                type="radio"
                id={optionId}
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                disabled={option.disabled || isEditing}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                onChange={isEditing ? undefined : onChange}
              />
              <label
                htmlFor={optionId}
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
