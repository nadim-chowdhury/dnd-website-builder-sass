"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Folder, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Mock data for projects
const dummyProjects = [
  {
    id: "proj-1",
    name: "Landing Page",
    description: "Company landing page with hero section and features",
    updatedAt: "2025-05-01T12:00:00Z",
    thumbnailUrl: "/assets/project-thumb-1.jpg",
  },
  {
    id: "proj-2",
    name: "Portfolio",
    description: "Personal portfolio with projects showcase",
    updatedAt: "2025-05-10T15:30:00Z",
    thumbnailUrl: "/assets/project-thumb-2.jpg",
  },
  {
    id: "proj-3",
    name: "E-commerce Homepage",
    description: "Main page for an online store",
    updatedAt: "2025-05-15T09:45:00Z",
    thumbnailUrl: "/assets/project-thumb-3.jpg",
  },
];

export default function ProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState(dummyProjects);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;

    const newProject = {
      id: `proj-${projects.length + 1}`,
      name: newProjectName,
      description: newProjectDescription,
      updatedAt: new Date().toISOString(),
      thumbnailUrl: "/assets/project-thumb-default.jpg",
    };

    setProjects([...projects, newProject]);
    setNewProjectName("");
    setNewProjectDescription("");

    // Navigate to the builder for the new project
    router.push(`/builder/${newProject.id}`);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Projects</h1>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-8 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="My Awesome Website"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-description">
                    Description (optional)
                  </Label>
                  <Input
                    id="project-description"
                    value={newProjectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
                    placeholder="Brief description of your project"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleCreateProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <Folder className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No projects found</h3>
          <p className="mt-2 text-gray-500">
            {searchQuery
              ? "Try a different search term"
              : "Create your first project to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div
                className="h-40 bg-gray-100 cursor-pointer"
                onClick={() => router.push(`/projects/${project.id}`)}
                style={{
                  backgroundImage: `url(${project.thumbnailUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl truncate">
                    {project.name}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => router.push(`/builder/${project.id}`)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push(`/preview/${project.id}`)}
                      >
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-500 text-sm line-clamp-2">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter className="text-xs text-gray-500">
                Last updated: {formatDate(project.updatedAt)}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
