"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTemplates } from "@/services/templates";
import { useProjects } from "@/services/projects";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  previewImages: string[];
  tags: string[];
  components: number;
  pages: number;
  responsive: boolean;
  createdAt: string;
  updatedAt: string;
  features: string[];
}

export default function TemplateDetailPage() {
  const router = useRouter();
  const { templateId } = useParams();
  const { getTemplateById } = useTemplates();
  const { createProject } = useProjects();
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        if (typeof templateId !== "string") return;
        const data = await getTemplateById(templateId);
        setTemplate(data);
      } catch (error) {
        console.error("Failed to fetch template:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId, getTemplateById]);

  const handleUseTemplate = async () => {
    if (!template) return;

    setIsCreatingProject(true);
    try {
      const project = await createProject({
        name: `${template.name} Project`,
        description: `Project created from ${template.name} template`,
        templateId: template.id,
      });

      router.push(`/builder/${project.id}`);
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsCreatingProject(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="h-96 bg-gray-200 rounded mb-6"></div>
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-6"></div>
            </div>
            <div>
              <div className="h-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Template not found</h1>
        <p className="mb-6">
          The template you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push("/templates")}>
          Back to Templates
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.push("/templates")}
      >
        ← Back to Templates
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{template.name}</h1>
          <p className="text-gray-500 mb-6">{template.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {template.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>

          <Tabs defaultValue="preview" className="mb-8">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pages">Pages</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <div className="space-y-6">
                <div className="relative h-96 overflow-hidden rounded-lg border">
                  {template.previewImages &&
                  template.previewImages.length > 0 ? (
                    <Image
                      src={template.previewImages[0]}
                      alt={`${template.name} preview`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100">
                      <p className="text-gray-500">No preview available</p>
                    </div>
                  )}
                </div>

                {template.previewImages &&
                  template.previewImages.length > 1 && (
                    <div className="grid grid-cols-3 gap-4">
                      {template.previewImages
                        .slice(1, 4)
                        .map((image, index) => (
                          <div
                            key={index}
                            className="relative h-32 overflow-hidden rounded-lg border"
                          >
                            <Image
                              src={image}
                              alt={`${template.name} preview ${index + 2}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                    </div>
                  )}
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Template Features
                  </h3>
                  <ul className="space-y-2">
                    {template.features ? (
                      template.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))
                    ) : (
                      <li>No specific features listed for this template.</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pages" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Template Pages</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Number of Pages</p>
                      <p className="text-gray-500">
                        {template.pages || "Unknown"}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Components</p>
                      <p className="text-gray-500">
                        {template.components || "Unknown"}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Responsive</p>
                      <p className="text-gray-500">
                        {template.responsive ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Last Updated</p>
                      <p className="text-gray-500">
                        {new Date(template.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Start Building</CardTitle>
              <CardDescription>
                Use this template to quickly create your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Template Category</span>
                  <span className="font-medium capitalize">
                    {template.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Responsive Design</span>
                  <span className="font-medium">
                    {template.responsive ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pages</span>
                  <span className="font-medium">{template.pages || "N/A"}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                className="w-full"
                size="lg"
                onClick={handleUseTemplate}
                disabled={isCreatingProject}
              >
                {isCreatingProject ? "Creating..." : "Use this Template"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/preview/${template.id}`)}
              >
                Preview Template
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
