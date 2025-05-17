import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  X,
  ExternalLink,
  Smartphone,
  Tablet,
  Monitor,
  RefreshCw,
} from "lucide-react";
import { useResponsivePreview } from "@/hooks/use-responsive-preview";
import { selectBuilderState } from "@/redux/selectors/builder-selectors";

interface PreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const [loading, setLoading] = useState(true);
  const { device, setDevice } = useResponsivePreview();
  const builderState = useSelector(selectBuilderState);

  // Generate a preview URL with a timestamp to prevent caching
  const previewUrl = `/preview/${projectId}?t=${Date.now()}`;

  const handleRefresh = useCallback(() => {
    setLoading(true);
  }, []);

  const handleIframeLoad = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
    }
  }, [isOpen, device]);

  if (!isOpen) return null;

  const getDeviceWidth = () => {
    switch (device) {
      case "mobile":
        return "w-[375px]";
      case "tablet":
        return "w-[768px]";
      case "desktop":
      default:
        return "w-full";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4">
      <div className="bg-background border rounded-lg shadow-lg w-full h-full max-w-7xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Preview</h2>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              title="Refresh preview"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(`/preview/${projectId}`, "_blank")}
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 border-b">
          <Tabs
            defaultValue="desktop"
            value={device}
            onValueChange={(value) =>
              setDevice(value as "desktop" | "tablet" | "mobile")
            }
          >
            <TabsList className="grid w-60 grid-cols-3">
              <TabsTrigger value="desktop">
                <Monitor className="h-4 w-4 mr-2" />
                Desktop
              </TabsTrigger>
              <TabsTrigger value="tablet">
                <Tablet className="h-4 w-4 mr-2" />
                Tablet
              </TabsTrigger>
              <TabsTrigger value="mobile">
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 p-4 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Card
            className={`${getDeviceWidth()} h-full max-h-full transition-all duration-300 relative overflow-hidden`}
          >
            <CardContent className="p-0 h-full">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                    <span className="mt-2 text-sm">Loading preview...</span>
                  </div>
                </div>
              )}
              <ScrollArea className="h-full">
                <iframe
                  src={previewUrl}
                  className="w-full h-full border-0"
                  title="Website Preview"
                  onLoad={handleIframeLoad}
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
