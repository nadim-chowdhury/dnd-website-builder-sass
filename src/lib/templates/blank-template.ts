export function createBlankTemplate() {
  return {
    version: "1.0",
    metadata: {
      name: "Blank Template",
      description: "A blank starting template",
      createdAt: new Date().toISOString(),
    },
    pages: [
      {
        id: "page-1",
        name: "Home",
        path: "/",
        isHome: true,
        components: [
          {
            id: "root-container",
            type: "container",
            props: {
              style: {
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
              },
            },
            children: [
              {
                id: "welcome-heading",
                type: "heading",
                props: {
                  level: 1,
                  children: "Welcome to your new project",
                  style: {
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  },
                },
              },
              {
                id: "welcome-paragraph",
                type: "paragraph",
                props: {
                  children:
                    "Start building your project by adding components from the left sidebar.",
                  style: {
                    textAlign: "center",
                    maxWidth: "600px",
                    marginBottom: "2rem",
                  },
                },
              },
            ],
          },
        ],
        styles: {
          global: {
            body: {
              fontFamily: "sans-serif",
              margin: 0,
              padding: 0,
            },
          },
        },
      },
    ],
    assets: [],
    settings: {
      theme: {
        colors: {
          primary: "#3B82F6",
          secondary: "#10B981",
          background: "#FFFFFF",
          text: "#1F2937",
        },
        typography: {
          fontFamily: "system-ui, sans-serif",
          baseSize: "16px",
        },
        spacing: {
          unit: "1rem",
        },
      },
      seo: {
        title: "New Project",
        description: "Created with the site builder",
      },
    },
  };
}

// src/lib/templates/blank-template.ts

{% comment %} import { v4 as uuidv4 } from "uuid";

/**
 * Creates a blank template with minimal components
 */
export const createBlankTemplate = () => {
  // Generate unique IDs for components
  const rootContainerId = uuidv4();
  const headingId = uuidv4();
  const paragraphId = uuidv4();
  const buttonId = uuidv4();

  return {
    name: "Blank Template",
    description: "A minimal starting point for your project",
    thumbnail: "/templates/blank.png",
    components: {
      [rootContainerId]: {
        id: rootContainerId,
        type: "Container",
        name: "Main Container",
        parentId: null,
        order: 0,
        props: {
          maxWidth: "lg",
          padding: "2rem",
          centered: true,
        },
        children: [headingId, paragraphId, buttonId],
      },
      [headingId]: {
        id: headingId,
        type: "Heading",
        name: "Heading",
        parentId: rootContainerId,
        order: 0,
        props: {
          content: "Welcome to your new website",
          level: "h1",
          className: "text-3xl font-bold mb-4",
        },
      },
      [paragraphId]: {
        id: paragraphId,
        type: "Text",
        name: "Paragraph",
        parentId: rootContainerId,
        order: 1,
        props: {
          content: "Start building your page by dragging components from the sidebar.",
          className: "text-lg mb-6",
        },
      },
      [buttonId]: {
        id: buttonId,
        type: "Button",
        name: "Button",
        parentId: rootContainerId,
        order: 2,
        props: {
          content: "Get Started",
          variant: "primary",
          size: "lg",
        },
      },
    },
  };
}; {% endcomment %}