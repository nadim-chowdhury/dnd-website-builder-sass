import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface FormProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  method?: "GET" | "POST";
  action?: string;
  children?: React.ReactNode;
  successMessage?: string;
  errorMessage?: string;
  isEditing?: boolean;
  isSelected?: boolean;
  formName?: string;
  storeSubmissions?: boolean;
  redirectUrl?: string;
  enableRecaptcha?: boolean;
  formLayout?: "vertical" | "horizontal" | "inline";
  spacing?: "tight" | "normal" | "loose";
}

/**
 * Form component for the website builder
 * Acts as a container for form elements with submission handling
 */
export default function Form({
  id,
  className = "",
  style = {},
  method = "POST",
  action = "",
  children,
  successMessage = "Form submitted successfully!",
  errorMessage = "There was an error submitting the form. Please try again.",
  isEditing = false,
  isSelected = false,
  formName = "Contact Form",
  storeSubmissions = true,
  redirectUrl = "",
  enableRecaptcha = false,
  formLayout = "vertical",
  spacing = "normal",
}: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formClasses = cn(
    formLayout === "vertical" && "flex flex-col",
    formLayout === "horizontal" && "grid grid-cols-12 gap-4",
    formLayout === "inline" && "flex items-center",
    spacing === "tight" && "gap-2",
    spacing === "normal" && "gap-4",
    spacing === "loose" && "gap-6",
    isSelected && !isEditing && "ring-2 ring-primary ring-offset-2 p-2",
    className
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    // In editing mode, prevent actual submission
    if (isEditing) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const formEntries = Object.fromEntries(formData.entries());

      // If there's an action URL, submit the form there
      if (action) {
        const response = await fetch(action, {
          method,
          body: method === "POST" ? formData : undefined,
          headers:
            method === "POST"
              ? {
                  Accept: "application/json",
                }
              : undefined,
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        setSubmitted(true);

        // Handle redirect if specified
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      } else {
        // Mock successful submission for preview purposes
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form would submit:", formEntries);
        setSubmitted(true);

        // Handle redirect if specified
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      }
    } catch (err) {
      setError(errorMessage);
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset the form state (for editing/testing)
  const resetForm = () => {
    setSubmitted(false);
    setError(null);
  };

  // Display success message after submission
  if (submitted && !isEditing) {
    return (
      <div
        id={id}
        className={cn("p-4 bg-green-50 text-green-800 rounded", className)}
        style={style}
        data-component-type="form"
      >
        <p>{successMessage}</p>
        {isEditing && (
          <button
            onClick={resetForm}
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
          >
            Reset Form (Builder Only)
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      id={id}
      className={formClasses}
      style={style}
      method={method}
      action={isEditing ? undefined : action}
      onSubmit={handleSubmit}
      data-component-type="form"
      data-form-name={formName}
    >
      {error && !isEditing && (
        <div className="mb-4 p-3 bg-red-50 text-red-800 rounded">{error}</div>
      )}

      {/* Form name shown only in editing mode */}
      {isEditing && (
        <div className="mb-4 text-sm text-gray-500 bg-gray-50 p-2 rounded border border-gray-200">
          Form: {formName}
          {storeSubmissions && " (Submissions will be stored)"}
          {enableRecaptcha && " (Protected by reCAPTCHA)"}
        </div>
      )}

      {children}

      {isEditing && submitted && (
        <button
          onClick={resetForm}
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Reset Form (Builder Only)
        </button>
      )}
    </form>
  );
}
