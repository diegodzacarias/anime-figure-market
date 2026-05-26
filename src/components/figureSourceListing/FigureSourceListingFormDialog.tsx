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
import type { FigureOption, SourceOption } from "@/components/figureAlias/FigureAliasFormDialog";
import { ReferenceDataOption } from "@/types/referenceData";

export type FigureSourceListing = {
  id?: number;
  figureId?: number;
  figureName?: string;
  figureSlug?: string;
  sourceId?: number;
  sourceName?: string;
  sourceItemId?: string | null;
  sourceTitle?: string;
  sourceUrl?: string | null;
  price?: number | null;
  currencyCode?: string;
  preorderDate?: string | null;
  estimatedReleaseDate?: string | null;
  listingStatus?: string | null;
  isAvailable?: boolean | null;
  editionText?: string | null;
  releaseText?: string | null;
  capturedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

type FigureSourceListingFormDialogProps = {
  listing: FigureSourceListing | null;
  figures: FigureOption[];
  sources: SourceOption[];
  currencyCodes: ReferenceDataOption[];
  listingStatuses: ReferenceDataOption[];
  open: boolean;
  saving: boolean;
  loadingOptions: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: Record<string, string | number | boolean>) => Promise<void>;
};

const getCurrentDateTimeValue = () => {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
};

const toDateTimeInputValue = (value?: string) => (value ? value.slice(0, 16) : getCurrentDateTimeValue());

const FigureSourceListingFormDialog = ({
  listing,
  figures,
  sources,
  currencyCodes,
  listingStatuses,
  open,
  saving,
  loadingOptions,
  onOpenChange,
  onSubmit,
}: FigureSourceListingFormDialogProps) => {
  const [form, setForm] = useState({
    figureId: "",
    sourceId: "",
    sourceItemId: "",
    sourceTitle: "",
    sourceUrl: "",
    price: "",
    currencyCode: "USD",
    preorderDate: "",
    estimatedReleaseDate: "",
    listingStatus: "",
    isAvailable: "",
    editionText: "",
    releaseText: "",
    capturedAt: getCurrentDateTimeValue(),
  });

  useEffect(() => {
    if (!open) return;

    setForm({
      figureId: listing?.figureId?.toString() || "",
      sourceId: listing?.sourceId?.toString() || "",
      sourceItemId: listing?.sourceItemId || "",
      sourceTitle: listing?.sourceTitle || "",
      sourceUrl: listing?.sourceUrl || "",
      price: listing?.price?.toString() || "",
      currencyCode: listing?.currencyCode || "USD",
      preorderDate: listing?.preorderDate || "",
      estimatedReleaseDate: listing?.estimatedReleaseDate || "",
      listingStatus: listing?.listingStatus || "",
      isAvailable: listing?.isAvailable === undefined || listing?.isAvailable === null ? "" : listing.isAvailable.toString(),
      editionText: listing?.editionText || "",
      releaseText: listing?.releaseText || "",
      capturedAt: toDateTimeInputValue(listing?.capturedAt),
    });
  }, [listing, open]);

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
      figureId: Number(form.figureId),
      sourceId: Number(form.sourceId),
      sourceTitle: form.sourceTitle.trim(),
      currencyCode: form.currencyCode,
      capturedAt: form.capturedAt,
    };

    if (form.sourceItemId.trim()) payload.sourceItemId = form.sourceItemId.trim();
    if (form.sourceUrl.trim()) payload.sourceUrl = form.sourceUrl.trim();
    if (form.price) payload.price = Number(form.price);
    if (form.preorderDate) payload.preorderDate = form.preorderDate;
    if (form.estimatedReleaseDate) payload.estimatedReleaseDate = form.estimatedReleaseDate;
    if (form.listingStatus) payload.listingStatus = form.listingStatus;
    if (form.isAvailable) payload.isAvailable = form.isAvailable === "true";
    if (form.editionText.trim()) payload.editionText = form.editionText.trim();
    if (form.releaseText.trim()) payload.releaseText = form.releaseText.trim();

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
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <LoadingOverlay active={saving} label="Saving source listing..." />

        <DialogHeader>
          <DialogTitle>{listing ? "Update Figure Source Listing" : "New Figure Source Listing"}</DialogTitle>
          <DialogDescription>
            Manage source-specific listing data captured from shops and marketplaces.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/30 p-4">
          <h3 className="text-sm font-medium text-foreground">Source quick links</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {sources.filter((source) => source.baseUrl).length === 0 ? (
              <p className="text-sm text-muted-foreground">No source URLs available.</p>
            ) : (
              sources
                .filter((source) => source.baseUrl)
                .map((source) => (
                  <a
                    key={source.id}
                    href={source.baseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {source.name}
                  </a>
                ))
            )}
          </div>
        </div>

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
              <p className={helperClass}>Figura relacionada con este listing.</p>
            </div>

            <div>
              <label className={labelClass}>Source {requiredMark}</label>
              <select
                name="sourceId"
                value={form.sourceId}
                onChange={handleChange}
                className={selectClass}
                disabled={loadingOptions || sources.length === 0}
                required
              >
                <option className={optionClass} value="">
                  {loadingOptions ? "Loading sources..." : "Select a source"}
                </option>
                {sources.map((source) => (
                  <option className={optionClass} key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Tienda, web o fuente donde aparece el listing.</p>
            </div>

            <div>
              <label className={labelClass}>Source Item ID</label>
              <Input name="sourceItemId" maxLength={255} value={form.sourceItemId} onChange={handleChange} />
              <p className={helperClass}>Identificador del item dentro de la fuente.</p>
            </div>

            <div>
              <label className={labelClass}>Source Title {requiredMark}</label>
              <Input name="sourceTitle" maxLength={500} value={form.sourceTitle} onChange={handleChange} required />
              <p className={helperClass}>Titulo publicado por la fuente.</p>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Source URL</label>
              <Input name="sourceUrl" type="url" maxLength={1000} value={form.sourceUrl} onChange={handleChange} />
              <p className={helperClass}>URL directa del listing en la fuente.</p>
            </div>

            <div>
              <label className={labelClass}>Price</label>
              <Input name="price" type="number" min="0.01" step="0.01" value={form.price} onChange={handleChange} />
              <p className={helperClass}>Precio publicado, si esta disponible.</p>
            </div>

            <div>
              <label className={labelClass}>Currency {requiredMark}</label>
              <select name="currencyCode" value={form.currencyCode} onChange={handleChange} className={selectClass} required>
                {currencyCodes.map((currency) => (
                  <option className={optionClass} key={currency.value} value={currency.value}>
                    {currency.label}{currency.symbol ? ` (${currency.symbol})` : ""}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Moneda del precio del listing.</p>
            </div>

            <div>
              <label className={labelClass}>Preorder Date</label>
              <Input name="preorderDate" type="date" value={form.preorderDate} onChange={handleChange} />
              <p className={helperClass}>Fecha de preventa reportada por la fuente.</p>
            </div>

            <div>
              <label className={labelClass}>Estimated Release Date</label>
              <Input name="estimatedReleaseDate" type="date" value={form.estimatedReleaseDate} onChange={handleChange} />
              <p className={helperClass}>Fecha estimada de salida segun la fuente.</p>
            </div>

            <div>
              <label className={labelClass}>Listing Status</label>
              <select name="listingStatus" value={form.listingStatus} onChange={handleChange} className={selectClass}>
                <option className={optionClass} value="">Not set</option>
                {listingStatuses.map((status) => (
                  <option className={optionClass} key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Estado del listing en la fuente.</p>
            </div>

            <div>
              <label className={labelClass}>Available</label>
              <select name="isAvailable" value={form.isAvailable} onChange={handleChange} className={selectClass}>
                <option className={optionClass} value="">Unknown</option>
                <option className={optionClass} value="true">Yes</option>
                <option className={optionClass} value="false">No</option>
              </select>
              <p className={helperClass}>Indica si el item esta disponible en la fuente.</p>
            </div>

            <div>
              <label className={labelClass}>Edition Text</label>
              <Input name="editionText" maxLength={255} value={form.editionText} onChange={handleChange} />
              <p className={helperClass}>Texto de edicion tal como aparece en la fuente.</p>
            </div>

            <div>
              <label className={labelClass}>Release Text</label>
              <Input name="releaseText" maxLength={255} value={form.releaseText} onChange={handleChange} />
              <p className={helperClass}>Texto libre de lanzamiento reportado por la fuente.</p>
            </div>

            <div>
              <label className={labelClass}>Captured At {requiredMark}</label>
              <Input name="capturedAt" type="datetime-local" value={form.capturedAt} onChange={handleChange} required />
              <p className={helperClass}>Momento en que se capturo esta informacion.</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : listing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FigureSourceListingFormDialog;
