import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface ZoomControlsProps {
  className?: string;
  zoomRange?: [number, number];
  defaultZoom?: number;
  onChange?: (zoom: number) => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  className,
  zoomRange = [25, 200],
  defaultZoom = 100,
  onChange,
}) => {
  const dispatch = useDispatch();

  // Get the zoom level from Redux, or use state if not available
  const storeZoom = useSelector((state: any) => state.builder?.zoom);
  const [localZoom, setLocalZoom] = useState(defaultZoom);

  // Use store value if available, otherwise use local state
  const zoom = storeZoom || localZoom;

  // Preset zoom levels for quick access
  const zoomPresets = [50, 75, 100, 125, 150];

  // Step size for zoom controls
  const zoomStep = 10;

  const handleZoomChange = (newZoom: number) => {
    // Clamp the zoom value to the allowed range
    const clampedZoom = Math.max(zoomRange[0], Math.min(zoomRange[1], newZoom));

    // Update local state
    setLocalZoom(clampedZoom);

    // Call the onChange handler if provided
    if (onChange) {
      onChange(clampedZoom);
    }

    // Update Redux store if needed
    // dispatch({ type: 'SET_ZOOM', payload: clampedZoom });
  };

  const handleZoomIn = () => {
    handleZoomChange(zoom + zoomStep);
  };

  const handleZoomOut = () => {
    handleZoomChange(zoom - zoomStep);
  };

  const handleResetZoom = () => {
    handleZoomChange(100);
  };

  return (
    <TooltipProvider>
      <div className={cn("flex items-center space-x-2", className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleZoomOut}
              disabled={zoom <= zoomRange[0]}
            >
              <ZoomOut className="h-4 w-4" />
              <span className="sr-only">Zoom Out</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Zoom Out</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex items-center space-x-2">
          <Slider
            value={[zoom]}
            min={zoomRange[0]}
            max={zoomRange[1]}
            step={5}
            className="w-24"
            onValueChange={(values) => handleZoomChange(values[0])}
          />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-2 text-xs font-medium"
                onClick={handleResetZoom}
              >
                {zoom}%
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Reset to 100%</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleZoomIn}
              disabled={zoom >= zoomRange[1]}
            >
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoom In</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Zoom In</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleResetZoom}
            >
              <Maximize2 className="h-4 w-4" />
              <span className="sr-only">Fit to Screen</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Fit to Screen</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default ZoomControls;
