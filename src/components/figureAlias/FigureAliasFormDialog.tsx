import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingOverlay from "@/components/ui/loading-overlay";
import FigureCombobox from "@/components/figure/FigureCombobox";
import { ReferenceDataOption } from "@/types/referenceData";

export type FigureAlias = {
  id?: number;
  figureId?: number;
  sourceId?: number;
  alias?: string;
  aliasNormalized?: string;
  loadMethod?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FigureOption = {
  id: number;
  name: string;
};

export type SourceOption = {
  id: number;
  name: string;
  baseUrl?: string;
};

type FigureAliasFormDialogProps = {
  figureAlias: FigureAlias | null;
  figures: FigureOption[];
  sources: SourceOption[];
  loadMethods: ReferenceDataOption[];
  open: boolean;
  saving: boolean;
  loadingOptions: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: Record<string, string | number>) => Promise<void>;
};

const FigureAliasFormDialog = ({
  figureAlias,
  figures,
  sources,
  loadMethods,
  open,
  saving,
  loadingOptions,
  onOpenChange,
  onSubmit,
}: FigureAliasFormDialogProps) => {
  const [form, setForm] = useState({
    figureId: "",
    sourceId: "",
    alias: "",
    loadMethod: "MANUAL",
  });

  useEffect(() => {
    if (!open) return;

    setForm({
      figureId: figureAlias?.figureId?.toString() || "",
      sourceId: figureAlias?.sourceId?.toString() || "",
      alias: figureAlias?.alias || "",
      loadMethod: figureAlias?.loadMethod || "MANUAL",
    });
  }, [figureAlias, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Record<string, string | number> = {
      figureId: Number(form.figureId),
      alias: form.alias.trim(),
      loadMethod: form.loadMethod,
    };

    if (form.sourceId) payload.sourceId = Number(form.sourceId);

    await onSubmit(payload);
  };

  const selectClass =
    "w-full border border-input bg-background text-foreground p-2 rounded";
  const optionClass = "bg-background text-foreground";
  const helperClass = "mt-1 text-xs text-muted-foreground";
  const labelClass = "mb-1 block text-sm font-medium text-foreground";
  const requiredMark = <span className="text-destructive">*</span>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <LoadingOverlay active={saving} label="Saving figure alias..." />

        <DialogHeader>
          <DialogTitle>{figureAlias ? "Update Figure Alias" : "New Figure Alias"}</DialogTitle>
          <DialogDescription>
            Manage alternate names used to match figure listings from sources.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Figure {requiredMark}</label>
              <FigureCombobox
                figures={figures}
                value={form.figureId}
                disabled={loadingOptions || figures.length === 0}
                loading={loadingOptions}
                onChange={(value) => setForm((prev) => ({ ...prev, figureId: value }))}
              />
              <input name="figureId" value={form.figureId} required className="sr-only" onChange={() => undefined} />
              <p className={helperClass}>Figura a la que pertenece este alias.</p>
            </div>

            <div>
              <label className={labelClass}>Source</label>
              <select
                name="sourceId"
                value={form.sourceId}
                onChange={handleChange}
                className={selectClass}
                disabled={loadingOptions || sources.length === 0}
              >
                <option className={optionClass} value="">
                  {loadingOptions ? "Loading sources..." : "None"}
                </option>
                {sources.map((source) => (
                  <option className={optionClass} key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Fuente donde aplica o se identifico el alias, si corresponde.</p>
            </div>

            <div>
              <label className={labelClass}>Alias {requiredMark}</label>
              <Input
                name="alias"
                maxLength={255}
                value={form.alias}
                onChange={handleChange}
                required
              />
              <p className={helperClass}>Texto alternativo usado para busqueda o coincidencias.</p>
            </div>

            <div>
              <label className={labelClass}>Load Method {requiredMark}</label>
              <select
                name="loadMethod"
                value={form.loadMethod}
                onChange={handleChange}
                className={selectClass}
                required
              >
                {loadMethods.map((method) => (
                  <option className={optionClass} key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Forma en que se cargo el alias.</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : figureAlias ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FigureAliasFormDialog;
