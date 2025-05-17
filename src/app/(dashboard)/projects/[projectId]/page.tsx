"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Globe,
  Code,
  Settings,
  Share2,
  Trash2,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  BarChart3,
  Layers,
  Sparkles,
  Pencil,
  Eye,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProjectDetails {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedUrl: string | null;
  pageCount: number;
  status: "draft" | "published";
  color: string;
}

export default function ProjectDetailsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const router = useRouter();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchProjectDetails = async () => {
      // In a real app, fetch from API using params.projectId
      setIsLoading(true);

      // Mock data
      const mockProject: ProjectDetails = {
        id: params.projectId,
        name: "Company Landing Page",
        description:
          "A professional landing page for our company with hero section, features, and contact form",
        createdAt: "2025-04-10T09:00:00Z",
        updatedAt: "2025-05-15T14:30:00Z",
        publishedUrl: "https://example.com/company-landing",
        pageCount: 3,
        status: "published",
        color: "bg-indigo-500",
      };

      // Simulate network delay
      setTimeout(() => {
        setProject(mockProject);
        setIsLoading(false);
      }, 500);
    };

    fetchProjectDetails();
  }, [params.projectId]);

  const handleDelete = () => {
    // In a real app, call API to delete
    router.push("/projects");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="relative h-16 w-16">
          <div className="absolute top-0 h-16 w-16 animate-pulse rounded-full border-4 border-indigo-200"></div>
          <div className="absolute top-0 h-16 w-16 animate-spin rounded-full border-t-4 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-16 px-4 max-w-5xl">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 p-12 text-center">
          <div className="mb-6 rounded-full bg-red-100 p-4">
            <Trash2 className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Project not found</h2>
          <p className="mb-8 max-w-md text-gray-600">
            The project you are looking for does not exist or has been deleted.
          </p>
          <Button
            onClick={() => router.push("/projects")}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 hover:from-indigo-700 hover:to-purple-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4 -ml-3 flex items-center gap-1 text-gray-600 hover:text-gray-900"
          onClick={() => router.push("/projects")}
        >
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Button>
      </div>

      <div className="relative mb-12">
        <div
          className={`absolute -top-3 left-0 h-1 w-24 ${project.color}`}
        ></div>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {project.name}
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="rounded-full border-gray-200 bg-white hover:bg-gray-50 shadow-sm flex items-center gap-1"
              onClick={() => router.push(`/preview/${project.id}`)}
            >
              <Eye className="h-4 w-4 mr-1" /> Preview
            </Button>

            <Button
              className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md transition-all flex items-center gap-1"
              onClick={() => router.push(`/builder/${project.id}`)}
            >
              <Pencil className="h-4 w-4 mr-1" /> Edit Site
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-0 rounded-xl shadow-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-bold">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600">
                    This action cannot be undone. This will permanently delete
                    your project and all associated pages and data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                  <AlertDialogCancel className="rounded-lg font-medium">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="rounded-lg bg-red-600 hover:bg-red-700 font-medium"
                  >
                    Delete Project
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="bg-gray-100 p-1 rounded-full h-auto">
          <TabsTrigger
            value="overview"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="pages"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Pages
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 rounded-xl shadow-md overflow-hidden">
              <div className={`h-1 w-full ${project.color}`}></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Badge
                    className={`${
                      project.status === "published"
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "bg-amber-500 hover:bg-amber-600"
                    } rounded-full px-3`}
                  >
                    {project.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </div>

                {project.publishedUrl && (
                  <div className="mt-4">
                    <label className="text-sm text-gray-500 mb-1 block">
                      Public URL
                    </label>
                    <div className="flex gap-2">
                      <code className="bg-gray-50 border border-gray-100 py-2 px-3 rounded-lg text-xs flex-1 overflow-x-auto">
                        {project.publishedUrl}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-200 rounded-lg"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            project.publishedUrl || ""
                          )
                        }
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              {project.status === "published" && (
                <CardFooter className="pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-lg border-gray-200 text-gray-600 flex items-center justify-center gap-1"
                    onClick={() =>
                      window.open(project.publishedUrl || "", "_blank")
                    }
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Visit Site
                  </Button>
                </CardFooter>
              )}
            </Card>

            <Card className="border-0 rounded-xl shadow-md overflow-hidden">
              <div className={`h-1 w-full ${project.color}`}></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-indigo-100 p-1.5">
                      <Layers className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="font-medium">
                      {project.pageCount} page
                      {project.pageCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-lg border-gray-200 text-gray-600 flex items-center justify-center gap-1"
                  // onClick={() =>
                  //   document.querySelector('button[value="pages"]') as as HTMLButtonElement | null?.click()
                  // }
                  onClick={() => {
                    const button = document.querySelector(
                      'button[value="pages"]'
                    ) as HTMLButtonElement | null;
                    button?.click();
                  }}
                >
                  Manage Pages <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-0 rounded-xl shadow-md overflow-hidden">
              <div className={`h-1 w-full ${project.color}`}></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-purple-100 p-1.5 mt-0.5">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Created on</div>
                    <div className="font-medium">
                      {formatDate(project.createdAt)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTime(project.createdAt)}
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-blue-100 p-1.5 mt-0.5">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Last updated</div>
                    <div className="font-medium">
                      {formatDate(project.updatedAt)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTime(project.updatedAt)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3 border-0 rounded-xl shadow-md overflow-hidden">
              <div className={`h-1 w-full ${project.color}`}></div>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common tasks for managing your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto py-6 px-4 border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 rounded-xl flex flex-col items-center justify-center text-left shadow-sm transition-all"
                    onClick={() => router.push(`/builder/${project.id}`)}
                  >
                    <div className="rounded-full bg-indigo-100 p-3 mb-3">
                      <Code className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium">Edit Content</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Use the drag & drop builder
                      </div>
                    </div>
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-auto py-6 px-4 border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 rounded-xl flex flex-col items-center justify-center text-left shadow-sm transition-all"
                      >
                        <div className="rounded-full bg-emerald-100 p-3 mb-3">
                          <Globe className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-medium">Publish Site</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Make your website public
                          </div>
                        </div>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-xl border-0 shadow-xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                          Publish Your Website
                        </DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-gray-600">
                          Are you sure you want to publish your website? This
                          will make it accessible to the public.
                        </p>
                        {project.status === "published" && (
                          <div className="mt-4 p-4 bg-amber-50 text-amber-800 rounded-lg border border-amber-100">
                            <div className="flex items-start gap-3">
                              <Sparkles className="h-5 w-5 text-amber-500 mt-0.5" />
                              <div>
                                <p className="font-medium">
                                  Your site is already published
                                </p>
                                <p className="text-sm mt-1">
                                  Publishing again will update the live version
                                  with your latest changes.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter className="gap-3">
                        <DialogClose asChild>
                          <Button
                            variant="outline"
                            className="rounded-lg border-gray-200"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                          Publish Now
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    className="h-auto py-6 px-4 border-gray-200 hover:border-purple-200 hover:bg-purple-50 rounded-xl flex flex-col items-center justify-center text-left shadow-sm transition-all"
                    onClick={() => {
                      const button = document.querySelector(
                        'button[value="settings"]'
                      ) as HTMLButtonElement | null;
                      button?.click();
                    }}
                  >
                    <div className="rounded-full bg-purple-100 p-3 mb-3">
                      <Settings className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Site Settings</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Configure your website
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-6 px-4 border-gray-200 hover:border-blue-200 hover:bg-blue-50 rounded-xl flex flex-col items-center justify-center text-left shadow-sm transition-all"
                    onClick={() => router.push(`/preview/${project.id}`)}
                  >
                    <div className="rounded-full bg-blue-100 p-3 mb-3">
                      <Eye className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Preview</div>
                      <div className="text-xs text-gray-500 mt-1">
                        See how your site looks
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="mt-8">
          <Card className="border-0 rounded-xl shadow-md overflow-hidden">
            <div className={`h-1 w-full ${project.color}`}></div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Pages</CardTitle>
                  <CardDescription>
                    Manage the pages of your website
                  </CardDescription>
                </div>
                <Button className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Page
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto">
                <div className="rounded-full bg-indigo-100 p-4 mb-4">
                  <Layers className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Manage Your Pages</h3>
                <p className="text-gray-600 mb-6">
                  Add, remove, and organize the pages of your website. Each page
                  can be customized with its own layout and content.
                </p>
                <Button
                  variant="outline"
                  className="rounded-full border-gray-200"
                >
                  Page Management Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-8">
          <Card className="border-0 rounded-xl shadow-md overflow-hidden">
            <div className={`h-1 w-full ${project.color}`}></div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">
                    Project Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your project settings
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full border-gray-200"
                >
                  <Settings className="h-4 w-4 mr-1" /> Advanced Settings
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto">
                <div className="rounded-full bg-purple-100 p-4 mb-4">
                  <Settings className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Project Configuration
                </h3>
                <p className="text-gray-600 mb-6">
                  Configure SEO settings, integrations, custom domains, and
                  other project settings to enhance your website.
                </p>
                <Button
                  variant="outline"
                  className="rounded-full border-gray-200"
                >
                  Settings Panel Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-8">
          <Card className="border-0 rounded-xl shadow-md overflow-hidden">
            <div className={`h-1 w-full ${project.color}`}></div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Analytics</CardTitle>
                  <CardDescription>
                    View traffic and usage statistics
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full border-gray-200"
                >
                  <BarChart3 className="h-4 w-4 mr-1" /> View Reports
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto">
                <div className="rounded-full bg-blue-100 p-4 mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Website Analytics</h3>
                <p className="text-gray-600 mb-6">
                  Track visitors, page views, conversions, and other important
                  metrics to measure the success of your website.
                </p>
                <Button
                  variant="outline"
                  className="rounded-full border-gray-200"
                >
                  Analytics Dashboard Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
