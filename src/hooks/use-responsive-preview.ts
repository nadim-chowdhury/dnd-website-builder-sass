import { useCallback } from "react";
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

  return {
    responsiveMode,
    previewWidth,
    deviceViewports: DEVICE_VIEWPORTS,
    switchResponsiveMode,
    setCustomPreviewWidth,
    getPreviewContainerStyles,
    isMode,
    getCurrentMediaQuery,
  };
};

export default useResponsivePreview;
