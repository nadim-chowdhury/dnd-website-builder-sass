import React from "react";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

interface AlignmentControlProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  showJustify?: boolean;
}

export function AlignmentControl({
  value = "left",
  onChange,
  label = "Alignment",
  showJustify = false,
}: AlignmentControlProps) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(value) => {
          if (value) onChange(value);
        }}
        className="justify-start"
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
        {showJustify && (
          <ToggleGroupItem value="justify" aria-label="Justify">
            <AlignJustify className="h-4 w-4" />
          </ToggleGroupItem>
        )}
      </ToggleGroup>
    </div>
  );
}

export default AlignmentControl;
