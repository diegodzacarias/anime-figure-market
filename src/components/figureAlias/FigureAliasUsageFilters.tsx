import { Input } from "@/components/ui/input";
import { SCRAPING_SOURCE_OPTIONS } from "@/lib/scrapingSources";
import type { FigureAliasUsageFilter } from "@/types/figureAlias";

type FigureAliasUsageFiltersProps = {
  usage: FigureAliasUsageFilter;
  sourceCode: string;
  lastUsedBefore: string;
  disabled?: boolean;
  onUsageChange: (value: FigureAliasUsageFilter) => void;
  onSourceCodeChange: (value: string) => void;
  onLastUsedBeforeChange: (value: string) => void;
};

const selectClass = "h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground";

const FigureAliasUsageFilters = ({
  usage,
  sourceCode,
  lastUsedBefore,
  disabled,
  onUsageChange,
  onSourceCodeChange,
  onLastUsedBeforeChange,
}: FigureAliasUsageFiltersProps) => (
  <div className="grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-3">
    <label className="grid gap-1 text-xs font-medium text-muted-foreground">
      Usage
      <select
        value={usage}
        disabled={disabled}
        className={selectClass}
        onChange={(event) => onUsageChange(event.target.value as FigureAliasUsageFilter)}
      >
        <option value="">All aliases</option>
        <option value="used">Used</option>
        <option value="never-used">Never used</option>
      </select>
    </label>

    <label className="grid gap-1 text-xs font-medium text-muted-foreground">
      Scraping source
      <select
        value={sourceCode}
        disabled={disabled}
        className={selectClass}
        onChange={(event) => onSourceCodeChange(event.target.value)}
      >
        <option value="">All sources</option>
        {SCRAPING_SOURCE_OPTIONS.map((source) => (
          <option key={source.value} value={source.value}>
            {source.label}
          </option>
        ))}
      </select>
    </label>

    <label className="grid gap-1 text-xs font-medium text-muted-foreground sm:col-span-2 xl:col-span-1">
      Last use before
      <Input
        type="datetime-local"
        value={lastUsedBefore}
        disabled={disabled}
        onChange={(event) => onLastUsedBeforeChange(event.target.value)}
      />
    </label>
  </div>
);

export default FigureAliasUsageFilters;
