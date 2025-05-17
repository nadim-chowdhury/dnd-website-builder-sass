import { AppState } from "../../redux/store";

/**
 * Interface for editor commands that can be executed, undone and redone
 */
export interface EditorCommand {
  /** Unique identifier for the command */
  id: string;

  /** Human-readable name of the command for display purposes */
  name: string;

  /** Type of command (useful for grouping related commands) */
  type: string;

  /** Timestamp when the command was created */
  timestamp: number;

  /** The function to execute the command */
  execute: () => Promise<void>;

  /** The function to undo the command */
  undo: () => Promise<void>;

  /** Additional data associated with the command */
  data?: any;
}

/**
 * CommandBatch represents a group of commands that should be executed together
 * as a single unit for undo/redo purposes
 */
export interface CommandBatch {
  /** Unique identifier for the batch */
  id: string;

  /** Human-readable name of the batch */
  name: string;

  /** List of commands in this batch */
  commands: EditorCommand[];

  /** Timestamp when the batch was created */
  timestamp: number;
}

/**
 * Command history state for the editor
 */
export interface CommandHistory {
  /** List of command batches in chronological order */
  batches: CommandBatch[];

  /** Current position in the history stack */
  currentIndex: number;

  /** Whether a batch is currently being recorded */
  isRecording: boolean;

  /** Current batch being recorded (if isRecording is true) */
  currentBatch: CommandBatch | null;

  /** Maximum number of batches to keep in history */
  maxHistorySize: number;
}

/**
 * CommandQueue manages the execution and history of editor commands
 */
export class CommandQueue {
  private history: CommandHistory;
  private onStateChange: ((state: AppState) => void) | null = null;

  constructor(maxHistorySize = 100) {
    this.history = {
      batches: [],
      currentIndex: -1,
      isRecording: false,
      currentBatch: null,
      maxHistorySize,
    };
  }

  /**
   * Set a callback to be called whenever state changes
   */
  public setStateChangeCallback(callback: (state: AppState) => void): void {
    this.onStateChange = callback;
  }

  /**
   * Execute a single command without adding it to history
   */
  public async executeCommand(command: EditorCommand): Promise<void> {
    await command.execute();
  }

  /**
   * Add a command to history and execute it
   */
  public async addCommand(
    command: EditorCommand,
    state: AppState
  ): Promise<void> {
    // If we're recording a batch, add to current batch
    if (this.history.isRecording && this.history.currentBatch) {
      this.history.currentBatch.commands.push(command);
      await command.execute();

      if (this.onStateChange) {
        this.onStateChange(state);
      }
      return;
    }

    // If we're in the middle of the history stack, truncate future commands
    if (this.history.currentIndex < this.history.batches.length - 1) {
      this.history.batches = this.history.batches.slice(
        0,
        this.history.currentIndex + 1
      );
    }

    // Create a new batch with this single command
    const batch: CommandBatch = {
      id: `batch_${Date.now()}`,
      name: command.name,
      commands: [command],
      timestamp: Date.now(),
    };

    // Add to history and update current index
    this.history.batches.push(batch);
    this.history.currentIndex = this.history.batches.length - 1;

    // Trim history if it exceeds max size
    if (this.history.batches.length > this.history.maxHistorySize) {
      this.history.batches = this.history.batches.slice(
        -this.history.maxHistorySize
      );
      this.history.currentIndex = this.history.batches.length - 1;
    }

    // Execute the command
    await command.execute();

    if (this.onStateChange) {
      this.onStateChange(state);
    }
  }

  /**
   * Start recording a batch of commands
   */
  public startBatch(batchName: string): void {
    if (this.history.isRecording) {
      throw new Error("Already recording a batch");
    }

    this.history.isRecording = true;
    this.history.currentBatch = {
      id: `batch_${Date.now()}`,
      name: batchName,
      commands: [],
      timestamp: Date.now(),
    };
  }

  /**
   * Finish recording a batch of commands and add it to history
   */
  public endBatch(): void {
    if (!this.history.isRecording || !this.history.currentBatch) {
      throw new Error("No batch recording in progress");
    }

    // Only add the batch if it has commands
    if (this.history.currentBatch.commands.length > 0) {
      // If we're in the middle of the history stack, truncate future commands
      if (this.history.currentIndex < this.history.batches.length - 1) {
        this.history.batches = this.history.batches.slice(
          0,
          this.history.currentIndex + 1
        );
      }

      // Add the batch to history
      this.history.batches.push(this.history.currentBatch);
      this.history.currentIndex = this.history.batches.length - 1;

      // Trim history if it exceeds max size
      if (this.history.batches.length > this.history.maxHistorySize) {
        this.history.batches = this.history.batches.slice(
          -this.history.maxHistorySize
        );
        this.history.currentIndex = this.history.batches.length - 1;
      }
    }

    // Reset recording state
    this.history.isRecording = false;
    this.history.currentBatch = null;
  }

  /**
   * Cancel the current batch recording without adding to history
   */
  public cancelBatch(): void {
    if (!this.history.isRecording) {
      throw new Error("No batch recording in progress");
    }

    this.history.isRecording = false;
    this.history.currentBatch = null;
  }

  /**
   * Undo the last command or batch
   */
  public async undo(state: AppState): Promise<boolean> {
    // Check if we can undo
    if (this.history.currentIndex < 0 || this.history.batches.length === 0) {
      return false;
    }

    // Get the current batch
    const batch = this.history.batches[this.history.currentIndex];

    // Undo commands in reverse order
    for (let i = batch.commands.length - 1; i >= 0; i--) {
      await batch.commands[i].undo();
    }

    // Move back in history
    this.history.currentIndex--;

    if (this.onStateChange) {
      this.onStateChange(state);
    }

    return true;
  }

  /**
   * Redo the next command or batch
   */
  public async redo(state: AppState): Promise<boolean> {
    // Check if we can redo
    if (this.history.currentIndex >= this.history.batches.length - 1) {
      return false;
    }

    // Move forward in history
    this.history.currentIndex++;

    // Get the batch to redo
    const batch = this.history.batches[this.history.currentIndex];

    // Execute commands in original order
    for (const command of batch.commands) {
      await command.execute();
    }

    if (this.onStateChange) {
      this.onStateChange(state);
    }

    return true;
  }

  /**
   * Check if undo is available
   */
  public canUndo(): boolean {
    return this.history.currentIndex >= 0;
  }

  /**
   * Check if redo is available
   */
  public canRedo(): boolean {
    return this.history.currentIndex < this.history.batches.length - 1;
  }

  /**
   * Get the current history state
   */
  public getHistory(): CommandHistory {
    return { ...this.history };
  }

  /**
   * Clear all history
   */
  public clearHistory(): void {
    this.history = {
      batches: [],
      currentIndex: -1,
      isRecording: false,
      currentBatch: null,
      maxHistorySize: this.history.maxHistorySize,
    };
  }

  /**
   * Get a summary of the command history for display
   */
  public getHistorySummary(): {
    name: string;
    canUndo: boolean;
    canRedo: boolean;
  }[] {
    return this.history.batches.map((batch, index) => ({
      name: batch.name,
      canUndo: index <= this.history.currentIndex,
      canRedo: index > this.history.currentIndex,
    }));
  }
}

// Create and export a singleton instance
export const commandQueue = new CommandQueue();
