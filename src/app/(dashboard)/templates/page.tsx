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
import { useTemplates } from "@/hooks/use-template";
import { Search, Filter, ArrowRight } from "lucide-react";

// Demo data for templates
const demoTemplates = [
  {
    id: "1",
    name: "Portfolio Website",
    description:
      "Modern portfolio template with animations and responsive design",
    category: "personal",
    imageUrl:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1000&auto=format&fit=crop",
    tags: ["portfolio", "personal", "creative"],
    createdAt: "2025-02-10",
    updatedAt: "2025-04-15",
    color: "#4f46e5",
  },
  {
    id: "2",
    name: "E-commerce Store",
    description:
      "Complete online store template with product listings and checkout",
    category: "business",
    imageUrl:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000&auto=format&fit=crop",
    tags: ["ecommerce", "business", "shop"],
    createdAt: "2025-03-05",
    updatedAt: "2025-04-20",
    color: "#0891b2",
  },
  {
    id: "3",
    name: "Blog Platform",
    description: "Clean and minimal blog template with modern typography",
    category: "content",
    imageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop",
    tags: ["blog", "content", "writing"],
    createdAt: "2025-01-20",
    updatedAt: "2025-04-10",
    color: "#ea580c",
  },
  {
    id: "4",
    name: "Restaurant Website",
    description:
      "Elegant template for restaurants with menu and reservation system",
    category: "business",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    tags: ["restaurant", "food", "business"],
    createdAt: "2025-02-15",
    updatedAt: "2025-04-05",
    color: "#be123c",
  },
  {
    id: "5",
    name: "Photography Portfolio",
    description: "Showcase your photography work with this minimalist template",
    category: "personal",
    imageUrl:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1000&auto=format&fit=crop",
    tags: ["photography", "portfolio", "gallery"],
    createdAt: "2025-03-10",
    updatedAt: "2025-04-25",
    color: "#334155",
  },
  {
    id: "6",
    name: "Product Landing Page",
    description: "High-conversion template for product launches and marketing",
    category: "marketing",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    tags: ["landing", "marketing", "product"],
    createdAt: "2025-01-30",
    updatedAt: "2025-04-12",
    color: "#7e22ce",
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const { getTemplates } = useTemplates();
  const [templates, setTemplates] = useState<any>(demoTemplates || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchTemplates = async () => {
  //     try {
  //       // Simulating API call with demo data
  //       setTimeout(() => {
  //         setTemplates(demoTemplates);
  //         setIsLoading(false);
  //       }, 1000);
  //     } catch (error) {
  //       console.error("Failed to fetch templates:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchTemplates();
  // }, [demoTemplates]);

  const categories = [
    "all",
    ...Array.from(new Set(demoTemplates.map((template) => template.category))),
  ];

  const filteredTemplates = templates.filter((template: any) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag: any) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      activeTab === "all" || template.category === activeTab;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-16 px-4">
        <div className="mb-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h1 className="text-4xl font-extralight tracking-tight">
              Templates
              <span className="ml-2 inline-block bg-gradient-to-r from-indigo-500 to-purple-500 h-2 w-10 rounded-full"></span>
            </h1>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search templates..."
                className="pl-10 pr-4 py-2 bg-white border-none rounded-full shadow-sm focus-visible:ring-1 focus-visible:ring-indigo-300 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-transparent border-none w-full justify-start md:justify-center gap-1 h-auto p-0 overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize rounded-full px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-transparent transition-all"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card
                key={i}
                className="h-80 animate-pulse border-none shadow-sm rounded-xl bg-white overflow-hidden"
              >
                <div className="h-40 bg-gray-100 rounded-t-xl"></div>
                <CardContent className="p-6">
                  <div className="h-5 bg-gray-100 rounded-full mb-3 w-3/5"></div>
                  <div className="h-3 bg-gray-100 rounded-full w-4/5 mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-100 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-100 rounded-full w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template: any) => (
              <Card
                key={template.id}
                className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-xl bg-white"
              >
                <div
                  className="h-44 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${template.imageUrl || "/images/template-placeholder.jpg"})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                  <div
                    className="absolute top-4 left-4 w-2 h-10 rounded-full"
                    style={{ backgroundColor: template.color }}
                  ></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="capitalize text-xs font-normal px-3 py-1 bg-white/90 border-none text-gray-800 rounded-full">
                      {template.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-6 pb-3">
                  <CardTitle className="text-lg font-medium">
                    {template.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pt-0 pb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {template.tags.map((tag: any) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="capitalize text-xs font-normal px-2 py-0.5 bg-gray-50 border-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-4 flex justify-between border-t border-gray-50">
                  <Button
                    variant="ghost"
                    className="text-sm font-normal hover:bg-gray-50 px-3 py-1 h-auto"
                    onClick={() => router.push(`/preview/${template.id}`)}
                  >
                    Preview
                  </Button>
                  <Button
                    className="text-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-normal px-4 py-1 h-auto rounded-full"
                    onClick={() => router.push(`/templates/${template.id}`)}
                  >
                    Use Template
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-medium mb-3">No templates found</h3>
            <p className="text-gray-500 mb-8 text-sm max-w-md mx-auto">
              We couldn&apos;t find any templates matching your current search
              criteria. Try adjusting your filters or search terms.
            </p>
            <Button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-normal px-6 py-2 h-auto rounded-full"
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
    </div>
  );
}
