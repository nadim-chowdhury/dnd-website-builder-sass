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
import { useTemplates } from "@/hooks/use-template";
import { useProjects } from "@/hooks/use-project";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";

// Demo template data
const demoTemplate = {
  id: "portfolio-template-01",
  name: "Portfolio Pro",
  description:
    "A modern, minimalist portfolio template for creative professionals featuring smooth animations, responsive design, and customizable sections.",
  category: "personal",
  imageUrl:
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1000&auto=format&fit=crop",
  previewImages: [
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000&auto=format&fit=crop",
  ],
  tags: ["portfolio", "creative", "minimal", "responsive"],
  components: 24,
  pages: 5,
  responsive: true,
  createdAt: "2025-02-10T12:00:00Z",
  updatedAt: "2025-04-15T09:30:00Z",
  features: [
    "Fully responsive design for all device sizes",
    "Animated page transitions and scroll effects",
    "Dynamic project showcase with filtering options",
    "Integrated contact form with validation",
    "Light and dark mode support",
    "SEO optimized structure",
    "Custom scrolling animations",
    "Social media integration",
  ],
  color: "#4f46e5",
  pagesList: [
    {
      name: "Home",
      description: "Landing page with hero section and featured projects",
    },
    {
      name: "About",
      description: "Personal information and professional background",
    },
    {
      name: "Projects",
      description: "Grid layout of portfolio items with filtering",
    },
    { name: "Blog", description: "Articles and thought leadership content" },
    { name: "Contact", description: "Contact form and social media links" },
  ],
};

export default function TemplateDetailPage() {
  const router = useRouter();
  const { templateId } = useParams();
  const { getTemplateById } = useTemplates();
  const { createProject } = useProjects();
  const [template, setTemplate] = useState(demoTemplate || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // useEffect(() => {
  //   const fetchTemplate = async () => {
  //     try {
  //       // Use demo data instead of actual API call
  //       setTimeout(() => {
  //         setTemplate(demoTemplate);
  //         setIsLoading(false);
  //       }, 800);
  //     } catch (error) {
  //       console.error("Failed to fetch template:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchTemplate();
  // }, []);

  const handleUseTemplate = async () => {
    if (!template) return;

    setIsCreatingProject(true);
    try {
      // Simulate API call
      setTimeout(() => {
        router.push(`/builder/${template.id}`);
        setIsCreatingProject(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to create project:", error);
      setIsCreatingProject(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto py-12 px-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded-full w-32 mb-8"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-200 rounded-full w-2/3 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-6"></div>

                <div className="flex gap-2 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-6 bg-gray-200 rounded-full w-16"
                    ></div>
                  ))}
                </div>

                <div className="h-12 bg-gray-200 rounded-lg w-64 mb-6"></div>

                <div className="h-96 bg-gray-200 rounded-xl mb-6"></div>

                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
                  ))}
                </div>
              </div>

              <div>
                <div className="h-96 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto py-16 px-4">
          <h1 className="text-2xl font-light mb-4">Template not found</h1>
          <p className="text-gray-500 mb-8">
            The template you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button
            onClick={() => router.push("/templates")}
            className="bg-black text-white rounded-full px-6"
          >
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <Button
          variant="ghost"
          className="mb-10 group pl-0 hover:bg-transparent"
          onClick={() => router.push("/templates")}
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Templates</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-light tracking-tight">
                  {template.name}
                </h1>
                <div
                  className="h-6 w-1.5 rounded-full"
                  style={{ backgroundColor: template.color }}
                ></div>
              </div>
              <p className="text-gray-600 mb-4 text-lg">
                {template.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {template.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="capitalize text-xs font-normal px-2.5 py-0.5 bg-white border-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Tabs defaultValue="preview" className="mb-12">
              <TabsList className="bg-transparent border-b border-gray-100 w-full justify-start h-auto p-0 mb-6">
                {["preview", "features", "pages"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="capitalize data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-gray-200 data-[state=active]:shadow-none px-4 py-2 h-auto"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="preview" className="mt-0">
                <div className="space-y-6">
                  <div className="relative h-96 overflow-hidden rounded-xl border-none shadow-sm bg-white">
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
                              className="relative h-36 overflow-hidden rounded-xl border-none shadow-sm bg-white"
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

              <TabsContent value="features" className="mt-0">
                <Card className="border-none shadow-sm rounded-xl bg-white overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-light mb-6">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      {template.features ? (
                        template.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <div className="mr-3 mt-0.5 text-green-500 bg-green-50 p-0.5 rounded-full">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-gray-700 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">
                          No specific features listed for this template.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pages" className="mt-0">
                <Card className="border-none shadow-sm rounded-xl bg-white overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-light mb-6">Template Pages</h3>
                    <div className="grid grid-cols-1 gap-6">
                      {template.pagesList ? (
                        template.pagesList.map((page, index) => (
                          <div key={index} className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                              <h4 className="font-medium">{page.name}</h4>
                            </div>
                            <p className="text-gray-500 text-sm pl-4">
                              {page.description}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                              {new Date(
                                template.updatedAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="sticky top-6 border-none shadow-sm rounded-xl bg-white overflow-hidden">
              <div
                className="h-3 w-full"
                style={{ backgroundColor: template.color }}
              ></div>
              <CardHeader className="px-6 pt-6 pb-3">
                <CardTitle className="text-xl font-medium">
                  Start Building
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Use this template to quickly create your website
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 py-3">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Category</span>
                    <Badge className="capitalize text-xs font-normal px-2.5 py-0.5 bg-gray-50 border-gray-100 text-gray-600 rounded-full">
                      {template.category}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Pages</span>
                    <span className="font-medium text-sm">
                      {template.pages || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Components</span>
                    <span className="font-medium text-sm">
                      {template.components || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Responsive</span>
                    <span className="font-medium text-sm">
                      {template.responsive ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Last Updated</span>
                    <span className="font-medium text-sm">
                      {new Date(template.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 px-6 pb-6 pt-2">
                <Button
                  className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-normal rounded-full"
                  size="lg"
                  onClick={handleUseTemplate}
                  disabled={isCreatingProject}
                >
                  {isCreatingProject ? "Creating..." : "Use this Template"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-200 hover:bg-gray-50 font-normal text-gray-700 rounded-full"
                  onClick={() => router.push(`/preview/${template.id}`)}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Preview Template
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
