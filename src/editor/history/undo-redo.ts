import { EditorState } from "@/types/editor";
import { SnapshotManager, Snapshot } from "./snapshot-manager";
import { useEditorState } from "@/hooks/use-editor-state";
import {
  serializeState,
  deserializeState,
} from "../serializer/state-serializer";

interface UndoRedoOptions {
  /**
   * Whether to automatically merge similar consecutive actions
   * For example, multiple character insertions within a short time
   */
  mergeConsecutiveActions?: boolean;

  /**
   * Whether to track this action for undo/redo
   * Some actions like temporary UI state changes might not need to be undoable
   */
  trackable?: boolean;
}

export interface Command {
  execute: () => void;
  undo: () => void;
  description: string;
}

/**
 * UndoRedoManager handles tracking of user actions and provides undo/redo functionality
 * It uses SnapshotManager for state persistence and tracks the command history
 */
export class UndoRedoManager {
  private snapshotManager: SnapshotManager;
  private onStateChange: (state: EditorState) => void;
  private lastActionTimestamp: number = 0;
  private mergeWindowMs: number = 1000; // Time window for merging similar consecutive actions

  constructor(
    initialState: EditorState,
    onStateChange: (state: EditorState) => void
  ) {
    this.snapshotManager = new SnapshotManager();
    this.onStateChange = onStateChange;

    // Create initial snapshot
    this.snapshotManager.createSnapshot(initialState, "Initial state");
  }

  /**
   * Execute a command and add it to the history
   *
   * @param command The command to execute
   * @param options Options for tracking and merging
   */
  public executeCommand(command: Command, options: UndoRedoOptions = {}): void {
    const { mergeConsecutiveActions = true, trackable = true } = options;

    // Execute the command
    command.execute();

    // Skip tracking if not trackable
    if (!trackable) {
      return;
    }

    const currentState = useEditorState.getState();
    const now = Date.now();

    // Determine if we should merge with previous action
    const shouldMerge =
      mergeConsecutiveActions &&
      this.isSimilarAction(command) &&
      now - this.lastActionTimestamp < this.mergeWindowMs;

    if (!shouldMerge) {
      // Create a new snapshot if we're not merging
      this.snapshotManager.createSnapshot(currentState, command.description);
    } else {
      // If merging, update the current snapshot with the new state
      const currentSnapshot = this.snapshotManager.getCurrentSnapshot();
      if (currentSnapshot) {
        this.snapshotManager.createSnapshot(
          currentState,
          currentSnapshot.description
        );
      }
    }

    this.lastActionTimestamp = now;
  }

  /**
   * Undo the last action
   *
   * @returns True if an action was undone, false otherwise
   */
  public undo(): boolean {
    if (!this.canUndo()) {
      return false;
    }

    const previousSnapshot = this.snapshotManager.undo();

    if (previousSnapshot) {
      this.applySnapshot(previousSnapshot);
      return true;
    }

    return false;
  }

  /**
   * Redo the last undone action
   *
   * @returns True if an action was redone, false otherwise
   */
  public redo(): boolean {
    if (!this.canRedo()) {
      return false;
    }

    const nextSnapshot = this.snapshotManager.redo();

    if (nextSnapshot) {
      this.applySnapshot(nextSnapshot);
      return true;
    }

    return false;
  }

  /**
   * Check if undo is available
   */
  public canUndo(): boolean {
    return this.snapshotManager.canUndo();
  }

  /**
   * Check if redo is available
   */
  public canRedo(): boolean {
    return this.snapshotManager.canRedo();
  }

  /**
   * Save the current history state to persistence
   */
  public saveHistory(): void {
    this.snapshotManager.saveHistory();
  }

  /**
   * Load history from persistence
   *
   * @returns True if history was loaded successfully, false otherwise
   */
  public loadHistory(): boolean {
    const loaded = this.snapshotManager.loadHistory();

    if (loaded) {
      const currentSnapshot = this.snapshotManager.getCurrentSnapshot();
      if (currentSnapshot) {
        this.applySnapshot(currentSnapshot);
      }
    }

    return loaded;
  }

  /**
   * Clear all history
   */
  public clearHistory(): void {
    this.snapshotManager.clearHistory();
  }

  /**
   * Get a list of available snapshots for the history panel
   */
  public getHistoryList(): {
    id: string;
    description: string;
    timestamp: number;
  }[] {
    return this.snapshotManager.getAllSnapshots().map((snapshot) => ({
      id: snapshot.id,
      description: snapshot.description,
      timestamp: snapshot.timestamp,
    }));
  }

  /**
   * Jump to a specific point in history
   *
   * @param snapshotId The ID of the snapshot to jump to
   * @returns True if jump was successful, false otherwise
   */
  public jumpToSnapshot(snapshotId: string): boolean {
    const snapshot = this.snapshotManager.jumpToSnapshot(snapshotId);

    if (snapshot) {
      this.applySnapshot(snapshot);
      return true;
    }

    return false;
  }

  /**
   * Track a state change as a new undoable action
   *
   * @param newState The new editor state
   * @param description Description of the change
   * @param options Options for tracking and merging
   */
  public trackStateChange(
    newState: EditorState,
    description: string,
    options: UndoRedoOptions = {}
  ): void {
    const { mergeConsecutiveActions = true, trackable = true } = options;

    if (!trackable) {
      return;
    }

    const now = Date.now();
    const shouldMerge =
      mergeConsecutiveActions &&
      now - this.lastActionTimestamp < this.mergeWindowMs;

    if (!shouldMerge) {
      this.snapshotManager.createSnapshot(newState, description);
    } else {
      // Update the current snapshot if merging
      const currentSnapshot = this.snapshotManager.getCurrentSnapshot();
      if (currentSnapshot) {
        this.snapshotManager.createSnapshot(
          newState,
          currentSnapshot.description
        );
      }
    }

    this.lastActionTimestamp = now;
  }

  /**
   * Apply a snapshot to the editor state
   *
   * @param snapshot The snapshot to apply
   */
  private applySnapshot(snapshot: Snapshot): void {
    this.onStateChange(snapshot.state);
  }

  /**
   * Check if a command is similar to the previous one for merging purposes
   *
   * @param command The command to check
   * @returns True if the command is similar to the previous one
   */
  private isSimilarAction(command: Command): boolean {
    const currentSnapshot = this.snapshotManager.getCurrentSnapshot();

    if (!currentSnapshot) {
      return false;
    }

    // Example logic: check if description contains certain keywords that indicate
    // actions that should be merged (like "text editing" or "style change")
    const mergeCriteria = [
      { key: "text edit", mergeable: ["text edit", "typing"] },
      { key: "style", mergeable: ["style change", "styling"] },
      { key: "position", mergeable: ["moved", "resized", "position"] },
    ];

    for (const criteria of mergeCriteria) {
      if (
        command.description.toLowerCase().includes(criteria.key) &&
        criteria.mergeable.some((term) =>
          currentSnapshot.description.toLowerCase().includes(term)
        )
      ) {
        return true;
      }
    }

    return false;
  }
}
