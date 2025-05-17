import React from "react";
import { cn } from "@/lib/utils";
import { useEditorState } from "@/hooks/use-editor-state";

interface TextareaProps {
  id: string;
  name?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  label?: string;
  helpText?: string;
}

const Textarea = ({
  id,
  name,
  placeholder = "Enter your message here...",
  value = "",
  rows = 4,
  required = false,
  disabled = false,
  className = "",
  style = {},
  onChange,
  label = "Message",
  helpText = "",
}: TextareaProps) => {
  const { isEditing } = useEditorState();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange && !isEditing) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="form-field w-full" data-component-type="textarea">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name || id}
        rows={rows}
        placeholder={placeholder}
        defaultValue={value}
        required={required}
        disabled={disabled || isEditing}
        onChange={handleChange}
        className={cn(
          "w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          className
        )}
        style={style}
      />
      {helpText && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
};

// Metadata used by the builder
Textarea.displayName = "Textarea";
Textarea.builderId = "forms/textarea";
Textarea.builderCategory = "Forms";
Textarea.builderDescription =
  "Multi-line text input field for longer text entries";
Textarea.builderIcon = "TextIcon";

// Default props for when component is first added to the canvas
Textarea.defaultProps = {
  placeholder: "Enter your message here...",
  rows: 4,
  required: false,
  disabled: false,
  label: "Message",
  helpText: "",
};

export default Textarea;
