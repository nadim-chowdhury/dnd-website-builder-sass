import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, LockIcon, UnlockIcon } from "lucide-react";

interface SizeControlProps {
  width: string | number;
  height: string | number;
  onWidthChange: (value: string | number) => void;
  onHeightChange: (value: string | number) => void;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  allowResponsive?: boolean;
}

export const SizeControl: React.FC<SizeControlProps> = ({
  width,
  height,
  onWidthChange,
  onHeightChange,
  minWidth = 0,
  maxWidth = 1000,
  minHeight = 0,
  maxHeight = 1000,
  allowResponsive = true,
}) => {
  const [aspectLocked, setAspectLocked] = useState(false);
  const [widthUnit, setWidthUnit] = useState<"px" | "%" | "auto">("px");
  const [heightUnit, setHeightUnit] = useState<"px" | "%" | "auto">("px");

  // Convert width and height to numeric values
  const getNumericWidth = (): number => {
    if (typeof width === "number") return width;
    if (width === "auto") return 0;
    return parseInt(width, 10) || 0;
  };

  const getNumericHeight = (): number => {
    if (typeof height === "number") return height;
    if (height === "auto") return 0;
    return parseInt(height, 10) || 0;
  };

  const numericWidth = getNumericWidth();
  const numericHeight = getNumericHeight();
  const aspectRatio = numericHeight !== 0 ? numericWidth / numericHeight : 0;

  const handleWidthChange = (newWidth: number) => {
    const newWidthValue = widthUnit === "auto" ? "auto" : newWidth;
    onWidthChange(newWidthValue);

    // If aspect ratio is locked, update height accordingly
    if (
      aspectLocked &&
      aspectRatio !== 0 &&
      widthUnit !== "auto" &&
      heightUnit !== "auto"
    ) {
      const newHeight = Math.round(newWidth / aspectRatio);
      onHeightChange(newHeight);
    }
  };

  const handleHeightChange = (newHeight: number) => {
    const newHeightValue = heightUnit === "auto" ? "auto" : newHeight;
    onHeightChange(newHeightValue);

    // If aspect ratio is locked, update width accordingly
    if (
      aspectLocked &&
      aspectRatio !== 0 &&
      widthUnit !== "auto" &&
      heightUnit !== "auto"
    ) {
      const newWidth = Math.round(newHeight * aspectRatio);
      onWidthChange(newWidth);
    }
  };

  const handleWidthUnitChange = (value: "px" | "%" | "auto") => {
    setWidthUnit(value);

    if (value === "auto") {
      onWidthChange("auto");
    } else if (value === "%") {
      // Convert to percentage (assuming 100% is maxWidth)
      const percentage = Math.round((numericWidth / maxWidth) * 100);
      onWidthChange(`${Math.min(percentage, 100)}%`);
    } else {
      // Convert percentage to pixels if coming from %
      if (typeof width === "string" && width.endsWith("%")) {
        const percentage = parseInt(width, 10);
        onWidthChange(Math.round((percentage / 100) * maxWidth));
      } else if (width === "auto") {
        onWidthChange(200); // Default width if coming from auto
      }
    }
  };

  const handleHeightUnitChange = (value: "px" | "%" | "auto") => {
    setHeightUnit(value);

    if (value === "auto") {
      onHeightChange("auto");
    } else if (value === "%") {
      // Convert to percentage (assuming 100% is maxHeight)
      const percentage = Math.round((numericHeight / maxHeight) * 100);
      onHeightChange(`${Math.min(percentage, 100)}%`);
    } else {
      // Convert percentage to pixels if coming from %
      if (typeof height === "string" && height.endsWith("%")) {
        const percentage = parseInt(height, 10);
        onHeightChange(Math.round((percentage / 100) * maxHeight));
      } else if (height === "auto") {
        onHeightChange(200); // Default height if coming from auto
      }
    }
  };

  // Handle input change for width
  const handleWidthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;

    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      handleWidthChange(numericValue);
    }
  };

  // Handle input change for height
  const handleHeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;

    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      handleHeightChange(numericValue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Size</Label>
        <Toggle
          pressed={aspectLocked}
          onPressedChange={setAspectLocked}
          aria-label="Lock aspect ratio"
          size="sm"
        >
          {aspectLocked ? (
            <LockIcon className="h-4 w-4" />
          ) : (
            <UnlockIcon className="h-4 w-4" />
          )}
        </Toggle>
      </div>

      {/* Width Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="width-input">Width</Label>
          <Select
            value={widthUnit}
            onValueChange={(v) =>
              handleWidthUnitChange(v as "px" | "%" | "auto")
            }
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

        {widthUnit !== "auto" && (
          <div className="grid grid-cols-[1fr_80px] gap-2">
            <Slider
              disabled={widthUnit === "auto"}
              min={minWidth}
              max={widthUnit === "px" ? maxWidth : 100}
              step={1}
              value={[
                widthUnit === "%"
                  ? parseInt(width as string, 10) || 100
                  : numericWidth,
              ]}
              onValueChange={(values) => handleWidthChange(values[0])}
            />
            <Input
              id="width-input"
              type="number"
              min={minWidth}
              max={widthUnit === "px" ? maxWidth : 100}
              value={
                widthUnit === "%"
                  ? parseInt(width as string, 10) || 100
                  : numericWidth
              }
              onChange={handleWidthInputChange}
              disabled={widthUnit === "auto"}
              className="w-20 h-8"
            />
          </div>
        )}
      </div>

      {/* Height Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="height-input">Height</Label>
          <Select
            value={heightUnit}
            onValueChange={(v) =>
              handleHeightUnitChange(v as "px" | "%" | "auto")
            }
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

        {heightUnit !== "auto" && (
          <div className="grid grid-cols-[1fr_80px] gap-2">
            <Slider
              disabled={heightUnit === "auto"}
              min={minHeight}
              max={heightUnit === "px" ? maxHeight : 100}
              step={1}
              value={[
                heightUnit === "%"
                  ? parseInt(height as string, 10) || 100
                  : numericHeight,
              ]}
              onValueChange={(values) => handleHeightChange(values[0])}
            />
            <Input
              id="height-input"
              type="number"
              min={minHeight}
              max={heightUnit === "px" ? maxHeight : 100}
              value={
                heightUnit === "%"
                  ? parseInt(height as string, 10) || 100
                  : numericHeight
              }
              onChange={handleHeightInputChange}
              disabled={heightUnit === "auto"}
              className="w-20 h-8"
            />
          </div>
        )}
      </div>

      {/* Responsive settings if allowed */}
      {allowResponsive && (
        <div className="pt-2">
          <Label>Responsive Behavior</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="mobile-responsive"
                className="rounded"
              />
              <Label htmlFor="mobile-responsive" className="text-sm">
                Mobile
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="tablet-responsive"
                className="rounded"
              />
              <Label htmlFor="tablet-responsive" className="text-sm">
                Tablet
              </Label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeControl;
