import React, { FC, useState, useEffect, createElement, useMemo } from "react";
import ErrorBoundary from "@/components/common/error-boundary";
import componentRegistry from "./component-registry";
import eventHandler from "./event-handler";
import stylingEngine from "./styling-engine";
import { ComponentInstance, ComponentProps, EditorMode } from "@/types/editor";
import { useEditorState } from "@/hooks/use-editor-state";

interface RenderComponentProps {
  componentInstance: ComponentInstance;
  parentId?: string;
  index?: number;
  mode?: EditorMode;
}

/**
 * RenderComponent handles rendering a single component
 */
export const RenderComponent: FC<RenderComponentProps> = ({
  componentInstance,
  parentId,
  index = 0,
  mode = "edit",
}) => {
  const { id, type, props, children } = componentInstance;
  const { selectedComponentId } = useEditorState();

  const registeredComponent = componentRegistry.getComponent(type);

  if (!registeredComponent) {
    console.error(`Component type "${type}" not found in registry`);
    return (
      <div className="missing-component" data-component-id={id}>
        Component "{type}" not found
      </div>
    );
  }

  // Generate styles for this component
  const styles = useMemo(() => {
    return stylingEngine.generateStyles(componentInstance);
  }, [componentInstance]);

  // Prepare component props
  const componentProps: ComponentProps = {
    ...props,
    id,
    key: id,
    className: styles.className,
    style: styles.inlineStyles,
    "data-component-id": id,
    "data-component-type": type,
    "data-parent-id": parentId,
    "data-index": index,
    isSelected: id === selectedComponentId,
    isEditing: mode === "edit",
  };

  // Add event listeners if in edit mode
  useEffect(() => {
    if (mode === "edit") {
      const onComponentSelected = () => {
        eventHandler.emit("component.selected", { id });
      };

      const element = document.querySelector(`[data-component-id="${id}"]`);
      if (element) {
        element.addEventListener("click", onComponentSelected);

        return () => {
          element.removeEventListener("click", onComponentSelected);
        };
      }
    }
  }, [id, mode]);

  // Render the component with its children
  return (
    <ErrorBoundary
      fallback={
        <div className="component-error" data-component-id={id}>
          Error rendering component
        </div>
      }
    >
      {createElement(
        registeredComponent.component,
        componentProps,
        children?.map((childInstance, childIndex) => (
          <RenderComponent
            key={childInstance.id}
            componentInstance={childInstance}
            parentId={id}
            index={childIndex}
            mode={mode}
          />
        ))
      )}
    </ErrorBoundary>
  );
};

interface RendererProps {
  components: ComponentInstance[];
  rootId?: string;
  mode?: EditorMode;
}

/**
 * Main Renderer component for the builder
 */
const Renderer: FC<RendererProps> = ({
  components,
  rootId = "root",
  mode = "edit",
}) => {
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize renderer
  useEffect(() => {
    // Emit renderer initialization event
    eventHandler.emit("renderer.init", { rootId });
    setIsInitialized(true);

    return () => {
      // Cleanup when renderer is unmounted
      eventHandler.emit("renderer.destroy", { rootId });
    };
  }, [rootId]);

  if (!isInitialized) {
    return <div className="renderer-initializing">Initializing builder...</div>;
  }

  if (!components || components.length === 0) {
    return (
      <div className="empty-canvas" data-root-id={rootId}>
        {mode === "edit" ? (
          <div className="empty-state">
            <h3>Drop components here</h3>
            <p>Drag components from the sidebar to build your page</p>
          </div>
        ) : (
          <div className="empty-state">No content to display</div>
        )}
      </div>
    );
  }

  return (
    <div className="renderer-container" data-root-id={rootId} data-mode={mode}>
      {components.map((component, index) => (
        <RenderComponent
          key={component.id}
          componentInstance={component}
          parentId={rootId}
          index={index}
          mode={mode}
        />
      ))}
    </div>
  );
};

export default Renderer;
