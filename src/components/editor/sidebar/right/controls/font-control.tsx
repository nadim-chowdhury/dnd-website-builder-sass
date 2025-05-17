import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface FontSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

// Common web-safe fonts
const fonts = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "Helvetica, sans-serif", label: "Helvetica" },
  { value: "Tahoma, sans-serif", label: "Tahoma" },
  { value: "Trebuchet MS, sans-serif", label: "Trebuchet MS" },
  { value: "Times New Roman, serif", label: "Times New Roman" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Garamond, serif", label: "Garamond" },
  { value: "Courier New, monospace", label: "Courier New" },
  { value: "Brush Script MT, cursive", label: "Brush Script MT" },
  { value: "Impact, fantasy", label: "Impact" },
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Roboto, sans-serif", label: "Roboto" },
  { value: "Open Sans, sans-serif", label: "Open Sans" },
  { value: "Montserrat, sans-serif", label: "Montserrat" },
  { value: "Lato, sans-serif", label: "Lato" },
  { value: "Poppins, sans-serif", label: "Poppins" },
  { value: "Playfair Display, serif", label: "Playfair Display" },
];

export function FontSelect({ value, onChange, label }: FontSelectProps) {
  const [open, setOpen] = React.useState(false);

  // Find the selected font object
  const selectedFont = fonts.find(
    (font) =>
      font.value === value ||
      font.label === value ||
      // Handle case where only the first font in a font-family list is provided
      font.value.split(",")[0].trim() === value
  );

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span style={{ fontFamily: selectedFont?.value || "system-ui" }}>
              {selectedFont?.label || value || "Select font..."}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search font..." />
            <CommandEmpty>No font found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {fonts.map((font) => (
                <CommandItem
                  key={font.value}
                  value={font.label}
                  onSelect={() => {
                    onChange(font.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedFont?.value === font.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FontSelect;
