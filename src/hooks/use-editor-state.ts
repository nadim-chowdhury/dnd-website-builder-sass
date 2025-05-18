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
