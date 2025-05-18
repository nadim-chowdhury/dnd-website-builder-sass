import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCanRedo,
  selectCanUndo,
  selectEditorHistory,
} from "../redux/selectors/builder-selectors";
import {
  undo,
  redo,
  clearHistory,
  createSnapshot,
} from "../redux/slices/builderSlice";
import { useEditorState } from "./use-editor-state";

/**
 * Custom hook for managing undo/redo functionality
 */
export const useUndoRedo = () => {
  const dispatch = useDispatch();
  const { isEditing } = useEditorState();

  // Get undo/redo state from Redux
  const canUndo = useSelector(selectCanUndo);
  const canRedo = useSelector(selectCanRedo);
  const editorHistory = useSelector(selectEditorHistory);

  // Derive history index and length from the history object
  const historyIndex = editorHistory ? editorHistory.past.length : 0;
  const historyLength = editorHistory
    ? editorHistory.past.length + 1 + editorHistory.future.length
    : 1;

  /**
   * Perform undo operation
   */
  const handleUndo = useCallback(() => {
    if (canUndo && isEditing) {
      dispatch(undo());
    }
  }, [dispatch, canUndo, isEditing]);

  /**
   * Perform redo operation
   */
  const handleRedo = useCallback(() => {
    if (canRedo && isEditing) {
      dispatch(redo());
    }
  }, [dispatch, canRedo, isEditing]);

  /**
   * Create a new history snapshot
   * @param label - Optional label describing the action
   */
  const createHistorySnapshot = useCallback(
    (label?: string) => {
      if (isEditing) {
        dispatch(createSnapshot(label));
      }
    },
    [dispatch, isEditing]
  );

  /**
   * Reset history stack
   */
  const resetHistory = useCallback(() => {
    dispatch(clearHistory());
  }, [dispatch]);

  // Set up keyboard shortcuts for undo/redo
  useEffect(() => {
    if (!isEditing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for undo (Ctrl+Z or Command+Z)
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }

      // Check for redo (Ctrl+Shift+Z or Command+Shift+Z or Ctrl+Y)
      if (
        ((e.ctrlKey || e.metaKey) && e.key === "z" && e.shiftKey) ||
        ((e.ctrlKey || e.metaKey) && e.key === "y")
      ) {
        e.preventDefault();
        handleRedo();
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleUndo, handleRedo, isEditing]);

  return {
    canUndo,
    canRedo,
    historyIndex,
    historyLength,
    undo: handleUndo,
    redo: handleRedo,
    createSnapshot: createHistorySnapshot,
    resetHistory,
  };
};

export default useUndoRedo;
