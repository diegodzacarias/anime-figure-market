import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ApiErrorResponse } from "@/lib/apiError";

type ApiErrorToastProps = {
  error: ApiErrorResponse | null;
  onClose: () => void;
};

const ApiErrorToast = ({ error, onClose }: ApiErrorToastProps) => {
  if (!error) return null;

  const details = error.details ? Object.entries(error.details) : [];

  return (
    <div className="fixed right-4 top-20 z-[100] w-[calc(100vw-2rem)] max-w-lg rounded-lg border border-destructive/30 bg-background/90 p-4 text-foreground shadow-lg backdrop-blur md:right-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-destructive">
            {error.status ? `${error.status} ${error.error || "Error"}` : error.error || "Error"}
          </p>
          <p className="mt-1 text-sm">{error.message}</p>
        </div>

        <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-3 space-y-1 text-xs text-muted-foreground">
        {error.path && <p>Path: {error.path}</p>}
        {error.requestId && <p>Request ID: {error.requestId}</p>}
        {error.timestamp && <p>Timestamp: {error.timestamp}</p>}
      </div>

      {details.length > 0 && (
        <div className="mt-3 rounded-md border border-destructive/20 bg-destructive/5 p-3">
          <p className="text-xs font-medium text-destructive">Details</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            {details.map(([field, message]) => (
              <li key={field}>
                <span className="font-medium text-foreground">{field}:</span> {message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApiErrorToast;
