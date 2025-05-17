"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ErrorBoundary } from "@/components/common/error-boundary";
import { Toolbar } from "@/components/editor/toolbar/toolbar";
import { LeftSidebar } from "@/components/editor/sidebar/left/left-sidebar";
import { RightSidebar } from "@/components/editor/sidebar/right/right-sidebar";
import { Canvas } from "@/components/editor/canvas/canvas";
import { PreviewPanel } from "@/components/editor/panels/preview-panel";
import { SettingsPanel } from "@/components/editor/panels/settings-panel";
import { ExportPanel } from "@/components/editor/panels/export-panel";
import { HelpPanel } from "@/components/editor/panels/help-panel";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEditorState } from "@/hooks/use-editor-state";
import { useProjects } from "@/hooks/use-project";
import { setCurrentProject } from "@/redux/slices/projectsSlice";
// import { useProjects } from "@/services/projects";
// import { setProject } from "@/redux/slices/builderSlice";

type ActivePanel = "preview" | "settings" | "export" | "help" | null;

export default function BuilderPage() {
  const router = useRouter();
  const { builderProjectId } = useParams();
  const dispatch = useDispatch();
  const { getProjectById } = useProjects();
  const { initialized, saving, error } = useEditorState();

  const [isLoading, setIsLoading] = useState(true);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] =
    useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (typeof builderProjectId !== "string") {
        setErrorMessage("Invalid project ID");
        setIsLoading(false);
        return;
      }

      try {
        const project = await getProjectById(builderProjectId);
        if (!project) {
          setErrorMessage("Project not found");
          setIsLoading(false);
          return;
        }

        dispatch(setCurrentProject(project));
      } catch (error) {
        console.error("Failed to fetch project:", error);
        setErrorMessage("Failed to load project. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();

    // Add beforeunload event listener to prevent accidental navigation
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (saving) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [builderProjectId, dispatch, getProjectById, saving]);

  // Handle navigation with unsaved changes
  const handleNavigation = (destination: string) => {
    if (saving) {
      setShowUnsavedChangesDialog(true);
      return;
    }
    router.push(destination);
  };

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  if (isLoading) {
    return null; // The loading.tsx component will be shown automatically
  }

  if (errorMessage) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Project
          </h2>
          <p className="mb-6">{errorMessage}</p>
          <Button onClick={() => router.push("/projects")}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-screen w-screen flex flex-col bg-background">
        {/* Top toolbar */}
        <Toolbar
          onPreviewClick={() => togglePanel("preview")}
          onSettingsClick={() => togglePanel("settings")}
          onExportClick={() => togglePanel("export")}
          onHelpClick={() => togglePanel("help")}
          onDashboardClick={() => handleNavigation("/projects")}
        />

        {/* Main builder area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left sidebar with components */}
          <LeftSidebar />

          {/* Main canvas area */}
          <div className="flex-1 overflow-auto bg-muted/20">
            <Canvas />
          </div>

          {/* Right sidebar with properties */}
          <RightSidebar />
        </div>

        {/* Floating panels */}
        {activePanel === "preview" && (
          <PreviewPanel onClose={() => setActivePanel(null)} />
        )}

        {activePanel === "settings" && (
          <SettingsPanel onClose={() => setActivePanel(null)} />
        )}

        {activePanel === "export" && (
          <ExportPanel onClose={() => setActivePanel(null)} />
        )}

        {activePanel === "help" && (
          <HelpPanel onClose={() => setActivePanel(null)} />
        )}

        {/* Unsaved changes dialog */}
        <AlertDialog
          open={showUnsavedChangesDialog}
          onOpenChange={setShowUnsavedChangesDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes that will be lost if you leave. Do you
                want to continue?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => router.push("/projects")}>
                Leave Anyway
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ErrorBoundary>
  );
}
