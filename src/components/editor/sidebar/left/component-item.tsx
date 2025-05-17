import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { addComponent } from "@/redux/slices/builderSlice";
import { ComponentDefinition } from "@/types/components";

interface ComponentItemProps {
  component: ComponentDefinition;
}

/**
 * ComponentItem renders a draggable component item in the component browser
 */
const ComponentItem = ({ component }: ComponentItemProps) => {
  const dispatch = useDispatch();

  // Setup drag source for drag and drop
  const [{ isDragging }, drag] = useDrag({
    type: "COMPONENT",
    item: {
      type: component.type,
      componentId: component.id,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Handle adding component directly (without drag)
  const handleAddComponent = useCallback(() => {
    dispatch(
      addComponent({
        componentType: component.type,
        parentId: "root", // Add to root by default
        componentId: component.id,
      })
    );
  }, [dispatch, component]);

  // Handle add component via context menu
  const handleAddToCanvas = useCallback(() => {
    dispatch(
      addComponent({
        componentType: component.type,
        parentId: "root",
        componentId: component.id,
      })
    );
  }, [dispatch, component]);

  return (
    <TooltipProvider delayDuration={300}>
      <div
        ref={drag}
        className={`
          flex items-center gap-2 p-2 rounded-md cursor-grab
          hover:bg-accent transition-colors
          ${isDragging ? "opacity-50" : ""}
        `}
        data-component-id={component.id}
      >
        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
          {component.icon ? (
            <component.icon className="h-4 w-4 text-muted-foreground" />
          ) : (
            <div className="h-4 w-4 rounded-sm border border-muted-foreground" />
          )}
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="flex-1 truncate text-sm"
              onClick={handleAddComponent}
            >
              {component.name}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-xs">
            <div>
              <p className="font-medium">{component.name}</p>
              {component.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {component.description}
                </p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleAddToCanvas}>
              Add to canvas
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipProvider>
  );
};

export default ComponentItem;
