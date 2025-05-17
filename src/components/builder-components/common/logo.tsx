import React from "react";
import { useEditor } from "@/hooks/use-editor-state";
import { ComponentProps } from "@/types/components";
import { getComputedStyles } from "@/utils/styling";
import { getActiveBreakpoint } from "@/utils/responsive";
import Image from "next/image";

export interface LogoProps extends ComponentProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  variant?: "default" | "light" | "dark";
  showText?: boolean;
  logoText?: string;
  textPosition?: "left" | "right" | "bottom";
  textColor?: string;
  textSize?: number | string;
  linkUrl?: string;
  usePlaceholder?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  id,
  styles = {},
  className = "",
  src = "",
  alt = "Logo",
  width = 120,
  height = "auto",
  variant = "default",
  showText = false,
  logoText = "Company Name",
  textPosition = "right",
  textColor = "",
  textSize = "1.2rem",
  linkUrl = "",
  usePlaceholder = false,
  ...props
}) => {
  const { selectedComponentId, currentDevice } = useEditor();
  const isSelected = selectedComponentId === id;
  const activeBreakpoint = getActiveBreakpoint(currentDevice.width);
  const computedStyles = getComputedStyles(styles, activeBreakpoint);

  // Determine logo appearance based on variant
  const getColorsByVariant = () => {
    switch (variant) {
      case "light":
        return {
          textColor: textColor || "#ffffff",
          placeholderBg: "#ffffff33",
          placeholderText: "#ffffffcc",
        };
      case "dark":
        return {
          textColor: textColor || "#111827",
          placeholderBg: "#11182733",
          placeholderText: "#111827cc",
        };
      default:
        return {
          textColor: textColor || "#111827",
          placeholderBg: "#f3f4f6",
          placeholderText: "#6b7280",
        };
    }
  };

  const colors = getColorsByVariant();

  // Determine container style based on text position
  const containerStyle = {
    display: "inline-flex",
    alignItems: textPosition === "bottom" ? "center" : "center",
    flexDirection: textPosition === "bottom" ? "column" : "row",
    gap: textPosition === "bottom" ? "0.5rem" : "0.75rem",
    ...computedStyles,
  };

  // Create logo element
  const logoElement =
    src && !usePlaceholder ? (
      <Image
        src={src}
        alt={alt}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          objectFit: "contain",
        }}
      />
    ) : (
      <div
        className="logo-placeholder"
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : "40px",
          backgroundColor: colors.placeholderBg,
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors.placeholderText,
          fontSize: "0.75rem",
          fontWeight: "bold",
        }}
      >
        LOGO
      </div>
    );

  // Create text element if needed
  const textElement = showText && (
    <span
      className="logo-text"
      style={{
        color: colors.textColor,
        fontSize: typeof textSize === "number" ? `${textSize}px` : textSize,
        fontWeight: 600,
        letterSpacing: "-0.025em",
        margin: 0,
      }}
    >
      {logoText}
    </span>
  );

  // Order text and logo based on position setting
  const orderedElements =
    textPosition === "left"
      ? [textElement, logoElement]
      : [logoElement, textElement];

  // Wrap content based on whether a link is needed
  const content = (
    <div
      className={`logo-container ${textPosition} ${className} ${isSelected ? "component-selected" : ""}`}
      style={containerStyle}
    >
      {orderedElements}
    </div>
  );

  return (
    <div id={id} className="builder-logo" {...props}>
      {linkUrl ? (
        <a
          href={linkUrl}
          style={{
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
};

Logo.displayName = "Logo";

export default Logo;
