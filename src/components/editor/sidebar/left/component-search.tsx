import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ComponentSearchProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * ComponentSearch provides a search input for filtering components
 * in the component browser.
 */
const ComponentSearch = ({ value, onChange }: ComponentSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount for immediate search
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle clearing the search
  const handleClear = () => {
    onChange("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      <div
        className={`
          flex items-center border rounded-md transition-all
          ${isFocused ? "ring-2 ring-ring ring-offset-0" : ""}
        `}
      >
        <Search className="h-4 w-4 text-muted-foreground absolute left-3" />

        <Input
          ref={inputRef}
          type="text"
          placeholder="Search components..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-9 h-9 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="h-6 w-6 absolute right-2"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>

      {value && (
        <div className="text-xs text-muted-foreground mt-1 px-2">
          {`Showing results for "${value}"`}
        </div>
      )}
    </div>
  );
};

export default ComponentSearch;
