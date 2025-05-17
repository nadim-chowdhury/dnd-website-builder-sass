import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateComponentProperty } from "@/redux/slices/builderSlice";
import { ComponentInstance } from "@/types/components";

interface PropertyEditorProps {
  component: ComponentInstance;
}

/**
 * PropertyEditor handles editing of component properties
 * based on the component's schema
 */
const PropertyEditor = ({ component }: PropertyEditorProps) => {
  const dispatch = useDispatch();

  // Get the schema for this component type
  // In a real app, this would come from component registry
  const propertySchema = component.propertySchema || [];

  // Update a property value
  const handlePropertyChange = useCallback(
    (propertyName: string, value: any) => {
      dispatch(
        updateComponentProperty({
          componentId: component.id,
          property: propertyName,
          value,
        })
      );
    },
    [dispatch, component.id]
  );

  // Render controls based on property type
  const renderPropertyControl = useCallback(
    (property: any) => {
      const currentValue =
        component.properties?.[property.name] ?? property.defaultValue;

      switch (property.type) {
        case "string":
          return (
            <Input
              id={`property-${property.name}`}
              value={currentValue || ""}
              onChange={(e) =>
                handlePropertyChange(property.name, e.target.value)
              }
              placeholder={property.placeholder || ""}
            />
          );

        case "number":
          return (
            <Input
              id={`property-${property.name}`}
              type="number"
              value={currentValue || 0}
              onChange={(e) =>
                handlePropertyChange(property.name, Number(e.target.value))
              }
              placeholder={property.placeholder || ""}
            />
          );

        case "boolean":
          return (
            <Switch
              id={`property-${property.name}`}
              checked={!!currentValue}
              onCheckedChange={(checked) =>
                handlePropertyChange(property.name, checked)
              }
            />
          );

        case "select":
          return (
            <Select
              value={currentValue || ""}
              onValueChange={(value) =>
                handlePropertyChange(property.name, value)
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={property.placeholder || "Select option"}
                />
              </SelectTrigger>
              <SelectContent>
                {property.options?.map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );

        default:
          return (
            <div className="text-sm text-muted-foreground">
              Unsupported property type: {property.type}
            </div>
          );
      }
    },
    [component.properties, handlePropertyChange]
  );

  if (!propertySchema || propertySchema.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No editable properties available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {propertySchema.map((property: any, index: number) => (
        <div key={property.name}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={`property-${property.name}`} className="text-sm">
                {property.label || property.name}
              </Label>

              {property.documentation && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  title={property.documentation}
                >
                  <span className="text-xs">?</span>
                </Button>
              )}
            </div>

            {renderPropertyControl(property)}

            {property.description && (
              <p className="text-xs text-muted-foreground">
                {property.description}
              </p>
            )}
          </div>

          {index < propertySchema.length - 1 && <Separator className="my-3" />}
        </div>
      ))}
    </div>
  );
};

export default PropertyEditor;
