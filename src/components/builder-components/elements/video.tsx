import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface VideoProps {
  id: string;
  src?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  poster?: string;
  isEditing?: boolean;
  isSelected?: boolean;
  isYouTube?: boolean;
  isVimeo?: boolean;
  caption?: string;
  showCaption?: boolean;
  aspectRatio?: "16:9" | "4:3" | "1:1" | "none";
}

/**
 * Video component for the website builder
 * Supports various video sources (direct URL, YouTube, Vimeo)
 * and player configurations
 */
export default function Video({
  id,
  src = "",
  className = "",
  style = {},
  width = "100%",
  height = "auto",
  controls = true,
  autoPlay = false,
  muted = true,
  loop = false,
  poster = "",
  isEditing = false,
  isSelected = false,
  isYouTube = false,
  isVimeo = false,
  caption = "",
  showCaption = false,
  aspectRatio = "16:9",
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Set aspect ratio classes
  const aspectRatioClasses = {
    "16:9": "aspect-w-16 aspect-h-9",
    "4:3": "aspect-w-4 aspect-h-3",
    "1:1": "aspect-w-1 aspect-h-1",
    none: "",
  };

  const containerClasses = cn(
    "relative",
    aspectRatio !== "none" && aspectRatioClasses[aspectRatio],
    isSelected && !isEditing && "ring-2 ring-primary ring-offset-2",
    className
  );

  // Process YouTube or Vimeo URLs to extract video IDs
  const getEmbedUrl = () => {
    if (!src) return "";

    if (isYouTube) {
      // Extract YouTube ID from various URL formats
      const youtubeRegex =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = src.match(youtubeRegex);
      const videoId = match ? match[1] : src;
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&controls=${controls ? 1 : 0}&loop=${loop ? 1 : 0}`;
    }

    if (isVimeo) {
      // Extract Vimeo ID from various URL formats
      const vimeoRegex =
        /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/\d+\/video\/|)(\d+)(?:$|\/|\?))/;
      const match = src.match(vimeoRegex);
      const videoId = match ? match[1] : src;
      return `https://player.vimeo.com/video/${videoId}?autoplay=${autoPlay ? 1 : 0}&muted=${muted ? 1 : 0}&controls=${controls ? 1 : 0}&loop=${loop ? 1 : 0}`;
    }

    return src;
  };

  // Reset error state if src changes
  useEffect(() => {
    setIsError(false);
    setIsLoaded(false);
  }, [src]);

  // Handle video error
  const handleError = () => {
    setIsError(true);
    console.error("Video failed to load:", src);
  };

  // Handle video load
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Render placeholder for video
  const renderPlaceholder = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="mt-2 text-gray-500">
          {isError ? "Video failed to load" : "Video placeholder"}
        </p>
      </div>
    </div>
  );

  // Render embedded video (YouTube, Vimeo)
  const renderEmbeddedVideo = () => {
    const embedUrl = getEmbedUrl();
    if (!embedUrl) return renderPlaceholder();

    return (
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title="Video"
      />
    );
  };

  // Render direct video
  const renderDirectVideo = () => {
    return (
      <>
        {(!isLoaded || isError) && renderPlaceholder()}
        <video
          ref={videoRef}
          className={cn("w-full h-full", !isLoaded && "hidden")}
          controls={controls}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          poster={poster}
          onError={handleError}
          onLoadedData={handleLoad}
          style={
            aspectRatio === "none" ? { width, height, ...style } : { ...style }
          }
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </>
    );
  };

  return (
    <div id={id} className={containerClasses} data-component-type="video">
      {isYouTube || isVimeo ? renderEmbeddedVideo() : renderDirectVideo()}

      {showCaption && caption && (
        <div className="text-center p-2 text-sm text-gray-600 mt-1">
          {caption}
        </div>
      )}
    </div>
  );
}
