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
import { ReferenceDataOption } from "@/types/referenceData";

export type Source = {
  id?: number;
  name?: string;
  baseUrl?: string;
  type?: string;
  priority?: string | null;
  active?: boolean;
};

type SourceFormDialogProps = {
  source: Source | null;
  sourceTypes: ReferenceDataOption[];
  sourcePriorities: ReferenceDataOption[];
  open: boolean;
  saving: boolean;
  nameError?: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: Record<string, string | number | boolean>) => Promise<void>;
};

const SourceFormDialog = ({
  source,
  sourceTypes,
  sourcePriorities,
  open,
  saving,
  nameError,
  onOpenChange,
  onSubmit,
}: SourceFormDialogProps) => {
  const [form, setForm] = useState({
    name: "",
    baseUrl: "",
    type: "OFFICIAL",
    priority: "MEDIUM",
    active: "true",
  });

  useEffect(() => {
    if (!open) return;

    setForm({
      name: source?.name || "",
      baseUrl: source?.baseUrl || "",
      type: source?.type || "OFFICIAL",
      priority: source?.priority || "MEDIUM",
      active: (source?.active ?? true).toString(),
    });
  }, [open, source]);

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

    const payload: Record<string, string | number | boolean> = {
      name: form.name.trim(),
      type: form.type,
      active: form.active === "true",
      priority: form.priority,
    };

    if (form.baseUrl.trim()) payload.baseUrl = form.baseUrl.trim();

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
        <LoadingOverlay active={saving} label="Saving source..." />

        <DialogHeader>
          <DialogTitle>{source ? "Update Source" : "New Source"}</DialogTitle>
          <DialogDescription>
            Manage marketplace source metadata used by aliases and listings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Name {requiredMark}</label>
              <Input name="name" maxLength={100} value={form.name} onChange={handleChange} required />
              {nameError ? (
                <p className="mt-1 text-xs text-destructive">{nameError}</p>
              ) : (
                <p className={helperClass}>Nombre visible de la fuente.</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Base URL</label>
              <Input
                name="baseUrl"
                type="url"
                maxLength={200}
                value={form.baseUrl}
                onChange={handleChange}
              />
              <p className={helperClass}>URL principal de la tienda o marketplace.</p>
            </div>

            <div>
              <label className={labelClass}>Type {requiredMark}</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={selectClass}
                required
              >
                {sourceTypes.map((type) => (
                  <option className={optionClass} key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Tipo o categoria de fuente, si aplica.</p>
            </div>

            <div>
              <label className={labelClass}>Priority {requiredMark}</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className={selectClass}
                required
              >
                {sourcePriorities.map((priority) => (
                  <option className={optionClass} key={priority.value} value={priority.value}>
                    {priority.label}{priority.level ? ` (${priority.level})` : ""}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Orden de prioridad para procesos internos.</p>
            </div>

            <div>
              <label className={labelClass}>Active {requiredMark}</label>
              <select
                name="active"
                value={form.active}
                onChange={handleChange}
                className={selectClass}
                required
              >
                <option className={optionClass} value="true">Yes</option>
                <option className={optionClass} value="false">No</option>
              </select>
              <p className={helperClass}>Indica si la fuente esta habilitada.</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : source ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SourceFormDialog;
