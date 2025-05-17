import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X, Save, Globe, Copy, Download, Code, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { selectBuilderState } from "@/redux/selectors/builder-selectors";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const dispatch = useDispatch();
  const builderState = useSelector(selectBuilderState);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"html" | "json">("html");
  const [projectSettings, setProjectSettings] = useState({
    name: "My Website",
    description: "A website built with the drag and drop builder",
    favicon: "/favicon.ico",
    seoEnabled: true,
    seoTitle: "My Website",
    seoDescription: "A website built with the drag and drop builder",
    customDomain: "",
    analytics: {
      enabled: false,
      googleAnalyticsId: "",
    },
    performance: {
      lazyLoadImages: true,
      minifyHtml: true,
      prefetchResources: false,
    },
    social: {
      ogTitle: "My Website",
      ogDescription: "A website built with the drag and drop builder",
      ogImage: "",
      twitterHandle: "",
    },
    fonts: {
      headings: "Inter",
      body: "Inter",
    },
    customCss: "",
    customJs: "",
  });

  if (!isOpen) return null;

  const handleSaveSettings = () => {
    // Dispatch action to save project settings
    // dispatch(updateProjectSettings(projectId, projectSettings));
    console.log("Saving project settings:", projectSettings);
  };

  const handleExport = () => {
    // Logic to export the project in the selected format
    console.log(`Exporting project in ${exportFormat} format`);
  };

  const handleDeleteProject = () => {
    // Dispatch action to delete the project
    // dispatch(deleteProject(projectId));
    console.log("Deleting project:", projectId);
    setDeleteDialogOpen(false);
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    nestedKey?: string
  ) => {
    const { name, value } = e.target;

    if (nestedKey) {
      setProjectSettings((prev) => ({
        ...prev,
        [nestedKey]: {
          ...prev[nestedKey as keyof typeof prev],
          [name]: value,
        },
      }));
    } else {
      setProjectSettings((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSwitchChange = (
    value: boolean,
    name: string,
    nestedKey?: string
  ) => {
    if (nestedKey) {
      setProjectSettings((prev) => ({
        ...prev,
        [nestedKey]: {
          ...prev[nestedKey as keyof typeof prev],
          [name]: value,
        },
      }));
    } else {
      setProjectSettings((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFontChange = (value: string, type: "headings" | "body") => {
    setProjectSettings((prev) => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [type]: value,
      },
    }));
  };

  return (
    <div className="fixed right-0 top-0 z-50 h-screen w-96 bg-background border-l shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Project Settings</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="p-4">
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="seo">SEO & Social</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Basic information about your website
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={projectSettings.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={projectSettings.description}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favicon">Favicon URL</Label>
                    <Input
                      id="favicon"
                      name="favicon"
                      value={projectSettings.favicon}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Typography</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="headingFont" className="text-xs">
                          Heading Font
                        </Label>
                        <Select
                          value={projectSettings.fonts.headings}
                          onValueChange={(value) =>
                            handleFontChange(value, "headings")
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select font" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="Open Sans">Open Sans</SelectItem>
                            <SelectItem value="Montserrat">
                              Montserrat
                            </SelectItem>
                            <SelectItem value="Playfair Display">
                              Playfair Display
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bodyFont" className="text-xs">
                          Body Font
                        </Label>
                        <Select
                          value={projectSettings.fonts.body}
                          onValueChange={(value) =>
                            handleFontChange(value, "body")
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select font" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="Open Sans">Open Sans</SelectItem>
                            <SelectItem value="Lato">Lato</SelectItem>
                            <SelectItem value="Source Sans Pro">
                              Source Sans Pro
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customDomain">Custom Domain</Label>
                    <Input
                      id="customDomain"
                      name="customDomain"
                      value={projectSettings.customDomain}
                      onChange={handleInputChange}
                      placeholder="yourdomain.com"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave blank to use the default subdomain.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                  <CardDescription>
                    Optimize your website loading speed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="lazyLoadImages">Lazy Load Images</Label>
                      <p className="text-xs text-muted-foreground">
                        Load images only when they are in view
                      </p>
                    </div>
                    <Switch
                      id="lazyLoadImages"
                      checked={projectSettings.performance.lazyLoadImages}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "lazyLoadImages",
                          "performance"
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="minifyHtml">Minify HTML</Label>
                      <p className="text-xs text-muted-foreground">
                        Remove whitespace and comments from HTML
                      </p>
                    </div>
                    <Switch
                      id="minifyHtml"
                      checked={projectSettings.performance.minifyHtml}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(checked, "minifyHtml", "performance")
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="prefetchResources">
                        Prefetch Resources
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Prefetch resources for faster page transitions
                      </p>
                    </div>
                    <Switch
                      id="prefetchResources"
                      checked={projectSettings.performance.prefetchResources}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(
                          checked,
                          "prefetchResources",
                          "performance"
                        )
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>
                    Search engine optimization settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="seoEnabled">Enable SEO</Label>
                      <p className="text-xs text-muted-foreground">
                        Generate meta tags for search engines
                      </p>
                    </div>
                    <Switch
                      id="seoEnabled"
                      checked={projectSettings.seoEnabled}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(checked, "seoEnabled")
                      }
                    />
                  </div>

                  {projectSettings.seoEnabled && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="seoTitle">SEO Title</Label>
                        <Input
                          id="seoTitle"
                          name="seoTitle"
                          value={projectSettings.seoTitle}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="seoDescription">SEO Description</Label>
                        <Textarea
                          id="seoDescription"
                          name="seoDescription"
                          value={projectSettings.seoDescription}
                          onChange={handleInputChange}
                          rows={3}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>
                    Settings for social media sharing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ogTitle">Open Graph Title</Label>
                    <Input
                      id="ogTitle"
                      name="ogTitle"
                      value={projectSettings.social.ogTitle}
                      onChange={(e) => handleInputChange(e, "social")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ogDescription">
                      Open Graph Description
                    </Label>
                    <Textarea
                      id="ogDescription"
                      name="ogDescription"
                      value={projectSettings.social.ogDescription}
                      onChange={(e) => handleInputChange(e, "social")}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ogImage">Open Graph Image URL</Label>
                    <Input
                      id="ogImage"
                      name="ogImage"
                      value={projectSettings.social.ogImage}
                      onChange={(e) => handleInputChange(e, "social")}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitterHandle">Twitter Handle</Label>
                    <Input
                      id="twitterHandle"
                      name="twitterHandle"
                      value={projectSettings.social.twitterHandle}
                      onChange={(e) => handleInputChange(e, "social")}
                      placeholder="@yourusername"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    Track website traffic and user behavior
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analyticsEnabled">Enable Analytics</Label>
                      <p className="text-xs text-muted-foreground">
                        Track website traffic with Google Analytics
                      </p>
                    </div>
                    <Switch
                      id="analyticsEnabled"
                      checked={projectSettings.analytics.enabled}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(checked, "enabled", "analytics")
                      }
                    />
                  </div>

                  {projectSettings.analytics.enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="googleAnalyticsId">
                        Google Analytics ID
                      </Label>
                      <Input
                        id="googleAnalyticsId"
                        name="googleAnalyticsId"
                        value={projectSettings.analytics.googleAnalyticsId}
                        onChange={(e) => handleInputChange(e, "analytics")}
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Code</CardTitle>
                  <CardDescription>
                    Add custom CSS and JavaScript
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customCss">Custom CSS</Label>
                    <Textarea
                      id="customCss"
                      name="customCss"
                      value={projectSettings.customCss}
                      onChange={handleInputChange}
                      placeholder="/* Add your custom CSS here */"
                      className="font-mono text-sm"
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customJs">Custom JavaScript</Label>
                    <Textarea
                      id="customJs"
                      name="customJs"
                      value={projectSettings.customJs}
                      onChange={handleInputChange}
                      placeholder="// Add your custom JavaScript here"
                      className="font-mono text-sm"
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Export</CardTitle>
                  <CardDescription>
                    Export your website as HTML or JSON
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="exportFormat">Export Format</Label>
                    <Select
                      value={exportFormat}
                      onValueChange={(value) =>
                        setExportFormat(value as "html" | "json")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="html">
                          HTML with CSS and JS
                        </SelectItem>
                        <SelectItem value="json">Project JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full" onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Export {exportFormat.toUpperCase()}
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>Destructive actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Project
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleSaveSettings}>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </ScrollArea>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <Alert variant="destructive">
            <AlertDescription>
              All project data, pages, and assets will be permanently deleted.
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProject}>
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPanel;
