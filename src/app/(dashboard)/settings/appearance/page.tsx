"use client";

import { z } from "zod";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";

// Define schemas with specific types
const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
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
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | "system">(
    "system"
  );

  // Form for appearance settings with explicit type
  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      fontSize: "md",
      colorScheme: "default",
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

  // Effect to detect and set system theme preference
  useEffect(() => {
    // Check for system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setCurrentTheme("dark");
    } else {
      setCurrentTheme("light");
    }

    // Override with user preference if set in localStorage
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      appearanceForm.setValue("theme", savedTheme);
    }
  }, [appearanceForm]);

  async function onAppearanceSubmit(data: AppearanceFormValues) {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save theme preference to localStorage
      localStorage.setItem("theme", data.theme);

      // Apply theme changes
      if (data.theme === "system") {
        // Use system preference
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else if (data.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Success message would go here (toast removed)
    } catch (error) {
      // Error message would go here (toast removed)
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

      // Success message would go here (toast removed)
    } catch (error) {
      // Error message would go here (toast removed)
    } finally {
      setIsLoading(false);
    }
  }

  function resetToDefaults() {
    if (
      confirm(
        "Are you sure you want to reset all appearance settings to default?"
      )
    ) {
      // Reset appearance form
      appearanceForm.reset({
        theme: "system",
        fontSize: "md",
        colorScheme: "default",
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
      localStorage.removeItem("theme");
      localStorage.removeItem("editorPreferences");

      // Success message would go here (toast removed)
    }
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Appearance Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize the appearance and behavior of the application and editor.
          </p>
        </div>

        <Separator />

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-2 mb-4">
            <TabsTrigger value="general">General Appearance</TabsTrigger>
            <TabsTrigger value="editor">Editor Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application interface.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...appearanceForm}>
                  <form
                    onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={appearanceForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Theme</FormLabel>
                          <FormDescription>
                            Select your preferred theme for the application.
                          </FormDescription>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="light" id="light" />
                                <Label htmlFor="light">Light</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="dark" id="dark" />
                                <Label htmlFor="dark">Dark</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="system" id="system" />
                                <Label htmlFor="system">System</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <div className="text-sm text-muted-foreground">
                            {field.value === "system" && (
                              <span>
                                Using{" "}
                                {currentTheme === "dark" ? "dark" : "light"}{" "}
                                mode based on system preference
                              </span>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={appearanceForm.control}
                        name="fontSize"
                        render={({ field }) => (
                          <FormItem>
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
                                <SelectItem value="xl">Extra Large</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Adjust the text size across the application.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={appearanceForm.control}
                        name="colorScheme"
                        render={({ field }) => (
                          <FormItem>
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
                                <SelectItem value="default">Default</SelectItem>
                                <SelectItem value="blue">Blue</SelectItem>
                                <SelectItem value="green">Green</SelectItem>
                                <SelectItem value="purple">Purple</SelectItem>
                                <SelectItem value="orange">Orange</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose the accent color for the interface.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={appearanceForm.control}
                        name="borderRadius"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Border Radius</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select border style" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Control the roundness of UI elements.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={appearanceForm.control}
                        name="animation"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Interface Animations
                              </FormLabel>
                              <FormDescription>
                                Enable or disable UI animations and transitions.
                              </FormDescription>
                            </div>
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
                        control={appearanceForm.control}
                        name="compactMode"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Compact Mode
                              </FormLabel>
                              <FormDescription>
                                Reduce spacing to fit more content on screen.
                              </FormDescription>
                            </div>
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

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetToDefaults}
                      >
                        Reset to Defaults
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="editor">
            <Card>
              <CardHeader>
                <CardTitle>Editor Preferences</CardTitle>
                <CardDescription>
                  Customize the behavior and appearance of the website builder
                  editor.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...editorForm}>
                  <form
                    onSubmit={editorForm.handleSubmit(onEditorSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <FormField
                        control={editorForm.control}
                        name="autosave"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Autosave
                              </FormLabel>
                              <FormDescription>
                                Automatically save changes while editing.
                              </FormDescription>
                            </div>
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
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Grid Snapping
                              </FormLabel>
                              <FormDescription>
                                Snap elements to grid for precise positioning.
                              </FormDescription>
                            </div>
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
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Show Guides
                              </FormLabel>
                              <FormDescription>
                                Show alignment guides when moving elements.
                              </FormDescription>
                            </div>
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
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Preview After Save
                              </FormLabel>
                              <FormDescription>
                                Show preview automatically after saving changes.
                              </FormDescription>
                            </div>
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
                        <FormItem>
                          <FormLabel>Default View</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select default view" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="desktop">
                                Desktop (1200px)
                              </SelectItem>
                              <SelectItem value="tablet">
                                Tablet (768px)
                              </SelectItem>
                              <SelectItem value="mobile">
                                Mobile (320px)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the default device view when opening the
                            editor.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <FormField
                        control={editorForm.control}
                        name="componentLabels"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Component Labels
                              </FormLabel>
                              <FormDescription>
                                Show component type labels when hovering.
                              </FormDescription>
                            </div>
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
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Component Outlines
                              </FormLabel>
                              <FormDescription>
                                Show element boundaries in the editor.
                              </FormDescription>
                            </div>
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

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Editor Preferences"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Accessibility</CardTitle>
            <CardDescription>
              Settings to improve accessibility and usability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Reduce Motion</Label>
                  <p className="text-sm text-muted-foreground">
                    Minimize animations for users who prefer reduced motion.
                  </p>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={() => {
                    // Toast removed
                  }}
                />
              </div>

              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">High Contrast Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast for better visibility.
                  </p>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={() => {
                    // Toast removed
                  }}
                />
              </div>

              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Screen Reader Optimization
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enhance the interface for screen reader compatibility.
                  </p>
                </div>
                <Switch
                  checked={true}
                  onCheckedChange={() => {
                    // Toast removed
                  }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => {
                // Toast removed
              }}
            >
              Save Accessibility Settings
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
