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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

interface ProjectDetails {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedUrl: string | null;
  pageCount: number;
  status: "draft" | "published";
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 flex justify-center">
        <div className="w-8 h-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <p className="mb-8">
          The project you are looking for does not exist or has been deleted.
        </p>
        <Button onClick={() => router.push("/projects")}>
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-gray-500 mt-1">{project.description}</p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.push(`/preview/${project.id}`)}
          >
            Preview
          </Button>

          <Button onClick={() => router.push(`/builder/${project.id}`)}>
            Edit Site
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your project and all associated pages and data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      project.status === "published"
                        ? "bg-green-500"
                        : "bg-amber-500"
                    }`}
                  ></span>
                  <span className="capitalize">{project.status}</span>
                </div>

                {project.publishedUrl && (
                  <div className="mt-4">
                    <label className="text-sm text-gray-500 mb-1 block">
                      Public URL
                    </label>
                    <div className="flex gap-2">
                      <code className="bg-gray-100 py-1 px-2 rounded text-xs flex-1 overflow-x-auto">
                        {project.publishedUrl}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
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
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <span>
                      {project.pageCount} page
                      {project.pageCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      document.querySelector('button[value="pages"]')?.click()
                    }
                  >
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Timestamps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Created</div>
                    <div className="text-sm">
                      {formatDate(project.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500">Last Updated</div>
                    <div className="text-sm">
                      {formatDate(project.updatedAt)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks for managing your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center text-left"
                    onClick={() => router.push(`/builder/${project.id}`)}
                  >
                    <Code className="h-8 w-8 mb-2" />
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
                        className="h-auto py-4 flex flex-col items-center justify-center text-left"
                      >
                        <Globe className="h-8 w-8 mb-2" />
                        <div>
                          <div className="font-medium">Publish Site</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Make your website public
                          </div>
                        </div>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Publish Your Website</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>
                          Are you sure you want to publish your website? This
                          will make it accessible to the public.
                        </p>
                        {project.status === "published" && (
                          <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded">
                            Your site is already published. Publishing again
                            will update the live version.
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button>Publish Now</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center text-left"
                    onClick={() =>
                      document
                        .querySelector('button[value="settings"]')
                        ?.click()
                    }
                  >
                    <Settings className="h-8 w-8 mb-2" />
                    <div>
                      <div className="font-medium">Site Settings</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Configure your website
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center text-left"
                    onClick={() => router.push(`/preview/${project.id}`)}
                  >
                    <Share2 className="h-8 w-8 mb-2" />
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

        <TabsContent value="pages" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pages</CardTitle>
              <CardDescription>
                Manage the pages of your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 py-8 text-center">
                Page management functionality will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
              <CardDescription>Configure your project settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 py-8 text-center">
                Project settings functionality will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                View traffic and usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 py-8 text-center">
                Analytics functionality will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
