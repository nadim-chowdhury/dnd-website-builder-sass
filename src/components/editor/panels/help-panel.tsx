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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface HelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpPanel: React.FC<HelpPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 z-50 h-screen w-96 bg-background border-l shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Help & Documentation</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="p-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Welcome to the Website Builder</CardTitle>
              <CardDescription>
                Learn how to build your website easily
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This drag-and-drop website builder allows you to create
                professional websites without any coding knowledge. Simply drag
                components from the left sidebar and drop them onto the canvas.
              </p>
              <p>
                Get started by exploring the components in the left sidebar and
                customizing them using the properties panel on the right.
              </p>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="adding-components">
              <AccordionTrigger>Adding Components</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">To add components to your page:</p>
                <ol className="list-decimal pl-4 space-y-2">
                  <li>Find a component in the left sidebar</li>
                  <li>Drag it onto the canvas</li>
                  <li>Adjust its properties in the right sidebar</li>
                </ol>
                <p className="mt-2">
                  You can add text, images, buttons, forms, and many other
                  elements from the component library.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="editing-components">
              <AccordionTrigger>Editing Components</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">To edit a component:</p>
                <ol className="list-decimal pl-4 space-y-2">
                  <li>Click on the component to select it</li>
                  <li>
                    Use the properties panel on the right to customize its
                    appearance
                  </li>
                  <li>
                    For text components, click directly on the text to edit it
                  </li>
                </ol>
                <p className="mt-2">
                  You can change colors, sizes, fonts, alignments, and more from
                  the properties panel.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="layouts">
              <AccordionTrigger>Working with Layouts</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Layouts help you structure your page:</p>
                <ol className="list-decimal pl-4 space-y-2">
                  <li>
                    Add container components like &quot;Section&quot; or
                    &quot;Grid&quot;
                  </li>
                  <li>Drag components into these containers</li>
                  <li>
                    Use the properties panel to adjust spacing and alignment
                  </li>
                </ol>
                <p className="mt-2">
                  Layouts automatically adjust to different screen sizes, making
                  your website responsive.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="styles">
              <AccordionTrigger>Styling Your Website</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">You can easily style your website:</p>
                <ol className="list-decimal pl-4 space-y-2">
                  <li>Set global styles in the Settings panel</li>
                  <li>
                    Apply component-specific styles using the properties panel
                  </li>
                  <li>Use predefined style presets from the Styles tab</li>
                </ol>
                <p className="mt-2">
                  You can also add custom CSS in the Advanced tab of the
                  Settings panel.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="publishing">
              <AccordionTrigger>Publishing Your Website</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">To publish your website:</p>
                <ol className="list-decimal pl-4 space-y-2">
                  <li>
                    Click the &quot;Publish&quot; button in the top toolbar
                  </li>
                  <li>Choose your publishing options</li>
                  <li>Click &quot;Publish&quot; to make your website live</li>
                </ol>
                <p className="mt-2">
                  You can also export your website code using the Export panel.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shortcuts">
              <AccordionTrigger>Keyboard Shortcuts</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Ctrl+S</div>
                  <div>Save project</div>
                  <div className="font-medium">Ctrl+Z</div>
                  <div>Undo</div>
                  <div className="font-medium">Ctrl+Shift+Z</div>
                  <div>Redo</div>
                  <div className="font-medium">Delete</div>
                  <div>Delete selected component</div>
                  <div className="font-medium">Ctrl+D</div>
                  <div>Duplicate selected component</div>
                  <div className="font-medium">Ctrl+P</div>
                  <div>Preview website</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                If you need further assistance, check out these resources:
              </p>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    Video Tutorials
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    Documentation
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    Contact Support
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HelpPanel;
