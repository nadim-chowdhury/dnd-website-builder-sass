import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import ComponentCategory from "./component-category";
import ComponentSearch from "./component-search";
import { Separator } from "@/components/ui/separator";
import { componentCategories } from "@/lib/constants/components";
import { selectBuilderComponents } from "@/redux/selectors/builder-selectors";

/**
 * ComponentBrowser is the main container for browsing available components
 * in the left sidebar of the editor.
 */
const ComponentBrowser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const components = useSelector(selectBuilderComponents);

  // Initially expand all categories
  useEffect(() => {
    setExpandedCategories(componentCategories.map((category) => category.id));
  }, []);

  // Filter components based on search query
  const filteredComponents =
    searchQuery.trim() === ""
      ? components
      : components.filter(
          (component) =>
            component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            component.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        );

  // Group components by category
  const groupedComponents = componentCategories.map((category) => ({
    ...category,
    components: filteredComponents.filter(
      (component) => component.category === category.id
    ),
  }));

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3">
        <h2 className="text-lg font-semibold mb-2">Components</h2>
        <ComponentSearch value={searchQuery} onChange={setSearchQuery} />
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
              No components found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ComponentBrowser;
