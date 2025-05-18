"use client";

import { DragDropProvider } from "@/components/providers/drag-drop-provider";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DragDropProvider>{children}</DragDropProvider>;
}
