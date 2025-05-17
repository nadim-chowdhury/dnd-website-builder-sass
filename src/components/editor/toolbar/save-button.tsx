import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Save, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useEditorState } from "@/hooks/use-editor-state";

export interface SaveButtonProps {
  projectId: string;
  className?: string;
  onSave?: () => Promise<void>;
  autoSaveEnabled?: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  projectId,
  className,
  onSave,
  autoSaveEnabled = true,
}) => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);
  const { isDirty } = useEditorState();

  // In a real implementation, you would fetch these from Redux
  const lastSavedAt = useSelector(
    (state: any) => state.projects?.lastSavedAt || null
  );

  const handleSave = async () => {
    if (isSaving || !isDirty) return;

    setIsSaving(true);

    try {
      // If an external save handler is provided, use it
      if (onSave) {
        await onSave();
      } else {
        // Otherwise use Redux
        // await dispatch(saveProject(projectId));

        // Simulate API delay for this example
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Show saved indicator
      setShowSavedIndicator(true);
      setTimeout(() => setShowSavedIndicator(false), 2000);
    } catch (error) {
      console.error("Failed to save project:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Format the last saved time
  const getLastSavedText = () => {
    if (!lastSavedAt) return "Not saved yet";

    const date = new Date(lastSavedAt);
    return `Last saved ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={
              showSavedIndicator ? "outline" : isDirty ? "default" : "outline"
            }
            size="sm"
            onClick={handleSave}
            disabled={isSaving || (!isDirty && !showSavedIndicator)}
            className={cn("gap-1.5", className)}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline-block">Saving...</span>
              </>
            ) : showSavedIndicator ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span className="hidden sm:inline-block">Saved</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline-block">Save</span>
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>
            {isSaving
              ? "Saving..."
              : showSavedIndicator
                ? "Saved successfully!"
                : isDirty
                  ? "Save changes"
                  : getLastSavedText()}
          </p>
          {autoSaveEnabled && (
            <p className="text-xs text-muted-foreground">
              Auto-save is enabled
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SaveButton;
