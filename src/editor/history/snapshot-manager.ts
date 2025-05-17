import { ProjectState } from "@/types/project";
import { EditorState } from "@/types/editor";
import { serializeState } from "../serializer/state-serializer";

/**
 * Maximum number of snapshots to keep in memory
 */
const MAX_SNAPSHOTS = 100;

export interface Snapshot {
  id: string;
  timestamp: number;
  state: EditorState;
  description: string;
}

/**
 * SnapshotManager handles the creation, storage, and retrieval of editor state snapshots
 * to support undo/redo functionality and state persistence.
 */
export class SnapshotManager {
  private snapshots: Snapshot[] = [];
  private currentIndex: number = -1;

  /**
   * Creates a new snapshot of the current editor state
   *
   * @param state The current editor state
   * @param description A human-readable description of what changed
   * @returns The created snapshot
   */
  public createSnapshot(state: EditorState, description: string): Snapshot {
    // Create a deep copy of the state to prevent mutations
    const stateCopy = JSON.parse(JSON.stringify(state));

    const snapshot: Snapshot = {
      id: this.generateSnapshotId(),
      timestamp: Date.now(),
      state: stateCopy,
      description,
    };

    // If we're not at the end of the snapshots array (user has undone changes),
    // remove all snapshots after the current index before adding the new one
    if (this.currentIndex < this.snapshots.length - 1) {
      this.snapshots = this.snapshots.slice(0, this.currentIndex + 1);
    }

    // Add the new snapshot
    this.snapshots.push(snapshot);
    this.currentIndex = this.snapshots.length - 1;

    // Ensure we don't exceed the maximum number of snapshots
    this.trimSnapshots();

    return snapshot;
  }

  /**
   * Move to the previous snapshot in history (undo)
   *
   * @returns The previous snapshot, or null if at the beginning of history
   */
  public undo(): Snapshot | null {
    if (this.currentIndex <= 0) {
      return null;
    }

    this.currentIndex--;
    return this.snapshots[this.currentIndex];
  }

  /**
   * Move to the next snapshot in history (redo)
   *
   * @returns The next snapshot, or null if at the end of history
   */
  public redo(): Snapshot | null {
    if (this.currentIndex >= this.snapshots.length - 1) {
      return null;
    }

    this.currentIndex++;
    return this.snapshots[this.currentIndex];
  }

  /**
   * Get the current snapshot
   *
   * @returns The current snapshot, or null if no snapshots exist
   */
  public getCurrentSnapshot(): Snapshot | null {
    if (this.currentIndex === -1 || this.snapshots.length === 0) {
      return null;
    }

    return this.snapshots[this.currentIndex];
  }

  /**
   * Check if an undo operation is available
   */
  public canUndo(): boolean {
    return this.currentIndex > 0;
  }

  /**
   * Check if a redo operation is available
   */
  public canRedo(): boolean {
    return this.currentIndex < this.snapshots.length - 1;
  }

  /**
   * Save the current snapshot history to localStorage or other persistence
   */
  public saveHistory(): void {
    try {
      // Only store the data needed for persistence, not the full snapshots
      const persistData = {
        snapshots: this.snapshots.map((snapshot) => ({
          id: snapshot.id,
          timestamp: snapshot.timestamp,
          state: serializeState(snapshot.state),
          description: snapshot.description,
        })),
        currentIndex: this.currentIndex,
      };

      localStorage.setItem(
        "editor_snapshot_history",
        JSON.stringify(persistData)
      );
    } catch (error) {
      console.error("Failed to save snapshot history:", error);
    }
  }

  /**
   * Restore snapshot history from localStorage or other persistence
   *
   * @returns True if history was successfully restored, false otherwise
   */
  public loadHistory(): boolean {
    try {
      const persistedData = localStorage.getItem("editor_snapshot_history");

      if (!persistedData) {
        return false;
      }

      const { snapshots, currentIndex } = JSON.parse(persistedData);

      if (Array.isArray(snapshots) && snapshots.length > 0) {
        this.snapshots = snapshots;
        this.currentIndex = currentIndex;
        return true;
      }

      return false;
    } catch (error) {
      console.error("Failed to load snapshot history:", error);
      return false;
    }
  }

  /**
   * Clear all snapshots and reset the manager
   */
  public clearHistory(): void {
    this.snapshots = [];
    this.currentIndex = -1;
    localStorage.removeItem("editor_snapshot_history");
  }

  /**
   * Get all available snapshots
   */
  public getAllSnapshots(): Snapshot[] {
    return [...this.snapshots];
  }

  /**
   * Jump to a specific snapshot by ID
   *
   * @param snapshotId The ID of the snapshot to jump to
   * @returns The snapshot that was jumped to, or null if not found
   */
  public jumpToSnapshot(snapshotId: string): Snapshot | null {
    const index = this.snapshots.findIndex((s) => s.id === snapshotId);

    if (index === -1) {
      return null;
    }

    this.currentIndex = index;
    return this.snapshots[index];
  }

  private generateSnapshotId(): string {
    return `snapshot_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  private trimSnapshots(): void {
    if (this.snapshots.length > MAX_SNAPSHOTS) {
      // Keep the first snapshot (initial state) and remove the oldest ones after that
      const snapshots = [
        this.snapshots[0],
        ...this.snapshots.slice(-(MAX_SNAPSHOTS - 1)),
      ];
      this.snapshots = snapshots;
      this.currentIndex = this.snapshots.length - 1;
    }
  }
}
