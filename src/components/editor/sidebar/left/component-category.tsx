import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ComponentItem from "./component-item";
import { CategoryWithComponents } from "@/types/components";

interface ComponentCategoryProps {
  category: CategoryWithComponents;
  components: any[];
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * ComponentCategory renders a collapsible category of components
 * with its associated component items
 */
const ComponentCategory = ({
  category,
  components,
  isExpanded,
  onToggle,
}: ComponentCategoryProps) => {
  // Skip rendering empty categories when searching
  if (components.length === 0) {
    return null;
  }

  return (
    <div className="mb-3">
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-2 rounded-md hover:bg-muted transition-colors">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="font-medium">{category.name}</span>
          <span className="text-xs text-muted-foreground ml-auto">
            {components.length}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="pl-4 mt-1 space-y-1">
            {components.map((component) => (
              <ComponentItem key={component.id} component={component} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ComponentCategory;
