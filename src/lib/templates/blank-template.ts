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
