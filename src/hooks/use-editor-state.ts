import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEditorMode,
  selectIsEditing,
  selectIsPreview,
  selectCurrentProjectId,
  selectCurrentProjectData,
  selectEditorSettings,
  selectSelectedComponentId, // Add this import
} from "../redux/selectors/builder-selectors";
import { setEditorMode, setUnsavedChanges } from "../redux/slices/builderSlice";
// Import from components where EditorMode is defined and exported as a value
import { EditorMode } from "../types/components";
// Import Project and EditorOptions from editor.ts
import { EditorOptions } from "../types/editor";

/**
 * Type definition for the project structure
 * Define it here since it's missing from the imports
 */
interface Project {
  id: string;
  name: string;
  description?: string;
  // Add other properties as needed
}

/**
 * Custom hook to manage editor state and settings
 */
export const useEditorState = () => {
  const dispatch = useDispatch();

  // Select relevant parts of the editor state
  const mode = useSelector(selectEditorMode);
  const isEditing = useSelector(selectIsEditing);
  const isPreview = useSelector(selectIsPreview);
  const currentProjectId = useSelector(selectCurrentProjectId);
  const currentProject = useSelector(selectCurrentProjectData);
  const editorSettings = useSelector(selectEditorSettings);
  const selectedComponentId = useSelector(selectSelectedComponentId); // Add this selector

  // Add state for the missing properties
  const [initialized, setInitialized] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Change the editor mode
   * @param newMode - The editor mode to set
   */
  const changeEditorMode = useCallback(
    (newMode: EditorMode) => {
      dispatch(setEditorMode(newMode));
    },
    [dispatch]
  );

  /**
   * Toggle preview mode
   */
  const togglePreviewMode = useCallback(() => {
    // Use proper EditorMode enum values instead of string literals
    dispatch(setEditorMode(isPreview ? EditorMode.EDIT : EditorMode.PREVIEW));
  }, [dispatch, isPreview]);

  /**
   * Update editor settings
   * @param settings - Partial settings to update
   */
  const updateSettings = useCallback(
    (settings: Partial<EditorOptions>) => {
      // Since updateEditorSettings doesn't exist, we'll need to
      // implement custom logic or create that action separately
      console.warn("updateSettings called but action not implemented");
      // For now, mark the editor as having unsaved changes
      dispatch(setUnsavedChanges(true));
    },
    [dispatch]
  );

  /**
   * Save the current editor state
   */
  const saveState = useCallback(async () => {
    if (!currentProjectId) return;

    try {
      setSaving(true);
      // Since saveEditorState doesn't exist, implement save logic here
      // This could be an API call or other persistence mechanism

      // Example implementation (replace with actual implementation)
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

      // Mark changes as saved
      dispatch(setUnsavedChanges(false));
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to save editor state")
      );
    } finally {
      setSaving(false);
    }
  }, [dispatch, currentProjectId]);

  /**
   * Export the project to HTML/CSS/JS
   */
  const exportProject = useCallback(async () => {
    if (!currentProject) return null;
    // In a real implementation, this would generate files
    // based on the current project state
    try {
      // This would be implemented in your project serializer
      // to convert the project state to deployable code
      // For now, just return the project data structure
      return {
        html: "<html>...</html>",
        css: "/* Generated CSS */",
        js: "// Generated JavaScript",
        assets: [],
        metadata: {
          projectName: currentProject.name,
          exportDate: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error("Failed to export project:", error);
      setError(error instanceof Error ? error : new Error("Export failed"));
      return null;
    }
  }, [currentProject]);

  /**
   * Check if editor has unsaved changes
   */
  const hasUnsavedChanges = useCallback(() => {
    // This would be implemented based on your app's state tracking
    // For now, just return false
    return false;
  }, []);

  /**
   * Switch to a different project
   * @param projectId - The project ID to switch to
   */
  const switchProject = useCallback(
    (projectId: string) => {
      // Save current project first
      if (hasUnsavedChanges()) {
        saveState();
      }
      // Logic to switch to a different project would be in your middleware
      // or in a separate action
    },
    [hasUnsavedChanges, saveState]
  );

  // Initialize the editor when mounted
  useEffect(() => {
    const initializeEditor = async () => {
      try {
        setInitialized(false);
        // Initialization logic here
        setInitialized(true);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to initialize editor")
        );
        setInitialized(false);
      }
    };

    initializeEditor();
  }, []);

  return {
    mode,
    isEditing,
    isPreview,
    currentProjectId,
    currentProject,
    editorSettings,
    selectedComponentId, // Add this to the returned object
    changeEditorMode,
    togglePreviewMode,
    updateSettings,
    saveState,
    exportProject,
    hasUnsavedChanges,
    switchProject,
    // Add the missing properties
    initialized,
    saving,
    error,
  };
};

export default useEditorState;

// src/hooks/use-editor-state.ts

// import { useSelector, useDispatch } from "react-redux";
// import {
//   selectComponent,
//   setUnsavedChanges,
//   setError,
// } from "@/redux/slices/builderSlice";
// import { RootState } from "@/redux/store";

// export const useEditorState = () => {
//   const dispatch = useDispatch();
//   const selectedComponentId = useSelector(
//     (state: RootState) => state.builder.selectedComponentId
//   );
//   const hoveredComponentId = useSelector(
//     (state: RootState) => state.builder.hoveredComponentId
//   );
//   const components = useSelector(
//     (state: RootState) => state.builder.components
//   );
//   const editorMode = useSelector(
//     (state: RootState) => state.builder.editorMode
//   );
//   const canvasConfig = useSelector(
//     (state: RootState) => state.builder.canvasConfig
//   );
//   const unsavedChanges = useSelector(
//     (state: RootState) => state.builder.unsavedChanges
//   );
//   const error = useSelector((state: RootState) => state.builder.error);
//   const initialized = Object.keys(components).length > 0;
//   const saving = unsavedChanges;

//   // Select a component
//   const selectComponentById = (id: string | null) => {
//     dispatch(selectComponent(id));
//   };

//   // Mark changes as saved or unsaved
//   const markChangesSaved = (saved: boolean = true) => {
//     dispatch(setUnsavedChanges(!saved));
//   };

//   // Set an error message
//   const setErrorMessage = (message: string | null) => {
//     dispatch(setError(message));
//   };

//   return {
//     selectedComponentId,
//     hoveredComponentId,
//     components,
//     editorMode,
//     canvasConfig,
//     unsavedChanges,
//     error,
//     initialized,
//     saving,
//     selectComponentById,
//     markChangesSaved,
//     setErrorMessage,
//   };
// };
