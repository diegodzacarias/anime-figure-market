import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { FigureOption } from "@/components/figureAlias/FigureAliasFormDialog";

type FigureComboboxProps = {
  figures: FigureOption[];
  value: string;
  disabled?: boolean;
  loading?: boolean;
  onChange: (value: string) => void;
};

const FigureCombobox = ({
  figures,
  value,
  disabled,
  loading,
  onChange,
}: FigureComboboxProps) => {
  const [open, setOpen] = useState(false);
  const selectedFigure = figures.find((figure) => figure.id.toString() === value);

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          disabled={disabled}
          className="min-h-10 w-full justify-between whitespace-normal text-left font-normal"
        >
          <span className="line-clamp-2">
            {selectedFigure
              ? selectedFigure.name
              : loading
                ? "Loading figures..."
                : "Select a figure"}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(42rem,calc(100vw-2rem))] p-0">
        <Command>
          <CommandInput placeholder="Search figure..." />
          <CommandList
            className="max-h-80 overflow-y-auto"
            onWheelCapture={(event) => event.stopPropagation()}
            onTouchMoveCapture={(event) => event.stopPropagation()}
          >
            <CommandEmpty>No figure found.</CommandEmpty>
            <CommandGroup>
              {figures.map((figure) => (
                <CommandItem
                  key={figure.id}
                  value={`${figure.name} ${figure.id}`}
                  onSelect={() => {
                    onChange(figure.id.toString());
                    setOpen(false);
                  }}
                  className="items-start gap-2 py-3"
                >
                  <Check
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      value === figure.id.toString() ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="whitespace-normal leading-snug">{figure.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FigureCombobox;
