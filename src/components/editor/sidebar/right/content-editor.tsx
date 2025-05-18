import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectSelectedComponent } from "@/redux/selectors/builder-selectors";
import { updateComponent } from "@/redux/slices/builderSlice";
// Import the missing ComponentType enum
import { Component, ComponentType } from "@/types/components";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Link,
  ImageIcon,
  FileIcon,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { FontSelect } from "./controls/font-control";
import ColorPicker from "./controls/color-control";

interface ContentEditorProps {
  className?: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ className }) => {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(selectSelectedComponent);
  const [activeTab, setActiveTab] = useState("text");
  const [contentValues, setContentValues] = useState<Record<string, any>>({
    text: "",
    alt: "",
    href: "",
    src: "",
    title: "",
  });

  useEffect(() => {
    if (selectedComponent) {
      // Extract content values from props or directly from component fields
      const content = {
        text: selectedComponent.props?.text || "",
        alt: selectedComponent.props?.alt || "",
        href: selectedComponent.props?.href || "",
        src: selectedComponent.props?.src || "",
        title: selectedComponent.props?.title || "",
      };
      setContentValues(content);
    }
  }, [selectedComponent]);

  if (!selectedComponent) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Content Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground p-4">
            Select a component to edit its content
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleContentChange = (field: string, value: string) => {
    const updatedValues = { ...contentValues, [field]: value };
    setContentValues(updatedValues);

    // Dispatch action to update component props instead of content
    dispatch(
      updateComponent({
        id: selectedComponent.id,
        changes: {
          props: { ...selectedComponent.props, [field]: value },
        },
      })
    );
  };

  // Handle style change for formatting tab
  const handleStyleChange = (property: string, value: any) => {
    dispatch(
      updateComponent({
        id: selectedComponent.id,
        changes: {
          styles: { ...selectedComponent.styles, [property]: value },
        },
      })
    );
  };

  // Determine which fields to show based on component type
  // Fix: Use the proper ComponentType enum for comparison
  const showTextField =
    selectedComponent.type === ComponentType.HEADING ||
    selectedComponent.type === ComponentType.TEXT ||
    selectedComponent.type === ComponentType.BUTTON;

  const showImageFields = selectedComponent.type === ComponentType.IMAGE;

  const showLinkFields =
    selectedComponent.type === ComponentType.BUTTON ||
    selectedComponent.type === ComponentType.LINK;

  const showVideoFields = selectedComponent.type === ComponentType.VIDEO;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Content Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Content</TabsTrigger>
            <TabsTrigger value="formatting">Formatting</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4 pt-4">
            {showTextField && (
              <div className="space-y-2">
                <Label htmlFor="text-content">Text Content</Label>
                {selectedComponent.type === ComponentType.TEXT ||
                selectedComponent.type === ComponentType.HEADING ? (
                  <Textarea
                    id="text-content"
                    value={contentValues.text}
                    onChange={(e) =>
                      handleContentChange("text", e.target.value)
                    }
                    rows={4}
                    placeholder="Enter text content..."
                  />
                ) : (
                  <Input
                    id="text-content"
                    value={contentValues.text}
                    onChange={(e) =>
                      handleContentChange("text", e.target.value)
                    }
                    placeholder="Enter text content..."
                  />
                )}
              </div>
            )}

            {showImageFields && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="image-src">Image Source</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="image-src"
                      value={contentValues.src}
                      onChange={(e) =>
                        handleContentChange("src", e.target.value)
                      }
                      placeholder="Enter image URL..."
                    />
                    <Button size="icon" variant="outline">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image-alt">Alt Text</Label>
                  <Input
                    id="image-alt"
                    value={contentValues.alt}
                    onChange={(e) => handleContentChange("alt", e.target.value)}
                    placeholder="Enter alt text..."
                  />
                </div>
              </>
            )}

            {showLinkFields && (
              <div className="space-y-2">
                <Label htmlFor="link-href">Link URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="link-href"
                    value={contentValues.href}
                    onChange={(e) =>
                      handleContentChange("href", e.target.value)
                    }
                    placeholder="Enter URL..."
                  />
                  <Button size="icon" variant="outline">
                    <Link className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {showVideoFields && (
              <div className="space-y-2">
                <Label htmlFor="video-src">Video Source</Label>
                <div className="flex space-x-2">
                  <Input
                    id="video-src"
                    value={contentValues.src}
                    onChange={(e) => handleContentChange("src", e.target.value)}
                    placeholder="Enter video URL..."
                  />
                  <Button size="icon" variant="outline">
                    <FileIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="component-title">Title/Tooltip</Label>
              <Input
                id="component-title"
                value={contentValues.title}
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Enter title or tooltip..."
              />
            </div>
          </TabsContent>

          <TabsContent value="formatting" className="space-y-4 pt-4">
            {showTextField && (
              <>
                <div className="space-y-2">
                  <Label>Text Formatting</Label>
                  <div className="flex flex-wrap gap-2">
                    <Toggle
                      aria-label="Toggle bold"
                      pressed={selectedComponent.styles?.fontWeight === "bold"}
                      onPressedChange={(pressed) =>
                        handleStyleChange(
                          "fontWeight",
                          pressed ? "bold" : "normal"
                        )
                      }
                    >
                      <Bold className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                      aria-label="Toggle italic"
                      pressed={selectedComponent.styles?.fontStyle === "italic"}
                      onPressedChange={(pressed) =>
                        handleStyleChange(
                          "fontStyle",
                          pressed ? "italic" : "normal"
                        )
                      }
                    >
                      <Italic className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                      aria-label="Toggle underline"
                      pressed={
                        selectedComponent.styles?.textDecoration === "underline"
                      }
                      onPressedChange={(pressed) =>
                        handleStyleChange(
                          "textDecoration",
                          pressed ? "underline" : "none"
                        )
                      }
                    >
                      <Underline className="h-4 w-4" />
                    </Toggle>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Alignment</Label>
                  <div className="flex gap-2">
                    <Toggle
                      aria-label="Align left"
                      pressed={selectedComponent.styles?.textAlign === "left"}
                      onPressedChange={() =>
                        handleStyleChange("textAlign", "left")
                      }
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                      aria-label="Align center"
                      pressed={selectedComponent.styles?.textAlign === "center"}
                      onPressedChange={() =>
                        handleStyleChange("textAlign", "center")
                      }
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                      aria-label="Align right"
                      pressed={selectedComponent.styles?.textAlign === "right"}
                      onPressedChange={() =>
                        handleStyleChange("textAlign", "right")
                      }
                    >
                      <AlignRight className="h-4 w-4" />
                    </Toggle>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Font</Label>
                  <FontSelect
                    value={selectedComponent.styles?.fontFamily || "Inter"}
                    onChange={(value) => handleStyleChange("fontFamily", value)}
                  />
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <ColorPicker
                    value={selectedComponent.styles?.color || "#000000"}
                    onChange={(color) => handleStyleChange("color", color)}
                  />
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentEditor;
