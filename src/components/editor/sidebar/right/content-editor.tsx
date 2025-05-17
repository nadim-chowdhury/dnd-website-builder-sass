import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectSelectedComponent } from "@/redux/selectors/builder-selectors";
import { updateComponentContent } from "@/redux/slices/builderSlice";
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
import { ColorPicker } from "./controls/color-control";

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
    if (selectedComponent && selectedComponent.content) {
      setContentValues({
        text: selectedComponent.content.text || "",
        alt: selectedComponent.content.alt || "",
        href: selectedComponent.content.href || "",
        src: selectedComponent.content.src || "",
        title: selectedComponent.content.title || "",
      });
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

    // Dispatch action to update component content
    dispatch(
      updateComponentContent({
        id: selectedComponent.id,
        content: { ...selectedComponent.content, [field]: value },
      })
    );
  };

  // Determine which fields to show based on component type
  const showTextField =
    selectedComponent.type === "heading" ||
    selectedComponent.type === "text" ||
    selectedComponent.type === "button";

  const showImageFields = selectedComponent.type === "image";
  const showLinkFields =
    selectedComponent.type === "button" || selectedComponent.type === "link";
  const showVideoFields = selectedComponent.type === "video";

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
                {selectedComponent.type === "text" ||
                selectedComponent.type === "heading" ? (
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
                    <Toggle aria-label="Toggle bold">
                      <Bold className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Toggle italic">
                      <Italic className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Toggle underline">
                      <Underline className="h-4 w-4" />
                    </Toggle>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Alignment</Label>
                  <div className="flex gap-2">
                    <Toggle aria-label="Align left">
                      <AlignLeft className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Align center">
                      <AlignCenter className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Align right">
                      <AlignRight className="h-4 w-4" />
                    </Toggle>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Font</Label>
                  <FontSelect
                    value={selectedComponent.styles?.fontFamily || "Inter"}
                    onChange={(value) => {
                      // Dispatch action to update font family
                    }}
                  />
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <ColorPicker
                    color={selectedComponent.styles?.color || "#000000"}
                    onChange={(color) => {
                      // Dispatch action to update text color
                    }}
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
