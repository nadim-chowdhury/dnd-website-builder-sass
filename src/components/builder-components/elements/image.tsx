import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface ImageComponentProps {
  id: string;
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  isEditing?: boolean;
  isSelected?: boolean;
  caption?: string;
  showCaption?: boolean;
  clickAction?: "none" | "enlarge" | "link";
  linkUrl?: string;
  placeholderColor?: string;
}

/**
 * Image component for the website builder
 * Supports different sizes, object-fit options, captions, and click actions
 */
export default function ImageComponent({
  id,
  src = "/placeholder.svg",
  alt = "Image",
  className = "",
  style = {},
  width = 400,
  height = 300,
  objectFit = "cover",
  isEditing = false,
  isSelected = false,
  caption,
  showCaption = false,
  clickAction = "none",
  linkUrl = "",
  placeholderColor = "#f3f4f6",
}: ImageComponentProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const containerClasses = cn(
    "relative",
    isSelected && !isEditing && "ring-2 ring-primary ring-offset-2",
    className
  );

  const imageClasses = cn(
    "transition-opacity duration-300",
    !imageLoaded && "opacity-0",
    imageLoaded && "opacity-100"
  );

  // Handle image click based on clickAction
  const handleClick = () => {
    if (isEditing) return;

    switch (clickAction) {
      case "enlarge":
        setIsEnlarged(true);
        break;
      case "link":
        if (linkUrl) {
          window.open(linkUrl, "_blank");
        }
        break;
      default:
        // Do nothing for 'none'
        break;
    }
  };

  // Handle image load and error events
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Still mark as loaded to show fallback
  };

  // Render placeholder or fallback when image fails to load
  const renderPlaceholder = () => (
    <div
      className="w-full h-full flex items-center justify-center bg-gray-100"
      style={{ backgroundColor: placeholderColor }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );

  // Enlarged image modal
  const renderEnlargedView = () => {
    if (!isEnlarged) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
        onClick={() => setIsEnlarged(false)}
      >
        <div className="relative max-w-4xl max-h-[90vh]">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={900}
            className="object-contain max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-white"
            onClick={() => setIsEnlarged(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {caption && (
            <div className="bg-white/80 p-2 text-center mt-2">{caption}</div>
          )}
        </div>
      </div>
    );
  };

  // The main image component
  const imageElement = (
    <>
      {!imageLoaded && renderPlaceholder()}
      {imageError ? (
        renderPlaceholder()
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          style={{
            objectFit,
            ...style,
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={handleClick}
          data-component-type="image"
        />
      )}
      {showCaption && caption && (
        <div className="text-center p-2 text-sm text-gray-600">{caption}</div>
      )}
    </>
  );

  // Wrap in appropriate container based on editing mode and click action
  return (
    <div id={id} className={containerClasses} data-component-type="image">
      {isEditing || clickAction === "none" ? (
        imageElement
      ) : (
        <>
          {clickAction === "link" && linkUrl ? (
            <a
              href={isEditing ? undefined : linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              {imageElement}
            </a>
          ) : (
            <div className={clickAction === "enlarge" ? "cursor-zoom-in" : ""}>
              {imageElement}
            </div>
          )}
        </>
      )}
      {renderEnlargedView()}
    </div>
  );
}
