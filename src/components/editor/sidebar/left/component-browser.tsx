"use client";

import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ComponentCategory from "./component-category";
import { Separator } from "@/components/ui/separator";
import {
  COMPONENT_CATEGORIES,
  COMPONENT_TYPE_TO_CATEGORY,
  COMPONENT_TYPES,
  COMPONENT_ICONS,
  DEFAULT_COMPONENT_PROPS,
} from "@/lib/constants/components";
import { ComponentType } from "@/types/components";

// Define a type for the keys of COMPONENT_TYPES
type ComponentTypeKey = keyof typeof COMPONENT_TYPES;

/**
 * ComponentBrowser is the main container for browsing available components
 * in the left sidebar of the editor.
 *
 * Instead of showing the user's existing components,
 * it should display all available component types that can be dragged into the editor.
 */
const ComponentBrowser = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // This was previously trying to get existing components in the page
  // Instead, we need to display available component TYPES from the constants
  const availableComponentTypes = Object.keys(COMPONENT_TYPES).map((key) => ({
    // Use type assertion to tell TypeScript this is a valid key
    type: COMPONENT_TYPES[key as ComponentTypeKey],
    props:
      DEFAULT_COMPONENT_PROPS[COMPONENT_TYPES[key as ComponentTypeKey]] || {},
    id: `template-${COMPONENT_TYPES[key as ComponentTypeKey]}`,
  }));

  // Transform COMPONENT_CATEGORIES object into an array for rendering
  const categoryList = Object.entries(COMPONENT_CATEGORIES).map(
    ([key, value]) => ({
      id: value,
      name: key.charAt(0) + key.slice(1).toLowerCase(), // Format name (e.g., "LAYOUT" -> "Layout")
      icon: key.toLowerCase(),
    })
  );

  // Initialize expanded categories only once
  useEffect(() => {
    setExpandedCategories(categoryList.map((category) => category.id));
  }, []);

  // Filter components based on search query
  const filteredComponents =
    searchQuery.trim() === ""
      ? availableComponentTypes
      : availableComponentTypes.filter(
          (component) =>
            component.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (component.props?.text || "")
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );

  // Group components by category
  const groupedComponents = categoryList.map((category) => ({
    ...category,
    components: filteredComponents.filter(
      (component) =>
        COMPONENT_TYPE_TO_CATEGORY[
          component.type as keyof typeof COMPONENT_TYPES
        ] === category.id
    ),
  }));

  // Toggle category expansion
  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="p-3">
        <input
          type="text"
          placeholder="Search components..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <div className="p-3">
          {groupedComponents.map((category) => (
            <ComponentCategory
              key={category.id}
              category={category}
              components={category.components}
              isExpanded={expandedCategories.includes(category.id)}
              onToggle={() => toggleCategory(category.id)}
            />
          ))}
          {filteredComponents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No components found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ComponentBrowser;
