import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the app
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      if (this.props.fallback) {
        if (typeof this.props.fallback === "function") {
          return this.props.fallback(this.state.error as Error);
        }
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded-md">
          <h2 className="text-lg font-semibold text-red-700">
            Something went wrong
          </h2>
          <details className="mt-2 text-sm text-red-600">
            <summary>Error details</summary>
            <pre className="mt-2 p-2 bg-red-100 rounded overflow-auto max-h-64">
              {this.state.error?.toString()}
            </pre>
          </details>
          <button
            className="mt-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
