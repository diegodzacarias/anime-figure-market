import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PageControlsProps = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
};

const pageSizeOptions = [10, 20, 50, 100];

const PageControls = ({
  page,
  size,
  totalElements,
  totalPages,
  disabled = false,
  onPageChange,
  onSizeChange,
}: PageControlsProps) => {
  const currentPage = totalPages > 0 ? page + 1 : 0;
  const canGoPrevious = page > 0 && !disabled;
  const canGoNext = page + 1 < totalPages && !disabled;

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
      <div>
        Page {currentPage} of {totalPages} - {totalElements} records
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="text-xs font-medium text-muted-foreground" htmlFor="page-size">
          Rows
        </label>
        <select
          id="page-size"
          value={size}
          disabled={disabled}
          onChange={(event) => onSizeChange(Number(event.target.value))}
          className="rounded border border-input bg-background px-2 py-1 text-foreground"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1"
          disabled={!canGoNext}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PageControls;
