import {
  BuilderEvent,
  EventCallback,
  EventName,
  EventOptions,
} from "@/types/editor";

/**
 * EventHandler manages the events system for the builder.
 * It allows components to subscribe to and publish events across the application.
 */
class EventHandler {
  private listeners: Map<EventName, Set<EventCallback>> = new Map();
  private onceListeners: Map<EventName, Set<EventCallback>> = new Map();

  /**
   * Subscribe to an event
   * @param event The event name to subscribe to
   * @param callback Function to call when event is triggered
   * @param options Additional options for the subscription
   * @returns Unsubscribe function
   */
  on(
    event: EventName,
    callback: EventCallback,
    options: EventOptions = {}
  ): () => void {
    if (options.once) {
      // For one-time listeners
      if (!this.onceListeners.has(event)) {
        this.onceListeners.set(event, new Set());
      }
      this.onceListeners.get(event)!.add(callback);
    } else {
      // For regular listeners
      if (!this.listeners.has(event)) {
        this.listeners.set(event, new Set());
      }
      this.listeners.get(event)!.add(callback);
    }

    // Return unsubscribe function
    return () => this.off(event, callback);
  }

  /**
   * Subscribe to an event for a single trigger
   * @param event The event name to subscribe to
   * @param callback Function to call when event is triggered
   * @returns Unsubscribe function
   */
  once(event: EventName, callback: EventCallback): () => void {
    return this.on(event, callback, { once: true });
  }

  /**
   * Unsubscribe from an event
   * @param event The event name to unsubscribe from
   * @param callback The callback to remove
   * @returns Boolean indicating if unsubscription was successful
   */
  off(event: EventName, callback: EventCallback): boolean {
    let removed = false;

    // Remove from regular listeners
    if (this.listeners.has(event)) {
      removed = this.listeners.get(event)!.delete(callback) || removed;
    }

    // Remove from once listeners
    if (this.onceListeners.has(event)) {
      removed = this.onceListeners.get(event)!.delete(callback) || removed;
    }

    return removed;
  }

  /**
   * Trigger an event
   * @param event The event name to trigger
   * @param data Data to pass to event callbacks
   */
  emit<T = any>(event: EventName, data?: T): void {
    const eventData: BuilderEvent<T> = {
      type: event,
      timestamp: Date.now(),
      data,
    };

    // Call regular listeners
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.forEach((callback) => {
        try {
          callback(eventData);
        } catch (error) {
          console.error(`Error in event listener for "${event}":`, error);
        }
      });
    }

    // Call once listeners
    if (this.onceListeners.has(event)) {
      const callbacks = Array.from(this.onceListeners.get(event)!);
      // Clear before calling to prevent recursion issues
      this.onceListeners.set(event, new Set());

      callbacks.forEach((callback) => {
        try {
          callback(eventData);
        } catch (error) {
          console.error(`Error in once event listener for "${event}":`, error);
        }
      });
    }
  }

  /**
   * Remove all listeners for a specific event
   * @param event The event to clear listeners for
   */
  clearEvent(event: EventName): void {
    this.listeners.delete(event);
    this.onceListeners.delete(event);
  }

  /**
   * Remove all event listeners
   */
  clearAllEvents(): void {
    this.listeners.clear();
    this.onceListeners.clear();
  }

  /**
   * Get count of listeners for an event
   * @param event The event name
   * @returns Number of listeners for the event
   */
  listenerCount(event: EventName): number {
    const regularCount = this.listeners.has(event)
      ? this.listeners.get(event)!.size
      : 0;
    const onceCount = this.onceListeners.has(event)
      ? this.onceListeners.get(event)!.size
      : 0;
    return regularCount + onceCount;
  }

  /**
   * Check if an event has any listeners
   * @param event The event name
   * @returns Boolean indicating if event has listeners
   */
  hasListeners(event: EventName): boolean {
    return this.listenerCount(event) > 0;
  }
}

// Create singleton instance
const eventHandler = new EventHandler();

export default eventHandler;
