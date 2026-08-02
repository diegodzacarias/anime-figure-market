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
import { Textarea } from "@/components/ui/textarea";
import type { FigureDiscoveryCandidate } from "@/types/discoveryCandidate";

export type DiscoveryCandidateActionType = "duplicate" | "new";

type DiscoveryCandidateActionDialogProps = {
  candidate: FigureDiscoveryCandidate | null;
  action: DiscoveryCandidateActionType | null;
  saving: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reviewNotes: string) => void;
};

const DiscoveryCandidateActionDialog = ({
  candidate,
  action,
  saving,
  onOpenChange,
  onConfirm,
}: DiscoveryCandidateActionDialogProps) => {
  const [reviewNotes, setReviewNotes] = useState("");
  const open = Boolean(candidate && action);

  useEffect(() => {
    if (open) setReviewNotes("");
  }, [open, candidate?.id, action]);

  const isDuplicate = action === "duplicate";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isDuplicate ? "Confirmar como figura existente" : "Confirmar como figura nueva"}
          </DialogTitle>
          <DialogDescription>
            {isDuplicate
              ? `Esto marcará "${candidate?.sourceTitle}" como duplicado de "${
                  candidate?.possibleDuplicateFigureName || "la figura seleccionada"
                }" y agregará ${candidate?.sourceCode || "esta fuente"} como otro lugar de compra. No se creará ninguna figura nueva.`
              : `Esto creará una Figure canónica nueva a partir de "${candidate?.sourceTitle}" con marca "${candidate?.brandName}". Si algo está mal, se puede corregir después en la ficha creada.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="review-notes">
            Notas de revisión (opcional)
          </label>
          <Textarea
            id="review-notes"
            value={reviewNotes}
            onChange={(event) => setReviewNotes(event.target.value)}
            placeholder="Contexto adicional para dejar registrado en la auditoría..."
            disabled={saving}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" disabled={saving} onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" disabled={saving} onClick={() => onConfirm(reviewNotes)}>
            {saving ? "Guardando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiscoveryCandidateActionDialog;
