import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

import { useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

/**
 * Breakpoints for device detection
 */
const BREAKPOINTS = {
  mobile: 767, // Max width for mobile
  tablet: 1024, // Max width for tablet
};

/**
 * Custom hook to detect mobile/tablet/desktop screens
 * and provide device-specific functionality
 */
export const useMobile = () => {
  // Initial device type state
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Function to update device type based on window width
    const updateDeviceType = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width <= BREAKPOINTS.mobile) {
        setDeviceType("mobile");
      } else if (width <= BREAKPOINTS.tablet) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    // Set initial device type
    updateDeviceType();

    // Add event listener for window resize
    window.addEventListener("resize", updateDeviceType);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);

  // Derived state for quick checks
  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";
  const isDesktop = deviceType === "desktop";
  const isTouchDevice = isMobile || isTablet;

  // Helper to get device-specific values
  const getDeviceSpecificValue = <T>(config: {
    mobile?: T;
    tablet?: T;
    desktop?: T;
    default: T;
  }): T => {
    if (isMobile && config.mobile !== undefined) {
      return config.mobile;
    }

    if (isTablet && config.tablet !== undefined) {
      return config.tablet;
    }

    if (isDesktop && config.desktop !== undefined) {
      return config.desktop;
    }

    return config.default;
  };

  return {
    deviceType,
    windowWidth,
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    getDeviceSpecificValue,
  };
};

export default useMobile;
