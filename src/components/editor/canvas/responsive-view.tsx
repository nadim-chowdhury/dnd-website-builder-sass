import React from "react";
import { cn } from "@/lib/utils";
import { useResponsivePreview } from "@/hooks/use-responsive-preview";

interface ResponsiveViewProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ResponsiveView component
 * Wraps the canvas content with responsive preview functionality
 * Adjusts width and scaling based on the selected device
 */
const ResponsiveView: React.FC<ResponsiveViewProps> = ({
  children,
  className = "",
}) => {
  const {
    device,
    width: deviceWidth,
    height: deviceHeight,
    orientation,
  } = useResponsivePreview();

  // Calculate width and height based on device and orientation
  const calculateDimensions = () => {
    const isLandscape = orientation === "landscape";

    let width = deviceWidth;
    let height = deviceHeight;

    // Swap dimensions for landscape mode if needed
    if (isLandscape && device !== "desktop") {
      width = deviceHeight;
      height = deviceWidth;
    }

    return { width, height };
  };

  const { width, height } = calculateDimensions();

  // Apply device-specific styles
  const getDeviceStyles = () => {
    // Base styles
    const styles: React.CSSProperties = {
      width: width ? `${width}px` : "100%",
      minHeight: height ? `${height}px` : "100vh",
      margin: "0 auto",
      transition: "width 0.3s ease, height 0.3s ease",
    };

    // Add device specific styles
    if (device === "mobile" || device === "tablet") {
      styles.boxShadow =
        "0 0 0 1px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.1)";
      styles.borderRadius = "8px";
      styles.overflow = "hidden";
    }

    return styles;
  };

  // Device frame bezels
  const getDeviceFrame = () => {
    if (device === "desktop" || !deviceWidth) return null;

    return (
      <div className="absolute pointer-events-none">
        {device === "mobile" && (
          <>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-800 rounded-full" />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 border-2 border-gray-800 rounded-full" />
          </>
        )}
        {device === "tablet" && (
          <>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-800 rounded-full" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6 border-2 border-gray-800 rounded-full" />
          </>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "relative bg-white",
        device !== "desktop" && "rounded-lg",
        className
      )}
      style={getDeviceStyles()}
    >
      {getDeviceFrame()}
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default ResponsiveView;
