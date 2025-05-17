import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpPanel: React.FC<HelpPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 z-50 h-screen w-80 bg-background border-l shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Help Center</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="p-4">
          <Tabs defaultValue="basics">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
            </TabsList>

            <TabsContent value="basics" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>
                    Learn the basics of using the website builder
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How to add components</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Browse components in the left sidebar and drag them
                          onto the canvas. You can also use the search function
                          to find specific components.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>Editing content</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Click on any component to select it. Use the right
                          sidebar to edit its content and properties. For text
                          components, you can also double-click to edit directly
                          on the canvas.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>Saving your work</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Your work is automatically saved as you make changes.
                          You can also manually save by clicking the Save button
                          in the toolbar. To publish your site, use the Publish
                          button.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="components" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Component Guide</CardTitle>
                  <CardDescription>
                    Learn about available components
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="layout">
                      <AccordionTrigger>Layout Components</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Section:</strong> Container for organizing
                          content into rows.
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Container:</strong> Wrapper with adjustable
                          width and alignment.
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Grid:</strong> Responsive grid layout for
                          columns.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Column:</strong> Vertical stack within grid or
                          section.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="elements">
                      <AccordionTrigger>Basic Elements</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Heading:</strong> H1-H6 text headings.
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Text:</strong> Paragraph text with formatting
                          options.
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Button:</strong> Interactive button with
                          customizable styles.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Image:</strong> Responsive image with alt text
                          support.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="forms">
                      <AccordionTrigger>Form Components</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Form:</strong> Container for form elements.
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Input:</strong> Text field with validation
                          options.
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Textarea:</strong> Multi-line text input.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Submit Button:</strong> Form submission
                          button.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shortcuts" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Keyboard Shortcuts</CardTitle>
                  <CardDescription>Speed up your workflow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Save</span>
                      <kbd className="bg-muted px-2 py-1 text-xs rounded">
                        Ctrl + S
                      </kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Undo</span>
                      <kbd className="bg-muted px-2 py-1 text-xs rounded">
                        Ctrl + Z
                      </kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Redo</span>
                      <kbd className="bg-muted px-2 py-1 text-xs rounded">
                        Ctrl + Y
                      </kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Delete selected</span>
                      <kbd className="bg-muted px-2 py-1 text-xs rounded">
                        Delete
                      </kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Duplicate selected</span>
                      <kbd className="bg-muted px-2 py-1 text-xs rounded">
                        Ctrl + D
                      </kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Copy selected</span>
                      <kbd className="bg-muted px-2 py-1 text-xs rounded">
                        Ctrl + C
                      </kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Paste</span>
                      <kbd className="bg-muted px-2 py-1 text-xs rounded">
                        Ctrl + V
                      </kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Select all</span>
                      <kbd className="bg-muted px-2 py-1 text-xs rounded">
                        Ctrl + A
                      </kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Preview</span>
                      <kbd className="bg-muted px-2 py-1 text-xs rounded">
                        Ctrl + P
                      </kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Toggle help</span>
                      <kbd className="bg-muted px-2 py-1 text-xs rounded">
                        F1
                      </kbd>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Need more help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Check out our comprehensive documentation or contact support.
                </p>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full">
                    Documentation
                  </Button>
                  <Button variant="outline" className="w-full">
                    Video Tutorials
                  </Button>
                  <Button variant="default" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HelpPanel;
