import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface ToggleControlProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  tooltip?: string;
  disabled?: boolean;
}

export const ToggleControl: React.FC<ToggleControlProps> = ({
  label,
  checked,
  onCheckedChange,
  tooltip,
  disabled = false,
}) => {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-2">
        <Label
          htmlFor={`toggle-${label.toLowerCase().replace(/\s+/g, "-")}`}
          className="cursor-pointer"
        >
          {label}
        </Label>

        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <Switch
        id={`toggle-${label.toLowerCase().replace(/\s+/g, "-")}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
};

interface ToggleGroupProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  title,
  className = "",
  children,
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {title && <Label className="text-sm font-medium">{title}</Label>}
      <div className="space-y-2">{children}</div>
    </div>
  );
};

export default ToggleControl;
