import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Undo as UndoIcon, Redo as RedoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUndoRedo } from "@/hooks/use-undo-redo";
import { cn } from "@/lib/utils";

export interface UndoRedoProps {
  className?: string;
}

export const UndoRedo: React.FC<UndoRedoProps> = ({ className }) => {
  const dispatch = useDispatch();
  const { canUndo, canRedo, undo, redo, undoStack, redoStack } = useUndoRedo();

  const handleUndo = () => {
    if (canUndo) {
      undo();
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      redo();
    }
  };

  // Create tooltips that show how many actions are in each stack
  const getUndoTooltip = () => {
    if (!canUndo) return "Nothing to undo";

    const lastAction = undoStack[undoStack.length - 1]?.name || "action";
    return `Undo ${lastAction} (${undoStack.length})`;
  };

  const getRedoTooltip = () => {
    if (!canRedo) return "Nothing to redo";

    const nextAction = redoStack[redoStack.length - 1]?.name || "action";
    return `Redo ${nextAction} (${redoStack.length})`;
  };

  return (
    <TooltipProvider>
      <div className={cn("flex items-center space-x-1", className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={!canUndo}
              onClick={handleUndo}
            >
              <UndoIcon className="h-4 w-4" />
              <span className="sr-only">Undo</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{getUndoTooltip()}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={!canRedo}
              onClick={handleRedo}
            >
              <RedoIcon className="h-4 w-4" />
              <span className="sr-only">Redo</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{getRedoTooltip()}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default UndoRedo;
