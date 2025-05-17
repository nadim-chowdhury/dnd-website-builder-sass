import React from "react";
import { useEditor } from "@/hooks/use-editor-state";
import { ComponentProps } from "@/types/components";
import { getComputedStyles } from "@/utils/styling";
import { getActiveBreakpoint } from "@/utils/responsive";

export interface HeaderProps extends ComponentProps {
  layoutType?: "simple" | "centered" | "split" | "stacked";
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  navItems?: Array<{
    label: string;
    url: string;
    isActive?: boolean;
    children?: Array<{
      label: string;
      url: string;
    }>;
  }>;
  showActionButton?: boolean;
  actionButtonText?: string;
  actionButtonUrl?: string;
  actionButtonVariant?: "primary" | "secondary" | "outline";
  sticky?: boolean;
  transparent?: boolean;
  backgroundColor?: string;
  borderBottom?: boolean;
  useMobileMenu?: boolean;
  mobileBreakpoint?: number;
}

const Header: React.FC<HeaderProps> = ({
  id,
  styles = {},
  className = "",
  layoutType = "simple",
  logoSrc = "",
  logoAlt = "Logo",
  logoWidth = 120,
  logoHeight = 40,
  navItems = [],
  showActionButton = true,
  actionButtonText = "Get Started",
  actionButtonUrl = "#",
  actionButtonVariant = "primary",
  sticky = false,
  transparent = false,
  backgroundColor = "#ffffff",
  borderBottom = true,
  useMobileMenu = true,
  mobileBreakpoint = 768,
  ...props
}) => {
  const { selectedComponentId, currentDevice } = useEditor();
  const isSelected = selectedComponentId === id;
  const activeBreakpoint = getActiveBreakpoint(currentDevice.width);
  const computedStyles = getComputedStyles(styles, activeBreakpoint);

  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Check if we should render mobile layout
  const isMobile = currentDevice.width <= mobileBreakpoint;

  // Action button styles based on variant
  const actionButtonStyles = {
    primary: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      border: "none",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      ":hover": {
        backgroundColor: "#2563eb",
      },
    },
    secondary: {
      backgroundColor: "#f3f4f6",
      color: "#374151",
      border: "none",
      ":hover": {
        backgroundColor: "#e5e7eb",
      },
    },
    outline: {
      backgroundColor: "transparent",
      color: "#3b82f6",
      border: "1px solid #3b82f6",
      ":hover": {
        backgroundColor: "#3b82f61a",
      },
    },
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Default header styling
  const headerStyles = {
    position: sticky ? "sticky" : "relative",
    top: sticky ? 0 : "auto",
    zIndex: sticky ? 50 : "auto",
    backgroundColor: transparent ? "transparent" : backgroundColor,
    borderBottom: borderBottom ? "1px solid #e5e7eb" : "none",
    width: "100%",
    transition: "background-color 0.3s, box-shadow 0.3s",
    ...computedStyles,
  };

  return (
    <header
      id={id}
      className={`builder-header ${layoutType} ${className} ${isSelected ? "component-selected" : ""}`}
      style={headerStyles}
      {...props}
    >
      <div
        className="header-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1rem",
          display: "flex",
          flexDirection: layoutType === "stacked" ? "column" : "row",
          alignItems: layoutType === "centered" ? "center" : "stretch",
          justifyContent:
            layoutType === "split" ? "space-between" : "flex-start",
          gap: layoutType === "stacked" ? "1rem" : "0",
        }}
      >
        {/* Logo Section */}
        <div
          className="header-logo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: layoutType === "centered" ? "center" : "flex-start",
            width: layoutType === "centered" ? "100%" : "auto",
            margin: layoutType === "centered" ? "0 0 1rem" : "0",
          }}
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoAlt}
              style={{
                width: `${logoWidth}px`,
                height: `${logoHeight}px`,
                objectFit: "contain",
              }}
            />
          ) : (
            <div
              style={{
                width: `${logoWidth}px`,
                height: `${logoHeight}px`,
                backgroundColor: "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280",
                fontWeight: "bold",
                fontSize: "0.875rem",
              }}
            >
              Logo
            </div>
          )}
        </div>

        {/* Navigation Section - Desktop */}
        {!isMobile || !useMobileMenu ? (
          <nav
            className="header-nav"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: layoutType === "split" ? "flex-end" : "center",
              flex: layoutType === "simple" ? "1" : "auto",
              marginLeft: layoutType === "simple" ? "auto" : "0",
            }}
          >
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                margin: 0,
                padding: 0,
                gap: "1.5rem",
              }}
            >
              {navItems.map((item, index) => (
                <li key={index} style={{ position: "relative" }}>
                  <a
                    href={item.url}
                    className={item.isActive ? "active" : ""}
                    style={{
                      textDecoration: "none",
                      color: item.isActive ? "#3b82f6" : "#374151",
                      fontWeight: item.isActive ? "600" : "500",
                      fontSize: "0.875rem",
                      padding: "0.5rem 0",
                      transition: "color 0.2s ease",
                      display: "block",
                      position: "relative",
                      ":hover": {
                        color: "#3b82f6",
                      },
                      ":after": item.isActive
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "2px",
                            backgroundColor: "#3b82f6",
                          }
                        : {},
                    }}
                  >
                    {item.label}
                  </a>

                  {/* Dropdown Menu */}
                  {item.children && item.children.length > 0 && (
                    <div
                      className="dropdown-menu"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.375rem",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        padding: "0.5rem 0",
                        minWidth: "200px",
                        zIndex: 20,
                        display: "none", // Show on hover via CSS
                      }}
                    >
                      <ul
                        style={{
                          listStyle: "none",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <a
                              href={child.url}
                              style={{
                                display: "block",
                                padding: "0.5rem 1rem",
                                color: "#374151",
                                textDecoration: "none",
                                fontSize: "0.875rem",
                                transition: "background-color 0.2s",
                                ":hover": {
                                  backgroundColor: "#f3f4f6",
                                  color: "#111827",
                                },
                              }}
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Action Button */}
            {showActionButton && (
              <div
                className="header-action"
                style={{
                  marginLeft: "1.5rem",
                }}
              >
                <a
                  href={actionButtonUrl}
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    ...actionButtonStyles[actionButtonVariant],
                  }}
                >
                  {actionButtonText}
                </a>
              </div>
            )}
          </nav>
        ) : (
          <>
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-toggle"
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "24px",
                height: "20px",
              }}
              aria-label="Toggle menu"
            >
              <span
                style={{
                  display: "block",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#374151",
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: mobileMenuOpen
                    ? "rotate(45deg) translate(5px, 5px)"
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#374151",
                  opacity: mobileMenuOpen ? 0 : 1,
                  transition: "opacity 0.3s",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#374151",
                  transition: "transform 0.3s",
                  transform: mobileMenuOpen
                    ? "rotate(-45deg) translate(5px, -5px)"
                    : "none",
                }}
              />
            </button>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div
                className="mobile-menu"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "#ffffff",
                  borderTop: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  padding: "1rem",
                  zIndex: 100,
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {navItems.map((item, index) => (
                    <li key={index} style={{ marginBottom: "0.75rem" }}>
                      <a
                        href={item.url}
                        className={item.isActive ? "active" : ""}
                        style={{
                          display: "block",
                          padding: "0.5rem 0",
                          color: item.isActive ? "#3b82f6" : "#374151",
                          textDecoration: "none",
                          fontWeight: item.isActive ? "600" : "500",
                          fontSize: "1rem",
                          transition: "color 0.2s",
                        }}
                      >
                        {item.label}
                      </a>

                      {/* Mobile Dropdown Items */}
                      {item.children && item.children.length > 0 && (
                        <ul
                          style={{
                            listStyle: "none",
                            margin: "0.5rem 0 0 1rem",
                            padding: 0,
                          }}
                        >
                          {item.children.map((child, childIndex) => (
                            <li
                              key={childIndex}
                              style={{ marginBottom: "0.5rem" }}
                            >
                              <a
                                href={child.url}
                                style={{
                                  display: "block",
                                  padding: "0.25rem 0",
                                  color: "#6b7280",
                                  textDecoration: "none",
                                  fontSize: "0.875rem",
                                }}
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Mobile Action Button */}
                {showActionButton && (
                  <div
                    className="mobile-action"
                    style={{
                      marginTop: "1rem",
                    }}
                  >
                    <a
                      href={actionButtonUrl}
                      style={{
                        display: "block",
                        padding: "0.75rem 1rem",
                        borderRadius: "0.375rem",
                        fontWeight: "600",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        textAlign: "center",
                        transition: "all 0.2s ease",
                        ...actionButtonStyles[actionButtonVariant],
                      }}
                    >
                      {actionButtonText}
                    </a>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

Header.displayName = "Header";

export default Header;
