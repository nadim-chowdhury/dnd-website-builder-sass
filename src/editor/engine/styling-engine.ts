import {
  ComponentInstance,
  StyleDefinition,
  StyleRule,
  StyleOutput,
} from "@/types/editor";
import { generateUniqueId } from "@/utils/component";

/**
 * StylingEngine handles all style operations for components in the builder.
 * It handles style generation, conversion between formats, and application to components.
 */
class StylingEngine {
  private styleCache: Map<string, StyleOutput> = new Map();
  private styleSheet: CSSStyleSheet | null = null;
  private styleRules: Map<string, StyleRule> = new Map();
  private breakpoints = {
    xs: "0px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  };

  /**
   * Initialize the styling engine
   */
  initialize(): void {
    // Create stylesheet if in browser environment
    if (typeof document !== "undefined") {
      const styleElement = document.createElement("style");
      styleElement.id = "builder-generated-styles";
      document.head.appendChild(styleElement);

      // Access the stylesheet
      if (styleElement.sheet) {
        this.styleSheet = styleElement.sheet as CSSStyleSheet;
      }
    }
  }

  /**
   * Generate styles for a component
   * @param component The component to generate styles for
   * @returns Object containing className and inline styles
   */
  generateStyles(component: ComponentInstance): StyleOutput {
    // Check cache first
    const cacheKey = this.getCacheKey(component);
    if (this.styleCache.has(cacheKey)) {
      return this.styleCache.get(cacheKey)!;
    }

    // Extract style definitions
    const { styles = {} } = component;

    // Generate unique class name for component
    const className = this.getComponentClassName(component.id);

    // Process style definitions
    const processedStyles = this.processStyleDefinitions(styles, className);

    // Add styles to stylesheet
    this.addStylesToStylesheet(processedStyles);

    // Get inline styles (for styles that can't be added via classes)
    const inlineStyles = this.extractInlineStyles(styles);

    // Create result
    const result: StyleOutput = {
      className,
      inlineStyles,
      cssRules: processedStyles,
    };

    // Cache the result
    this.styleCache.set(cacheKey, result);

    return result;
  }

  /**
   * Get a cache key for a component's styles
   * @param component The component
   * @returns Cache key string
   */
  private getCacheKey(component: ComponentInstance): string {
    // Use component ID and a hash of the styles
    const stylesHash = JSON.stringify(component.styles || {});
    return `${component.id}-${stylesHash}`;
  }

  /**
   * Get class name for a component
   * @param componentId Component ID
   * @returns CSS class name
   */
  private getComponentClassName(componentId: string): string {
    return `builder-component-${componentId}`;
  }

  /**
   * Process style definitions into CSS rules
   * @param styles Style definitions
   * @param className Base class name
   * @returns Array of CSS rules
   */
  private processStyleDefinitions(
    styles: Record<string, StyleDefinition>,
    className: string
  ): StyleRule[] {
    const rules: StyleRule[] = [];

    // Base styles (apply to all breakpoints)
    if (styles.base) {
      const selector = `.${className}`;
      const cssText = this.styleObjectToCss(styles.base);
      rules.push({ selector, cssText, breakpoint: null });
    }

    // Process responsive styles
    Object.entries(this.breakpoints).forEach(([breakpoint, minWidth]) => {
      if (styles[breakpoint]) {
        const selector = `.${className}`;
        const cssText = this.styleObjectToCss(
          styles[breakpoint] as StyleDefinition
        );
        rules.push({
          selector,
          cssText,
          breakpoint,
          mediaQuery: `@media (min-width: ${minWidth})`,
        });
      }
    });

    // Process state-based styles (hover, active, focus)
    const states = ["hover", "active", "focus"] as const;
    states.forEach((state) => {
      if (styles[state]) {
        const selector = `.${className}:${state}`;
        const cssText = this.styleObjectToCss(styles[state] as StyleDefinition);
        rules.push({ selector, cssText, state });
      }
    });

    return rules;
  }

  /**
   * Convert a style object to CSS text
   * @param style Style object
   * @returns CSS text string
   */
  private styleObjectToCss(style: StyleDefinition): string {
    return Object.entries(style)
      .map(([property, value]) => {
        // Convert camelCase to kebab-case
        const cssProperty = property.replace(/([A-Z])/g, "-$1").toLowerCase();
        return `${cssProperty}: ${value};`;
      })
      .join(" ");
  }

  /**
   * Add rules to stylesheet
   * @param rules CSS rules to add
   */
  private addStylesToStylesheet(rules: StyleRule[]): void {
    if (!this.styleSheet) {
      this.initialize();
      if (!this.styleSheet) return; // Still not available (SSR)
    }

    rules.forEach((rule) => {
      const ruleId = generateUniqueId();

      try {
        let cssRule: string;

        // Media query rule
        if (rule.mediaQuery) {
          cssRule = `${rule.mediaQuery} { ${rule.selector} { ${rule.cssText} } }`;
        } else {
          cssRule = `${rule.selector} { ${rule.cssText} }`;
        }

        const index = this.styleSheet!.insertRule(
          cssRule,
          this.styleSheet!.cssRules.length
        );

        // Store rule for potential updates
        this.styleRules.set(ruleId, {
          ...rule,
          id: ruleId,
          index,
        });
      } catch (error) {
        console.error("Error adding CSS rule:", error, rule);
      }
    });
  }

  /**
   * Extract styles that should be applied inline
   * @param styles Style definitions
   * @returns Object with inline styles
   */
  private extractInlineStyles(
    styles: Record<string, StyleDefinition>
  ): React.CSSProperties {
    // Some styles might need to be applied inline (e.g. custom properties)
    const inlineStyles: React.CSSProperties = {};

    // Extract from base styles
    if (styles.base) {
      Object.entries(styles.base).forEach(([key, value]) => {
        if (key.startsWith("--")) {
          // Custom properties must be applied inline
          inlineStyles[key as any] = value;
        }
      });
    }

    return inlineStyles;
  }

  /**
   * Update styles for a component
   * @param componentId Component ID
   * @param newStyles New style definitions
   * @returns Updated style output
   */
  updateStyles(
    componentId: string,
    newStyles: Record<string, StyleDefinition>
  ): StyleOutput {
    // Clear cache for this component
    this.clearStyleCache(componentId);

    // Create dummy component to generate styles
    const dummyComponent: ComponentInstance = {
      id: componentId,
      type: "unknown", // Type doesn't matter for style generation
      props: {},
      styles: newStyles,
    };

    // Re-generate styles
    return this.generateStyles(dummyComponent);
  }

  /**
   * Clear style cache for a component
   * @param componentId Component ID
   */
  clearStyleCache(componentId: string): void {
    // Remove all cache entries for this component
    const keysToRemove: string[] = [];

    this.styleCache.forEach((_, key) => {
      if (key.startsWith(`${componentId}-`)) {
        keysToRemove.push(key);
      }
    });

    keysToRemove.forEach((key) => {
      this.styleCache.delete(key);
    });
  }

  /**
   * Clear all styles and reset engine
   */
  reset(): void {
    this.styleCache.clear();
    this.styleRules.clear();

    // Remove stylesheet and recreate
    if (typeof document !== "undefined") {
      const styleElement = document.getElementById("builder-generated-styles");
      if (styleElement) {
        styleElement.remove();
      }
    }

    this.styleSheet = null;
    this.initialize();
  }

  /**
   * Get computed CSS for the entire project
   * @returns Complete CSS as string
   */
  getComputedCss(): string {
    let css = "";

    // Group rules by media query to minimize CSS size
    const mediaQueryGroups: Record<string, string[]> = {};
    const standardRules: string[] = [];

    this.styleRules.forEach((rule) => {
      const ruleCss = `${rule.selector} { ${rule.cssText} }`;

      if (rule.mediaQuery) {
        mediaQueryGroups[rule.mediaQuery] =
          mediaQueryGroups[rule.mediaQuery] || [];
        mediaQueryGroups[rule.mediaQuery].push(ruleCss);
      } else {
        standardRules.push(ruleCss);
      }
    });

    // Add standard rules
    css += standardRules.join("\n") + "\n";

    // Add media query groups
    Object.entries(mediaQueryGroups).forEach(([mediaQuery, rules]) => {
      css += `${mediaQuery} {\n  ${rules.join("\n  ")}\n}\n`;
    });

    return css;
  }
}

// Create singleton instance
const stylingEngine = new StylingEngine();

// Initialize in client-side environments
if (typeof window !== "undefined") {
  stylingEngine.initialize();
}

export default stylingEngine;
