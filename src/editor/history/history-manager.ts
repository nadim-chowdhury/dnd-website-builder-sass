import { AppState } from "../../redux/store";
import { CommandQueue, EditorCommand, commandQueue } from "./command-queue";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Maximum number of snapshots to keep in memory
const MAX_SNAPSHOTS = 50;

/**
 * Snapshot interface for storing application state
 */
interface StateSnapshot {
  id: string;
  state: Partial<AppState>;
  timestamp: number;
  description: string;
}

/**
 * HistoryManager provides state snapshot management and integration with the command queue
 */
export class HistoryManager {
  private snapshots: StateSnapshot[] = [];
  private currentSnapshotIndex: number = -1;
  private isUndoRedoInProgress: boolean = false;
  private commandQueue: CommandQueue;

  constructor(commandQueue: CommandQueue) {
    this.commandQueue = commandQueue;

    // Set up the callback to handle state changes from command execution
    this.commandQueue.setStateChangeCallback((newState: AppState) => {
      // We don't want to create snapshots during undo/redo operations
      if (!this.isUndoRedoInProgress) {
        this.addInternalSnapshot(newState, "Command Execution");
      }
    });
  }

  /**
   * Save a snapshot of the current application state
   */
  public saveSnapshot(
    state: AppState,
    description: string = "Manual Snapshot"
  ): string {
    // Create a snapshot ID
    const snapshotId = `snapshot_${Date.now()}`;

    // Create a new snapshot
    const snapshot: StateSnapshot = {
      id: snapshotId,
      state: this.extractRelevantState(state),
      timestamp: Date.now(),
      description,
    };

    // If we're not at the end of the snapshots array, truncate the future snapshots
    if (this.currentSnapshotIndex < this.snapshots.length - 1) {
      this.snapshots = this.snapshots.slice(0, this.currentSnapshotIndex + 1);
    }

    // Add the new snapshot
    this.snapshots.push(snapshot);
    this.currentSnapshotIndex = this.snapshots.length - 1;

    // Limit the number of snapshots
    if (this.snapshots.length > MAX_SNAPSHOTS) {
      this.snapshots = this.snapshots.slice(-MAX_SNAPSHOTS);
      this.currentSnapshotIndex = this.snapshots.length - 1;
    }

    return snapshotId;
  }

  /**
   * Internal method to add a snapshot without triggering external actions
   */
  private addInternalSnapshot(state: AppState, description: string): void {
    this.saveSnapshot(state, description);
  }

  /**
   * Extract only the parts of state we need to save for history
   * This helps reduce memory usage by not storing unnecessary state
   */
  private extractRelevantState(state: AppState): Partial<AppState> {
    // Only keep the parts of the state that are necessary for undo/redo
    // This is usually the builder state and maybe some UI state
    return {
      builder: state.builder,
      projects: state.projects,
      // Add other relevant slices as needed
    };
  }

  /**
   * Get a specific snapshot by ID
   */
  public getSnapshot(id: string): StateSnapshot | null {
    const snapshot = this.snapshots.find((s) => s.id === id);
    return snapshot || null;
  }

  /**
   * Create a command that will undo to a specific snapshot
   */
  public createUndoCommand(
    targetSnapshotId: string,
    currentState: AppState
  ): EditorCommand | null {
    const targetSnapshot = this.getSnapshot(targetSnapshotId);
    if (!targetSnapshot) return null;

    // Find the index of the target snapshot
    const targetIndex = this.snapshots.findIndex(
      (s) => s.id === targetSnapshotId
    );
    if (targetIndex === -1) return null;

    // Create a new snapshot of the current state for the redo operation
    const currentSnapshotId = this.saveSnapshot(currentState, "Pre-Undo State");

    return {
      id: `undo_to_${targetSnapshotId}`,
      name: `Undo to ${targetSnapshot.description}`,
      type: "UNDO",
      timestamp: Date.now(),
      execute: async () => {
        this.isUndoRedoInProgress = true;
        // Logic to apply the target snapshot would be handled by the reducer
        // We just need to return the data and let the reducer handle the rest
        this.currentSnapshotIndex = targetIndex;
        this.isUndoRedoInProgress = false;
      },
      undo: async () => {
        this.isUndoRedoInProgress = true;
        // Logic to revert back to the current state
        const redoSnapshot = this.getSnapshot(currentSnapshotId);
        if (redoSnapshot) {
          // Apply the redo snapshot state through the reducer
          this.currentSnapshotIndex = this.snapshots.findIndex(
            (s) => s.id === currentSnapshotId
          );
        }
        this.isUndoRedoInProgress = false;
      },
      data: {
        targetSnapshotId,
        currentSnapshotId,
      },
    };
  }

  /**
   * Undo to the previous state
   */
  public async undo(dispatch: any, getState: () => AppState): Promise<boolean> {
    if (this.currentSnapshotIndex <= 0) {
      return false; // Nothing to undo
    }

    this.isUndoRedoInProgress = true;

    // Move back one snapshot
    this.currentSnapshotIndex--;
    const snapshot = this.snapshots[this.currentSnapshotIndex];

    // Dispatch an action to restore this snapshot
    await dispatch({
      type: "history/restoreSnapshot",
      payload: snapshot.state,
    });

    this.isUndoRedoInProgress = false;
    return true;
  }

  /**
   * Redo to the next state
   */
  public async redo(dispatch: any, getState: () => AppState): Promise<boolean> {
    if (this.currentSnapshotIndex >= this.snapshots.length - 1) {
      return false; // Nothing to redo
    }

    this.isUndoRedoInProgress = true;

    // Move forward one snapshot
    this.currentSnapshotIndex++;
    const snapshot = this.snapshots[this.currentSnapshotIndex];

    // Dispatch an action to restore this snapshot
    await dispatch({
      type: "history/restoreSnapshot",
      payload: snapshot.state,
    });

    this.isUndoRedoInProgress = false;
    return true;
  }

  /**
   * Check if we can undo
   */
  public canUndo(): boolean {
    return this.currentSnapshotIndex > 0;
  }

  /**
   * Check if we can redo
   */
  public canRedo(): boolean {
    return this.currentSnapshotIndex < this.snapshots.length - 1;
  }

  /**
   * Get the current snapshot
   */
  public getCurrentSnapshot(): StateSnapshot | null {
    if (this.currentSnapshotIndex >= 0 && this.snapshots.length > 0) {
      return this.snapshots[this.currentSnapshotIndex];
    }
    return null;
  }

  /**
   * Clear all snapshots
   */
  public clearHistory(): void {
    this.snapshots = [];
    this.currentSnapshotIndex = -1;
  }

  /**
   * Get a summary of the available snapshots
   */
  public getSnapshotSummary(): {
    id: string;
    description: string;
    timestamp: number;
  }[] {
    return this.snapshots.map((snapshot) => ({
      id: snapshot.id,
      description: snapshot.description,
      timestamp: snapshot.timestamp,
    }));
  }
}

// Create and export Redux actions for undo/redo
export const undoAction = createAsyncThunk(
  "history/undo",
  async (_, { dispatch, getState }) => {
    return await historyManager.undo(dispatch, getState);
  }
);

export const redoAction = createAsyncThunk(
  "history/redo",
  async (_, { dispatch, getState }) => {
    return await historyManager.redo(dispatch, getState);
  }
);

export const restoreSnapshot = createAsyncThunk(
  "history/restoreSnapshot",
  async (snapshotId: string, { dispatch, getState }) => {
    const snapshot = historyManager.getSnapshot(snapshotId);
    if (!snapshot) {
      throw new Error(`Snapshot not found: ${snapshotId}`);
    }
    return snapshot.state;
  }
);

export const saveCurrentSnapshot = createAsyncThunk(
  "history/saveSnapshot",
  async (description: string, { getState }) => {
    const state = getState() as AppState;
    return historyManager.saveSnapshot(state, description);
  }
);

export const clearHistoryAction = createAsyncThunk(
  "history/clearHistory",
  async () => {
    historyManager.clearHistory();
    return true;
  }
);

// Create and export a singleton instance
export const historyManager = new HistoryManager(commandQueue);
