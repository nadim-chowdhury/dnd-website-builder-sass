import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Globe, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export interface PublishButtonProps {
  projectId: string;
  className?: string;
}

export const PublishButton: React.FC<PublishButtonProps> = ({
  projectId,
  className,
}) => {
  const dispatch = useDispatch();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [publishSettings, setPublishSettings] = useState({
    customDomain: "",
    enableSSR: true,
    isPublic: true,
  });

  // In a real implementation, you would use selectors to get this data
  const isPublished = false;
  const lastPublishedDate = null;
  const projectUrl = "";

  const handlePublish = async () => {
    setIsPublishing(true);

    try {
      // Here you would dispatch an action to your redux store
      // Example: await dispatch(publishProject({ projectId, ...publishSettings }));

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to publish:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSettingsChange = (key: string, value: any) => {
    setPublishSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <TooltipProvider>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className={cn("gap-1.5", className)}
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline-block">Publish</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Publish your website</p>
            </TooltipContent>
          </Tooltip>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Publish Website</DialogTitle>
            <DialogDescription>
              Make your website available online to share with others.
            </DialogDescription>
          </DialogHeader>

          {isPublished && (
            <Alert variant="default" className="bg-muted">
              <AlertDescription className="text-sm flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Published{" "}
                {lastPublishedDate
                  ? `on ${new Date(lastPublishedDate).toLocaleDateString()}`
                  : ""}
                {projectUrl && (
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-primary underline"
                  >
                    View site
                  </a>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="custom-domain">Custom Domain (Optional)</Label>
              <Input
                id="custom-domain"
                placeholder="www.example.com"
                value={publishSettings.customDomain}
                onChange={(e) =>
                  handleSettingsChange("customDomain", e.target.value)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ssr">Server-side Rendering</Label>
                <div className="text-xs text-muted-foreground">
                  Improved SEO and performance
                </div>
              </div>
              <Switch
                id="ssr"
                checked={publishSettings.enableSSR}
                onCheckedChange={(checked) =>
                  handleSettingsChange("enableSSR", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="public">Public Website</Label>
                <div className="text-xs text-muted-foreground">
                  Anyone with the link can view
                </div>
              </div>
              <Switch
                id="public"
                checked={publishSettings.isPublic}
                onCheckedChange={(checked) =>
                  handleSettingsChange("isPublic", checked)
                }
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isPublishing}
            >
              Cancel
            </Button>
            <Button onClick={handlePublish} disabled={isPublishing}>
              {isPublishing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>Publish</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default PublishButton;
