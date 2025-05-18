"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import ErrorBoundary from "@/components/common/error-boundary";
import Toolbar from "@/components/editor/toolbar/toolbar";
import { LeftSidebar } from "@/components/editor/sidebar/left/left-sidebar";
import RightSidebar from "@/components/editor/sidebar/right/right-sidebar";
import Canvas from "@/components/editor/canvas/canvas";
import PreviewPanel from "@/components/editor/panels/preview-panel";
import SettingsPanel from "@/components/editor/panels/settings-panel";
import ExportPanel from "@/components/editor/panels/export-panel";
import HelpPanel from "@/components/editor/panels/help-panel";
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
import { createBlankTemplate } from "@/lib/templates/blank-template";

type ActivePanel = "preview" | "settings" | "export" | "help" | null;

export default function BuilderPage() {
  const router = useRouter();
  const { builderProjectId } = useParams();
  const dispatch = useDispatch();
  const { getProjectById, createProject } = useProjects();
  const { initialized, saving, error } = useEditorState();

  const [isLoading, setIsLoading] = useState(true);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] =
    useState(false);
  const [currentProjectId, setCurrentProjectIdState] = useState<string | null>(
    null
  );
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

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
          console.log("Project not found, creating blank template");

          // Create a blank template project when API data isn't available
          try {
            const blankTemplate = createBlankTemplate();
            const newProject = await createProject({
              name: "Untitled Project",
              description: "Created when original project couldn't be loaded.",
              template: blankTemplate, // Use the full template object instead of looking for an ID
            });

            if (newProject) {
              setCurrentProjectIdState(newProject.id);
              dispatch(setCurrentProject(newProject.id));
              console.log("Created new blank project:", newProject.id);
            } else {
              throw new Error("Failed to create blank project");
            }
          } catch (templateError) {
            console.error("Failed to create blank template:", templateError);
            setErrorMessage(
              "Could not create blank template. Please try again."
            );
          }
        } else {
          // Store project ID for components that need it
          setCurrentProjectIdState(project.id);
          // Pass project ID to the redux store
          dispatch(setCurrentProject(project.id));
        }
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
  }, [builderProjectId, dispatch, getProjectById, createProject, saving]);

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

  const handleToggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  const handleToggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  if (isLoading) {
    return null; // The loading.tsx component will be shown automatically
  }

  // if (errorMessage) {
  //   return (
  //     <div className="h-screen w-screen flex flex-col items-center justify-center p-4">
  //       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
  //         <h2 className="text-2xl font-bold text-red-600 mb-4">
  //           Error Loading Project
  //         </h2>
  //         <p className="mb-6">{errorMessage}</p>
  //         <Button onClick={() => router.push("/projects")}>
  //           Back to Projects
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="h-screen w-screen flex flex-col bg-background">
      {/* Top toolbar */}
      {currentProjectId && (
        <Toolbar
          projectId={currentProjectId}
          leftSidebarOpen={leftSidebarOpen}
          rightSidebarOpen={rightSidebarOpen}
          onToggleLeftSidebar={handleToggleLeftSidebar}
          onToggleRightSidebar={handleToggleRightSidebar}
          onPreview={() => togglePanel("preview")}
        />
      )}

      {/* Main builder area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar with components */}
        {leftSidebarOpen && <LeftSidebar />}

        {/* Main canvas area */}
        <div className="flex-1 overflow-auto bg-muted/20">
          {currentProjectId && <Canvas projectId={currentProjectId} />}
        </div>

        {/* Right sidebar with properties */}
        {rightSidebarOpen && <RightSidebar />}
      </div>

      {/* Floating panels */}
      {activePanel === "preview" && currentProjectId && (
        <PreviewPanel
          isOpen={activePanel === "preview"}
          projectId={currentProjectId}
          onClose={() => setActivePanel(null)}
        />
      )}

      {activePanel === "settings" && currentProjectId && (
        <SettingsPanel
          isOpen={activePanel === "settings"}
          projectId={currentProjectId}
          onClose={() => setActivePanel(null)}
        />
      )}

      {activePanel === "export" && (
        <ExportPanel onClose={() => setActivePanel(null)} />
      )}

      {activePanel === "help" && (
        <HelpPanel
          isOpen={activePanel === "help"}
          onClose={() => setActivePanel(null)}
        />
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
  );
}
