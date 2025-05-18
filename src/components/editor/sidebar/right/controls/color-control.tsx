import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, Pipette } from "lucide-react";

interface ColorControlProps {
  value: string;
  onChange: (value: string) => void;
  showTransparent?: boolean;
  label?: string;
}

const presetColors = [
  "#000000",
  "#FFFFFF",
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#607D8B",
];

const ColorControl: React.FC<ColorControlProps> = ({
  value,
  onChange,
  showTransparent = false,
  label,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  // Create extended colors array with transparent if needed
  const availableColors = showTransparent
    ? ["transparent", ...presetColors]
    : presetColors;

  const handleColorChange = (newColor: string) => {
    setInputValue(newColor);
    onChange(newColor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Validate if it's a valid hex color
    if (/^#([0-9A-F]{3}){1,2}$/i.test(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex items-center gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-10 h-10 p-0 border-2"
              style={{
                backgroundColor: value,
                backgroundImage:
                  value === "transparent"
                    ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
                    : "none",
                backgroundSize: "10px 10px",
                backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
              }}
            >
              <span className="sr-only">Pick color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {availableColors.map((presetColor) => (
                  <Button
                    key={presetColor}
                    variant="outline"
                    className="w-6 h-6 p-0 rounded-md border"
                    style={{
                      backgroundColor: presetColor,
                      backgroundImage:
                        presetColor === "transparent"
                          ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
                          : "none",
                      backgroundSize: "8px 8px",
                      backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
                    }}
                    onClick={() => handleColorChange(presetColor)}
                  >
                    {presetColor === value && (
                      <CheckIcon
                        className="h-4 w-4"
                        style={{
                          color:
                            presetColor === "transparent" ||
                            isLightColor(presetColor)
                              ? "#000000"
                              : "#FFFFFF",
                        }}
                      />
                    )}
                    <span className="sr-only">{presetColor}</span>
                  </Button>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="#RRGGBB"
                    maxLength={7}
                  />
                  <div
                    className="w-8 h-8 rounded border"
                    style={{
                      backgroundColor: isValidColor(inputValue)
                        ? inputValue
                        : "#FF0000",
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    onChange(inputValue);
                    setIsOpen(false);
                  }}
                  disabled={!isValidColor(inputValue)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex-1">
          <Input
            value={value === "transparent" ? "transparent" : inputValue}
            onChange={handleInputChange}
            placeholder="#RRGGBB"
            maxLength={7}
            disabled={value === "transparent"}
          />
        </div>
        <Button size="icon" variant="outline">
          <Pipette className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Helper function to check if a color is light
function isLightColor(color: string): boolean {
  if (color === "transparent") return true;

  // Convert hex to RGB
  const hex = color.replace("#", "");
  const r = parseInt(
    hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2),
    16
  );
  const g = parseInt(
    hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4),
    16
  );
  const b = parseInt(
    hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6),
    16
  );

  // Calculate brightness (YIQ equation)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128;
}

// Helper function to validate if it's a valid hex color
function isValidColor(color: string): boolean {
  return /^#([0-9A-F]{3}){1,2}$/i.test(color);
}

export default ColorControl;
