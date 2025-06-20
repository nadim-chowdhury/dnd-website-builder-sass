import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectResponsiveMode,
  selectResponsivePreviewWidth,
  selectEditorViewport,
} from "../redux/selectors/builder-selectors";
import {
  setResponsiveMode,
  setResponsivePreviewWidth,
} from "../redux/slices/builderSlice";
import type { ResponsiveMode } from "../types/editor";

/**
 * Standard device viewport sizes
 */
export const DEVICE_VIEWPORTS = {
  mobile: {
    width: 375,
    height: 667,
    name: "Mobile",
  },
  tablet: {
    width: 768,
    height: 1024,
    name: "Tablet",
  },
  laptop: {
    width: 1280,
    height: 800,
    name: "Laptop",
  },
  desktop: {
    width: 1920,
    height: 1080,
    name: "Desktop",
  },
};

/**
 * Custom hook for responsive preview functionality
 */
export const useResponsivePreview = () => {
  const dispatch = useDispatch();
  // Add state for orientation
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );

  // Get responsive mode and preview width from state
  const responsiveMode = useSelector(selectResponsiveMode);
  const previewWidth = useSelector(selectResponsivePreviewWidth);
  const viewport = useSelector(selectEditorViewport);

  /**
   * Switch to a different responsive mode
   * @param mode - The responsive mode to switch to
   */
  const switchResponsiveMode = useCallback(
    (mode: ResponsiveMode) => {
      dispatch(setResponsiveMode(mode));

      // Update preview width based on selected mode
      if (mode !== "custom") {
        const newWidth = DEVICE_VIEWPORTS[mode]?.width || viewport.width;
        dispatch(setResponsivePreviewWidth(newWidth));
      }
    },
    [dispatch, viewport.width]
  );

  /**
   * Set a custom preview width
   * @param width - The preview width in pixels
   */
  const setCustomPreviewWidth = useCallback(
    (width: number) => {
      // Ensure width is within reasonable bounds
      const boundedWidth = Math.max(320, Math.min(2560, width));

      dispatch(setResponsivePreviewWidth(boundedWidth));

      // If not already in custom mode, switch to it
      if (responsiveMode !== "custom") {
        dispatch(setResponsiveMode("custom"));
      }
    },
    [dispatch, responsiveMode]
  );

  /**
   * Toggle the device orientation
   */
  const toggleOrientation = useCallback(() => {
    setOrientation((prev) => (prev === "portrait" ? "landscape" : "portrait"));
  }, []);

  /**
   * Get the CSS properties for the responsive preview container
   */
  const getPreviewContainerStyles = useCallback(() => {
    return {
      width: `${previewWidth}px`,
      maxWidth: "100%",
      margin: "0 auto",
      transition: "width 0.3s ease-in-out",
    };
  }, [previewWidth]);

  /**
   * Check if current preview is in a specific mode
   * @param mode - The mode to check
   */
  const isMode = useCallback(
    (mode: ResponsiveMode) => {
      return responsiveMode === mode;
    },
    [responsiveMode]
  );

  /**
   * Get media query for current responsive mode
   */
  const getCurrentMediaQuery = useCallback(() => {
    switch (responsiveMode) {
      case "mobile":
        return "@media (max-width: 767px)";
      case "tablet":
        return "@media (min-width: 768px) and (max-width: 1023px)";
      case "laptop":
        return "@media (min-width: 1024px) and (max-width: 1439px)";
      case "desktop":
        return "@media (min-width: 1440px)";
      default:
        return `@media (max-width: ${previewWidth}px)`;
    }
  }, [responsiveMode, previewWidth]);

  // Get the current device height based on the current mode
  const getCurrentDeviceHeight = useCallback(() => {
    if (
      responsiveMode !== "custom" &&
      DEVICE_VIEWPORTS[responsiveMode as keyof typeof DEVICE_VIEWPORTS]
    ) {
      return DEVICE_VIEWPORTS[responsiveMode as keyof typeof DEVICE_VIEWPORTS]
        .height;
    }
    // Default to a reasonable height ratio if in custom mode
    return Math.round(previewWidth * 0.5625); // 16:9 aspect ratio
  }, [responsiveMode, previewWidth]);

  return {
    responsiveMode,
    previewWidth,
    deviceViewports: DEVICE_VIEWPORTS,
    switchResponsiveMode,
    setCustomPreviewWidth,
    getPreviewContainerStyles,
    isMode,
    getCurrentMediaQuery,
    // Add the device property for backwards compatibility with Canvas component
    device: responsiveMode as string, // Cast to string to match expected type in Canvas
    width: previewWidth, // Adding width property to match Canvas expectation
    height: getCurrentDeviceHeight(), // Add height property needed by ResponsiveView
    orientation, // Add orientation property needed by ResponsiveView
    toggleOrientation, // Add method to toggle orientation
  };
};

export default useResponsivePreview;

// src/hooks/use-responsive-preview.ts

// import { useSelector, useDispatch } from "react-redux";
// import {
//   setResponsiveMode,
//   setResponsivePreviewWidth,
// } from "@/redux/slices/builderSlice";
// import { RootState } from "@/redux/store";
// import { useState, useEffect } from "react";

// // ResponsiveMode type (if not defined elsewhere)
// export type ResponsiveMode = "desktop" | "tablet" | "mobile" | "custom";

// export const useResponsivePreview = () => {
//   const dispatch = useDispatch();
//   const mode = useSelector((state: RootState) => state.builder.responsiveMode);
//   const width = useSelector(
//     (state: RootState) => state.builder.responsivePreviewWidth
//   );

//   // Default widths for different devices
//   const deviceWidths = {
//     desktop: 1920,
//     tablet: 768,
//     mobile: 375,
//     custom: width,
//   };

//   // Change the responsive mode
//   const setMode = (newMode: ResponsiveMode) => {
//     dispatch(setResponsiveMode(newMode));

//     // Update the width based on the selected mode
//     if (newMode !== "custom") {
//       dispatch(setResponsivePreviewWidth(deviceWidths[newMode]));
//     }
//   };

//   // Set a custom width
//   const setPreviewWidth = (newWidth: number) => {
//     dispatch(setResponsivePreviewWidth(newWidth));

//     // If the width doesn't match any preset, set mode to custom
//     if (
//       newWidth !== deviceWidths.desktop &&
//       newWidth !== deviceWidths.tablet &&
//       newWidth !== deviceWidths.mobile
//     ) {
//       dispatch(setResponsiveMode("custom"));
//     }
//   };

//   return {
//     device: mode, // For compatibility with the code
//     responsiveMode: mode,
//     width, // Current width
//     previewWidth: width, // For compatibility with the code
//     deviceWidths,
//     setMode,
//     setPreviewWidth,
//   };
// };
