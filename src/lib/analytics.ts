/**
 * Analytics service for tracking user behavior and events
 */

interface EventData {
  [key: string]: any;
}

type EventCallback = (eventName: string, data: EventData) => void;

class Analytics {
  private static instance: Analytics;
  private initialized = false;
  private userId: string | null = null;
  private sessionId: string | null = null;
  private eventCallbacks: EventCallback[] = [];
  private debugMode = false;

  // Define common event names to ensure consistency
  static readonly EVENTS = {
    PAGE_VIEW: "page_view",
    COMPONENT_ADDED: "component_added",
    COMPONENT_REMOVED: "component_removed",
    COMPONENT_MODIFIED: "component_modified",
    PROJECT_CREATED: "project_created",
    PROJECT_SAVED: "project_saved",
    PROJECT_PUBLISHED: "project_published",
    EXPORT_STARTED: "export_started",
    EXPORT_COMPLETED: "export_completed",
    TEMPLATE_SELECTED: "template_selected",
    USER_REGISTERED: "user_registered",
    USER_LOGGED_IN: "user_logged_in",
    USER_LOGGED_OUT: "user_logged_out",
    SUBSCRIPTION_CHANGED: "subscription_changed",
    ERROR_OCCURRED: "error_occurred",
  };

  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  /**
   * Initialize analytics with configuration
   */
  init(
    config: {
      debug?: boolean;
      userId?: string;
      providers?: string[];
    } = {}
  ): void {
    if (this.initialized) {
      return;
    }

    this.debugMode = config.debug || false;

    if (config.userId) {
      this.userId = config.userId;
    }

    // Generate session ID
    this.sessionId = this.generateSessionId();

    // Setup providers based on configuration
    this.setupProviders(config.providers || []);

    // Setup event listeners for automatic tracking
    this.setupAutomaticTracking();

    this.initialized = true;

    if (this.debugMode) {
      console.log("Analytics initialized:", {
        userId: this.userId,
        sessionId: this.sessionId,
      });
    }
  }

  /**
   * Track an event with optional data
   */
  track(eventName: string, data: EventData = {}): void {
    if (!this.initialized) {
      console.warn("Analytics not initialized. Call init() first.");
      return;
    }

    const eventData = {
      ...data,
      timestamp: new Date().toISOString(),
      userId: this.userId,
      sessionId: this.sessionId,
    };

    // Call all registered event callbacks
    this.eventCallbacks.forEach((callback) => {
      try {
        callback(eventName, eventData);
      } catch (error) {
        console.error("Error in analytics callback:", error);
      }
    });

    if (this.debugMode) {
      console.log(`Analytics Event: ${eventName}`, eventData);
    }

    // Send to server-side
    this.sendToServer(eventName, eventData);
  }

  /**
   * Set user ID for tracking
   */
  setUserId(userId: string): void {
    this.userId = userId;

    if (this.debugMode) {
      console.log("Analytics user ID set:", userId);
    }
  }

  /**
   * Add a callback for events
   */
  addEventCallback(callback: EventCallback): void {
    this.eventCallbacks.push(callback);
  }

  /**
   * Remove a callback for events
   */
  removeEventCallback(callback: EventCallback): void {
    this.eventCallbacks = this.eventCallbacks.filter((cb) => cb !== callback);
  }

  /**
   * Track page view
   */
  trackPageView(path: string, title?: string): void {
    this.track(Analytics.EVENTS.PAGE_VIEW, {
      path,
      title: title || document.title,
      referrer: document.referrer,
    });
  }

  /**
   * Track project events
   */
  trackProjectCreated(projectId: string, templateId?: string): void {
    this.track(Analytics.EVENTS.PROJECT_CREATED, {
      projectId,
      templateId,
    });
  }

  trackProjectSaved(projectId: string, changeCount?: number): void {
    this.track(Analytics.EVENTS.PROJECT_SAVED, {
      projectId,
      changeCount,
    });
  }

  trackProjectPublished(projectId: string): void {
    this.track(Analytics.EVENTS.PROJECT_PUBLISHED, {
      projectId,
    });
  }

  /**
   * Track component events
   */
  trackComponentAdded(componentType: string, projectId: string): void {
    this.track(Analytics.EVENTS.COMPONENT_ADDED, {
      componentType,
      projectId,
    });
  }

  trackComponentRemoved(componentType: string, projectId: string): void {
    this.track(Analytics.EVENTS.COMPONENT_REMOVED, {
      componentType,
      projectId,
    });
  }

  trackComponentModified(
    componentType: string,
    projectId: string,
    changeType: string
  ): void {
    this.track(Analytics.EVENTS.COMPONENT_MODIFIED, {
      componentType,
      projectId,
      changeType,
    });
  }

  /**
   * Track export events
   */
  trackExportStarted(projectId: string, exportType: string): void {
    this.track(Analytics.EVENTS.EXPORT_STARTED, {
      projectId,
      exportType,
    });
  }

  trackExportCompleted(
    projectId: string,
    exportType: string,
    duration: number
  ): void {
    this.track(Analytics.EVENTS.EXPORT_COMPLETED, {
      projectId,
      exportType,
      duration,
    });
  }

  /**
   * Track user events
   */
  trackUserRegistered(userId: string, plan?: string): void {
    this.track(Analytics.EVENTS.USER_REGISTERED, {
      userId,
      plan,
    });
  }

  trackUserLoggedIn(userId: string): void {
    this.track(Analytics.EVENTS.USER_LOGGED_IN, {
      userId,
    });
  }

  trackUserLoggedOut(userId: string): void {
    this.track(Analytics.EVENTS.USER_LOGGED_OUT, {
      userId,
    });
  }

  /**
   * Track subscription events
   */
  trackSubscriptionChanged(
    userId: string,
    oldPlan: string,
    newPlan: string
  ): void {
    this.track(Analytics.EVENTS.SUBSCRIPTION_CHANGED, {
      userId,
      oldPlan,
      newPlan,
    });
  }

  /**
   * Track errors
   */
  trackError(error: Error, context?: Record<string, any>): void {
    this.track(Analytics.EVENTS.ERROR_OCCURRED, {
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
      context,
    });
  }

  /**
   * Enable/disable debug mode
   */
  setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Setup analytics providers
   */
  private setupProviders(providers: string[]): void {
    // Implementation would initialize and configure external analytics providers
    // such as Google Analytics, Mixpanel, etc.

    if (this.debugMode) {
      console.log("Setting up analytics providers:", providers);
    }

    // Example implementation for common providers would go here
  }

  /**
   * Setup automatic event tracking
   */
  private setupAutomaticTracking(): void {
    if (typeof window === "undefined") {
      return;
    }

    // Track page views automatically
    window.addEventListener("popstate", () => {
      this.trackPageView(window.location.pathname);
    });

    // Track errors automatically
    window.addEventListener("error", (event) => {
      this.trackError(event.error, {
        source: event.filename,
        line: event.lineno,
        column: event.colno,
      });
    });

    // Track unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.trackError(new Error(String(event.reason)), {
        type: "unhandledRejection",
      });
    });
  }

  /**
   * Send event data to server-side analytics endpoint
   */
  private sendToServer(eventName: string, data: EventData): void {
    // Implementation would send data to a server-side endpoint
    // This is a placeholder for actual implementation

    if (typeof window === "undefined") {
      return;
    }

    // Example implementation using fetch
    /*
    fetch('/api/analytics/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: eventName,
        data,
      }),
      // Using keepalive to ensure the request completes even if the page is unloading
      keepalive: true,
    }).catch(error => {
      if (this.debugMode) {
        console.error('Failed to send analytics to server:', error);
      }
    });
    */
  }
}

// Export singleton instance
export default Analytics.getInstance();

// Export event constants
export const AnalyticsEvents = Analytics.EVENTS;
