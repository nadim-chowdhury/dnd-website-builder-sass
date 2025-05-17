import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ComponentBrowser } from "./component-browser";
import { ComponentSearch } from "./component-search";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Layers, Settings, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorState } from "@/hooks/use-editor-state";

type LeftSidebarProps = {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
};

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  collapsed = false,
  onToggleCollapse,
  className,
}) => {
  const [activeTab, setActiveTab] = useState("components");
  const [searchQuery, setSearchQuery] = useState("");
  const { isEditing } = useEditorState();

  // Handle search input changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div
      className={cn(
        "flex flex-col border-r border-border bg-background transition-all duration-300",
        collapsed ? "w-12" : "w-64",
        className
      )}
    >
      {collapsed ? (
        <div className="flex flex-col items-center py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="mb-4"
          >
            <PanelLeft size={20} />
          </Button>
          <Separator className="my-2" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (onToggleCollapse) onToggleCollapse();
              setActiveTab("components");
            }}
          >
            <Layers size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (onToggleCollapse) onToggleCollapse();
              setActiveTab("layers");
            }}
          >
            <Settings size={20} />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-sm font-medium">Editor Tools</h2>
            <Button variant="ghost" size="icon" onClick={onToggleCollapse}>
              <ChevronLeft size={18} />
            </Button>
          </div>

          <ComponentSearch
            onSearch={handleSearchChange}
            query={searchQuery}
            className="px-3 py-2"
          />

          <div className="flex-1 overflow-hidden">
            <Tabs
              defaultValue="components"
              value={activeTab}
              onValueChange={setActiveTab}
              className="h-full flex flex-col"
            >
              <TabsList className="grid grid-cols-2 mx-3 my-2">
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="layers">Layers</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="components" className="h-full mt-0 p-0">
                  <ScrollArea className="h-full">
                    <ComponentBrowser searchQuery={searchQuery} />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="layers" className="h-full mt-0 p-0">
                  <ScrollArea className="h-full">
                    <div className="p-4">
                      <h3 className="mb-2 text-sm font-medium">
                        Page Structure
                      </h3>
                      {/* TODO: Implement layer/structure navigator */}
                      <div className="text-sm text-muted-foreground">
                        Component hierarchy will be displayed here
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftSidebar;
