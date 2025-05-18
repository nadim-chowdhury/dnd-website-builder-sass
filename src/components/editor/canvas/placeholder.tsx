import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { selectComponent } from "@/redux/slices/builderSlice";

interface PlaceholderProps {
  id: string;
  name: string;
  className?: string;
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

/**
 * Placeholder component
 * Displayed when a component type is not found or when rendering errors occur
 */
const Placeholder: React.FC<PlaceholderProps> = ({
  id,
  name,
  className = "",
  width = "100%",
  height = "100px",
  children,
}) => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(selectComponent(id));
  };

  return (
    <div
      id={id}
      data-component="placeholder"
      className={cn(
        "border-2 border-dashed border-orange-400 bg-orange-50 flex flex-col items-center justify-center p-4 text-orange-600",
        className
      )}
      style={{ width, height }}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="font-medium text-sm">Component Issue</span>
      </div>
      <p className="text-sm text-center">
        {`Component "${name}" could not be rendered`}
      </p>
      {children && (
        <div className="mt-4 text-sm text-orange-700">{children}</div>
      )}
    </div>
  );
};

export default Placeholder;
