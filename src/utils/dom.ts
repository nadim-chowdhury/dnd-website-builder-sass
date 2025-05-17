/**
 * Get element by ID with type safety
 */
export const getElement = <T extends HTMLElement>(id: string): T | null => {
  return document.getElementById(id) as T | null;
};

/**
 * Get element by selector with type safety
 */
export const querySelector = <T extends HTMLElement>(
  selector: string
): T | null => {
  return document.querySelector(selector) as T | null;
};

/**
 * Get all elements by selector with type safety
 */
export const querySelectorAll = <T extends HTMLElement>(
  selector: string
): T[] => {
  return Array.from(document.querySelectorAll(selector)) as T[];
};

/**
 * Create an element with type safety
 */
export const createElement = <T extends HTMLElement>(
  tagName: string,
  attributes: Record<string, string> = {},
  children: (string | Node)[] = []
): T => {
  const element = document.createElement(tagName) as T;

  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  // Append children
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
};

/**
 * Add event listener with type safety
 */
export const addEventListener = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): void => {
  element.addEventListener(type, listener, options);
};

/**
 * Remove event listener with type safety
 */
export const removeEventListener = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | EventListenerOptions
): void => {
  element.removeEventListener(type, listener, options);
};

/**
 * Get element position and dimensions
 */
export const getElementRect = (element: HTMLElement): DOMRect => {
  return element.getBoundingClientRect();
};

/**
 * Get element's computed style
 */
export const getComputedStyle = (
  element: HTMLElement,
  property: string
): string => {
  return window.getComputedStyle(element).getPropertyValue(property);
};

/**
 * Set styles on an element
 */
export const setStyles = (
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
): void => {
  Object.entries(styles).forEach(([key, value]) => {
    // @ts-ignore - CSSStyleDeclaration keys typing issue
    element.style[key] = value;
  });
};

/**
 * Check if element is visible in viewport
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Get scroll position
 */
export const getScrollPosition = (): { x: number; y: number } => {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
};

/**
 * Scroll to element
 */
export const scrollToElement = (
  element: HTMLElement,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" }
): void => {
  element.scrollIntoView(options);
};

/**
 * Get distance between two elements
 */
export const getElementsDistance = (
  element1: HTMLElement,
  element2: HTMLElement
): number => {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  const dx = rect1.left - rect2.left;
  const dy = rect1.top - rect2.top;

  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Check if element contains point (x, y)
 */
export const elementContainsPoint = (
  element: HTMLElement,
  x: number,
  y: number
): boolean => {
  const rect = element.getBoundingClientRect();

  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
};

/**
 * Get element at point (x, y)
 */
export const getElementAtPoint = <T extends HTMLElement>(
  x: number,
  y: number
): T | null => {
  return document.elementFromPoint(x, y) as T | null;
};

/**
 * Find closest element matching selector
 */
export const closest = <T extends HTMLElement>(
  element: HTMLElement,
  selector: string
): T | null => {
  return element.closest(selector) as T | null;
};

/**
 * Get parent element with type safety
 */
export const getParentElement = <T extends HTMLElement>(
  element: HTMLElement
): T | null => {
  return element.parentElement as T | null;
};

/**
 * Insert element after reference node
 */
export const insertAfter = (newNode: Node, referenceNode: Node): void => {
  if (referenceNode.parentNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
};

/**
 * Remove all children from an element
 */
export const removeAllChildren = (element: HTMLElement): void => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

/**
 * Create and dispatch a custom event
 */
export const dispatchCustomEvent = <T>(
  element: HTMLElement,
  eventName: string,
  detail: T
): boolean => {
  const event = new CustomEvent(eventName, {
    detail,
    bubbles: true,
    cancelable: true,
  });
  return element.dispatchEvent(event);
};

/**
 * Toggle class on element
 */
export const toggleClass = (
  element: HTMLElement,
  className: string
): boolean => {
  return element.classList.toggle(className);
};

/**
 * Check if element has class
 */
export const hasClass = (element: HTMLElement, className: string): boolean => {
  return element.classList.contains(className);
};

/**
 * Add class to element
 */
export const addClass = (element: HTMLElement, className: string): void => {
  element.classList.add(className);
};

/**
 * Remove class from element
 */
export const removeClass = (element: HTMLElement, className: string): void => {
  element.classList.remove(className);
};
