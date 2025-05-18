"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define schemas with specific types
const appearanceFormSchema = z.object({
  fontSize: z.enum(["sm", "md", "lg", "xl"], {
    required_error: "Please select a font size.",
  }),
  colorScheme: z.enum(["default", "blue", "green", "purple", "orange"], {
    required_error: "Please select a color scheme.",
  }),
  borderRadius: z.enum(["none", "small", "medium", "large"], {
    required_error: "Please select a border radius.",
  }),
  animation: z.boolean(),
  compactMode: z.boolean(),
});

const editorFormSchema = z.object({
  autosave: z.boolean(),
  gridSnapping: z.boolean(),
  showGuides: z.boolean(),
  previewOnSave: z.boolean(),
  defaultView: z.enum(["desktop", "tablet", "mobile"], {
    required_error: "Please select a default view.",
  }),
  componentLabels: z.boolean(),
  componentOutlines: z.boolean(),
});

// Infer types from schemas
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;
type EditorFormValues = z.infer<typeof editorFormSchema>;

export default function AppearanceSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Form for appearance settings with explicit type
  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      fontSize: "md",
      colorScheme: "blue",
      borderRadius: "medium",
      animation: true,
      compactMode: false,
    },
  });

  // Form for editor settings with explicit type
  const editorForm = useForm<EditorFormValues>({
    resolver: zodResolver(editorFormSchema),
    defaultValues: {
      autosave: true,
      gridSnapping: true,
      showGuides: true,
      previewOnSave: false,
      defaultView: "desktop",
      componentLabels: true,
      componentOutlines: true,
    },
  });

  async function onAppearanceSubmit(data: AppearanceFormValues) {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save preferences to localStorage
      localStorage.setItem("appearancePreferences", JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save settings", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onEditorSubmit(data: EditorFormValues) {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save editor preferences to localStorage
      localStorage.setItem("editorPreferences", JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save editor settings", error);
    } finally {
      setIsLoading(false);
    }
  }

  function resetToDefaults() {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      // Reset appearance form
      appearanceForm.reset({
        fontSize: "md",
        colorScheme: "blue",
        borderRadius: "medium",
        animation: true,
        compactMode: false,
      });

      // Reset editor form
      editorForm.reset({
        autosave: true,
        gridSnapping: true,
        showGuides: true,
        previewOnSave: false,
        defaultView: "desktop",
        componentLabels: true,
        componentOutlines: true,
      });

      // Clear localStorage settings
      localStorage.removeItem("appearancePreferences");
      localStorage.removeItem("editorPreferences");
    }
  }

  // Color scheme map for visual feedback
  const colorSchemeClasses = {
    default: "bg-gray-100",
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
    orange: "bg-orange-50",
  };

  // Get current color scheme
  const currentColorScheme = appearanceForm.watch("colorScheme");

  return (
    <div
      className={`min-h-screen px-4 py-12 transition-colors ${colorSchemeClasses[currentColorScheme]}`}
    >
      <div className="container max-w-3xl mx-auto">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-500 mt-2">Customize your experience</p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="general" className="py-2">
                Interface
              </TabsTrigger>
              <TabsTrigger value="editor" className="py-2">
                Editor
              </TabsTrigger>
              <TabsTrigger value="accessibility" className="py-2">
                Accessibility
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader className="bg-blue-500 text-white">
                  <CardTitle>Interface Settings</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...appearanceForm}>
                    <form
                      onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={appearanceForm.control}
                          name="fontSize"
                          render={({ field }) => (
                            <FormItem className="bg-white p-4 rounded-lg">
                              <FormLabel>Font Size</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select font size" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="sm">Small</SelectItem>
                                  <SelectItem value="md">Medium</SelectItem>
                                  <SelectItem value="lg">Large</SelectItem>
                                  <SelectItem value="xl">
                                    Extra Large
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={appearanceForm.control}
                          name="colorScheme"
                          render={({ field }) => (
                            <FormItem className="bg-white p-4 rounded-lg">
                              <FormLabel>Color Scheme</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select color scheme" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="default">
                                    Default
                                  </SelectItem>
                                  <SelectItem value="blue">Blue</SelectItem>
                                  <SelectItem value="green">Green</SelectItem>
                                  <SelectItem value="purple">Purple</SelectItem>
                                  <SelectItem value="orange">Orange</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={appearanceForm.control}
                          name="borderRadius"
                          render={({ field }) => (
                            <FormItem className="bg-white p-4 rounded-lg">
                              <FormLabel>Border Radius</FormLabel>
                              <div className="grid grid-cols-4 gap-2 mt-2">
                                {["none", "small", "medium", "large"].map(
                                  (radius) => (
                                    <div
                                      key={radius}
                                      className={`
                                      cursor-pointer p-2 text-center transition-all
                                      ${
                                        field.value === radius
                                          ? "bg-blue-500 text-white"
                                          : "bg-gray-100"
                                      }
                                      ${radius === "none" ? "rounded-none" : ""}
                                      ${radius === "small" ? "rounded" : ""}
                                      ${radius === "medium" ? "rounded-lg" : ""}
                                      ${radius === "large" ? "rounded-2xl" : ""}
                                    `}
                                      onClick={() => field.onChange(radius)}
                                    >
                                      {radius.charAt(0).toUpperCase() +
                                        radius.slice(1)}
                                    </div>
                                  )
                                )}
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                          <FormField
                            control={appearanceForm.control}
                            name="animation"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between w-full">
                                <FormLabel>Animations</FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                          <FormField
                            control={appearanceForm.control}
                            name="compactMode"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between w-full">
                                <FormLabel>Compact Mode</FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={resetToDefaults}
                        >
                          Reset
                        </Button>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="bg-blue-500 text-white"
                        >
                          {isLoading ? "Saving..." : "Save"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="editor">
              <Card>
                <CardHeader className="bg-purple-500 text-white">
                  <CardTitle>Editor Settings</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...editorForm}>
                    <form
                      onSubmit={editorForm.handleSubmit(onEditorSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={editorForm.control}
                          name="autosave"
                          render={({ field }) => (
                            <FormItem className="bg-white p-4 rounded-lg flex items-center justify-between">
                              <FormLabel>Autosave</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={editorForm.control}
                          name="gridSnapping"
                          render={({ field }) => (
                            <FormItem className="bg-white p-4 rounded-lg flex items-center justify-between">
                              <FormLabel>Grid Snapping</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={editorForm.control}
                          name="showGuides"
                          render={({ field }) => (
                            <FormItem className="bg-white p-4 rounded-lg flex items-center justify-between">
                              <FormLabel>Show Guides</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={editorForm.control}
                          name="previewOnSave"
                          render={({ field }) => (
                            <FormItem className="bg-white p-4 rounded-lg flex items-center justify-between">
                              <FormLabel>Preview After Save</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={editorForm.control}
                        name="defaultView"
                        render={({ field }) => (
                          <FormItem className="mt-6">
                            <FormLabel>Default View</FormLabel>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                              {["desktop", "tablet", "mobile"].map((view) => (
                                <div
                                  key={view}
                                  className={`
                                    cursor-pointer p-4 text-center flex flex-col items-center gap-2 
                                    ${
                                      field.value === view
                                        ? "bg-purple-500 text-white"
                                        : "bg-white"
                                    }
                                    rounded-lg transition-all
                                  `}
                                  onClick={() => field.onChange(view)}
                                >
                                  <span className="text-xl">
                                    {view === "desktop"
                                      ? "🖥️"
                                      : view === "tablet"
                                        ? "📱"
                                        : "📱"}
                                  </span>
                                  <span className="capitalize">{view}</span>
                                </div>
                              ))}
                            </div>
                          </FormItem>
                        )}
                      />

                      <div className="bg-white p-4 rounded-lg mt-6">
                        <h3 className="font-medium mb-4">
                          Component Visualization
                        </h3>
                        <div className="space-y-4">
                          <FormField
                            control={editorForm.control}
                            name="componentLabels"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between">
                                <FormLabel>Component Labels</FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={editorForm.control}
                            name="componentOutlines"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between">
                                <FormLabel>Component Outlines</FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex justify-center pt-6">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="bg-purple-500 text-white"
                        >
                          {isLoading ? "Saving..." : "Save Editor Settings"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accessibility">
              <Card>
                <CardHeader className="bg-pink-500 text-white">
                  <CardTitle>Accessibility</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <Label>Reduce Motion</Label>
                      </div>
                      <Switch />
                    </div>

                    <div className="bg-white p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <Label>High Contrast</Label>
                      </div>
                      <Switch />
                    </div>

                    <div className="bg-white p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <Label>Screen Reader Optimization</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="bg-white p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <Label>Focus Indicators</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button className="bg-pink-500 text-white">
                      Save Accessibility Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
