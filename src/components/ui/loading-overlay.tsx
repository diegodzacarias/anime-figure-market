import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingOverlayProps = {
  active: boolean;
  label?: string;
  message?: string;
  className?: string;
  fullscreen?: boolean;
  children?: React.ReactNode;
};

const LoadingIndicator = ({ label, className }: { label: string; className?: string }) => (
  <div
    className={cn(
      "absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm",
      className
    )}
  >
    <div className="flex items-center gap-3 rounded-md border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-card">
      <Loader2 className="h-4 w-4 animate-spin text-primary" />
      {label}
    </div>
  </div>
);

const LoadingOverlay = ({
  active,
  label,
  message,
  className,
  fullscreen = false,
  children,
}: LoadingOverlayProps) => {
  const loadingLabel = label || message || "Loading...";

  if (fullscreen) {
    if (children) {
      return (
        <>
          {children}
          {active && (
            <LoadingIndicator
              label={loadingLabel}
              className="fixed z-[100] rounded-none bg-background/75"
            />
          )}
        </>
      );
    }

    return active ? (
      <LoadingIndicator
        label={loadingLabel}
        className="fixed z-[100] rounded-none bg-background/75"
      />
    ) : null;
  }

  if (children) {
    return (
      <div className={cn("relative", className)}>
        {children}
        {active && <LoadingIndicator label={loadingLabel} />}
      </div>
    );
  }

  if (!active) return null;

  return (
    <div className="absolute inset-0">
      <LoadingIndicator label={loadingLabel} />
    </div>
  );
};

export default LoadingOverlay;
