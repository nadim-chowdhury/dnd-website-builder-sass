import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  Settings,
  PanelLeftOpen,
  PanelRightOpen,
  Eye,
  Code,
  Share2,
  Loader2,
  MoreHorizontal,
  FileText,
  Pencil,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { DeviceSwitcher } from "./device-switcher";
import { PublishButton } from "./publish-button";
import { SaveButton } from "./save-button";
import { UndoRedo } from "./undo-redo";
import { ZoomControls } from "./zoom-controls";

interface ToolbarProps {
  projectId: string;
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
  onPreview: () => void;
  className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  projectId,
  leftSidebarOpen,
  rightSidebarOpen,
  onToggleLeftSidebar,
  onToggleRightSidebar,
  onPreview,
  className,
}) => {
  const router = useRouter();
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // These would typically come from your Redux store
  const projectName = useSelector(
    (state: any) => state.projects?.currentProject?.name || "Untitled Project"
  );
  const isLoading = useSelector(
    (state: any) => state.projects?.isLoading || false
  );

  const handleBackToDashboard = () => {
    router.push("/dashboard/projects");
  };

  const handleToggleCodeEditor = () => {
    setShowCodeEditor(!showCodeEditor);
  };

  const handleShareProject = async () => {
    setIsSharing(true);
    try {
      // Logic to share project, e.g. generate shareable link
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Copy to clipboard example
      const shareUrl = `https://yourbuilder.com/preview/${projectId}`;
      await navigator.clipboard.writeText(shareUrl);

      // Show success notification (would be handled by your notification system)
      console.log("Link copied to clipboard:", shareUrl);
    } catch (error) {
      console.error("Failed to share project:", error);
    } finally {
      setIsSharing(false);
    }
  };

  // Determine which sections to display based on screen size
  // These would be responsive via media queries/responsive hooks
  const showDeviceSwitcher = true;
  const showProjectName = true;
  const showUndoRedo = true;
  const showZoomControls = true;

  return (
    <div
      className={cn(
        "flex h-14 items-center justify-between border-b bg-background px-3",
        className
      )}
    >
      {/* Left section */}
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToDashboard}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back to Dashboard</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Back to Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {showProjectName && (
          <div className="flex items-center">
            <Popover
              open={isProjectSettingsOpen}
              onOpenChange={setIsProjectSettingsOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-sm font-medium max-w-[180px] truncate"
                >
                  {isLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    <FileText className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  )}
                  <span className="truncate">{projectName}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-0" align="start">
                <div className="px-4 py-3 border-b">
                  <h3 className="text-sm font-medium">Project Settings</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Manage your project details
                  </p>
                </div>
                <div className="p-3 space-y-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="project-name"
                      className="text-xs font-medium"
                    >
                      Project Name
                    </label>
                    <input
                      id="project-name"
                      className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                      defaultValue={projectName}
                    />
                  </div>
                  <div className="pt-2 flex">
                    <Button size="sm" className="w-full">
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      Update
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}

        <Separator orientation="vertical" className="h-6" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleLeftSidebar}
                className={cn(
                  "h-8 w-8",
                  !leftSidebarOpen && "text-muted-foreground"
                )}
              >
                <PanelLeftOpen className="h-4 w-4" />
                <span className="sr-only">Toggle Components Panel</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{leftSidebarOpen ? "Hide" : "Show"} Components Panel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Center section */}
      <div className="flex items-center space-x-2">
        {showUndoRedo && <UndoRedo />}

        <Separator orientation="vertical" className="h-6 mx-1" />

        {showDeviceSwitcher && <DeviceSwitcher />}

        {showZoomControls && (
          <>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <ZoomControls />
          </>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleCodeEditor}
                className={cn(
                  "h-8 w-8",
                  showCodeEditor && "text-primary bg-primary/10"
                )}
              >
                <Code className="h-4 w-4" />
                <span className="sr-only">Code Editor</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{showCodeEditor ? "Hide" : "Show"} Code Editor</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onPreview}
                className="h-8 w-8"
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Preview</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Preview Website</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShareProject}
                disabled={isSharing}
                className="h-8 w-8"
              >
                {isSharing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Share2 className="h-4 w-4" />
                )}
                <span className="sr-only">Share</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Share Project</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <SaveButton projectId={projectId} />
        <PublishButton projectId={projectId} />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleRightSidebar}
                className={cn(
                  "h-8 w-8",
                  !rightSidebarOpen && "text-muted-foreground"
                )}
              >
                <PanelRightOpen className="h-4 w-4" />
                <span className="sr-only">Toggle Settings Panel</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{rightSidebarOpen ? "Hide" : "Show"} Settings Panel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More Options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/dashboard/settings`)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/dashboard/projects/${projectId}`)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Project Details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash className="h-4 w-4 mr-2" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Toolbar;
