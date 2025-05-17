"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Folder,
  MoreVertical,
  Calendar,
  Edit,
  Eye,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
import { Textarea } from "@/components/ui/textarea";

// Mock data for projects with colorful accents
const dummyProjects = [
  {
    id: "proj1",
    name: "Landing Page",
    description: "Company landing page with hero section and features",
    updatedAt: "2025-05-01T12:00:00Z",
    thumbnailUrl:
      "https://images.pexels.com/photos/6476260/pexels-photo-6476260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "bg-blue-500",
  },
  {
    id: "proj2",
    name: "Portfolio",
    description: "Personal portfolio with projects showcase",
    updatedAt: "2025-05-10T15:30:00Z",
    thumbnailUrl:
      "https://images.pexels.com/photos/7693699/pexels-photo-7693699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "bg-purple-500",
  },
  {
    id: "proj3",
    name: "E-commerce Homepage",
    description: "Main page for an online store",
    updatedAt: "2025-05-15T09:45:00Z",
    thumbnailUrl:
      "https://images.pexels.com/photos/7693746/pexels-photo-7693746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "bg-emerald-500",
  },
];

const colorOptions = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-indigo-500",
  "bg-cyan-500",
  "bg-pink-500",
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

    const randomColor =
      colorOptions[Math.floor(Math.random() * colorOptions.length)];

    const newProject = {
      id: `proj-${projects.length + 1}`,
      name: newProjectName,
      description: newProjectDescription,
      updatedAt: new Date().toISOString(),
      thumbnailUrl: "/assets/project-thumb-default.jpg",
      color: randomColor,
    };

    setProjects([...projects, newProject]);
    setNewProjectName("");
    setNewProjectDescription("");

    // Navigate to the builder for the new project
    router.push(`/builder/${newProject.id}`);
  };

  const handleDeleteProject = (projectId: any) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          My Projects
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-10 w-full rounded-full border-gray-200 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-md transition-all">
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-xl border-0 shadow-xl bg-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Create New Project
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-name" className="font-medium">
                    Project Name
                  </Label>
                  <Input
                    id="project-name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="My Awesome Website"
                    className="rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-description" className="font-medium">
                    Description (optional)
                  </Label>
                  <Textarea
                    id="project-description"
                    value={newProjectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
                    placeholder="Brief description of your project"
                    className="rounded-lg min-h-24 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline" className="rounded-lg">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleCreateProject}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-white"
                >
                  Create Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
          <div className="bg-gray-100 p-4 rounded-full inline-flex items-center justify-center">
            <Folder className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            No projects found
          </h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            {searchQuery
              ? "Try a different search term"
              : "Your creative journey starts here. Create your first project to begin."}
          </p>
          {!searchQuery && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-md transition-all">
                  <Plus className="mr-2 h-4 w-4" /> Create Your First Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-xl border-0 shadow-xl">
                {/* Same dialog content as above */}
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    Create New Project
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-name-empty" className="font-medium">
                      Project Name
                    </Label>
                    <Input
                      id="project-name-empty"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder="My Awesome Website"
                      className="rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="project-description-empty"
                      className="font-medium"
                    >
                      Description (optional)
                    </Label>
                    <Textarea
                      id="project-description-empty"
                      value={newProjectDescription}
                      onChange={(e) => setNewProjectDescription(e.target.value)}
                      placeholder="Brief description of your project"
                      className="rounded-lg min-h-24 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline" className="rounded-lg">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleCreateProject}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg"
                  >
                    Create Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <div
                  className="h-48 bg-gray-100 cursor-pointer"
                  onClick={() => router.push(`/projects/${project.id}`)}
                  style={{
                    backgroundImage: `url(${project.thumbnailUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="secondary"
                      className="bg-white text-gray-800 hover:bg-gray-100 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/preview/${project.id}`);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" /> Preview
                    </Button>
                  </div>
                </div>
                <div className={`h-2 ${project.color}`}></div>
              </div>

              <CardHeader className="pt-4 pb-0">
                <div className="flex justify-between items-start">
                  <h3
                    className="text-xl font-bold hover:text-indigo-600 cursor-pointer truncate"
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    {project.name}
                  </h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-lg">
                      <DropdownMenuItem
                        onClick={() => router.push(`/builder/${project.id}`)}
                        className="flex items-center cursor-pointer hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4 mr-2 text-gray-500" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push(`/preview/${project.id}`)}
                        className="flex items-center cursor-pointer hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4 mr-2 text-gray-500" /> Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center cursor-pointer hover:bg-red-50 text-red-600"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="py-3">
                <p className="text-gray-600 text-sm line-clamp-2">
                  {project.description}
                </p>
              </CardContent>

              <CardFooter className="pt-0 pb-4 text-xs text-gray-400 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Updated {formatDate(project.updatedAt)}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
