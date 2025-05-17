import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Smartphone, Tablet, Monitor, Laptop } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useResponsivePreview } from "@/hooks/use-responsive-preview";
import { cn } from "@/lib/utils";

export interface DeviceSwitcherProps {
  className?: string;
}

export const DeviceSwitcher: React.FC<DeviceSwitcherProps> = ({
  className,
}) => {
  const { currentDevice, setDevice, devices } = useResponsivePreview();

  return (
    <TooltipProvider>
      <div className={cn("flex items-center", className)}>
        <span className="text-sm font-medium mr-2 hidden sm:inline-block">
          Device:
        </span>
        <ToggleGroup
          type="single"
          value={currentDevice}
          onValueChange={(value) => value && setDevice(value)}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem value="mobile" aria-label="Mobile view">
                <Smartphone className="h-4 w-4" />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mobile view ({devices.mobile.width}px)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem value="tablet" aria-label="Tablet view">
                <Tablet className="h-4 w-4" />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tablet view ({devices.tablet.width}px)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem value="laptop" aria-label="Laptop view">
                <Laptop className="h-4 w-4" />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Laptop view ({devices.laptop.width}px)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem value="desktop" aria-label="Desktop view">
                <Monitor className="h-4 w-4" />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Desktop view ({devices.desktop.width}px)</p>
            </TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </div>
    </TooltipProvider>
  );
};

export default DeviceSwitcher;
