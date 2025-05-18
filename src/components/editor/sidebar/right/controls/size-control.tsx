import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SizeControlProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options?: string[];
  allowCustom?: boolean;
  minValue?: number;
  maxValue?: number;
}

const SizeControl: React.FC<SizeControlProps> = ({
  value,
  onChange,
  options = ["auto", "100%", "75%", "50%", "25%"],
  allowCustom = false,
  minValue = 0,
  maxValue = 1000,
}) => {
  type UnitType = "px" | "%" | "auto";

  const getInitialUnit = (): UnitType => {
    if (value === "auto") return "auto";
    if (typeof value === "string" && value.endsWith("%")) return "%";
    return "px";
  };

  const [unit, setUnit] = useState<UnitType>(getInitialUnit);

  const getNumericValue = (): number => {
    if (typeof value === "number") return value;
    if (value === "auto") return 0;
    if (typeof value === "string" && value.endsWith("%")) {
      return parseInt(value, 10) || 0;
    }
    return parseInt(value as string, 10) || 0;
  };

  const numericValue = getNumericValue();

  const handleValueChange = (newValue: number) => {
    if (unit === "auto") {
      onChange("auto");
    } else if (unit === "%") {
      onChange(`${newValue}%`);
    } else {
      onChange(newValue);
    }
  };

  const handleUnitChange = (newUnit: UnitType) => {
    setUnit(newUnit);

    if (newUnit === "auto") {
      onChange("auto");
    } else if (newUnit === "%") {
      const percentage = Math.round((numericValue / maxValue) * 100);
      onChange(`${Math.min(percentage, 100)}%`);
    } else {
      if (typeof value === "string" && value.endsWith("%")) {
        const percentage = parseInt(value, 10);
        onChange(Math.round((percentage / 100) * maxValue));
      } else if (value === "auto") {
        onChange(200);
      } else {
        onChange(numericValue);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!inputValue) return;

    const numericInputValue = parseInt(inputValue, 10);
    if (!isNaN(numericInputValue)) {
      handleValueChange(numericInputValue);
    }
  };

  const handleOptionSelect = (option: string) => {
    onChange(option);

    if (option === "auto") {
      setUnit("auto");
    } else if (option.endsWith("%")) {
      setUnit("%");
    } else {
      setUnit("px");
    }
  };

  return (
    <div className="space-y-3">
      {options && options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`px-2 py-1 text-xs rounded border ${
                value === option
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-input hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {allowCustom && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="size-input">Custom</Label>
            <Select
              value={unit}
              onValueChange={(v) => handleUnitChange(v as UnitType)}
            >
              <SelectTrigger className="w-20 h-8">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="px">px</SelectItem>
                <SelectItem value="%">%</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {unit !== "auto" && (
            <div className="grid grid-cols-[1fr_80px] gap-2">
              <Slider
                min={minValue}
                max={unit === "px" ? maxValue : 100}
                step={1}
                value={[
                  unit === "%"
                    ? parseInt(value as string, 10) || 100
                    : numericValue,
                ]}
                onValueChange={(values) => handleValueChange(values[0])}
              />
              <Input
                id="size-input"
                type="number"
                min={minValue}
                max={unit === "px" ? maxValue : 100}
                value={
                  unit === "%"
                    ? parseInt(value as string, 10) || 100
                    : numericValue
                }
                onChange={handleInputChange}
                className="w-20 h-8"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SizeControl;
