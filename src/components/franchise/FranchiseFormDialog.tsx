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

export type Franchise = {
  id?: number;
  name?: string;
  slug?: string;
  imageUrl?: string;
};

type FranchiseFormDialogProps = {
  franchise: Franchise | null;
  open: boolean;
  saving: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: Franchise) => Promise<void>;
};

const emptyForm = {
  name: "",
  slug: "",
  imageUrl: "",
};

const FranchiseFormDialog = ({
  franchise,
  open,
  saving,
  onOpenChange,
  onSubmit,
}: FranchiseFormDialogProps) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;

    setForm({
      name: franchise?.name || "",
      slug: franchise?.slug || "",
      imageUrl: franchise?.imageUrl || "",
    });
  }, [franchise, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({
      name: form.name.trim(),
      slug: form.slug.trim(),
      imageUrl: form.imageUrl.trim(),
    });
  };

  const helperClass = "mt-1 text-xs text-muted-foreground";
  const labelClass = "mb-1 block text-sm font-medium text-foreground";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <LoadingOverlay active={saving} label="Saving franchise..." />

        <DialogHeader>
          <DialogTitle>{franchise ? "Update Franchise" : "New Franchise"}</DialogTitle>
          <DialogDescription>
            Manage the basic data used to identify and display a franchise.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Name</label>
              <Input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
              <p className={helperClass}>Nombre visible de la franquicia.</p>
            </div>

            <div>
              <label className={labelClass}>Slug</label>
              <Input
                name="slug"
                placeholder="Slug"
                value={form.slug}
                onChange={handleChange}
              />
              <p className={helperClass}>Identificador para URL, en minusculas y con guiones.</p>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Image URL</label>
              <Input
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={handleChange}
              />
              <p className={helperClass}>Imagen principal usada para representar la franquicia.</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : franchise ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FranchiseFormDialog;
