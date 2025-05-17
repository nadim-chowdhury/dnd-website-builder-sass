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

interface MarginPaddingControlProps {
  margin: SpacingValues;
  padding: SpacingValues;
  onMarginChange: (values: SpacingValues) => void;
  onPaddingChange: (values: SpacingValues) => void;
}

export const MarginPaddingControl: React.FC<MarginPaddingControlProps> = ({
  margin,
  padding,
  onMarginChange,
  onPaddingChange,
}) => {
  const [activeTab, setActiveTab] = useState<string>("margin");
  const [linked, setLinked] = useState<boolean>(false);

  const handleMarginChange = (position: keyof SpacingValues, value: number) => {
    const newValues = { ...margin };

    if (linked) {
      // If linked, update all values
      newValues.top = value;
      newValues.right = value;
      newValues.bottom = value;
      newValues.left = value;
    } else {
      // Otherwise just update the specific position
      newValues[position] = value;
    }

    onMarginChange(newValues);
  };

  const handlePaddingChange = (
    position: keyof SpacingValues,
    value: number
  ) => {
    const newValues = { ...padding };

    if (linked) {
      // If linked, update all values
      newValues.top = value;
      newValues.right = value;
      newValues.bottom = value;
      newValues.left = value;
    } else {
      // Otherwise just update the specific position
      newValues[position] = value;
    }

    onPaddingChange(newValues);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Spacing</Label>
        <Toggle
          pressed={linked}
          onPressedChange={setLinked}
          aria-label="Link values"
          size="sm"
        >
          <Link className="h-4 w-4" />
        </Toggle>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="margin">Margin</TabsTrigger>
          <TabsTrigger value="padding">Padding</TabsTrigger>
        </TabsList>

        <TabsContent value="margin" className="space-y-4">
          <div className="space-y-4 pt-2">
            <SpacingControl
              label="Top"
              value={margin.top}
              onChange={(value) => handleMarginChange("top", value)}
            />
            <SpacingControl
              label="Right"
              value={margin.right}
              onChange={(value) => handleMarginChange("right", value)}
            />
            <SpacingControl
              label="Bottom"
              value={margin.bottom}
              onChange={(value) => handleMarginChange("bottom", value)}
            />
            <SpacingControl
              label="Left"
              value={margin.left}
              onChange={(value) => handleMarginChange("left", value)}
            />
          </div>
        </TabsContent>

        <TabsContent value="padding" className="space-y-4">
          <div className="space-y-4 pt-2">
            <SpacingControl
              label="Top"
              value={padding.top}
              onChange={(value) => handlePaddingChange("top", value)}
            />
            <SpacingControl
              label="Right"
              value={padding.right}
              onChange={(value) => handlePaddingChange("right", value)}
            />
            <SpacingControl
              label="Bottom"
              value={padding.bottom}
              onChange={(value) => handlePaddingChange("bottom", value)}
            />
            <SpacingControl
              label="Left"
              value={padding.left}
              onChange={(value) => handlePaddingChange("left", value)}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="pt-2">
        <div className="border rounded-md p-4">
          <div className="bg-muted-foreground/20 border border-dashed border-muted-foreground/40 p-4 flex items-center justify-center">
            <div className="bg-muted-foreground/20 border border-dashed border-muted-foreground/40 p-6 flex items-center justify-center">
              <div className="text-xs text-muted-foreground">Element</div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>
              Margin:{" "}
              {activeTab === "margin"
                ? `${margin.top}, ${margin.right}, ${margin.bottom}, ${margin.left}`
                : ""}
            </span>
            <span>
              Padding:{" "}
              {activeTab === "padding"
                ? `${padding.top}, ${padding.right}, ${padding.bottom}, ${padding.left}`
                : ""}
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
