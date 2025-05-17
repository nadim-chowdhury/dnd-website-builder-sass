import { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import PropertyEditor from "./property-editor";
import StyleEditor from "./style-editor";
import ContentEditor from "./content-editor";
import AdvancedEditor from "./advanced-editor";
import { selectSelectedComponent } from "@/redux/selectors/builder-selectors";

/**
 * Right sidebar that contains editors for the selected component's
 * properties, styles, content, and advanced settings
 */
const RightSidebar = () => {
  const [activeTab, setActiveTab] = useState("properties");
  const selectedComponent = useSelector(selectSelectedComponent);

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col bg-background border-l">
        <div className="p-4 text-center text-muted-foreground">
          <p>No component selected</p>
          <p className="text-sm mt-2">
            Select a component on the canvas to edit its properties
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background border-l">
      <div className="p-3 border-b">
        <h2 className="text-lg font-semibold mb-2">
          {selectedComponent.name || "Component"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {selectedComponent.type}
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid grid-cols-4 px-2">
          <TabsTrigger value="properties">Props</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="properties" className="p-3 mt-0">
            <PropertyEditor component={selectedComponent} />
          </TabsContent>

          <TabsContent value="style" className="p-3 mt-0">
            <StyleEditor component={selectedComponent} />
          </TabsContent>

          <TabsContent value="content" className="p-3 mt-0">
            <ContentEditor component={selectedComponent} />
          </TabsContent>

          <TabsContent value="advanced" className="p-3 mt-0">
            <AdvancedEditor component={selectedComponent} />
          </TabsContent>
        </ScrollArea>
      </Tabs>

      <Separator />

      <div className="p-3 text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>ID: {selectedComponent.id}</span>
          <span>Type: {selectedComponent.type}</span>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
