import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ColorControl from "./controls/color-control";
import FontControl from "./controls/font-control";
import SizeControl from "./controls/size-control";
import MarginPaddingControl from "./controls/margin-padding-control";
import AlignmentControl from "./controls/alignment-control";
import { updateComponentStyle } from "@/redux/slices/builderSlice";
import { ComponentInstance } from "@/types/components";

interface StyleEditorProps {
  component: ComponentInstance;
}

/**
 * StyleEditor handles editing of component styles including
 * colors, typography, spacing, and other visual properties
 */
const StyleEditor = ({ component }: StyleEditorProps) => {
  const dispatch = useDispatch();

  // Update a style property
  const handleStyleChange = useCallback(
    (property: string, value: any) => {
      dispatch(
        updateComponentStyle({
          componentId: component.id,
          property,
          value,
        })
      );
    },
    [dispatch, component.id]
  );

  // Get current styles with defaults
  const styles = component.styles || {};

  // Check if this component type supports styling
  // In a real app, this would be determined by the component registry
  const supportsStyles = !component.disableStyles;

  if (!supportsStyles) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>This component does not support custom styling</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Layout & Dimensions */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Layout & Dimensions</h3>

        <div className="space-y-3">
          <div>
            <Label className="text-xs mb-1 block">Width</Label>
            <SizeControl
              value={styles.width || "auto"}
              onChange={(value) => handleStyleChange("width", value)}
              options={["auto", "100%", "75%", "50%", "25%"]}
              allowCustom
            />
          </div>

          <div>
            <Label className="text-xs mb-1 block">Height</Label>
            <SizeControl
              value={styles.height || "auto"}
              onChange={(value) => handleStyleChange("height", value)}
              options={["auto", "100%", "75%", "50%", "25%"]}
              allowCustom
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Spacing */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Spacing</h3>

        <div>
          <Label className="text-xs mb-1 block">Margin</Label>
          <MarginPaddingControl
            value={styles.margin || {}}
            onChange={(value) => handleStyleChange("margin", value)}
            type="margin"
          />
        </div>

        <div>
          <Label className="text-xs mb-1 block">Padding</Label>
          <MarginPaddingControl
            value={styles.padding || {}}
            onChange={(value) => handleStyleChange("padding", value)}
            type="padding"
          />
        </div>
      </div>

      <Separator />

      {/* Typography - Only show for text-based components */}
      {component.supportsText && (
        <>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Typography</h3>

            <div className="space-y-3">
              <FontControl
                value={styles.font || {}}
                onChange={(value) => handleStyleChange("font", value)}
              />
            </div>

            <div>
              <Label className="text-xs mb-1 block">Text Alignment</Label>
              <AlignmentControl
                value={styles.textAlign || "left"}
                onChange={(value) => handleStyleChange("textAlign", value)}
                type="text"
              />
            </div>
          </div>

          <Separator />
        </>
      )}

      {/* Colors */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Colors</h3>

        <div className="space-y-3">
          <div>
            <Label className="text-xs mb-1 block">Background Color</Label>
            <ColorControl
              value={styles.backgroundColor || "transparent"}
              onChange={(value) => handleStyleChange("backgroundColor", value)}
              showTransparent
            />
          </div>

          {component.supportsText && (
            <div>
              <Label className="text-xs mb-1 block">Text Color</Label>
              <ColorControl
                value={styles.color || "#000000"}
                onChange={(value) => handleStyleChange("color", value)}
              />
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Border */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Border</h3>

        <div className="space-y-3">
          <div>
            <Label className="text-xs mb-1 block">Border Color</Label>
            <ColorControl
              value={styles.borderColor || "#000000"}
              onChange={(value) => handleStyleChange("borderColor", value)}
              showTransparent
            />
          </div>

          <div>
            <Label className="text-xs mb-1 block">Border Width</Label>
            <SizeControl
              value={styles.borderWidth || "0px"}
              onChange={(value) => handleStyleChange("borderWidth", value)}
              options={["0px", "1px", "2px", "4px"]}
              allowCustom
            />
          </div>

          <div>
            <Label className="text-xs mb-1 block">Border Radius</Label>
            <SizeControl
              value={styles.borderRadius || "0px"}
              onChange={(value) => handleStyleChange("borderRadius", value)}
              options={["0px", "4px", "8px", "16px", "9999px"]}
              allowCustom
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleEditor;
