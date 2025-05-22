// src/components/editor/BuilderEditor.tsx

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Canvas from "./canvas/canvas";
import { LeftSidebar } from "./sidebar/left/left-sidebar";
import { RightSidebar } from "./sidebar/right/right-sidebar";
import { Toolbar } from "./toolbar/toolbar";
import { loadProject } from "@/redux/slices/builderSlice";

interface BuilderEditorProps {
  projectId: string;
}

export function BuilderEditor({ projectId }: BuilderEditorProps) {
  const dispatch = useDispatch();

  // Load project data on mount
  useEffect(() => {
    // In a real app, you'd fetch the project data from your API
    // For now, we'll use a mock loadProject action
    dispatch(loadProject(projectId));
  }, [projectId, dispatch]);

  return (
    <div className="builder-editor flex h-screen overflow-hidden">
      <LeftSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Toolbar />
        <div className="flex-1 overflow-auto">
          <Canvas />
        </div>
      </div>
      <RightSidebar />
    </div>
  );
}
