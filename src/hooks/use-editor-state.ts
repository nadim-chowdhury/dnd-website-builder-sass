import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEditorMode,
  selectIsEditing,
  selectIsPreview,
  selectCurrentProjectId,
  selectCurrentProjectData,
  selectEditorSettings,
} from "../redux/selectors/builder-selectors";
import {
  setEditorMode,
  togglePreview,
  updateEditorSettings,
  saveEditorState,
} from "../redux/slices/builderSlice";
import type { EditorMode, EditorSettings } from "../types/editor";

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
    dispatch(togglePreview());
  }, [dispatch]);

  /**
   * Update editor settings
   * @param settings - Partial settings to update
   */
  const updateSettings = useCallback(
    (settings: Partial<EditorSettings>) => {
      dispatch(updateEditorSettings(settings));
    },
    [dispatch]
  );

  /**
   * Save the current editor state
   */
  const saveState = useCallback(() => {
    if (!currentProjectId) return;

    dispatch(saveEditorState());
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

  return {
    mode,
    isEditing,
    isPreview,
    currentProjectId,
    currentProject,
    editorSettings,
    changeEditorMode,
    togglePreviewMode,
    updateSettings,
    saveState,
    exportProject,
    hasUnsavedChanges,
    switchProject,
  };
};

export default useEditorState;
