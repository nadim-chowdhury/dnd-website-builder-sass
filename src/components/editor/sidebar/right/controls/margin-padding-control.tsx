import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Link } from "lucide-react";

interface SpacingValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

// Updated interface to match how it's being used in StyleEditor
interface MarginPaddingControlProps {
  value: any; // Accept the value prop
  onChange: (value: any) => void; // Accept the onChange prop
  type: string; // Accept the type prop ("margin" or "padding")
}

export const MarginPaddingControl: React.FC<MarginPaddingControlProps> = ({
  value = {}, // Default to empty object if not provided
  onChange,
  type = "margin", // Default to "margin" if not specified
}) => {
  const [linked, setLinked] = useState<boolean>(false);

  // Initialize spacing values with defaults
  const spacingValues: SpacingValues = {
    top: value.top || 0,
    right: value.right || 0,
    bottom: value.bottom || 0,
    left: value.left || 0,
  };

  const handleSpacingChange = (
    position: keyof SpacingValues,
    newValue: number
  ) => {
    const updatedValues = { ...spacingValues };

    if (linked) {
      // If linked, update all values
      updatedValues.top = newValue;
      updatedValues.right = newValue;
      updatedValues.bottom = newValue;
      updatedValues.left = newValue;
    } else {
      // Otherwise just update the specific position
      updatedValues[position] = newValue;
    }

    onChange(updatedValues);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>{type === "margin" ? "Margin" : "Padding"}</Label>
        <Toggle
          pressed={linked}
          onPressedChange={setLinked}
          aria-label="Link values"
          size="sm"
        >
          <Link className="h-4 w-4" />
        </Toggle>
      </div>

      <div className="space-y-4 pt-2">
        <SpacingControl
          label="Top"
          value={spacingValues.top}
          onChange={(value) => handleSpacingChange("top", value)}
        />
        <SpacingControl
          label="Right"
          value={spacingValues.right}
          onChange={(value) => handleSpacingChange("right", value)}
        />
        <SpacingControl
          label="Bottom"
          value={spacingValues.bottom}
          onChange={(value) => handleSpacingChange("bottom", value)}
        />
        <SpacingControl
          label="Left"
          value={spacingValues.left}
          onChange={(value) => handleSpacingChange("left", value)}
        />
      </div>

      <div className="pt-2">
        <div className="border rounded-md p-4">
          <div className="bg-muted-foreground/20 border border-dashed border-muted-foreground/40 p-4 flex items-center justify-center">
            <div className="bg-muted-foreground/20 border border-dashed border-muted-foreground/40 p-6 flex items-center justify-center">
              <div className="text-xs text-muted-foreground">Element</div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>
              {type.charAt(0).toUpperCase() + type.slice(1)}:{" "}
              {`${spacingValues.top}, ${spacingValues.right}, ${spacingValues.bottom}, ${spacingValues.left}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SpacingControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const SpacingControl: React.FC<SpacingControlProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="grid grid-cols-[100px_1fr_60px] gap-2 items-center">
      <Label htmlFor={`spacing-${label.toLowerCase()}`}>{label}</Label>
      <Slider
        id={`spacing-${label.toLowerCase()}-slider`}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={handleSliderChange}
      />
      <Input
        id={`spacing-${label.toLowerCase()}`}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        className="w-16 h-8"
      />
    </div>
  );
};

export default MarginPaddingControl;
