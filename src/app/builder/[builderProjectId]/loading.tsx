"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function BuilderLoading() {
  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Toolbar skeleton */}
      <div className="h-14 border-b bg-background flex items-center px-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      {/* Main editor area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar skeleton */}
        <div className="w-64 border-r bg-muted/40 p-4">
          <Skeleton className="h-8 w-full mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>

        {/* Canvas area skeleton */}
        <div className="flex-1 flex flex-col items-center justify-center bg-muted/20 p-4 overflow-auto">
          <div className="w-full max-w-4xl aspect-[16/9] bg-white rounded-lg shadow-sm relative overflow-hidden">
            {/* Header skeleton */}
            <div className="absolute top-0 left-0 right-0 h-16 px-6 flex items-center">
              <Skeleton className="h-8 w-32" />
              <div className="ml-auto flex space-x-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>

            {/* Content skeleton */}
            <div className="absolute top-24 left-6 right-6">
              <Skeleton className="h-12 w-3/4 mb-6" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <Skeleton className="h-10 w-32 mb-10" />

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div>
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar skeleton */}
        <div className="w-80 border-l bg-muted/40 p-4">
          <Skeleton className="h-8 w-full mb-6" />
          <div className="space-y-6">
            <div>
              <Skeleton className="h-5 w-24 mb-3" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-24 mb-3" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-5 w-24 mb-3" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-24 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
