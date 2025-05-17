"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTemplates } from "@/services/templates";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function TemplatesPage() {
  const router = useRouter();
  const { getTemplates } = useTemplates();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, [getTemplates]);

  const categories = [
    "all",
    ...Array.from(new Set(templates.map((template) => template.category))),
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      activeTab === "all" || template.category === activeTab;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Templates</h1>
        <Input
          placeholder="Search templates..."
          className="max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="mb-6">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="h-80 animate-pulse">
              <div className="h-40 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${template.imageUrl || "/images/template-placeholder.jpg"})`,
                }}
              />
              <CardHeader className="p-4 pb-0">
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="outline">+{template.tags.length - 3}</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/preview/${template.id}`)}
                >
                  Preview
                </Button>
                <Button
                  onClick={() => router.push(`/templates/${template.id}`)}
                >
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No templates found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search or filters
          </p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
