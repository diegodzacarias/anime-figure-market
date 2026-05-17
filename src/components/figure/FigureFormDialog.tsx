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

export type Figure = {
  id?: number;
  franchiseId?: number;
  franchise?: { id?: number; name?: string };
  brandId?: number;
  brand?: { id?: number; name?: string };
  name?: string;
  slug?: string;
  scene?: string | null;
  lineName?: string | null;
  material?: string | null;
  isLicensed?: boolean;
  editionSize?: number | null;
  baseCurrencyCode?: string;
  status?: string;
  notes?: string | null;
};

export type FranchiseOption = {
  id: number;
  name: string;
};

type BrandOption = {
  id: number;
  name: string;
};

type FigureFormDialogProps = {
  figure: Figure | null;
  franchises: FranchiseOption[];
  brands: BrandOption[];
  open: boolean;
  saving: boolean;
  loadingOptions: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: Record<string, string | number | boolean>) => Promise<void>;
};

const getFigureFranchiseId = (figure: Figure | null) =>
  figure?.franchiseId || figure?.franchise?.id || "";

const getFigureBrandId = (figure: Figure | null) => figure?.brandId || figure?.brand?.id || "";

const FigureFormDialog = ({
  figure,
  franchises,
  brands,
  open,
  saving,
  loadingOptions,
  onOpenChange,
  onSubmit,
}: FigureFormDialogProps) => {
  const [form, setForm] = useState({
    franchiseId: "",
    brandId: "",
    name: "",
    slug: "",
    scene: "",
    lineName: "",
    material: "",
    isLicensed: "true",
    editionSize: "",
    baseCurrencyCode: "USD",
    status: "RELEASED",
    notes: "",
  });

  useEffect(() => {
    if (!open) return;

    setForm({
      franchiseId: getFigureFranchiseId(figure).toString(),
      brandId: getFigureBrandId(figure).toString(),
      name: figure?.name || "",
      slug: figure?.slug || "",
      scene: figure?.scene || "",
      lineName: figure?.lineName || "",
      material: figure?.material || "",
      isLicensed: (figure?.isLicensed ?? true).toString(),
      editionSize: figure?.editionSize?.toString() || "",
      baseCurrencyCode: figure?.baseCurrencyCode || "USD",
      status: figure?.status || "RELEASED",
      notes: figure?.notes || "",
    });
  }, [figure, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      franchiseId: Number(form.franchiseId),
      brandId: Number(form.brandId),
      name: form.name.trim(),
      slug: form.slug.trim(),
      isLicensed: form.isLicensed === "true",
      baseCurrencyCode: form.baseCurrencyCode,
      status: form.status,
    };

    if (form.scene.trim()) payload.scene = form.scene.trim();
    if (form.lineName.trim()) payload.lineName = form.lineName.trim();
    if (form.material.trim()) payload.material = form.material.trim();
    if (form.editionSize) payload.editionSize = Number(form.editionSize);
    if (form.notes.trim()) payload.notes = form.notes.trim();

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
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{figure ? "Update Figure" : "New Figure"}</DialogTitle>
          <DialogDescription>
            Manage the main figure record used by aliases and source listings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Franchise {requiredMark}</label>
              <select
                name="franchiseId"
                value={form.franchiseId}
                onChange={handleChange}
                className={selectClass}
                disabled={loadingOptions || franchises.length === 0}
                required
              >
                <option className={optionClass} value="">
                  {loadingOptions ? "Loading franchises..." : "Select a franchise"}
                </option>
                {franchises.map((franchise) => (
                  <option className={optionClass} key={franchise.id} value={franchise.id}>
                    {franchise.name}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Anime o universo al que pertenece la figura.</p>
            </div>

            <div>
              <label className={labelClass}>Brand {requiredMark}</label>
              <select
                name="brandId"
                value={form.brandId}
                onChange={handleChange}
                className={selectClass}
                required
              >
                <option className={optionClass} value="">Select a brand</option>
                {brands.map((brand) => (
                  <option className={optionClass} key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Fabricante o marca que produce la figura.</p>
            </div>

            <div>
              <label className={labelClass}>Name {requiredMark}</label>
              <Input name="name" maxLength={255} value={form.name} onChange={handleChange} required />
              <p className={helperClass}>Nombre completo del producto.</p>
            </div>

            <div>
              <label className={labelClass}>Slug {requiredMark}</label>
              <Input name="slug" maxLength={300} value={form.slug} onChange={handleChange} required />
              <p className={helperClass}>Identificador para URL, en minusculas y con guiones.</p>
            </div>

            <div>
              <label className={labelClass}>Scene</label>
              <Input name="scene" maxLength={255} value={form.scene} onChange={handleChange} />
              <p className={helperClass}>Pose, escena o transformacion representada.</p>
            </div>

            <div>
              <label className={labelClass}>Line Name</label>
              <Input name="lineName" maxLength={150} value={form.lineName} onChange={handleChange} />
              <p className={helperClass}>Linea o coleccion comercial de la marca.</p>
            </div>

            <div>
              <label className={labelClass}>Material</label>
              <Input name="material" maxLength={100} value={form.material} onChange={handleChange} />
              <p className={helperClass}>Material principal, como PVC, ABS o resina.</p>
            </div>

            <div>
              <label className={labelClass}>Edition Size</label>
              <Input
                name="editionSize"
                type="number"
                min="0"
                value={form.editionSize}
                onChange={handleChange}
              />
              <p className={helperClass}>Cantidad producida si es una edicion limitada.</p>
            </div>

            <div>
              <label className={labelClass}>Licensed {requiredMark}</label>
              <select
                name="isLicensed"
                value={form.isLicensed}
                onChange={handleChange}
                className={selectClass}
                required
              >
                <option className={optionClass} value="true">Yes</option>
                <option className={optionClass} value="false">No</option>
              </select>
              <p className={helperClass}>Indica si es una figura oficial/licenciada.</p>
            </div>

            <div>
              <label className={labelClass}>Status {requiredMark}</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={selectClass}
                required
              >
                <option className={optionClass} value="PREORDER">PREORDER</option>
                <option className={optionClass} value="RELEASED">RELEASED</option>
                <option className={optionClass} value="SOLD_OUT">SOLD_OUT</option>
              </select>
              <p className={helperClass}>Disponibilidad actual: preventa, lanzada o agotada.</p>
            </div>
          </div>

          <div>
            <label className={labelClass}>Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full rounded border border-input bg-background p-3 text-foreground"
            />
            <p className={helperClass}>Datos adicionales, variantes u observaciones internas.</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : figure ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FigureFormDialog;
