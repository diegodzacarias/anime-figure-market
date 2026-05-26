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
import { Textarea } from "@/components/ui/textarea";
import FigureCombobox from "@/components/figure/FigureCombobox";
import type { FigureOption, SourceOption } from "@/components/figureAlias/FigureAliasFormDialog";
import type { ReferenceDataOption } from "@/types/referenceData";

export type ScrapedListingCandidate = {
  id?: number;
  figureId?: number;
  figureName?: string;
  figureSlug?: string;
  sourceId?: number;
  sourceName?: string;
  sourceCode?: string;
  sourceItemId?: string | null;
  sourceTitle?: string;
  sourceUrl?: string | null;
  price?: number | null;
  currencyCode?: string | null;
  rawPriceText?: string | null;
  availability?: string | null;
  rawAvailabilityText?: string | null;
  imageUrl?: string | null;
  productCode?: string | null;
  janCode?: string | null;
  matchScore?: number | null;
  matchDecision?: string | null;
  status?: string | null;
  listingStatus?: string | null;
  isAvailable?: boolean | null;
  scoreBreakdownJson?: string | null;
  reasonsJson?: string | null;
  reviewNotes?: string | null;
  capturedAt?: string | null;
  reviewedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type CandidateReviewFormDialogProps = {
  candidate: ScrapedListingCandidate | null;
  figures: FigureOption[];
  sources: SourceOption[];
  currencyCodes: ReferenceDataOption[];
  candidateStatuses: ReferenceDataOption[];
  listingStatuses: ReferenceDataOption[];
  matchDecisions: ReferenceDataOption[];
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

const toDateTimeInputValue = (value?: string | null) => (value ? value.slice(0, 16) : "");

const CandidateReviewFormDialog = ({
  candidate,
  figures,
  sources,
  currencyCodes,
  candidateStatuses,
  listingStatuses,
  matchDecisions,
  open,
  saving,
  loadingOptions,
  onOpenChange,
  onSubmit,
}: CandidateReviewFormDialogProps) => {
  const isReviewMode = Boolean(candidate);
  const [form, setForm] = useState({
    figureId: "",
    sourceId: "",
    sourceCode: "",
    sourceItemId: "",
    sourceTitle: "",
    sourceUrl: "",
    price: "",
    currencyCode: "",
    rawPriceText: "",
    availability: "",
    rawAvailabilityText: "",
    imageUrl: "",
    productCode: "",
    janCode: "",
    matchScore: "",
    matchDecision: "REVIEW",
    status: "PENDING_REVIEW",
    listingStatus: "",
    isAvailable: "",
    scoreBreakdownJson: "",
    reasonsJson: "",
    reviewNotes: "",
    capturedAt: getCurrentDateTimeValue(),
    reviewedAt: "",
  });

  useEffect(() => {
    if (!open) return;

    setForm({
      figureId: candidate?.figureId?.toString() || "",
      sourceId: candidate?.sourceId?.toString() || "",
      sourceCode: candidate?.sourceCode || "",
      sourceItemId: candidate?.sourceItemId || "",
      sourceTitle: candidate?.sourceTitle || "",
      sourceUrl: candidate?.sourceUrl || "",
      price: candidate?.price?.toString() || "",
      currencyCode: candidate?.currencyCode || "",
      rawPriceText: candidate?.rawPriceText || "",
      availability: candidate?.availability || "",
      rawAvailabilityText: candidate?.rawAvailabilityText || "",
      imageUrl: candidate?.imageUrl || "",
      productCode: candidate?.productCode || "",
      janCode: candidate?.janCode || "",
      matchScore: candidate?.matchScore?.toString() || "",
      matchDecision: candidate?.matchDecision || "REVIEW",
      status: candidate?.status || "PENDING_REVIEW",
      listingStatus: candidate?.listingStatus || "",
      isAvailable:
        candidate?.isAvailable === undefined || candidate?.isAvailable === null
          ? ""
          : candidate.isAvailable.toString(),
      scoreBreakdownJson: candidate?.scoreBreakdownJson || "",
      reasonsJson: candidate?.reasonsJson || "",
      reviewNotes: candidate?.reviewNotes || "",
      capturedAt: toDateTimeInputValue(candidate?.capturedAt) || getCurrentDateTimeValue(),
      reviewedAt: toDateTimeInputValue(candidate?.reviewedAt),
    });
  }, [candidate, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Record<string, string | number | boolean> = {
      figureId: Number(form.figureId),
      sourceId: Number(form.sourceId),
      sourceCode: form.sourceCode.trim(),
      sourceTitle: form.sourceTitle.trim(),
      capturedAt: form.capturedAt,
    };

    if (form.sourceItemId.trim()) payload.sourceItemId = form.sourceItemId.trim();
    if (form.sourceUrl.trim()) payload.sourceUrl = form.sourceUrl.trim();
    if (form.price) payload.price = Number(form.price);
    if (form.currencyCode) payload.currencyCode = form.currencyCode;
    if (form.rawPriceText.trim()) payload.rawPriceText = form.rawPriceText.trim();
    if (form.availability.trim()) payload.availability = form.availability.trim();
    if (form.rawAvailabilityText.trim()) payload.rawAvailabilityText = form.rawAvailabilityText.trim();
    if (form.imageUrl.trim()) payload.imageUrl = form.imageUrl.trim();
    if (form.productCode.trim()) payload.productCode = form.productCode.trim();
    if (form.janCode.trim()) payload.janCode = form.janCode.trim();
    if (form.matchScore) payload.matchScore = Number(form.matchScore);
    if (form.matchDecision) payload.matchDecision = form.matchDecision;
    if (form.status) payload.status = form.status;
    if (form.listingStatus) payload.listingStatus = form.listingStatus;
    if (form.isAvailable) payload.isAvailable = form.isAvailable === "true";
    if (form.scoreBreakdownJson.trim()) payload.scoreBreakdownJson = form.scoreBreakdownJson.trim();
    if (form.reasonsJson.trim()) payload.reasonsJson = form.reasonsJson.trim();
    if (form.reviewNotes.trim()) payload.reviewNotes = form.reviewNotes.trim();
    if (candidate) payload.reviewedAt = getCurrentDateTimeValue();

    await onSubmit(payload);
  };

  const selectClass = "w-full rounded border border-input bg-background p-2 text-foreground";
  const optionClass = "bg-background text-foreground";
  const helperClass = "mt-1 text-xs text-muted-foreground";
  const labelClass = "mb-1 block text-sm font-medium text-foreground";
  const requiredMark = <span className="text-destructive">*</span>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
        <LoadingOverlay active={saving} label="Saving candidate..." />

        <DialogHeader>
          <DialogTitle>{candidate ? "View Candidate" : "New Candidate"}</DialogTitle>
          <DialogDescription>
            {candidate
              ? "Inspect scraped data and register review notes before approving or rejecting it."
              : "Create a scraped listing candidate manually when needed."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Figure {requiredMark}</label>
              <FigureCombobox
                figures={figures}
                value={form.figureId}
                disabled={isReviewMode || loadingOptions || figures.length === 0}
                loading={loadingOptions}
                onChange={(value) => setForm((prev) => ({ ...prev, figureId: value }))}
              />
              <input name="figureId" value={form.figureId} required className="sr-only" onChange={() => undefined} />
              <p className={helperClass}>Figura para la que se encontro este candidato.</p>
            </div>

            <div>
              <label className={labelClass}>Source {requiredMark}</label>
              <select
                name="sourceId"
                value={form.sourceId}
                onChange={handleChange}
                className={selectClass}
                disabled={isReviewMode || loadingOptions || sources.length === 0}
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
              <p className={helperClass}>Fuente donde se encontro el resultado scrapeado.</p>
            </div>

            <div>
              <label className={labelClass}>Source Code {requiredMark}</label>
              <Input name="sourceCode" maxLength={80} value={form.sourceCode} onChange={handleChange} disabled={isReviewMode} required />
              <p className={helperClass}>Codigo tecnico de la fuente usada por scraping.</p>
            </div>

            <div>
              <label className={labelClass}>Source Item ID</label>
              <Input name="sourceItemId" maxLength={255} value={form.sourceItemId} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>Identificador externo del item, si existe.</p>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Source Title {requiredMark}</label>
              <Input name="sourceTitle" maxLength={500} value={form.sourceTitle} onChange={handleChange} disabled={isReviewMode} required />
              <p className={helperClass}>Titulo detectado en la pagina origen.</p>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Source URL</label>
              <Input name="sourceUrl" type="url" value={form.sourceUrl} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>URL directa del candidato scrapeado.</p>
            </div>

            <div>
              <label className={labelClass}>Price</label>
              <Input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>Precio detectado como numero.</p>
            </div>

            <div>
              <label className={labelClass}>Currency</label>
              <select name="currencyCode" value={form.currencyCode} onChange={handleChange} className={selectClass} disabled={isReviewMode}>
                <option className={optionClass} value="">Not set</option>
                {currencyCodes.map((currency) => (
                  <option className={optionClass} key={currency.value} value={currency.value}>
                    {currency.label}{currency.symbol ? ` (${currency.symbol})` : ""}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Moneda del precio detectado.</p>
            </div>

            <div>
              <label className={labelClass}>Raw Price Text</label>
              <Input name="rawPriceText" value={form.rawPriceText} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>Texto de precio tal como vino de la fuente.</p>
            </div>

            <div>
              <label className={labelClass}>Availability</label>
              <Input name="availability" value={form.availability} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>Disponibilidad interpretada por scraping.</p>
            </div>

            <div>
              <label className={labelClass}>Raw Availability Text</label>
              <Input name="rawAvailabilityText" value={form.rawAvailabilityText} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>Texto bruto de disponibilidad de la fuente.</p>
            </div>

            <div>
              <label className={labelClass}>Image URL</label>
              <Input name="imageUrl" type="url" value={form.imageUrl} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>Imagen del producto detectada.</p>
            </div>

            <div>
              <label className={labelClass}>Product Code</label>
              <Input name="productCode" value={form.productCode} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>Codigo de producto encontrado.</p>
            </div>

            <div>
              <label className={labelClass}>JAN Code</label>
              <Input name="janCode" value={form.janCode} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>Codigo JAN si la fuente lo publica.</p>
            </div>

            <div>
              <label className={labelClass}>Match Score</label>
              <Input name="matchScore" type="number" min="0" step="0.01" value={form.matchScore} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>Puntaje de coincidencia calculado.</p>
            </div>

            <div>
              <label className={labelClass}>Match Decision</label>
              <select name="matchDecision" value={form.matchDecision} onChange={handleChange} className={selectClass} disabled={isReviewMode}>
                {matchDecisions.map((decision) => (
                  <option className={optionClass} key={decision.value} value={decision.value}>
                    {decision.label}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Decision del proceso de matching.</p>
            </div>

            <div>
              <label className={labelClass}>Candidate Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={selectClass} disabled={isReviewMode}>
                {candidateStatuses.map((status) => (
                  <option className={optionClass} key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Estado de revision del candidato.</p>
            </div>

            <div>
              <label className={labelClass}>Listing Status</label>
              <select name="listingStatus" value={form.listingStatus} onChange={handleChange} className={selectClass} disabled={isReviewMode}>
                <option className={optionClass} value="">Not set</option>
                {listingStatuses.map((status) => (
                  <option className={optionClass} key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Estado que tendria como listing final.</p>
            </div>

            <div>
              <label className={labelClass}>Available</label>
              <select name="isAvailable" value={form.isAvailable} onChange={handleChange} className={selectClass} disabled={isReviewMode}>
                <option className={optionClass} value="">Unknown</option>
                <option className={optionClass} value="true">Yes</option>
                <option className={optionClass} value="false">No</option>
              </select>
              <p className={helperClass}>Disponibilidad final sugerida.</p>
            </div>

            <div>
              <label className={labelClass}>Captured At</label>
              <Input name="capturedAt" type="datetime-local" value={form.capturedAt} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>Momento en que se capturo el candidato.</p>
            </div>

            <div>
              <label className={labelClass}>Reviewed At</label>
              <Input name="reviewedAt" type="datetime-local" value={form.reviewedAt} onChange={handleChange} disabled />
              <p className={helperClass}>Momento de revision manual, si ya ocurrio.</p>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Review Notes</label>
              <Textarea name="reviewNotes" value={form.reviewNotes} onChange={handleChange} />
              <p className={helperClass}>Notas internas sobre la decision tomada.</p>
            </div>

            <div>
              <label className={labelClass}>Score Breakdown JSON</label>
              <Textarea name="scoreBreakdownJson" value={form.scoreBreakdownJson} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>Detalle JSON del puntaje, si aplica.</p>
            </div>

            <div>
              <label className={labelClass}>Reasons JSON</label>
              <Textarea name="reasonsJson" value={form.reasonsJson} onChange={handleChange} disabled={isReviewMode} />
              <p className={helperClass}>Razones JSON del matching, si aplica.</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : candidate ? "Save Review" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateReviewFormDialog;
