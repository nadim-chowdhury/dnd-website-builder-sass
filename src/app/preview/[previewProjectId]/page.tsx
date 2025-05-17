"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/services/projects";
import { useTemplates } from "@/services/templates";
import { ProjectSerializer } from "@/editor/serializer/project-serializer";
import { Renderer } from "@/editor/engine/renderer";

interface DeviceFrame {
  name: string;
  width: string;
  height: string;
  className: string;
}

const deviceFrames: Record<string, DeviceFrame> = {
  desktop: {
    name: "Desktop",
    width: "100%",
    height: "100%",
    className: "w-full h-full border rounded-md overflow-hidden",
  },
  laptop: {
    name: "Laptop",
    width: "1024px",
    height: "768px",
    className:
      "w-full max-w-[1024px] h-[768px] mx-auto border rounded-md overflow-hidden shadow-md",
  },
  tablet: {
    name: "Tablet",
    width: "768px",
    height: "1024px",
    className:
      "w-full max-w-[768px] h-[1024px] mx-auto border rounded-md overflow-hidden shadow-md",
  },
  mobile: {
    name: "Mobile",
    width: "375px",
    height: "667px",
    className:
      "w-full max-w-[375px] h-[667px] mx-auto border rounded-md overflow-hidden shadow-md",
  },
};

export default function PreviewPage() {
  const router = useRouter();
  const { previewProjectId } = useParams();
  const { getProjectById } = useProjects();
  const { getTemplateById } = useTemplates();

  const [projectData, setProjectData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDevice, setActiveDevice] = useState<string>("desktop");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isTemplate, setIsTemplate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof previewProjectId !== "string") {
        setErrorMessage("Invalid ID");
        setIsLoading(false);
        return;
      }

      try {
        // First try to get as a project
        let data = await getProjectById(previewProjectId);

        // If not found as project, try as template
        if (!data) {
          data = await getTemplateById(previewProjectId);
          if (data) {
            setIsTemplate(true);
          }
        }

        if (!data) {
          setErrorMessage("Project or template not found");
          setIsLoading(false);
          return;
        }

        // Deserialize the project data if needed
        const serializedData = data.content || data.templateData || null;
        if (serializedData) {
          try {
            const deserializedData =
              typeof serializedData === "string"
                ? JSON.parse(serializedData)
                : serializedData;
            setProjectData(deserializedData);
          } catch (e) {
            console.error("Failed to deserialize project data:", e);
            setErrorMessage("Failed to load project content");
          }
        } else {
          setProjectData(data);
        }
      } catch (error) {
        console.error("Failed to fetch project/template:", error);
        setErrorMessage("Failed to load. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [previewProjectId, getProjectById, getTemplateById]);

  const renderPreview = () => {
    if (!projectData) return null;

    try {
      // Return the renderer component with the project data
      return <Renderer projectData={projectData} isPreview={true} />;
    } catch (error) {
      console.error("Rendering error:", error);
      return (
        <div className="w-full h-full flex items-center justify-center bg-white">
          <div className="text-center p-6">
            <h3 className="text-lg font-medium text-red-600">
              Rendering Error
            </h3>
            <p className="text-gray-500 mt-2">
              There was a problem displaying this preview.
            </p>
          </div>
        </div>
      );
    }
  };

  const handleUseTemplate = () => {
    if (isTemplate) {
      router.push(`/templates/${previewProjectId}`);
    }
  };

  const handleEditProject = () => {
    if (!isTemplate) {
      router.push(`/builder/${previewProjectId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Preview toolbar skeleton */}
        <div className="bg-white border-b shadow-sm p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Skeleton className="h-8 w-40" />
            <div className="flex space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>

        {/* Device tabs skeleton */}
        <div className="container mx-auto py-4">
          <Skeleton className="h-10 w-80 mx-auto" />
        </div>

        {/* Preview frame skeleton */}
        <div className="flex-1 container mx-auto flex items-center justify-center p-6">
          <Skeleton className="w-full max-w-4xl h-[600px] rounded-md" />
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="mb-6">{errorMessage}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const currentDevice = deviceFrames[activeDevice];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Preview toolbar */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => router.back()}>
              ← Back
            </Button>
            <h1 className="ml-4 text-xl font-semibold">
              {isTemplate ? "Template Preview" : "Project Preview"}
            </h1>
          </div>
          <div className="flex space-x-2">
            {isTemplate ? (
              <Button onClick={handleUseTemplate}>Use This Template</Button>
            ) : (
              <Button onClick={handleEditProject}>Edit Project</Button>
            )}
          </div>
        </div>
      </div>

      {/* Device selection tabs */}
      <div className="container mx-auto py-4">
        <Tabs
          value={activeDevice}
          onValueChange={setActiveDevice}
          className="w-fit mx-auto"
        >
          <TabsList>
            {Object.entries(deviceFrames).map(([key, device]) => (
              <TabsTrigger key={key} value={key}>
                {device.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Preview frame */}
      <div className="flex-1 container mx-auto p-6 overflow-auto">
        <div className={currentDevice.className}>
          <div
            className="bg-white w-full h-full overflow-auto"
            style={{
              width: currentDevice.width,
              height: currentDevice.height,
            }}
          >
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
}
