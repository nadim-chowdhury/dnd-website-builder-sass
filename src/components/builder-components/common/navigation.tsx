"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NavigationProps = {
  id?: string;
  className?: string;
  items: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
  }>;
  logo?: React.ReactNode;
  variant?: "default" | "transparent" | "bordered";
  mobileBreakpoint?: "sm" | "md" | "lg";
  position?: "static" | "sticky";
  alignment?: "start" | "center" | "end" | "between";
  isEditing?: boolean;
};

/**
 * Navigation component for website header
 * Used both in builder and in the final website
 */
export const Navigation = ({
  id,
  className,
  items = [],
  logo,
  variant = "default",
  mobileBreakpoint = "md",
  position = "static",
  alignment = "between",
  isEditing = false,
}: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Style variants
  const variantStyles = {
    default: "bg-background shadow-sm",
    transparent: "bg-transparent",
    bordered: "bg-background border-b",
  };

  // Position styles
  const positionStyles = {
    static: "",
    sticky: "sticky top-0 z-40",
  };

  // Alignment styles
  const alignmentStyles = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  };

  // Mobile breakpoint styles
  const breakpointStyles = {
    sm: "sm:flex",
    md: "md:flex",
    lg: "lg:flex",
  };

  const toggleMobileMenu = () => {
    if (!isEditing) {
      setMobileMenuOpen(!mobileMenuOpen);
    }
  };

  return (
    <nav
      id={id}
      className={cn(
        "w-full px-4 py-3",
        variantStyles[variant],
        positionStyles[position],
        className
      )}
    >
      <div className={cn("flex items-center", alignmentStyles[alignment])}>
        {/* Logo */}
        {logo && <div className="flex-shrink-0">{logo}</div>}

        {/* Desktop Navigation */}
        <div
          className={cn(
            "hidden items-center gap-6",
            breakpointStyles[mobileBreakpoint]
          )}
        >
          {items.map((item, index) => (
            <Link
              key={`nav-item-${index}`}
              href={isEditing ? "#" : item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
              onClick={(e) => isEditing && e.preventDefault()}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div
          className={cn(
            `${breakpointStyles[mobileBreakpoint].split(":")[0]}:block`,
            breakpointStyles[mobileBreakpoint].split(":")[1] + ":hidden"
          )}
        >
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div
          className={cn(
            "mt-2 space-y-1 px-2 pb-3 pt-2",
            breakpointStyles[mobileBreakpoint].split(":")[1] + ":hidden"
          )}
        >
          {items.map((item, index) => (
            <Link
              key={`mobile-nav-${index}`}
              href={isEditing ? "#" : item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "block rounded-md px-3 py-2 text-base font-medium hover:bg-muted",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )}
              onClick={(e) => {
                isEditing && e.preventDefault();
                !isEditing && setMobileMenuOpen(false);
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
