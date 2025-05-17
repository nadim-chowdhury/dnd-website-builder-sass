import React from "react";
import { useEditor } from "@/hooks/use-editor-state";
import { ComponentProps } from "@/types/components";
import { getComputedStyles } from "@/utils/styling";
import { getActiveBreakpoint } from "@/utils/responsive";

export interface FooterProps extends ComponentProps {
  backgroundType?: "color" | "image";
  backgroundColor?: string;
  backgroundImage?: string;
  logoSrc?: string;
  logoAlt?: string;
  companyName?: string;
  companyTagline?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  footerLinks?: Array<{
    section: string;
    links: Array<{
      label: string;
      url: string;
    }>;
  }>;
  copyrightText?: string;
  showBackToTop?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  id,
  styles = {},
  className = "",
  backgroundType = "color",
  backgroundColor = "#f9fafb",
  backgroundImage = "",
  logoSrc = "",
  logoAlt = "Company Logo",
  companyName = "Company Name",
  companyTagline = "Your company tagline here",
  socialLinks = [],
  footerLinks = [],
  copyrightText = `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`,
  showBackToTop = true,
  ...props
}) => {
  const { selectedComponentId, currentDevice } = useEditor();
  const isSelected = selectedComponentId === id;
  const activeBreakpoint = getActiveBreakpoint(currentDevice.width);
  const computedStyles = getComputedStyles(styles, activeBreakpoint);

  const backgroundStyle =
    backgroundType === "image" && backgroundImage
      ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : { backgroundColor };

  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id={id}
      className={`builder-footer ${className} ${isSelected ? "component-selected" : ""}`}
      style={{
        width: "100%",
        padding: "2rem 1rem",
        color: "#4b5563",
        position: "relative",
        ...backgroundStyle,
        ...computedStyles,
      }}
      {...props}
    >
      <div
        className="footer-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* Footer Top Section - Logo and Company Info */}
        <div
          className="footer-top"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          {logoSrc && (
            <img
              src={logoSrc}
              alt={logoAlt}
              style={{
                height: "40px",
                marginBottom: "1rem",
              }}
            />
          )}
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: "0 0 0.5rem 0",
              color: "#111827",
            }}
          >
            {companyName}
          </h3>
          <p
            style={{
              fontSize: "1rem",
              color: "#6b7280",
              margin: "0",
            }}
          >
            {companyTagline}
          </p>
        </div>

        {/* Footer Middle Section - Navigation Links */}
        {footerLinks.length > 0 && (
          <div
            className="footer-nav"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              borderTop: "1px solid #e5e7eb",
              borderBottom: "1px solid #e5e7eb",
              padding: "2rem 0",
            }}
          >
            {footerLinks.map((section, index) => (
              <div key={index} className="footer-nav-section">
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    marginTop: 0,
                    marginBottom: "1rem",
                    color: "#111827",
                  }}
                >
                  {section.section}
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} style={{ marginBottom: "0.5rem" }}>
                      <a
                        href={link.url}
                        style={{
                          color: "#6b7280",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                          ":hover": { color: "#111827" },
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Footer Bottom Section - Social Links and Copyright */}
        <div
          className="footer-bottom"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div
              className="footer-social"
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#f3f4f6",
                    color: "#4b5563",
                    transition: "all 0.2s ease",
                    ":hover": {
                      backgroundColor: "#e5e7eb",
                      color: "#111827",
                    },
                  }}
                >
                  <span className={`icon ${link.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}

          {/* Copyright Text */}
          <div
            className="footer-copyright"
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
            }}
          >
            {copyrightText}
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            style={{
              position: "absolute",
              right: "2rem",
              bottom: "2rem",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#111827",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease",
              ":hover": {
                backgroundColor: "#374151",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
              },
            }}
            aria-label="Back to top"
          >
            <span style={{ fontSize: "1.2rem" }}>↑</span>
          </button>
        )}
      </div>
    </footer>
  );
};

// Define component metadata
Footer.displayName = "Footer";

export default Footer;
