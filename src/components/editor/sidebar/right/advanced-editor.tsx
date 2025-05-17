import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { Monaco } from "@monaco-editor/react";
import dynamic from "next/dynamic";
import { selectSelectedComponentId } from "@/redux/selectors/builder-selectors";
import { Loader2 } from "lucide-react";

// Dynamically import the Monaco editor to reduce initial bundle size
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
    </div>
  ),
});

interface AdvancedEditorProps {
  className?: string;
}

const AdvancedEditor: React.FC<AdvancedEditorProps> = ({ className }) => {
  const selectedComponentId = useSelector(selectSelectedComponentId);
  const [activeTab, setActiveTab] = useState<"json" | "css" | "custom">("json");
  const [jsonValue, setJsonValue] = useState<string>("{}");
  const [cssValue, setCssValue] = useState<string>("");
  const [customValue, setCustomValue] = useState<string>("");

  // If no component is selected, show a placeholder
  if (!selectedComponentId) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Advanced Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground p-4">
            Select a component to edit its advanced properties
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleEditorChange = (
    value: string | undefined,
    type: "json" | "css" | "custom"
  ) => {
    if (!value) return;

    switch (type) {
      case "json":
        setJsonValue(value);
        break;
      case "css":
        setCssValue(value);
        break;
      case "custom":
        setCustomValue(value);
        break;
    }

    // Here you would typically dispatch an action to update the component
    // dispatch(updateComponentAdvancedSettings({ id: selectedComponentId, type, value }));
  };

  const handleEditorMount = (editor: any, monaco: Monaco) => {
    // You can configure the editor here
    editor.focus();
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Advanced Editor</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "json" | "css" | "custom")}
        >
          <TabsList className="w-full">
            <TabsTrigger value="json" className="flex-1">
              JSON
            </TabsTrigger>
            <TabsTrigger value="css" className="flex-1">
              CSS
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex-1">
              Custom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="json" className="mt-0">
            <MonacoEditor
              height="300px"
              language="json"
              value={jsonValue}
              theme="vs-dark"
              onChange={(value) => handleEditorChange(value, "json")}
              onMount={handleEditorMount}
              options={{
                minimap: { enabled: false },
                automaticLayout: true,
                formatOnPaste: true,
                formatOnType: true,
              }}
            />
          </TabsContent>

          <TabsContent value="css" className="mt-0">
            <MonacoEditor
              height="300px"
              language="css"
              value={cssValue}
              theme="vs-dark"
              onChange={(value) => handleEditorChange(value, "css")}
              options={{
                minimap: { enabled: false },
                automaticLayout: true,
              }}
            />
          </TabsContent>

          <TabsContent value="custom" className="mt-0">
            <MonacoEditor
              height="300px"
              language="javascript"
              value={customValue}
              theme="vs-dark"
              onChange={(value) => handleEditorChange(value, "custom")}
              options={{
                minimap: { enabled: false },
                automaticLayout: true,
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedEditor;
